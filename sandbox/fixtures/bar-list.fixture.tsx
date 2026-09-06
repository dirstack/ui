import { BarList } from "~/components/bar-list"
import { MegaphoneIcon, SparklesIcon, UsersIcon } from "./icons"

const usd = { style: "currency", currency: "USD" } as const

const pages = [
  { label: "/", value: 12_840 },
  { label: "/pricing", value: 6_120 },
  { label: "/blog/launching-the-new-dashboard-and-a-very-long-slug", value: 3_480 },
  { label: "/docs", value: 2_210 },
  { label: "/changelog", value: 940 },
]

const referrers = [
  { label: "google.com", value: 9_400, href: "https://google.com", icon: <SparklesIcon /> },
  { label: "github.com", value: 4_100, href: "https://github.com", icon: <UsersIcon /> },
  {
    label: "news.ycombinator.com",
    value: 1_760,
    href: "https://news.ycombinator.com",
    icon: <MegaphoneIcon />,
  },
]

const countries = [
  { label: "United States", value: 5_200, revenue: 18_400 },
  { label: "Germany", value: 2_100, revenue: 7_950 },
  { label: "United Kingdom", value: 1_800, revenue: 6_200 },
  { label: "Poland", value: 640, revenue: 1_120 },
]

const max = (rows: { value: number }[]) => Math.max(...rows.map(row => row.value))

export default {
  // Labels on share bars, values right-aligned.
  plain: (
    <BarList className="w-96">
      {pages.map(row => (
        <BarList.Row key={row.label} label={row.label} value={row.value} max={max(pages)} />
      ))}
    </BarList>
  ),

  // Leading icon and an external-link arrow beside the label.
  icons: (
    <BarList className="w-96">
      {referrers.map(row => (
        <BarList.Row
          key={row.label}
          label={row.label}
          icon={row.icon}
          href={row.href}
          value={row.value}
          max={max(referrers)}
        />
      ))}
    </BarList>
  ),

  // A muted secondary column (revenue) before the primary count.
  secondary: (
    <BarList className="w-[28rem]">
      {countries.map(row => (
        <BarList.Row
          key={row.label}
          label={row.label}
          value={row.value}
          max={max(countries)}
          secondaryValue={row.revenue}
          secondaryFormat={usd}
        />
      ))}
    </BarList>
  ),

  // Rows rendered as buttons: pointer, hover fill, whole row is the click target.
  clickable: (
    <BarList className="w-96">
      {pages.map(row => (
        <BarList.Row
          key={row.label}
          label={row.label}
          value={row.value}
          max={max(pages)}
          render={
            <button
              type="button"
              aria-label={`Filter by ${row.label}`}
              onClick={() => alert(`Filter by ${row.label}`)}
            />
          }
        />
      ))}
    </BarList>
  ),

  // Same row height as the list it stands in for.
  skeleton: <BarList.Skeleton className="w-96" />,
}
