import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { ChartConfig } from "~/components/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/chart"

const data = [
  { month: "Jan", direct: 1200, search: 900, social: 400, email: 260, referral: 140 },
  { month: "Feb", direct: 2100, search: 1100, social: 520, email: 300, referral: 180 },
  { month: "Mar", direct: 1800, search: 1300, social: 480, email: 340, referral: 210 },
  { month: "Apr", direct: 2600, search: 1500, social: 610, email: 380, referral: 240 },
  { month: "May", direct: 3200, search: 1700, social: 700, email: 420, referral: 260 },
  { month: "Jun", direct: 2900, search: 1900, social: 660, email: 460, referral: 300 },
]

const config = {
  direct: { label: "Direct", color: "var(--color-chart-1)" },
  search: { label: "Search", color: "var(--color-chart-2)" },
  social: { label: "Social", color: "var(--color-chart-3)" },
  email: { label: "Email", color: "var(--color-chart-4)" },
  referral: { label: "Referral", color: "var(--color-chart-5)" },
} satisfies ChartConfig

export default (
  <div className="w-96">
    <ChartContainer config={config}>
      <AreaChart data={data} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />

        {Object.keys(config).map(key => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            stackId="a"
            fill={`var(--color-${key})`}
            fillOpacity={0.2}
            stroke={`var(--color-${key})`}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  </div>
)
