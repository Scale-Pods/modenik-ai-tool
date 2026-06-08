import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Target, 
  Sparkles, 
  MapPin, 
  Users, 
  Percent, 
  TrendingUp, 
  IndianRupee, 
  Calculator, 
  ShieldCheck, 
  Briefcase, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Role } from '../types';

interface ProfileProps {
  role: Role;
  onLogout: () => void;
}

export default function Profile({ role, onLogout }: ProfileProps) {
  // Simulator States for ASM Target & Incentive Planner
  const [selectedDistributor, setSelectedDistributor] = useState<'UP_DB' | 'NAGAR_DB' | 'BIHAR_DB' | 'APTL_DB'>('UP_DB');
  const [additionalPrimary, setAdditionalPrimary] = useState<number>(15); // in Lakhs

  // Mock distributors database
  const distributorsData = {
    UP_DB: { name: 'UP DB (1004821)', currentPrimary: 16000000, nextSlabAt: 20000000, basePayout: 320000, targetPayout: 400000 },
    NAGAR_DB: { name: 'Nagar DB (1002910)', currentPrimary: 9500000, nextSlabAt: 12000000, basePayout: 190000, targetPayout: 300000 },
    BIHAR_DB: { name: 'Bihar DB (1005247)', currentPrimary: 11000000, nextSlabAt: 15000000, basePayout: 220000, targetPayout: 375000 },
    APTL_DB: { name: 'APTL DB (1005672)', currentPrimary: 18000000, nextSlabAt: 22000000, basePayout: 360000, targetPayout: 550000 },
  };

  const activeDB = distributorsData[selectedDistributor];
  const additionalValBytes = additionalPrimary * 100000;
  const newTotalPrimary = activeDB.currentPrimary + additionalValBytes;
  
  // Calculate payout percentage and payout value
  const isSlabMet = newTotalPrimary >= activeDB.nextSlabAt;
  const payoutRate = isSlabMet ? 2.5 : 1.8;
  const projectedEarning = Math.round(newTotalPrimary * (payoutRate / 100));
  const incrementalEarning = projectedEarning - Math.round(activeDB.currentPrimary * (1.8 / 100));

  // Professional Unsplash profile headshots instead of AI faces
  const asmAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
  const managerAvatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-left"
    >
      {/* 1. Header context banner */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Profile</h2>
          <p className="text-sm font-semibold text-slate-500">
            {role === 'ASM' ? 'Area Sales Manager Command Center' : 'Regional Branch Manager Command Center'}
          </p>
        </div>

        <button 
          type="button"
          onClick={onLogout}
          className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-650 rounded-xl font-bold text-xs transition-colors self-start sm:self-center"
        >
          Sign Out of Account
        </button>
      </section>

      {/* 2. Main Profile split view layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Role Details Card */}
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col items-center text-center gap-6 shadow-sm border border-slate-100">
            {/* Background design bleed */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-tr from-slate-900 to-blue-900 z-0" />
            
            <div className="relative mt-8 z-10">
              <img 
                src={role === 'ASM' ? asmAvatar : managerAvatar} 
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
              <span className="absolute bottom-1 right-1 bg-blue-700 text-white p-1 rounded-full border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 relative z-10 w-full">
              <h3 className="text-xl font-black text-slate-955">
                {role === 'ASM' ? 'Rakesh Kumar Parida' : 'Manoranjan'}
              </h3>
              <p className="text-xs font-bold text-blue-750 uppercase tracking-wider">
                {role === 'ASM' ? 'Area Sales Manager · Odisha' : 'Regional Branch Manager · East Branch'}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 font-semibold text-xs mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{role === 'ASM' ? 'Bhubaneswar Zone' : 'Kolkata HQ Office'}</span>
              </div>
            </div>

            {/* Role details table list */}
            <div className="w-full border-t border-slate-100 pt-4 space-y-3.5 text-left text-xs font-semibold text-slate-650">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Briefcase className="w-4 h-4 text-slate-400" /> Employee ID</span>
                <span className="font-bold text-slate-900 font-mono">MN-40281</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-450"><Users className="w-4 h-4 text-slate-400" /> Branch</span>
                <span className="font-bold text-slate-900">{role === 'ASM' ? 'GTM_EAST' : 'EAST_HQ'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-455"><User className="w-4 h-4 text-slate-400" /> Supervisor</span>
                <span className="font-bold text-slate-900">{role === 'ASM' ? 'Manoranjan' : 'Harshal (VP Sales)'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-slate-455"><Award className="w-4 h-4 text-slate-400" /> Performance Bracket</span>
                <span className="bg-emerald-100 text-emerald-808 font-bold px-2 py-0.5 rounded text-[10px]">Tier A (Exceeding)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right column: Role-specific Content Panels */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* ASM Profile Content: Target & Incentive Planner */}
          {role === 'ASM' ? (
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 select-none">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-955">Target &amp; Incentive Planner</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Interactive Slab Simulator for client negotiations</p>
                </div>
              </div>

              {/* Form parameters */}
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
                      Additional Primary Target
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
                    className="w-full accent-blue-700 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold select-none px-1">
                    <span>+₹0 L (No change)</span>
                    <span>+₹40 L (Target)</span>
                    <span>+₹80 L (Stretch)</span>
                  </div>
                </div>

                {/* Calculation breakdown summary */}
                <div className="grid grid-cols-2 gap-4 border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      New Total Sales
                    </span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      ₹{(newTotalPrimary / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Next Slab Target
                    </span>
                    <span className="text-lg font-black text-slate-600 font-mono">
                      ₹{(activeDB.nextSlabAt / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                </div>

                {/* Projection results visual block */}
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
                          <span>Slab Unlock Met!</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5 text-amber-600" />
                          <span>Increase order by ₹{((activeDB.nextSlabAt - newTotalPrimary) / 100000).toFixed(0)} L to unlock</span>
                        </>
                      )}
                    </h4>
                    <p className="text-xs text-current/75">
                      {isSlabMet 
                        ? 'Projected payout rate boosted to 2.5% for all sales.' 
                        : 'Currently earning basic 1.8% rate on this volume.'
                      }
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <p className="text-[10px] text-current/60 font-bold uppercase tracking-wider">Projected Earnings</p>
                    <p className="text-2xl font-black text-slate-900 font-mono">
                      ₹{(projectedEarning / 100000).toFixed(2)} L
                    </p>
                    <p className={`text-[10px] font-bold mt-1 ${isSlabMet ? 'text-emerald-700' : 'text-amber-705'}`}>
                      {incrementalEarning > 0 ? `+₹${(incrementalEarning / 100000).toFixed(2)} L extra` : 'No increase'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Manager Profile Content: Team Summary & Branch Statistics */
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 select-none">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-955">East Branch Team Summary</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Management performance metrics</p>
                </div>
              </div>

              {/* Grid statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active ASMs</span>
                  <span className="text-xl font-black text-slate-900 font-mono">6 Sales leaders</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Distributors</span>
                  <span className="text-xl font-black text-slate-900 font-mono">92 Outlets</span>
                </div>
              </div>

              {/* Slab structure configuration view */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-550 uppercase tracking-widest">Active Q4 Slab Configuration</h4>
                
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex justify-between items-center font-semibold text-slate-600">
                    <span>Tier 1: Min 60% (Jan+Feb) &amp; 110% Q4 Target</span>
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">3.0% Payout</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center font-semibold text-slate-600">
                    <span>Tier 2: Min 60% (Jan+Feb) &amp; 100% Q4 Target</span>
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">2.5% Payout</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center font-semibold text-slate-600">
                    <span>Tier 3: Min 50% (Jan+Feb) &amp; 100% Q4 Target</span>
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">2.0% Payout</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center font-semibold text-slate-600">
                    <span>Tier 4: Min 80% of Full Q4 Target</span>
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">1.0% Payout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
