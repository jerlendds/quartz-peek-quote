import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/peek-quotes.scss
var peek_quotes_default = ".peek-quotes {\n  --peek-anchor-height: 1.5em;\n  --peek-shell-width: 100%;\n  --peek-card-width: 100%;\n  --peek-card-left: 0px;\n  --peek-viewport-top: 0px;\n  --peek-viewport-height: var(--peek-anchor-height);\n  --peek-document-y: 0px;\n  --peek-handle-y: 0px;\n  --peek-line-top: 0px;\n  --peek-line-height: 0px;\n  --peek-rail-x: 10px;\n  --peek-highlight-color: #fff200;\n  --peek-surface: var(--light, transparent);\n  --peek-border: var(--lightgray, color-mix(in srgb, currentColor 35%, transparent));\n  --peek-muted: var(--gray, color-mix(in srgb, currentColor 55%, transparent));\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  z-index: 1;\n  margin: 1rem 0;\n  max-width: var(--peek-shell-width);\n  overflow: visible;\n}\n\n.peek-quotes *,\n.peek-quotes *::before,\n.peek-quotes *::after {\n  box-sizing: border-box;\n}\n\n.peek-quotes__shell {\n  position: relative;\n  width: 100%;\n  height: var(--peek-anchor-height);\n  min-height: 1.5em;\n  overflow: visible;\n}\n\n.peek-quotes__viewport {\n  position: absolute;\n  top: 0;\n  left: var(--peek-card-left);\n  z-index: 3;\n  width: var(--peek-card-width);\n  height: var(--peek-viewport-height);\n  overflow: hidden;\n  border: 1px solid var(--peek-border);\n  border-radius: 4px;\n  background: var(--peek-surface);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  transform: translateY(var(--peek-viewport-top));\n  transition: height 280ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);\n  will-change: height, transform;\n}\n\n.peek-quotes__document {\n  padding: 0.75rem 1rem;\n  color: var(--dark, currentColor);\n  font: inherit;\n  line-height: inherit;\n  transform: translateY(var(--peek-document-y));\n  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);\n  will-change: transform;\n}\n\n.peek-quotes.is-dragging .peek-quotes__viewport,\n.peek-quotes.is-dragging .peek-quotes__document,\n.peek-quotes.is-dragging .peek-quotes__handle,\n.peek-quotes.is-dragging .peek-quotes__line {\n  transition-duration: 0ms;\n}\n\n.peek-quotes__paragraph-break {\n  display: block;\n  height: 0.75em;\n}\n\n.peek-quotes__highlight {\n  background: var(--peek-highlight-color);\n  color: inherit;\n  padding: 0 1px;\n}\n\n.peek-quotes__rail {\n  position: absolute;\n  top: 0;\n  left: var(--peek-rail-x);\n  z-index: 4;\n  width: 1px;\n  height: 100%;\n  pointer-events: none;\n}\n\n.peek-quotes__line {\n  position: absolute;\n  top: var(--peek-line-top);\n  left: 0;\n  width: 1px;\n  height: var(--peek-line-height);\n  border-left: 1px dashed var(--peek-muted);\n  opacity: 0.8;\n  transition: top 280ms cubic-bezier(0.2, 0.8, 0.2, 1), height 280ms cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n\n.peek-quotes__handle {\n  position: absolute;\n  top: 0;\n  left: var(--peek-rail-x);\n  z-index: 5;\n  width: 18px;\n  height: 18px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: var(--peek-muted);\n  cursor: grab;\n  touch-action: none;\n  transform: translate(-50%, calc(var(--peek-handle-y) - 50%));\n  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);\n  will-change: transform;\n}\n\n.peek-quotes__handle:active {\n  cursor: grabbing;\n}\n\n.peek-quotes__handle:focus-visible {\n  outline: 2px solid var(--secondary, currentColor);\n  outline-offset: 3px;\n}\n\n@media (max-width: 640px) {\n  .peek-quotes {\n    --peek-rail-x: 8px;\n  }\n  .peek-quotes__document {\n    padding: 0.65rem 0.85rem;\n  }\n}";

