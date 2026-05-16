"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Activity, Wifi, AlertTriangle, Zap, Loader2, Globe, Cpu, Layers, Radio, Navigation, ShieldCheck } from 'lucide-react';
import { ResilienceAgent } from '@/agents/ResilienceAgent';

export default function AuraNexus() {
  const [status, setStatus] = useState('Active');
  const [provider, setProvider] = useState('Primary Core (OpenAI)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<{time: string, msg: string, type: string}[]>([
    { time: '09:00:00', msg: 'Aura Nexus Sovereign Core v2.0 Initialized.', type: 'info' },
    { time: '09:01:22', msg: 'System integrity scan: 100% Secure.', type: 'success' },
  ]);
  
  const agent = useRef(new ResilienceAgent((s, p, l) => {
    setStatus(s);
    setProvider(p);
    
    const newLogs = l.map(msg => ({
      time: new Date().toLocaleTimeString(),
      msg,
      type: msg.includes('ALERT') || msg.includes('spike') ? 'warn' : msg.includes('Successful') ? 'success' : 'info'
    }));
    setLogs(prev => [...prev, ...newLogs.slice(prev.length - 1)]);
  }));

  const startMission = async () => {
    setIsProcessing(true);
    await agent.current.executeMission("Critical Life-Support Coordination");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16 flex flex-col gap-8 bg-[#020617] text-slate-50 selection:bg-emerald-500/30">
      {/* Sovereign Top Bar */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 resilient-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter sovereign-text">AURA NEXUS</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-ring" />
              <p className="text-[10px] text-emerald-500 font-mono tracking-[0.3em] uppercase font-bold">Resilient Life-Line OS</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl">
          <button onClick={startMission} disabled={isProcessing} className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50">
            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Radio className="w-4 h-4" />}
            {isProcessing ? 'Recovering...' : 'Simulate Crisis'}
          </button>
          <div className="h-10 w-px bg-slate-800 mx-1" />
          <div className="px-4 py-2 flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">System Health</span>
            <span className={`text-xs font-bold ${status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{status}</span>
          </div>
        </div>
      </header>

      {/* The Bento Grid */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        
        {/* HERO TILE: Active Life-Line Mission */}
        <section id="hero-tile" className="md:col-span-8 md:row-span-2 bento-card p-10 flex flex-col justify-between group">
          <div className="scanning-line" />
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Global Coordination Active</span>
              </div>
              <h2 className="text-5xl font-black tracking-tight leading-tight">
                Life-Support <br/> <span className="text-slate-500">Orchestration</span>
              </h2>
            </div>
            <div className="w-24 h-24 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900/50 shadow-inner group-hover:border-emerald-500/30 transition-colors">
              <Navigation className="w-10 h-10 text-slate-700 group-hover:text-emerald-500 transition-all duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { label: 'Incident Area', val: 'Sector-7G North', icon: Navigation },
              { label: 'Priority Level', val: 'Emergency-01', icon: AlertTriangle },
              { label: 'ETA Resolved', val: '00:14:22', icon: Activity },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <item.icon className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</p>
                  <p className="text-sm font-bold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SIDE TILE: Resilience Matrix */}
        <section id="resilience-matrix" className="md:col-span-4 bento-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Resilience Matrix</h3>
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>

          <div className="space-y-8">
            {[
              { name: 'Primary (OpenAI)', state: status === 'Active' ? 'Nominal' : 'Degraded', color: status === 'Active' ? 'emerald' : 'amber', w: status === 'Active' ? '100%' : '20%' },
              { name: 'Shadow (Anthropic)', state: status === 'Crisis' ? 'Active' : 'Standby', color: status === 'Crisis' ? 'emerald' : 'slate', w: status === 'Crisis' ? '100%' : '5%' },
              { name: 'Local (Llama 3)', state: 'Ready', color: 'slate', w: '5%' },
            ].map((core, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-400">{core.name}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${core.color === 'emerald' ? 'text-emerald-500' : core.color === 'amber' ? 'text-amber-500' : 'text-slate-600'}`}>{core.state}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${core.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : core.color === 'amber' ? 'bg-amber-500' : 'bg-slate-700'}`} style={{ width: core.w }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SIDE TILE: Sovereign Trace */}
        <section id="sovereign-trace" className="md:col-span-4 bento-card p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 font-mono">Sovereign Trace</h3>
            <Radio className="w-4 h-4 text-slate-500 animate-pulse" />
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[240px] pr-2 custom-scrollbar">
            {[...logs].reverse().map((log, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50 transition-all hover:bg-slate-800/50">
                <span className="text-[9px] font-mono text-slate-600 mt-0.5">{log.time.split(' ')[0]}</span>
                <div className={`w-0.5 h-auto rounded-full ${log.type === 'warn' ? 'bg-amber-500' : log.type === 'success' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                <p className="text-[11px] text-slate-300 leading-relaxed">{log.msg}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM TILE: Intelligence Node */}
        <section id="intel-node" className="md:col-span-4 bento-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Intelligence Node</h3>
          </div>
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <ShieldCheck className="w-32 h-32 text-emerald-500" />
            </div>
            <p className="text-xs text-emerald-400 font-bold mb-2">Resilience Protocol active</p>
            <p className="text-[11px] text-slate-400 leading-relaxed relative z-10">
              Aura Sovereign is managing all active life-support coordination points. All reasoning data is encrypted and persistent within the Sovereign Vault.
            </p>
          </div>
        </section>

        {/* BOTTOM TILE: Security Integrity */}
        <section id="security-node" className="md:col-span-8 bento-card p-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Security Standard</span>
              <span className="text-2xl font-black text-slate-300">ISO-Sovereign-2026</span>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Protection Layer</span>
              <span className="text-2xl font-black text-emerald-500">ACTIVE</span>
            </div>
          </div>
          <ShieldCheck className="w-12 h-12 text-slate-800 group-hover:text-emerald-500/20 transition-all" />
        </section>

      </main>
    </div>
  );
}
