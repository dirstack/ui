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

  test("promoted component subpaths export their components", async () => {
    const { Card } = await import("~/components/card")
    const { Header } = await import("~/components/header")
    const { EmptyState } = await import("~/components/empty-state")
    const { Callout } = await import("~/components/callout")
    const { EntityAvatar } = await import("~/components/entity-avatar")
    const { Toaster } = await import("~/components/toaster")

    for (const component of [Card, Header, EmptyState, Callout, EntityAvatar, Toaster]) {
      expect(typeof component).toBe("function")
    }
  })

  test("the package ships no public icon registry", async () => {
    expect(import("~/components/icons")).rejects.toThrow()
  })

  test("lib subpaths export their helpers", async () => {
    const { cn, variants } = await import("~/lib/variants")
    const { boxVariants } = await import("~/components/box")

    expect(typeof cn).toBe("function")
    expect(typeof variants).toBe("function")
    expect(typeof boxVariants).toBe("function")
  })
})
