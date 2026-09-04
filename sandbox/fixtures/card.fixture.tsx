import { Button } from "~/components/button"
import { Card, CardHeader, CardPanel } from "~/components/card"

export default {
  basic: (
    <Card className="w-96">
      <CardPanel>
        <CardHeader title="Overview" description="A quick summary of your workspace." />
        <p className="mt-4 text-muted-foreground text-sm">Card body content sits in a panel.</p>
      </CardPanel>
    </Card>
  ),

  divided: (
    <Card divided className="w-96">
      <CardPanel>
        <CardHeader title="Members" actions={<Button size="sm">Invite</Button>} />
      </CardPanel>
      <CardPanel>First row of the body.</CardPanel>
      <CardPanel className="bg-background">A muted footer panel.</CardPanel>
    </Card>
  ),
}
