import React, { useState } from 'react';
import { UserProfile, DEMO_USERS } from '../types/auth';
import { loginWithDemoUser, loginWithEmail } from '../services/auth';
import { ArrowLeft, ArrowRight, ShieldCheck, UserCheck, Lock, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile, preferredProjectId?: string) => void;
  onBackToLanding: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const user = loginWithEmail(email, name);
    onLoginSuccess(user);
  };

  const handleQuickDemo = (demoUser: UserProfile, projectId: string) => {
    const user = loginWithDemoUser(demoUser);
    onLoginSuccess(user, projectId);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-white text-black font-sans">
      <div className="max-w-2xl w-full brutal-border bg-white brutal-shadow-lg p-8 sm:p-12 relative overflow-hidden">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 mono text-xs font-bold mb-6 hover:underline uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <div className="mb-8">
          <div className="inline-block bg-[#E8FF00] border-2 border-black text-black px-3 py-1 mono text-xs font-bold mb-3 shadow-[2px_2px_0_0_#000]">
            AUTHENTICATION PORTAL
          </div>
          <h2 className="heading text-3xl sm:text-4xl text-black mb-2">
            ENTERPRISE PRE-MORTEM ACCESS
          </h2>
          <p className="text-sm text-slate-700">
            Sign in with an evaluator identity or test instant 1-click role logins for demonstration scenarios.
          </p>
        </div>

        {/* 1-Click Role Logins */}
        <div className="space-y-4 mb-8">
          <label className="block text-xs font-bold uppercase mono text-black">
            1-Click Demonstration Personas
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleQuickDemo(DEMO_USERS[0], 'demo-talent-ai')}
              className="p-4 border-2 border-black bg-white hover:bg-[#E8FF00] transition-colors text-left brutal-shadow btn-press cursor-pointer flex flex-col justify-between"
            >
              <div>
                <p className="font-bold text-xs uppercase">{DEMO_USERS[0].name}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{DEMO_USERS[0].role}</p>
              </div>
              <span className="mt-3 text-[10px] font-bold mono bg-black text-white px-1.5 py-0.5 w-fit">
                TalentAI PRD →
              </span>
            </button>

            <button
              onClick={() => handleQuickDemo(DEMO_USERS[1], 'demo-clinical-ai')}
              className="p-4 border-2 border-black bg-white hover:bg-[#E8FF00] transition-colors text-left brutal-shadow btn-press cursor-pointer flex flex-col justify-between"
            >
              <div>
                <p className="font-bold text-xs uppercase">{DEMO_USERS[1].name}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{DEMO_USERS[1].role}</p>
              </div>
              <span className="mt-3 text-[10px] font-bold mono bg-black text-white px-1.5 py-0.5 w-fit">
                Clinical ICU →
              </span>
            </button>

            <button
              onClick={() => handleQuickDemo(DEMO_USERS[2], 'demo-supply-chain')}
              className="p-4 border-2 border-black bg-white hover:bg-[#E8FF00] transition-colors text-left brutal-shadow btn-press cursor-pointer flex flex-col justify-between"
            >
              <div>
                <p className="font-bold text-xs uppercase">{DEMO_USERS[2].name}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{DEMO_USERS[2].role}</p>
              </div>
              <span className="mt-3 text-[10px] font-bold mono bg-black text-white px-1.5 py-0.5 w-fit">
                Supply Chain →
              </span>
            </button>
          </div>
        </div>

        {/* Custom Login Form */}
        <form onSubmit={handleCustomLogin} className="pt-6 border-t-2 border-black space-y-4">
          <label className="block text-xs font-bold uppercase mono text-black">
            Custom Evaluator Credentials
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              className="p-3 border-2 border-black mono text-xs focus:outline-none focus:bg-[#E8FF00]/10"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTERPRISE EMAIL *"
              className="p-3 border-2 border-black mono text-xs focus:outline-none focus:bg-[#E8FF00]/10"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-[#E8FF00] text-black border-2 border-black brutal-shadow btn-press heading text-sm flex items-center justify-center gap-2 cursor-pointer font-bold tracking-wider"
          >
            <span>AUTHENTICATE & ENTER WORKSPACE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
