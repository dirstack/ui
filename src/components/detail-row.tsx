import { useRender } from "@base-ui/react/use-render"
import { isValidElement, type ReactNode } from "react"
import { descriptionClasses } from "~/lib/classes"
import { slot } from "~/lib/slot"
import { variants, type VariantProps } from "~/lib/variants"

const detailRowVariants = variants({
  slots: {
    root: "",
    label: "",
    value: "",
  },

  variants: {
    density: {
      form: {
        root: "grid items-start gap-x-8 gap-y-3 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
        label: "flex min-w-0 flex-col gap-1",
        value: "flex w-full min-w-0 flex-col gap-2 sm:justify-self-end",
      },
      comfortable: {
        root: "grid items-start gap-x-8 gap-y-1 py-3 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]",
        label: "text-muted-foreground text-sm",
        value: "min-w-0 text-sm",
      },
      compact: {
        root: "flex items-baseline justify-between gap-4 py-2 first:pt-0 last:pb-0",
        label: "text-muted-foreground",
        value: "tabular-nums",
      },
    },
  },

  defaultVariants: {
    density: "comfortable",
  },
})

type DetailRowProps = useRender.ComponentProps<"div"> &
  VariantProps<typeof detailRowVariants> & {
    /**
     * Row label. Pass a `FormLabel` when the row wraps a form field so the label
     * keeps its `htmlFor` wiring.
     */
    label: ReactNode
    description?: ReactNode
    /**
     * Extra classes for the value column, e.g. `sm:items-end` to keep a button
     * at its intrinsic width instead of stretching.
     */
    valueClassName?: string
  }

/**
 * One "label plus value" line, in the three densities the app uses: `form` for an editable
 * settings row (label and description left, control right), `comfortable` for a detail card's
 * `<dl>`, `compact` for a sidebar timeline. Rows sit in a `divide-y` parent, which draws the
 * hairlines between them.
 */
export function DetailRow({
  density = "comfortable",
  label,
  description,
  valueClassName,
  className,
  children,
  render,
  ...props
}: DetailRowProps) {
  const styles = detailRowVariants({ density })
  const isForm = density === "form"
  const LabelTag = isForm ? "div" : "dt"
  const ValueTag = isForm ? "div" : "dd"

  return useRender({
    render,
    defaultTagName: "div",
    props: {
      className: styles.root({ className }),
      children: (
        <>
          <LabelTag className={styles.label()}>
            {isForm ? <div className="font-medium text-sm">{label}</div> : label}

            {description &&
              (isValidElement(description) ? (
                slot(description, { className: descriptionClasses })
              ) : (
                <p className={descriptionClasses}>{description}</p>
              ))}
          </LabelTag>

          <ValueTag className={styles.value({ className: valueClassName })}>{children}</ValueTag>
        </>
      ),
      ...props,
    },
  })
}
