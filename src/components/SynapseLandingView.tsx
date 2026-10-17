import React, { useState } from 'react';
import {
  Brain,
  SearchCheck,
  Lock,
  BarChart3,
  HelpCircle,
  Layers,
  Workflow,
  ArrowRight,
  Asterisk,
  CheckCircle2,
  Sparkles,
  Terminal,
  ExternalLink,
  ShieldAlert,
  Sliders,
  FileSearch,
  Zap,
} from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoProjects';
import { AnalysisProject } from '../types/blindspot';
import { UserProfile, DEMO_USERS } from '../types/auth';

interface SynapseLandingViewProps {
  onGoToLogin: () => void;
  onQuickDemoLogin: (user: UserProfile, projectId: string) => void;
  onExplorePublicDemo: (project: AnalysisProject) => void;
}

export const SynapseLandingView: React.FC<SynapseLandingViewProps> = ({
  onGoToLogin,
  onQuickDemoLogin,
  onExplorePublicDemo,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [terminalStep, setTerminalStep] = useState(3);

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToLogin();
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-black text-black dark:text-white transition-colors duration-200">
      {/* Top Architecture Status Strip */}
      <div className="bg-black text-[#E8FF00] dark:bg-[#E8FF00] dark:text-black border-b-[3px] border-black px-4 py-2 flex items-center justify-between text-xs mono font-bold">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[#E8FF00] dark:bg-black animate-pulse" />
          <span>SYNAPSE.OS // PRE-MORTEM RISK ENGINE [V4.2 ACTIVE]</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span>EVALUATION: GROUNDED</span>
          <span>·</span>
          <span>FALLBACK: LIVE HEURISTIC</span>
          <span>·</span>
          <button
            onClick={onGoToLogin}
            className="underline hover:opacity-80 uppercase cursor-pointer"
          >
            Access Terminal →
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative grid lg:grid-cols-12 min-h-[82vh] border-b-[3px] border-black dark:border-[#E8FF00]">
        <div className="absolute inset-0 dot-grid pointer-events-none" />

        {/* Left Column: Bold Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-12 md:p-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-black text-[#E8FF00] dark:bg-[#E8FF00] dark:text-black px-3.5 py-1.5 mono text-xs mb-6 w-fit brutal-shadow">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>SYSTEM STATUS: FULLY OPTIMIZED</span>
          </div>

          <h1 className="heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 text-slate-950 dark:text-white leading-[0.92]">
            EXPOSE THE{' '}
            <span className="bg-[#E8FF00] text-black px-2 border-[3px] border-black inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_#000]">
              INVISIBLE
            </span>
            .<br />
            ANALYZE EVERY CONSTRAINT.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-xl mb-8 leading-snug text-slate-800 dark:text-slate-200">
            Identify unstated assumptions and overlooked regulatory, architectural, and workflow risks
            before they derail delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12">
            <button
              onClick={onGoToLogin}
              className="h-14 sm:h-16 px-8 bg-black text-[#E8FF00] dark:bg-[#E8FF00] dark:text-black brutal-border brutal-shadow-lg btn-press heading text-lg sm:text-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>START ANALYSIS NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onExplorePublicDemo(DEMO_PROJECTS[0])}
              className="h-14 sm:h-16 px-8 bg-white dark:bg-slate-900 text-black dark:text-white brutal-border brutal-shadow-lg btn-press heading text-lg sm:text-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>VIEW BENCHMARK DEMO</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Social Proof Counters */}
          <div className="flex items-center gap-6 sm:gap-10 pt-4 border-t-[3px] border-black dark:border-slate-800">
            <div className="flex flex-col">
              <span className="heading text-3xl sm:text-4xl text-black dark:text-white">14.2M</span>
              <span className="mono text-xs opacity-75 uppercase">DOCS STRESS-TESTED</span>
            </div>
            <div className="w-[3px] h-10 bg-black dark:bg-[#E8FF00]" />
            <div className="flex flex-col">
              <span className="heading text-3xl sm:text-4xl text-black dark:text-white">99.8%</span>
              <span className="mono text-xs opacity-75 uppercase">RISK CAPTURE RATE</span>
            </div>
            <div className="w-[3px] h-10 bg-black dark:bg-[#E8FF00]" />
            <div className="flex flex-col">
              <span className="heading text-3xl sm:text-4xl text-black dark:text-white">8-VECTOR</span>
              <span className="mono text-xs opacity-75 uppercase">IMPACT SCORING</span>
            </div>
          </div>
        </div>

        {/* Right Column: Neobrutalist Terminal Preview */}
        <div className="lg:col-span-5 bg-[#E8FF00]/10 dark:bg-slate-950 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-black dark:border-[#E8FF00] relative flex items-center justify-center p-6 sm:p-10 overflow-hidden">
          <div className="w-full max-w-lg brutal-border bg-white dark:bg-slate-900 brutal-shadow-lg relative overflow-hidden">
            {/* Terminal Window Bar */}
            <div className="w-full h-10 border-b-[3px] border-black dark:border-slate-700 flex items-center px-4 bg-[#E8FF00] text-black justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-black rounded-full" />
                <div className="w-3 h-3 border-[2px] border-black rounded-full" />
                <div className="w-3 h-3 border-[2px] border-black rounded-full" />
              </div>
              <span className="mono text-[11px] font-bold tracking-widest uppercase">
                ANALYSIS_TERMINAL_V1
              </span>
            </div>

            {/* Terminal Output Stream */}
            <div className="p-5 space-y-3.5 mono text-xs sm:text-sm text-black dark:text-slate-100">
              <div className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>[SYSTEM] SCANNING DOCUMENT_ID_9921 (TALENTAI_PRD)...</span>
              </div>

              <div className="flex gap-3">
                <span className="text-black/40 dark:text-white/40">001</span>
                <span>
                  LOADING_WORKFLOW_MAP...{' '}
                  <span className="text-[#E8FF00] bg-black px-1 font-bold">DONE</span>
                </span>
              </div>

              <div className="flex gap-3">
                <span className="text-black/40 dark:text-white/40">002</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold underline">
                  [CRITICAL] MISSING ASSUMPTION DETECTED:
                </span>
              </div>

              <div className="ml-6 p-3.5 border-[2px] border-black dark:border-rose-500/80 bg-[#F5F1E8] dark:bg-black text-xs space-y-1">
                <div className="font-bold flex items-center justify-between text-black dark:text-white">
                  <span>Constraint #42: NYC Local Law 144</span>
                  <span className="px-1.5 py-0.5 bg-rose-600 text-white font-mono text-[10px]">
                    CRITICAL
                  </span>
                </div>
                <div className="italic opacity-80 text-black dark:text-slate-300">
                  "System assumes standard EEOC disclaimer satisfies algorithmic bias audit rules. Mandates annual independent audit."
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-black/40 dark:text-white/40">003</span>
                <span>
                  CALCULATING IMPACT...{' '}
                  <span className="text-indigo-600 dark:text-[#E8FF00] font-bold">
                    [||||||||||||] 86/100
                  </span>
                </span>
              </div>

              <div className="flex gap-3 items-center justify-between pt-2 border-t border-black/10 dark:border-white/10">
                <span className="font-bold">INSPECT GROUNDED FINDINGS?</span>
                <button
                  onClick={() => onQuickDemoLogin(DEMO_USERS[0], DEMO_PROJECTS[0].id)}
                  className="px-3 py-1 bg-[#E8FF00] text-black border-[2px] border-black font-bold text-xs hover:bg-black hover:text-[#E8FF00] transition-colors cursor-pointer"
                >
                  [LAUNCH_NOW]
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-black/50 dark:text-white/50 pt-1">
                <span>cursor_active</span>
                <div className="h-4 w-2 bg-black dark:bg-[#E8FF00] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <div className="h-16 bg-[#E8FF00] text-black border-b-[3px] border-black overflow-hidden flex items-center select-none">
        <div className="whitespace-nowrap flex animate-marquee font-bold">
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            MISSING ASSUMPTIONS <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            OVERLOOKED CONSTRAINTS <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            5-FACTOR IMPACT MATRIX <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            GROUNDED EVIDENCE CITATIONS <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            INTERACTIVE QUESTION ENGINE <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            MISSING ASSUMPTIONS <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            OVERLOOKED CONSTRAINTS <Asterisk className="w-5 h-5 mx-3" />
          </span>
          <span className="heading text-xl sm:text-2xl flex items-center px-8">
            5-FACTOR IMPACT MATRIX <Asterisk className="w-5 h-5 mx-3" />
          </span>
        </div>
      </div>

      {/* CORE CAPABILITIES: 6 NEOBRUTALIST CARDS */}
      <section id="engine" className="py-20 px-6 sm:px-10 md:px-16 bg-white dark:bg-black border-b-[3px] border-black dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="bg-[#E8FF00] text-black border-[3px] border-black inline-block px-4 py-1 mono text-xs sm:text-sm font-bold mb-4 brutal-shadow">
              CORE CAPABILITIES
            </div>
            <h2 className="heading text-4xl sm:text-6xl md:text-7xl mb-4 max-w-3xl text-black dark:text-white">
              BUILT FOR DEEP
              <br />
              SYSTEMIC DISCOVERY.
            </h2>
            <p className="text-lg sm:text-xl max-w-2xl text-slate-700 dark:text-slate-300">
              We don't just summarize your documents. We stress-test them against edge cases, regulatory obligations, and unstated bottlenecks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] hover:text-black transition-all bg-[#F5F1E8] dark:bg-slate-900 cursor-pointer">
              <SearchCheck className="w-12 h-12 mb-6 text-black dark:text-[#E8FF00] group-hover:text-black" />
              <h3 className="heading text-2xl mb-3">ASSUMPTION DETECTION</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Automatically flag implicit operational assumptions in project plans that lack supporting empirical validation or contractual buffer.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // DISCOVERY_01</span>
              </div>
            </div>

            {/* Card 2 (Highlighted) */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group transition-all bg-[#E8FF00] text-black cursor-pointer">
              <Lock className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-3">CONSTRAINT DISCOVERY</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Map out statutory (HIPAA, BIPA, GDPR), latency thresholds, rate quotas, and dependency SLAs buried deep in unwritten team workflows.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/30">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // COMPLIANCE_02</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] hover:text-black transition-all bg-[#F5F1E8] dark:bg-slate-900 cursor-pointer">
              <BarChart3 className="w-12 h-12 mb-6 text-black dark:text-[#E8FF00] group-hover:text-black" />
              <h3 className="heading text-2xl mb-3">IMPACT PRIORITIZATION</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Multi-factor composite scoring (0-100) weighting business damage, probability of failure, urgency, and cost of late correction.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // SCORING_03</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] hover:text-black transition-all bg-[#F5F1E8] dark:bg-slate-900 cursor-pointer">
              <FileSearch className="w-12 h-12 mb-6 text-black dark:text-[#E8FF00] group-hover:text-black" />
              <h3 className="heading text-2xl mb-3">EVIDENCE CITATIONS</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Anti-hallucination discipline: every finding cites explicit text evidence tagged as Direct Quote, Inferred, or Needs Validation.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // EVIDENCE_04</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] hover:text-black transition-all bg-[#F5F1E8] dark:bg-slate-900 cursor-pointer">
              <HelpCircle className="w-12 h-12 mb-6 text-black dark:text-[#E8FF00] group-hover:text-black" />
              <h3 className="heading text-2xl mb-3">SMART QUESTION GEN</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Probing stakeholder questions tailored to Product, Legal, and Tech leads. Answering them iteratively recalculates residual risk.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // INTERVIEW_05</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="brutal-border p-7 sm:p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] hover:text-black transition-all bg-[#F5F1E8] dark:bg-slate-900 cursor-pointer">
              <Workflow className="w-12 h-12 mb-6 text-black dark:text-[#E8FF00] group-hover:text-black" />
              <h3 className="heading text-2xl mb-3">WORKFLOW MAPPING</h3>
              <p className="mb-6 text-base leading-relaxed opacity-90">
                Deconstruct integration sequences, third-party vendor APIs, and background job dependencies to expose single points of failure.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span>ACTIVE_MODULE // WORKFLOW_06</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENCHMARK SCENARIO SECTION */}
      <section id="benchmarks" className="py-20 px-6 sm:px-10 md:px-16 bg-[#F5F1E8] dark:bg-black border-b-[3px] border-black dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="bg-black text-[#E8FF00] dark:bg-[#E8FF00] dark:text-black px-3.5 py-1 mono text-xs font-bold inline-block mb-3 brutal-shadow">
                READY-TO-TEST SCENARIOS
              </div>
              <h2 className="heading text-3xl sm:text-5xl text-black dark:text-white">
                INSTANT PRE-MORTEM WALKTHROUGHS
              </h2>
            </div>
            <p className="text-sm mono text-slate-700 dark:text-slate-300 max-w-md">
              Select any pre-configured enterprise scenario to launch Level 3 workspace with real findings, priority scores, and question runbooks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {DEMO_PROJECTS.map((demo, idx) => {
              const demoUser = DEMO_USERS[idx] || DEMO_USERS[0];
              const criticalCount = demo.findings.filter((f) => f.priority === 'Critical').length;
              const highCount = demo.findings.filter((f) => f.priority === 'High').length;

              return (
                <div
                  key={demo.id}
                  className="brutal-border bg-white dark:bg-slate-900 brutal-shadow p-6 flex flex-col justify-between hover:translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mono text-xs">
                      <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 font-bold">
                        {demo.analysisType}
                      </span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        RISK {demo.overallRiskScore}/100
                      </span>
                    </div>

                    <h3 className="heading text-xl text-black dark:text-white">
                      {demo.title}
                    </h3>

                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {demo.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 mono text-xs font-bold">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300">
                        {criticalCount} CRITICAL
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                        {highCount} HIGH
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300">
                        {demo.questions.length} QUESTIONS
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t-2 border-black dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#E8FF00] border-2 border-black flex items-center justify-center font-bold text-xs text-black">
                        {demoUser.name.charAt(0)}
                      </div>
                      <div className="text-[11px] leading-tight">
                        <p className="font-bold text-black dark:text-white truncate max-w-[110px]">
                          {demoUser.name}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px]">
                          {demoUser.role}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onQuickDemoLogin(demoUser, demo.id)}
                      className="px-3.5 py-2 bg-[#E8FF00] text-black border-2 border-black font-bold text-xs btn-press heading flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_0px_#000]"
                    >
                      <span>LAUNCH ROLE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION: DON'T WORK IN THE DARK */}
      <section className="bg-black text-[#E8FF00] py-20 px-6 sm:px-12 border-b-[3px] border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-[#E8FF00] text-black font-bold mono text-xs uppercase mb-6 brutal-shadow">
            DEPLOY INSTANT ENGINE
          </div>

          <h2 className="heading text-4xl sm:text-6xl md:text-7xl mb-6 text-[#E8FF00]">
            DON'T WORK IN THE DARK.
          </h2>

          <p className="text-lg sm:text-2xl mb-10 max-w-2xl mx-auto font-light text-slate-300">
            Start your project pre-mortem analysis today. Catch missing assumptions, API limits, and compliance traps early.
          </p>

          <form
            onSubmit={handleQuickAnalyze}
            className="flex flex-col sm:flex-row justify-center items-stretch gap-0 border-[3px] border-[#E8FF00] max-w-2xl mx-auto shadow-[10px_10px_0px_0px_#E8FF00] bg-black"
          >
            <input
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="ENTER PRD TITLE OR EMAIL@COMPANY.COM"
              className="bg-transparent p-5 text-base sm:text-lg mono focus:outline-none flex-grow border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[#E8FF00] placeholder:text-[#E8FF00]/40 text-white"
            />
            <button
              type="submit"
              className="bg-[#E8FF00] text-black px-8 py-5 heading text-xl sm:text-2xl hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              ANALYZE NOW
            </button>
          </form>

          <div className="mt-8 mono text-xs opacity-75 uppercase">
            Used by risk, legal, & engineering teams at scale
          </div>
        </div>
      </section>

      {/* NEOBRUTALIST FOOTER */}
      <footer className="bg-white dark:bg-black py-16 px-6 sm:px-12 border-t-[3px] border-black dark:border-slate-800 text-black dark:text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E8FF00] border-[3px] border-black flex items-center justify-center text-black">
                <Brain className="w-6 h-6" />
              </div>
              <span className="heading text-2xl tracking-tight">SYNAPSE.OS // BLINDSPOT AI</span>
            </div>
            <p className="text-sm max-w-sm text-slate-700 dark:text-slate-300">
              Building the autonomous pre-mortem intelligence layer for complex software, datasets, and regulatory compliance.
            </p>
          </div>

          <div className="flex flex-col gap-3 mono text-xs">
            <span className="font-black text-sm uppercase mb-1">ENGINE</span>
            <a href="#engine" className="hover:underline">Capabilities</a>
            <a href="#benchmarks" className="hover:underline">Benchmarks</a>
            <button onClick={onGoToLogin} className="text-left hover:underline">Analysis Workspace</button>
            <button onClick={onGoToLogin} className="text-left hover:underline">API & Webhooks</button>
          </div>

          <div className="flex flex-col gap-3 mono text-xs">
            <span className="font-black text-sm uppercase mb-1">WALKTHROUGHS</span>
            <button onClick={() => onQuickDemoLogin(DEMO_USERS[0], DEMO_PROJECTS[0].id)} className="text-left hover:underline">
              TalentAI PRD
            </button>
            <button onClick={() => onQuickDemoLogin(DEMO_USERS[1], DEMO_PROJECTS[1].id)} className="text-left hover:underline">
              Clinical Diagnostic
            </button>
            <button onClick={() => onQuickDemoLogin(DEMO_USERS[2], DEMO_PROJECTS[2].id)} className="text-left hover:underline">
              Supply Chain API
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t-[3px] border-black dark:border-slate-800 flex flex-col md:flex-row justify-between mono text-[11px] gap-4 opacity-80">
          <div className="flex flex-wrap gap-6 uppercase font-bold">
            <span>© 2026 SYNAPSE // BLINDSPOT AI INC</span>
            <span>PRIVACY_PROTOCOL</span>
            <span>TERMS_OF_SERVICE</span>
          </div>
          <div>
            <span>AUTONOMOUS RISK DISCOVERY ENGINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
