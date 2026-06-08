/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle, 
  IndianRupee,
  Layers, 
  Sparkles,
  Search,
  PackageCheck
} from 'lucide-react';
import { SKUs } from '../data';

interface DistributorDetailsProps {
  onOpenBattleCard: (distributorName: string) => void;
  searchFilter: string;
}

export default function DistributorDetails({
  onOpenBattleCard,
  searchFilter
}: DistributorDetailsProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const earnings = [
    { label: 'Base Margin', value: '₹4.2 L', color: 'bg-blue-600' },
    { label: 'QPS', value: '₹1.8 L', color: 'bg-blue-400' },
    { label: 'DkG', value: '₹0.6 L', color: 'bg-indigo-900' },
    { label: 'Vijeta', value: '₹1.1 L', color: 'bg-blue-500' }
  ];

  const salesTrendData = [
    { week: 'W1', value: 80, actual: '₹35 L', target: '₹40 L' },
    { week: 'W2', value: 92, actual: '₹42 L', target: '₹40 L' },
    { week: 'W3', value: 60, actual: '₹28 L', target: '₹40 L' },
    { week: 'W4', value: 85, actual: '₹38 L', target: '₹40 L' },
    { week: 'W5', value: 40, actual: '₹18 L', target: '₹40 L' }
  ];

  const filteredSKUs = SKUs.filter(sku => 
    sku.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    sku.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* 1. Header Breadcrumbs navigation & Health Score dial */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <nav className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs mb-1.5">
            <span className="hover:text-blue-600 cursor-pointer">Distributors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-blue-600 cursor-pointer">Nagar, UP</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">UP DB (1004821)</h1>
            <span className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Active
            </span>
          </div>
        </div>

        {/* Health Score widget */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-4 hover:shadow-indigo-50 border border-slate-100">
          <div className="relative w-14 h-14 shrink-0">
            {/* SVG circle meter */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
              <circle 
                className="stroke-blue-700 transition-all duration-1000" 
                cx="18" 
                cy="18" 
                fill="none" 
                r="16" 
                strokeDasharray="100" 
                strokeDashoffset="22" // 78% health score
                strokeWidth="3.2" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-black text-slate-900">78</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
              Health Score
            </p>
            <p className="text-sm font-extrabold text-blue-750">
              Optimal Performance
            </p>
          </div>
        </div>
      </section>

      {/* 2. Top row: Slab progress & Payment risks */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card: Slab & Milestone Engine */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-base font-black text-slate-950 tracking-tight mb-0.5">
                Slab &amp; Milestone Engine
              </h2>
              <p className="text-xs text-slate-500 font-semibold tracking-wide">
                Primary Sales Incentives Projection
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-blue-700 blink-pulse" />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-black text-slate-900">₹1.60 Cr</span>
              <span className="text-xs font-bold text-slate-500">Goal: ₹2.00 Cr</span>
            </div>
            
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1 }}
                className="h-full slab-gradient rounded-full shadow-[0_0_12px_rgba(56,107,239,0.3)]"
              />
            </div>
          </div>

          {/* Actionable highlight banner */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-150/40 flex items-start gap-3">
            <div className="bg-slate-950 text-white p-2 rounded-lg shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-xs text-slate-800 font-medium">
                <strong>₹40 L more primary</strong> unlocks ₹2 L extra earning
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                Deadline: 5 days remaining in cycle
              </p>
            </div>
          </div>
        </div>

        {/* Card: Payment & Risk */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-slate-950 tracking-tight mb-4">
              Payment &amp; Risk
            </h2>
            
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60 text-left">
              <div>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                  Outstanding
                </p>
                <p className="text-2xl font-black text-emerald-950">₹0</p>
              </div>
              <CheckCircle className="w-10 h-10 text-emerald-500 shrink-0" />
            </div>
          </div>

          <div className="mt-6 text-left">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Risk Assessment
            </p>
            
            <div className="flex items-center gap-1">
              <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full border border-slate-200"></div>
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full border border-slate-200"></div>
              <span className="ml-2.5 text-xs font-extrabold text-emerald-700 tracking-wide">
                Low Risk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mid Row: Earning levers & Sales Trends chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Earning Levers Card */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6">
          <h2 className="text-base font-black text-slate-950 tracking-tight mb-6">
            Earning Levers
          </h2>

          <div className="space-y-4">
            {earnings.map((e) => (
              <div key={e.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${e.color}`} />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{e.label}</span>
                </div>
                <span className="text-sm font-black text-slate-900 tabular-nums">
                  {e.value}
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-black text-slate-950">Total Earnings</span>
              <span className="text-lg font-black text-blue-700">₹7.7 L</span>
            </div>
          </div>
        </div>

        {/* Custom Weekly Sales Trend SVG Graph */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-black text-slate-950 tracking-tight">
              Sales Trends (Primary)
            </h2>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Actual
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Target
                </span>
              </div>
            </div>
          </div>

          {/* Graph visual area (Fully custom animated and interactive React solution) */}
          <div className="h-44 w-full flex items-end justify-between gap-5 px-4 pt-4 border-b border-slate-100 relative">
            {salesTrendData.map((data, idx) => (
              <div 
                key={data.week} 
                className="flex-1 h-full flex flex-col justify-end relative group cursor-pointer"
                onMouseEnter={() => setHoveredWeek(idx)}
                onMouseLeave={() => setHoveredWeek(null)}
              >
                {/* Back Target Bar block */}
                <div className="absolute bottom-0 w-full h-[85%] bg-slate-100 rounded-t-lg border-t border-slate-200" />

                {/* Front Actual progress bar block */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${data.value}%` }}
                  transition={{ delay: idx * 0.05, type: 'spring', stiffness: 120 }}
                  className="absolute bottom-0 w-full bg-blue-600/20 border-t-2 border-blue-600 rounded-t-lg group-hover:bg-blue-600/35 transition-all"
                />

                {/* Visual indicator popup on hover */}
                {hoveredWeek === idx && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] font-bold py-1 px-2.5 rounded shadow-lg z-20 whitespace-nowrap"
                  >
                    Actual: {data.actual} (Trgt: {data.target})
                  </motion.div>
                )}

                {/* Bottom week tag */}
                <span className="absolute bottom-[-24px] w-full text-center text-[10px] font-bold text-slate-400">
                  {data.week}
                </span>
              </div>
            ))}
          </div>

          <div className="h-4"></div>
        </div>
      </section>

      {/* 4. Product Mix catalog table */}
      <section className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/40">
          <h2 className="text-base font-black text-slate-950 tracking-tight">
            Product Mix &amp; NPD Performance
          </h2>
          <button 
            type="button"
            onClick={() => onOpenBattleCard('UP DB')}
            className="bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 hover:bg-blue-800 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Generate Battle Card</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold text-xs border-b border-slate-100 select-none">
                <th className="px-6 py-3.5">SKU Name</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5 text-right">Current Sales</th>
                <th className="px-6 py-3.5">Contribution</th>
                <th className="px-6 py-3.5 text-right">Growth</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSKUs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium bg-white">
                    No SKUs found matching your filter parameters.
                  </td>
                </tr>
              ) : (
                filteredSKUs.map((sku) => {
                  const statusColor = sku.status === 'HIGH MOMENTUM' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : sku.status === 'STABLE' 
                    ? 'bg-blue-105 text-blue-800' 
                    : 'bg-red-100 text-red-800';

                  return (
                    <tr key={sku.name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{sku.name}</span>
                          {sku.name.includes('Josh') && (
                            <span className="bg-slate-950 text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase">
                              NPD
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-semibold">{sku.type}</td>
                      <td className="px-6 py-4 text-right font-black text-slate-900 tabular-nums">
                        {sku.sales}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-1.5 bg-slate-150/60 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-700 rounded-full" style={{ width: `${sku.contribution}%` }}></div>
                          </div>
                          <span className="font-bold text-slate-500">{sku.contribution}%</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-right font-black tabular-nums ${sku.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {sku.growth}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full select-none ${statusColor}`}>
                          {sku.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
