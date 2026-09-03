import { describe, expect, test } from "bun:test"

/**
 * Smoke test that the public entry points import cleanly from source and expose the expected
 * shapes. It is not a rendering test (no DOM needed) — it exists so `bun test` has a real,
 * green check that catches gross breakage (a bad export, a broken import graph) in CI.
 */
describe("@dirstack/ui exports", () => {
  test("component subpaths export their components", async () => {
    const { Button } = await import("~/components/button")
    const { Badge } = await import("~/components/badge")
    const { Input } = await import("~/components/input")
    const { Stack } = await import("~/components/stack")
    const { Skeleton } = await import("~/components/skeleton")
    const { Kbd } = await import("~/components/kbd")

    for (const component of [Button, Badge, Input, Stack, Skeleton, Kbd]) {
      expect(typeof component).toBe("function")
    }
  })

  test("icon registry exports icon components", async () => {
    const icons = await import("~/components/icons")

    expect(typeof icons.CheckIcon).toBe("function")
    expect(typeof icons.TrashIcon).toBe("function")
    expect(typeof icons.PlusIcon).toBe("function")
  })

  test("lib subpaths export their helpers", async () => {
    const { cn, variants } = await import("~/lib/variants")
    const { boxVariants } = await import("~/components/box")

    expect(typeof cn).toBe("function")
    expect(typeof variants).toBe("function")
    expect(typeof boxVariants).toBe("function")
  })
})
