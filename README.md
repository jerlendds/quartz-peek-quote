# Quartz Peek Quotes

`quartz-peek-quote` is a Quartz v5 transformer/component plugin for draggable quote cards. It
renders a full text excerpt as one laid-out document, marks a configured passage as the anchor, and
lets readers drag the side handle up or down to reveal surrounding context through a clipped
viewport.

The interaction is a masked reveal, not a scroll container:

- dragging up reveals earlier text above the highlighted passage
- dragging down reveals later text below the highlighted passage
- the highlighted text remains the semantic anchor
- the dashed guide shows displacement from the anchor center

## Usage

Install the plugin in a Quartz v5 site:

```bash
npx quartz plugin add github:jerlendds/quartz-peek-quote
```

Enable the plugin in `quartz.config.yaml`:

```yaml
plugins:
  - source: github:darkmindsxyz/quartz-peek-quote
    enabled: true
```

Then place a peek quote anywhere in Markdown with a fenced `peek` block:

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
  highlightColor: "#faf61148"
```
````

The fenced block renders inline where it appears in the document. Layout and interaction options in
the `peekQuote:` block apply only to that one peek quote, so each excerpt can tune its own reveal
distance and snap behavior.

For TypeScript layout overrides, the component is still available for explicit programmatic use:

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

## Options

| Option           | Type     | Default           | Description                               |
| ---------------- | -------- | ----------------- | ----------------------------------------- |
| `language`       | `string` | `peek`            | Fenced code language transformed inline.  |
| `className`      | `string` | `peek-quotes`     | Root CSS class.                           |
| `handleLabel`    | `string` | descriptive label | Accessible label for the drag handle.     |
| `maxPeekAbove`   | `number` | `320`             | Maximum pixels revealed above the anchor. |
| `maxPeekBelow`   | `number` | `360`             | Maximum pixels revealed below the anchor. |
| `snapThreshold`  | `number` | `80`              | Drag distance before release snaps open.  |
| `highlightColor` | `string` | `#fff200`         | CSS color for the highlighted anchor.     |

The programmatic component also accepts `text` and `highlight`. Frontmatter is not supported.

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```

`dist/` is committed for Quartz pre-built plugin distribution.
