export type {
  BuildCtx,
  ChangeEvent,
  CSSResource,
  JSResource,
  ProcessedContent,
  QuartzEmitterPlugin,
  QuartzEmitterPluginInstance,
  QuartzFilterPlugin,
  QuartzFilterPluginInstance,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
  PageMatcher,
  PageGenerator,
  VirtualPage,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
} from "@quartz-community/types";
import type { PeekQuotesOptions } from "./components/PeekQuotes";

type PeekQuotesRuntimeOptionKeys =
  | "className"
  | "handleLabel"
  | "maxPeekAbove"
  | "maxPeekBelow"
  | "snapThreshold"
  | "highlightColor";

export type PeekQuotesTransformerOptions = Required<
  Pick<PeekQuotesOptions, PeekQuotesRuntimeOptionKeys>
> & {
  /** Fenced code block language to transform. */
  language: string;
};

export interface ExampleFilterOptions {
  /** Allow pages marked draft: true to publish. */
  allowDrafts: boolean;
  /** Exclude pages that contain any of these frontmatter tags. */
  excludeTags: string[];
  /** Exclude paths that start with any of these prefixes (relative to content root). */
  excludePathPrefixes: string[];
}

export interface ExampleEmitterOptions {
  /** Filename to emit at the site root. */
  manifestSlug: string;
  /** Whether to include the frontmatter block in the manifest. */
  includeFrontmatter: boolean;
  /** Extra metadata to write at the top level of the manifest. */
  metadata: Record<string, unknown>;
  /** Optional hook to transform the emitted manifest JSON string. */
  transformManifest?: (json: string) => string;
  /** Add a custom class to the emitted manifest <script> tag if used in HTML. */
  manifestScriptClass?: string;
}

export type { PeekQuotesOptions } from "./components/PeekQuotes";
