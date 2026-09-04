import { useRender } from "@base-ui/react/use-render"
import type { ReactNode } from "react"
import { SectionHeader } from "~/components/section-header"
import { cn } from "~/lib/variants"

type FormSectionProps = Omit<useRender.ComponentProps<"section">, "title"> & {
  id?: string
  /**
   * Optional heading. Leave it out inside the settings dialog, whose header owns the title.
   */
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /**
   * Right-aligned actions after the rows, e.g. a save button. Rendered as the last row.
   */
  footer?: ReactNode
}

/**
 * A block of settings: one padded container whose children (optional heading, the rows,
 * optional footer) stack with hairlines between them. Renders as a `<form>` via `render`
 * when the rows are fields, so the form is the only wrapper.
 */
export function FormSection({
  id,
  title,
  description,
  actions,
  footer,
  className,
  children,
  render,
  ...props
}: FormSectionProps) {
  return useRender({
    render,
    defaultTagName: "section",
    props: {
      id,
      className: cn("flex flex-col divide-y px-5 md:px-6", className),
      children: (
        <>
          {(title || actions) && (
            <SectionHeader
              size="panel"
              className="py-4"
              title={title}
              description={description}
              actions={actions}
            />
          )}

          {children}

          {footer && <div className="flex justify-end py-5">{footer}</div>}
        </>
      ),
      ...props,
    },
  })
}
