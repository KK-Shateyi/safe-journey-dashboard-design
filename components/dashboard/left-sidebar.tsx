'use client'

import { useState } from 'react'
import {
  BookOpen,
  Camera,
  CircleCheck,
  Circle,
  ClipboardList,
  HeartHandshake,
  Hospital,
  Home,
  MapPinned,
  MessageCircle,
  PhoneCall,
  Route,
  Scale,
  Users,
  WifiOff,
  type LucideIcon,
} from 'lucide-react'
import { Panel, PanelHeader } from './panel'
import { cn } from '@/lib/utils'

type NavItem = { label: string; icon: LucideIcon; badge?: string; active?: boolean }

const TOOLS: NavItem[] = [
  { label: 'Live Journey', icon: MapPinned, active: true },
  { label: 'Smart Routes', icon: Route },
  { label: 'Wearable Camera', icon: Camera, badge: 'Live' },
  { label: 'Fake Call', icon: PhoneCall },
  { label: 'ICE Contacts', icon: Users, badge: '4' },
]

const SUPPORT: NavItem[] = [
  { label: 'Shelters & Safe Houses', icon: Home },
  { label: 'Health Clinics', icon: Hospital },
  { label: 'Legal Aid', icon: Scale },
  { label: 'Counselling', icon: HeartHandshake },
  { label: '24/7 Chat Line', icon: MessageCircle },
  { label: 'Know Your Rights', icon: BookOpen },
]

const PROGRESS = [
  { label: 'Emergency Prep', value: 80 },
  { label: 'ICE Contacts Verified', value: 100 },
  { label: 'Safe Routes Saved', value: 60 },
]

const CHECKLIST = [
  { label: 'Go-bag packed with ID copies', done: true },
  { label: 'Code word shared with 2 contacts', done: true },
  { label: 'Medical info added to profile', done: true },
  { label: 'Backup phone charger in bag', done: false },
]

function NavSection({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map(({ label, icon: Icon, badge, active }) => (
          <li key={label}>
            <a
              href="#"
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
                active
                  ? 'bg-navy font-medium text-primary-foreground'
                  : 'text-navy/80 hover:bg-accent hover:text-navy',
              )}
            >
              <Icon
                className={cn('size-4', active ? 'text-mint' : 'text-muted-foreground')}
                aria-hidden="true"
              />
              <span className="flex-1">{label}</span>
              {badge ? (
                <span
                  className={cn(
                    'rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
                    active ? 'bg-mint text-navy' : 'bg-accent text-teal',
                  )}
                >
                  {badge}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LeftSidebar() {
  const [offline, setOffline] = useState(true)

  return (
    <div className="flex flex-col gap-6 xl:sticky xl:top-22">
      <Panel>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="flex size-11 items-center justify-center rounded-full bg-navy text-sm font-semibold text-primary-foreground">
              AO
            </span>
            <span className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-card bg-mint" />
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-sm font-semibold text-navy">Amara Okafor</p>
            <p className="truncate text-xs text-muted-foreground">Connected · 4 ICE contacts synced</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-surface p-3">
          <div className="flex items-center gap-2.5">
            <WifiOff className="size-4 text-teal" aria-hidden="true" />
            <div className="flex flex-col">
              <span id="offline-label" className="text-xs font-semibold text-navy">
                Offline Mode Enabled
              </span>
              <span className="text-[11px] text-muted-foreground">
                {offline ? 'SMS fallback · maps cached' : 'Requires data connection'}
              </span>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={offline}
            aria-labelledby="offline-label"
            onClick={() => setOffline((v) => !v)}
            className={cn(
              'relative h-6 w-11 shrink-0 rounded-full transition-all duration-200',
              offline ? 'bg-teal' : 'bg-border',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 left-0.5 size-5 rounded-full bg-card shadow transition-all duration-200',
                offline && 'translate-x-5',
              )}
            />
          </button>
        </div>
      </Panel>

      <Panel className="flex flex-col gap-5 p-3">
        <NavSection title="Safe Journey Tools" items={TOOLS} />
        <div className="h-px bg-border" />
        <NavSection title="Get Support Directory" items={SUPPORT} />
      </Panel>

      <Panel>
        <PanelHeader
          icon={ClipboardList}
          title="Personal Safety Plan"
          description="Reviewed 3 days ago"
        />
        <div className="flex flex-col gap-3.5">
          {PROGRESS.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-navy">{label}</span>
                <span className="font-mono tabular-nums text-muted-foreground">
                  {value}% Complete
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-label={label}
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-200',
                    value === 100 ? 'bg-mint' : 'bg-teal',
                  )}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-4">
          {CHECKLIST.map(({ label, done }) => (
            <li key={label} className="flex items-start gap-2.5 text-xs leading-relaxed">
              {done ? (
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
              ) : (
                <Circle className="mt-0.5 size-4 shrink-0 text-border" aria-hidden="true" />
              )}
              <span className={done ? 'text-muted-foreground line-through decoration-border' : 'text-navy'}>
                {label}
              </span>
              <span className="sr-only">{done ? '(done)' : '(to do)'}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
