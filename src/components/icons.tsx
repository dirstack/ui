import {
  Add01Icon,
  Alert02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Book02Icon,
  Bug01Icon,
  Calendar03Icon,
  CalendarCheckIn01Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  CircleIcon as CircleDef,
  Copy01Icon,
  CreditCardIcon as CreditCardDef,
  CursorPointer01Icon,
  CustomerSupportIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  Diamond02Icon,
  Edit02Icon,
  FingerPrintIcon,
  HashtagIcon,
  HelpCircleIcon,
  Image01Icon,
  ImageUpload01Icon,
  InformationCircleIcon,
  Key01Icon,
  Link04Icon,
  Loading03Icon,
  Logout03Icon,
  Mail01Icon,
  Megaphone01Icon,
  Menu01Icon,
  MoreVerticalIcon as MoreVerticalDef,
  PaintBoardIcon,
  PauseIcon as PauseDef,
  PlayIcon as PlayDef,
  Refresh01Icon,
  RowsThreeIcon,
  Search01Icon,
  Settings02Icon,
  SlidersHorizontalIcon,
  SourceCodeIcon,
  SparklesIcon as SparklesDef,
  SquareArrowDown01Icon,
  TextAlignLeftIcon as TextAlignLeftDef,
  TextFontIcon,
  Tick02Icon,
  ToggleOffIcon,
  Unarchive03Icon,
  UnavailableIcon,
  UnfoldMoreIcon,
  User02Icon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type HugeiconsProps, type IconSvgElement } from "@hugeicons/react"
import type { ComponentType } from "react"

export type IconProps = Omit<HugeiconsProps, "icon" | "altIcon" | "showAlt">
export type IconComponent = ComponentType<IconProps>

/**
 * Wraps a Hugeicons definition as a plain icon component, so call sites render `<CheckIcon />`
 * and the icon set stays a single-file decision. Sizes to `1em` so a `size-*` class or the
 * surrounding font size drives it.
 */
function icon(def: IconSvgElement, name: string): IconComponent {
  function Icon(props: IconProps) {
    return <HugeiconsIcon icon={def} size="1em" strokeWidth={1.75} {...props} />
  }

  Icon.displayName = name

  return Icon
}

export const AlignLeftIcon = icon(TextAlignLeftDef, "AlignLeftIcon")
export const ArchiveRestoreIcon = icon(Unarchive03Icon, "ArchiveRestoreIcon")
export const ArrowLeftIcon = icon(ArrowLeft02Icon, "ArrowLeftIcon")
export const ArrowRightIcon = icon(ArrowRight02Icon, "ArrowRightIcon")
export const ArrowUpRightIcon = icon(ArrowUpRight01Icon, "ArrowUpRightIcon")
export const BanIcon = icon(UnavailableIcon, "BanIcon")
export const BookOpenIcon = icon(Book02Icon, "BookOpenIcon")
export const BugIcon = icon(Bug01Icon, "BugIcon")
export const CalendarClockIcon = icon(CalendarCheckIn01Icon, "CalendarClockIcon")
export const CalendarIcon = icon(Calendar03Icon, "CalendarIcon")
export const CheckIcon = icon(Tick02Icon, "CheckIcon")
export const ChevronDownIcon = icon(ArrowDown01Icon, "ChevronDownIcon")
export const ChevronLeftIcon = icon(ArrowLeft01Icon, "ChevronLeftIcon")
export const ChevronRightIcon = icon(ArrowRight01Icon, "ChevronRightIcon")
export const ChevronUpIcon = icon(ArrowUp01Icon, "ChevronUpIcon")
export const ChevronsUpDownIcon = icon(UnfoldMoreIcon, "ChevronsUpDownIcon")
export const CircleCheckIcon = icon(CheckmarkCircle02Icon, "CircleCheckIcon")
export const CircleHelpIcon = icon(HelpCircleIcon, "CircleHelpIcon")
export const CircleIcon = icon(CircleDef, "CircleIcon")
export const CircleXIcon = icon(CancelCircleIcon, "CircleXIcon")
export const CodeIcon = icon(SourceCodeIcon, "CodeIcon")
export const CopyIcon = icon(Copy01Icon, "CopyIcon")
export const CreditCardIcon = icon(CreditCardDef, "CreditCardIcon")
export const FingerprintIcon = icon(FingerPrintIcon, "FingerprintIcon")
export const GemIcon = icon(Diamond02Icon, "GemIcon")
export const HashIcon = icon(HashtagIcon, "HashIcon")
export const ImageIcon = icon(Image01Icon, "ImageIcon")
export const ImageUpIcon = icon(ImageUpload01Icon, "ImageUpIcon")
export const InfoIcon = icon(InformationCircleIcon, "InfoIcon")
export const KeyRoundIcon = icon(Key01Icon, "KeyRoundIcon")
export const LayoutDashboardIcon = icon(DashboardSquare01Icon, "LayoutDashboardIcon")
export const LifeBuoyIcon = icon(CustomerSupportIcon, "LifeBuoyIcon")
export const LinkIcon = icon(Link04Icon, "LinkIcon")
export const LoaderIcon = icon(Loading03Icon, "LoaderIcon")
export const LogOutIcon = icon(Logout03Icon, "LogOutIcon")
export const MailIcon = icon(Mail01Icon, "MailIcon")
export const MegaphoneIcon = icon(Megaphone01Icon, "MegaphoneIcon")
export const MenuIcon = icon(Menu01Icon, "MenuIcon")
export const MoreVerticalIcon = icon(MoreVerticalDef, "MoreVerticalIcon")
export const MousePointerClickIcon = icon(CursorPointer01Icon, "MousePointerClickIcon")
export const PaletteIcon = icon(PaintBoardIcon, "PaletteIcon")
export const PauseIcon = icon(PauseDef, "PauseIcon")
export const PencilIcon = icon(Edit02Icon, "PencilIcon")
export const PlayIcon = icon(PlayDef, "PlayIcon")
export const PlusIcon = icon(Add01Icon, "PlusIcon")
export const RotateCwIcon = icon(Refresh01Icon, "RotateCwIcon")
export const Rows3Icon = icon(RowsThreeIcon, "Rows3Icon")
export const SearchIcon = icon(Search01Icon, "SearchIcon")
export const Settings2Icon = icon(SlidersHorizontalIcon, "Settings2Icon")
export const SettingsIcon = icon(Settings02Icon, "SettingsIcon")
export const SparklesIcon = icon(SparklesDef, "SparklesIcon")
export const SquareChevronDownIcon = icon(SquareArrowDown01Icon, "SquareChevronDownIcon")
export const ToggleLeftIcon = icon(ToggleOffIcon, "ToggleLeftIcon")
export const TrashIcon = icon(Delete02Icon, "TrashIcon")
export const TriangleAlertIcon = icon(Alert02Icon, "TriangleAlertIcon")
export const TypeIcon = icon(TextFontIcon, "TypeIcon")
export const UserRoundIcon = icon(User02Icon, "UserRoundIcon")
export const UsersIcon = icon(UserMultiple02Icon, "UsersIcon")
export const XIcon = icon(Cancel01Icon, "XIcon")
