import React, { useState } from 'react';
import { AnalysisProject } from '../types/blindspot';
import { analyzeProjectDocument } from '../services/api';
import { saveProject } from '../services/storage';
import { ArrowLeft, Upload, FileText, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface NewAnalysisViewProps {
  onAnalysisComplete: (project: AnalysisProject) => void;
  onCancel: () => void;
}

export const NewAnalysisView: React.FC<NewAnalysisViewProps> = ({
  onAnalysisComplete,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [analysisType, setAnalysisType] = useState('Product Requirements (PRD)');
  const [content, setContent] = useState('');
  const [timeline, setTimeline] = useState('12');
  const [teamSize, setTeamSize] = useState('8');
  const [budget, setBudget] = useState('250000');
  const [industry, setIndustry] = useState('Enterprise Software / SaaS');
  const [knownConstraints, setKnownConstraints] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please provide document content or paste a requirements brief.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const project = await analyzeProjectDocument({
        content,
        analysisType,
        title: title || `${analysisType} Review`,
        context: {
          timelineWeeks: Number(timeline) || 12,
          teamSize: Number(teamSize) || 8,
          budgetUsd: Number(budget) || 250000,
          industry,
          knownConstraints,
        },
      });

      saveProject(project);
      onAnalysisComplete(project);
    } catch (err: any) {
      setError(err.message || 'Failed to complete pre-mortem analysis.');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleBrief = () => {
    setTitle('MediStream Telehealth Patient Monitoring Pipeline');
    setAnalysisType('Technical Architecture');
    setContent(
      `Project Brief: MediStream Real-time Patient Vital Sign Telemetry
Architecture Overview:
- The system continuously captures ECG, oxygen saturation, and blood pressure from hospital wearable patches.
- Ingestion occurs via MQTT gateway; data points are pushed to AWS Kinesis and written directly to DynamoDB.
- Assumes real-time streaming latency under 200ms without buffering queues.
- An alert model triggers SMS alerts to attending physicians whenever heart rate exceeds 130 bpm for 30 consecutive seconds.
- Compliance: Assumes standard BAA with cloud provider covers cross-region failover and EU patient telemetry transfers.
- Dependencies: Relies on Twilio API for immediate emergency doctor paging with no secondary backup carrier.`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-sans text-black">
      <div className="brutal-border bg-white brutal-shadow-lg p-6 sm:p-10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 mono text-xs font-bold mb-6 hover:underline uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-black">
          <div>
            <div className="inline-block bg-[#E8FF00] border-2 border-black px-3 py-0.5 mono text-xs font-bold mb-2 shadow-[2px_2px_0_0_#000]">
              DEEP ANALYSIS INGESTION
            </div>
            <h1 className="heading text-3xl sm:text-4xl text-black">
              INITIATE PRE-MORTEM STRESS TEST
            </h1>
            <p className="text-sm text-slate-700 mt-1">
              Paste project requirements, architecture specs, or PRD briefs to detect blind spots.
            </p>
          </div>

          <button
            type="button"
            onClick={loadSampleBrief}
            className="px-3 py-1.5 border-2 border-black bg-white hover:bg-[#E8FF00] mono text-xs font-bold brutal-shadow btn-press shrink-0 cursor-pointer"
          >
            LOAD SAMPLE BRIEF
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 border-2 border-black bg-rose-100 text-black mono text-xs flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mono mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Next-Gen Checkout Service"
                className="w-full p-3 border-2 border-black mono text-xs focus:outline-none focus:bg-[#E8FF00]/10"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mono mb-1">
                Analysis Scope
              </label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="w-full p-3 border-2 border-black mono text-xs font-bold bg-white focus:outline-none"
              >
                <option value="Product Requirements (PRD)">Product Requirements (PRD)</option>
                <option value="Technical Architecture">Technical Architecture</option>
                <option value="Business Workflow">Business Workflow</option>
                <option value="Dataset & Schema">Dataset & Schema</option>
                <option value="Project Plan">Project Plan</option>
                <option value="General Review">General Review</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mono mb-1">
              Document Text / Requirements Brief *
            </label>
            <textarea
              required
              rows={9}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste raw requirements, specs, workflows, or architectural designs here..."
              className="w-full p-4 border-2 border-black mono text-xs focus:outline-none focus:bg-[#E8FF00]/10 font-mono leading-relaxed"
            />
          </div>

          {/* Context Parameters */}
          <div className="p-4 border-2 border-black bg-slate-50 space-y-4">
            <h4 className="mono text-xs font-bold uppercase text-black">
              Execution Context Parameters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase mono mb-1">
                  Timeline (Weeks)
                </label>
                <input
                  type="number"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mono mb-1">
                  Team Size
                </label>
                <input
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mono mb-1">
                  Budget (USD)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase mono mb-1">
                  Domain / Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#E8FF00] text-black border-[3px] border-black brutal-shadow btn-press heading text-lg font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>INTERROGATING ASSUMPTIONS & REGULATIONS...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>RUN PRE-MORTEM ANALYSIS</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
