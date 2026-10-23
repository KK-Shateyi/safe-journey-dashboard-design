'use server'

import { timingSafeEqual } from 'node:crypto'

const DEFAULT_PIN = '2580'

export async function verifyPin(candidate: string): Promise<boolean> {
  if (!/^\d{4}$/.test(candidate)) return false

  const secret = process.env.SAFE_JOURNEY_PIN ?? DEFAULT_PIN
  const a = Buffer.from(candidate)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}
