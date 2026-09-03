# @dirstack/ui

A shared React component library. Headless-friendly components built on [Base UI](https://base-ui.com), styled with Tailwind CSS v4 design tokens, and shipped as per-component subpaths so you only pull in what you use.

## Install

```bash
bun add @dirstack/ui
# or: npm install @dirstack/ui
```

## Usage

Import each component from its own subpath:

```tsx
import { Button } from "@dirstack/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@dirstack/ui/dialog"
import { CheckIcon } from "@dirstack/ui/icons"
import { cn, variants } from "@dirstack/ui/variants"

export function Example() {
  return <Button variant="primary">Save</Button>
}
```

The three shared helpers live at fixed subpaths: `@dirstack/ui/variants` (`cn`, `variants`, `VariantProps`), `@dirstack/ui/classes` (shared class strings), and `@dirstack/ui/slot`.

## Styles

The package ships its own theme. Import it once in your Tailwind v4 entry, after `@import "tailwindcss"`:

```css
@import "tailwindcss";
@import "@dirstack/ui/styles.css";
```

That stylesheet carries the full design-token set (`--color-*`, `--font-*`, `--spacing-*`, keyframes), the dark-mode palette (OS `prefers-color-scheme` plus a forced `[data-theme="dark"]`), the `tailwindcss-animate` plugin, and a `@source` directive that scans the library so its utility classes are generated for you. You do not need to add the package to your own `@source` list.

Override any token in your own CSS to re-theme:

```css
@theme {
  --color-primary: oklch(0.6 0.2 250);
}
```

## Peer dependencies

- `react` >= 19 and `react-dom` >= 19
- `tailwindcss` >= 4
- `tailwindcss-animate` >= 1

## Development

```bash
bun install
bun run typecheck
bun run build    # tsdown: per-module JS + d.ts, plus dist/styles.css
```

## License

MIT © [Piotr Kulpinski](https://kulpinski.pl)
