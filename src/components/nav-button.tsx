import type { ComponentProps, ReactNode } from "react"
import { Button } from "~/components/button"
import { EntityAvatar } from "~/components/entity-avatar"
import { navItem } from "~/components/nav"
import { Skeleton } from "~/components/skeleton"
import { cn, type VariantProps } from "~/lib/variants"

type NavButtonVariant = Exclude<NonNullable<VariantProps<typeof navItem>["variant"]>, "link">

type NavButtonShellProps = Omit<ComponentProps<typeof Button>, "variant"> & {
  leading: ReactNode
  variant?: NavButtonVariant
}

function NavButtonShell({
  leading,
  variant = "account",
  children,
  className,
  ...props
}: NavButtonShellProps) {
  return (
    <Button
      size="md"
      variant="ghost"
      prefix={leading}
      className={navItem({ variant, className })}
      {...props}
    >
      <span className="font-medium text-sm/tight">{children}</span>
    </Button>
  )
}

type NavButtonProps = NavButtonShellProps & {
  title: string
  avatar?: string
}

/**
 * Compact sidebar trigger: a 20px avatar, one line of text and whatever `suffix` the
 * caller passes (usually a chevron). Secondary text belongs in the menu it opens.
 */
function NavButton({ avatar, title, ...props }: Omit<NavButtonProps, "leading" | "children">) {
  return (
    <NavButtonShell leading={<EntityAvatar size="sm" src={avatar} name={title} />} {...props}>
      {title}
    </NavButtonShell>
  )
}

function NavButtonSkeleton({
  variant,
  ...props
}: Omit<NavButtonShellProps, "leading" | "children">) {
  return (
    <NavButtonShell
      disabled
      variant={variant}
      leading={<Skeleton className="size-5 rounded-sm" />}
      {...props}
    >
      <Skeleton className="w-28">&nbsp;</Skeleton>
    </NavButtonShell>
  )
}

type NavIdentityProps = ComponentProps<"div"> & {
  name: ReactNode

  /**
   * The muted second line under the name: an email, a workspace slug.
   */
  detail: ReactNode
}

/**
 * Name over a muted detail line — the identity stack the workspace picker's menu items and the
 * account menu's header both use.
 */
function NavIdentity({ name, detail, className, ...props }: NavIdentityProps) {
  return (
    <div className={cn("flex min-w-0 flex-col", className)} {...props}>
      <span className="truncate font-medium text-sm/tight">{name}</span>
      <span className="truncate text-muted-foreground text-xs/tight">{detail}</span>
    </div>
  )
}

export { NavButton, NavButtonSkeleton, NavIdentity }
