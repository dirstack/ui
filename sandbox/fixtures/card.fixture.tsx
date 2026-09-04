import { Button } from "~/components/button"
import { Card } from "~/components/card"

export default {
  basic: (
    <Card className="w-96">
      <Card.Section>
        <Card.Header title="Overview" description="A quick summary of your workspace." />
        <p className="text-muted-foreground text-sm">Card body content sits inside a section.</p>
      </Card.Section>
    </Card>
  ),

  divided: (
    <Card divided className="w-96">
      <Card.Panel>
        <Card.Header title="Members" actions={<Button size="sm">Invite</Button>} />
      </Card.Panel>
      <Card.Panel>First row of the body.</Card.Panel>
      <Card.Panel theme="gray">A muted footer panel.</Card.Panel>
    </Card>
  ),
}
