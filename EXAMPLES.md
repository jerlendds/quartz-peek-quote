# Peek Quotes Examples

Practical examples for using `quartz-peek-quotes` in a Quartz v5 site.

## 1. Add the Component to a Layout

Install the plugin, then place `PeekQuotes` in a Quartz layout slot.

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quotes
    enabled: true
    layout:
      position: right
      priority: 50
```

The component can also be instantiated directly from a TypeScript layout override:

```ts
import Plugin from "./.quartz/plugins";

export const layout = {
  right: [Plugin.PeekQuotes()],
};
```

## 2. Static Quote Text

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
    }),
  ],
};
```

## 3. Frontmatter-Driven Quote

If no `text` or `highlight` option is passed, the component reads the current page frontmatter.

```yaml
---
title: Interview Notes
peekQuote:
  text: |
    The witness began with the weather.

    The selected sentence stayed in the transcript because it changed how the rest of the interview should be read.

    Only later did the surrounding details make the statement feel complete.
  highlight: "The selected sentence stayed in the transcript because it changed how the rest of the interview should be read."
---
```

Short aliases are supported too:

```yaml
---
title: Interview Notes
peekText: "Earlier context. Anchor phrase. Later context."
peekHighlight: "Anchor phrase"
---
```

## 4. Site Defaults from YAML

Component-only plugins can receive merged YAML options through the exported `init()` hook. Use this
for default drag distances across the site.

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quotes
    enabled: true
    options:
      maxPeekAbove: 280
      maxPeekBelow: 340
      snapThreshold: 72
```

Per-component options passed in TypeScript still override those defaults:

```ts
Plugin.PeekQuotes({
  maxPeekAbove: 360,
});
```

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
  --peek-shell-height: 620px;
  --peek-card-width: min(520px, calc(100% - 46px));
}
```

## 7. Behavior Summary

The component measures the rendered `<mark>` anchor in the browser, then updates CSS variables for
the viewport mask:

```txt
viewportTop = anchor.y - peekAbove
viewportHeight = anchor.height + peekAbove + peekBelow
documentY = -viewportTop
```

Dragging up reveals earlier content. Dragging down reveals later content. The document itself is not
scrolled; the visible crop expands around the highlighted anchor.
