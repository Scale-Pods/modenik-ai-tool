/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Compass, 
  ArrowRight,
  TrendingUpIcon,
  Crown
} from 'lucide-react';
import { ASMLeaderboard } from '../data';

interface ManagerCockpitProps {
  searchFilter: string;
  onNavigateToReports?: () => void;
}

export default function ManagerCockpit({ searchFilter, onNavigateToReports }: ManagerCockpitProps) {
  const [hoveredLeader, setHoveredLeader] = useState<number | null>(null);

  const statesGrowth = [
    { name: 'Odisha', value: '+12.4%', percentage: 85, color: 'bg-emerald-600' },
    { name: 'Bihar', value: '+8.1%', percentage: 60, color: 'bg-blue-650' },
    { name: 'West Bengal', value: '+2.4%', percentage: 25, color: 'bg-slate-400' }
  ];

  const filteredLeaderboard = ASMLeaderboard.filter(member => 
    member.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    member.state.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* 1. Header Information */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs mb-1.5">
            <span>Region</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-secondary font-bold">East Branch</span>
          </nav>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manager Cockpit</h2>
          <p className="text-sm font-semibold text-slate-500">Executive Overview for Manoranjan</p>
        </div>

        {/* Calendar period index */}
        <div className="flex gap-2">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100 shadow-sm">
            <Calendar className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold text-slate-700">Q3 FY24 - October</span>
          </div>
        </div>
      </section>

      {/* 2. Team KPI Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI Card 1: Total Primary vs Target */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Primary vs Target
            </span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹14.2 Cr</span>
            <span className="text-xs font-bold text-slate-400">/ ₹15.5 Cr</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 mt-1 border border-slate-200">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '91.6%' }}></div>
          </div>
          <p className="text-xs text-slate-500 font-bold mt-1">
            91.6% Achievement · <span className="text-emerald-600">+4.2% YoY</span>
          </p>
        </div>

        {/* KPI Card 2: % ASMs on Track */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              % ASMs on Track
            </span>
            <Compass className="w-5 h-5 text-indigo-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">84%</span>
            <span className="text-xs font-bold text-slate-400">Active</span>
          </div>
          {/* Slabs alignment indicators */}
          <div className="flex gap-1.5 mt-1.5 select-none">
            <div className="h-2 w-full rounded bg-blue-700"></div>
            <div className="h-2 w-full rounded bg-blue-700"></div>
            <div className="h-2 w-full rounded bg-blue-700"></div>
            <div className="h-2 w-full rounded bg-blue-700"></div>
            <div className="h-2 w-full rounded bg-slate-100 border border-slate-205"></div>
          </div>
          <p className="text-xs text-slate-500 font-bold mt-1">
            5 of 6 ASMs exceeding 85% Ach
          </p>
        </div>

        {/* KPI Card 3: Total Slab Upside (Highlight!) */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3 border-l-4 border-l-blue-600 hover:scale-[1.01] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Total Slab Upside
            </span>
            <Crown className="w-5 h-5 text-orange-500 animate-bounce" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">₹3.2 Cr</span>
            <span className="text-xs font-bold text-slate-400">Opportunity</span>
          </div>
          {/* Small graphical ladder blocks */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="h-2 flex-grow rounded-sm bg-slate-950"></div>
            <div className="h-2 flex-grow rounded-sm bg-blue-800"></div>
            <div className="h-2 flex-grow rounded-sm bg-blue-600"></div>
            <div className="h-2 flex-grow rounded-sm bg-blue-400"></div>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Potential growth by pushing higher slabs
          </p>
        </div>
      </section>

      {/* 3. Mid Row: Leaderboard grid & Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Table of leaders (Left Column) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/40 select-none">
            <h3 className="text-base font-black text-slate-955 tracking-tight">ASM Leaderboard</h3>
            <button 
              type="button"
              onClick={onNavigateToReports}
              className="text-blue-700 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View Detailed Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-505 font-bold text-xs select-none">
                  <th className="px-6 py-3">ASM Name</th>
                  <th className="px-6 py-3">State</th>
                  <th className="px-6 py-3 text-right">Ach %</th>
                  <th className="px-6 py-3">EC/TC/PC</th>
                  <th className="px-6 py-3 text-right">Slab Upside</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeaderboard.map((member, index) => {
                  const badgeColor = member.status === 'EXCELLENT'
                    ? 'bg-emerald-500 text-white'
                    : member.status === 'ON TRACK'
                    ? 'bg-blue-600 text-white'
                    : 'bg-red-600 text-white';

                  return (
                    <tr 
                      key={member.name}
                      onMouseEnter={() => setHoveredLeader(index)}
                      onMouseLeave={() => setHoveredLeader(null)}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xs select-none">
                            {member.initials}
                          </div>
                          <span className="font-bold text-slate-950">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-500">{member.state}</td>
                      <td className="px-6 py-4 text-right font-black text-blue-750 tabular-nums">
                        {member.ach}%
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium tabular-nums">{member.ectcpc}</td>
                      <td className="px-6 py-4 text-right font-black text-slate-900 tabular-nums">{member.upside}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[9px] font-black rounded uppercase tracking-wider ${badgeColor}`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side charts block */}
        <div className="space-y-6 flex flex-col justify-between h-full">
          
          {/* ASM Benchmarking Graph */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-4">
              ASM Ach % Benchmarking
            </h3>

            {/* Custom interactive benchmark bar chart */}
            <div className="h-44 flex items-end justify-between gap-4 pt-4 border-b border-slate-100 relative">
              {filteredLeaderboard.map((member, idx) => {
                const heightVal = member.ach; // Max is near 100%
                const barColor = member.status === 'CRITICAL' ? 'bg-red-500' : 'bg-blue-600';

                return (
                  <div key={member.name} className="flex-grow h-full flex flex-col justify-end items-center relative group">
                    <div className="absolute bottom-0 w-full h-[85%] bg-slate-50 rounded-t border-t border-slate-150" />
                    
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${heightVal}%` }}
                      transition={{ delay: idx * 0.05 }}
                      className={`absolute bottom-0 w-full rounded-t ${barColor} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />

                    {/* Pop value details on hover */}
                    <div className="absolute top-[-24px] bg-slate-950 text-white font-black text-[9px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {member.ach}%
                    </div>

                    <span className="absolute bottom-[-24px] w-full text-center text-[10px] uppercase font-bold text-slate-400 select-none truncate">
                      {member.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-4"></div>
          </div>

          {/* State growth listing */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center select-none">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">State Growth</h3>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Last 30 Days</span>
            </div>

            <div className="space-y-3">
              {statesGrowth.map((s) => (
                <div key={s.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/40 flex justify-between items-center transition-all hover:bg-slate-100/50">
                  <span className="font-extrabold text-slate-800 text-xs">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-emerald-600 tabular-nums">{s.value}</span>
                    <div className="h-1.5 w-16 bg-slate-150 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
