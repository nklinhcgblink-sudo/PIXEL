export const themes = {
  midnight: { '--pixel-bg': '#0b0f17', '--pixel-panel': '#121925', '--pixel-panel-2': '#171f2e', '--pixel-fg': '#f3f5fa', '--pixel-muted': '#98a4b8', '--pixel-line': '#273244', '--pixel-accent': '#9bf36b', '--pixel-accent-ink': '#10170e', '--pixel-glow': 'rgba(155,243,107,.15)' },
  paper: { '--pixel-bg': '#f4f0e8', '--pixel-panel': '#fffdf8', '--pixel-panel-2': '#eae4d8', '--pixel-fg': '#252b26', '--pixel-muted': '#687166', '--pixel-line': '#d9d2c5', '--pixel-accent': '#386b49', '--pixel-accent-ink': '#fff', '--pixel-glow': 'rgba(56,107,73,.12)' },
  aurora: { '--pixel-bg': '#100d20', '--pixel-panel': '#1b1630', '--pixel-panel-2': '#27203f', '--pixel-fg': '#f7f0ff', '--pixel-muted': '#b7a9d4', '--pixel-line': '#3b3156', '--pixel-accent': '#d4a8ff', '--pixel-accent-ink': '#21122e', '--pixel-glow': 'rgba(212,168,255,.16)' }
} as const;
export type ThemeName = keyof typeof themes;
export function applyTheme(name: ThemeName): void {
  const root = document.documentElement;
  root.dataset.theme = name;
  Object.entries(themes[name]).forEach(([property, value]) => root.style.setProperty(property, value));
}
