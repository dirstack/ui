import { Card, CardPanel } from "~/components/card"
import { Page } from "~/components/page"
import { SectionHeader } from "~/components/section-header"

export default {
  default: (
    <Page>
      <SectionHeader title="Dashboard" description="An overview of your workspace." />
      <Card>
        <CardPanel>Full-width page content.</CardPanel>
      </Card>
    </Page>
  ),

  narrow: (
    <Page width="narrow">
      <SectionHeader title="Settings" description="A single, narrow column." />
      <Card>
        <CardPanel>Narrow page content, capped at a readable width.</CardPanel>
      </Card>
    </Page>
  ),
}
