import type { ReactNode } from "react"
import type {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form"
import { FieldRow } from "~/components/field-row"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form"

/**
 * `stack` puts the label above a full-width control, for dialogs and the checkout form;
 * `rows` puts the label and its description beside the control, for a `divide-y`
 * settings-style body.
 */
export type FormRowLayout = "rows" | "stack"

type FormRowProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = Omit<ControllerProps<TFieldValues, TName, TTransformedValues>, "render"> & {
  label: ReactNode
  description?: ReactNode
  isRequired?: boolean
  layout?: FormRowLayout
  className?: string
  /**
   * Extra classes for the label itself, e.g. `text-xs` in a dense fieldset or
   * `sr-only` where the surrounding row already names the control.
   */
  labelClassName?: string
  /**
   * Extra classes for the control column in `rows` layout, e.g. `sm:items-end`
   * to keep a switch at its intrinsic width instead of stretching.
   */
  controlClassName?: string
  children: (field: ControllerRenderProps<TFieldValues, TName>) => ReactNode
}

/**
 * One labelled form field in whichever frame the surrounding form asked for. Both layouts
 * keep the `FormItem` / `FormLabel` / `FormControl` / `FormMessage` wiring, so validation,
 * `htmlFor`, and the `aria-describedby` links behave the same either way.
 */
export function FormRow<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  label,
  description,
  isRequired,
  layout = "stack",
  className,
  labelClassName,
  controlClassName,
  children,
  ...props
}: FormRowProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <FormField
      {...props}
      render={({ field }) => {
        if (layout === "rows") {
          return (
            <FieldRow
              render={<FormItem />}
              label={
                <FormLabel isRequired={isRequired} className={labelClassName}>
                  {label}
                </FormLabel>
              }
              description={description && <FormDescription>{description}</FormDescription>}
              className={className}
              controlClassName={controlClassName}
            >
              <FormControl>{children(field)}</FormControl>

              <FormMessage />
            </FieldRow>
          )
        }

        return (
          <FormItem className={className}>
            <FormLabel isRequired={isRequired} className={labelClassName}>
              {label}
            </FormLabel>

            <FormControl>{children(field)}</FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
