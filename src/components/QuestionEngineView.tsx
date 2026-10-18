import React, { useState } from 'react';
import { AnalysisProject, ProjectQuestion } from '../types/blindspot';
import { saveProject, recalculateProjectRisk } from '../services/storage';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Send,
  Plus,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  RotateCcw,
} from 'lucide-react';

interface QuestionEngineViewProps {
  project: AnalysisProject;
  onProjectUpdated: (updatedProject: AnalysisProject) => void;
  onNavigateFindings: () => void;
}

export const QuestionEngineView: React.FC<QuestionEngineViewProps> = ({
  project,
  onProjectUpdated,
  onNavigateFindings,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'unanswered' | 'answered'>('all');
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>('all');
  const [editingAnswers, setEditingAnswers] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newStakeholder, setNewStakeholder] = useState('Tech Lead');
  const [newContext, setNewContext] = useState('');
  const [isSimulatingAI, setIsSimulatingAI] = useState(false);

  const stakeholders = Array.from(
    new Set(project.questions.map((q) => q.targetStakeholder).filter(Boolean))
  );

  const filteredQuestions = project.questions.filter((q) => {
    if (filterStatus === 'unanswered' && q.answered) return false;
    if (filterStatus === 'answered' && !q.answered) return false;
    if (selectedStakeholder !== 'all' && q.targetStakeholder !== selectedStakeholder) return false;
    return true;
  });

  const answeredCount = project.questions.filter((q) => q.answered).length;
  const totalCount = project.questions.length;
  const progressPercent = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;

  const handleSelectOption = (questionId: string, option: string) => {
    const updatedQuestions = project.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          selectedAnswer: option,
          answered: true,
        };
      }
      return q;
    });

    const updatedProject: AnalysisProject = {
      ...project,
      questions: updatedQuestions,
    };
    recalculateProjectRisk(updatedProject);
    saveProject(updatedProject);
    onProjectUpdated(updatedProject);
  };

  const handleSaveCustomAnswer = (questionId: string) => {
    const text = editingAnswers[questionId];
    if (text === undefined) return;

    const updatedQuestions = project.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          userCustomAnswer: text,
          answered: Boolean(text.trim() || q.selectedAnswer),
        };
      }
      return q;
    });

    const updatedProject: AnalysisProject = {
      ...project,
      questions: updatedQuestions,
    };
    recalculateProjectRisk(updatedProject);
    saveProject(updatedProject);
    onProjectUpdated(updatedProject);
  };

  const handleToggleAnswered = (questionId: string) => {
    const updatedQuestions = project.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          answered: !q.answered,
        };
      }
      return q;
    });

    const updatedProject: AnalysisProject = {
      ...project,
      questions: updatedQuestions,
    };
    recalculateProjectRisk(updatedProject);
    saveProject(updatedProject);
    onProjectUpdated(updatedProject);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: ProjectQuestion = {
      id: `q-${Date.now()}`,
      question: newQuestionText.trim(),
      targetStakeholder: newStakeholder,
      context: newContext.trim() || 'Custom validation question added by project team.',
      addressedFindingIds: [],
      suggestedOptions: ['Fully Confirmed & Verified', 'Pending Legal / Tech Review', 'Identified Blockers'],
      answered: false,
    };

    const updatedProject: AnalysisProject = {
      ...project,
      questions: [newQ, ...project.questions],
    };
    saveProject(updatedProject);
    onProjectUpdated(updatedProject);
    setNewQuestionText('');
    setNewContext('');
    setShowAddModal(false);
  };

  const handleReanalyzeImpact = () => {
    setIsSimulatingAI(true);
    setTimeout(() => {
      const updatedProject: AnalysisProject = {
        ...project,
        overallRiskScore: Math.max(18, project.overallRiskScore - (answeredCount > 0 ? 8 : 2)),
      };
      if (updatedProject.overallRiskScore < 45) {
        updatedProject.riskLevel = 'Low Risk';
      } else if (updatedProject.overallRiskScore < 65) {
        updatedProject.riskLevel = 'Moderate Risk';
      }
      saveProject(updatedProject);
      onProjectUpdated(updatedProject);
      setIsSimulatingAI(false);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-black">
      {/* Top Banner */}
      <div className="brutal-border bg-white brutal-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#E8FF00] border-2 border-black px-2 py-0.5 mono text-xs font-bold shadow-[2px_2px_0_0_#000]">
              ASSUMPTION VERIFICATION ENGINE
            </span>
            <span className="mono text-xs text-slate-600 font-bold">
              {answeredCount}/{totalCount} RESOLVED
            </span>
          </div>
          <h1 className="heading text-3xl sm:text-4xl text-black">
            STAKEHOLDER INQUIRY ENGINE
          </h1>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl font-medium">
            Pre-mortem risk is highest where unvalidated assumptions hide. Resolve stakeholder questions to systematically reduce blind spot exposure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-white text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD QUESTION</span>
          </button>
          <button
            onClick={handleReanalyzeImpact}
            disabled={isSimulatingAI}
            className="px-5 py-2.5 bg-[#E8FF00] text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSimulatingAI ? 'RE-EVALUATING...' : 'RE-ANALYZE IMPACT'}</span>
          </button>
        </div>
      </div>

      {/* Verification Progress Bar */}
      <div className="brutal-border bg-white brutal-shadow p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="mono text-xs font-bold uppercase text-slate-800">
            Assumptions Resolved ({progressPercent}%)
          </span>
          <span className="mono text-xs font-bold text-black">
            {answeredCount} of {totalCount} Validated
          </span>
        </div>
        <div className="w-full h-5 bg-slate-100 border-2 border-black overflow-hidden relative">
          <div
            className="h-full bg-[#E8FF00] border-r-2 border-black transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <span className="mono text-xs font-bold text-slate-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> STATUS:
          </span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 border-2 border-black mono text-xs font-bold cursor-pointer transition-all ${
              filterStatus === 'all'
                ? 'bg-black text-[#E8FF00] shadow-[2px_2px_0_0_#000]'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            ALL ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus('unanswered')}
            className={`px-3 py-1 border-2 border-black mono text-xs font-bold cursor-pointer transition-all ${
              filterStatus === 'unanswered'
                ? 'bg-black text-[#E8FF00] shadow-[2px_2px_0_0_#000]'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            UNANSWERED ({totalCount - answeredCount})
          </button>
          <button
            onClick={() => setFilterStatus('answered')}
            className={`px-3 py-1 border-2 border-black mono text-xs font-bold cursor-pointer transition-all ${
              filterStatus === 'answered'
                ? 'bg-black text-[#E8FF00] shadow-[2px_2px_0_0_#000]'
                : 'bg-white text-black hover:bg-slate-100'
            }`}
          >
            RESOLVED ({answeredCount})
          </button>
        </div>

        {stakeholders.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="mono text-xs font-bold text-slate-600">STAKEHOLDER:</span>
            <select
              value={selectedStakeholder}
              onChange={(e) => setSelectedStakeholder(e.target.value)}
              className="border-2 border-black bg-white px-3 py-1 mono text-xs font-bold focus:outline-none shadow-[2px_2px_0_0_#000]"
            >
              <option value="all">ALL STAKEHOLDERS</option>
              {stakeholders.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="brutal-border bg-white brutal-shadow p-12 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-slate-400 stroke-1" />
            <h3 className="heading text-xl text-black">NO QUESTIONS FOUND</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              No inquiries match your current status or stakeholder filters.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isEditing = editingAnswers[q.id] !== undefined;
            const currentAnswer = isEditing ? editingAnswers[q.id] : q.userCustomAnswer || '';

            return (
              <div
                key={q.id}
                className={`brutal-border bg-white brutal-shadow p-6 transition-all ${
                  q.answered ? 'border-l-8 border-l-[#E8FF00]' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-black text-[#E8FF00] px-2.5 py-1 mono text-xs font-bold border border-black shadow-[2px_2px_0_0_#000]">
                      #{idx + 1} · {q.targetStakeholder}
                    </span>
                    {q.answered ? (
                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-900 px-2.5 py-0.5 mono text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        VALIDATED
                      </span>
                    ) : (
                      <span className="bg-rose-100 text-rose-900 border border-rose-900 px-2.5 py-0.5 mono text-xs font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                        UNVALIDATED
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleAnswered(q.id)}
                    className="self-start sm:self-auto px-3 py-1 border-2 border-black mono text-xs font-bold bg-white hover:bg-slate-100 brutal-shadow btn-press cursor-pointer flex items-center gap-1.5"
                  >
                    {q.answered ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>MARK UNANSWERED</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>MARK RESOLVED</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="heading text-xl sm:text-2xl text-black mb-3 leading-snug">
                  {q.question}
                </h3>

                <p className="text-sm text-slate-700 bg-slate-50 border-l-4 border-black p-3 mb-4 font-medium">
                  <strong className="mono text-xs uppercase text-black block mb-0.5">CONTEXT:</strong>
                  {q.context}
                </p>

                {/* Suggested Fast-Select Options */}
                {q.suggestedOptions && q.suggestedOptions.length > 0 && (
                  <div className="mb-4">
                    <span className="mono text-xs font-bold text-slate-600 uppercase block mb-2">
                      FAST VALIDATION CHOICES:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {q.suggestedOptions.map((opt) => {
                        const isSelected = q.selectedAnswer === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleSelectOption(q.id, opt)}
                            className={`px-3 py-1.5 border-2 border-black mono text-xs font-bold cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#E8FF00] text-black shadow-[3px_3px_0_0_#000]'
                                : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0_0_#000]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 inline mr-1" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Custom Note / Clarification Input */}
                <div className="mt-4 pt-4 border-t-2 border-slate-200">
                  <span className="mono text-xs font-bold text-slate-700 uppercase block mb-2">
                    STAKEHOLDER NOTES & EVIDENCE:
                  </span>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <textarea
                      rows={2}
                      value={currentAnswer}
                      onChange={(e) =>
                        setEditingAnswers({ ...editingAnswers, [q.id]: e.target.value })
                      }
                      placeholder="Type stakeholder feedback, document link, or verification details..."
                      className="flex-1 p-2.5 border-2 border-black mono text-xs bg-white focus:outline-none focus:bg-amber-50/20"
                    />
                    <button
                      onClick={() => handleSaveCustomAnswer(q.id)}
                      className="px-4 py-2 bg-black text-[#E8FF00] border-2 border-black mono text-xs font-bold shrink-0 self-start sm:self-auto brutal-shadow btn-press cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SAVE NOTE</span>
                    </button>
                  </div>
                </div>

                {/* Linked Finding References */}
                {q.addressedFindingIds && q.addressedFindingIds.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-200 text-xs">
                    <span className="mono font-bold text-slate-500">LINKED FINDINGS:</span>
                    <button
                      onClick={onNavigateFindings}
                      className="font-bold text-black underline hover:text-indigo-600 mono flex items-center gap-1"
                    >
                      View {q.addressedFindingIds.length} Linked Risk Vector(s)
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white brutal-border brutal-shadow-lg max-w-lg w-full p-6 text-black">
            <h2 className="heading text-2xl mb-4">ADD STAKEHOLDER QUESTION</h2>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="mono text-xs font-bold block mb-1">TARGET STAKEHOLDER</label>
                <input
                  type="text"
                  value={newStakeholder}
                  onChange={(e) => setNewStakeholder(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                  placeholder="e.g. Lead Architect, Compliance Officer, CISO"
                  required
                />
              </div>

              <div>
                <label className="mono text-xs font-bold block mb-1">QUESTION</label>
                <textarea
                  rows={3}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                  placeholder="What assumption needs validation before starting?"
                  required
                />
              </div>

              <div>
                <label className="mono text-xs font-bold block mb-1">CONTEXT & IMPACT</label>
                <textarea
                  rows={2}
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full p-2 border-2 border-black mono text-xs bg-white"
                  placeholder="Why does this matter if unanswered?"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border-2 border-black mono text-xs font-bold bg-white hover:bg-slate-100"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E8FF00] text-black border-2 border-black mono text-xs font-bold brutal-shadow btn-press cursor-pointer"
                >
                  CREATE QUESTION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
