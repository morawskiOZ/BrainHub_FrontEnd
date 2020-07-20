/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateDate } from './date'

describe('validateDate function', () => {
  it('should return true for valid date', () => {
    expect(validateDate('2022-12-22')).toBe(true)
    expect(validateDate('2922-12-22')).toBe(true)
    expect(validateDate('1922-12-31')).toBe(true)
    expect(validateDate('2022-01-12')).toBe(true)
  })
  it('should return true for invalid date', () => {
    expect(validateDate('2022-31-22')).toBe(false)
    expect(validateDate('2922-00-22')).toBe(false)
    expect(validateDate('1922-12-32')).toBe(false)
    expect(validateDate('20222-01-12')).toBe(false)
    expect(validateDate('1922-12-32')).toBe(false)
    expect(validateDate('20222-01-1112')).toBe(false)
    expect(validateDate('2022112-01-23')).toBe(false)
    expect(validateDate('20222-011-122')).toBe(false)
    expect(validateDate('1999-011-122')).toBe(false)
    expect(validateDate('1991/11/122')).toBe(false)
  })
  it('should return true for wrong input', () => {
    expect(validateDate('')).toBe(false)
    expect(validateDate([] as any)).toBe(false)
    expect(validateDate({} as any)).toBe(false)
    expect(validateDate(undefined)).toBe(false)
    expect(validateDate(null)).toBe(false)
    expect(validateDate(0 as any)).toBe(false)
  })
})
