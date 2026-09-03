import { mergeProps } from "@base-ui/react"
import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"

/**
 * Merges props onto a React element without adding a wrapper DOM node.
 * Uses Base UI's `mergeProps` for type-safe className concatenation,
 * event handler composition, and style merging.
 *
 * Returns the element as-is if it's not a valid React element (null, undefined, text).
 */
export function slot(element: ReactNode, props: Record<string, unknown>): ReactNode {
  if (!isValidElement(element)) {
    return element
  }

  const el = element as ReactElement<Record<string, unknown>>

  return cloneElement(el, mergeProps(props, el.props))
}
