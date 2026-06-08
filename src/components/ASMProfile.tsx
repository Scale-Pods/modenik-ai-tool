import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  Users, 
  TrendingUp, 
  Calculator, 
  ShieldCheck, 
  Briefcase, 
  Award,
  Sparkles
} from 'lucide-react';

interface ASMProfileProps {
  onLogout: () => void;
}

export default function ASMProfile({ onLogout }: ASMProfileProps) {
  const [selectedDistributor, setSelectedDistributor] = useState<'UP_DB' | 'NAGAR_DB' | 'BIHAR_DB' | 'APTL_DB'>('UP_DB');
  const [additionalPrimary, setAdditionalPrimary] = useState<number>(15); // in Lakhs

  // Mock distributors database
  const distributorsData = {
    UP_DB: { name: 'UP DB (1004821)', currentPrimary: 16000000, nextSlabAt: 20000000 },
    NAGAR_DB: { name: 'Nagar DB (1002910)', currentPrimary: 9500000, nextSlabAt: 12000000 },
    BIHAR_DB: { name: 'Bihar DB (1005247)', currentPrimary: 11000000, nextSlabAt: 15000000 },
    APTL_DB: { name: 'APTL DB (1005672)', currentPrimary: 18000000, nextSlabAt: 22000000 },
  };

  const activeDB = distributorsData[selectedDistributor];
  const additionalValBytes = additionalPrimary * 100000;
  const newTotalPrimary = activeDB.currentPrimary + additionalValBytes;
  
  const isSlabMet = newTotalPrimary >= activeDB.nextSlabAt;
  const payoutRate = isSlabMet ? 2.5 : 1.8;
  const projectedEarning = Math.round(newTotalPrimary * (payoutRate / 100));
  const incrementalEarning = projectedEarning - Math.round(activeDB.currentPrimary * (1.8 / 100));

  const asmAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-left"
    >
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">ASM Profile Command Center</h2>
          <p className="text-sm font-semibold text-slate-500">Personal performance tracker and slab simulator</p>
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
        
        {/* Left Column: ASM info card */}
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col items-center text-center gap-6 shadow-sm border border-slate-100">
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-tr from-slate-900 to-blue-900 z-0" />
            
            <div className="relative mt-8 z-10">
              <img 
                src={asmAvatar} 
                alt="Rakesh avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
              <span className="absolute bottom-1 right-1 bg-blue-700 text-white p-1 rounded-full border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 relative z-10 w-full">
              <h3 className="text-xl font-black text-slate-950">Rakesh Kumar Parida</h3>
              <p className="text-xs font-bold text-blue-750 uppercase tracking-wider">Area Sales Manager (ASM)</p>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 font-semibold text-xs mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Odisha Zone · GTM_EAST</span>
              </div>
            </div>

            {/* ASM Metadata details */}
            <div className="w-full border-t border-slate-100 pt-4 space-y-3.5 text-left text-xs font-semibold text-slate-600">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Briefcase className="w-4 h-4 text-slate-400" /> Employee ID</span>
                <span className="font-bold text-slate-900 font-mono">RK-30129</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><User className="w-4 h-4 text-slate-400" /> Supervisor</span>
                <span className="font-bold text-slate-900">Manoranjan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Users className="w-4 h-4 text-slate-405" /> Distributors</span>
                <span className="font-bold text-slate-900">18 Accounts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-455"><Award className="w-4 h-4 text-slate-400" /> Commission Slab</span>
                <span className="bg-blue-50 text-blue-700 font-extrabold px-2.5 py-0.5 rounded text-[10px]">Tier A Achiever</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Interactive Simulator */}
        <section className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 select-none">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950">Target &amp; Incentive Planner</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Drag target values to simulate slab commissions</p>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-505 uppercase tracking-wider pl-1">
                  Select Distributor
                </label>
                <select 
                  value={selectedDistributor}
                  onChange={(e) => setSelectedDistributor(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-805 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-700 transition-colors"
                >
                  <option value="UP_DB">UP DB (Lucknow North Zone)</option>
                  <option value="NAGAR_DB">Nagar DB (Nasik, MH Zone)</option>
                  <option value="BIHAR_DB">Bihar DB (Patna, Bihar Zone)</option>
                  <option value="APTL_DB">APTL DB (Cuttack, Odisha Zone)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center pl-1 select-none">
                  <label className="text-xs font-bold text-slate-505 uppercase tracking-wider">
                    Simulate Additional Volume
                  </label>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    +₹{additionalPrimary} L
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="80" 
                  step="5"
                  value={additionalPrimary}
                  onChange={(e) => setAdditionalPrimary(Number(e.target.value))}
                  className="w-full accent-blue-700 h-2 bg-slate-105 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold select-none px-1">
                  <span>+₹0 L</span>
                  <span>+₹40 L</span>
                  <span>+₹80 L</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Total Sales</span>
                  <span className="text-lg font-black text-slate-900 font-mono">₹{(newTotalPrimary / 10000000).toFixed(2)} Cr</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Slab Goal</span>
                  <span className="text-lg font-black text-slate-600 font-mono">₹{(activeDB.nextSlabAt / 10000000).toFixed(2)} Cr</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                isSlabMet 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-950' 
                  : 'bg-amber-50 border-amber-100 text-amber-955'
              }`}>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    {isSlabMet ? (
                      <>
                        <Sparkles className="w-5 h-5 text-emerald-600 animate-bounce" />
                        <span>Milestone Succeeded!</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5 text-amber-600" />
                        <span>Required: +₹{((activeDB.nextSlabAt - newTotalPrimary) / 100000).toFixed(0)} L</span>
                      </>
                    )}
                  </h4>
                  <p className="text-xs text-current/75">
                    {isSlabMet ? 'Unlocked 2.5% incentive slab!' : 'Earning basic 1.8% payout rate.'}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <p className="text-[10px] text-current/60 font-bold uppercase tracking-wider">Projected Payout</p>
                  <p className="text-2xl font-black text-slate-900 font-mono">₹{(projectedEarning / 100000).toFixed(2)} L</p>
                  <p className={`text-[10px] font-bold mt-1 ${isSlabMet ? 'text-emerald-700' : 'text-amber-705'}`}>
                    {incrementalEarning > 0 ? `+₹${(incrementalEarning / 100000).toFixed(2)} L extra` : 'No increase'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
