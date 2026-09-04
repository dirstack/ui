import type { ComponentProps } from "react"
import { Button } from "~/components/button"
import { Input } from "~/components/input"
import { SearchIcon, XIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

type SearchInputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string
  onValueChange: (value: string) => void
}

/**
 * Text input with a leading search icon and a clear button once it holds a value. Labels and
 * placeholders come from the caller.
 */
export function SearchInput({ value, onValueChange, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        className="px-9"
        onChange={event => onValueChange(event.target.value)}
        {...props}
      />

      {value.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          aria-label="Clear search"
          prefix={<XIcon />}
          className="absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => onValueChange("")}
        />
      )}
    </div>
  )
}
