'use client'

import { useEffect, useState, useTransition } from 'react'
import { Calculator as CalculatorIcon, Delete } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { evaluate, formatResult, isOperator, type Operator } from '@/lib/calculator'
import { verifyPin } from '@/app/actions/verify-pin'

type Key =
  | { kind: 'digit'; value: string }
  | { kind: 'operator'; value: Operator }
  | { kind: 'decimal' }
  | { kind: 'clear' }
  | { kind: 'backspace' }
  | { kind: 'equals' }

const LAYOUT: { key: Key; label: string; className?: string }[] = [
  { key: { kind: 'clear' }, label: 'C', className: 'col-span-2' },
  { key: { kind: 'backspace' }, label: 'Backspace' },
  { key: { kind: 'operator', value: '÷' }, label: '÷' },
  { key: { kind: 'digit', value: '7' }, label: '7' },
  { key: { kind: 'digit', value: '8' }, label: '8' },
  { key: { kind: 'digit', value: '9' }, label: '9' },
  { key: { kind: 'operator', value: '×' }, label: '×' },
  { key: { kind: 'digit', value: '4' }, label: '4' },
  { key: { kind: 'digit', value: '5' }, label: '5' },
  { key: { kind: 'digit', value: '6' }, label: '6' },
  { key: { kind: 'operator', value: '−' }, label: '−' },
  { key: { kind: 'digit', value: '1' }, label: '1' },
  { key: { kind: 'digit', value: '2' }, label: '2' },
  { key: { kind: 'digit', value: '3' }, label: '3' },
  { key: { kind: 'operator', value: '+' }, label: '+' },
  { key: { kind: 'digit', value: '0' }, label: '0', className: 'col-span-2' },
  { key: { kind: 'decimal' }, label: '.' },
  { key: { kind: 'equals' }, label: '=' },
]

const KEYBOARD_MAP: Record<string, Key> = {
  '+': { kind: 'operator', value: '+' },
  '-': { kind: 'operator', value: '−' },
  '*': { kind: 'operator', value: '×' },
  x: { kind: 'operator', value: '×' },
  '/': { kind: 'operator', value: '÷' },
  '.': { kind: 'decimal' },
  Enter: { kind: 'equals' },
  '=': { kind: 'equals' },
  Backspace: { kind: 'backspace' },
  Escape: { kind: 'clear' },
}

export function Calculator({ onUnlock }: { onUnlock: () => void }) {
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState('')
  const [justEvaluated, setJustEvaluated] = useState(false)
  const [isPending, startTransition] = useTransition()

  const preview = /[+−×÷]/.test(expression) ? evaluate(expression) : null

  function press(key: Key) {
    if (isPending) return

    switch (key.kind) {
      case 'digit':
        setExpression((prev) => (justEvaluated ? key.value : prev === '0' ? key.value : prev + key.value))
        setJustEvaluated(false)
        return
      case 'decimal': {
        setExpression((prev) => {
          const base = justEvaluated ? '' : prev
          const currentNumber = base.split(/[+−×÷]/).pop() ?? ''
          if (currentNumber.includes('.')) return base
          return base + (currentNumber === '' ? '0.' : '.')
        })
        setJustEvaluated(false)
        return
      }
      case 'operator':
        setExpression((prev) => {
          if (prev === '' || prev === 'Error') return '0' + key.value
          if (isOperator(prev.at(-1))) return prev.slice(0, -1) + key.value
          return prev + key.value
        })
        setJustEvaluated(false)
        return
      case 'backspace':
        setExpression((prev) => (justEvaluated || prev === 'Error' ? '' : prev.slice(0, -1)))
        setJustEvaluated(false)
        return
      case 'clear':
        setExpression('')
        setHistory('')
        setJustEvaluated(false)
        return
      case 'equals': {
        const input = expression
        if (/^\d{4}$/.test(input)) {
          startTransition(async () => {
            if (await verifyPin(input)) {
              setExpression('')
              setHistory('')
              onUnlock()
              return
            }
            setHistory(`${input} =`)
            setJustEvaluated(true)
          })
          return
        }
        if (!input) return
        const result = evaluate(input)
        setHistory(`${input} =`)
        setExpression(result === null ? 'Error' : formatResult(result))
        setJustEvaluated(true)
      }
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const key: Key | undefined = /^\d$/.test(event.key)
        ? { kind: 'digit', value: event.key }
        : KEYBOARD_MAP[event.key]
      if (!key) return
      event.preventDefault()
      press(key)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <section
      aria-label="Calculator"
      className="w-full max-w-sm rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/40"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-teal">
            <CalculatorIcon className="size-4" aria-hidden="true" />
          </span>
          <h1 className="text-sm font-semibold tracking-tight">SmartCalc</h1>
        </div>
        <span className="text-xs text-muted-foreground">Standard</span>
      </header>

      <output
        aria-live="polite"
        aria-label="Calculator display"
        className="mb-5 flex h-32 flex-col items-end justify-end gap-1 overflow-hidden rounded-2xl bg-background px-5 py-4"
      >
        <span className="h-5 truncate text-sm text-muted-foreground">
          {history || (preview !== null ? `= ${formatResult(preview)}` : '')}
        </span>
        <span
          className={cn(
            'w-full truncate text-right font-mono text-5xl font-light tracking-tight tabular-nums transition-all duration-200',
            expression.length > 9 && 'text-3xl',
            isPending && 'opacity-50',
          )}
        >
          {expression || '0'}
        </span>
      </output>

      <div className="grid grid-cols-4 gap-3">
        {LAYOUT.map(({ key, label, className }) => {
          const isOp = key.kind === 'operator'
          const isEquals = key.kind === 'equals'
          const isUtility = key.kind === 'clear' || key.kind === 'backspace'
          return (
            <Button
              key={label}
              type="button"
              variant="secondary"
              onClick={() => press(key)}
              disabled={isEquals && isPending}
              aria-label={label}
              className={cn(
                'h-16 rounded-2xl text-2xl font-normal transition-all duration-200 active:scale-95',
                'bg-secondary text-foreground hover:bg-muted',
                isUtility && 'text-lg font-medium text-mint',
                isOp && 'bg-muted text-teal hover:bg-[#2a2f37]',
                isEquals && 'bg-teal text-white hover:bg-teal-hover',
                className,
              )}
            >
              {key.kind === 'backspace' ? <Delete className="size-6" aria-hidden="true" /> : label}
            </Button>
          )
        })}
      </div>
    </section>
  )
}
