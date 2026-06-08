import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Store, 
  ShieldAlert, 
  CheckCircle, 
  TrendingUp, 
  Map, 
  UserCheck, 
  IndianRupee,
  Lock,
  Unlock
} from 'lucide-react';

export default function ManagerAnalyticsHub() {
  const [creditLocks, setCreditLocks] = useState([
    { id: 'BIHAR_DB', name: 'Bihar DB (1005247)', zone: 'Patna, Bihar', overdue: '₹20 L', days: 54, status: 'LOCKED' },
    { id: 'NAGAR_DB', name: 'Nagar DB (1002910)', zone: 'Nasik, MH', overdue: '₹8.5 L', days: 42, status: 'LOCKED' },
    { id: 'UP_DB', name: 'UP DB (1004821)', zone: 'Lucknow, UP', overdue: '₹0 L', days: 0, status: 'CLEARED' },
  ]);

  const handleReleaseLock = (id: string) => {
    setCreditLocks(prev => prev.map(lock => 
      lock.id === id ? { ...lock, status: 'RELEASED', overdue: '₹0 L', days: 0 } : lock
    ));
  };

  const zonePerformance = [
    { zone: 'Odisha Zone', asm: 'Rakesh Parida', primarySales: '₹4.8 Cr', target: '₹5.0 Cr', ach: 96, stockCover: '12 Days', health: 'OPTIMAL' },
    { zone: 'Bihar Zone 1', asm: 'Amar Kumar', primarySales: '₹3.6 Cr', target: '₹4.0 Cr', ach: 90, stockCover: '8 Days', health: 'STABLE' },
    { zone: 'West Bengal', asm: 'Ajay Sen', primarySales: '₹5.8 Cr', target: '₹6.5 Cr', ach: 89, stockCover: '14 Days', health: 'OPTIMAL' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Regional Analytics &amp; Distributors Hub</h2>
        <p className="text-sm font-semibold text-slate-500">Aggregate metrics, stock covers, and credit blockage release controls</p>
      </div>

      {/* KPI stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[120px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Outlets</span>
          <div>
            <p className="text-2xl font-black text-slate-900">6,420 Outlets</p>
            <p className="text-xs text-emerald-600 font-bold">+8% MTD Growth</p>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[120px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Branch Stock Cover</span>
          <div>
            <p className="text-2xl font-black text-slate-900">11.4 Days</p>
            <p className="text-xs text-blue-700 font-bold">Standard: 12 Days</p>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[120px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credit Risk Outstanding</span>
          <div>
            <p className="text-2xl font-black text-slate-900">₹28.5 Lakhs</p>
            <p className="text-xs text-red-600 font-bold">2 Locks Awaiting Release</p>
          </div>
        </div>
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 min-h-[120px]">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">NPD Contribution</span>
          <div>
            <p className="text-2xl font-black text-slate-900">22.4%</p>
            <p className="text-xs text-emerald-600 font-bold">Target: 20%</p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Zone performance list */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center select-none">
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">Zone Performance Table</h3>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-505 font-bold uppercase select-none">
                  <th className="px-5 py-3">Zone / Territory</th>
                  <th className="px-5 py-3">ASM Name</th>
                  <th className="px-5 py-3 text-right">Ach %</th>
                  <th className="px-5 py-3">Stock Cover</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {zonePerformance.map((zp) => (
                  <tr key={zp.zone} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">{zp.zone}</td>
                    <td className="px-5 py-4 text-slate-500 font-semibold">{zp.asm}</td>
                    <td className="px-5 py-4 text-right font-black text-blue-750">{zp.ach}%</td>
                    <td className="px-5 py-4 text-slate-500 font-mono">{zp.stockCover}</td>
                    <td className="px-5 py-4">
                      <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[9px]">
                        {zp.health}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Credit blockage overrides */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="flex items-center gap-2 select-none border-b border-slate-100 pb-3">
              <ShieldAlert className="w-5 h-5 text-red-650 animate-pulse" />
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-widest">Active Credit Block overrides</h4>
            </div>

            <div className="space-y-4">
              {creditLocks.map((lock) => (
                <div key={lock.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h5 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      {lock.status === 'LOCKED' ? <Lock className="w-3.5 h-3.5 text-red-600" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{lock.name}</span>
                    </h5>
                    <p className="text-[10px] text-slate-550 font-semibold">
                      Overdue: <strong className="text-slate-800">{lock.overdue}</strong> · Days: <strong className="text-slate-800">{lock.days}d</strong>
                    </p>
                  </div>

                  {lock.status === 'LOCKED' ? (
                    <button 
                      type="button"
                      onClick={() => handleReleaseLock(lock.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-emerald-600 text-white font-black text-[10px] rounded-lg shadow-sm transition-colors active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      Release override
                    </button>
                  ) : lock.status === 'RELEASED' ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-850 font-black px-2 py-1 rounded uppercase tracking-wider">
                      Released ✓
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded uppercase tracking-wider select-none">
                      Cleared
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </motion.div>
  );
}
