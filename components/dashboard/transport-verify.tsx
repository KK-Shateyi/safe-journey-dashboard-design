'use client'

import { useId, useState } from 'react'
import { CarFront, CircleCheck, Share2, Upload } from 'lucide-react'
import { Panel, PanelHeader } from './panel'

export function TransportVerify() {
  const inputId = useId()
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <Panel>
      <PanelHeader
        icon={CarFront}
        title="Transport Verification Portal"
        description="Log your ride before you get in"
      />

      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-4 py-5 text-center transition-all duration-200 hover:border-teal hover:bg-accent focus-within:border-teal"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-card text-teal shadow-sm">
          <Upload className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-navy">Upload Taxi Plate / Driver ID Photo</span>
        <span className="text-[11px] text-muted-foreground">
          {fileName ?? 'JPG, PNG or HEIC · stored encrypted for 30 days'}
        </span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </label>

      <div
        role="status"
        className="mt-3 flex items-start gap-2.5 rounded-xl bg-accent p-3 text-xs leading-relaxed"
      >
        {fileName ? (
          <CircleCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
        ) : (
          <Share2 className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
        )}
        <p className="text-navy">
          {fileName ? (
            <>
              <span className="font-semibold">Shared automatically</span> with Mom, Priya, Daniel & Grace
              alongside your pickup location and time.
            </>
          ) : (
            <>
              <span className="font-semibold">Auto-share is on.</span> Photos are sent to your 4 ICE
              contacts the moment you upload.
            </>
          )}
        </p>
      </div>
    </Panel>
  )
}
