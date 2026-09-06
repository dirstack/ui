"use client"

import type { ComponentProps } from "react"
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs"

export type ViewTabsProps<T extends string> = Omit<
  ComponentProps<typeof Tabs>,
  "value" | "defaultValue" | "onValueChange" | "onChange"
> & {
  value: T
  /**
   * The view that maps to no `?view=` param, so the URL stays clean on the default tab.
   */
  defaultValue: T
  options: { value: T; label: string }[]
  onChange: (view: T | undefined) => void
  /**
   * Forwarded to `TabsList`: `segmented` (default) for a header, `plain` inside a card.
   */
  variant?: ComponentProps<typeof TabsList>["variant"]
}

/**
 * Tab switcher bound to a route's `view` search param. Emits `undefined` for the default view
 * so the route can drop it from the URL instead of writing `?view=<default>`.
 */
export function ViewTabs<T extends string>({
  value,
  defaultValue,
  options,
  onChange,
  variant,
  className,
  ...props
}: ViewTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onValueChange={(next: T) => onChange(next === defaultValue ? undefined : next)}
      className={className}
      {...props}
    >
      <TabsList variant={variant}>
        {options.map(option => (
          <TabsTrigger key={option.value} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
