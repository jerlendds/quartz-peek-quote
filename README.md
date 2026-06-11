# Quartz Peek Quotes

`quartz-peek-quotes` is a Quartz v5 component plugin for draggable quote cards. It renders a full
text excerpt as one laid-out document, marks a configured passage as the anchor, and lets readers
drag the side handle up or down to reveal surrounding context through a clipped viewport.

The interaction is a masked reveal, not a scroll container:

- dragging up reveals earlier text above the highlighted passage
- dragging down reveals later text below the highlighted passage
- the highlighted text remains the semantic anchor
- the dashed guide shows displacement from the anchor center

## Usage

Install the plugin in a Quartz v5 site:

```bash
npx quartz plugin add github:jerlendds/quartz-peek-quotes
```

Add the component to a layout position in `quartz.config.yaml`:

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quotes
    enabled: true
    layout:
      position: right
      priority: 50
```

For TypeScript layout overrides, import it from the generated plugin index:

```ts
import Plugin from "./.quartz/plugins";

export const layout = {
  right: [
    Plugin.PeekQuotes({
      text: "Earlier context. The selected sentence. Later context.",
      highlight: "The selected sentence",
    }),
  ],
};
```

## Page Frontmatter

If `text` and `highlight` are not passed as component options, the component reads page frontmatter:

```yaml
peekQuote:
  text: |
    Earlier context from the interview.

    The selected sentence remains the anchor.

    Later context can be revealed by dragging down.
  highlight: "The selected sentence remains the anchor."
```

Short aliases are also supported:

```yaml
peekText: "Earlier context. Anchor phrase. Later context."
peekHighlight: "Anchor phrase"
```

## Options

| Option          | Type     | Default           | Description                                     |
| --------------- | -------- | ----------------- | ----------------------------------------------- |
| `text`          | `string` | demo              | Full source text rendered in document order.    |
| `highlight`     | `string` | demo              | Exact text fragment to wrap in the anchor mark. |
| `className`     | `string` | `peek-quotes`     | Root CSS class.                                 |
| `handleLabel`   | `string` | descriptive label | Accessible label for the drag handle.           |
| `maxPeekAbove`  | `number` | `320`             | Maximum pixels revealed above the anchor.       |
| `maxPeekBelow`  | `number` | `360`             | Maximum pixels revealed below the anchor.       |
| `snapThreshold` | `number` | `80`              | Drag distance before release snaps open.        |

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```

`dist/` is committed for Quartz pre-built plugin distribution.
