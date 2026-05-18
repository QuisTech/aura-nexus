"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, Zap, Globe, ShieldCheck, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-emerald-500/30 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 resilient-gradient rounded-xl flex items-center justify-center border border-emerald-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter sovereign-text uppercase">Aura Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">The Problem</a>
          <a href="#comparison" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">Before vs After</a>
          <a href="#workflow" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">Architecture</a>
        </div>
        <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-widest hover:bg-emerald-500/20 transition-all">
          Launch Console
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-12 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">SOC2 & HIPAA Compliant Protocol</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          Zero-Downtime AI. <br/>
          <span className="text-slate-500">Stateful. Resilient.</span>
        </h1>

        <p className="max-w-3xl text-lg md:text-xl text-slate-400 leading-relaxed mb-12">
          Enterprise continuity infrastructure for mission-critical workflows. When primary LLMs suffer outages or rate-limits, Aura Nexus orchestrates sub-second stateful failovers to ensure zero operational interruption.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-24 justify-center">
          <Link href="/dashboard" data-testid="initialize-btn" className="px-10 py-5 rounded-2xl resilient-gradient text-white font-bold text-lg flex items-center gap-3 shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all">
            Deploy Infrastructure
            <ChevronRight className="w-6 h-6" />
          </Link>
          <a href="#workflow" className="px-10 py-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center">
            View Protocol Spec
          </a>
        </div>

        {/* Feature Grid Brief */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full border-t border-slate-900 pt-16">
          {[
            { icon: Zap, title: 'Sub-500ms Routing', desc: 'Latency-aware semantic routing with seamless state preservation.' },
            { icon: Globe, title: 'Provider Abstraction', desc: 'Unified API layer across OpenAI, Anthropic, and localized private nodes.' },
            { icon: Activity, title: 'Resilience Telemetry', desc: 'Continuous deep monitoring of TTFT, error rates, and API degradation.' },
          ].map((feature, i) => (
            <div key={i} className="space-y-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* SECTION 1: THE CORE PROBLEM */}
        <section id="problem" className="mt-32 text-left w-full max-w-4xl mx-auto border-t border-slate-900 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-4">
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold block">The Risk Dimension</span>
              <h2 className="text-4xl font-black tracking-tight leading-none uppercase">The Silent Failures of Critical AI</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every year, billions in digital enterprise transactions depend on brittle LLM architectures. An API brownout, rate limit, or sudden server degradation crashes operations completely. Traditional failsafes wipe conversation state, leading to catastrophic context loss.
              </p>
            </div>
            <div className="md:col-span-7 bg-slate-950/80 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-3 bg-red-500/10 border-l border-b border-white/5 rounded-bl-2xl">
                <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <div className="font-mono text-xs space-y-3">
                <div className="text-red-400 font-bold uppercase tracking-wider">{"// SYSTEM FAILURE EVENT"}</div>
                <div className="text-slate-600">[12:44:02.19] POLL Primary API (OpenAI)... Status 503</div>
                <div className="text-slate-600">[12:44:03.45] RETRY #1 Primary API... Timeout 3000ms</div>
                <div className="text-red-500 font-bold">[12:44:06.46] FATAL: Connection reset. Transaction aborted.</div>
                <div className="text-slate-600">[12:44:06.47] STATE LOST: Conversational context wiped. Memory reset.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE COMPARISON MATRIX */}
        <section id="comparison" className="mt-32 text-left w-full border-t border-slate-900 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold block">Integrity Matrix</span>
            <h2 className="text-4xl font-black tracking-tight uppercase">Architectural Comparison</h2>
            <p className="text-slate-400 text-sm">How Aura Nexus redefines business continuity compared to traditional systems.</p>
          </div>

          <div className="bg-slate-950/50 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 border-b border-white/5 bg-slate-900/30 p-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
              <div>Feature Layer</div>
              <div className="text-red-400">Standard API Setup</div>
              <div className="text-emerald-400">Aura Nexus Protocol</div>
            </div>

            <div className="divide-y divide-white/5">
              {[
                { name: 'Failover Latency', before: '10s - 30s (Hard Crash)', after: '< 500ms (Active Telemetry)' },
                { name: 'Context Preservation', before: 'Wiped completely (State Loss)', after: '100% Serialized Context Sync' },
                { name: 'Routing Observability', before: 'None / Server Logs only', after: 'Immutable Real-time Audit Trail' },
                { name: 'Redundancy Layer', before: 'Single API Dependency', after: 'Multi-Cloud Active-Active Nodes' },
                { name: 'Compliance Integrity', before: 'Unverified Data Handling', after: 'Tamper-Evident SHA-256 Logs' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-3 p-6 text-sm hover:bg-white/[0.01] transition-colors">
                  <div className="font-bold text-slate-300">{row.name}</div>
                  <div className="text-slate-500 line-through decoration-red-900/40">{row.before}</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: 4-STEP TECHNICAL WORKFLOW */}
        <section id="workflow" className="mt-32 text-left w-full border-t border-slate-900 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold block">Under The Hood</span>
            <h2 className="text-4xl font-black tracking-tight uppercase">Operational Architecture</h2>
            <p className="text-slate-400 text-sm">A four-stage cryptographic process ensuring constant system resilience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Telemetry Polling', desc: 'Continuously monitors model Time-To-First-Token (TTFT) and API response entropy to predict degradation before failures manifest.' },
              { num: '02', title: 'Context Serialization', desc: 'Instantly packs and hashes prompt instructions, conversation threads, and variables into a transient state ledger.' },
              { num: '03', title: 'Stateful Routing', desc: 'Surgically hot-swaps degraded queries to fallback nodes under 500ms, preserving user interaction seamlessly.' },
              { num: '04', title: 'Immutable Ledger', desc: 'SHA-256 hashes every transaction state and appends the proof to an on-site audit trail for absolute enterprise compliance.' },
            ].map((step, i) => (
              <div key={i} className="space-y-4 p-6 bg-slate-950/40 border border-white/5 hover:border-emerald-500/30 rounded-2xl relative transition-all duration-300">
                <div className="text-3xl font-black font-mono text-emerald-500/20 absolute top-4 right-4">{step.num}</div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-200">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-16 border-t border-slate-900 flex flex-col items-center justify-center gap-4 bg-slate-950/20">
        <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">Mission-Critical AI Resilience Infrastructure</p>
        <p className="text-[9px] text-slate-800 font-mono">Press Ctrl + Shift + D on the console dashboard to view automated playback</p>
      </footer>
    </div>
  );
}

