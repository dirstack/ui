import { Button } from "~/components/button"
import { EntityAvatar } from "~/components/entity-avatar"
import { Nav, NavLabel, navItem } from "~/components/nav"
import { CalendarIcon, MegaphoneIcon, UsersIcon } from "./icons"

export default (
  <div className="w-64 rounded-xl border bg-card">
    <Nav>
      <Button variant="ghost" className={navItem()} prefix={<MegaphoneIcon />}>
        Ads
      </Button>
      <Button variant="ghost" data-status="active" className={navItem()} prefix={<UsersIcon />}>
        Advertisers
      </Button>
      <Button variant="ghost" className={navItem()} prefix={<CalendarIcon />}>
        Schedule
      </Button>

      <NavLabel>Workspace</NavLabel>

      <Button
        variant="ghost"
        className={navItem({ variant: "picker" })}
        prefix={<EntityAvatar size="sm" name="Acme Inc" />}
      >
        Acme Inc
      </Button>
    </Nav>
  </div>
)
