import { describe, it, expect } from 'vitest'
import { colors } from '../../src/lib/design-tokens/colors'

describe('Design Tokens - Colors', () => {
  it('should have bgBase defined', () => {
    expect(colors.bgBase).toBe('#0E0F12')
  })

  it('should have status colors', () => {
    expect(colors.statusNormal).toBe('#00D18F')
    expect(colors.statusCaution).toBe('#FFC857')
    expect(colors.statusCritical).toBe('#FF4D4F')
  })
})