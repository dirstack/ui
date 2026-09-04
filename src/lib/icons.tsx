import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  CircleIcon as CircleDef,
  Copy01Icon,
  HelpCircleIcon,
  Loading03Icon,
  Search01Icon,
  Tick02Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react"
import type { ComponentType } from "react"

export type IconProps = Omit<HugeiconsProps, "icon" | "altIcon" | "showAlt">
export type IconComponent = ComponentType<IconProps>

/**
 * Internal, non-exported icon helper. The package deliberately ships no public icon registry
 * (icon choice is product-specific and lives in each consuming app); this file only carries the
 * handful of structural glyphs the package's own components render. It lives in `lib/` rather
 * than `components/` so the `"./*": "./dist/components/*"` wildcard export never exposes it.
 *
 * Wraps a Hugeicons definition as a plain icon component, so call sites render `<CheckIcon />`.
 * Sizes to `1em` so a `size-*` class or the surrounding font size drives it.
 */
function icon(def: IconSvgElement, name: string): IconComponent {
  function Icon(props: IconProps) {
    return <HugeiconsIcon icon={def} size="1em" strokeWidth={1.75} {...props} />
  }

  Icon.displayName = name

  return Icon
}

export const CheckIcon = icon(Tick02Icon, "CheckIcon")
export const ChevronDownIcon = icon(ArrowDown01Icon, "ChevronDownIcon")
export const ChevronUpIcon = icon(ArrowUp01Icon, "ChevronUpIcon")
export const ChevronsUpDownIcon = icon(UnfoldMoreIcon, "ChevronsUpDownIcon")
export const CircleCheckIcon = icon(CheckmarkCircle02Icon, "CircleCheckIcon")
export const CircleHelpIcon = icon(HelpCircleIcon, "CircleHelpIcon")
export const CircleIcon = icon(CircleDef, "CircleIcon")
export const CircleXIcon = icon(CancelCircleIcon, "CircleXIcon")
export const CopyIcon = icon(Copy01Icon, "CopyIcon")
export const LoaderIcon = icon(Loading03Icon, "LoaderIcon")
export const SearchIcon = icon(Search01Icon, "SearchIcon")
export const XIcon = icon(Cancel01Icon, "XIcon")
