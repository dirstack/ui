import type { ComponentProps } from "react"
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs"

type ViewTabsProps<T extends string> = Omit<
  ComponentProps<typeof Tabs>,
  "value" | "defaultValue" | "onValueChange"
> & {
  value: T
  /**
   * The view that maps to no `?view=` param, so the URL stays clean on the default tab.
   */
  defaultValue: T
  options: { value: T; label: string }[]
  onChange: (view: T | undefined) => void
}

/**
 * Header tab switcher bound to a list route's `view` search param. Emits `undefined` for the
 * default view so the route can drop it from the URL instead of writing `?view=<default>`.
 */
export function ViewTabs<T extends string>({
  value,
  defaultValue,
  options,
  onChange,
  ...props
}: ViewTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onValueChange={(next: unknown) => onChange(next === defaultValue ? undefined : (next as T))}
      {...props}
    >
      <TabsList>
        {options.map(option => (
          <TabsTrigger key={option.value} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
