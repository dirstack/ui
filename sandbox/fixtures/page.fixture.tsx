import { Card } from "~/components/card"
import { Header } from "~/components/header"
import { Page } from "~/components/page"

export default {
  default: (
    <Page>
      <Header title="Dashboard" description="An overview of your workspace." />
      <Card>
        <Card.Panel>Full-width page content.</Card.Panel>
      </Card>
    </Page>
  ),

  narrow: (
    <Page width="narrow">
      <Header title="Settings" description="A single, narrow column." />
      <Card>
        <Card.Panel>Narrow page content, capped at a readable width.</Card.Panel>
      </Card>
    </Page>
  ),
}
