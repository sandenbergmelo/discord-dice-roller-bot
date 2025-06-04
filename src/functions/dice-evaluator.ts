import {
  parseIntOrDefault,
  randomNumber,
  spaceBuilder,
} from '@magicyan/discord'

/**
 * Regular expression to match dice roll expressions and arithmetic operations.
 *
 * Matches optional arithmetic operators (+, -, *, /, x, X) followed by either:
 * - a dice notation (e.g., "2d6"), or
 * - a standalone number (e.g., "5").
 *
 * Can match expressions like:
 * - "2d6", "+3d8", "+3", "-4", "*5", "/2", "x10", "X20" etc.
 *
 * Will handle groups of dice rolls and
 *  arithmetic operations in a single message, like:
 * * "2d6", "2d8+1d6+4", "2d20 - 4" etc.
 *
 * Used for parsing dice roll commands in the format
 *  commonly used in tabletop games.
 */
const DICE_REGEX = /([+\-*/xX]?)(\s*\d*d\d+|\s*\d+)/g

/**
 * Evaluates a dice expression
 * and returns a formatted message with the result.
 * @param expression - The dice expression to evaluate.
 *  e.g. "2d20" or "2d8+1d6+4" or "2d20 - 4" etc.
 * @returns A formatted message with the total result and details of the rolls.
 */
export function evaluateDiceExpression(expression: string) {
  const matches = [...expression.matchAll(DICE_REGEX)]

  if (!expression.includes('d') || !matches.length) {
    return null
  }

  // If the first character is not a digit or 'd', return null
  const firstChar = matches[0].input?.trim()[0]
  if (!/^\d|^d/i.test(firstChar ?? '')) {
    return null
  }

  let total = 0
  const messageParts: string[] = []
  let rollResults: number[] = []

  for (const match of matches) {
    let [, operator, expr] = match

    expr = expr.trim()

    let currentRollsValue = 0
    let rollDetail = ''

    if (expr.includes('d')) {
      const [amountStr, numDieStr] = expr.split('d')

      const amount = parseIntOrDefault(amountStr, 1)
      const numDie = parseInt(numDieStr)

      if (isNaN(amount) || isNaN(numDie) || amount < 1 || numDie < 1) continue

      const rolls = Array
        .from({ length: amount }, () => randomNumber(1, numDie))

      rollResults = rolls.slice()

      currentRollsValue = rolls.reduce((a, b) => a + b, 0)

      const formattedRolls = rolls.map((roll) => {
        if (roll === 1 || roll === numDie) return `**${roll}**`
        return roll.toString()
      })

      rollDetail = spaceBuilder(
          `${operator} ${amount}d${numDie}`,
          `[${formattedRolls.join(', ')}]`,
      )
    } else {
      currentRollsValue = parseInt(expr)
      if (isNaN(currentRollsValue)) continue

      rollDetail = `${operator} ${currentRollsValue}`
    }

    switch (operator) {
      case '+': total += currentRollsValue; break
      case '-': total -= currentRollsValue; break
      case '*':
      case 'x':
      case 'X': total *= currentRollsValue; break
      case '/': total /= currentRollsValue; break
      default: total += currentRollsValue; break
    }

    messageParts.push(rollDetail)
  }

  if (!messageParts.length) {
    return null
  }

  const detailedResult = `\` ${total} \` ⟵ 🎲 ${messageParts.join(' ')}`

  return {
    total,
    detailedResult,
    rolls: rollResults,
    expression,
  }
}
