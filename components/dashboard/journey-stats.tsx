import { Clock, Footprints, Share2, Sun } from 'lucide-react'

const STATS = [
  { icon: Clock, label: 'ETA', value: '10:31 PM', hint: '+12 min delay' },
  { icon: Footprints, label: 'Remaining', value: '2.4 km', hint: 'via Elm & Rowe St' },
  { icon: Sun, label: 'Route lighting', value: '94%', hint: 'Street lamps active' },
  { icon: Share2, label: 'Shared with', value: '4 contacts', hint: 'Updated 8s ago' },
]

export function JourneyStats() {
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {STATS.map(({ icon: Icon, label, value, hint }) => (
        <div key={label} className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon className="size-3.5 text-teal" aria-hidden="true" />
            {label}
          </dt>
          <dd className="text-lg font-semibold tracking-tight text-navy">{value}</dd>
          <dd className="text-[11px] text-muted-foreground">{hint}</dd>
        </div>
      ))}
    </dl>
  )
}
