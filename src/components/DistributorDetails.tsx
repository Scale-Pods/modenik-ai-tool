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
  PackageCheck,
  ArrowLeft,
  Eye,
  AlertTriangle
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
  const [selectedDistributorId, setSelectedDistributorId] = useState<string | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  // Dynamic distributors dataset
  const distributorsList = [
    {
      id: 'UP_DB',
      name: 'UP DB (1004821)',
      zone: 'Nagar, UP',
      territory: 'Lucknow North',
      status: 'Active',
      healthScore: 78,
      healthLabel: 'Optimal Performance',
      primarySales: '₹1.60 Cr',
      goalSales: '₹2.00 Cr',
      progressPercentage: '80%',
      progressVal: 80,
      strokeOffset: 22,
      slabUnlockMsg: '₹40 L more primary unlocks ₹2 L extra earning',
      deadlineMsg: 'Deadline: 5 days remaining in cycle',
      outstanding: '₹0',
      riskLevel: 'Low Risk',
      riskBars: 3,
      earnings: [
        { label: 'Base Margin', value: '₹4.2 L', color: 'bg-blue-600' },
        { label: 'QPS', value: '₹1.8 L', color: 'bg-blue-400' },
        { label: 'DkG', value: '₹0.6 L', color: 'bg-indigo-900' },
        { label: 'Vijeta', value: '₹1.1 L', color: 'bg-blue-500' }
      ],
      totalEarnings: '₹7.7 L',
      salesTrendData: [
        { week: 'W1', value: 80, actual: '₹35 L', target: '₹40 L' },
        { week: 'W2', value: 92, actual: '₹42 L', target: '₹40 L' },
        { week: 'W3', value: 60, actual: '₹28 L', target: '₹40 L' },
        { week: 'W4', value: 85, actual: '₹38 L', target: '₹40 L' },
        { week: 'W5', value: 40, actual: '₹18 L', target: '₹40 L' }
      ]
    },
    {
      id: 'NAGAR_DB',
      name: 'Nagar DB (1003498)',
      zone: 'Kanpur Central, UP',
      territory: 'Kanpur Central',
      status: 'Active',
      healthScore: 54,
      healthLabel: 'Attention Required',
      primarySales: '₹84.0 L',
      goalSales: '₹1.00 Cr',
      progressPercentage: '84%',
      progressVal: 84,
      strokeOffset: 46,
      slabUnlockMsg: '₹16 L more primary unlocks ₹80k extra earning',
      deadlineMsg: 'Deadline: 5 days remaining in cycle',
      outstanding: '₹4.8 Lakhs',
      riskLevel: 'High Risk',
      riskBars: 4,
      earnings: [
        { label: 'Base Margin', value: '₹2.1 L', color: 'bg-blue-600' },
        { label: 'QPS', value: '₹0.9 L', color: 'bg-blue-400' },
        { label: 'DkG', value: '₹0.2 L', color: 'bg-indigo-900' },
        { label: 'Vijeta', value: '₹0.5 L', color: 'bg-blue-500' }
      ],
      totalEarnings: '₹3.7 L',
      salesTrendData: [
        { week: 'W1', value: 50, actual: '₹18 L', target: '₹20 L' },
        { week: 'W2', value: 65, actual: '₹22 L', target: '₹20 L' },
        { week: 'W3', value: 40, actual: '₹15 L', target: '₹20 L' },
        { week: 'W4', value: 70, actual: '₹24 L', target: '₹20 L' },
        { week: 'W5', value: 30, actual: '₹10 L', target: '₹20 L' }
      ]
    },
    {
      id: 'BIHAR_DB',
      name: 'Bihar DB (1005291)',
      zone: 'Patna South, Bihar',
      territory: 'Patna South',
      status: 'Alert',
      healthScore: 88,
      healthLabel: 'Strong Outlets Pull',
      primarySales: '₹1.10 Cr',
      goalSales: '₹1.50 Cr',
      progressPercentage: '73%',
      progressVal: 73,
      strokeOffset: 12,
      slabUnlockMsg: '₹40 L more primary unlocks ₹1.5 L extra earning',
      deadlineMsg: 'Deadline: 6 days remaining in cycle',
      outstanding: '₹0',
      riskLevel: 'Low Risk',
      riskBars: 2,
      earnings: [
        { label: 'Base Margin', value: '₹3.1 L', color: 'bg-blue-600' },
        { label: 'QPS', value: '₹1.2 L', color: 'bg-blue-400' },
        { label: 'DkG', value: '₹0.4 L', color: 'bg-indigo-900' },
        { label: 'Vijeta', value: '₹0.8 L', color: 'bg-blue-500' }
      ],
      totalEarnings: '₹5.5 L',
      salesTrendData: [
        { week: 'W1', value: 70, actual: '₹25 L', target: '₹30 L' },
        { week: 'W2', value: 80, actual: '₹28 L', target: '₹30 L' },
        { week: 'W3', value: 65, actual: '₹22 L', target: '₹30 L' },
        { week: 'W4', value: 90, actual: '₹32 L', target: '₹30 L' },
        { week: 'W5', value: 45, actual: '₹15 L', target: '₹30 L' }
      ]
    },
    {
      id: 'APTL_DB',
      name: 'APTL DB (1007421)',
      zone: 'Varanasi East, UP',
      territory: 'Varanasi East',
      status: 'Active',
      healthScore: 92,
      healthLabel: 'Excellent Performance',
      primarySales: '₹95.0 L',
      goalSales: '₹1.20 Cr',
      progressPercentage: '79%',
      progressVal: 79,
      strokeOffset: 8,
      slabUnlockMsg: '₹25 L more primary unlocks ₹1.2 L extra earning',
      deadlineMsg: 'Deadline: 5 days remaining in cycle',
      outstanding: '₹80,000',
      riskLevel: 'Medium Risk',
      riskBars: 3,
      earnings: [
        { label: 'Base Margin', value: '₹2.8 L', color: 'bg-blue-600' },
        { label: 'QPS', value: '₹1.1 L', color: 'bg-blue-400' },
        { label: 'DkG', value: '₹0.3 L', color: 'bg-indigo-900' },
        { label: 'Vijeta', value: '₹0.7 L', color: 'bg-blue-500' }
      ],
      totalEarnings: '₹4.9 L',
      salesTrendData: [
        { week: 'W1', value: 60, actual: '₹20 L', target: '₹25 L' },
        { week: 'W2', value: 75, actual: '₹24 L', target: '₹25 L' },
        { week: 'W3', value: 55, actual: '₹18 L', target: '₹25 L' },
        { week: 'W4', value: 85, text: 'W4', actual: '₹27 L', target: '₹25 L' },
        { week: 'W5', value: 35, actual: '₹12 L', target: '₹25 L' }
      ]
    }
  ];

  // Filtering list by search input
  const filteredDistributors = distributorsList.filter(d => 
    d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.territory.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.zone.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const selectedDistributor = distributorsList.find(d => d.id === selectedDistributorId);

  const filteredSKUs = SKUs.filter(sku => 
    sku.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    sku.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // SCREEN 1: Distributors Table View
  if (!selectedDistributorId || !selectedDistributor) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 text-left"
      >
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Distributors Directory</h2>
          <p className="text-sm font-semibold text-slate-500">Overview of all active accounts, sales levels, and active milestone progress</p>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase select-none">
                  <th className="px-6 py-4">Distributor Account</th>
                  <th className="px-6 py-4">Territory / Zone</th>
                  <th className="px-6 py-4">MTD Primary Sales</th>
                  <th className="px-6 py-4">Slab Milestone Progress</th>
                  <th className="px-6 py-4">Risk Profile</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                {filteredDistributors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">
                      No accounts match your current search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDistributors.map((d) => {
                    const riskColor = d.riskLevel === 'High Risk'
                      ? 'text-red-650'
                      : d.riskLevel === 'Medium Risk'
                      ? 'text-amber-600'
                      : 'text-emerald-600';

                    return (
                      <tr 
                        key={d.id}
                        onClick={() => setSelectedDistributorId(d.id)}
                        className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4.5">
                          <div>
                            <span className="text-slate-900 font-black text-sm block group-hover:text-blue-700 transition-colors">
                              {d.name}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 inline-block">ID: {d.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div>
                            <span className="text-slate-700 block">{d.territory}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{d.zone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <div>
                            <span className="text-slate-900 font-bold block">{d.primarySales}</span>
                            <span className="text-[10px] text-slate-400 font-medium font-mono">Goal: {d.goalSales}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4.5 w-64">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                              <span>Progress</span>
                              <span>{d.progressPercentage}</span>
                            </div>
                            <div className="w-full bg-slate-105 h-2 rounded-full overflow-hidden border border-slate-200/50 p-0.5">
                              <div className="h-full slab-gradient rounded-full" style={{ width: d.progressPercentage }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`flex items-center gap-1.5 text-xs font-bold ${riskColor}`}>
                            <span className={`w-2 h-2 rounded-full ${d.riskLevel === 'High Risk' ? 'bg-red-500 animate-pulse' : d.riskLevel === 'Medium Risk' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            {d.riskLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDistributorId(d.id);
                            }}
                            className="px-3.5 py-2 bg-slate-100 text-slate-650 hover:bg-blue-600 hover:text-white rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 font-bold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Analyze</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  }

  // SCREEN 2: 360 detailed sheet view loaded with selected distributor data
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* 1. Header Breadcrumbs navigation & Health Score dial */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <nav className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] mb-1.5">
            <span 
              onClick={() => setSelectedDistributorId(null)} 
              className="hover:text-blue-600 cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Distributors</span>
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-blue-600 cursor-pointer">{selectedDistributor.zone}</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{selectedDistributor.name}</h1>
            <span className="bg-blue-600/10 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              {selectedDistributor.status}
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
                strokeDashoffset={selectedDistributor.strokeOffset}
                strokeWidth="3.2" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-base font-black text-slate-900">{selectedDistributor.healthScore}</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
              Health Score
            </p>
            <p className="text-sm font-extrabold text-blue-750">
              {selectedDistributor.healthLabel}
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
              <h2 className="text-base font-black text-slate-955 tracking-tight mb-0.5">
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
              <span className="text-2xl font-black text-slate-900">{selectedDistributor.primarySales}</span>
              <span className="text-xs font-bold text-slate-505">Goal: {selectedDistributor.goalSales}</span>
            </div>
            
            <div className="h-4 w-full bg-slate-105 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${selectedDistributor.progressVal}%` }}
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
                <strong>{selectedDistributor.slabUnlockMsg}</strong>
              </p>
              <p className="text-[10px] text-slate-505 font-semibold mt-0.5">
                {selectedDistributor.deadlineMsg}
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
            
            <div className={`flex items-center justify-between p-4 rounded-2xl border text-left ${selectedDistributor.outstanding === '₹0' ? 'bg-emerald-50 border-emerald-100/60' : 'bg-red-50 border-red-100/60'}`}>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${selectedDistributor.outstanding === '₹0' ? 'text-emerald-800' : 'text-red-850'}`}>
                  Outstanding
                </p>
                <p className={`text-2xl font-black ${selectedDistributor.outstanding === '₹0' ? 'text-emerald-950' : 'text-red-950'}`}>{selectedDistributor.outstanding}</p>
              </div>
              {selectedDistributor.outstanding === '₹0' ? (
                <CheckCircle className="w-10 h-10 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-red-500 shrink-0 animate-bounce" />
              )}
            </div>
          </div>

          <div className="mt-6 text-left">
            <p className="text-xs font-bold text-slate-505 uppercase tracking-wider mb-2">
              Risk Assessment
            </p>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const isLit = i < selectedDistributor.riskBars;
                const barColor = selectedDistributor.riskLevel === 'High Risk' 
                  ? 'bg-red-500' 
                  : selectedDistributor.riskLevel === 'Medium Risk'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500';
                return (
                  <div 
                    key={i} 
                    className={`h-1.5 flex-1 rounded-full ${isLit ? barColor : 'bg-slate-105 border border-slate-200'}`} 
                  />
                );
              })}
              <span className={`ml-2.5 text-xs font-extrabold tracking-wide ${selectedDistributor.riskLevel === 'High Risk' ? 'text-red-700' : selectedDistributor.riskLevel === 'Medium Risk' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {selectedDistributor.riskLevel}
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
            {selectedDistributor.earnings.map((e) => (
              <div key={e.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${e.color}`} />
                  <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">{e.label}</span>
                </div>
                <span className="text-sm font-black text-slate-900 tabular-nums">
                  {e.value}
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-base font-black text-slate-950">Total Earnings</span>
              <span className="text-lg font-black text-blue-700">{selectedDistributor.totalEarnings}</span>
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
                <span className="text-[10px] font-bold text-slate-505 uppercase tracking-widest">
                  Target
                </span>
              </div>
            </div>
          </div>

          {/* Graph visual area */}
          <div className="h-44 w-full flex items-end justify-between gap-5 px-4 pt-4 border-b border-slate-100 relative">
            {selectedDistributor.salesTrendData.map((data, idx) => (
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
            onClick={() => onOpenBattleCard(selectedDistributor.name)}
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
                          <span className="font-bold text-slate-505">{sku.contribution}%</span>
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
