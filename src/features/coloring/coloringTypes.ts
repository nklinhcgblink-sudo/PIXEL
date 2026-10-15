export type RegionId = number;
export type PaletteColor = string;
export interface RegionFill { readonly regionId: RegionId; readonly color: PaletteColor }

/** Validate a region-fill payload before persistence or network transfer. */
export function isValidRegionFill(value: unknown, regionCount: number): value is RegionFill {
  if (!value || typeof value !== 'object' || !Number.isInteger(regionCount) || regionCount < 0) return false;
  const candidate = value as Record<string, unknown>;
  return Number.isInteger(candidate.regionId) && (candidate.regionId as number) >= 1 && (candidate.regionId as number) <= regionCount && typeof candidate.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(candidate.color);
}
