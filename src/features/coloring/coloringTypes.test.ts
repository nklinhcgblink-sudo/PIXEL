import { describe, expect, it } from 'vitest';
import { isValidRegionFill } from './coloringTypes';
describe('isValidRegionFill', () => {
  it('accepts valid region fills', () => { expect(isValidRegionFill({ regionId: 2, color: '#AABBCC' }, 5)).toBe(true); });
  it('rejects invalid region IDs, colors and values', () => { expect(isValidRegionFill({ regionId: 0, color: '#AABBCC' }, 5)).toBe(false); expect(isValidRegionFill({ regionId: 6, color: '#AABBCC' }, 5)).toBe(false); expect(isValidRegionFill({ regionId: 1, color: 'red' }, 5)).toBe(false); expect(isValidRegionFill(null, 5)).toBe(false); });
});
