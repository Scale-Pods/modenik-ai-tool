import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Users,
  Target,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  UserCheck,
  BarChart3
} from 'lucide-react';
import { ASMLeaderboardEntry } from '../types';

interface ASMLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ASMLeaderboardEntry | null;
}

export default function ASMLeaderboardModal({
  isOpen,
  onClose,
  member
}: ASMLeaderboardModalProps) {
  if (!isOpen || !member) return null;

  const statusColor =
    member.status === 'EXCELLENT'
      ? 'bg-emerald-500'
      : member.status === 'ON TRACK'
      ? 'bg-blue-600'
      : 'bg-red-600';

  const statusBg =
    member.status === 'EXCELLENT'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : member.status === 'ON TRACK'
      ? 'bg-blue-50 text-blue-700 border-blue-100'
      : 'bg-red-50 text-red-700 border-red-100';

  const achPercent = member.ach;
  const achColor = achPercent >= 90 ? 'text-emerald-600' : achPercent >= 80 ? 'text-blue-600' : 'text-red-600';
  const achBarColor = achPercent >= 90 ? 'bg-emerald-500' : achPercent >= 80 ? 'bg-blue-600' : 'bg-red-500';

  const targetVal = parseFloat(member.targetPrimary.replace(/[₹, Cr]/g, ''));
  const achievedVal = parseFloat(member.achievedPrimary.replace(/[₹, Cr]/g, ''));
  const gapVal = (targetVal - achievedVal).toFixed(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header with profile summary */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center font-black text-lg border-2 border-white/20 select-none shrink-0">
                  {member.initials}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-black tracking-tight">{member.name}</h3>
                  <p className="text-xs text-white/60 font-semibold">Area Sales Manager</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-3 h-3 text-white/50" />
                    <span className="text-[11px] text-white/70 font-medium">{member.region}, {member.state}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusBg}`}>
                {member.status}
              </span>
              <span className="text-[11px] text-white/50 font-semibold">
                Ach: <strong className="text-white">{member.ach}%</strong>
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5 text-left">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Target className="w-3 h-3" />
                  <span>Target (Primary)</span>
                </div>
                <p className="text-sm font-black text-slate-900">{member.targetPrimary}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <IndianRupee className="w-3 h-3" />
                  <span>Achieved</span>
                </div>
                <p className={`text-sm font-black ${achColor}`}>{member.achievedPrimary}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <Users className="w-3 h-3" />
                  <span>Distributors</span>
                </div>
                <p className="text-sm font-black text-slate-900">{member.distributorsManaged}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <UserCheck className="w-3 h-3" />
                  <span>Team Size</span>
                </div>
                <p className="text-sm font-black text-slate-900">{member.teamSize} members</p>
              </div>
            </div>

            {/* Achievement Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Achievement Progress</span>
                <span className={`text-xs font-black ${achColor}`}>{member.ach}%</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(achPercent, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${achBarColor}`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                <span>0%</span>
                <span className={achPercent < 100 ? 'text-orange-500 font-bold' : 'text-emerald-600'}>
                  {achPercent >= 100 ? 'Target Met' : `₹${gapVal} Cr gap`}
                </span>
                <span>100%</span>
              </div>
            </div>

            {/* EC/TC/PC Details */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2">
                <BarChart3 className="w-3 h-3" />
                <span>EC / TC / PC Breakdown</span>
              </div>
              <p className="text-sm font-black text-slate-900 tabular-nums">{member.ectcpc}</p>
              <div className="flex gap-3 mt-2 text-[10px] font-semibold text-slate-500">
                <span>EC: <strong className="text-slate-800">{member.ectcpc.split(' / ')[0]}</strong></span>
                <span>TC: <strong className="text-slate-800">{member.ectcpc.split(' / ')[1]}</strong></span>
                <span>PC: <strong className="text-slate-800">{member.ectcpc.split(' / ')[2]}</strong></span>
              </div>
            </div>

            {/* Slab Upside */}
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">Slab Upside Opportunity</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{member.upside}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                  <p className="text-xs font-bold text-slate-800">{member.phone}</p>
                </div>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{member.email}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
