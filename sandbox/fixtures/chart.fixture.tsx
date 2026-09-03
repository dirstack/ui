import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "~/components/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/chart"

const data = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2600 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 2900 },
]

const config = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
} satisfies ChartConfig

export default (
  <div className="w-96">
    <ChartContainer config={config}>
      <AreaChart data={data} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="revenue"
          type="natural"
          fill="var(--color-revenue)"
          fillOpacity={0.2}
          stroke="var(--color-revenue)"
        />
      </AreaChart>
    </ChartContainer>
  </div>
)
