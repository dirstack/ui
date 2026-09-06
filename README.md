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
import { cn, variants } from "@dirstack/ui/variants"

export function Example() {
  return <Button variant="primary">Save</Button>
}
```

The shared helpers live at fixed subpaths: `@dirstack/ui/variants` (`cn`, `variants`, `VariantProps`), `@dirstack/ui/classes` (shared class strings), `@dirstack/ui/slot`, `@dirstack/ui/interactive` (`interactiveVariants`), and `@dirstack/ui/animation` (`ANIMATION_DURATION`, `ANIMATION_EASING` — the shared motion timing, for syncing your own transitions with the library's).

## Styles

The package ships its own theme. Import it once in your Tailwind v4 entry, after `@import "tailwindcss"`:

```css
@import "tailwindcss";
@import "@dirstack/ui/styles.css";
```

That stylesheet carries the full design-token set (`--color-*` mirroring the shadcn/ui variable names plus `success`/`warning`/`danger` trios, `--font-*`, `--spacing-*`, keyframes), the `tailwindcss-animate` plugin, and a `@source` directive that scans the library so its utility classes are generated for you. You do not need to add the package to your own `@source` list.

Every color is a `light-dark()` pair driven by `color-scheme`: left alone it follows the OS, and `data-theme="dark"` or `data-theme="light"` on `<html>` forces one. The theme expects the consumer to load the "Inter Variable" font; without it, type falls back to the system stack.

`@dirstack/ui/theme` manages that attribute for you: `useTheme()` returns `[theme, setTheme]` (`"system" | "light" | "dark"`), persists the choice in `localStorage.theme`, keeps tabs in sync, and `ThemeSelect` is a ready-made segmented System / Light / Dark control. The hook applies the stored theme once it mounts; to avoid a flash of the wrong scheme, apply it before first paint with this inline script in `<head>`:

```html
<script>try{var t=localStorage.theme;if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>
```

Override any token in your own CSS to re-theme:

```css
@theme {
  --color-primary: light-dark(oklch(0.6 0.2 250), oklch(0.7 0.18 250));
}
```

## Peer dependencies

- `react` >= 19 and `react-dom` >= 19
- `@base-ui/react` >= 1
- `react-hook-form` >= 7 (only for the form components)
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
