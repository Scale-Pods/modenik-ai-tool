import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  Sparkles,
  ArrowLeft,
  CalendarRange
} from 'lucide-react';
import { Role } from '../types';

interface MonthlyPlannerProps {
  role: Role;
  onNavigateToWeekly: () => void;
  onBackToProfile: () => void;
}

export default function MonthlyPlanner({
  role,
  onNavigateToWeekly,
  onBackToProfile
}: MonthlyPlannerProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(8);

  // June 2026 starts on a Monday. 30 Days.
  const daysInJune = 30;
  const startOffset = 0; // Starts exactly on Monday (index 0 in standard Mon-Sun grid)

  // ASM Monthly Schedule
  const asmMonthlyEvents: Record<number, { title: string; client: string; time: string; location: string; detail: string }> = {
    3: { 
      title: 'Monthly Order Planning', 
      client: 'Nagar DB (1003498)', 
      time: '11:00 AM', 
      location: 'Kanpur Central', 
      detail: 'Discuss inventory slab unlock strategy and check payment outstanding recovery plan.' 
    },
    8: { 
      title: 'Milestone Slab Review', 
      client: 'UP DB (1004821)', 
      time: '02:30 PM', 
      location: 'Lucknow North', 
      detail: 'Anchor the ₹40 Lakhs primary target unlock. Deliver physical catalog for active Josh line.' 
    },
    15: { 
      title: 'Product Mix Sync & NPD Audit', 
      client: 'APTL DB (1007421)', 
      time: '10:00 AM', 
      location: 'Varanasi East', 
      detail: 'Evaluate retail sell-through rates. Audit shelf share of competitor Lux Venus.' 
    },
    22: { 
      title: 'Inventory Clearance Audit', 
      client: 'Bihar DB (1005291)', 
      time: '01:00 PM', 
      location: 'Patna South', 
      detail: 'Validate outstanding ledger sync via SAP connector to guarantee buffer stock replenishment.' 
    }
  };

  // Manager Monthly Audits
  const managerMonthlyEvents: Record<number, { title: string; client: string; time: string; location: string; detail: string }> = {
    5: { 
      title: 'Joint Field Tour Audit', 
      client: 'ASM: Rakesh Parida', 
      time: '09:00 AM', 
      location: 'Bhubaneswar Hub', 
      detail: 'Joint market routing validation and distributor slab growth analysis.' 
    },
    12: { 
      title: 'Warehouse Audit Meeting', 
      client: 'ASM: Amar Kumar', 
      time: '11:30 AM', 
      location: 'Patna Warehouse', 
      detail: 'Inventory check, stock depletion rates evaluation, and ERP ingestion status sync.' 
    },
    19: { 
      title: 'Regional Performance Review', 
      client: 'ASM: Ajay Sen', 
      time: '02:00 PM', 
      location: 'Kolkata HQ Office', 
      detail: 'Review West Bengal primary targets achievement curve and NPD promotion results.' 
    },
    26: { 
      title: 'Performance Scorecard Sync', 
      client: 'ASM: SK Ziaur', 
      time: '03:00 PM', 
      location: 'Assam Border Hub', 
      detail: 'Remedial training intervention. Plan corrective actions for critical compliance levels.' 
    }
  };

  const monthlyEvents = role === 'ASM' ? asmMonthlyEvents : managerMonthlyEvents;
  const activeEvent = selectedDay ? monthlyEvents[selectedDay] : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-left"
    >
      {/* Header breadcrumbs */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] mb-1.5">
            <span 
              onClick={onBackToProfile} 
              className="hover:text-blue-600 cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Command Center Profile</span>
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Monthly Planner</span>
          </nav>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {role === 'ASM' ? 'ASM Monthly Visit Calendar' : 'Manager Joint Audits Calendar'}
          </h2>
          <p className="text-sm font-semibold text-slate-500">
            {role === 'ASM' ? 'Simulated monthly primary visits and milestone routes' : 'East Zone aggregate tour schedule and compliance audits'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onNavigateToWeekly}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Switch to Weekly Planner
          </button>
        </div>
      </section>

      {/* Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Calendar Grid */}
        <section className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            
            {/* Month title */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-blue-700" />
                <span>June 2026</span>
              </h3>
              <div className="flex gap-2">
                <button type="button" disabled className="p-1.5 rounded-lg border border-slate-200 text-slate-400 opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                <button type="button" disabled className="p-1.5 rounded-lg border border-slate-200 text-slate-400 opacity-50"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              
              {/* Day headers */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-slate-400 font-black py-1 uppercase text-[10px] tracking-wider select-none">
                  {day}
                </div>
              ))}

              {/* Day cells */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-50/20 rounded-xl" />
              ))}

              {Array.from({ length: daysInJune }).map((_, i) => {
                const dayNum = i + 1;
                const hasEvent = !!monthlyEvents[dayNum];
                const isSelected = selectedDay === dayNum;

                return (
                  <button
                    key={`day-${dayNum}`}
                    type="button"
                    onClick={() => hasEvent && setSelectedDay(dayNum)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all border relative ${
                      hasEvent 
                        ? isSelected 
                          ? 'bg-blue-700 border-blue-700 text-white shadow-lg shadow-blue-700/20' 
                          : 'bg-blue-50 border-blue-100 text-blue-900 hover:bg-blue-100/70 cursor-pointer'
                        : 'bg-white border-slate-100 text-slate-400 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span className="font-extrabold text-xs block self-start">{dayNum}</span>
                    {hasEvent && (
                      <span className={`w-2 h-2 rounded-full absolute bottom-2 right-2 ${isSelected ? 'bg-white animate-pulse' : 'bg-blue-600'}`} />
                    )}
                  </button>
                );
              })}

            </div>
          </div>
        </section>

        {/* Right column: Selected Day's Agenda Details */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 select-none pb-2 border-b border-slate-100">
              <CalendarDays className="w-5 h-5 text-blue-700" />
              <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider">
                {role === 'ASM' ? 'Visit Agenda details' : 'Audit Details'}
              </h4>
            </div>

            <AnimatePresence mode="wait">
              {activeEvent ? (
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] bg-blue-105 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full">
                      June {selectedDay}, 2026
                    </span>
                    <h5 className="text-sm font-black text-slate-900 pt-1">{activeEvent.title}</h5>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-650 font-semibold border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Partner</span>
                        <span className="text-slate-900 font-bold">{activeEvent.client}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Time</span>
                        <span className="text-slate-900 font-mono font-bold">{activeEvent.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Territory Zone</span>
                        <span className="text-slate-900 font-bold">{activeEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-[11px] leading-relaxed text-slate-600 font-medium">
                    <p className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Negotiation Directive:</span>
                    </p>
                    {activeEvent.detail}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-slate-400 font-medium">
                  Select a day marked with a scheduled event to view the specific visit directives.
                </div>
              )}
            </AnimatePresence>
          </div>
        </aside>

      </div>
    </motion.div>
  );
}
