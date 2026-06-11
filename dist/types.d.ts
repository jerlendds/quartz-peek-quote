export { BuildCtx, CSSResource, ChangeEvent, JSResource, PageGenerator, PageMatcher, ProcessedContent, QuartzEmitterPlugin, QuartzEmitterPluginInstance, QuartzFilterPlugin, QuartzFilterPluginInstance, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzPluginData, QuartzTransformerPlugin, QuartzTransformerPluginInstance, StaticResources, VirtualPage } from '@quartz-community/types';
import { PeekQuotesOptions } from './components/index.js';

type PeekQuotesRuntimeOptionKeys = "className" | "handleLabel" | "maxPeekAbove" | "maxPeekBelow" | "snapThreshold" | "highlightColor";
type PeekQuotesTransformerOptions = Required<Pick<PeekQuotesOptions, PeekQuotesRuntimeOptionKeys>> & {
    /** Fenced code block language to transform. */
    language: string;
};
interface ExampleFilterOptions {
    /** Allow pages marked draft: true to publish. */
    allowDrafts: boolean;
    /** Exclude pages that contain any of these frontmatter tags. */
    excludeTags: string[];
    /** Exclude paths that start with any of these prefixes (relative to content root). */
    excludePathPrefixes: string[];
}
interface ExampleEmitterOptions {
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

export { type ExampleEmitterOptions, type ExampleFilterOptions, PeekQuotesOptions, type PeekQuotesTransformerOptions };
