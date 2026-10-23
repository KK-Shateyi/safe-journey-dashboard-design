import { TopNav } from '@/components/dashboard/top-nav'
import { LeftSidebar } from '@/components/dashboard/left-sidebar'
import { MapPanel } from '@/components/dashboard/map-panel'
import { TrafficAlert } from '@/components/dashboard/traffic-alert'
import { JourneyStats } from '@/components/dashboard/journey-stats'
import { SosPanel } from '@/components/dashboard/sos-panel'
import { FakeCall } from '@/components/dashboard/fake-call'
import { TransportVerify } from '@/components/dashboard/transport-verify'
import { HelpDirectory } from '@/components/dashboard/help-directory'

export default function Page() {
  return (
    <div className="min-h-dvh bg-surface text-navy">
      <TopNav />
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 md:px-6 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside aria-label="Navigation and safety settings" className="order-3 xl:order-1">
          <LeftSidebar />
        </aside>

        <main className="order-1 flex min-w-0 flex-col gap-6 xl:order-2">
          <header className="flex flex-col gap-1">
            <p className="text-sm font-medium text-teal">Active journey · Started 9:42 PM</p>
            <h1 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              Heading home to Maple Court
            </h1>
          </header>
          <TrafficAlert />
          <MapPanel />
          <JourneyStats />
        </main>

        <aside
          aria-label="Immediate intervention and crisis tools"
          className="order-2 flex flex-col gap-6 xl:order-3"
        >
          <SosPanel />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
            <FakeCall />
            <TransportVerify />
          </div>
          <HelpDirectory />
        </aside>
      </div>
    </div>
  )
}
