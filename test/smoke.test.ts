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
    const { Card, CardHeader, CardPanel } = await import("~/components/card")
    const { SectionHeader } = await import("~/components/section-header")
    const { EmptyState } = await import("~/components/empty-state")
    const { Callout } = await import("~/components/callout")
    const { EntityAvatar } = await import("~/components/entity-avatar")
    const { Toaster } = await import("~/components/toaster")

    const components = [
      Card,
      CardHeader,
      CardPanel,
      SectionHeader,
      EmptyState,
      Callout,
      EntityAvatar,
      Toaster,
    ]

    for (const component of components) {
      expect(typeof component).toBe("function")
    }
  })

  test("tier 1 component subpaths export their components", async () => {
    const { AnimatedNumber } = await import("~/components/animated-number")
    const { StatStrip, StatStripItem } = await import("~/components/stat-strip")
    const { Pagination } = await import("~/components/pagination")
    const { CopyInput } = await import("~/components/copy-input")
    const { NavButton, NavButtonSkeleton, NavIdentity } = await import("~/components/nav-button")

    const components = [
      AnimatedNumber,
      StatStrip,
      StatStripItem,
      Pagination,
      CopyInput,
      NavButton,
      NavButtonSkeleton,
      NavIdentity,
    ]

    for (const component of components) {
      expect(typeof component).toBe("function")
    }
  })

  test("dashboard primitive subpaths export their components", async () => {
    const { ThemeSelect, useTheme } = await import("~/components/theme")
    const { BarList } = await import("~/components/bar-list")

    for (const component of [ThemeSelect, useTheme, BarList, BarList.Row, BarList.Skeleton]) {
      expect(typeof component).toBe("function")
    }
  })

  test("the package ships no public icon registry", async () => {
    expect(import("~/components/icons")).rejects.toThrow()
  })

  test("lib subpaths export their helpers", async () => {
    const { cn, variants } = await import("~/lib/variants")
    const { interactiveVariants } = await import("~/lib/interactive")
    const { ANIMATION_DURATION, ANIMATION_EASING } = await import("~/lib/animation")

    expect(typeof cn).toBe("function")
    expect(typeof variants).toBe("function")
    expect(typeof interactiveVariants).toBe("function")
    expect(typeof ANIMATION_DURATION).toBe("number")
    expect(typeof ANIMATION_EASING).toBe("string")
  })
})
