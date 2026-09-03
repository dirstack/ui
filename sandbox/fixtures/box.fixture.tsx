import { boxVariants } from "~/components/box"

/**
 * `box` ships only the `boxVariants` recipe (the hover/focus outline used by Button, Input,
 * Select, ...). These swatches apply it to plain elements so the interaction rings are visible
 * in isolation.
 */
export default {
  hover: (
    <button type="button" className={boxVariants({ hover: true, className: "rounded-md p-4" })}>
      Hover me for the outline ring
    </button>
  ),

  focus: (
    <button type="button" className={boxVariants({ focus: true, className: "rounded-md p-4" })}>
      Focus me for the outline ring
    </button>
  ),

  focusWithin: (
    <div className={boxVariants({ focusWithin: true, className: "flex rounded-md p-4" })}>
      <input className="bg-transparent outline-none" placeholder="Focus this input" />
    </div>
  ),
}
