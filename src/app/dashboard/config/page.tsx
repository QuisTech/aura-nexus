/* eslint-disable */
"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';
import { AIProvider, SystemConfig } from '@/types/types';
import { 
  Settings, 
  Cpu, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw,
  Database,
  Link as LinkIcon,
  Shield,
  Loader2,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function Configuration() {
  const [providers, setProviders] = useState<AIProvider[]>([
    { id: '1', name: 'OpenAI (Primary)', type: 'Primary', status: 'active', current_latency: 45, priority: 1, endpoint: 'api.openai.com' },
    { id: '2', name: 'Anthropic (Shadow)', type: 'Shadow', status: 'standby', current_latency: 62, priority: 2, endpoint: 'api.anthropic.com' },
    { id: '3', name: 'Llama 3 (Local)', type: 'Local', status: 'standby', current_latency: 12, priority: 3, endpoint: 'Internal Node' },
  ]);
  const [config, setConfig] = useState<SystemConfig | null>({
    auto_failover: true,
    latency_threshold: 300,
    pulse_interval: 1000
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const saveConfig = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('System Protocols Updated and Committed');
    setSaving(false);
  };

  const updateProviderStatus = (id: string, status: any) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    toast.success(`Core ${id} status updated to ${status}`);
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tighter sovereign-text uppercase flex items-center gap-4">
            <Settings className="text-primary w-6 h-6" />
            Protocols
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold mt-1">Sovereign Protocol Management</p>
        </div>
        <Button 
          className="h-11 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] px-8 gap-3 shadow-[0_0_20px_hsla(var(--primary),0.3)] hover:scale-105 transition-all"
          onClick={saveConfig}
          disabled={saving}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Commit Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Failover Protocol Card */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3 font-bold">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Sovereign Protocols
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                 <div>
                    <Label className="text-[10px] font-black">Autonomous Failover</Label>
                    <p className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-wider">Allow system to self-heal upon link failure</p>
                 </div>
                 <Switch 
                  checked={config?.auto_failover}
                  onCheckedChange={(checked) => setConfig(prev => prev ? { ...prev, auto_failover: checked } : null)}
                 />
              </div>

              <div className="space-y-3">
                <Label className="ml-1">Latency Trigger (ms)</Label>
                <Input 
                  type="number"
                  value={config?.latency_threshold}
                  onChange={(e) => setConfig(prev => prev ? { ...prev, latency_threshold: parseInt(e.target.value) } : null)}
                  className="font-mono"
                />
              </div>

              <div className="space-y-3">
                <Label className="ml-1">Pulse Interval (ms)</Label>
                <Input 
                  type="number"
                  value={config?.pulse_interval}
                  onChange={(e) => setConfig(prev => prev ? { ...prev, pulse_interval: parseInt(e.target.value) } : null)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
               <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Database className="w-24 h-24 text-primary" />
                  </div>
                  <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
                    <Zap className="w-4 h-4 animate-pulse" />
                    Dark Grid Mode
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-wider">
                    When all remote cores disconnect, the system will automatically initiate Dark Grid recovery via Local Llama core to ensure mission continuity.
                  </p>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Management Card */}
        <Card className="glass-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3 font-bold">
              <Cpu className="w-4 h-4 text-primary" />
              Core Management Matrix
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary hover:bg-primary/10 border border-primary/20"
              onClick={() => toast.info('Core registration restricted to Sovereign Admin')}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
             {providers.map((p) => (
                <div key={p.id} className="p-5 bg-white/5 border border-white/5 flex items-center justify-between rounded-xl group hover:border-primary/20 transition-all">
                   <div className="flex items-center gap-5">
                      <div className={`w-1 h-10 rounded-full transition-all ${p.status === 'active' ? 'bg-primary shadow-[0_0_10px_hsla(var(--primary),0.8)]' : 'bg-white/10'}`} />
                      <div>
                         <h4 className="text-xs font-black uppercase tracking-widest">{p.name}</h4>
                         <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1 tracking-tighter">{p.endpoint || 'Internal Node'}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <select 
                        className="bg-background border border-white/10 text-[9px] font-black uppercase tracking-widest p-2 rounded-lg outline-none focus:border-primary/50 transition-all"
                        value={p.status}
                        onChange={(e) => updateProviderStatus(p.id, e.target.value as any)}
                      >
                         <option value="active">ACTIVE</option>
                         <option value="standby">STANDBY</option>
                         <option value="offline">OFFLINE</option>
                      </select>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => toast.error('Sovereign Core removal restricted')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                   </div>
                </div>
             ))}
             <div className="pt-6 flex flex-col items-center gap-2">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <p className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground font-black">End of Matrix</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
