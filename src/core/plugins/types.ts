export interface PixelPluginContext { readonly appVersion: string; readonly log: (message: string) => void }
export interface PixelPlugin { readonly id: string; readonly name: string; readonly version: string; readonly description?: string; readonly activate?: (context: PixelPluginContext) => void | Promise<void>; readonly deactivate?: () => void | Promise<void> }
export interface PluginSummary { readonly id: string; readonly name: string; readonly version: string; readonly description?: string }
