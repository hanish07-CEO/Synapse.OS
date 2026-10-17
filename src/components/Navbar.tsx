import React from 'react';
import { ShieldAlert, Sun, Moon, Monitor, LogOut, User as UserIcon, Palette, Brain } from 'lucide-react';
import { UserProfile } from '../types/auth';
import { ThemeId, DisplayMode, AVAILABLE_THEMES } from '../services/theme';

export type AppLevel = 'landing' | 'login' | 'dashboard';
export type DashboardTab = 'dashboard' | 'new-analysis' | 'findings' | 'questions' | 'reports' | 'demos';

interface NavbarProps {
  currentLevel: AppLevel;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;
  onNavigateToLevel: (level: AppLevel) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  currentTheme: ThemeId;
  currentMode: DisplayMode;
  onOpenThemeModal: () => void;
  onToggleMode: () => void;
  openScriptModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  dashboardTab,
  setDashboardTab,
  onNavigateToLevel,
  currentUser,
  onLogout,
  currentTheme,
  currentMode,
  onOpenThemeModal,
  onToggleMode,
  openScriptModal,
}) => {
  const isAuthenticated = Boolean(currentUser && currentLevel === 'dashboard');
  const isSynapse = currentTheme === 'synapse';
  const activeThemeDef = AVAILABLE_THEMES.find((t) => t.id === currentTheme) || AVAILABLE_THEMES[0];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        isSynapse
          ? 'bg-white dark:bg-black border-b-[3px] border-black dark:border-[#E8FF00] shadow-[0_4px_0_0_#000]'
          : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between gap-6 ${isSynapse ? 'h-[72px]' : 'h-16'}`}>
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigateToLevel(currentUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 text-lg font-bold tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            {isSynapse ? (
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#E8FF00] text-black border-[3px] border-black flex items-center justify-center brutal-shadow">
                  <Brain className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="heading text-xl sm:text-2xl tracking-tighter text-black dark:text-white leading-none">
                    SYNAPSE.OS
                  </span>
                  <span className="mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-[#E8FF00] font-bold">
                    PRE-MORTEM INTEL
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>BlindSpot AI</span>
              </div>
            )}
          </button>

          {/* Zone 2: Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 text-sm font-medium ${
              isSynapse
                ? 'mono font-bold text-xs uppercase'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {isAuthenticated ? (
              // Authenticated Workspace Navigation (Level 3)
              <>
                <button
                  onClick={() => setDashboardTab('dashboard')}
                  className={
                    isSynapse
                      ? `px-3 py-1.5 transition-all cursor-pointer ${
                          dashboardTab === 'dashboard'
                            ? 'bg-[#E8FF00] text-black border-[2px] border-black font-bold shadow-[2px_2px_0_0_#000]'
                            : 'hover:underline text-black dark:text-white'
                        }`
                      : `hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                          dashboardTab === 'dashboard'
                            ? 'border-indigo-600 text-slate-900 dark:text-white font-semibold'
                            : 'border-transparent'
                        }`
                  }
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setDashboardTab('findings')}
                  className={
                    isSynapse
                      ? `px-3 py-1.5 transition-all cursor-pointer ${
                          dashboardTab === 'findings'
                            ? 'bg-[#E8FF00] text-black border-[2px] border-black font-bold shadow-[2px_2px_0_0_#000]'
                            : 'hover:underline text-black dark:text-white'
                        }`
                      : `hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                          dashboardTab === 'findings'
                            ? 'border-indigo-600 text-slate-900 dark:text-white font-semibold'
                            : 'border-transparent'
                        }`
                  }
                >
                  Findings
                </button>
                <button
                  onClick={() => setDashboardTab('questions')}
                  className={
                    isSynapse
                      ? `px-3 py-1.5 transition-all cursor-pointer ${
                          dashboardTab === 'questions'
                            ? 'bg-[#E8FF00] text-black border-[2px] border-black font-bold shadow-[2px_2px_0_0_#000]'
                            : 'hover:underline text-black dark:text-white'
                        }`
                      : `hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                          dashboardTab === 'questions'
                            ? 'border-indigo-600 text-slate-900 dark:text-white font-semibold'
                            : 'border-transparent'
                        }`
                  }
                >
                  Question Engine
                </button>
                <button
                  onClick={() => setDashboardTab('reports')}
                  className={
                    isSynapse
                      ? `px-3 py-1.5 transition-all cursor-pointer ${
                          dashboardTab === 'reports'
                            ? 'bg-[#E8FF00] text-black border-[2px] border-black font-bold shadow-[2px_2px_0_0_#000]'
                            : 'hover:underline text-black dark:text-white'
                        }`
                      : `hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                          dashboardTab === 'reports'
                            ? 'border-indigo-600 text-slate-900 dark:text-white font-semibold'
                            : 'border-transparent'
                        }`
                  }
                >
                  Reports
                </button>
                <button
                  onClick={() => setDashboardTab('demos')}
                  className={
                    isSynapse
                      ? `px-3 py-1.5 transition-all cursor-pointer ${
                          dashboardTab === 'demos'
                            ? 'bg-[#E8FF00] text-black border-[2px] border-black font-bold shadow-[2px_2px_0_0_#000]'
                            : 'hover:underline text-black dark:text-white'
                        }`
                      : `hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                          dashboardTab === 'demos'
                            ? 'border-indigo-600 text-slate-900 dark:text-white font-semibold'
                            : 'border-transparent'
                        }`
                  }
                >
                  Demo Projects
                </button>
              </>
            ) : (
              // Public Landing Navigation
              <>
                <button
                  onClick={() => onNavigateToLevel('landing')}
                  className="hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isSynapse ? 'ANALYSIS' : 'Overview'}
                </button>
                <a
                  href="#engine"
                  onClick={() => onNavigateToLevel('landing')}
                  className="hover:underline transition-colors whitespace-nowrap shrink-0"
                >
                  {isSynapse ? 'THE ENGINE' : 'Capabilities'}
                </a>
                <a
                  href="#benchmarks"
                  onClick={() => onNavigateToLevel('landing')}
                  className="hover:underline transition-colors whitespace-nowrap shrink-0"
                >
                  {isSynapse ? 'BENCHMARKS' : 'Benchmarks'}
                </a>
                <button
                  onClick={openScriptModal}
                  className="hover:underline transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isSynapse ? 'PITCH_SCRIPT' : 'Demo Script'}
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Actions + Theme Selector + Display Mode */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {isAuthenticated && (
              <button
                onClick={() => setDashboardTab('new-analysis')}
                className={
                  isSynapse
                    ? 'h-10 px-4 bg-[#E8FF00] text-black border-[2px] border-black brutal-shadow btn-press heading text-xs tracking-wider font-bold cursor-pointer hidden sm:flex items-center'
                    : 'hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer'
                }
              >
                + New Analysis
              </button>
            )}

            {/* Theme Selector Palette Button */}
            <button
              onClick={onOpenThemeModal}
              title={`Active Theme: ${activeThemeDef.name}`}
              aria-label="Open Theme Customizer"
              className={`p-2 rounded-lg transition-all cursor-pointer relative flex items-center gap-1.5 ${
                isSynapse
                  ? 'bg-white text-black border-[2px] border-black hover:bg-[#E8FF00] shadow-[2px_2px_0_0_#000]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Palette className="w-4 h-4 text-black" />
              <span
                className="w-2.5 h-2.5 rounded-full ring-1 ring-black"
                style={{ backgroundColor: activeThemeDef.primaryHex }}
              />
              <span className="hidden xl:inline text-[11px] font-bold font-mono">
                {isSynapse ? 'WHITE_THEME' : activeThemeDef.name.split(' ')[0]}
              </span>
            </button>

            {/* Display Mode Quick Toggle */}
            <button
              onClick={onToggleMode}
              aria-label="Toggle Display Mode"
              title={`Mode: ${currentMode.toUpperCase()}`}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isSynapse
                  ? 'border-[2px] border-black bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0_0_#000]'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {currentMode === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : currentMode === 'oled' ? (
                <Monitor className="w-4 h-4 text-emerald-500" />
              ) : (
                <Moon className="w-4 h-4 text-black" />
              )}
            </button>

            {/* Auth Profile / Login Button */}
            {isAuthenticated && currentUser ? (
              <div
                className={`flex items-center gap-2 pl-2 border-l ${
                  isSynapse ? 'border-black dark:border-slate-800' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 text-left">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className={`w-7 h-7 rounded-full object-cover ${
                        isSynapse ? 'border-2 border-black' : 'border border-slate-300 dark:border-slate-700'
                      }`}
                    />
                  ) : (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSynapse
                          ? 'bg-[#E8FF00] text-black border-2 border-black'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="hidden lg:block text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white truncate max-w-[110px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                      {currentUser.role}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToLevel('login')}
                  className={
                    isSynapse
                      ? 'hidden sm:block mono font-bold text-xs px-3 py-1.5 underline uppercase cursor-pointer'
                      : 'px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer'
                  }
                >
                  Log In
                </button>

                <button
                  onClick={() => onNavigateToLevel('login')}
                  className={
                    isSynapse
                      ? 'h-10 px-4 bg-[#E8FF00] text-black brutal-border brutal-shadow btn-press heading text-xs tracking-wider cursor-pointer font-bold'
                      : 'px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 rounded-lg shadow-sm transition-colors cursor-pointer'
                  }
                >
                  {isSynapse ? 'DEPLOY ENGINE' : 'Open Workspace'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
