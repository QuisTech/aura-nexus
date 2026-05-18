/* eslint-disable */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PluginConsole, PluginConsoleRef } from './PluginConsole';

type ScriptStep =
  | { type: 'cursor'; targetId?: string; x?: number | string; y?: number | string; delay?: number }
  | { type: 'click'; targetId?: string; delay?: number }
  | { type: 'subtitle'; text: string; delay?: number }
  | { type: 'log'; text: string; typeOfLog?: 'info' | 'error' | 'success'; delay?: number }
  | { type: 'scroll'; targetId?: string; y: number; delay?: number }
  | { type: 'wait'; delay: number };

const SCRIPT: ScriptStep[] = [
    // --- INTRODUCTION ---
    { type: 'cursor', x: '50%', y: '50%', delay: 500 },
    { type: 'subtitle', text: 'Aura Nexus. Enterprise AI Continuity Infrastructure.' },
    { type: 'log', text: '[System] Nexus Infrastructure Node initialized', delay: 300 },
    { type: 'log', text: '[Telemetry] Primary LLM Route: STABLE', delay: 300 },

    // --- OVERVIEW ---
    { type: 'subtitle', text: 'Our system monitors primary LLM endpoints in real-time, measuring latency and Time-To-First-Token.' },
    { type: 'cursor', targetId: 'hero-tile', delay: 1500 },
    { type: 'log', text: '[Monitor] Polling OpenAI (Primary Routing)... Latency 45ms', delay: 300 },
    { type: 'wait', delay: 1000 },

    // --- INITIATING FAILOVER ---
    { type: 'cursor', targetId: 'test-failover-btn', delay: 1500 },
    { type: 'subtitle', text: 'Watch what happens when a primary provider suffers a catastrophic failure.' },
    { type: 'log', text: '[Admin] User initiated crisis injection...', typeOfLog: 'error', delay: 300 },
    { type: 'click', targetId: 'test-failover-btn', delay: 500 },
    { type: 'log', text: '[Alert] Primary route degraded! Latency spike detected.', typeOfLog: 'error', delay: 1000 },

    // --- FAILOVER EXECUTION ---
    { type: 'subtitle', text: 'Aura Nexus detects the latency spike and executes a stateful failover to a redundant node.' },
    { type: 'cursor', targetId: 'resilience-matrix', delay: 1500 },
    { type: 'log', text: '[Routing] Semantic state serialized and preserved.', delay: 300 },
    { type: 'log', text: '[Routing] Traffic shifted to Anthropic (Failover Target)', typeOfLog: 'success', delay: 300 },

    // --- AUDIT TRAIL ---
    { type: 'scroll', targetId: 'window', y: 300, delay: 1000 },
    { type: 'cursor', targetId: 'resilience-trace', delay: 1500 },
    { type: 'subtitle', text: 'Semantic context is preserved. The workflow continues uninterrupted via the failover target.' },
    { type: 'wait', delay: 1000 },

    // --- COMPLIANCE ---
    { type: 'subtitle', text: 'Every failover event is immutably logged for SOC2 and HIPAA compliance.' },
    { type: 'log', text: '[Audit] Failover event 0x48A appended to immutable ledger.', delay: 300 },
    
    // --- CONCLUSION ---
    { type: 'cursor', x: '50%', y: '10%', delay: 1500 },
    { type: 'scroll', targetId: 'window', y: 0, delay: 1000 },
    { type: 'subtitle', text: 'Zero downtime. Absolute resilience. This is Aura Nexus.' },
    { type: 'log', text: '[System] Demonstration Complete.', typeOfLog: 'success', delay: 500 },
    { type: 'wait', delay: 2000 },
];

