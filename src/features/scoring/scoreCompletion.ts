/** Returns a rounded completion score from 0 to 100. Invalid totals safely score zero. */
export function scoreCompletion(completed: number, total: number): number {
  if (!Number.isFinite(completed) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.round((Math.min(Math.max(completed, 0), total) / total) * 100);
}
