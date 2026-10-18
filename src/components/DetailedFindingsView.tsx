import React, { useState } from 'react';
import { AnalysisProject, BlindSpotFinding, FindingStatus } from '../types/blindspot';
import {
  ShieldAlert,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Sliders,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface DetailedFindingsViewProps {
  project: AnalysisProject;
  initialCategory?: string;
  initialPriority?: string;
  onUpdateFindingStatus: (findingId: string, status: FindingStatus, notes?: string) => void;
  onOpenScoreModal: (finding: BlindSpotFinding) => void;
}

export const DetailedFindingsView: React.FC<DetailedFindingsViewProps> = ({
  project,
  initialCategory,
  initialPriority,
  onUpdateFindingStatus,
  onOpenScoreModal,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<string>(initialPriority || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [expandedFindingId, setExpandedFindingId] = useState<string | null>(null);

  const categories = Array.from(new Set(project.findings.map((f) => f.category)));

  const filtered = project.findings.filter((f) => {
    if (selectedPriority !== 'all' && f.priority !== selectedPriority) return false;
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans text-black">
      {/* Header */}
      <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block bg-[#E8FF00] border-2 border-black px-3 py-0.5 mono text-xs font-bold mb-2 shadow-[2px_2px_0_0_#000]">
            GROUNDED EVIDENCE LOG
          </div>
          <h1 className="heading text-3xl sm:text-4xl text-black">
            DETAILED FINDINGS TRIAGE
          </h1>
          <p className="text-sm text-slate-700 mt-1">
            Interrogate evidence citations, impact metrics, and assign ownership.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="p-2 border-2 border-black mono text-xs font-bold bg-white shadow-[2px_2px_0_0_#000]"
          >
            <option value="all">ALL PRIORITIES</option>
            <option value="Critical">CRITICAL ONLY</option>
            <option value="High">HIGH ONLY</option>
            <option value="Medium">MEDIUM ONLY</option>
            <option value="Low">LOW ONLY</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border-2 border-black mono text-xs font-bold bg-white shadow-[2px_2px_0_0_#000] max-w-[180px] truncate"
          >
            <option value="all">ALL CATEGORIES</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-4">
        {filtered.map((finding) => {
          const isExpanded = expandedFindingId === finding.id;

          return (
            <div
              key={finding.id}
              className="brutal-border bg-white brutal-shadow p-6 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold mono border border-black ${
                        finding.priority === 'Critical'
                          ? 'bg-rose-500 text-white'
                          : finding.priority === 'High'
                          ? 'bg-amber-400 text-black'
                          : 'bg-slate-200 text-black'
                      }`}
                    >
                      {finding.priority.toUpperCase()} [{finding.scores.compositeScore}/100]
                    </span>
                    <span className="mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 border border-black">
                      {finding.category}
                    </span>
                    <span className="mono text-xs text-slate-500">
                      Ref: {finding.locationRef}
                    </span>
                  </div>

                  <h3 className="heading text-xl text-black">{finding.title}</h3>

                  <div className="p-3 border-2 border-black bg-slate-50 text-xs text-slate-800 space-y-1">
                    <p className="font-bold text-[10px] uppercase text-black mono">
                      Evidence [{finding.evidenceType}]:
                    </p>
                    <p className="italic">"{finding.evidence}"</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div>
                      <p className="font-bold uppercase text-[10px] mono text-black">Why It Matters:</p>
                      <p className="text-slate-700">{finding.whyItMatters}</p>
                    </div>
                    <div>
                      <p className="font-bold uppercase text-[10px] mono text-black">Potential Impact:</p>
                      <p className="text-slate-700">{finding.potentialImpact}</p>
                    </div>
                  </div>

                  <div className="p-3 border-2 border-black bg-[#E8FF00]/15 text-xs">
                    <p className="font-bold uppercase text-[10px] mono text-black">Recommended Action:</p>
                    <p className="text-slate-900 font-medium">{finding.recommendedAction}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => onOpenScoreModal(finding)}
                    className="px-3.5 py-2 border-2 border-black bg-white hover:bg-[#E8FF00] font-bold mono text-xs shadow-[2px_2px_0_0_#000] btn-press cursor-pointer"
                  >
                    CALCULATE SCORE
                  </button>

                  <select
                    value={finding.status}
                    onChange={(e) =>
                      onUpdateFindingStatus(finding.id, e.target.value as FindingStatus)
                    }
                    className="p-2 border-2 border-black mono text-xs font-bold bg-white shadow-[2px_2px_0_0_#000] cursor-pointer"
                  >
                    <option value="Needs Review">Needs Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Mitigated">Mitigated</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Dismissed">Dismissed</option>
                  </select>

                  <div className="mono text-[10px] text-slate-600 font-bold p-1 border border-black bg-slate-50 text-center">
                    Owner: {finding.suggestedOwner}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
