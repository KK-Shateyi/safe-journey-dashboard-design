export const OPERATORS = ['+', '−', '×', '÷'] as const
export type Operator = (typeof OPERATORS)[number]

export function isOperator(char: string | undefined): char is Operator {
  return !!char && (OPERATORS as readonly string[]).includes(char)
}

function tokenize(expression: string): (number | Operator)[] {
  const tokens: (number | Operator)[] = []
  const pattern = /(\d+\.?\d*|\.\d+)|([+−×÷])/g
  for (const match of expression.matchAll(pattern)) {
    tokens.push(match[1] !== undefined ? Number.parseFloat(match[1]) : (match[2] as Operator))
  }
  return tokens
}

export function evaluate(expression: string): number | null {
  const tokens = tokenize(expression)
  while (tokens.length && isOperator(tokens[tokens.length - 1] as string)) tokens.pop()
  if (!tokens.length) return null

  const additive: (number | Operator)[] = [tokens[0]]
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i] as Operator
    const value = tokens[i + 1] as number
    if (op === '×' || op === '÷') {
      const left = additive.pop() as number
      if (op === '÷' && value === 0) return null
      additive.push(op === '×' ? left * value : left / value)
    } else {
      additive.push(op, value)
    }
  }

  let result = additive[0] as number
  for (let i = 1; i < additive.length; i += 2) {
    const value = additive[i + 1] as number
    result = additive[i] === '+' ? result + value : result - value
  }
  return Number.isFinite(result) ? result : null
}

export function formatResult(value: number): string {
  return Number.parseFloat(value.toPrecision(12)).toString()
}
