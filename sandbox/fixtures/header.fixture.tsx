import { Button } from "~/components/button"
import { EntityAvatar } from "~/components/entity-avatar"
import { Header } from "~/components/header"
import { Stack } from "~/components/stack"
import { PlusIcon } from "./icons"

export default {
  scales: (
    <Stack direction="column" size="lg" className="w-[36rem]">
      <Header size="page" title="Ads" description="Manage every ad in your workspace." />
      <Header size="card" title="Billing" description="Your plan and invoices." />
      <Header size="panel" title="Recent activity" />
    </Stack>
  ),

  actions: (
    <div className="w-[36rem]">
      <Header
        title="Advertisers"
        description="Everyone running ads with you."
        actions={<Button prefix={<PlusIcon />}>Invite</Button>}
      />
    </div>
  ),

  leading: (
    <div className="w-[36rem]">
      <Header
        title="Acme Inc"
        description="acme.com"
        leading={<EntityAvatar size="lg" name="Acme Inc" />}
        actions={<Button variant="secondary">Edit</Button>}
      />
    </div>
  ),

  hero: (
    <div className="w-[36rem]">
      <Header
        size="hero"
        alignment="center"
        title="Welcome back"
        description="Sign in to continue."
      />
    </div>
  ),
}
