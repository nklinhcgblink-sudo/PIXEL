import type { PixelPlugin } from '../core/plugins/types';
interface ModuleCardProps { plugin: PixelPlugin; index: number }
const icons: Record<string, string> = { coloring: '▦', multiplayer: '⌘', scoring: '↗' };
export function ModuleCard({ plugin, index }: ModuleCardProps) {
  const planned = plugin.id === 'multiplayer';
  return <article className="module-card"><div className="module-card-top"><span className="module-icon" aria-hidden="true">{icons[plugin.id] ?? '✳'}</span><span className="module-index">MODULE / 0{index + 1}</span></div><h3>{plugin.name}</h3><p>{plugin.description}</p><span className="module-status">● {planned ? 'Planned' : 'Foundation'}</span></article>;
}
