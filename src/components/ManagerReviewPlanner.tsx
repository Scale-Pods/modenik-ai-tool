import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  UserCheck,
  ClipboardList
} from 'lucide-react';

export default function ManagerReviewPlanner() {
  const [plannerOptimizing, setPlannerOptimizing] = useState(false);
  const [plannerOptimized, setPlannerOptimized] = useState(false);

  const handleOptimizeRoute = () => {
    setPlannerOptimizing(true);
    setTimeout(() => {
      setPlannerOptimizing(false);
      setPlannerOptimized(true);
    }, 1500);
  };

  const jointVisits = plannerOptimized ? [
    { day: 'Odisha Tour', date: 'Oct 12-13', asm: 'Rakesh Parida', status: 'COMPLETED', purpose: 'Joint audit at Bhubaneswar & Cuttack hubs (Saved 1 day transit)' },
    { day: 'WB central & Bihar', date: 'Oct 15-18', asm: 'Ajay Sen & Amar Kumar', status: 'SCHEDULED', purpose: 'Combined Kolkata survey & Patna inventory meeting (AI Grouped)' },
    { day: 'Assam Border Hub', date: 'Oct 25-26', asm: 'SK Ziaur', status: 'PENDING', purpose: 'Remedial compliance visit for lagging territory' }
  ] : [
    { day: 'Odisha Tour', date: 'Oct 12-14', asm: 'Rakesh Parida', status: 'COMPLETED', purpose: 'Joint audit at Bhubaneswar & Cuttack hubs' },
    { day: 'Bihar review', date: 'Oct 18-20', asm: 'Amar Kumar', status: 'SCHEDULED', purpose: 'Patna warehouse inventory review meeting' },
    { day: 'WB central', date: 'Oct 25-27', asm: 'Ajay Sen', status: 'PENDING', purpose: 'Kolkata central retailer field survey tour' }
  ];

  const asmCompliance = plannerOptimized ? [
    { name: 'Rakesh Parida', coverage: '98%', tcpc: '11.2 / 2.5', compliance: 98, status: 'EXCELLENT' },
    { name: 'Amar Kumar', coverage: '94%', tcpc: '10.5 / 4.0', compliance: 94, status: 'EXCELLENT' },
    { name: 'Ajay Sen', coverage: '92%', tcpc: '13.1 / 6.0', compliance: 92, status: 'EXCELLENT' },
    { name: 'Puneet Mahajan', coverage: '88%', tcpc: '11.8 / 4.3', compliance: 88, status: 'ON TRACK' },
    { name: 'SK Ziaur', coverage: '82%', tcpc: '8.4 / 3.0', compliance: 82, status: 'ON TRACK' },
  ] : [
    { name: 'Rakesh Parida', coverage: '96%', tcpc: '10.7 / 2.5', compliance: 98, status: 'EXCELLENT' },
    { name: 'Amar Kumar', coverage: '90%', tcpc: '9.8 / 4.3', compliance: 92, status: 'ON TRACK' },
    { name: 'Ajay Sen', coverage: '89%', tcpc: '12.9 / 6.8', compliance: 88, status: 'ON TRACK' },
    { name: 'Puneet Mahajan', coverage: '85%', tcpc: '11.6 / 4.3', compliance: 85, status: 'ON TRACK' },
    { name: 'SK Ziaur', coverage: '76%', tcpc: '7.5 / 3.2', compliance: 68, status: 'CRITICAL' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 text-left"
    >
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Joint Audits &amp; Review Planner</h2>
          <p className="text-sm font-semibold text-slate-500">Coordinate joint market audits and track ASM tour compliance scores</p>
        </div>

        <button 
          type="button"
          onClick={handleOptimizeRoute}
          disabled={plannerOptimizing}
          className={`px-5 py-3 rounded-xl font-bold text-xs select-none shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-white ${
            plannerOptimized ? 'bg-emerald-600' : 'bg-slate-950 hover:bg-indigo-700'
          }`}
        >
          {plannerOptimizing ? 'Optimizing Plan...' : plannerOptimized ? 'Audits Rearranged ✓' : 'Optimize Tour Schedule'}
        </button>
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Joint Visits List */}
        <section className="lg:col-span-7 space-y-4">
          {plannerOptimized && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-650 shrink-0" />
              <div>
                <p className="text-xs text-emerald-955 font-bold">
                  Manager audit travel routes optimized.
                </p>
                <p className="text-[10.5px] text-emerald-800 font-semibold mt-0.5">
                  Proposed grouping combines Kolkata reviews with Cuttack hub flights to save 1.5 days transit time.
                </p>
              </div>
            </div>
          )}

          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-950 uppercase select-none pb-2 border-b border-indigo-50">Joint Field Visits Agenda</h3>
            
            <div className="divide-y divide-slate-100 space-y-2">
              {jointVisits.map((visit) => (
                <div key={visit.day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-center shrink-0">
                      <p className="text-xs font-black text-slate-800">{visit.day}</p>
                      <p className="text-[10px] font-bold text-slate-400 font-mono">{visit.date}</p>
                    </div>
                    <div className="h-8 w-[1.5px] bg-slate-150"></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-905">ASM: {visit.asm}</h4>
                      <p className="text-[10.5px] text-slate-500 font-semibold">{visit.purpose}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[9px] font-black rounded ${
                    visit.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : visit.status === 'SCHEDULED' ? 'bg-indigo-50 text-indigo-750' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {visit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Grid: ASM Compliance scorecard */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-5">
            <div className="flex items-center gap-2 select-none pb-2 border-b border-slate-100">
              <ClipboardList className="w-5 h-5 text-indigo-750" />
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">ASM Tour Compliance</h4>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              {asmCompliance.map((asm) => (
                <div key={asm.name} className="space-y-1 text-left">
                  <div className="flex justify-between items-center select-none text-slate-800 font-bold">
                    <span>{asm.name}</span>
                    <span className={asm.status === 'CRITICAL' ? 'text-red-600' : 'text-slate-500'}>{asm.coverage} compliance</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-150">
                    <div className={`h-full rounded-full ${
                      asm.status === 'CRITICAL' ? 'bg-red-500' : 'bg-indigo-700'
                    }`} style={{ width: `${asm.compliance}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </motion.div>
  );
}
