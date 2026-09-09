import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { Button } from "~/components/button"
import { Tooltip } from "~/components/tooltip"
import { CheckIcon, CopyIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

/**
 * Copies text to the clipboard and flips `copied` to `true` for `timeout` ms, then back.
 * A tiny local stand-in for `@mantine/hooks`' `useClipboard`, so the package carries no
 * extra hook dependency.
 */
function useClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = useCallback(
    (value: string) => {
      clearTimeout(timer.current)

      navigator.clipboard.writeText(value).then(
        () => {
          setCopied(true)
          timer.current = setTimeout(() => setCopied(false), timeout)
        },
        () => setCopied(false),
      )
    },
    [timeout],
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return { copied, copy }
}

type CopyButtonProps = Omit<ComponentProps<typeof Button>, "prefix" | "onClick" | "children"> & {
  value: string
  /**
   * Visible label. Left out, the button is icon-only with a tooltip.
   */
  label?: ReactNode
  /**
   * What the label reads while the copied state is showing.
   */
  copiedLabel?: ReactNode
  tooltip?: ReactNode
}

/**
 * Copies `value` to the clipboard and swaps its icon to a check for a couple of seconds. Owns the
 * tooltip so the copied state survives the tooltip closing on click.
 */
export function CopyButton({
  value,
  label,
  copiedLabel = "Copied",
  tooltip = label ? undefined : "Copy to clipboard",
  className,
  ...props
}: CopyButtonProps) {
  const clipboard = useClipboard({ timeout: 2000 })

  return (
    <Tooltip tooltip={tooltip && (clipboard.copied ? copiedLabel : tooltip)}>
      <Button
        type="button"
        size="sm"
        aria-label={label ? undefined : "Copy to clipboard"}
        prefix={clipboard.copied ? <CheckIcon className="text-success" /> : <CopyIcon />}
        onClick={() => clipboard.copy(value)}
        className={cn(!label && "pointer-coarse:size-10", className)}
        {...props}
      >
        {label && (clipboard.copied ? copiedLabel : label)}
      </Button>
    </Tooltip>
  )
}
