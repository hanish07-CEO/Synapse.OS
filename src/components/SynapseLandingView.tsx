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

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    onGoToLogin();
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans transition-colors duration-200">
      {/* HERO SECTION */}
      <section className="relative grid lg:grid-cols-2 min-h-[82vh] border-b-[3px] border-black bg-white">
        <div className="absolute inset-0 dot-grid pointer-events-none" />

        {/* Left Column: Bold Typography & Actions */}
        <div className="flex flex-col justify-center p-8 md:p-20 relative z-10 bg-white">
          <div className="inline-block bg-black text-[#E8FF00] px-4 py-1 mono text-xs mb-6 w-fit shadow-[3px_3px_0px_0px_#000]">
            SYSTEM STATUS: OPTIMIZED [V4.2]
          </div>

          <h1 className="heading text-5xl md:text-8xl mb-8 leading-[0.92] text-black">
            EXPOSE THE{' '}
            <span className="bg-[#E8FF00] text-black px-2 border-[2px] border-black inline-block shadow-[3px_3px_0px_0px_#000]">
              INVISIBLE
            </span>
            .<br />
            ANALYZE EVERY CONSTRAINT.
          </h1>

          <p className="text-xl md:text-2xl font-medium max-w-xl mb-10 leading-snug text-slate-800">
            Identify missing assumptions and overlooked workflow risks before they become project-ending failures. Built for high-stakes intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <button
              onClick={onGoToLogin}
              className="h-16 px-8 bg-black text-[#E8FF00] brutal-border brutal-shadow-lg btn-press heading text-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>START ANALYSIS NOW</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onExplorePublicDemo(DEMO_PROJECTS[0])}
              className="h-16 px-8 bg-white text-black brutal-border brutal-shadow-lg btn-press heading text-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>VIEW DEMO</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Social Proof Counters */}
          <div className="flex items-center gap-8 pt-4 border-t-[3px] border-black">
            <div className="flex flex-col">
              <span className="heading text-4xl text-black">14.2M</span>
              <span className="mono text-xs opacity-60 uppercase font-bold">DOCS PROCESSED</span>
            </div>
            <div className="w-[3px] h-12 bg-black" />
            <div className="flex flex-col">
              <span className="heading text-4xl text-black">99.8%</span>
              <span className="mono text-xs opacity-60 uppercase font-bold">ACCURACY RATE</span>
            </div>
            <div className="w-[3px] h-12 bg-black" />
            <div className="flex flex-col">
              <span className="heading text-4xl text-black">8-VECTOR</span>
              <span className="mono text-xs opacity-60 uppercase font-bold">PRE-MORTEM RISK</span>
            </div>
          </div>
        </div>

        {/* Right Column: Abstract Terminal Graphic */}
        <div className="bg-[#E8FF00]/10 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-black relative flex items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-lg aspect-square brutal-border bg-white brutal-shadow-lg relative overflow-hidden flex flex-col justify-between">
            {/* Terminal Window Header Bar */}
            <div className="absolute top-0 left-0 w-full h-10 border-b-[3px] border-black flex items-center px-4 bg-[#E8FF00] justify-between z-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-black rounded-full" />
                <div className="w-3 h-3 border-[2px] border-black rounded-full" />
                <div className="w-3 h-3 border-[2px] border-black rounded-full" />
              </div>
              <span className="mono text-[10px] font-bold tracking-widest text-black uppercase">
                ANALYSIS_TERMINAL_V1
              </span>
            </div>

            {/* Terminal Text Content */}
            <div className="p-6 pt-14 space-y-4 mono text-sm text-black flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="text-green-600 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>[SYSTEM] SCANNING DOCUMENT_ID_9921...</span>
                </div>

                <div className="flex gap-4">
                  <span className="text-black opacity-30">001</span>
                  <span>
                    LOADING_WORKFLOW_MAP...{' '}
                    <span className="text-[#E8FF00] bg-black px-1 font-bold">DONE</span>
                  </span>
                </div>

                <div className="flex gap-4">
                  <span className="text-black opacity-30">002</span>
                  <span className="text-red-600 font-bold underline">
                    [CRITICAL] MISSING ASSUMPTION DETECTED:
                  </span>
                </div>

                <div className="ml-6 sm:ml-10 p-4 border-[2px] border-black bg-white shadow-[3px_3px_0px_0px_#000]">
                  <div className="font-bold text-black flex items-center justify-between">
                    <span>Constraint #42: Market Volatility</span>
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-bold">CRITICAL</span>
                  </div>
                  <div className="text-xs mt-1 opacity-70 italic text-black">
                    "Project assumes 0% change in base materials cost. Evidence suggests +14% variance."
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-black opacity-30">003</span>
                  <span>
                    CALCULATING IMPACT...{' '}
                    <span className="animate-pulse text-blue-600 font-bold">[||||||||||] 84%</span>
                  </span>
                </div>

                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-black opacity-30">004</span>
                    <span className="text-black font-bold">GENERATE RECOMMENDATION? (Y/N)</span>
                  </div>
                  <button
                    onClick={() => onQuickDemoLogin(DEMO_USERS[0], DEMO_PROJECTS[0].id)}
                    className="px-2.5 py-1 bg-[#E8FF00] text-black border-2 border-black font-bold text-xs hover:bg-black hover:text-[#E8FF00] transition-colors cursor-pointer"
                  >
                    [RUN_Y]
                  </button>
                </div>
              </div>

              <div className="h-4 w-2 bg-black animate-bounce mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="h-16 bg-[#E8FF00] border-b-[3px] border-black overflow-hidden flex items-center text-black select-none">
        <div className="whitespace-nowrap flex animate-marquee font-bold">
          <span className="heading text-2xl flex items-center px-8">
            MISSING ASSUMPTIONS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            OVERLOOKED CONSTRAINTS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            IMPACT ANALYSIS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            EVIDENCE BASED <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            MISSING ASSUMPTIONS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            OVERLOOKED CONSTRAINTS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            IMPACT ANALYSIS <Asterisk className="w-5 h-5 mx-4" />
          </span>
          <span className="heading text-2xl flex items-center px-8">
            EVIDENCE BASED <Asterisk className="w-5 h-5 mx-4" />
          </span>
        </div>
      </div>

      {/* FEATURES GRID */}
      <section id="engine" className="py-24 px-6 md:px-12 bg-white border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className="bg-[#E8FF00] border-[3px] border-black inline-block px-4 py-1 mono text-sm font-bold mb-4 brutal-shadow">
              CORE CAPABILITIES
            </div>
            <h2 className="heading text-5xl md:text-7xl mb-6 max-w-3xl text-black">
              BUILT FOR DEEP<br />SYSTEMIC DISCOVERY.
            </h2>
            <p className="text-xl max-w-2xl text-slate-800 font-medium">
              We don't just read your documents. We interrogate them to find what you haven't even thought to ask.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] transition-colors bg-white text-black cursor-pointer">
              <SearchCheck className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">ASSUMPTION DETECTION</h3>
              <p className="mb-6 text-lg text-slate-800">
                Automatically flag implicit assumptions in project plans that lack supporting data or validation.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-white transition-colors bg-[#E8FF00] text-black cursor-pointer">
              <Lock className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">CONSTRAINT DISCOVERY</h3>
              <p className="mb-6 text-lg text-slate-900">
                Map out regulatory, technical, and resource constraints that are buried in silos or unwritten workflows.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/30">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] transition-colors bg-white text-black cursor-pointer">
              <BarChart3 className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">IMPACT PRIORITIZATION</h3>
              <p className="mb-6 text-lg text-slate-800">
                Rank findings by their potential to derail timelines, budgets, or technical viability.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] transition-colors bg-white text-black cursor-pointer">
              <FileSearch className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">EVIDENCE-BASED RECS</h3>
              <p className="mb-6 text-lg text-slate-800">
                Receive actionable recommendations backed by cross-referenced internal data and industry benchmarks.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] transition-colors bg-white text-black cursor-pointer">
              <HelpCircle className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">SMART QUESTION GEN</h3>
              <p className="mb-6 text-lg text-slate-800">
                Synthesize probing questions for stakeholders to resolve ambiguities early in the project lifecycle.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="brutal-border p-8 brutal-shadow flex flex-col group hover:bg-[#E8FF00] transition-colors bg-white text-black cursor-pointer">
              <Workflow className="w-12 h-12 mb-6 text-black" />
              <h3 className="heading text-2xl mb-4">WORKFLOW MAPPING</h3>
              <p className="mb-6 text-lg text-slate-800">
                Reverse engineer undocumented workflows from communication logs and task management patterns.
              </p>
              <div className="mt-auto flex items-center gap-2 mono text-xs font-bold pt-4 border-t-2 border-black/20">
                <span className="w-2 h-2 bg-black rounded-full" />
                <span>ACTIVE_MODULE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENCHMARK SCENARIO SECTION */}
      <section id="benchmarks" className="py-24 px-6 md:px-12 bg-slate-50/80 border-b-[3px] border-black text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="bg-[#E8FF00] border-[2px] border-black px-3.5 py-1 mono text-xs font-bold inline-block mb-3 shadow-[2px_2px_0_0_#000]">
                ENTERPRISE WALKTHROUGHS
              </div>
              <h2 className="heading text-3xl sm:text-5xl text-black">
                TEST PRE-MORTEM SCENARIOS
              </h2>
            </div>
            <p className="text-sm mono text-slate-700 max-w-md font-medium">
              Launch Level 3 workspace with real findings, priority scores, grounded evidence citations, and question runbooks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DEMO_PROJECTS.map((demo, idx) => {
              const demoUser = DEMO_USERS[idx] || DEMO_USERS[0];
              const criticalCount = demo.findings.filter((f) => f.priority === 'Critical').length;
              const highCount = demo.findings.filter((f) => f.priority === 'High').length;

              return (
                <div
                  key={demo.id}
                  className="brutal-border bg-white brutal-shadow p-6 sm:p-8 flex flex-col justify-between hover:translate-x-1 hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mono text-xs">
                      <span className="bg-black text-white px-2 py-0.5 font-bold">
                        {demo.analysisType}
                      </span>
                      <span className="font-bold text-rose-600">
                        RISK {demo.overallRiskScore}/100
                      </span>
                    </div>

                    <h3 className="heading text-xl text-black">
                      {demo.title}
                    </h3>

                    <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                      {demo.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 mono text-xs font-bold">
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-black">
                        {criticalCount} CRITICAL
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-black">
                        {highCount} HIGH
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-black">
                        {demo.questions.length} QUESTIONS
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t-2 border-black flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E8FF00] border-2 border-black flex items-center justify-center font-bold text-xs text-black">
                        {demoUser.name.charAt(0)}
                      </div>
                      <div className="text-[11px] leading-tight">
                        <p className="font-bold text-black truncate max-w-[110px]">
                          {demoUser.name}
                        </p>
                        <p className="text-slate-600 text-[10px]">
                          {demoUser.role}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onQuickDemoLogin(demoUser, demo.id)}
                      className="px-3.5 py-2 bg-[#E8FF00] text-black border-2 border-black font-bold text-xs btn-press heading flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
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

      {/* WHITE CTA SECTION: DON'T WORK IN THE DARK */}
      <section className="bg-white text-black py-24 border-b-[3px] border-black relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1 bg-[#E8FF00] text-black border-[2px] border-black font-bold mono text-xs uppercase mb-6 shadow-[3px_3px_0px_0px_#000]">
            DEPLOY INSTANT ENGINE
          </div>

          <h2 className="heading text-5xl md:text-8xl mb-8 text-black">
            DON'T WORK IN THE DARK.
          </h2>

          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium text-slate-800">
            Start your first project analysis today. Catch missing assumptions, API limits, and compliance traps early.
          </p>

          <form
            onSubmit={handleQuickAnalyze}
            className="flex flex-col md:flex-row justify-center items-stretch gap-0 border-[3px] border-black max-w-2xl mx-auto shadow-[12px_12px_0px_0px_#000000] bg-white"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="EMAIL@COMPANY.COM"
              className="bg-white p-6 text-xl mono focus:outline-none flex-grow border-b-[3px] md:border-b-0 md:border-r-[3px] border-black placeholder:text-black/40 text-black font-bold"
            />
            <button
              type="submit"
              className="bg-[#E8FF00] text-black px-10 py-6 heading text-2xl hover:bg-black hover:text-[#E8FF00] transition-colors cursor-pointer whitespace-nowrap"
            >
              ANALYZE
            </button>
          </form>

          <div className="mt-12 mono text-sm opacity-60 uppercase font-bold text-black">
            Used by risk teams at top global enterprises
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-20 px-6 md:px-12 border-t-[3px] border-black text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E8FF00] border-[3px] border-black flex items-center justify-center text-black">
                <Brain className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span className="heading text-3xl">SYNAPSE.OS</span>
            </div>
            <p className="text-lg max-w-sm text-slate-800 font-medium">
              Building the intelligence layer for complex project infrastructure and systemic risk detection.
            </p>
          </div>
          <div className="flex flex-col gap-4 mono text-sm">
            <span className="font-black mb-2 text-base">ENGINE</span>
            <a href="#engine" className="hover:underline">Capabilities</a>
            <a href="#benchmarks" className="hover:underline">Integrations</a>
            <button onClick={onGoToLogin} className="text-left hover:underline">Security</button>
            <button onClick={onGoToLogin} className="text-left hover:underline">API Docs</button>
          </div>
          <div className="flex flex-col gap-4 mono text-sm">
            <span className="font-black mb-2 text-base">CONNECT</span>
            <span className="hover:underline cursor-pointer">Twitter / X</span>
            <span className="hover:underline cursor-pointer">GitHub</span>
            <span className="hover:underline cursor-pointer">Discord</span>
            <span className="hover:underline cursor-pointer">LinkedIn</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t-[3px] border-black flex flex-col md:flex-row justify-between mono text-[11px] gap-6 font-bold">
          <div className="flex gap-8 uppercase">
            <span>© 2026 SYNAPSE ANALYTICS INC</span>
            <span>PRIVACY_PROTOCOL</span>
            <span>TERMS_OF_SERVICE</span>
          </div>
          <div className="text-right">
            <span>AUTONOMOUS RISK DISCOVERY ENGINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
