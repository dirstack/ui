# Agent Guidelines for @dirstack/ui

> `CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`, never `CLAUDE.md`.

## What this is

A public npm package (`@dirstack/ui`, MIT): a shared React component library built on **Base UI** + **Tailwind v4**, consumed by multiple products (revinel, and the analytics app). It is **product-agnostic** on purpose. No business/domain logic, no product branding (logos live in each consuming app), no data fetching, no router or auth.

Only genuinely reusable UI primitives belong here. If something is specific to one product, it stays in that product's app.

## Layout & exports

- `src/components/*.tsx` — one component per file; each is auto-exposed as a subpath via the `"./*"` wildcard export (e.g. `src/components/card.tsx` → `@dirstack/ui/card`).
- `src/lib/{variants,classes,slot,interactive}.ts` — explicitly exported helper subpaths (`@dirstack/ui/variants`, etc.).
- `src/lib/icons.tsx` — **INTERNAL, not exported.** A small set of structural glyphs (chevrons, check, x, loader, search) the package's own components render, via a Hugeicons `icon()` factory. There is deliberately **no public icon registry** — icon choice is the consuming app's concern. Components that take an icon as *data* accept it as a prop; never bake an app-facing registry in here.
- `src/styles.css` — the design-system theme (all `@theme` tokens, dark mode via `light-dark()`, `tailwindcss-animate`, self-scanning `@source`). Consumers `@import "@dirstack/ui/styles.css"`. Components emit semantic token utilities (`bg-background`, `text-muted-foreground`, ...); never hardcode colors.
- `sandbox/` — react-cosmos fixtures (not shipped; `files: ["dist"]`).

## Conventions

- **Named exports only** (kodeks bans default exports). **No relative imports** — use the `~/*` alias (`~/components/*`, `~/lib/*`).
- **Props**: type with `ComponentProps<"tag">` / `ComponentProps<typeof Base>`, destructure `{ className, ...props }`, spread `...props` to the root, merge `className` via `cn`. Extend the wrapped component's full prop type; expose `tailwind-variants` `VariantProps`. Forward everything so consumers can pass any native/future prop.
- **oxfmt style**: no semicolons, double quotes, trailing commas, `arrowParens: avoid`, print width 100. Enforced by `@dirstack/kodeks` (oxlint + oxfmt) via lefthook on commit.
- Peer deps (consumers provide): `react`, `react-dom`, `tailwindcss`, `tailwindcss-animate`, `@base-ui/react`, `react-hook-form`. Don't add a heavy new runtime dependency without cause.

## Adding or changing a component

1. Create/edit `src/components/<name>.tsx` (named export, props pattern above; structural icons from `~/lib/icons`, data icons as props).
2. Add a fixture in `sandbox/fixtures/<name>.fixture.tsx` covering its meaningful states/variants.
3. Extend `test/smoke.test.ts` if it's a notable new subpath.
4. It auto-publishes via the `"./*"` wildcard — no `exports` edit unless it ships a companion named export a consumer imports.

## Dev loop & quality

- `bun install`
- `bun run sandbox` — react-cosmos on http://localhost:5000, isolated component dev against the real theme.
- `bun run dev` — `tsdown --watch`, for when a consumer `bun link`s this package and wants rebuild-on-save.
- Quality gate (also run in CI): `bun run typecheck` · `bun run lint` · `bun test` · `bun run build`.

## Releasing

Conventional commits only. Push to `main` → CI runs the quality gate → **semantic-release** publishes to npm via the **OIDC trusted publisher** (tokenless, with provenance). `feat:` → minor, `fix:` → patch, `feat!:`/`BREAKING CHANGE:` → major. After a release, consumers bump their `@dirstack/ui` version. Do NOT publish manually; do not add a long-lived npm token.
