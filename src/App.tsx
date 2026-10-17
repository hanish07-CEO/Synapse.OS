import React, { useState, useEffect } from 'react';
import { Navbar, AppLevel, DashboardTab } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { LoginView } from './components/LoginView';
import { NewAnalysisView } from './components/NewAnalysisView';
import { DashboardView } from './components/DashboardView';
import { DetailedFindingsView } from './components/DetailedFindingsView';
import { QuestionEngineView } from './components/QuestionEngineView';
import { ReportsView } from './components/ReportsView';
import { DemoProjectsView } from './components/DemoProjectsView';
import { ScoreBreakdownModal } from './components/ScoreBreakdownModal';
import { HackathonScriptModal } from './components/HackathonScriptModal';
import { SynapseLandingView } from './components/SynapseLandingView';
import { ThemeModal } from './components/ThemeModal';
import {
  ThemeId,
  DisplayMode,
  getStoredTheme,
  getStoredMode,
  setStoredTheme,
  setStoredMode,
  applyTheme,
} from './services/theme';
import { AnalysisProject, BlindSpotFinding, FindingStatus } from './types/blindspot';
import { UserProfile, DEMO_USERS } from './types/auth';
import { getStoredUser, clearUserSession } from './services/auth';
import {
  getStoredProjects,
  saveProject,
  getActiveProjectId,
  setActiveProjectId,
  updateFindingStatusInProject,
  resetToDemoProjects,
  toggleAdoptSuggestion,
  addSuggestionToFinding,
} from './services/storage';
import { Layers, ShieldCheck, ArrowRight, Lock, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredUser());
  
  // 3-Level Routing State: 'landing' | 'login' | 'dashboard'
  const [currentLevel, setCurrentLevel] = useState<AppLevel>(() => {
    return getStoredUser() ? 'dashboard' : 'landing';
  });

  // Level 3 Workspace Inner Tabs
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('dashboard');

  const [allProjects, setAllProjects] = useState<AnalysisProject[]>(() => getStoredProjects());
  const [activeProjectId, setActiveId] = useState<string>(() => getActiveProjectId());

  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => getStoredTheme());
  const [currentMode, setCurrentMode] = useState<DisplayMode>(() => getStoredMode());
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);

  const [selectedFindingForModal, setSelectedFindingForModal] = useState<BlindSpotFinding | null>(null);
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);

  // Filters forwarded to Findings view
  const [initialFindingsCategory, setInitialFindingsCategory] = useState<string | undefined>();
  const [initialFindingsPriority, setInitialFindingsPriority] = useState<string | undefined>();

  // Synchronize theme and display mode attributes on <html> and persistent storage
  useEffect(() => {
    applyTheme(currentTheme, currentMode);
    setStoredTheme(currentTheme);
    setStoredMode(currentMode);
  }, [currentTheme, currentMode]);

  const handleToggleMode = () => {
    setCurrentMode((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'oled' : 'light'));
  };

  const activeProject =
    allProjects.find((p) => p.id === activeProjectId) || allProjects[0] || null;

  // Level transition handlers
  const handleLoginSuccess = (user: UserProfile, preferredProjectId?: string) => {
    setCurrentUser(user);
    if (preferredProjectId) {
      setActiveId(preferredProjectId);
      setActiveProjectId(preferredProjectId);
    }
    setCurrentLevel('dashboard');
    setDashboardTab('dashboard');
  };

  const handleLogout = () => {
    clearUserSession();
    setCurrentUser(null);
    setCurrentLevel('landing');
  };

  const handleSelectProject = (project: AnalysisProject) => {
    setActiveId(project.id);
    setActiveProjectId(project.id);
    setCurrentLevel('dashboard');
    setDashboardTab('dashboard');
  };

  const handleAnalysisComplete = (newProject: AnalysisProject) => {
    setAllProjects(getStoredProjects());
    setActiveId(newProject.id);
    setActiveProjectId(newProject.id);
    setDashboardTab('dashboard');
  };

  const handleProjectUpdated = (updatedProject: AnalysisProject) => {
    setAllProjects(getStoredProjects());
  };

  const handleUpdateFindingStatus = (findingId: string, status: FindingStatus, notes?: string) => {
    if (!activeProject) return;
    const updated = updateFindingStatusInProject(activeProject.id, findingId, status, notes);
    if (updated) {
      setAllProjects(getStoredProjects());
    }
  };

  const handleResetDemos = () => {
    const demos = resetToDemoProjects();
    setAllProjects(demos);
    setActiveId(demos[0].id);
    setDashboardTab('dashboard');
  };

  const handleNavigateFindings = (categoryFilter?: string, priorityFilter?: string) => {
    setInitialFindingsCategory(categoryFilter);
    setInitialFindingsPriority(priorityFilter);
    setDashboardTab('findings');
  };

  const handleToggleAdoptSuggestion = (findingId: string, suggestionId: string) => {
    if (!activeProject) return;
    const updated = toggleAdoptSuggestion(activeProject.id, findingId, suggestionId);
    if (updated) {
      setAllProjects(getStoredProjects());
    }
  };

  const handleAddSuggestion = (findingId: string, suggestionData: any) => {
    if (!activeProject) return;
    const updated = addSuggestionToFinding(activeProject.id, findingId, suggestionData);
    if (updated) {
      setAllProjects(getStoredProjects());
    }
  };

  const handleAddGeneratedSuggestions = (findingId: string, suggestions: any[]) => {
    if (!activeProject) return;
    suggestions.forEach((s) => {
      addSuggestionToFinding(activeProject.id, findingId, {
        ...s,
        suggestedBy: 'AI Engine',
      });
    });
    setAllProjects(getStoredProjects());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Level Quick Switcher Bar (Useful for judges and seamless multi-level navigation) */}
      <div className="no-print bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold text-slate-400 hidden sm:inline">Active Level:</span>
            <div className="inline-flex rounded-md p-0.5 bg-slate-800">
              <button
                onClick={() => setCurrentLevel('landing')}
                className={`px-2.5 py-0.5 text-[11px] rounded transition-colors ${
                  currentLevel === 'landing'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Landing
              </button>
              <button
                onClick={() => setCurrentLevel('login')}
                className={`px-2.5 py-0.5 text-[11px] rounded transition-colors ${
                  currentLevel === 'login'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Login
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    // Default to demo persona if accessing workspace directly
                    setCurrentUser(DEMO_USERS[0]);
                  }
                  setCurrentLevel('dashboard');
                }}
                className={`px-2.5 py-0.5 text-[11px] rounded transition-colors ${
                  currentLevel === 'dashboard'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Dashboard Workspace
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            {currentUser ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="truncate max-w-[150px]">{currentUser.name} ({currentUser.role})</span>
              </span>
            ) : (
              <span>Public Guest Session</span>
            )}
          </div>
        </div>
      </div>

      <Navbar
        currentLevel={currentLevel}
        dashboardTab={dashboardTab}
        setDashboardTab={setDashboardTab}
        onNavigateToLevel={setCurrentLevel}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentTheme={currentTheme}
        currentMode={currentMode}
        onOpenThemeModal={() => setShowThemeModal(true)}
        onToggleMode={handleToggleMode}
        openScriptModal={() => setShowScriptModal(true)}
      />

      <main className="flex-1">
        {/* ================= LEVEL 1: LANDING ================= */}
        {currentLevel === 'landing' && (
          currentTheme === 'synapse' ? (
            <SynapseLandingView
              onGoToLogin={() => setCurrentLevel('login')}
              onQuickDemoLogin={(user, projectId) => handleLoginSuccess(user, projectId)}
              onExplorePublicDemo={handleSelectProject}
            />
          ) : (
            <LandingView
              onGoToLogin={() => setCurrentLevel('login')}
              onQuickDemoLogin={(user, projectId) => handleLoginSuccess(user, projectId)}
              onExplorePublicDemo={handleSelectProject}
            />
          )
        )}

        {/* ================= LEVEL 2: LOGIN ================= */}
        {currentLevel === 'login' && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onBackToLanding={() => setCurrentLevel('landing')}
          />
        )}

        {/* ================= LEVEL 3: DASHBOARD WORKSPACE ================= */}
        {currentLevel === 'dashboard' && (
          <div>
            {dashboardTab === 'dashboard' && activeProject && (
              <DashboardView
                project={activeProject}
                allProjects={allProjects}
                onSelectProject={handleSelectProject}
                onNavigateFindings={handleNavigateFindings}
                onNavigateQuestions={() => setDashboardTab('questions')}
                onNavigateReports={() => setDashboardTab('reports')}
                onOpenNewAnalysis={() => setDashboardTab('new-analysis')}
                onUpdateFindingStatus={handleUpdateFindingStatus}
                onOpenScoreModal={(finding) => setSelectedFindingForModal(finding)}
                onToggleAdoptSuggestion={handleToggleAdoptSuggestion}
                onAddSuggestion={handleAddSuggestion}
                onAddGeneratedSuggestions={handleAddGeneratedSuggestions}
              />
            )}

            {dashboardTab === 'new-analysis' && (
              <NewAnalysisView
                onAnalysisComplete={handleAnalysisComplete}
                onCancel={() => setDashboardTab('dashboard')}
              />
            )}

            {dashboardTab === 'findings' && activeProject && (
              <DetailedFindingsView
                project={activeProject}
                initialCategory={initialFindingsCategory}
                initialPriority={initialFindingsPriority}
                onUpdateFindingStatus={handleUpdateFindingStatus}
                onOpenScoreModal={(finding) => setSelectedFindingForModal(finding)}
              />
            )}

            {dashboardTab === 'questions' && activeProject && (
              <QuestionEngineView
                project={activeProject}
                onProjectUpdated={handleProjectUpdated}
                onNavigateFindings={() => setDashboardTab('findings')}
              />
            )}

            {dashboardTab === 'reports' && activeProject && (
              <ReportsView project={activeProject} />
            )}

            {dashboardTab === 'demos' && (
              <DemoProjectsView
                onSelectProject={handleSelectProject}
                onResetDemos={handleResetDemos}
                activeProjectId={activeProject?.id}
              />
            )}
          </div>
        )}
      </main>

      {/* Prioritization Formula Modal */}
      <ScoreBreakdownModal
        finding={selectedFindingForModal}
        onClose={() => setSelectedFindingForModal(null)}
      />

      {/* 60-Second Hackathon Script & Roadmap Modal */}
      <HackathonScriptModal
        isOpen={showScriptModal}
        onClose={() => setShowScriptModal(false)}
      />

      {/* Theme & Appearance Customizer Modal */}
      <ThemeModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        currentTheme={currentTheme}
        currentMode={currentMode}
        onSelectTheme={setCurrentTheme}
        onSelectMode={setCurrentMode}
      />

      {/* Clean Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">BlindSpot AI</span>
            <span aria-hidden="true">·</span>
            <span>Three-Level Pre-Mortem Intelligence System (Landing · Login · Dashboard)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentLevel('landing')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Landing
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentLevel('login')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Login
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                if (!currentUser) setCurrentUser(DEMO_USERS[0]);
                setCurrentLevel('dashboard');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowScriptModal(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pitch Script
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
