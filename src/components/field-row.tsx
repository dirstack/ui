import type { ComponentProps } from "react"
import { DetailRow } from "~/components/detail-row"

type FieldRowProps = Omit<ComponentProps<typeof DetailRow>, "density" | "valueClassName"> & {
  /**
   * Extra classes for the control column, e.g. `sm:items-end` to keep a button
   * at its intrinsic width instead of stretching.
   */
  controlClassName?: string
}

/**
 * One line of a form section: label and description on the left, the control on the right.
 * The form-density `DetailRow`, named for the way forms read.
 */
export function FieldRow({ controlClassName, ...props }: FieldRowProps) {
  return <DetailRow density="form" valueClassName={controlClassName} {...props} />
}
