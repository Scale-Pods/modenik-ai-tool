/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { Role } from '../types';
import Logo from './Logo';

interface LoginProps {
  onLoginSuccess: (role: Role) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [selectedUser, setSelectedUser] = useState<'rakesh' | 'manoranjan'>('rakesh');
  const [authState, setAuthState] = useState<'idle' | 'authenticating' | 'success'>('idle');
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Parallax effect for environmental back-orbs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = () => {
    setAuthState('authenticating');
    setTimeout(() => {
      setAuthState('success');
      setTimeout(() => {
        onLoginSuccess(selectedUser === 'rakesh' ? 'ASM' : 'Manager');
      }, 700);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-slate-50 selection:bg-blue-200">
      
      {/* Parallax Atmospheric Bleed Blobs */}
      <div 
        className="floating-orb w-[600px] h-[600px] bg-blue-600/10 top-[-15%] right-[-10%]"
        style={{ transform: `translate(${coords.x}px, ${coords.y}px)` }}
      />
      <div 
        className="floating-orb w-[500px] h-[500px] bg-slate-900/5 bottom-[-10%] left-[-10%]"
        style={{ transform: `translate(${-coords.x}px, ${-coords.y}px)` }}
      />

      {/* Main Glass Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10 glass-panel rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center gap-8 transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
      >
        {/* Branding & Visual Identity */}
        <div className="flex flex-col items-center gap-3 text-center pb-4 border-b border-slate-100 w-full">
          <Logo variant="light" size="xl" showText={true} />
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Powered by</span>
            <img src="/assets/ScalePods-logo.png" alt="ScalePods" className="h-6 w-auto" />
          </div>
        </div>

        {/* Credentials Form Section */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
              Sign in as
            </label>
            <div className="relative group">
              <select 
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value as 'rakesh' | 'manoranjan')}
                disabled={authState !== 'idle'}
                className="w-full appearance-none bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <option value="rakesh">ASM: Rakesh Kumar Parida (Odisha)</option>
                <option value="manoranjan">Manager: Manoranjan (East Branch)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleLogin}
            disabled={authState !== 'idle'}
            className={`btn-shine w-full text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 select-none ${
              authState === 'success' 
                ? 'bg-emerald-500 shadow-emerald-500/10' 
                : 'bg-blue-700 hover:bg-blue-800 shadow-blue-700/15'
            }`}
          >
            <AnimatePresence mode="wait">
              {authState === 'idle' && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1"
                >
                  Enter Dashboard <ArrowRight className="w-4 h-4" />
                </motion.div>
              )}
              {authState === 'authenticating' && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </motion.div>
              )}
              {authState === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>Redirecting...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Security Footnote */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 w-full justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-500 tracking-wider">
            Secure Identity Provider
          </span>
        </div>
      </motion.div>

      {/* External Footer */}
      <footer className="mt-8 flex flex-col items-center gap-3 opacity-80 z-10 select-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
          <span className="w-3.5 h-3.5 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
          </span>
          <span className="text-xs font-bold text-slate-800">SAP Connected</span>
        </div>
        <p className="text-xs text-slate-400">
          &copy; 2026 Modenik Lifestyle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
