/* eslint-disable */
import React, { useState, forwardRef, useImperativeHandle } from 'react';

export interface PluginConsoleRef {
    log: (message: string, type?: 'info' | 'error' | 'success') => void;
}

export const PluginConsole = forwardRef<PluginConsoleRef, {}>((props, ref) => {
    const [logs, setLogs] = useState<{time: string, msg: string, type: string}[]>([]);

    useImperativeHandle(ref, () => ({
        log: (message: string, type = 'info') => {
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 });
            setLogs(prev => [...prev, { time: timestamp, msg: message, type }].slice(-12)); // Keep last 12
        }
    }));

    return (
        <div className="fixed bottom-6 left-6 w-[400px] bg-black/80 backdrop-blur-md border border-primary/20 rounded-xl overflow-hidden font-mono text-[10px] shadow-2xl shadow-primary/10 z-[10000]">
            <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between">
                <div className="font-bold text-primary tracking-widest uppercase">NexusAuditLog.exe (Live)</div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <div className="p-4 flex flex-col gap-1.5 h-[180px] overflow-y-auto">
                {logs.map((log, i) => (
                    <div key={i} className={`flex gap-3 ${log.type === 'error' ? 'text-status-error' : log.type === 'success' ? 'text-primary' : 'text-muted-foreground'}`}>
                        <span className="opacity-50">[{log.time}]</span>
                        <span>{log.msg}</span>
                    </div>
                ))}
                {logs.length === 0 && <div className="text-muted-foreground opacity-50">System Ready. Waiting for signals...</div>}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { if (el) { el.scrollIntoView({ behavior: "smooth" }); } }}>
                </div>
            </div>
        </div>
    );
});
PluginConsole.displayName = "PluginConsole";
