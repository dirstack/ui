import { NavButton, NavButtonSkeleton, NavIdentity } from "~/components/nav-button"
import { ArrowRightIcon } from "./icons"

export default {
  default: (
    <div className="w-64 rounded-xl border bg-card p-1">
      <NavButton title="Acme Inc" />
    </div>
  ),

  picker: (
    <div className="w-64 rounded-xl border bg-card p-1">
      <NavButton
        variant="picker"
        title="Acme Inc"
        avatar="https://www.google.com/s2/favicons?domain=stripe.com&sz=64"
        suffix={<ArrowRightIcon />}
      />
    </div>
  ),

  skeleton: (
    <div className="w-64 rounded-xl border bg-card p-1">
      <NavButtonSkeleton variant="picker" />
    </div>
  ),

  identity: (
    <div className="w-64 rounded-xl border bg-card p-3">
      <NavIdentity name="Jane Doe" detail="jane@acme.com" />
    </div>
  ),
}
