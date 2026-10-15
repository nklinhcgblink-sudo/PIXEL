import { describe, expect, it } from 'vitest';
import { PluginRegistry } from './PluginRegistry';
const plugin = { id: 'sample', name: 'Sample', version: '1.0.0' } as const;
describe('PluginRegistry', () => {
  it('registers and lists plugins', () => { const registry = new PluginRegistry(); registry.register(plugin); expect(registry.get('sample')?.name).toBe('Sample'); expect(registry.list()).toHaveLength(1); });
  it('rejects duplicate IDs', () => { const registry = new PluginRegistry(); registry.register(plugin); expect(() => registry.register(plugin)).toThrow(/already registered/); });
  it('can unregister plugins', () => { const registry = new PluginRegistry(); registry.register(plugin); expect(registry.unregister('sample')).toBe(true); expect(registry.unregister('sample')).toBe(false); });
});
