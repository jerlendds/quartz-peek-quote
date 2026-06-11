type PeekState = {
  anchorY: number;
  anchorHeight: number;
  anchorCenterY: number;
  dragStartY: number;
  activePointerId: number | null;
  peekAbove: number;
  peekBelow: number;
  isDragging: boolean;
};

const DEFAULT_MAX_PEEK_ABOVE = 320;
const DEFAULT_MAX_PEEK_BELOW = 360;
const DEFAULT_SNAP_THRESHOLD = 80;
const OPEN_ABOVE = 300;
const OPEN_BELOW = 330;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const readNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

function rectUnion(rects: DOMRect[], relativeTo: DOMRect) {
  const usableRects = rects.filter((rect) => rect.width > 0 && rect.height > 0);
  if (usableRects.length === 0) return null;

  const left = Math.min(...usableRects.map((rect) => rect.left));
  const top = Math.min(...usableRects.map((rect) => rect.top));
  const right = Math.max(...usableRects.map((rect) => rect.right));
  const bottom = Math.max(...usableRects.map((rect) => rect.bottom));

  return {
    x: left - relativeTo.left,
    y: top - relativeTo.top,
    width: right - left,
    height: bottom - top,
  };
}

function setViewport(root: HTMLElement, state: PeekState) {
  const viewportTop = -state.peekAbove;
  const viewportHeight = state.anchorHeight + state.peekAbove + state.peekBelow;
  const anchorCenterY = state.anchorHeight / 2;
  const handleY = anchorCenterY - state.peekAbove + state.peekBelow;
  const lineTop = Math.min(anchorCenterY, handleY);
  const lineHeight = Math.abs(handleY - anchorCenterY);

  root.style.setProperty("--peek-anchor-y", `${state.anchorY}px`);
  root.style.setProperty("--peek-anchor-height", `${state.anchorHeight}px`);
  root.style.setProperty("--peek-viewport-top", `${viewportTop}px`);
  root.style.setProperty("--peek-viewport-height", `${viewportHeight}px`);
  root.style.setProperty("--peek-document-y", `${-(state.anchorY - state.peekAbove)}px`);
  root.style.setProperty("--peek-handle-y", `${handleY}px`);
  root.style.setProperty("--peek-line-top", `${lineTop}px`);
  root.style.setProperty("--peek-line-height", `${lineHeight}px`);
}

function measure(root: HTMLElement, state: PeekState) {
  const documentEl = root.querySelector<HTMLElement>("[data-peek-document]");
  const highlight = root.querySelector<HTMLElement>("[data-peek-highlight]");
  if (!documentEl || !highlight) return false;

  const documentRect = documentEl.getBoundingClientRect();
  const unionRect = rectUnion(Array.from(highlight.getClientRects()), documentRect);
  if (!unionRect) return false;

  state.anchorY = unionRect.y;
  state.anchorHeight = unionRect.height;
  state.anchorCenterY = unionRect.y + unionRect.height / 2;
  setViewport(root, state);
  return true;
}

function setupPeekQuote(root: HTMLElement) {
  if (root.dataset.peekReady === "true") return;

  const handle = root.querySelector<HTMLElement>("[data-peek-handle]");
  if (!handle) return;

  const maxPeekAbove = readNumber(root.dataset.maxPeekAbove, DEFAULT_MAX_PEEK_ABOVE);
  const maxPeekBelow = readNumber(root.dataset.maxPeekBelow, DEFAULT_MAX_PEEK_BELOW);
  const snapThreshold = readNumber(root.dataset.snapThreshold, DEFAULT_SNAP_THRESHOLD);
  const openAbove = Math.min(OPEN_ABOVE, maxPeekAbove);
  const openBelow = Math.min(OPEN_BELOW, maxPeekBelow);

  const state: PeekState = {
    anchorY: 0,
    anchorHeight: 0,
    anchorCenterY: 0,
    dragStartY: 0,
    activePointerId: null,
    peekAbove: 0,
    peekBelow: 0,
    isDragging: false,
  };

  if (!measure(root, state)) return;

  const setDragging = (isDragging: boolean) => {
    state.isDragging = isDragging;
    root.classList.toggle("is-dragging", isDragging);
  };

  const onPointerDown = (event: PointerEvent) => {
    event.preventDefault();
    state.dragStartY = event.clientY;
    state.activePointerId = event.pointerId;
    setDragging(true);
    handle.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!state.isDragging || state.activePointerId !== event.pointerId) return;

    const dy = event.clientY - state.dragStartY;
    if (dy < 0) {
      state.peekAbove = clamp(Math.abs(dy), 0, maxPeekAbove);
      state.peekBelow = 0;
    } else {
      state.peekBelow = clamp(dy, 0, maxPeekBelow);
      state.peekAbove = 0;
    }

    setViewport(root, state);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!state.isDragging || state.activePointerId !== event.pointerId) return;

    if (state.peekAbove < snapThreshold && state.peekBelow < snapThreshold) {
      state.peekAbove = 0;
      state.peekBelow = 0;
    } else if (state.peekAbove > state.peekBelow) {
      state.peekAbove = openAbove;
      state.peekBelow = 0;
    } else {
      state.peekAbove = 0;
      state.peekBelow = openBelow;
    }

    state.activePointerId = null;
    setDragging(false);
    setViewport(root, state);
  };

  const onResize = () => {
    measure(root, state);
  };

  handle.addEventListener("pointerdown", onPointerDown);
  handle.addEventListener("pointermove", onPointerMove);
  handle.addEventListener("pointerup", onPointerUp);
  handle.addEventListener("pointercancel", onPointerUp);
  window.addEventListener("resize", onResize);

  if (typeof window !== "undefined" && window.addCleanup) {
    window.addCleanup(() => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", onResize);
      delete root.dataset.peekReady;
    });
  }

  root.dataset.peekReady = "true";
}

function setupPeekQuotes() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-peek-quotes]")) {
    setupPeekQuote(root);
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("nav", setupPeekQuotes);
  document.addEventListener("render", setupPeekQuotes);
}
