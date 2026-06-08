/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cable, 
  LineChart, 
  Download, 
  Filter, 
  CheckCircle2, 
  FileSpreadsheet, 
  Rocket, 
  ArrowRight,
  Store,
  Users,
  QrCode,
  BrainCircuit,
  Coins,
  Gift,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SecondarySales } from '../data';

export default function Phase23Preview() {
  const [activeTab, setActiveTab] = useState<'phase2' | 'phase3'>('phase2');
  const [earlyAccessRequested, setEarlyAccessRequested] = useState(false);

  return (
    <div className="space-y-6 text-left">
      
      {/* Tab Switcher Selector */}
      <div className="flex border-b border-slate-100 select-none pb-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('phase2')}
          className={`px-6 py-3 font-extrabold text-sm tracking-tight relative transition-all ${
            activeTab === 'phase2' ? 'text-blue-700' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Phase 2: Secondary Sales</span>
          {activeTab === 'phase2' && (
            <motion.div 
              layoutId="phaseActiveTabLine"
              className="absolute bottom-0 inset-x-6 h-0.5 bg-blue-700 rounded-full"
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('phase3')}
          className={`px-6 py-3 font-extrabold text-sm tracking-tight relative transition-all ${
            activeTab === 'phase3' ? 'text-blue-700' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Phase 3: Retailer Loyalty</span>
          {activeTab === 'phase3' && (
            <motion.div 
              layoutId="phaseActiveTabLine"
              className="absolute bottom-0 inset-x-6 h-0.5 bg-blue-700 rounded-full"
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: Secondary Sales (Phase 2) */}
        {activeTab === 'phase2' && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Hero Header Banner */}
            <div className="relative overflow-hidden glass-panel rounded-2xl p-8 shadow-sm">
              <div className="absolute top-4 right-[-32px] rotate-45 bg-blue-700 text-white font-extrabold text-[9px] uppercase tracking-widest px-8 py-1 select-none">
                Future Scope
              </div>
              <div className="flex flex-col gap-2 max-w-2xl text-left">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Secondary Sales Intelligence (Phase 2 Preview)
                </h2>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Real-time visibility into distributor-to-retailer sales without DMS dependency. Access actionable insights through non-invasive Tally and Excel connectors.
                </p>
              </div>
            </div>

            {/* Strategic Value Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Pillar 1 */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                  <Cable className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Zero DMS Dependency</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Bypass expensive and slow DMS implementations. Connect directly to existing ERP systems like Tally Prime or SAP Business One in minutes.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                  <motion.div animate={{ rotate: 180 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Non-Invasive Sync</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Automated lightweight connectors extract sales data without disturbing distributor operations or compromising local data privacy.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Sell-Through Analytics</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Monitor retailer-level inventory health and stock-out risks to optimize replenishment cycles and prevent expired inventory returns.
                </p>
              </div>
            </div>

            {/* Simulated Live Dashboard List */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/40">
                <h3 className="text-sm font-black text-slate-950 tracking-tight">
                  Distributor Secondary Sales Dashboard
                </h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-full text-[10px] font-bold text-slate-500 select-none">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 text-white rounded-full text-[10px] font-bold cursor-pointer hover:bg-blue-600 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Export
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto text-left">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold text-[11px] select-none uppercase tracking-wider">
                      <th className="px-6 py-3">Distributor Name</th>
                      <th className="px-6 py-3">Primary (MTD)</th>
                      <th className="px-6 py-3">Secondary (MTD)</th>
                      <th className="px-6 py-3">Closing Stock</th>
                      <th className="px-6 py-3">Sell-Through %</th>
                      <th className="px-6 py-3">Connector Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {SecondarySales.map((entry) => {
                      const connectorStyle = entry.connector === 'Tally Connected'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-500 text-white';

                      return (
                        <tr key={entry.name} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-slate-900">{entry.name}</td>
                          <td className="px-6 py-4 font-medium tabular-nums">{entry.primaryMtd}</td>
                          <td className="px-6 py-4 font-medium tabular-nums">{entry.secondaryMtd}</td>
                          <td className="px-6 py-4 font-semibold text-slate-500 tabular-nums">{entry.closingStock}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                                <div 
                                  className={`h-full rounded-full ${entry.sellThrough > 70 ? 'bg-blue-600' : 'bg-red-500'}`} 
                                  style={{ width: `${entry.sellThrough}%` }}
                                ></div>
                              </div>
                              <span className="font-bold tabular-nums">{entry.sellThrough}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm ${connectorStyle}`}>
                              {entry.connector === 'Tally Connected' ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <FileSpreadsheet className="w-3.5 h-3.5 text-white" />}
                              <span>{entry.connector}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-slate-500 font-semibold text-xs text-center select-none">
                Showing mock data for Phase 2 demonstration purposes. Real-time sync disabled in preview mode.
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: Retailer Loyalty (Phase 3) */}
        {activeTab === 'phase3' && (
          <motion.div
            key="phase3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8 text-left"
          >
            {/* Header section with Early Access button */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-700 text-white font-bold text-[9px] rounded-full uppercase tracking-widest">
                    Future Scope
                  </span>
                  <span className="text-slate-500 font-semibold text-xs">Release v3.0</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Vijeta+ Retailer Loyalty Engine (Phase 3 Preview)
                </h2>
                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                  Revolutionizing retailer engagement through real-time AI bill validation and dynamic tiered rewards structure.
                </p>
              </div>

              <button 
                type="button"
                onClick={() => setEarlyAccessRequested(true)}
                disabled={earlyAccessRequested}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs select-none transition-all active:scale-95 text-white ${
                  earlyAccessRequested ? 'bg-emerald-500' : 'bg-slate-950 hover:bg-blue-700'
                }`}
              >
                {earlyAccessRequested ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Early Access Requested</span>
                  </>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* KPI statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
                <Store className="absolute -right-4 -top-4 text-slate-950/[0.04] w-28 h-28 select-none" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled Retailers</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">12.4k</span>
                  <span className="text-emerald-600 font-bold text-xs">+18%</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">Onboarded across 4 core regions</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
                <QrCode className="absolute -right-4 -top-4 text-slate-950/[0.04] w-28 h-28 select-none" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bills Scanned</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">45k</span>
                  <span className="text-emerald-600 font-bold text-xs">+24%</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">Validated via AI Computer Vision</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
                <Coins className="absolute -right-4 -top-4 text-slate-950/[0.04] w-28 h-28 select-none" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Points Issued</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">1.2M</span>
                  <span className="text-blue-700 font-bold text-xs">Active</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">Redeemable for stock credits</p>
              </div>
            </div>

            {/* Interactive Loyalty Lifecycle Process diagram */}
            <section className="glass-panel p-8 rounded-2xl border-dashed border-2 border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h3 className="text-sm font-bold text-slate-950 tracking-tight uppercase select-none">
                  Loyalty Lifecycle Workflow
                </h3>
                <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span>Live AI Validation Pipeline</span>
                </span>
              </div>

              <div className="relative">
                {/* Horizontal line indicator */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md">
                      <Users className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="space-y-0.5 select-none">
                      <h4 className="text-xs font-bold text-slate-900">1. Register</h4>
                      <p className="text-[10.5px] text-slate-500 px-3">One-tap retailer onboarding.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md">
                      <QrCode className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="space-y-0.5 select-none">
                      <h4 className="text-xs font-bold text-slate-900">2. Scan Bill</h4>
                      <p className="text-[10.5px] text-slate-500 px-3">Mobile OCR capture of bills.</p>
                    </div>
                  </div>

                  {/* Step 3 (AI Validate - ACTIVE!) */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-blue-750 flex items-center justify-center border-4 border-blue-105 shadow-xl relative animate-pulse">
                      <BrainCircuit className="w-6 h-6 text-white" />
                      <Sparkles className="absolute top-[-4px] right-[-4px] w-4 h-4 text-yellow-300 animate-bounce" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-900">3. AI Validate</h4>
                      <p className="text-[10.5px] text-blue-800 font-medium px-3">Fraud check &amp; SKU match.</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md">
                      <Coins className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="space-y-0.5 select-none">
                      <h4 className="text-xs font-bold text-slate-900">4. Points</h4>
                      <p className="text-[10.5px] text-slate-500 px-3">Instant credit to wallet.</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md">
                      <Gift className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="space-y-0.5 select-none">
                      <h4 className="text-xs font-bold text-slate-900">5. Redeem</h4>
                      <p className="text-[10.5px] text-slate-500 px-3">Convert to stock credits.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Multiplier points & forecasts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              {/* Dynamic multiplier bars panel */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">Dynamic Points Architecture</h3>
                  <p className="text-xs text-slate-500 font-semibold">Intelligent multipliers based on volume and consistency.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-20 font-bold text-xs text-slate-500 text-right uppercase">Base</div>
                    <div className="flex-1 h-11 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-150">
                      <div className="absolute left-0 top-0 h-full w-[20%] bg-blue-750/15"></div>
                      <div className="absolute inset-0 flex items-center px-4 justify-between">
                        <span className="text-xs font-extrabold text-slate-900">1X</span>
                        <span className="text-[10px] font-bold text-slate-400">Standard Revenue Share</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 font-bold text-xs text-slate-500 text-right uppercase">Range Bonus</div>
                    <div className="flex-1 h-11 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-150">
                      <div className="absolute left-0 top-0 h-full w-[40%] bg-blue-750/30"></div>
                      <div className="absolute inset-0 flex items-center px-4 justify-between">
                        <span className="text-xs font-extrabold text-slate-900">1.5X</span>
                        <span className="text-[10px] font-bold text-slate-400">Multi-Category Adoption</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 font-bold text-xs text-slate-500 text-right uppercase">Volume Slab</div>
                    <div className="flex-1 h-11 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-150">
                      <div className="absolute left-0 top-0 h-full w-[65%] bg-blue-750/50"></div>
                      <div className="absolute inset-0 flex items-center px-4 justify-between">
                        <span className="text-xs font-extrabold text-blue-900">2.2X</span>
                        <span className="text-[10px] font-bold text-blue-950/70">High Capacity Retailers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 font-bold text-xs text-slate-500 text-right uppercase">Annual</div>
                    <div className="flex-grow h-11 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-150">
                      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-slate-950 to-blue-800"></div>
                      <div className="absolute inset-0 flex items-center px-4 justify-between text-white">
                        <span className="text-xs font-black">5.0X</span>
                        <span className="text-[10px] font-bold text-white/80">Loyalty Milestone Accelerator</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast preview */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between bg-gradient-to-tr from-slate-950 to-blue-900 text-white relative overflow-hidden group shadow-md shrink-0">
                <div className="absolute top-0 right-0 w-44 h-44 bg-blue-600/20 rounded-full blur-2xl transform" />
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-black tracking-tight text-white mb-1">AI-Powered Forecasting</h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Phase 3 will introduce predictive redemption patterns, allowing you to anticipate inventory spikes and tailor loyalty rewards to local demand peaks automatically.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md relative z-10 flex items-center gap-3">
                  <div className="p-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white">99.8% Accuracy</span>
                    <span className="text-[9px] text-white/55 font-bold uppercase tracking-wider">Current Beta Validation Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
