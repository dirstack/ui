import {
  Add01Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  Copy01Icon,
  Delete02Icon,
  Edit02Icon,
  Image01Icon,
  InformationCircleIcon,
  Megaphone01Icon,
  SparklesIcon as SparklesDef,
  Tick02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react"

/**
 * Demo-only icons for the sandbox fixtures. The published package ships no icon registry —
 * each consuming app supplies its own — so this helper exists purely to make the fixtures
 * expressive. It never leaves `sandbox/`.
 */
type IconProps = Omit<HugeiconsProps, "icon" | "altIcon" | "showAlt">

function icon(def: IconSvgElement) {
  return (props: IconProps) => <HugeiconsIcon icon={def} size="1em" strokeWidth={1.75} {...props} />
}

export const InfoIcon = icon(InformationCircleIcon)
export const MegaphoneIcon = icon(Megaphone01Icon)
export const UsersIcon = icon(UserMultiple02Icon)
export const ImageIcon = icon(Image01Icon)
export const PlusIcon = icon(Add01Icon)
export const ArrowRightIcon = icon(ArrowRight02Icon)
export const TrashIcon = icon(Delete02Icon)
export const CalendarIcon = icon(Calendar03Icon)
export const CheckIcon = icon(Tick02Icon)
export const CopyIcon = icon(Copy01Icon)
export const PencilIcon = icon(Edit02Icon)
export const SparklesIcon = icon(SparklesDef)
