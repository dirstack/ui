"use client"

import { type ComponentProps, useSyncExternalStore } from "react"
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs"

export type Theme = "system" | "light" | "dark"

const STORAGE_KEY = "theme"
const THEMES: readonly Theme[] = ["system", "light", "dark"]

/**
 * Tiny module store behind `useTheme`. One value shared by every subscriber, kept in step with
 * `localStorage` (and with other tabs through the `storage` event) and mirrored onto
 * `<html data-theme>`, which is what the stylesheet's `color-scheme` rules key on.
 */
const listeners = new Set<() => void>()
let current: Theme | undefined

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && THEMES.includes(value as Theme)
}

function readStored(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isTheme(stored) ? stored : "system"
  } catch {
    // Storage can be unavailable (privacy mode, sandboxed iframe) — fall back to the OS.
    return "system"
  }
}

function writeStored(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage being unavailable only costs persistence; the in-memory value still applies.
  }
}

/**
 * `system` clears the attribute so `color-scheme: light dark` follows the OS; anything else
 * pins it.
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement

  if (theme === "system") delete root.dataset.theme
  else root.dataset.theme = theme
}

function emit() {
  for (const listener of listeners) listener()
}

function onStorage(event: StorageEvent) {
  // `key === null` is a `clear()` from another tab; treat it as a reset.
  if (event.key !== null && event.key !== STORAGE_KEY) return

  current = readStored()
  applyTheme(current)
  emit()
}

function getSnapshot(): Theme {
  current ??= readStored()
  return current
}

function getServerSnapshot(): Theme {
  return "system"
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("storage", onStorage)
    // Apps that skip the inline script still land on the stored theme, one paint late.
    applyTheme(getSnapshot())
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener("storage", onStorage)
  }
}

function setTheme(theme: Theme) {
  if (theme === current) return

  current = theme
  writeStored(theme)
  applyTheme(theme)
  emit()
}

/**
 * The current theme and its setter. Persists to `localStorage["theme"]`, stays in sync across
 * tabs, and drives the stylesheet's `light-dark()` tokens by setting `data-theme` on `<html>`
 * (`system` removes it so the OS decides). SSR-safe: the server renders `system`.
 *
 * The hook only applies the stored theme once the first subscriber mounts. To avoid a flash of
 * the wrong scheme, apply it before first paint with this inline script in `<head>`:
 *
 * ```html
 * <script>try{var t=localStorage.theme;if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>
 * ```
 */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return [theme, setTheme]
}

type ThemeSelectProps = Omit<
  ComponentProps<typeof Tabs>,
  "value" | "defaultValue" | "onValueChange"
>

/**
 * Segmented System / Light / Dark control bound to `useTheme`, for a settings page or an
 * account menu.
 */
export function ThemeSelect({ className, ...props }: ThemeSelectProps) {
  const [theme, setTheme] = useTheme()

  return (
    <Tabs
      value={theme}
      onValueChange={(next: Theme) => setTheme(next)}
      className={className}
      {...props}
    >
      <TabsList variant="segmented" aria-label="Theme">
        <TabsTrigger value="system">System</TabsTrigger>
        <TabsTrigger value="light">Light</TabsTrigger>
        <TabsTrigger value="dark">Dark</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
