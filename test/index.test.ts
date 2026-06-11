import { describe, expect, it } from "vitest";
import * as plugin from "../src/index";

describe("public exports", () => {
  it("exports only the Peek Quotes public API", () => {
    expect(plugin).toHaveProperty("PeekQuotes");
    expect(plugin).toHaveProperty("PeekQuotesTransformer");
    expect(plugin).toHaveProperty("transformer");
    expect(plugin).toHaveProperty("initPeekQuotes");
    expect(plugin).toHaveProperty("init");
    expect(plugin).not.toHaveProperty("ExampleTransformer");
    expect(plugin).not.toHaveProperty("ExampleFilter");
    expect(plugin).not.toHaveProperty("ExampleEmitter");
  });
});
