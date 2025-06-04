import { describe, expect, it, vi } from 'vitest'
import { evaluateDiceExpression } from '../src/functions'

vi.mock('@magicyan/discord', async () => ({
  ...(await vi.importActual('@magicyan/discord')),

  // Always returns the smallest value for predictability
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  randomNumber: (min: number, max: number) => min,
}))

describe('evaluateDiceExpression', () => {
  it('should return null for invalid expression', () => {
    expect(evaluateDiceExpression('abc')).toBeNull()
    expect(evaluateDiceExpression('')).toBeNull()
  })

  it('should return correct results for a simple dice expression', () => {
    const result = evaluateDiceExpression('1d6')

    expect(result).toMatchObject({
      total: 1,
      rolls: [1],
      expression: '1d6',
    })

    expect(result?.detailedResult).toContain('1d6')
    expect(result?.detailedResult).toContain('1')
  })

  it('should roll multiple dice', () => {
    const result = evaluateDiceExpression('2d4')

    expect(result?.total).toBe(2)
    expect(result?.rolls).toEqual([1, 1])
    expect(result?.detailedResult).toContain('2d4')
  })

  it('should add values to dice rolls', () => {
    const result = evaluateDiceExpression('1d6+2')

    expect(result?.total).toBe(3)
    expect(result?.detailedResult).toContain('1d6')
    expect(result?.detailedResult).toContain('+ 2')
  })

  it('should subtract values from dice rolls', () => {
    const result = evaluateDiceExpression('2d6-1')

    expect(result?.total).toBe(1)
    expect(result?.detailedResult).toContain('- 1')
  })

  it('should multiply values by dice rolls', () => {
    const result = evaluateDiceExpression('3d8*2')
    expect(result?.total).toBe(6)
    expect(result?.detailedResult).toContain('* 2')
  })

  it('should divide values by dice rolls', () => {
    const result = evaluateDiceExpression('4d8/2')

    expect(result?.total).toBe(2)
    expect(result?.detailedResult).toContain('/ 2')
  })

  it('should accept [x, X, *] as multiplication operators', () => {
    const resultx = evaluateDiceExpression('2d6 x 3')
    const resultX = evaluateDiceExpression('2d6 X 3')
    const resultStar = evaluateDiceExpression('2d6 * 3')

    expect(resultx?.total).toBe(6)
    expect(resultX?.total).toBe(6)
    expect(resultStar?.total).toBe(6)
  })

  it('should ignore invalid parts', () => {
    const result = evaluateDiceExpression('2d6+abc+3')

    expect(result?.total).toBe(5)
    expect(result?.detailedResult).toContain('+ 3')
  })

  it('should return null for expressions without dice', () => {
    expect(evaluateDiceExpression('5+3')).toBeNull()
    expect(evaluateDiceExpression('2*3')).toBeNull()
    expect(evaluateDiceExpression('4/2')).toBeNull()
  })

  // eslint-disable-next-line @stylistic/max-len
  it('should return null for expressions starting with invalid characters', () => {
    expect(evaluateDiceExpression('lorem d8')).toBeNull()
    expect(evaluateDiceExpression('x5d6')).toBeNull()
  })
})
