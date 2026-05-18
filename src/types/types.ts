export interface AIProvider {
  id: string;
  name: string;
  type: 'Primary' | 'Shadow' | 'Local';
  status: 'active' | 'standby' | 'offline';
  current_latency: number;
  priority: number;
  endpoint?: string;
}

export interface FailoverLog {
  id: string;
  created_at: string;
  source_provider_id: string;
  target_provider_id: string;
  reason: string;
  duration: number;
  source_provider?: { name: string };
  target_provider?: { name: string };
}

export interface SystemConfig {
  auto_failover: boolean;
  latency_threshold: number;
  pulse_interval: number;
}
