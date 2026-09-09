import { TimeSeriesChart, type TimeSeriesPoint } from "~/components/time-series-chart"

function series(days: number, seed = 1): TimeSeriesPoint[] {
  const start = new Date(2026, 8, 1)
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const wave = Math.sin((i / days) * Math.PI * 2 + seed) + 1.5
    return { date, value: Math.round(wave * 900 + ((i * 37 * seed) % 400)) }
  })
}

const week = series(7)
const half = series(180)
const percent = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 1 })

export default {
  // Seven daily buckets: every date tick shows, the top rounds up over the data.
  week: (
    <div className="w-[48rem]">
      <TimeSeriesChart data={week} label="Visitors" />
    </div>
  ),

  // 180 buckets thin to five evenly spaced ticks, first and last pinned to the edges.
  "half year": (
    <div className="w-[48rem]">
      <TimeSeriesChart data={half} label="Visitors" />
    </div>
  ),

  // A compared period as a dashed line in the same hue.
  compared: (
    <div className="w-[48rem]">
      <TimeSeriesChart
        data={week.map((point, i) => ({ ...point, previous: series(7, 2)[i]!.value }))}
        label="Visitors"
      />
    </div>
  ),

  // A rate on a fixed scale with its own grid lines and unit.
  rate: (
    <div className="w-[48rem]">
      <TimeSeriesChart
        data={week.map(point => ({ ...point, value: (point.value % 60) + 20 }))}
        label="Bounce rate"
        domain={[0, 100]}
        ticks={[0, 50, 100]}
        formatTick={value => percent.format(value / 100)}
        formatValue={value => percent.format(value / 100)}
      />
    </div>
  ),

  // Straight segments between buckets instead of the smooth curve.
  linear: (
    <div className="w-[48rem]">
      <TimeSeriesChart data={week} label="Visitors" curve="linear" />
    </div>
  ),

  // No data in range: the scale still draws.
  empty: (
    <div className="w-[48rem]">
      <TimeSeriesChart data={week.map(point => ({ ...point, value: 0 }))} label="Visitors" />
    </div>
  ),
}
