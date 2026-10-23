import { BadgeCheck, LifeBuoy, MapPin, Phone } from 'lucide-react'
import { Panel, PanelHeader } from './panel'

const PLACES = [
  {
    name: 'Harbor Light Women’s Shelter',
    type: 'Shelter',
    address: '214 Rowe Street, Unit B',
    distance: '0.6 km',
    hours: 'Open 24/7',
    phone: '+1 (555) 014-2290',
  },
  {
    name: 'Eastside Community Health Clinic',
    type: 'Clinic',
    address: '88 Elm Avenue, 2nd Floor',
    distance: '1.1 km',
    hours: 'Open until 11 PM',
    phone: '+1 (555) 014-7713',
  },
  {
    name: 'SafeHaven Crisis Center',
    type: 'Crisis support',
    address: '1450 Maple Court Drive',
    distance: '1.8 km',
    hours: 'Open 24/7',
    phone: '+1 (555) 014-0047',
  },
  {
    name: 'Northgate Legal Aid Office',
    type: 'Legal aid',
    address: '31 Grant Plaza, Suite 400',
    distance: '2.3 km',
    hours: 'Opens 8 AM',
    phone: '+1 (555) 014-3368',
  },
]

export function HelpDirectory() {
  return (
    <Panel>
      <PanelHeader
        icon={LifeBuoy}
        title="Local Help Directory"
        description="Verified within the last 30 days"
      />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {PLACES.map((p) => (
          <li
            key={p.name}
            className="flex flex-col gap-2 rounded-xl border border-border p-3.5 transition-all duration-200 hover:border-teal/40 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                  <span className="truncate">{p.name}</span>
                  <BadgeCheck className="size-4 shrink-0 text-teal" aria-label="Verified" />
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {p.type} · {p.hours}
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium text-teal">
                {p.distance}
              </span>
            </div>
            <p className="flex items-start gap-1.5 text-xs leading-relaxed text-navy/80">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {p.address}
            </p>
            <a
              href={`tel:${p.phone.replace(/[^\d+]/g, '')}`}
              className="flex w-fit items-center gap-1.5 text-xs font-semibold text-teal transition-all duration-200 hover:text-teal-hover"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {p.phone}
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
