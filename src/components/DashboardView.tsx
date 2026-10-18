import React from 'react';
import { AnalysisProject, BlindSpotFinding, FindingStatus } from '../types/blindspot';
import {
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
  FileText,
  CheckCircle2,
  Sliders,
  ArrowRight,
  TrendingUp,
  Clock,
  Plus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  project: AnalysisProject;
  allProjects: AnalysisProject[];
  onSelectProject: (project: AnalysisProject) => void;
  onNavigateFindings: (categoryFilter?: string, priorityFilter?: string) => void;
  onNavigateQuestions: () => void;
  onNavigateReports: () => void;
  onOpenNewAnalysis: () => void;
  onUpdateFindingStatus: (findingId: string, status: FindingStatus, notes?: string) => void;
  onOpenScoreModal: (finding: BlindSpotFinding) => void;
  onToggleAdoptSuggestion: (findingId: string, suggestionId: string) => void;
  onAddSuggestion: (findingId: string, suggestionData: any) => void;
  onAddGeneratedSuggestions: (findingId: string, suggestions: any[]) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  project,
  allProjects,
  onSelectProject,
  onNavigateFindings,
  onNavigateQuestions,
  onNavigateReports,
  onOpenNewAnalysis,
  onOpenScoreModal,
}) => {
  const criticalFindings = project.findings.filter((f) => f.priority === 'Critical');
  const highFindings = project.findings.filter((f) => f.priority === 'High');
  const unansweredQuestions = project.questions.filter((q) => !q.answered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-black">
      {/* Top Banner / Project Selector Bar */}
      <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#E8FF00] border-2 border-black px-2 py-0.5 mono text-xs font-bold shadow-[2px_2px_0_0_#000]">
              {project.analysisType}
            </span>
            <span className="mono text-xs text-slate-600 font-bold">
              ID: {project.id}
            </span>
          </div>
          <h1 className="heading text-2xl sm:text-3xl text-black">
            {project.title}
          </h1>
          <p className="text-sm text-slate-700 mt-1 max-w-3xl">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <select
            value={project.id}
            onChange={(e) => {
              const selected = allProjects.find((p) => p.id === e.target.value);
              if (selected) onSelectProject(selected);
            }}
            className="p-2 border-2 border-black mono text-xs font-bold bg-white focus:outline-none shadow-[2px_2px_0_0_#000]"
          >
            {allProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title.slice(0, 36)}...
              </option>
            ))}
          </select>

          <button
            onClick={onOpenNewAnalysis}
            className="px-4 py-2 bg-[#E8FF00] text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>NEW SCAN</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Risk Score */}
        <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="mono text-xs font-bold uppercase text-slate-700">COMPOSITE RISK</span>
            <span className="w-3 h-3 bg-rose-600 rounded-full animate-ping" />
          </div>
          <div className="my-4">
            <div className="heading text-5xl font-black text-black">
              {project.overallRiskScore}
              <span className="text-2xl text-slate-400 font-normal">/100</span>
            </div>
            <p className="mono text-xs font-bold text-rose-600 uppercase mt-1">
              STATUS: {project.riskLevel}
            </p>
          </div>
          <button
            onClick={() => onNavigateFindings()}
            className="mono text-xs font-bold hover:underline flex items-center gap-1 uppercase"
          >
            <span>Inspect All Findings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Critical Exposures */}
        <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col justify-between">
          <span className="mono text-xs font-bold uppercase text-slate-700">CRITICAL VULNERABILITIES</span>
          <div className="my-4">
            <div className="heading text-5xl font-black text-rose-600">
              {criticalFindings.length}
            </div>
            <p className="mono text-xs font-bold text-slate-600 mt-1">
              {highFindings.length} HIGH PRIORITY
            </p>
          </div>
          <button
            onClick={() => onNavigateFindings(undefined, 'Critical')}
            className="mono text-xs font-bold hover:underline flex items-center gap-1 uppercase"
          >
            <span>View Critical Triage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Question Engine */}
        <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col justify-between">
          <span className="mono text-xs font-bold uppercase text-slate-700">QUESTION ENGINE</span>
          <div className="my-4">
            <div className="heading text-5xl font-black text-blue-600">
              {unansweredQuestions.length}
            </div>
            <p className="mono text-xs font-bold text-slate-600 mt-1">
              UNRESOLVED PROBES
            </p>
          </div>
          <button
            onClick={onNavigateQuestions}
            className="mono text-xs font-bold hover:underline flex items-center gap-1 uppercase"
          >
            <span>Resolve Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Executive Report */}
        <div className="brutal-border bg-[#E8FF00] brutal-shadow p-6 flex flex-col justify-between text-black">
          <span className="mono text-xs font-bold uppercase">EXECUTIVE AUDIT</span>
          <div className="my-4">
            <p className="heading text-2xl font-bold">READY TO EXPORT</p>
            <p className="mono text-xs mt-1">
              Download board-ready pre-mortem PDF summary.
            </p>
          </div>
          <button
            onClick={onNavigateReports}
            className="mono text-xs font-bold hover:underline flex items-center gap-1 uppercase"
          >
            <span>Generate Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Critical Findings Feed */}
      <div className="brutal-border bg-white brutal-shadow p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <h2 className="heading text-2xl text-black">
              PRIORITY RISK DISCOVERIES
            </h2>
            <p className="text-xs text-slate-600 mono">
              Grounded evidence extractions ranked by 5-factor impact formula
            </p>
          </div>
          <button
            onClick={() => onNavigateFindings()}
            className="px-3.5 py-1.5 bg-black text-[#E8FF00] border-2 border-black font-bold text-xs mono brutal-shadow btn-press cursor-pointer"
          >
            VIEW ALL ({project.findings.length})
          </button>
        </div>

        <div className="space-y-4">
          {project.findings.slice(0, 4).map((finding) => (
            <div
              key={finding.id}
              className="p-5 border-2 border-black bg-white hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0_0_#000]"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold mono border border-black ${
                      finding.priority === 'Critical'
                        ? 'bg-rose-500 text-white'
                        : finding.priority === 'High'
                        ? 'bg-amber-400 text-black'
                        : 'bg-slate-200 text-black'
                    }`}
                  >
                    {finding.priority.toUpperCase()} [{finding.scores.compositeScore}/100]
                  </span>
                  <span className="mono text-[11px] font-bold text-slate-700">
                    {finding.category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="mono text-[10px] text-slate-500">
                    Owner: {finding.suggestedOwner}
                  </span>
                </div>

                <h3 className="font-bold text-base text-black">{finding.title}</h3>

                <p className="text-xs text-slate-700 italic border-l-2 border-black pl-3 py-0.5 bg-slate-50">
                  "{finding.evidence}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenScoreModal(finding)}
                  className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#E8FF00] font-bold mono text-xs transition-colors cursor-pointer"
                >
                  SCORE BREAKDOWN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
