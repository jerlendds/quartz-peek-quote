export { PeekQuotes, PeekQuotesOptions, initPeekQuotes } from './components/index.js';
import { QuartzTransformerPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';
import { PeekQuotesTransformerOptions } from './types.js';

declare const PeekQuotesTransformer: QuartzTransformerPlugin<Partial<PeekQuotesTransformerOptions>>;
declare const transformer: QuartzTransformerPlugin<Partial<PeekQuotesTransformerOptions>>;

declare function init(options?: Record<string, unknown>): void;

export { PeekQuotesTransformer, PeekQuotesTransformerOptions, init, transformer };
