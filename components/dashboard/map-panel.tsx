import Image from 'next/image'
import { Flag, Locate, Minus, Navigation, Plus, ShieldCheck, Watch } from 'lucide-react'

const ROUTE = 'M 90 470 C 160 430, 180 360, 260 340 S 380 330, 420 260 S 520 150, 610 150 S 690 140, 730 120'
const ALT_ROUTE = 'M 90 470 C 220 480, 360 470, 470 420 S 660 240, 730 120'

const BLOCKS = [
  { x: 120, y: 60, w: 140, h: 90 },
  { x: 300, y: 40, w: 110, h: 140 },
  { x: 460, y: 220, w: 90, h: 70 },
  { x: 600, y: 230, w: 150, h: 110 },
  { x: 160, y: 200, w: 70, h: 90 },
  { x: 310, y: 400, w: 130, h: 60 },
  { x: 650, y: 400, w: 120, h: 70 },
]

export function MapPanel() {
  return (
    <section
      aria-label="Live map with smart route and movement tracking"
      className="relative overflow-hidden rounded-2xl border border-border bg-slate-100"
    >
      <div className="relative aspect-[5/3] w-full sm:aspect-[16/10]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,37,64,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,37,64,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <svg
          viewBox="0 0 900 540"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d="M 0 300 L 900 220" stroke="#ffffff" strokeWidth="22" fill="none" />
          <path d="M 380 0 L 520 540" stroke="#ffffff" strokeWidth="18" fill="none" />
          <path d="M 0 120 L 900 160" stroke="#ffffff" strokeWidth="12" fill="none" />
          <path d="M 700 0 L 640 540" stroke="#ffffff" strokeWidth="12" fill="none" />
          <path d="M 120 540 L 240 0" stroke="#ffffff" strokeWidth="10" fill="none" />

          {BLOCKS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="10" fill="#0a2540" opacity="0.05" />
          ))}
          <rect x="470" y="40" width="160" height="80" rx="14" fill="#2cd5c4" opacity="0.14" />

          <path d={ALT_ROUTE} stroke="#0a2540" strokeOpacity="0.22" strokeWidth="5" fill="none" strokeDasharray="2 10" strokeLinecap="round" />

          <path d={ROUTE} stroke="#2cd5c4" strokeOpacity="0.35" strokeWidth="18" fill="none" strokeLinecap="round" filter="url(#glow)" />
          <path d={ROUTE} stroke="#2cd5c4" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d={ROUTE} stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" fill="none" strokeLinecap="round" className="route-flow" />

          <circle cx="90" cy="470" r="9" fill="#0a2540" />
          <circle cx="90" cy="470" r="4" fill="#ffffff" />

          <circle cx="420" cy="260" r="40" fill="#2cd5c4" opacity="0.15" />
          <circle cx="420" cy="260" r="16" fill="#2cd5c4" opacity="0.6">
            <animate attributeName="r" values="16;46" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="420" cy="260" r="16" fill="#009ca6" stroke="#ffffff" strokeWidth="5" />
          <foreignObject x="408" y="248" width="24" height="24">
            <Navigation className="size-6 rotate-45 fill-primary-foreground p-1 text-primary-foreground" />
          </foreignObject>

          <circle cx="730" cy="120" r="18" fill="#0a2540" />
          <foreignObject x="718" y="108" width="24" height="24">
            <Flag className="size-6 p-1 text-mint" />
          </foreignObject>
        </svg>
        <p className="sr-only">Your live position is about halfway to the destination, Maple Court.</p>

        <div className="absolute top-4 left-4 flex max-w-[calc(100%-6rem)] flex-col gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-card/95 px-3 py-2 shadow-sm backdrop-blur">
            <ShieldCheck className="size-4 text-teal" aria-hidden="true" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-navy">Smart Route Recommendation</span>
              <span className="text-[11px] text-muted-foreground"><span className="hidden sm:inline">Well-lit · 3 open venues · CCTV covered</span></span>
            </div>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full bg-navy px-3 py-1 text-[11px] font-medium text-primary-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            Movement Tracking · Live
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col overflow-hidden rounded-xl bg-card shadow-sm">
          <button type="button" aria-label="Zoom in" className="p-2 text-navy transition-all duration-200 hover:bg-accent">
            <Plus className="size-4" aria-hidden="true" />
          </button>
          <span className="h-px bg-border" />
          <button type="button" aria-label="Zoom out" className="p-2 text-navy transition-all duration-200 hover:bg-accent">
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="h-px bg-border" />
          <button type="button" aria-label="Center on my location" className="p-2 text-teal transition-all duration-200 hover:bg-accent">
            <Locate className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

        <figure className="m-3 flex overflow-hidden rounded-xl border-2 border-card bg-navy shadow-xl sm:absolute sm:right-4 sm:bottom-4 sm:m-0 sm:block sm:w-60">
          <div className="relative aspect-video w-32 shrink-0 sm:w-full">
            <Image
              src="/images/wearable-feed.png"
              alt="Live view from smartwatch wearable camera showing the sidewalk ahead"
              fill
              sizes="240px"
              className="object-cover"
            />
            <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-md bg-navy/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-red-500" aria-hidden="true" />
              REC
            </span>
            <span className="absolute top-2 right-2 hidden rounded-md sm:block bg-navy/80 px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground">
              00:14:32
            </span>
          </div>
          <figcaption className="flex items-center gap-2 px-2.5 py-2">
            <Watch className="size-3.5 shrink-0 text-mint" aria-hidden="true" />
            <span className="text-[10px] leading-tight text-primary-foreground/85 sm:text-[11px]">
              Smartwatch 360° Wearable Live Camera Stream
            </span>
          </figcaption>
        </figure>
    </section>
  )
}
