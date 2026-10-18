import React, { useState } from 'react';
import { AnalysisProject } from '../types/blindspot';
import {
  FileText,
  Printer,
  Copy,
  Download,
  Check,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Layers,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface ReportsViewProps {
  project: AnalysisProject;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ project }) => {
  const [copied, setCopied] = useState(false);

  const criticalFindings = project.findings.filter((f) => f.priority === 'Critical');
  const highFindings = project.findings.filter((f) => f.priority === 'High');
  const mediumFindings = project.findings.filter((f) => f.priority === 'Medium');
  const answeredQuestions = project.questions.filter((q) => q.answered);

  // Group findings by category
  const categories = Array.from(new Set(project.findings.map((f) => f.category)));

  const generateMarkdownReport = (): string => {
    let md = `# EXECUTIVE PRE-MORTEM REPORT: ${project.title.toUpperCase()}\n\n`;
    md += `**Generated:** ${new Date().toLocaleDateString()} | **Analysis Type:** ${project.analysisType}\n`;
    md += `**Overall Risk Score:** ${project.overallRiskScore}/100 (${project.riskLevel})\n\n`;
    md += `## Executive Summary\n${project.summary}\n\n`;
    md += `## Risk Matrix Overview\n`;
    md += `- Total Findings: ${project.findings.length}\n`;
    md += `- Critical Severity: ${criticalFindings.length}\n`;
    md += `- High Severity: ${highFindings.length}\n`;
    md += `- Medium Severity: ${mediumFindings.length}\n`;
    md += `- Stakeholder Questions Answered: ${answeredQuestions.length}/${project.questions.length}\n\n`;

    md += `## Critical & High Risk Vectors\n\n`;
    project.findings
      .filter((f) => f.priority === 'Critical' || f.priority === 'High')
      .forEach((f, idx) => {
        md += `### ${idx + 1}. [${f.priority.toUpperCase()}] ${f.title}\n`;
        md += `- **Category:** ${f.category}\n`;
        md += `- **Composite Score:** ${f.scores.compositeScore}/100 (Business Impact: ${f.scores.businessImpact}/10, Failure Prob: ${f.scores.probabilityFailure}/10)\n`;
        md += `- **Evidence (${f.evidenceType}):** "${f.evidence}" (${f.locationRef})\n`;
        md += `- **Why It Matters:** ${f.whyItMatters}\n`;
        md += `- **Potential Impact:** ${f.potentialImpact}\n`;
        md += `- **Recommended Action:** ${f.recommendedAction}\n`;
        md += `- **Owner:** ${f.suggestedOwner} | **Status:** ${f.status}\n\n`;
      });

    md += `## Stakeholder Inquiries & Assumptions Audit\n\n`;
    project.questions.forEach((q, idx) => {
      md += `**Q${idx + 1} (${q.targetStakeholder}):** ${q.question}\n`;
      md += `Status: ${q.answered ? 'VALIDATED' : 'UNVALIDATED'}\n`;
      if (q.selectedAnswer) md += `Response: ${q.selectedAnswer}\n`;
      if (q.userCustomAnswer) md += `Notes: ${q.userCustomAnswer}\n`;
      md += `\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownReport();
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pre-mortem-report-${project.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans text-black">
      {/* Action Bar */}
      <div className="no-print brutal-border bg-white brutal-shadow p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-[#E8FF00] border-2 border-black px-2 py-0.5 mono text-xs font-bold shadow-[2px_2px_0_0_#000]">
            AUDIT REPORT EXPORT
          </span>
          <h1 className="heading text-2xl sm:text-3xl text-black mt-2">
            PRE-MORTEM EXECUTIVE DOSSIER
          </h1>
          <p className="mono text-xs text-slate-600 mt-0.5 font-bold">
            PROJECT REF: {project.id} // {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 bg-white text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'COPIED MD' : 'COPY MARKDOWN'}</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-4 py-2 bg-white text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#E8FF00] text-black border-2 border-black font-bold mono text-xs brutal-shadow btn-press cursor-pointer flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="brutal-border bg-white brutal-shadow p-8 md:p-12 space-y-10">
        {/* Document Header */}
        <div className="border-b-4 border-black pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="inline-block bg-black text-[#E8FF00] px-3 py-1 mono text-xs font-bold mb-3">
                SYNAPSE.OS PRE-MORTEM INTELLIGENCE DOSSIER
              </div>
              <h1 className="heading text-3xl sm:text-5xl text-black leading-tight">
                {project.title}
              </h1>
              <p className="mono text-sm font-bold text-slate-600 mt-2">
                ANALYSIS TYPE: {project.analysisType} | COMPILED: {new Date(project.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="brutal-border bg-white p-4 text-center shrink-0 min-w-[160px] shadow-[4px_4px_0_0_#000]">
              <span className="mono text-[10px] font-bold block uppercase text-slate-600">
                OVERALL RISK INDEX
              </span>
              <span className="heading text-5xl text-black block my-1">
                {project.overallRiskScore}
              </span>
              <span
                className={`mono text-xs font-bold px-2 py-0.5 border border-black inline-block ${
                  project.overallRiskScore >= 75
                    ? 'bg-rose-200 text-rose-950'
                    : project.overallRiskScore >= 50
                    ? 'bg-amber-200 text-amber-950'
                    : 'bg-emerald-200 text-emerald-950'
                }`}
              >
                {project.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-3">
          <h2 className="heading text-xl sm:text-2xl border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="bg-[#E8FF00] border-2 border-black w-6 h-6 flex items-center justify-center text-xs font-bold">
              1
            </span>
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-base text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 border-l-4 border-black">
            {project.summary}
          </p>
        </section>

        {/* Section 2: Metrics Matrix */}
        <section className="space-y-4">
          <h2 className="heading text-xl sm:text-2xl border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="bg-[#E8FF00] border-2 border-black w-6 h-6 flex items-center justify-center text-xs font-bold">
              2
            </span>
            RISK FACTOR MATRIX
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_#000]">
              <span className="mono text-[10px] uppercase font-bold text-slate-600 block">TOTAL VECTORS</span>
              <span className="heading text-3xl text-black">{project.findings.length}</span>
            </div>
            <div className="border-2 border-black p-4 bg-rose-50 shadow-[2px_2px_0_0_#000]">
              <span className="mono text-[10px] uppercase font-bold text-rose-900 block">CRITICAL RISKS</span>
              <span className="heading text-3xl text-rose-600">{criticalFindings.length}</span>
            </div>
            <div className="border-2 border-black p-4 bg-amber-50 shadow-[2px_2px_0_0_#000]">
              <span className="mono text-[10px] uppercase font-bold text-amber-900 block">HIGH RISKS</span>
              <span className="heading text-3xl text-amber-600">{highFindings.length}</span>
            </div>
            <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0_0_#000]">
              <span className="mono text-[10px] uppercase font-bold text-slate-600 block">STAKEHOLDER Q&A</span>
              <span className="heading text-3xl text-black">
                {answeredQuestions.length}/{project.questions.length}
              </span>
            </div>
          </div>
        </section>

        {/* Section 3: Detailed Vector Findings */}
        <section className="space-y-6">
          <h2 className="heading text-xl sm:text-2xl border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="bg-[#E8FF00] border-2 border-black w-6 h-6 flex items-center justify-center text-xs font-bold">
              3
            </span>
            DETAILED FINDINGS & CITATION AUDIT
          </h2>

          <div className="space-y-6">
            {project.findings.map((f, idx) => (
              <div
                key={f.id}
                className="border-2 border-black p-5 bg-white shadow-[3px_3px_0_0_#000] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="mono text-xs font-bold bg-black text-white px-2 py-0.5">
                      #{idx + 1}
                    </span>
                    <span className="mono text-xs font-bold text-slate-700 uppercase">
                      {f.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`mono text-xs font-bold px-2 py-0.5 border border-black ${
                        f.priority === 'Critical'
                          ? 'bg-rose-500 text-white'
                          : f.priority === 'High'
                          ? 'bg-amber-400 text-black'
                          : 'bg-slate-200 text-black'
                      }`}
                    >
                      {f.priority.toUpperCase()} · SCORE {f.scores.compositeScore}
                    </span>
                    <span className="mono text-xs font-bold bg-[#E8FF00] border border-black px-2 py-0.5">
                      OWNER: {f.suggestedOwner}
                    </span>
                  </div>
                </div>

                <h3 className="heading text-xl text-black">{f.title}</h3>

                {/* Evidence Quote */}
                <div className="bg-slate-50 border-l-4 border-black p-3 text-xs mono">
                  <span className="font-bold text-slate-500 block mb-0.5">
                    GROUNDED EVIDENCE ({f.evidenceType} // {f.locationRef}):
                  </span>
                  <span className="text-slate-900 italic">"{f.evidence}"</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <strong className="mono block text-slate-700 uppercase mb-0.5">WHY IT MATTERS:</strong>
                    <p className="text-slate-800">{f.whyItMatters}</p>
                  </div>
                  <div>
                    <strong className="mono block text-slate-700 uppercase mb-0.5">POTENTIAL FAILURE IMPACT:</strong>
                    <p className="text-slate-800">{f.potentialImpact}</p>
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-300 p-3 text-xs">
                  <strong className="mono block text-black uppercase mb-0.5 font-bold">
                    RECOMMENDED MITIGATION ACTION:
                  </strong>
                  <p className="text-slate-900 font-medium">{f.recommendedAction}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Stakeholder Question Audit */}
        <section className="space-y-4">
          <h2 className="heading text-xl sm:text-2xl border-b-2 border-black pb-2 flex items-center gap-2">
            <span className="bg-[#E8FF00] border-2 border-black w-6 h-6 flex items-center justify-center text-xs font-bold">
              4
            </span>
            STAKEHOLDER INQUIRIES & RESOLUTION STATUS
          </h2>

          <div className="space-y-3">
            {project.questions.map((q, idx) => (
              <div
                key={q.id}
                className="border-2 border-black p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0_0_#000]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="mono text-[10px] font-bold bg-black text-[#E8FF00] px-2 py-0.5">
                      {q.targetStakeholder}
                    </span>
                    <span
                      className={`mono text-[10px] font-bold px-2 py-0.5 border border-black ${
                        q.answered ? 'bg-emerald-200 text-emerald-950' : 'bg-rose-200 text-rose-950'
                      }`}
                    >
                      {q.answered ? 'VALIDATED' : 'PENDING'}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-black">{q.question}</p>
                  {q.selectedAnswer && (
                    <p className="mono text-xs text-slate-700 mt-1">
                      Resolution: <span className="font-bold text-black">{q.selectedAnswer}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Report Footer / Signature Area */}
        <div className="pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs mono">
          <div className="text-slate-600">
            CONFIDENTIAL // FOR INTERNAL EXECUTIVE REVIEW ONLY // SYNAPSE.OS
          </div>
          <div className="font-bold text-black">
            VERIFIED BY BLINDSPOT PRE-MORTEM ENGINE
          </div>
        </div>
      </div>
    </div>
  );
};
