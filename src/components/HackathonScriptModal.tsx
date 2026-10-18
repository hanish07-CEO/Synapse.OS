import React from 'react';
import { X, Mic, CheckCircle2, Flame, Copy, Check } from 'lucide-react';

interface HackathonScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonScriptModal: React.FC<HackathonScriptModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const scriptText = `
"Every product initiative fails from what teams never thought to question.
Meet SYNAPSE — the autonomous pre-mortem intelligence system.
Instead of hoping our requirements are solid, SYNAPSE stress-tests briefs, PRDs, and datasets before engineering begins.
It uncovers 8 critical blind-spot vectors: missing assumptions, hidden regulatory audits like NYC Local Law 144, and third-party API rate quotas.
Every discovery cites grounded text evidence, ranked by a transparent 5-factor impact matrix.
Our interactive Question Engine doesn't just list issues — it interviews stakeholders and recalculates residual risk in real-time.
With SYNAPSE, we find the iceberg before the ship leaves port."
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans"
    >
      <div
        className="bg-white text-black rounded-xl border-[3px] border-black shadow-[12px_12px_0px_0px_#000] max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b-[3px] border-black flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8FF00] border-2 border-black flex items-center justify-center text-black font-bold shadow-[2px_2px_0_0_#000]">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="heading text-base font-bold text-black">
                60-SECOND PITCH SCRIPT & DEMO RUNBOOK
              </h3>
              <p className="text-xs text-slate-600 mono">
                Judge Walkthrough & Value Proposition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border-2 border-black rounded hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm leading-relaxed">
          <div className="p-4 border-2 border-black bg-slate-50 relative font-mono text-xs">
            <p className="whitespace-pre-line text-slate-800">{scriptText}</p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 bg-white border border-black hover:bg-[#E8FF00] transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <div className="p-3 border-2 border-black bg-[#E8FF00]/20 text-xs space-y-1">
            <p className="font-bold text-black uppercase">Demo Sequencing Steps:</p>
            <ol className="list-decimal pl-4 space-y-1 mono text-slate-800">
              <li>Open <strong>SYNAPSE.OS</strong> White Theme Landing View.</li>
              <li>Click <strong>LAUNCH ROLE</strong> under TalentAI PRD benchmark.</li>
              <li>Inspect high-priority finding: NYC Local Law 144 compliance gap.</li>
              <li>Answer Question Engine prompt to trigger real-time risk reduction.</li>
            </ol>
          </div>
        </div>

        <div className="p-4 border-t-[3px] border-black bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-black bg-[#E8FF00] border-2 border-black hover:bg-black hover:text-[#E8FF00] brutal-shadow btn-press cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
