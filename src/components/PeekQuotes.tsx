import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import style from "./styles/peek-quotes.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/peek-quotes.inline.ts";

export interface PeekQuotesOptions {
  /**
   * Full source text to render in the peek card.
   */
  text?: string;
  /**
   * Exact text fragment to mark as the semantic anchor.
   */
  highlight?: string;
  /** Optional class added to the root element. */
  className?: string;
  /** Accessible label for the drag handle. */
  handleLabel?: string;
  /** Maximum pixels revealed above the highlight. */
  maxPeekAbove?: number;
  /** Maximum pixels revealed below the highlight. */
  maxPeekBelow?: number;
  /** Pixels dragged before release snaps open instead of closed. */
  snapThreshold?: number;
  /** CSS color used for the highlighted anchor text. */
  highlightColor?: string;
}

let configuredOptions: PeekQuotesOptions = {};

export function initPeekQuotes(options?: Record<string, unknown>): void {
  configuredOptions = (options ?? {}) as PeekQuotesOptions;
}

const fallbackText = `The thing about memory is that it rarely arrives in order.

In the interview, she described the room as quiet enough to hear the lights. Every answer seemed to begin somewhere else, with a street name, a fragment of weather, or the sound of someone closing a door.

What stayed with me was her insistence that small details carry the weight of the larger story. They do not explain the event, exactly, but they keep it close enough to touch.

Only after that did she return to the question. The archive, she said, is not a box of finished facts. It is a set of invitations, each one asking the reader to decide how much surrounding context they need before the sentence can be understood.`;

const fallbackHighlight = "small details carry the weight of the larger story";

function getConfiguredText(
  _props: QuartzComponentProps,
  opts: PeekQuotesOptions,
): { text: string; highlight: string } {
  return {
    text: opts.text ?? fallbackText,
    highlight: opts.highlight ?? fallbackHighlight,
  };
}

function renderHighlightedText(text: string, highlight: string) {
  const index = highlight.length > 0 ? text.indexOf(highlight) : -1;

  if (index < 0) {
    return text.split(/\n{2,}/).map((paragraph) => <p>{paragraph}</p>);
  }

  const before = text.slice(0, index);
  const anchor = text.slice(index, index + highlight.length);
  const after = text.slice(index + highlight.length);

  return (
    <>
      {renderTextFragments(before)}
      <mark class="peek-quotes__highlight" data-peek-highlight>
        {anchor}
      </mark>
      {renderTextFragments(after)}
    </>
  );
}

function renderTextFragments(value: string) {
  const blocks = value.split(/(\n{2,})/);

  return blocks.map((block) => {
    if (/^\n{2,}$/.test(block)) {
      return <span class="peek-quotes__paragraph-break" aria-hidden="true" />;
    }

    return block;
  });
}

export default ((opts?: PeekQuotesOptions) => {
  const options = {
    className: "peek-quotes",
    handleLabel: "Drag to peek around highlighted quote",
    maxPeekAbove: 320,
    maxPeekBelow: 360,
    snapThreshold: 80,
    highlightColor: "#fff200",
    ...configuredOptions,
    ...opts,
  } satisfies Required<
    Pick<
      PeekQuotesOptions,
      | "className"
      | "handleLabel"
      | "maxPeekAbove"
      | "maxPeekBelow"
      | "snapThreshold"
      | "highlightColor"
    >
  > &
    PeekQuotesOptions;

  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const { text, highlight } = getConfiguredText(props, options);

    return (
      <div
        class={classNames(options.className)}
        data-peek-quotes
        data-max-peek-above={options.maxPeekAbove}
        data-max-peek-below={options.maxPeekBelow}
        data-snap-threshold={options.snapThreshold}
        style={{ "--peek-highlight-color": options.highlightColor }}
      >
        <div class="peek-quotes__shell">
          <div class="peek-quotes__rail" aria-hidden="true">
            <div class="peek-quotes__line" data-peek-line />
          </div>
          <button
            class="peek-quotes__handle"
            type="button"
            data-peek-handle
            aria-label={options.handleLabel}
          />
          <div class="peek-quotes__viewport" data-peek-viewport>
            <div class="peek-quotes__document" data-peek-document>
              {renderHighlightedText(text, highlight)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
