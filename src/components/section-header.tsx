import { useRender } from "@base-ui/react/use-render"
import { type ComponentProps, createContext, type ReactNode, use } from "react"
import { Heading, type HeadingProps } from "~/components/heading"
import { Stack } from "~/components/stack"
import { descriptionClasses } from "~/lib/classes"
import { variants, cn, type VariantProps } from "~/lib/variants"

const sectionHeaderVariants = variants({
  base: "flex items-center w-full min-w-0",

  variants: {
    alignment: {
      left: "justify-between text-start",
      center: "justify-center text-center",
    },
    size: {
      page: "gap-y-3 gap-x-6 max-sm:flex-col max-sm:items-stretch lg:gap-x-12",
      card: "gap-y-2 gap-x-6 max-sm:flex-col max-sm:items-stretch",
      // The title block keeps its content width in the wrap calculation, so the actions (a
      // card's tab row) drop under it only when the two really cannot share the line.
      panel: "gap-y-2 gap-x-6 [&>*:first-child]:flex-auto",
      hero: "gap-y-3 gap-x-6 lg:gap-x-12",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },

  defaultVariants: {
    alignment: "left",
    wrap: true,
  },
})

type SectionHeaderSize = NonNullable<VariantProps<typeof sectionHeaderVariants>["size"]>

/**
 * The title each header scale gets, alongside the spacing the variant above gives it: `page`
 * for a route heading, `card` for a standalone card, `panel` for a dashboard or list panel,
 * `hero` for the centered auth and callback screens. The `as` entry keeps the heading outline
 * intact — one `<h1>` per route, `<h2>` for everything nested inside it.
 */
const sectionHeaderTitles = {
  page: { size: "h3", as: "h1" },
  card: { size: "h4", as: "h2" },
  panel: { size: "h5", as: "h2" },
  hero: { size: "h2", as: "h1" },
} as const satisfies Record<SectionHeaderSize, { size: HeadingProps["size"]; as: string }>

const SectionHeaderContext = createContext<{ size: SectionHeaderSize; wrap: boolean }>({
  size: "page",
  wrap: true,
})

type SectionHeaderProps = Omit<useRender.ComponentProps<"div">, "title"> &
  Omit<VariantProps<typeof sectionHeaderVariants>, "wrap"> & {
    /**
     * Keep the title block and the actions on one line instead of wrapping them.
     */
    wrap?: boolean
    /**
     * Title block. Given any of `title`/`description`/`leading`/`actions`, the header renders
     * its own `SectionHeaderBody` (empty if there is nothing but actions, so they still sit right);
     * leave them all out to compose the body by hand, e.g. an entity header with dot-joined
     * meta or the dashboard greeting.
     */
    title?: ReactNode
    description?: ReactNode
    actions?: ReactNode
    /**
     * Leading visual beside the title, e.g. an entity avatar.
     */
    leading?: ReactNode
  }

/**
 * The one header for every surface in the app: pages, cards, list panels, dialogs and settings
 * sections. Pass `title`/`description`/`actions` for the standard block, or compose
 * `SectionHeaderBody` + `SectionHeaderActions` as children when the content is bespoke.
 */
function SectionHeader({
  className,
  alignment = "left",
  size = "page",
  wrap = true,
  title,
  description,
  actions,
  leading,
  children,
  render,
  ...props
}: SectionHeaderProps) {
  const element = useRender({
    render,
    defaultTagName: "div",
    props: {
      className: cn(sectionHeaderVariants({ alignment, size, wrap, className })),
      children: (
        <>
          {(title || description || leading || actions) && (
            <SectionHeaderBody
              leading={leading}
              className={cn(alignment === "center" && "justify-center")}
            >
              {title && <SectionHeaderTitle>{title}</SectionHeaderTitle>}
              {description && <SectionHeaderDescription>{description}</SectionHeaderDescription>}
            </SectionHeaderBody>
          )}

          {actions && <SectionHeaderActions>{actions}</SectionHeaderActions>}

          {children}
        </>
      ),
      ...props,
    },
  })

  return <SectionHeaderContext value={{ size, wrap }}>{element}</SectionHeaderContext>
}

/**
 * The page title. Its visual size and semantic level both follow the header's `size`, so a
 * page heading stays the route's single `<h1>` while cards and panels render `<h2>`s. Pass
 * `size`/`as` to override either one on its own.
 */
function SectionHeaderTitle({ size, as, ...props }: HeadingProps) {
  const preset = sectionHeaderTitles[use(SectionHeaderContext).size]

  return <Heading size={size ?? preset.size} as={as ?? preset.as} {...props} />
}

type SectionHeaderBodyProps = ComponentProps<"div"> & {
  /**
   * Leading visual, e.g. an entity avatar.
   */
  leading?: ReactNode
}

/**
 * The one title block for every header in the app (pages, cards, dialogs, settings sections):
 * an optional leading visual beside a column of `SectionHeaderTitle` + `SectionHeaderDescription`. Change the
 * spacing here and it changes everywhere.
 */
function SectionHeaderBody({ leading, children, className, ...props }: SectionHeaderBodyProps) {
  return (
    <div className={cn("flex min-w-0 flex-1 items-center gap-3", className)} {...props}>
      {leading}
      <div className="flex min-w-0 flex-col gap-1.5">{children}</div>
    </div>
  )
}

/**
 * The muted line under a title. Wraps by default; pass `truncate` for one-line entity meta.
 */
function SectionHeaderDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn(descriptionClasses, className)} {...props} />
}

/**
 * Right-aligned actions. Stops shrinking when the header is `wrap={false}`, so a long title
 * truncates instead of squeezing the buttons.
 */
function SectionHeaderActions({ className, ...props }: ComponentProps<typeof Stack>) {
  const { size, wrap } = use(SectionHeaderContext)

  return (
    <Stack
      className={cn(
        "-my-0.5",
        !wrap && "shrink-0",
        // Stacked under a page title, the trailing (primary) action leads the row.
        size === "page" && "max-sm:flex-row-reverse max-sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

export {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderBody,
  SectionHeaderDescription,
  SectionHeaderActions,
}
