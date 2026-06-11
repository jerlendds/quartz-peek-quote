# Peek Quotes Examples

Practical examples for using `quartz-peek-quotes` in a Quartz v5 site.

## 1. Enable the Plugin

Install the plugin, then enable it in `quartz.config.yaml`.

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quotes
    enabled: true
```

## 2. Inline Markdown Quote

Place a fenced `peek` block wherever the quote should appear in the Markdown document.

````md
```peek
peekQuote:
  text: |
    The witness began with the weather.

    The selected sentence stayed in the transcript because it changed how the rest of the interview should be read.

    Only later did the surrounding details make the statement feel complete.
  highlight: "The selected sentence stayed in the transcript because it changed how the rest of the interview should be read."
  maxPeekAbove: 280
  maxPeekBelow: 340
  snapThreshold: 72
  highlightColor: "#ffd84d2f"
```
````

The transformer replaces that code fence with the draggable quote card inline. Values inside
`peekQuote:` apply only to that one peek, so each quote can tune its own reveal distance, snap
threshold, and highlight color.

## 3. Programmatic Component

The component can still be instantiated directly from a TypeScript layout override:

```ts
import Plugin from "./.quartz/plugins";

export const layout = {
  right: [Plugin.PeekQuotes()],
};
```

Pass the full document text and the exact highlighted fragment to the component.

```ts
import Plugin from "./.quartz/plugins";

export const layout = {
  right: [
    Plugin.PeekQuotes({
      text: `The witness began with the weather.

The selected sentence stayed in the transcript because it changed how the rest of the interview should be read.

Only later did the surrounding details make the statement feel complete.`,
      highlight:
        "The selected sentence stayed in the transcript because it changed how the rest of the interview should be read.",
      maxPeekAbove: 280,
      maxPeekBelow: 340,
      snapThreshold: 72,
      highlightColor: "#ffd84d2f",
    }),
  ],
};
```

## 4. Site Defaults from YAML

Use plugin options for fallback drag distances across the site.

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quotes
    enabled: true
    options:
      maxPeekAbove: 280
      maxPeekBelow: 340
      snapThreshold: 72
```

Per-peek options in Markdown and per-component options in TypeScript override those defaults:

````md
```peek
peekQuote:
  text: "Earlier context. The selected sentence. Later context."
  highlight: "The selected sentence"
  maxPeekAbove: 360
```
````

## 5. Custom Handle Label

Use `handleLabel` when the default accessible label does not fit the context.

```ts
Plugin.PeekQuotes({
  handleLabel: "Drag to reveal surrounding interview context",
});
```

## 6. Styling Hook

Pass a custom root class if the component needs page-specific sizing or placement.

```ts
Plugin.PeekQuotes({
  className: "peek-quotes interview-peek",
});
```

```scss
.interview-peek {
  --peek-highlight-color: #ffd84d2f;
  --peek-muted: var(--secondary);
}
```

## 7. Behavior Summary

The component measures the rendered `<mark>` anchor in the browser, then updates CSS variables for
the viewport mask:

```txt
viewportTop = -peekAbove
viewportHeight = anchor.height + peekAbove + peekBelow
documentY = -(anchor.y - peekAbove)
```

Dragging up reveals earlier content. Dragging down reveals later content. The document itself is not
scrolled; the visible crop expands around the highlighted anchor.