export function DirectorMode({ onClose }: { onClose: () => void }) {
    const [subtitle, setSubtitle] = useState('');
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isClicking, setIsClicking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
   
    const consoleRef = useRef<PluginConsoleRef>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const getBestVoice = (): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) return null;

        // Priority 1: Google US English Female
        const googleFemale = voices.find(v => v.name.includes('Google') && v.name.includes('US English') && v.name.includes('Female'));
        if (googleFemale) return googleFemale;
       
        // Priority 2: Any Google US English
        const googleAny = voices.find(v => v.name.includes('Google') && v.name.includes('US English'));
        if (googleAny) return googleAny;

        // Priority 3: Microsoft Natural / Online (Edge)
        const msNatural = voices.find(v => v.name.includes('Natural') || v.name.includes('Online'));
        if (msNatural) return msNatural;

        // Priority 4: Premium female system voices
        const femaleVoice = voices.find(v =>
            v.name.includes('Zira') || v.name.includes('Samantha') ||
            v.name.includes('Aria') || v.name.includes('Female')
        );
        if (femaleVoice) return femaleVoice;

        return voices[0];
    };

    const speakAndWait = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;

            const bestVoice = getBestVoice();
            if (bestVoice) {
                utterance.voice = bestVoice;
            }

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();

            window.speechSynthesis.speak(utterance);
        });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { displaySurface: 'browser' } as any,
                audio: true,
            });
            chunksRef.current = [];
            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `nexus_demo_${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
                stream.getTracks().forEach(t => t.stop());
            };
            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch {
            console.warn('Screen recording was not started (user cancelled or not supported).');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const runScript = async () => {
        window.speechSynthesis?.getVoices();
        await new Promise(r => setTimeout(r, 500));

        await startRecording();

        for (let i = 5; i > 0; i--) {
            setSubtitle(`Initializing Director Mode in ${i}...`);
            await new Promise(r => setTimeout(r, 1000));
        }
        setSubtitle("");
        await new Promise(r => setTimeout(r, 500));

        for (const step of SCRIPT) {
            if (step.type === 'wait') {
                await new Promise(r => setTimeout(r, step.delay));
                continue;
            }

            if (step.type === 'subtitle') {
                setSubtitle(step.text);
                await speakAndWait(step.text);
                await new Promise(r => setTimeout(r, 400));
            }
            else if (step.type === 'log') {
                consoleRef.current?.log(step.text, step.typeOfLog || 'info');
            }
           
            let nextPos = null;
           
            if ('targetId' in step && step.targetId) {
                const el = document.getElementById(step.targetId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    nextPos = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }
            }
            else if (step.type === 'cursor' && step.x !== undefined && step.y !== undefined) {
                nextPos = {
                    x: typeof step.x === 'string' ? (parseFloat(step.x) / 100) * window.innerWidth : step.x,
                    y: typeof step.y === 'string' ? (parseFloat(step.y) / 100) * window.innerHeight : step.y
                };
            }

            if (nextPos) {
                setCursorPos(nextPos);
            }

            if (step.type === 'click') {
                setIsClicking(true);
                await new Promise(r => setTimeout(r, 200));
                if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.click();
                }
                await new Promise(r => setTimeout(r, 200));
                setIsClicking(false);
            }
           
            if (step.type === 'scroll') {
                if (step.targetId === 'window') {
                    window.scrollTo({ top: step.y, behavior: 'smooth' });
                } else if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.scrollTo({ top: step.y, behavior: 'smooth' });
                }
            }
           
            if (step.type !== 'subtitle' && step.delay) {
                await new Promise(r => setTimeout(r, step.delay));
            }
        }
       
        setSubtitle("");
        await new Promise(r => setTimeout(r, 1000));

        stopRecording();
        setTimeout(onClose, 1000);
    };

    useEffect(() => {
        runScript();
        return () => {
            window.speechSynthesis?.cancel();
            stopRecording();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <motion.div
                className="absolute top-0 left-0"
                animate={{ x: cursorPos.x, y: cursorPos.y }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className={`w-6 h-6 rounded-full bg-primary/30 border border-primary flex items-center justify-center backdrop-blur-sm transition-transform duration-200 ${isClicking ? 'scale-75 bg-primary/80' : 'scale-100'}`}>
                    <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_hsla(var(--primary),1)]"></div>
                </div>
            </motion.div>

            <AnimatePresence>
                {subtitle && (
                    <motion.div
                        key={subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-primary/30 text-white font-bold text-xl text-center max-w-3xl shadow-2xl shadow-primary/20"
                    >
                        {subtitle}
                    </motion.div>
                )}
            </AnimatePresence>

            <PluginConsole ref={consoleRef} />

            {isRecording && (
                <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded border border-red-500/40 text-red-400 font-mono text-xs z-[10002]">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    REC
                </div>
            )}
        </div>
    );
}
