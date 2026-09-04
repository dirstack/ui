import type { ComponentProps } from "react"
import { Input } from "~/components/input"
import { SearchIcon, XIcon } from "~/lib/icons"
import { cn } from "~/lib/variants"

type SearchInputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string
  onChange: (value: string) => void
}

/**
 * Text input with a leading search icon and a clear button once it holds a value. Labels and
 * placeholders come from the caller.
 */
export function SearchInput({ value, onChange, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        className="px-9"
        onChange={event => onChange(event.target.value)}
        {...props}
      />

      {value.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute top-1/2 right-1.5 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          onClick={() => onChange("")}
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}
