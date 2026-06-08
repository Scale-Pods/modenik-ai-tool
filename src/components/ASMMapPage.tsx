import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  ChevronRight,
  Target,
  Users,
  TrendingUp,
  IndianRupee,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { ASMLeaderboard } from '../data';
import { ASMLeaderboardEntry } from '../types';

interface ASMMapPageProps {
  searchFilter: string;
}

export default function ASMMapPage({ searchFilter }: ASMMapPageProps) {
  const [selectedAsm, setSelectedAsm] = useState<ASMLeaderboardEntry | null>(null);

  const filteredASMs = ASMLeaderboard.filter(m =>
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.region.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Map bounds for East India focus
  const bounds = {
    minLat: 19.5,
    maxLat: 27.5,
    minLng: 84.0,
    maxLng: 89.5
  };

  const toX = (lng: number) => ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const toY = (lat: number) => ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'bg-emerald-500';
      case 'ON TRACK': return 'bg-blue-600';
      case 'CRITICAL': return 'bg-red-600';
      default: return 'bg-slate-400';
    }
  };

  const getStatusRing = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'ring-emerald-400';
      case 'ON TRACK': return 'ring-blue-400';
      case 'CRITICAL': return 'ring-red-400';
      default: return 'ring-slate-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-left"
    >
      {/* Header */}
      <div>
        <nav className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs mb-1.5">
          <span>Region</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-secondary font-bold">East Branch</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-secondary font-bold">ASM Field Map</span>
        </nav>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">ASM Territory Map</h2>
        <p className="text-sm font-semibold text-slate-500">Real-time field tracking · {filteredASMs.length} ASMs deployed</p>
      </div>

      {/* Map Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 shadow-sm" style={{ height: '520px' }}>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-slate-900" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-slate-900" style={{ left: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>

        {/* State labels */}
        <span className="absolute text-[10px] font-bold text-slate-300 uppercase select-none" style={{ top: '22%', left: '30%' }}>Bihar</span>
        <span className="absolute text-[10px] font-bold text-slate-300 uppercase select-none" style={{ top: '62%', left: '18%' }}>Odisha</span>
        <span className="absolute text-[10px] font-bold text-slate-300 uppercase select-none" style={{ top: '18%', left: '68%' }}>West Bengal</span>

        {/* City labels */}
        <span className="absolute text-[9px] font-semibold text-slate-400 select-none" style={{ top: '27%', left: '38%' }}>Patna</span>
        <span className="absolute text-[9px] font-semibold text-slate-400 select-none" style={{ top: '42%', left: '30%' }}>Gaya</span>
        <span className="absolute text-[9px] font-semibold text-slate-400 select-none" style={{ top: '25%', left: '72%' }}>Siliguri</span>
        <span className="absolute text-[9px] font-semibold text-slate-400 select-none" style={{ top: '47%', left: '74%' }}>Kolkata</span>
        <span className="absolute text-[9px] font-semibold text-slate-400 select-none" style={{ top: '62%', left: '22%' }}>Bhubaneswar</span>

        {/* Pins */}
        {filteredASMs.map((asm) => {
          const x = toX(asm.lng);
          const y = toY(asm.lat);
          const isSelected = selectedAsm?.name === asm.name;

          return (
            <div key={asm.name}>
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute w-6 h-6 rounded-full ${getStatusColor(asm.status)} pointer-events-none`}
                style={{ left: `calc(${x}% - 12px)`, top: `calc(${y}% - 12px)`, opacity: 0.25 }}
              />

              {/* Pin */}
              <button
                type="button"
                onClick={() => setSelectedAsm(isSelected ? null : asm)}
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-black shadow-lg border-2 border-white transition-all cursor-pointer z-10 ${getStatusColor(asm.status)} ${getStatusRing(asm.status)} ${isSelected ? 'scale-125 z-20' : 'hover:scale-110'}`}
                style={{ left: `calc(${x}% - 16px)`, top: `calc(${y}% - 16px)` }}
                title={asm.name}
              >
                {asm.initials}
              </button>

              {/* Label */}
              <span
                className={`absolute text-[10px] font-bold transition-all pointer-events-none select-none ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}
                style={{ left: `calc(${x}% + 10px)`, top: `calc(${y}% - 4px)` }}
              >
                {asm.name.split(' ')[0]}
              </span>
            </div>
          );
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 glass-panel bg-white/80 backdrop-blur-md rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-slate-500">Excellent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-[9px] font-bold text-slate-500">On Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span className="text-[9px] font-bold text-slate-500">Critical</span>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute top-4 right-4 glass-panel bg-white/80 backdrop-blur-md rounded-xl p-2.5 border border-slate-100 shadow-sm">
          <Navigation className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* ASM Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {filteredASMs.map((asm) => {
          const isSelected = selectedAsm?.name === asm.name;
          return (
            <button
              type="button"
              key={asm.name}
              onClick={() => setSelectedAsm(isSelected ? null : asm)}
              className={`glass-panel rounded-xl p-4 border text-left transition-all cursor-pointer ${
                isSelected ? 'border-blue-400 shadow-md ring-1 ring-blue-200' : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 ${getStatusColor(asm.status)}`}>
                  {asm.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{asm.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold">{asm.region}, {asm.state}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">Ach</span>
                <span className={`text-xs font-black ${
                  asm.ach >= 90 ? 'text-emerald-600' : asm.ach >= 80 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {asm.ach}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected ASM Detail Slide-in */}
      <AnimatePresence>
        {selectedAsm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-panel rounded-2xl border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black ${getStatusColor(selectedAsm.status)}`}>
                  {selectedAsm.initials}
                </div>
                <div>
                  <h4 className="text-sm font-black">{selectedAsm.name}</h4>
                  <p className="text-[10px] text-white/60 font-semibold">{selectedAsm.region}, {selectedAsm.state}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsm(null)}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Achievement</span>
                <p className={`text-lg font-black mt-0.5 ${
                  selectedAsm.ach >= 90 ? 'text-emerald-600' : selectedAsm.ach >= 80 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {selectedAsm.ach}%
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{selectedAsm.targetPrimary}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Achieved</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{selectedAsm.achievedPrimary}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Slab Upside</span>
                <p className="text-lg font-black text-orange-600 mt-0.5">{selectedAsm.upside}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distributors</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{selectedAsm.distributorsManaged}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{selectedAsm.teamSize} members</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedAsm.phone}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EC / TC / PC</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">{selectedAsm.ectcpc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
