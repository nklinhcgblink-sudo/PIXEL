import { describe, expect, it } from 'vitest';
import { scoreCompletion } from './scoreCompletion';
describe('scoreCompletion', () => {
  it('returns rounded completion percentages', () => { expect(scoreCompletion(7, 12)).toBe(58); });
  it('clamps values', () => { expect(scoreCompletion(-2, 10)).toBe(0); expect(scoreCompletion(12, 10)).toBe(100); });
  it('safely handles invalid totals and non-finite input', () => { expect(scoreCompletion(1, 0)).toBe(0); expect(scoreCompletion(1, -1)).toBe(0); expect(scoreCompletion(Number.NaN, 10)).toBe(0); });
});
