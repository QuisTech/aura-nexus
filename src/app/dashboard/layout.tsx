"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Activity,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DirectorMode } from '@/components/DirectorMode';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ to, icon: Icon, label, isActive, onClick }: SidebarItemProps) => (
  <Link href={to} onClick={onClick}>
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 h-12 rounded-none transition-all border-r-2 ${
        isActive 
          ? 'bg-primary/10 text-primary border-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </Button>
  </Link>
);

const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => {
  const pathname = usePathname();
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Command Hub' },
    { to: '/dashboard/config', icon: Settings, label: 'Protocols' },
  ];

  return (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl">
      <Link href="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-primary/20 flex items-center justify-center border border-primary/50 rounded-lg">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-black tracking-tighter text-lg resilient-text">AURA NEXUS</span>
          <span className="text-[9px] text-primary/70 uppercase tracking-[0.2em] font-bold">Resilience Core</span>
        </div>
      </Link>

      <nav className="flex-1 mt-6">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            {...item}
            isActive={pathname === item.to}
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-[10px] font-bold border border-primary/30 text-primary">
            AD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold truncate">ADMIN@AURA.NEXUS</span>
            <span className="text-[8px] text-muted-foreground uppercase tracking-widest">Infrastructure Admin</span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-none h-10"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Disconnect</span>
        </Button>
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDirectorMode, setIsDirectorMode] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsDirectorMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      {isDirectorMode && <DirectorMode onClose={() => setIsDirectorMode(false)} />}
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-card/80 backdrop-blur-md sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-black text-sm tracking-tighter resilient-text">AURA NEXUS</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </header>

        {/* Global Status Bar (Desktop) */}
        <div className="hidden lg:flex h-12 border-b border-white/5 bg-card/30 backdrop-blur-sm items-center px-6 justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsla(var(--primary),0.8)]" />
              <span className="text-primary/80">Active Link: Nominal</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>System Load: 12%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              <span>Core: V-2.0.26</span>
            </div>
            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded text-[8px]">Mission Critical</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto min-h-0 relative">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="absolute inset-0 z-50 lg:hidden"
              >
                <div className="w-64 h-full shadow-2xl">
                   <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
                </div>
                <div className="absolute inset-0 left-64 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
          {children}
        </main>
      </div>
    </div>
  );
}
