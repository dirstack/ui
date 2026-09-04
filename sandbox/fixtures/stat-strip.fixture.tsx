import { useState } from "react"
import { StatStrip } from "~/components/stat-strip"

const usd = { style: "currency", currency: "USD" } as const

function TrackStrip() {
  const [selected, setSelected] = useState(0)

  const items = [
    { label: "Impressions", value: 128_400 },
    { label: "Clicks", value: 3_210 },
    { label: "Revenue", value: 8_640, format: usd },
  ]

  return (
    <StatStrip variant="track" className="w-[36rem]">
      {items.map((item, index) => (
        <StatStrip.Item
          key={item.label}
          label={item.label}
          value={item.value}
          format={item.format}
          selected={selected === index}
          render={
            <button type="button" aria-label={item.label} onClick={() => setSelected(index)} />
          }
        />
      ))}
    </StatStrip>
  )
}

export default {
  // A white card of figures divided by hairlines.
  plain: (
    <StatStrip className="w-[36rem]">
      <StatStrip.Item label="Impressions" value={128_400} />
      <StatStrip.Item label="Clicks" value={3_210} hint="+12% vs last month" />
      <StatStrip.Item label="Revenue" value={8_640} format={usd} />
    </StatStrip>
  ),

  // A segmented track whose selected figure drives a panel beside it.
  track: <TrackStrip />,
}
