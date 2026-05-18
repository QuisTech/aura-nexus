/* eslint-disable */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/db/supabase';
import { AIProvider, FailoverLog, SystemConfig } from '@/types/types';
import { 
  Activity, 
  ShieldCheck, 
  ShieldAlert, 
  History, 
  Zap, 
  Cpu, 
  Clock,
  ArrowRightLeft,
  RefreshCw,
  Globe,
  Radio
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ResilienceAgent } from '@/agents/ResilienceAgent';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandHub() {
  const [providers, setProviders] = useState<AIProvider[]>([
    { id: '1', name: 'OpenAI (Primary Routing)', type: 'Primary', status: 'active', current_latency: 45, priority: 1 },
    { id: '2', name: 'Anthropic (Failover Target)', type: 'Shadow', status: 'standby', current_latency: 62, priority: 2 },
    { id: '3', name: 'Llama 3 (Local)', type: 'Local', status: 'standby', current_latency: 12, priority: 3 },
  ]);
  const [logs, setLogs] = useState<FailoverLog[]>([]);
  const [config, setConfig] = useState<SystemConfig | null>({ auto_failover: true, latency_threshold: 300, pulse_interval: 1000 });
  const [loading, setLoading] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [status, setStatus] = useState('Active');

  const agent = useRef(new ResilienceAgent((s, p, l) => {
    setStatus(s);
    // Update provider statuses based on agent state
    setProviders(prev => prev.map(provider => {
        if (provider.name.includes(p)) return { ...provider, status: 'active' };
        return { ...provider, status: provider.status === 'active' ? 'standby' : provider.status };
    }));
    
    // Add to logs
    const newLog: FailoverLog = {
        // eslint-disable-next-line react-hooks/purity
        id: `log-${Math.random()}`,
        created_at: new Date().toISOString(),
        source_provider_id: '1',
        target_provider_id: '2',
        reason: l[l.length - 1],
        duration: 450
    };
    if (l[l.length - 1].includes('Successful') || l[l.length - 1].includes('Triggering')) {
        setLogs(prev => [newLog, ...prev].slice(0, 10));
    }
  }));

  const triggerMission = async () => {
    setIsMonitoring(true);
    toast.promise(agent.current.executeMission("Sovereign Coordination Alpha"), {
      loading: 'Simulating Provider Degradation...',
      success: 'Stateful failover executed to Redundant Node',
      error: 'Mission failure detected',
    });
    
    setTimeout(() => setIsMonitoring(false), 5000);
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-status-success';
    if (latency < 300) return 'text-status-warning';
    return 'text-status-error';
  };

  const activeProvider = providers.find(p => p.status === 'active');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tighter sovereign-text uppercase">Infrastructure Control Plane</h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold mt-1">Multi-Model Telemetry & Routing</p>
        </div>
        <Button 
          id="test-failover-btn"
          variant="outline" 
          className="h-11 border-primary/30 text-primary hover:bg-primary/5 gap-3 px-8 group relative overflow-hidden"
          onClick={triggerMission}
          disabled={isMonitoring}
        >
          <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Radio className={`w-4 h-4 ${isMonitoring ? 'animate-pulse text-status-warning' : ''}`} />
          <span className="relative z-10">{isMonitoring ? 'TEST IN PROGRESS' : 'TEST FAILOVER INJECTION'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Core Status Monitor */}
        <Card id="hero-tile" className="md:col-span-8 glass-card border-primary/20 group">
           <div className="scanning-line opacity-30" />
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
              <ShieldCheck className="w-48 h-48 text-primary" />
           </div>
          <CardHeader>
            <CardTitle className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3 font-bold">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              Active Link Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div>
                  <motion.h3 
                    key={activeProvider?.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-black uppercase tracking-tighter"
                  >
                    {activeProvider?.name.split(' ')[0] || 'OFFLINE'}
                    <span className="text-muted-foreground/30 ml-2">{activeProvider?.name.split(' ')[1] || ''}</span>
                  </motion.h3>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex gap-1">
                        {[1,2,3].map(i => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-primary animate-pulse' : 'bg-status-warning animate-bounce'}`} style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-black ${status === 'Active' ? 'text-primary' : 'text-status-warning'}`}>
                        {status === 'Active' ? 'Primary Provider Healthy' : 'Stateful Routing Active'}
                    </span>
                  </div>
                </div>
                <div className="text-right bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                  <motion.span 
                    key={activeProvider?.current_latency}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-5xl font-black font-mono leading-none ${getLatencyColor(activeProvider?.current_latency || 0)}`}
                  >
                    {activeProvider?.current_latency || 0}
                  </motion.span>
                  <span className="text-xs text-muted-foreground ml-2 font-black uppercase tracking-widest">MS</span>
                  <p className="text-[8px] uppercase tracking-widest text-muted-foreground mt-1 font-bold">Measured Latency</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                 {[
                    { label: 'System Health', val: '99.99%', color: 'text-status-success' },
                    { label: 'Protection', val: 'ULTRA', color: 'text-primary' },
                    { label: 'Uptime', val: '100.0%', color: 'text-primary' },
                    { label: 'Integrity', val: 'SECURE', color: 'text-status-success' },
                 ].map((stat, i) => (
                    <div key={i} className="bg-white/5 p-4 border border-white/5 rounded-xl hover:border-primary/20 transition-colors">
                        <p className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">{stat.label}</p>
                        <p className={`text-xl font-black tracking-tighter ${stat.color}`}>{stat.val}</p>
                    </div>
                 ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resilience Matrix - AI Providers Grid */}
        <Card id="resilience-matrix" className="md:col-span-4 glass-card border-white/5 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold flex items-center justify-between">
                <span>Node Availability Matrix</span>
                <Globe className="w-3 h-3 animate-spin-slow" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {providers.map((p) => (
              <div 
                key={p.id} 
                className={`p-4 border transition-all relative rounded-xl overflow-hidden ${
                    p.status === 'active' 
                    ? 'bg-primary/10 border-primary/40 shadow-[0_0_20px_hsla(var(--primary),0.05)]' 
                    : 'bg-white/5 border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                }`}
              >
                {p.status === 'active' && (
                  <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-[8px] font-black text-primary-foreground uppercase tracking-[0.2em]">Active</div>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-xs tracking-widest uppercase">{p.name}</h4>
                    <p className="text-[8px] text-muted-foreground uppercase font-bold mt-1">{p.type} Pipeline</p>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${p.status === 'active' ? 'bg-primary shadow-[0_0_12px_hsla(var(--primary),1)]' : 'bg-muted-foreground/30'}`} />
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="text-xs">
                    <p className="text-[8px] uppercase mb-0.5 text-muted-foreground font-bold">Latency</p>
                    <span className={`font-mono text-sm font-black ${getLatencyColor(p.current_latency)}`}>{p.current_latency}ms</span>
                  </div>
                  <div className="text-right">
                     <p className="text-[8px] uppercase mb-0.5 text-muted-foreground font-bold">Core</p>
                     <span className="text-[10px] font-black text-primary/80">0{p.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Failover History Log */}
        <Card id="sovereign-trace" className="md:col-span-12 glass-card border-white/5">
           <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3 font-bold">
                <History className="w-4 h-4 text-primary" />
                Failover Audit Trail
              </CardTitle>
              <Badge variant="emerald" className="text-[8px]">Real-time Pulse</Badge>
           </CardHeader>
           <CardContent className="pt-0">
              <div className="divide-y divide-white/5">
                 {logs.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-black">No failover events recorded. System nominal.</div>
                 ) : (
                    logs.map((log) => (
                      <div key={log.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 hover:bg-white/[0.02] transition-colors px-2 group">
                        <div className="md:col-span-2 flex items-center gap-3">
                           <Clock className="w-3 h-3 text-muted-foreground" />
                           <span className="text-[10px] font-mono text-muted-foreground font-bold">
                             {new Date(log.created_at).toLocaleTimeString()}
                           </span>
                        </div>
                        <div className="md:col-span-4 flex items-center gap-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Primary</span>
                           <ArrowRightLeft className="w-3 h-3 text-primary group-hover:scale-125 transition-transform" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-primary">Redundant Node</span>
                        </div>
                        <div className="md:col-span-4 flex items-center gap-3">
                           <ShieldAlert className="w-3 h-3 text-status-warning" />
                           <span className="text-[10px] uppercase text-muted-foreground truncate font-bold">{log.reason}</span>
                        </div>
                        <div className="md:col-span-2 text-right">
                           <span className="text-[10px] font-mono text-primary font-black bg-primary/10 px-2 py-1 rounded">{log.duration}ms</span>
                        </div>
                      </div>
                    ))
                 )}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
