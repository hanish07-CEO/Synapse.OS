import React from 'react';
import { AnalysisProject } from '../types/blindspot';
import { DEMO_PROJECTS } from '../data/demoProjects';
import {
  FolderOpen,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
  FileText,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface DemoProjectsViewProps {
  onSelectProject: (project: AnalysisProject) => void;
  onResetDemos: () => void;
  activeProjectId?: string;
}

export const DemoProjectsView: React.FC<DemoProjectsViewProps> = ({
  onSelectProject,
  onResetDemos,
  activeProjectId,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-black">
      {/* Header Banner */}
      <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#E8FF00] border-2 border-black px-2 py-0.5 mono text-xs font-bold shadow-[2px_2px_0_0_#000]">
              PRE-MORTEM BENCHMARK SUITE
            </span>
            <span className="mono text-xs text-slate-600 font-bold">
              {DEMO_PROJECTS.length} HIGH-STAKES SCENARIOS
            </span>
          </div>
          <h1 className="heading text-3xl sm:text-4xl text-black">
            BENCHMARK DEMONSTRATION PROJECTS
          </h1>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl font-medium">
            Explore battle-tested pre-mortem audits across enterprise AI, clinical workflows, and mission-critical cloud migrations with grounded evidence citations.
          </p>
        </div>

        <button
          onClick={onResetDemos}
          className="px-4 py-2.5 bg-white text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET BENCHMARKS</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DEMO_PROJECTS.map((demo) => {
          const isActive = demo.id === activeProjectId;
          const criticalCount = demo.findings.filter((f) => f.priority === 'Critical').length;
          const highCount = demo.findings.filter((f) => f.priority === 'High').length;

          return (
            <div
              key={demo.id}
              className={`brutal-border bg-white brutal-shadow p-6 flex flex-col justify-between transition-all ${
                isActive ? 'ring-4 ring-[#E8FF00]' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-black text-[#E8FF00] px-2.5 py-0.5 mono text-[11px] font-bold border border-black shadow-[2px_2px_0_0_#000]">
                    {demo.analysisType}
                  </span>
                  <span
                    className={`mono text-[11px] font-bold px-2 py-0.5 border border-black ${
                      demo.overallRiskScore >= 75
                        ? 'bg-rose-200 text-rose-950'
                        : demo.overallRiskScore >= 50
                        ? 'bg-amber-200 text-amber-950'
                        : 'bg-emerald-200 text-emerald-950'
                    }`}
                  >
                    INDEX: {demo.overallRiskScore}/100
                  </span>
                </div>

                <h3 className="heading text-2xl text-black leading-tight">
                  {demo.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 border-l-4 border-black">
                  {demo.summary}
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y-2 border-black mono text-center">
                  <div className="p-1.5">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">VECTORS</span>
                    <span className="heading text-xl text-black">{demo.findings.length}</span>
                  </div>
                  <div className="p-1.5 border-x-2 border-black bg-rose-50/50">
                    <span className="text-[10px] text-rose-900 uppercase block font-bold">CRITICAL</span>
                    <span className="heading text-xl text-rose-600">{criticalCount}</span>
                  </div>
                  <div className="p-1.5">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">QUESTIONS</span>
                    <span className="heading text-xl text-black">{demo.questions.length}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSelectProject(demo)}
                  className={`w-full py-3 px-4 border-2 border-black mono text-xs font-bold brutal-shadow btn-press cursor-pointer flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-[#E8FF00] text-black shadow-[4px_4px_0_0_#000]'
                      : 'bg-white text-black hover:bg-slate-100'
                  }`}
                >
                  <span>{isActive ? 'ACTIVE IN WORKSPACE' : 'LOAD SCENARIO'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
