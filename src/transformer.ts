import type { Plugin } from "unified";
import type { Code, Root as MdastRoot } from "mdast";
import type { Element, ElementContent } from "hast";
import { visit } from "unist-util-visit";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import type { PeekQuotesTransformerOptions } from "./types";
import {
  defaultPeekQuotesOptions,
  resolvePeekQuotesOptions,
  type PeekQuotesOptions,
  type PeekQuotesResolvedOptions,
} from "./components/PeekQuotes";
import style from "./components/styles/peek-quotes.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./components/scripts/peek-quotes.inline.ts";

type PeekQuoteData = PeekQuotesOptions & {
  text: string;
  highlight: string;
};

type ResolvedTransformerOptions = PeekQuotesResolvedOptions & {
  language: string;
};

const defaultOptions = {
  language: "peek",
  ...defaultPeekQuotesOptions,
} satisfies Required<PeekQuotesTransformerOptions>;

const dedent = (value: string) => {
  const lines = value.replace(/\s+$/g, "").split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const indent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(indent)).join("\n");
};

const unquote = (value: string) => {
  const trimmed = value.trim();
  const quote = trimmed[0];
  if ((quote === `"` || quote === `'`) && trimmed.endsWith(quote)) {
    return trimmed
      .slice(1, -1)
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, `"`)
      .replace(/\\'/g, `'`)
      .replace(/\\\\/g, "\\");
  }
  return trimmed;
};

const readNumber = (value: string | undefined) => {
  if (value === undefined) return undefined;
  const parsed = Number(unquote(value));
  return Number.isFinite(parsed) ? parsed : undefined;
};

function parsePeekQuote(value: string): PeekQuoteData | null {
  const lines = value.replace(/\r\n?/g, "\n").split("\n");
  const rootIndex = lines.findIndex((line) => /^peekQuote:\s*$/.test(line));
  if (rootIndex < 0) return null;

  const fields: Record<string, string> = {};

  for (let index = rootIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (line === undefined) continue;

    const match = line.match(/^ {2}([A-Za-z][\w-]*):(?:\s*(.*))?$/);
    if (!match) continue;

    const key = match[1];
    const rawValue = match[2] ?? "";
    if (!key) continue;

    if (rawValue.trim() === "|") {
      const blockLines: string[] = [];
      index++;
      while (index < lines.length) {
        const blockLine = lines[index];
        if (blockLine === undefined || /^ {2}[A-Za-z][\w-]*:/.test(blockLine)) break;

        blockLines.push(blockLine);
        index++;
      }
      index--;
      fields[key] = dedent(blockLines.join("\n"));
    } else {
      fields[key] = unquote(rawValue);
    }
  }

  const text = fields.text?.trim();
  const highlight = fields.highlight?.trim();
  if (!text || !highlight) return null;

  return {
    text,
    highlight,
    className: fields.className?.trim(),
    handleLabel: fields.handleLabel?.trim(),
    maxPeekAbove: readNumber(fields.maxPeekAbove),
    maxPeekBelow: readNumber(fields.maxPeekBelow),
    snapThreshold: readNumber(fields.snapThreshold),
    highlightColor: fields.highlightColor?.trim(),
  };
}

const textNode = (value: string): ElementContent => ({ type: "text", value });

function renderTextFragments(value: string): ElementContent[] {
  return value.split(/(\n{2,})/).flatMap((block): ElementContent[] => {
    if (block.length === 0) return [];
    if (/^\n{2,}$/.test(block)) {
      return [
        {
          type: "element",
          tagName: "span",
          properties: {
            className: ["peek-quotes__paragraph-break"],
            ariaHidden: "true",
          },
          children: [],
        },
      ];
    }
    return [textNode(block)];
  });
}

function renderHighlightedText(text: string, highlight: string): ElementContent[] {
  const index = highlight.length > 0 ? text.indexOf(highlight) : -1;
  if (index < 0) return renderTextFragments(text);

  return [
    ...renderTextFragments(text.slice(0, index)),
    {
      type: "element",
      tagName: "mark",
      properties: {
        className: ["peek-quotes__highlight"],
        "data-peek-highlight": "true",
      },
      children: [textNode(text.slice(index, index + highlight.length))],
    },
    ...renderTextFragments(text.slice(index + highlight.length)),
  ];
}

function createPeekQuoteElement(
  data: PeekQuoteData,
  fallbackOptions: PeekQuotesResolvedOptions,
): Element {
  const options = resolvePeekQuotesOptions(fallbackOptions, data);

  return {
    type: "element",
    tagName: "div",
    properties: {
      className: [options.className],
      "data-peek-quotes": "true",
      "data-max-peek-above": String(options.maxPeekAbove),
      "data-max-peek-below": String(options.maxPeekBelow),
      "data-snap-threshold": String(options.snapThreshold),
      style: `--peek-highlight-color: ${options.highlightColor}`,
    },
    children: [
      {
        type: "element",
        tagName: "div",
        properties: { className: ["peek-quotes__shell"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: {
              className: ["peek-quotes__rail"],
              ariaHidden: "true",
            },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["peek-quotes__line"],
                  "data-peek-line": "true",
                },
                children: [],
              },
            ],
          },
          {
            type: "element",
            tagName: "button",
            properties: {
              className: ["peek-quotes__handle"],
              type: "button",
              "data-peek-handle": "true",
              ariaLabel: options.handleLabel,
            },
            children: [],
          },
          {
            type: "element",
            tagName: "div",
            properties: {
              className: ["peek-quotes__viewport"],
              "data-peek-viewport": "true",
            },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["peek-quotes__document"],
                  "data-peek-document": "true",
                },
                children: renderHighlightedText(data.text, data.highlight),
              },
            ],
          },
        ],
      },
    ],
  };
}

const remarkPeekQuotes = (options: ResolvedTransformerOptions): Plugin<[], MdastRoot> => {
  return () => (tree: MdastRoot) => {
    visit(tree, "code", (node: Code) => {
      if (node.lang !== options.language) return;

      const data = parsePeekQuote(node.value);
      if (!data) return;

      const replacement = node as unknown as {
        type: "paragraph";
        children: [];
        data: Code["data"];
      };
      replacement.type = "paragraph";
      replacement.children = [];
      replacement.data = {
        hName: "div",
        hProperties: {},
        hChildren: [createPeekQuoteElement(data, options)],
      };
    });
  };
};

export const PeekQuotesTransformer: QuartzTransformerPlugin<
  Partial<PeekQuotesTransformerOptions>
> = (userOptions?: Partial<PeekQuotesTransformerOptions>) => {
  const options = {
    language: userOptions?.language ?? defaultOptions.language,
    ...resolvePeekQuotesOptions(userOptions),
  };

  return {
    name: "PeekQuotesTransformer",
    markdownPlugins() {
      return [remarkPeekQuotes(options)];
    },
    externalResources() {
      return {
        css: [{ content: style, inline: true }],
        js: [
          {
            contentType: "inline",
            loadTime: "afterDOMReady",
            script,
          },
        ],
        additionalHead: [],
      };
    },
  };
};

export const transformer = PeekQuotesTransformer;
