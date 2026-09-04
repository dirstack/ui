import { defineConfig } from "tsdown"

/**
 * Multi-entry, module-preserving build. Every source file maps to its own output so the
 * package.json `exports` can expose each component as its own subpath (`@dirstack/ui/button`,
 * `@dirstack/ui/variants`, ...). `unbundle` keeps the source module graph intact (one file
 * in, one file out) and rewrites the `~/*` alias to relative imports between the emitted
 * files. Peer deps and runtime deps stay external. `styles.css` is copied verbatim to dist
 * root so the consumer's Tailwind pipeline (not ours) processes it.
 */
export default defineConfig({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  format: "esm",
  dts: true,
  unbundle: true,
  outDir: "dist",
  // Emit `.js` / `.d.ts` (not `.mjs` / `.d.mts`) so the `exports` map subpaths resolve.
  // Safe because the package is `"type": "module"`, so `.js` is already ESM.
  fixedExtension: false,
  external: [
    /^react($|\/)/,
    /^react-dom($|\/)/,
    /^@base-ui\/react($|\/)/,
    /^@hugeicons\//,
    /^@number-flow\/react($|\/)/,
    "react-hook-form",
    "recharts",
    "sonner",
    "tailwind-variants",
    "cn",
    "tailwindcss",
  ],
  copy: [{ from: "src/styles.css", to: "dist" }],
})
