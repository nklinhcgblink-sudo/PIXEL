import type { PixelPlugin, PluginSummary } from './types';

/** In-process registry for trusted, bundled plugins. This is not a security sandbox. */
export class PluginRegistry {
  private readonly plugins = new Map<string, PixelPlugin>();
  register(plugin: PixelPlugin): void {
    const id = plugin.id.trim();
    if (!id) throw new Error('Plugin id must not be empty.');
    if (this.plugins.has(id)) throw new Error(`Plugin "${id}" is already registered.`);
    this.plugins.set(id, plugin);
  }
  unregister(id: string): boolean { return this.plugins.delete(id); }
  get(id: string): PixelPlugin | undefined { return this.plugins.get(id); }
  list(): readonly PluginSummary[] {
    return Array.from(this.plugins.values(), ({ id, name, version, description }) => ({ id, name, version, description }));
  }
}
