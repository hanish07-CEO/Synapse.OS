export type ThemeId = 'synapse' | 'indigo' | 'brand-blue' | 'emerald' | 'amber' | 'crimson' | 'violet';
export type DisplayMode = 'light' | 'dark' | 'oled';

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  primaryHex: string;
  accentHex: string;
  swatchDark: string;
  swatchLight: string;
  badge: string;
}

export const AVAILABLE_THEMES: ThemeDefinition[] = [
  {
    id: 'synapse',
    name: 'SYNAPSE // Neobrutalist',
    tagline: 'Raw neobrutalist project intelligence with acid yellow, paper canvas & tactile brutal shadows',
    primaryHex: '#E8FF00',
    accentHex: '#000000',
    swatchDark: '#000000',
    swatchLight: '#F5F1E8',
    badge: 'Neobrutalism',
  },
  {
    id: 'indigo',
    name: 'Obsidian Indigo',
    tagline: 'Flagship pre-mortem intelligence with electric indigo accents',
    primaryHex: '#4f46e5',
    accentHex: '#818cf8',
    swatchDark: '#0f172a',
    swatchLight: '#eef2ff',
    badge: 'Default',
  },
  {
    id: 'brand-blue',
    name: 'Recall Brand Blue',
    tagline: 'Enterprise sapphire & deep flow cobalt for high-precision workflows',
    primaryHex: '#0284c7',
    accentHex: '#38bdf8',
    swatchDark: '#072849',
    swatchLight: '#f0f9ff',
    badge: 'Recall Flow',
  },
  {
    id: 'emerald',
    name: 'Cyber Matrix Emerald',
    tagline: 'High-tech terminal radar & automated cybersecurity verification',
    primaryHex: '#059669',
    accentHex: '#34d399',
    swatchDark: '#022c22',
    swatchLight: '#ecfdf5',
    badge: 'Cyber Radar',
  },
  {
    id: 'amber',
    name: 'Tactical Radar Amber',
    tagline: 'Defense pre-mortem HUD with urgent hazard detection amber',
    primaryHex: '#d97706',
    accentHex: '#fbbf24',
    swatchDark: '#451a03',
    swatchLight: '#fffbeb',
    badge: 'Tactical',
  },
  {
    id: 'crimson',
    name: 'Pre-Mortem Crimson',
    tagline: 'High-alert breach detection & critical vulnerability triage',
    primaryHex: '#e11d48',
    accentHex: '#fb7185',
    swatchDark: '#4c0519',
    swatchLight: '#fff1f2',
    badge: 'Critical Alert',
  },
  {
    id: 'violet',
    name: 'Nebula Violet',
    tagline: 'Cosmic deep space aesthetic with luminous ultraviolet glow',
    primaryHex: '#7c3aed',
    accentHex: '#a78bfa',
    swatchDark: '#2e1065',
    swatchLight: '#f5f3ff',
    badge: 'Cosmic',
  },
];

const THEME_STORAGE_KEY = 'blindspot_theme_id';
const MODE_STORAGE_KEY = 'blindspot_display_mode';

export function getStoredTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId;
    if (saved && AVAILABLE_THEMES.some((t) => t.id === saved)) {
      return saved;
    }
  } catch (e) {
    // Ignore storage errors
  }
  return 'synapse';
}

export function getStoredMode(): DisplayMode {
  try {
    const saved = localStorage.getItem(MODE_STORAGE_KEY) as DisplayMode;
    if (saved && ['light', 'dark', 'oled'].includes(saved)) {
      return saved;
    }
  } catch (e) {
    // Ignore storage errors
  }
  return 'light';
}

export function setStoredTheme(themeId: ThemeId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch (e) {
    // Ignore
  }
}

export function setStoredMode(mode: DisplayMode): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch (e) {
    // Ignore
  }
}

export function applyTheme(themeId: ThemeId, mode: DisplayMode): void {
  const root = document.documentElement;

  // Apply theme data attribute
  root.setAttribute('data-theme', themeId);
  root.setAttribute('data-mode', mode);

  // Sync Tailwind .dark class
  if (mode === 'dark' || mode === 'oled') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
