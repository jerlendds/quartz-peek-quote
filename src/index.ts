export { default as PeekQuotes, initPeekQuotes } from "./components/PeekQuotes";
import { initPeekQuotes } from "./components/PeekQuotes";
export { PeekQuotesTransformer, transformer } from "./transformer";

export type { PeekQuotesOptions } from "./components/PeekQuotes";
export type { PeekQuotesTransformerOptions } from "./types";

export function init(options?: Record<string, unknown>): void {
  initPeekQuotes(options);
}

// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  StringResource,
  QuartzTransformerPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPlugin,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
  PageMatcher,
  PageGenerator,
  VirtualPage,
} from "@quartz-community/types";
