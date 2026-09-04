import type { ComponentProps, ReactNode } from "react"
import { DialogDescription, DialogTitle } from "~/components/dialog"
import { Header, HeaderBody, HeaderSubtitle, HeaderTitle } from "~/components/header"
import { variants, type VariantProps } from "~/lib/variants"

const dialogHeaderVariants = variants({
  variants: {
    /**
     * Give the header its own hairline and padding, for a `flush` dialog whose body scrolls
     * under it. The extra right padding clears the dialog's close button.
     */
    bordered: {
      true: "border-b px-6 py-5 pr-14",
    },
  },
})

type DialogHeaderProps = Omit<ComponentProps<typeof Header>, "title" | "description"> &
  VariantProps<typeof dialogHeaderVariants> & {
    title: ReactNode
    description?: ReactNode
  }

/**
 * The standard dialog heading: a card-scale `Header` whose title and description are wired to
 * Base UI's `DialogTitle` / `DialogDescription` for accessibility. Extra children render after
 * them.
 */
export function DialogHeader({
  title,
  description,
  bordered,
  className,
  children,
  ...props
}: DialogHeaderProps) {
  return (
    <Header size="card" className={dialogHeaderVariants({ bordered, className })} {...props}>
      <HeaderBody>
        <DialogTitle render={<HeaderTitle />}>{title}</DialogTitle>

        {description && (
          <DialogDescription render={<HeaderSubtitle />}>{description}</DialogDescription>
        )}
      </HeaderBody>

      {children}
    </Header>
  )
}
