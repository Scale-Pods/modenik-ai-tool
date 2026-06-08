/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Store, 
  Map, 
  Sparkles, 
  ChevronRight, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  BrainCircuit
} from 'lucide-react';
import { DistributorPriorities, InsightFeed } from '../data';
import { DistributorPriority } from '../types';

interface ASMDashboardProps {
  onOpenBattleCard: (distributorName: string) => void;
  onNavigateToDistributor: (distributorId: string) => void;
  searchFilter: string;
  onNavigateToPlanner?: () => void;
}

export default function ASMDashboard({
  onOpenBattleCard,
  onNavigateToDistributor,
  searchFilter,
  onNavigateToPlanner
}: ASMDashboardProps) {
  
  const filteredPriorities = DistributorPriorities.filter(item => 
    item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.territory.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* 1. KPI Ribbon */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: My Q4 Primary */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Q4 Primary</span>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full">
              93%
            </span>
          </div>
          <div className="mt-2 text-left">
            <p className="text-2xl font-black text-slate-900">₹2.07 Cr</p>
            <p className="text-xs text-slate-500 font-medium">Target: ₹2.22 Cr</p>
          </div>
        </div>

        {/* Card 2: Distributors at Risk */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Distributors at Risk</span>
            <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-extrabold rounded-full">
              CRITICAL
            </span>
          </div>
          <div className="mt-2 text-left">
            <p className="text-2xl font-black text-slate-900">
              4 <span className="text-sm font-medium text-slate-400">/ 18</span>
            </p>
            <p className="text-xs text-red-600 font-bold">Impact: ₹32L Est.</p>
          </div>
        </div>

        {/* Card 3: Next Slab Unlock */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Slab Unlock</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mt-2 text-left">
            <p className="text-2xl font-black text-slate-900">₹8.5 L</p>
            <p className="text-xs text-blue-700 font-bold">Available Upside</p>
          </div>
        </div>

        {/* Card 4: Visits This Week */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visits This Week</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
              ON TRACK
            </span>
          </div>
          <div className="mt-2 text-left">
            <p className="text-2xl font-black text-slate-900">
              12 <span className="text-sm font-medium text-slate-400">/ 15</span>
            </p>
            <p className="text-xs text-slate-500 font-medium">Next: UP DB (2 PM)</p>
          </div>
        </div>
      </section>

      {/* 2. Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Today's Priorities List (Left Grid Column) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Today's Priorities</h2>
              <span className="bg-slate-100 text-slate-705 px-2.5 py-0.5 text-xs rounded-full font-bold">
                Action Items
              </span>
            </div>
            
            <button 
              type="button"
              onClick={onNavigateToPlanner}
              className="text-blue-700 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>View Route Map</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredPriorities.length === 0 ? (
              <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 font-medium">
                No priorities match your search filter.
              </div>
            ) : (
              filteredPriorities.map((priority, index) => {
                const urgencyStyle = getUrgencyBadgeStyle(priority.urgency);

                return (
                  <motion.div 
                    key={priority.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-6 group hover:border-blue-600/35 transition-all text-left"
                  >
                    {/* Store avatar placeholder */}
                    <button 
                      type="button"
                      onClick={() => onNavigateToDistributor(priority.id === 'UP_DB' ? 'UP_DB' : 'UP_DB')}
                      className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 hover:bg-blue-50 transition-colors"
                    >
                      <Store className="w-7 h-7 text-blue-700" />
                    </button>

                    {/* Meta info details */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Interactive Title Link to 360 View */}
                        <button
                          type="button"
                          onClick={() => onNavigateToDistributor(priority.id === 'UP_DB' ? 'UP_DB' : 'UP_DB')}
                          className="text-base font-black text-slate-900 hover:text-blue-700 tracking-tight text-left block"
                        >
                          {priority.name}
                        </button>
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded ${urgencyStyle}`}>
                          {priority.urgency}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-500 font-semibold mb-1">
                        Territory: {priority.territory}
                      </p>

                      <p className="text-sm text-slate-800 font-medium flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>{priority.opportunity}</span>
                      </p>
                    </div>

                    {/* Battle Card Trigger CTA */}
                    <div className="flex items-center sm:shrink-0">
                      <button 
                        type="button"
                        onClick={() => onOpenBattleCard(priority.name)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all cursor-pointer active:scale-95"
                      >
                        View Battle Card
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* Right Rail AI Feed (Right Grid Column) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="glass-card-navy p-6 rounded-2xl text-white space-y-6 relative overflow-hidden shadow-xl">
            
            {/* Header */}
            <div className="flex items-center gap-2 select-none">
              <BrainCircuit className="w-6 h-6 text-blue-400 animate-pulse shrink-0" />
              <h3 className="text-base font-black tracking-tight text-white">
                AI Insight Feed
              </h3>
            </div>

            {/* Simulated pipeline items */}
            <div className="space-y-4">
              {InsightFeed.map((insight) => {
                const typeColor = insight.type === 'PAYMENT RISK' 
                  ? 'text-red-400' 
                  : insight.type === 'GROWTH ALERT' 
                  ? 'text-emerald-400' 
                  : 'text-blue-400';

                return (
                  <div 
                    key={insight.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 transition-all hover:bg-white/10"
                  >
                    <div className="flex justify-between items-center text-[10px] font-bold select-none uppercase tracking-wider">
                      <span className={typeColor}>{insight.type}</span>
                      <span className="text-white/60">{insight.confidence}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">
                      {insight.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Interconnected neural nodes preview illustration */}
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbPjU5a7xPzrmWGZsAPYTlTv5fydZrheuOYjU8Re_bppFzpk943SWWeyVQ8SobE85rjmCIMb1JvgHYGob8ayQq-gpceW7LgCLHhtqD09oVOCDE9RjEYFyP-yoICCjC3OWr_x9U0OUL6tc_xl-fl39SPDwMsMy1Ulu_BJ73mxYZshDX1hLA92QFfML2TujJILMs35UrjTDKhbLhEBLQk4F5vh-cOggPP-8j1ihMCXRChZVOSa46tFEtcQQli_a987nBnEx7A840Ucng" 
                alt="Decision Intelligence Graph" 
                className="w-full h-28 object-cover brightness-75 hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-transparent p-2 text-center">
                <span className="text-[10px] font-bold text-white/90">Interconnected Network Insights</span>
              </div>
            </div>

            <button 
              type="button"
              className="btn-shine w-full py-3 border border-white/20 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors text-white"
            >
              Generate Full Insight Report
            </button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

// Utility styling mapper for Urgencies
function getUrgencyBadgeStyle(urgency: string) {
  switch (urgency) {
    case 'HIGH URGENCY':
      return 'bg-red-600 text-white';
    case 'RECOVERY':
      return 'bg-amber-100 text-amber-850';
    case 'GROWTH':
      return 'bg-blue-100 text-blue-900';
    case 'STABLE':
    default:
      return 'bg-emerald-100 text-emerald-800';
  }
}
