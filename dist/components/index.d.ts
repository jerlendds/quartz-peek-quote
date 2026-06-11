import { QuartzComponent } from '@quartz-community/types';

interface PeekQuotesOptions {
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
}
declare function initPeekQuotes(options?: Record<string, unknown>): void;
declare const _default: (opts?: PeekQuotesOptions) => QuartzComponent;

export { _default as PeekQuotes, type PeekQuotesOptions, initPeekQuotes };
