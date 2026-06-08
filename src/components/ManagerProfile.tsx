import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Award,
  Layers,
  Sparkles,
  Settings,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface ManagerProfileProps {
  onLogout: () => void;
}

export default function ManagerProfile({ onLogout }: ManagerProfileProps) {
  const [allowOverdraft, setAllowOverdraft] = useState(true);
  const [primaryTargetCap, setPrimaryTargetCap] = useState(110); // in percent

  const managerAvatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-left"
    >
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manager Command Center</h2>
          <p className="text-sm font-semibold text-slate-500">Regional management controls and branch configurations</p>
        </div>

        <button 
          type="button"
          onClick={onLogout}
          className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-650 rounded-xl font-bold text-xs transition-colors self-start sm:self-center"
        >
          Sign Out
        </button>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Manager Info */}
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col items-center text-center gap-6 shadow-sm border border-slate-100">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-tr from-slate-900 to-indigo-900 z-0" />
            
            <div className="relative mt-8 z-10">
              <img 
                src={managerAvatar} 
                alt="Manoranjan avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
              <span className="absolute bottom-1 right-1 bg-indigo-700 text-white p-1 rounded-full border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 relative z-10 w-full">
              <h3 className="text-xl font-black text-slate-950">Manoranjan</h3>
              <p className="text-xs font-bold text-indigo-850 uppercase tracking-wider">Regional Branch Manager</p>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 font-semibold text-xs mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Kolkata HQ Office · EAST_HQ</span>
              </div>
            </div>

            {/* Manager Metadata */}
            <div className="w-full border-t border-slate-100 pt-4 space-y-3.5 text-left text-xs font-semibold text-slate-655">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Briefcase className="w-4 h-4 text-slate-400" /> Employee ID</span>
                <span className="font-bold text-slate-900 font-mono">MN-40281</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><User className="w-4 h-4 text-slate-400" /> Supervisor</span>
                <span className="font-bold text-slate-900">Harshal (VP Sales)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Users className="w-4 h-4 text-slate-400" /> Managed Team</span>
                <span className="font-bold text-slate-900">6 Area Managers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-455"><Award className="w-4 h-4 text-slate-400" /> Branch Rank</span>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded text-[10px]">Rank #2 nationally</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Configurations and Overrides */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Branch configuration overrides */}
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 select-none">
              <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-955">Branch Control Settings</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Configure target thresholds and rules for East Zone</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Option 1 */}
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <div className="space-y-0.5 text-left">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase">Allow Outstanding Overdraft</h4>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Let critical status distributors bypass ledger checks for active slab weeks.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowOverdraft(!allowOverdraft)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    allowOverdraft ? 'bg-indigo-700' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    allowOverdraft ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              {/* Option 2 */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                <div className="flex justify-between items-center select-none">
                  <div className="space-y-0.5 text-left">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase font-sans">Stretch Primary Target Threshold</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">Adjust the multiplier goals cap for ASM incentives.</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-755 bg-indigo-50 px-2 py-0.5 rounded-full font-mono">
                    {primaryTargetCap}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="90" 
                  max="130" 
                  step="5"
                  value={primaryTargetCap}
                  onChange={(e) => setPrimaryTargetCap(Number(e.target.value))}
                  className="w-full accent-indigo-700 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Active Q4 configuration */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 select-none pb-2 border-b border-slate-100">
              <Layers className="w-5 h-5 text-indigo-750" />
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">Active Region Slab Structures</h4>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between items-center font-semibold text-slate-650">
                <span>Min 60% (Jan+Feb) &amp; 110% Q4 Target</span>
                <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">3.0% Commission</span>
              </div>
              <div className="py-2.5 flex justify-between items-center font-semibold text-slate-650">
                <span>Min 60% (Jan+Feb) &amp; 100% Q4 Target</span>
                <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">2.5% Commission</span>
              </div>
              <div className="py-2.5 flex justify-between items-center font-semibold text-slate-650">
                <span>Min 50% (Jan+Feb) &amp; 100% Q4 Target</span>
                <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">2.0% Commission</span>
              </div>
            </div>
          </div>

        </section>

      </div>
    </motion.div>
  );
}
