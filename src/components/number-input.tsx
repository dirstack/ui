import type { ComponentProps } from "react"
import { Input } from "~/components/input"

type NumberInputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange" | "type"> & {
  value: number | null | undefined
  onValueChange: (value: number | null | undefined) => void
  integer?: boolean
  nullable?: boolean
}

/**
 * A numeric input for react-hook-form fields. A cleared input yields `undefined`
 * (validates as required instead of "expected number, received NaN"), or `null`
 * when `nullable`, for optional constraints edited via a partial patch where
 * undefined means "leave unchanged" and only null clears the stored value.
 */
export function NumberInput({
  value,
  onValueChange,
  integer,
  nullable,
  ...props
}: NumberInputProps) {
  function parse(raw: string) {
    if (raw === "") return nullable ? null : undefined
    return integer ? Number.parseInt(raw, 10) : Number.parseFloat(raw)
  }

  return (
    <Input
      type="number"
      value={value ?? ""}
      onChange={event => onValueChange(parse(event.target.value))}
      {...props}
    />
  )
}
