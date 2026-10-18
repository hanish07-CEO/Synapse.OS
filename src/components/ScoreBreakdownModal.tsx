import React from 'react';
import { X, Calculator, ShieldAlert, Check } from 'lucide-react';
import { BlindSpotFinding } from '../types/blindspot';

interface ScoreBreakdownModalProps {
  finding: BlindSpotFinding | null;
  onClose: () => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  finding,
  onClose,
}) => {
  if (!finding) return null;

  const { scores } = finding;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans"
    >
      <div
        className="bg-white text-black rounded-xl border-[3px] border-black shadow-[12px_12px_0px_0px_#000] max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b-[3px] border-black flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E8FF00] border-2 border-black flex items-center justify-center text-black font-bold shadow-[2px_2px_0_0_#000]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="heading text-base font-bold text-black">
                5-FACTOR PRIORITY FORMULA
              </h3>
              <p className="text-xs text-slate-600 mono">
                Transparent Risk Computation
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

        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          <div>
            <h4 className="font-bold text-black text-sm mb-1">{finding.title}</h4>
            <div className="flex items-center gap-2 mono text-xs">
              <span className="bg-[#E8FF00] text-black font-bold px-2 py-0.5 border border-black">
                SCORE: {scores.compositeScore}/100
              </span>
              <span className="bg-black text-white px-2 py-0.5 font-bold uppercase">
                {finding.priority} PRIORITY
              </span>
            </div>
          </div>

          <div className="space-y-3 mono text-xs">
            <div className="p-3 border-2 border-black bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold">1. Business Damage Impact (25% Weight)</p>
                <p className="text-[10px] text-slate-500">Revenue, regulatory, legal exposure</p>
              </div>
              <span className="font-bold text-sm">{scores.businessImpact}/10</span>
            </div>

            <div className="p-3 border-2 border-black bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold">2. Failure Probability (25% Weight)</p>
                <p className="text-[10px] text-slate-500">Likelihood of edge-case manifestation</p>
              </div>
              <span className="font-bold text-sm">{scores.probabilityFailure}/10</span>
            </div>

            <div className="p-3 border-2 border-black bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold">3. Urgency & Proximity (20% Weight)</p>
                <p className="text-[10px] text-slate-500">How soon until irreversible commitment</p>
              </div>
              <span className="font-bold text-sm">{scores.urgency}/10</span>
            </div>

            <div className="p-3 border-2 border-black bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold">4. Late Remediation Cost (20% Weight)</p>
                <p className="text-[10px] text-slate-500">Cost multiplier if fixed post-launch</p>
              </div>
              <span className="font-bold text-sm">{scores.costOfCorrectingLater}/10</span>
            </div>

            <div className="p-3 border-2 border-black bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold">5. Evidence Confidence (10% Weight)</p>
                <p className="text-[10px] text-slate-500">Empirical support from brief text</p>
              </div>
              <span className="font-bold text-sm">{scores.confidenceScore}/10</span>
            </div>
          </div>

          <div className="p-3 border-2 border-black bg-[#E8FF00]/20 text-xs">
            <span className="font-bold text-black">Computation: </span>
            <span className="mono text-slate-800">
              ({scores.businessImpact}×2.5) + ({scores.probabilityFailure}×2.5) + ({scores.urgency}×2.0) + ({scores.costOfCorrectingLater}×2.0) + ({scores.confidenceScore}×1.0) = {scores.compositeScore}
            </span>
          </div>
        </div>

        <div className="p-4 border-t-[3px] border-black bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-black bg-[#E8FF00] border-2 border-black hover:bg-black hover:text-[#E8FF00] brutal-shadow btn-press cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
