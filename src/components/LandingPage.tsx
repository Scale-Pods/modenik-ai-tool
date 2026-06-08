import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Map, 
  Layers, 
  Compass,
  Cpu,
  BarChart3,
  MessageSquareCode
} from 'lucide-react';
import Logo from './Logo';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export default function LandingPage({ onEnterDashboard }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col selection:bg-red-200">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Logo variant="banner" size="md" />
          <div className="h-10 w-[1px] bg-slate-300" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Powered by</span>
            <img src="/assets/ScalePods-logo.png" alt="ScalePods" className="h-9 w-auto" />
          </div>
        </div>
        <button 
          type="button"
          onClick={onEnterDashboard}
          className="btn-shine bg-slate-950 text-white hover:bg-slate-800 px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span>Enter Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center py-16 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 border border-red-100 rounded-full text-[10px] font-black text-red-650 uppercase tracking-widest select-none">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Next-Gen Sales Intelligence Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Convert Primary Sales Data into <span className="text-[#ED1C24]">Field-Level Decisions</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-550 font-medium max-w-2xl mx-auto leading-relaxed">
            The intelligent PWA built for Modenik Sales Leaders. Run real-time slab calculations, optimize routes, and deploy AI negotiation battle cards directly on the field.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              type="button"
              onClick={onEnterDashboard}
              className="btn-shine w-full sm:w-auto bg-[#ED1C24] text-white hover:bg-red-700 px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-650/15 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Launch Decision Workspace</span>
              <Zap className="w-5 h-5 fill-white" />
            </button>
            
            <a 
              href="https://modenik.in"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-slate-200 bg-white/60 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Corporate Website</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            
            {/* Feature 1 */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#ED1C24]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">Slab &amp; Milestone Engine</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Automatically tracks how far each distributor is from their next earning tier and projects absolute margin upsides.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">AI Negotiation Cards</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Instantly generates competitive ROI comparisons (Dixcy Josh vs Lux Venus) to drive inventory expansion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-6 rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">DMS-less Analytics</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Connects directly with distributor Tally and Excel outputs for frictionless secondary sales sell-through compliance.
              </p>
            </div>

          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-200/40 text-xs text-slate-400 select-none z-10">
        &copy; 2026 Modenik Lifestyle. Powered by Sales Intelligence Division.
      </footer>
    </div>
  );
}
