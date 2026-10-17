import React from 'react';
import { X, Check, Sparkles, Sun, Moon, Monitor, Palette } from 'lucide-react';
import { AVAILABLE_THEMES, ThemeId, DisplayMode, ThemeDefinition } from '../services/theme';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  currentMode: DisplayMode;
  onSelectTheme: (themeId: ThemeId) => void;
  onSelectMode: (mode: DisplayMode) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  currentMode,
  onSelectTheme,
  onSelectMode,
}) => {
  if (!isOpen) return null;

  const activeThemeDef = AVAILABLE_THEMES.find((t) => t.id === currentTheme) || AVAILABLE_THEMES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans"
    >
      <div
        className="bg-white text-black rounded-xl border-[3px] border-black shadow-[12px_12px_0px_0px_#000] max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-[3px] border-black flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8FF00] border-2 border-black flex items-center justify-center text-black font-bold shadow-[2px_2px_0_0_#000]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="heading text-lg font-bold text-black flex items-center gap-2">
                <span>THEME & PALETTE ENGINE</span>
                <span className="text-[10px] font-bold px-2 py-0.5 border border-black bg-[#E8FF00] text-black">
                  ACTIVE
                </span>
              </h3>
              <p className="text-xs text-slate-700 mono font-medium">
                Current default: SYNAPSE White Theme
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 border-2 border-black rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Display Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Display Mode
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onSelectMode('light')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  currentMode === 'light'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-1 ring-indigo-600 text-indigo-950 dark:text-indigo-200'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <div className="text-center">
                  <p className="font-semibold text-xs">Light</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Crisp paper</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  currentMode === 'dark'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-1 ring-indigo-600 text-indigo-950 dark:text-indigo-200'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <div className="text-center">
                  <p className="font-semibold text-xs">Dark</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Midnight Slate</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('oled')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  currentMode === 'oled'
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-1 ring-indigo-600 text-indigo-950 dark:text-indigo-200'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Monitor className="w-4 h-4 text-emerald-400" />
                <div className="text-center">
                  <p className="font-semibold text-xs">OLED Black</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Pure pitch black</p>
                </div>
              </button>
            </div>
          </div>

          {/* Theme Palette Selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Color Palette Theme
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {AVAILABLE_THEMES.length} Themes Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_THEMES.map((theme: ThemeDefinition) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-600/50'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {/* Swatch Pill */}
                        <div className="flex items-center -space-x-1">
                          <span
                            className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-2xs"
                            style={{ backgroundColor: theme.primaryHex }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-2xs"
                            style={{ backgroundColor: theme.accentHex }}
                          />
                        </div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {theme.name}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                      {theme.tagline}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono">{theme.badge}</span>
                      <span
                        className="font-mono font-medium px-1.5 py-0.5 rounded"
                        style={{
                          color: theme.primaryHex,
                          backgroundColor: `${theme.primaryHex}15`,
                        }}
                      >
                        {theme.primaryHex}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Accent Preview</span>
              </span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {activeThemeDef.name} ({currentMode.toUpperCase()})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 rounded-lg shadow-2xs"
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 rounded-lg"
              >
                Outline Action
              </button>
              <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Risk Score: 88/100
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-[3px] border-black bg-white flex items-center justify-between">
          <p className="text-[11px] text-black mono font-medium">
            Active selection is instantly applied to your workspace.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-bold text-black bg-[#E8FF00] border-2 border-black hover:bg-black hover:text-[#E8FF00] brutal-shadow btn-press cursor-pointer"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
