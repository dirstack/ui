import type { ComponentProps, ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/avatar"
import { variants, type VariantProps } from "~/lib/variants"

/**
 * The initials standing in for a missing image: a name of two characters or less as it is,
 * otherwise the first letter of each word, capped at `max` (uncapped when `max` is 0).
 */
function getInitials(name: string, max = 0) {
  const value = name.trim()

  if (value.length <= 2) {
    return value.toUpperCase()
  }

  const initials = value
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .join("")

  return max > 0 ? initials.slice(0, max) : initials
}

// Radius lives on the root, which clips its children.
const entityAvatar = variants({
  slots: {
    root: "rounded-md border",
    image: "p-[7.5%]",
    fallback: "",
  },

  variants: {
    size: {
      // 20px: the identity mark of a nav row or menu item — borderless, flush, two initials.
      sm: {
        root: "size-5 rounded-sm border-0",
        image: "p-0",
        fallback: "text-[0.625rem]",
      },
      // 36px: list rows and cards.
      md: { root: "size-9" },
      // 56px: the logo field.
      lg: { root: "size-14" },
    },
  },
})

type EntityAvatarProps = Omit<ComponentProps<typeof Avatar>, "className"> &
  VariantProps<typeof entityAvatar> & {
    className?: string

    /**
     * The image source (e.g. a favicon URL). When absent, only the fallback renders.
     */
    src?: string | null

    /**
     * The entity's display name; its initials are the default fallback.
     */
    name: string

    /**
     * Overrides the initials derived from `name`.
     */
    fallback?: ReactNode
  }

export function EntityAvatar({
  src,
  name,
  fallback,
  size,
  className,
  ...props
}: EntityAvatarProps) {
  const styles = entityAvatar({ size })

  return (
    <Avatar className={styles.root({ className })} {...props}>
      {src && <AvatarImage src={src} className={styles.image()} />}

      <AvatarFallback className={styles.fallback()}>
        {fallback ?? getInitials(name, size === "sm" ? 2 : 3)}
      </AvatarFallback>
    </Avatar>
  )
}
