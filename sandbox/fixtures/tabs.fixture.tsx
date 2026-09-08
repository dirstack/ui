import { Stack } from "~/components/stack"
import { Tabs, TabsList, TabsTrigger } from "~/components/tabs"

export default {
  segmented: (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  ),

  plain: (
    <Tabs defaultValue="all">
      <TabsList variant="plain">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  ),

  // The card-header step down: a 28px segmented track with 12px labels.
  small: (
    <Tabs defaultValue="top">
      <TabsList size="sm">
        <TabsTrigger value="top">Top</TabsTrigger>
        <TabsTrigger value="entry">Entry</TabsTrigger>
        <TabsTrigger value="exit">Exit</TabsTrigger>
        <TabsTrigger value="404">404s</TabsTrigger>
      </TabsList>
    </Tabs>
  ),

  both: (
    <Stack direction="column" size="lg">
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Day</TabsTrigger>
          <TabsTrigger value="b">Week</TabsTrigger>
          <TabsTrigger value="c">Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="a">
        <TabsList variant="plain">
          <TabsTrigger value="a">Day</TabsTrigger>
          <TabsTrigger value="b">Week</TabsTrigger>
          <TabsTrigger value="c">Month</TabsTrigger>
        </TabsList>
      </Tabs>
    </Stack>
  ),
}