// src/components/scripts/peek-quotes.inline.ts
var peek_quotes_inline_default = 'var k=(n,t,o)=>Math.min(Math.max(n,t),o),d=(n,t)=>{let o=Number(n);return Number.isFinite(o)?o:t};function b(n,t){let o=n.filter(e=>e.width>0&&e.height>0);if(o.length===0)return null;let p=Math.min(...o.map(e=>e.left)),a=Math.min(...o.map(e=>e.top)),r=Math.max(...o.map(e=>e.right)),s=Math.max(...o.map(e=>e.bottom));return{x:p-t.left,y:a-t.top,width:r-p,height:s-a}}function h(n,t){let o=-t.peekAbove,p=t.anchorHeight+t.peekAbove+t.peekBelow,a=t.anchorHeight/2,r=a-t.peekAbove+t.peekBelow,s=Math.min(a,r),e=Math.abs(r-a);n.style.setProperty("--peek-anchor-y",`${t.anchorY}px`),n.style.setProperty("--peek-anchor-height",`${t.anchorHeight}px`),n.style.setProperty("--peek-viewport-top",`${o}px`),n.style.setProperty("--peek-viewport-height",`${p}px`),n.style.setProperty("--peek-document-y",`${-(t.anchorY-t.peekAbove)}px`),n.style.setProperty("--peek-handle-y",`${r}px`),n.style.setProperty("--peek-line-top",`${s}px`),n.style.setProperty("--peek-line-height",`${e}px`)}function v(n,t){let o=n.querySelector("[data-peek-document]"),p=n.querySelector("[data-peek-highlight]");if(!o||!p)return!1;let a=o.getBoundingClientRect(),r=b(Array.from(p.getClientRects()),a);return r?(t.anchorY=r.y,t.anchorHeight=r.height,t.anchorCenterY=r.y+r.height/2,h(n,t),!0):!1}function f(n){if(n.dataset.peekReady==="true")return;let t=n.querySelector("[data-peek-handle]");if(!t)return;let o=d(n.dataset.maxPeekAbove,320),p=d(n.dataset.maxPeekBelow,360),a=d(n.dataset.snapThreshold,80),r=Math.min(300,o),s=Math.min(330,p),e={anchorY:0,anchorHeight:0,anchorCenterY:0,dragStartY:0,activePointerId:null,peekAbove:0,peekBelow:0,isDragging:!1};if(!v(n,e))return;let u=i=>{e.isDragging=i,n.classList.toggle("is-dragging",i)},m=i=>{i.preventDefault(),e.dragStartY=i.clientY,e.activePointerId=i.pointerId,u(!0),t.setPointerCapture(i.pointerId)},E=i=>{if(!e.isDragging||e.activePointerId!==i.pointerId)return;let l=i.clientY-e.dragStartY;l<0?(e.peekAbove=k(Math.abs(l),0,o),e.peekBelow=0):(e.peekBelow=k(l,0,p),e.peekAbove=0),h(n,e)},c=i=>{!e.isDragging||e.activePointerId!==i.pointerId||(e.peekAbove<a&&e.peekBelow<a?(e.peekAbove=0,e.peekBelow=0):e.peekAbove>e.peekBelow?(e.peekAbove=r,e.peekBelow=0):(e.peekAbove=0,e.peekBelow=s),e.activePointerId=null,u(!1),h(n,e))},g=()=>{v(n,e)};t.addEventListener("pointerdown",m),t.addEventListener("pointermove",E),t.addEventListener("pointerup",c),t.addEventListener("pointercancel",c),window.addEventListener("resize",g),typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{t.removeEventListener("pointerdown",m),t.removeEventListener("pointermove",E),t.removeEventListener("pointerup",c),t.removeEventListener("pointercancel",c),window.removeEventListener("resize",g),delete n.dataset.peekReady}),n.dataset.peekReady="true"}function P(){for(let n of document.querySelectorAll("[data-peek-quotes]"))f(n)}typeof document<"u"&&(document.addEventListener("nav",P),document.addEventListener("render",P));\n';
var l;
function k(n2) {
  return n2.children;
}
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/PeekQuotes.tsx
var configuredOptions = {};
function initPeekQuotes(options) {
  configuredOptions = options ?? {};
}
var fallbackText = `The thing about memory is that it rarely arrives in order.

In the interview, she described the room as quiet enough to hear the lights. Every answer seemed to begin somewhere else, with a street name, a fragment of weather, or the sound of someone closing a door.

What stayed with me was her insistence that small details carry the weight of the larger story. They do not explain the event, exactly, but they keep it close enough to touch.

Only after that did she return to the question. The archive, she said, is not a box of finished facts. It is a set of invitations, each one asking the reader to decide how much surrounding context they need before the sentence can be understood.`;
var fallbackHighlight = "small details carry the weight of the larger story";
function getConfiguredText(_props, opts) {
  return {
    text: opts.text ?? fallbackText,
    highlight: opts.highlight ?? fallbackHighlight
  };
}
function renderHighlightedText(text, highlight) {
  const index = highlight.length > 0 ? text.indexOf(highlight) : -1;
  if (index < 0) {
    return text.split(/\n{2,}/).map((paragraph) => /* @__PURE__ */ u2("p", { children: paragraph }));
  }
  const before = text.slice(0, index);
  const anchor = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);
  return /* @__PURE__ */ u2(k, { children: [
    renderTextFragments(before),
    /* @__PURE__ */ u2("mark", { class: "peek-quotes__highlight", "data-peek-highlight": true, children: anchor }),
    renderTextFragments(after)
  ] });
}
function renderTextFragments(value) {
  const blocks = value.split(/(\n{2,})/);
  return blocks.map((block) => {
    if (/^\n{2,}$/.test(block)) {
      return /* @__PURE__ */ u2("span", { class: "peek-quotes__paragraph-break", "aria-hidden": "true" });
    }
    return block;
  });
}
var PeekQuotes_default = ((opts) => {
  const options = {
    className: "peek-quotes",
    handleLabel: "Drag to peek around highlighted quote",
    maxPeekAbove: 320,
    maxPeekBelow: 360,
    snapThreshold: 80,
    highlightColor: "#fff200",
    ...configuredOptions,
    ...opts
  };
  const Component = (props) => {
    const { text, highlight } = getConfiguredText(props, options);
    return /* @__PURE__ */ u2(
      "div",
      {
        class: classNames(options.className),
        "data-peek-quotes": true,
        "data-max-peek-above": options.maxPeekAbove,
        "data-max-peek-below": options.maxPeekBelow,
        "data-snap-threshold": options.snapThreshold,
        style: { "--peek-highlight-color": options.highlightColor },
        children: /* @__PURE__ */ u2("div", { class: "peek-quotes__shell", children: [
          /* @__PURE__ */ u2("div", { class: "peek-quotes__rail", "aria-hidden": "true", children: /* @__PURE__ */ u2("div", { class: "peek-quotes__line", "data-peek-line": true }) }),
          /* @__PURE__ */ u2(
            "button",
            {
              class: "peek-quotes__handle",
              type: "button",
              "data-peek-handle": true,
              "aria-label": options.handleLabel
            }
          ),
          /* @__PURE__ */ u2("div", { class: "peek-quotes__viewport", "data-peek-viewport": true, children: /* @__PURE__ */ u2("div", { class: "peek-quotes__document", "data-peek-document": true, children: renderHighlightedText(text, highlight) }) })
        ] })
      }
    );
  };
  Component.css = peek_quotes_default;
  Component.afterDOMLoaded = peek_quotes_inline_default;
  return Component;
});

export { PeekQuotes_default as PeekQuotes, initPeekQuotes };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map