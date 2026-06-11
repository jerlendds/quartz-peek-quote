import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";
import { PeekQuotesTransformer } from "../src/transformer";
import { createCtx } from "./helpers";

describe("PeekQuotesTransformer", () => {
  it("renders peek fenced blocks as inline peek quote markup", async () => {
    const ctx = createCtx();
    const transformer = PeekQuotesTransformer();
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const tree = unified()
      .use(remarkParse)
      .use(plugins)
      .runSync(
        unified().use(remarkParse).parse(`Before

\`\`\`peek
peekQuote:
  text: |
    The witness began with the weather.

    The selected sentence stayed in the transcript.

    Only later did the surrounding details make the statement feel complete.
  highlight: "The selected sentence stayed in the transcript."
  highlightColor: "#ffd84d"
\`\`\`

After`),
      ) as Root;

    const peekNode = tree.children[1] as (typeof tree.children)[number] & {
      data: { hChildren: unknown[] };
    };
    expect(peekNode.type).toBe("paragraph");
    expect(peekNode.data.hChildren).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tagName: "div",
          properties: expect.objectContaining({
            "data-peek-quotes": "true",
          }),
        }),
      ]),
    );
    expect(JSON.stringify(peekNode.data.hChildren)).toContain(
      "The selected sentence stayed in the transcript.",
    );
    expect(JSON.stringify(peekNode.data.hChildren)).toContain("data-peek-highlight");
    expect(JSON.stringify(peekNode.data.hChildren)).toContain("--peek-highlight-color: #ffd84d");
  });

  it("leaves invalid peek fences untouched", async () => {
    const ctx = createCtx();
    const transformer = PeekQuotesTransformer();
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];

    const tree = unified()
      .use(remarkParse)
      .use(plugins)
      .runSync(
        unified().use(remarkParse).parse(`\`\`\`peek
text: "Missing wrapper"
\`\`\``),
      ) as Root;

    expect(tree.children[0]?.type).toBe("code");
  });
});
