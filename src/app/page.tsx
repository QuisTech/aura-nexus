"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, Zap, Globe, ShieldCheck, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-emerald-500/30 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 resilient-gradient rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter sovereign-text uppercase">Aura Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">Protocol</a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">Resilience</a>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase">Sovereignty</a>
        </div>
        <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
          Launch Nexus
        </Link>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-12 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Sovereign Standard v2.0 Ready</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
          Zero-Latency Safety. <br/>
          <span className="text-slate-500">Resilient. Sovereign.</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mb-12">
          The world's first agentic life-line built for zero-downtime performance during life-critical emergencies. When the infrastructure fails, Aura Nexus heals.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/dashboard" data-testid="initialize-btn" className="px-10 py-5 rounded-2xl resilient-gradient text-white font-bold text-lg flex items-center gap-3 shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all">
            Initialize Life-Line
            <ChevronRight className="w-6 h-6" />
          </Link>
          <button className="px-10 py-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-lg hover:bg-slate-800 transition-all">
            View Protocol
          </button>
        </div>

        {/* Feature Grid Brief */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            { icon: Zap, title: '500ms Failover', desc: 'Surgical rerouting between LLM providers to ensure zero-latency response.' },
            { icon: Globe, title: 'Global Grid', desc: 'A decentralized network of Sovereign Nodes managing logistics and coordination.' },
            { icon: Activity, title: 'Real-time Pulse', desc: 'Persistent monitoring of infrastructure health with proactive healing.' },
          ].map((feature, i) => (
            <div key={i} className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-12 border-t border-slate-900 flex justify-center">
        <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">Engineering Resilience for the 2026 Sovereign Economy</p>
      </footer>
    </div>
  );
}
