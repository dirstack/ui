"use client"

import { type ComponentProps, useEffect, useId, useRef, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/chart"
import { ANIMATION_DURATION, ANIMATION_EASING, useReducedMotion } from "~/lib/animation"
import { cn } from "~/lib/variants"

export interface TimeSeriesPoint {
  date: Date
  value: number
  /**
   * The same bucket in a compared period, drawn as a dashed, unfilled line.
   */
  previous?: number
}

const DEFAULT_COLOR = "var(--color-chart-1)"
const AXIS_WIDTH = 48

// Built once: constructing Intl formatters is the expensive part, formatting is cheap.
const compactNumber = new Intl.NumberFormat(undefined, { notation: "compact" })
const wholeNumber = new Intl.NumberFormat(undefined)
const shortDate = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" })
const longDate = new Intl.DateTimeFormat(undefined, {
  month: "long",
  day: "numeric",
  year: "numeric",
})

/**
 * Round `max` up to a clean top-of-axis value that splits into `intervals` equal, readable
 * steps, so grid lines land on round numbers. The step ladder is fine enough that the top
 * never overshoots the data by more than about a fifth, which keeps the area filling the plot.
 */
export function niceMax(max: number, intervals: number): number {
  if (max <= 0) return 0
  const raw = max / intervals
  const power = 10 ** Math.floor(Math.log10(raw))
  const step =
    [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map(unit => unit * power).find(unit => unit >= raw) ??
    raw
  return step * intervals
}

/**
 * Room for one date label. Ticks are thinned to what the plot can hold at this pitch, so a
 * week shows every day on a wide card and a 180-day range still reads on a narrow one.
 */
const TICK_PITCH = 80

/**
 * Tick instants on a time axis: always the first and last bucket, the rest evenly spaced
 * between them. A whole-bucket step is used when one divides the range, so every label sits
 * on a bucket; otherwise the positions stay exactly even and each label reads the nearest
 * bucket. Either way the gaps on screen are equal.
 */
function pickTicks(times: number[], count: number): number[] {
  const n = times.length
  if (n <= count) return times
  const first = times[0]!
  const last = times[n - 1]!
  for (let c = count; c > Math.max(2, count / 2); c--) {
    if ((n - 1) % (c - 1) === 0) {
      const step = (n - 1) / (c - 1)
      return Array.from({ length: c }, (_, i) => times[i * step]!)
    }
  }
  return Array.from({ length: count }, (_, i) => first + ((last - first) * i) / (count - 1))
}

/**
 * Date tick that keeps the first label inside the plot's left edge and the last inside its
 * right edge, so nothing spills into the card padding or under the value axis.
 */
function EdgeTick({
  x,
  y,
  payload,
  labels,
  first,
  last,
}: {
  x?: number
  y?: number
  payload?: { value: number }
  labels: Map<number, string>
  first: number
  last: number
}) {
  const time = payload?.value ?? -1
  const anchor = time === first ? "start" : time === last ? "end" : "middle"

  return (
    <text x={x} y={y} dy={12} textAnchor={anchor} className="fill-muted-foreground text-xs">
      {labels.get(time)}
    </text>
  )
}

export type TimeSeriesChartProps = Omit<ComponentProps<"div">, "children"> & {
  data: TimeSeriesPoint[]
  /**
   * The series name, shown in the tooltip.
   */
  label: string
  /**
   * Series colour; one of the `--color-chart-*` tokens.
   */
  color?: string
  /**
   * Value-axis tick: compact by default ("5.9K").
   */
  formatTick?: (value: number) => string
  /**
   * Tooltip value: grouped by default ("5,912").
   */
  formatValue?: (value: number) => string
  /**
   * Date-axis tick: short by default ("Sep 6").
   */
  formatDate?: (date: Date) => string
  /**
   * Tooltip heading: long by default ("September 6, 2026").
   */
  formatTooltipDate?: (date: Date) => string
  /**
   * A fixed scale (a rate pinned to `[0, 100]`) instead of a rounded top over the data.
   */
  domain?: [number, number]
  /**
   * Explicit grid lines; by default four equal intervals across the domain.
   */
  ticks?: number[]
}

/**
 * The single time series: a smooth gradient area with a right-hand value axis on four
 * round grid lines and evenly spaced date ticks along the bottom. A compared period draws
 * as a dashed line in the same hue.
 */
export function TimeSeriesChart({
  data,
  label,
  color = DEFAULT_COLOR,
  formatTick = value => compactNumber.format(value),
  formatValue = value => wholeNumber.format(value),
  formatDate = date => shortDate.format(date),
  formatTooltipDate = date => longDate.format(date),
  domain,
  ticks,
  className,
  ...props
}: TimeSeriesChartProps) {
  const gradientId = `fill-${useId().replace(/:/g, "")}`
  const compared = data.some(point => point.previous !== undefined)
  const reducedMotion = useReducedMotion()

  // The plot's width decides how many date labels fit; measured, since the chart fills
  // whatever card it sits in.
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    // Seed from layout so the first paint already has the right tick count
    setWidth(element.clientWidth)
    const observer = new ResizeObserver(([entry]) => setWidth(entry?.contentRect.width ?? 0))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const tickCount = Math.max(2, Math.floor((width - AXIS_WIDTH) / TICK_PITCH))
  const config = {
    value: { label, color },
    previous: { label: `${label} (previous)` },
  } satisfies ChartConfig

  // A numeric time axis, so ticks can sit at exactly even positions rather than only on
  // buckets. Each tick is labelled with the bucket nearest to it.
  const points = data.map(point => ({ ...point, time: point.date.getTime() }))
  const times = points.map(point => point.time)
  const first = times[0] ?? 0
  const last = times[times.length - 1] ?? first
  const xTicks = pickTicks(times, Math.min(tickCount, points.length))
  const labels = new Map(
    xTicks.map(tick => {
      const nearest = points.reduce((best, point) =>
        Math.abs(point.time - tick) < Math.abs(best.time - tick) ? point : best,
      )
      return [tick, formatDate(nearest.date)]
    }),
  )

  // Four lines for grid, axis labels and the area's baseline, on a rounded top so they land on
  // round numbers. An all-zero series still gets a visible scale.
  const max = Math.max(...data.flatMap(point => [point.value, point.previous ?? 0]), 0)
  const [low, top] = domain ?? [0, niceMax(max, 3) || 1]
  const yTicks = ticks ?? [0, 1, 2, 3].map(i => low + ((top - low) * i) / 3)

  return (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {/* The plot runs to the SVG's edges (no side margins), so the active dot on the first
          point and the widest right-axis label would be clipped by the SVG box; let it
          overflow into the card's padding instead. */}
      <ChartContainer
        config={config}
        className="aspect-auto h-64 w-full [&_.recharts-surface]:overflow-visible"
      >
        <AreaChart
          data={points}
          accessibilityLayer={false}
          margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <YAxis
            orientation="right"
            ticks={yTicks}
            domain={[low, top]}
            width={AXIS_WIDTH}
            axisLine={false}
            tickLine={false}
            tickSize={0}
            tickMargin={8}
            tickFormatter={formatTick}
          />

          <XAxis
            dataKey="time"
            type="number"
            scale="time"
            domain={[first, last]}
            ticks={xTicks}
            interval={0}
            axisLine={false}
            tickLine={false}
            tickMargin={4}
            minTickGap={0}
            tick={<EdgeTick labels={labels} first={first} last={last} />}
          />

          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/75" />

          <ChartTooltip
            isAnimationActive={false}
            cursor={{ className: "stroke-border" }}
            // The current period reads first, whatever the draw order
            itemSorter={item => (item.dataKey === "value" ? 0 : 1)}
            // recharts hands its own `content` down; it collides with the div attribute
            content={contentProps => (
              <ChartTooltipContent
                {...contentProps}
                content={undefined}
                formatter={(value, name) => (
                  <>
                    <span className="flex-1 text-muted-foreground">{name}</span>
                    <span className="font-medium tabular-nums">{formatValue(Number(value))}</span>
                  </>
                )}
                labelFormatter={(_label, payload) => {
                  const date = payload?.[0]?.payload?.date
                  return date instanceof Date ? formatTooltipDate(date) : ""
                }}
              />
            )}
          />

          {compared && (
            <Area
              dataKey="previous"
              name={config.previous.label}
              type="monotone"
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              fill="none"
              dot={false}
              isAnimationActive={!reducedMotion}
              animationDuration={ANIMATION_DURATION}
              animationEasing={ANIMATION_EASING}
            />
          )}

          <Area
            dataKey="value"
            name={label}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive={!reducedMotion}
            animationDuration={ANIMATION_DURATION}
            animationEasing={ANIMATION_EASING}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
