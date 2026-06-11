import { describe, expect, it } from "vitest";
import render from "preact-render-to-string";
import type { VNode } from "preact";
import PeekQuotes from "../src/components/PeekQuotes";
import { createComponentProps } from "./helpers";

describe("PeekQuotes", () => {
  it("marks the configured highlight as the peek anchor", () => {
    const Component = PeekQuotes({
      text: "Before context. Anchor phrase. After context.",
      highlight: "Anchor phrase",
    });

    const html = render(Component(createComponentProps()) as VNode);

    expect(html).toContain('data-peek-quotes="true"');
    expect(html).toContain('data-peek-highlight="true"');
    expect(html).toContain("Anchor phrase");
  });

  it("reads text and highlight from frontmatter", () => {
    const Component = PeekQuotes();

    const html = render(
      Component(
        createComponentProps({
          frontmatter: {
            title: "Interview",
            peekQuote: {
              text: "Earlier words. The selected sentence. Later words.",
              highlight: "The selected sentence",
            },
          },
        }),
      ) as VNode,
    );

    expect(html).toContain("Earlier words");
    expect(html).toContain("The selected sentence");
    expect(html).toContain("Later words");
  });
});
