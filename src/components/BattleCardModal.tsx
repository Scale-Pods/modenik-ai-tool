/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Target, 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Calculator,
  Download,
  Share2
} from 'lucide-react';

interface BattleCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  distributorName: string;
}

export default function BattleCardModal({
  isOpen,
  onClose,
  distributorName
}: BattleCardModalProps) {
  const [selectedAddition, setSelectedAddition] = useState<0 | 15 | 30 | 40>(40);
  const [isLogged, setIsLogged] = useState(false);

  if (!isOpen) return null;

  // Projection values based on click options
  const getProjectedPayout = () => {
    switch (selectedAddition) {
      case 0: return { base: '₹5.7 L', multiplier: 'None', label: 'Current Earnings' };
      case 15: return { base: '₹6.1 L', multiplier: '1.1x Active', label: 'Progressive Tier' };
      case 30: return { base: '₹6.7 L', multiplier: '1.25x High', label: 'Progressive Tier' };
      case 40:
      default:
        return { base: '₹7.7 L', multiplier: '2.0% Slab Unlock!', label: 'Peak Earning Potential (Goal)' };
    }
  };

  const currentProjection = getProjectedPayout();

  const handleLogOutcome = () => {
    setIsLogged(true);
    setTimeout(() => {
      setIsLogged(false);
      onClose();
    }, 1500);
  };

  const handleDownloadSlab = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Modenik Slab Details - ${distributorName || 'UP DB'}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #ED1C24; border-bottom: 2px solid #ef4444; padding-bottom: 12px; margin-bottom: 24px; font-weight: 800; font-size: 24px; }
            .section { margin-bottom: 28px; }
            .label { font-weight: bold; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
            .payout { font-size: 22px; font-weight: 800; color: #0f172a; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; color: #475569; }
            .highlight { background-color: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 12px; margin-top: 10px; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
            .badge-emerald { background-color: #d1fae5; color: #065f46; }
            .badge-blue { background-color: #dbeafe; color: #1e40af; }
          </style>
        </head>
        <body>
          <h1>Modenik Lifestyle - Distributor Slab Projections</h1>
          
          <div class="section">
            <div class="label">Distributor Account</div>
            <div style="font-size: 16px; font-weight: bold; margin-top: 4px;">${distributorName || 'UP DB (1004821)'}</div>
            
            <div class="highlight">
              <span class="label" style="color: #991b1b;">Active Challenge Milestone</span>
              <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 600; color: #7f1d1d;">
                Add <strong>₹40 Lakhs primary inventory bulk order</strong> this quarter to unlock a <strong>₹2 Lakhs additional incentive payout</strong> (2.0% Slab Unlock!).
              </p>
            </div>
          </div>

          <div class="section">
            <div class="label">Projected Milestone Slab Targets</div>
            <table>
              <thead>
                <tr>
                  <th>Bulk Order Addition</th>
                  <th>Projected Total Payout</th>
                  <th>Multiplier Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>None (Current Base)</td>
                  <td>₹5.7 Lakhs</td>
                  <td>Base earnings rate</td>
                </tr>
                <tr>
                  <td>+₹15 Lakhs</td>
                  <td>₹6.1 Lakhs</td>
                  <td>1.1x Active Tier</td>
                </tr>
                <tr>
                  <td>+₹30 Lakhs</td>
                  <td>₹6.7 Lakhs</td>
                  <td>1.25x High Tier</td>
                </tr>
                <tr style="background-color: #fef2f2; font-weight: bold;">
                  <td>+₹40 Lakhs (Target)</td>
                  <td>₹7.7 Lakhs</td>
                  <td style="color: #dc2626;">2.0% Peak Slab Unlock ⚡</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="label">Product Line Competitive Analysis (Estimated ROI)</div>
            <table>
              <thead>
                <tr>
                  <th>Brand Segment</th>
                  <th>Retail Price</th>
                  <th>Retailer Margin</th>
                  <th>Replenishment Cycle</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Dixcy Josh Vest (Modenik)</strong></td>
                  <td>₹110</td>
                  <td style="color: #059669; font-weight: bold;">18.0%</td>
                  <td>4 Days</td>
                  <td><span class="badge badge-emerald">MOMENTUM</span></td>
                </tr>
                <tr>
                  <td>Lux Venus Vest (Competitor)</td>
                  <td>₹105</td>
                  <td>12.5%</td>
                  <td>10 Days</td>
                  <td><span>SATURATED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style="font-size: 11px; text-align: center; color: #94a3b8; margin-top: 50px; border-t: 1px solid #e2e8f0; padding-top: 15px;">
            &copy; 2026 Modenik Lifestyle. Confidential Sales Decision Sheet.
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleShareWhatsApp = () => {
    const message = `*Modenik Slab Details for ${distributorName || 'UP DB'}*:\n\n• Target Challenge: Add *₹40 L* primary order to unlock *₹2 L* extra incentive (2.0% Slab Unlock).\n• Replenishment: 4-day quick turnaround.\n\nCalculate your ROI now: Modenik Josh Vest gives 18% margin (vs 12.5% competitor standard). Let's unlock the next slab!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Sheet Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header section (Navy / Metallic theme) */}
          <div className="glass-card-navy p-6 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
              <div className="text-left select-none">
                <h3 className="text-base font-black tracking-tight text-white mb-0.5">
                  AI Battle Card: {distributorName || 'UP DB'} Negotiation
                </h3>
                <div className="flex gap-2">
                  <span className="text-[9px] bg-red-600 font-extrabold px-1.5 py-0.5 rounded text-white tracking-widest uppercase">
                    High Priority
                  </span>
                  <span className="text-[10px] text-white/50 font-bold">Target: Lucknow North Zone</span>
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

          {/* Scrollable contents area */}
          <div className="p-8 overflow-y-auto space-y-8 scrollbar-hide text-left">
            
            {/* Negotiation Objectives Block */}
            <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest select-none">
                Negotiation Objectives
              </h4>
              <div className="space-y-3">
                <div className="p-4 bg-blue-700/5 border border-blue-700/10 rounded-2xl flex items-start gap-3">
                  <div className="p-1 rounded bg-blue-700 text-white font-black text-xs shrink-0 select-none">A</div>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    <strong>Add ₹40 L primary</strong> this quarter to unlock ₹2 L extra earning. This corresponds to a 2% margin multiplier. <span className="text-blue-700 font-bold tracking-tight">Active Slab Challenge.</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150/50 rounded-2xl flex items-start gap-3">
                  <div className="p-1 rounded bg-slate-900 text-white font-black text-xs shrink-0 select-none">B</div>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    Transition <strong>15% of demand</strong> to high-margin NPD (Josh ICD / White Rib Tanks).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150/50 rounded-2xl flex items-start gap-3">
                  <div className="p-1 rounded bg-slate-900 text-white font-black text-xs shrink-0 select-none">C</div>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    Liquidation of Classic Trunk XL excess stock before next refresh cycle.
                  </p>
                </div>
              </div>
            </section>

            {/* Earning Multiplier Estimator Section (Dynamic interaction!) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 select-none">
                <Calculator className="w-4 h-4 text-blue-700" />
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Earning Multiplier Estimator
                </h4>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                Select additional inventory bulk order size to preview projected incentives:
              </p>

              <div className="grid grid-cols-4 gap-2.5">
                {[0, 15, 30, 40].map((amt) => {
                  const isActive = selectedAddition === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAddition(amt as 0 | 15 | 30 | 40)}
                      className={`py-3.5 px-2 rounded-xl text-xs font-black transition-all border text-center cursor-pointer ${
                        isActive
                          ? 'bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-700/10'
                          : 'bg-slate-50/50 text-slate-700 border-slate-200/60 hover:bg-slate-100'
                      }`}
                    >
                      {amt === 0 ? 'None' : `+₹${amt} L`}
                    </button>
                  );
                })}
              </div>

              {/* Estimate results display widget */}
              <div className="p-4 rounded-2xl border bg-slate-50/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Projected Incentive
                  </p>
                  <p className="text-xl font-black text-slate-900">{currentProjection.base}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    selectedAddition === 40 ? 'bg-orange-500 text-white animate-pulse' : 'bg-blue-105 text-blue-700'
                  }`}>
                    {currentProjection.multiplier}
                  </span>
                  <p className="text-[9px] text-slate-550 font-bold mt-1 text-slate-400">{currentProjection.label}</p>
                </div>
              </div>
            </section>

            {/* Share and Download section */}
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-left">
                <h5 className="text-xs font-extrabold text-slate-900">Share Slab Details with Distributor</h5>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Send current milestone & payout projections directly to distributor's phone.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadSlab}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Slab</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Share</span>
                </button>
              </div>
            </div>

            {/* Profitability Gap Analysis block */}
            <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest select-none">
                Profitability Gap Analysis
              </h4>
              <div className="border border-slate-150 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold select-none border-b border-slate-100">
                      <th className="px-4 py-3">Product Catalog</th>
                      <th className="px-4 py-3">Retail Price</th>
                      <th className="px-4 py-3 text-right">Retailer Margin</th>
                      <th className="px-4 py-3 text-right">ROI (Est.)</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[11.5px] font-medium">
                    <tr>
                      <td className="px-4 py-3 font-bold text-slate-900">Dixcy Josh Vest (Modenik)</td>
                      <td className="px-4 py-3 text-slate-500 tabular-nums">₹110</td>
                      <td className="px-4 py-3 text-right font-black text-emerald-600 select-none tabular-nums">18.0%</td>
                      <td className="px-4 py-3 text-right font-black text-slate-900 tabular-nums">22.4%</td>
                      <td className="px-4 py-3 text-slate-805">
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[9px]">
                          MOMENTUM
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-slate-50/20 text-slate-600">
                      <td className="px-4 py-3">Lux Venus Vest (Competitor)</td>
                      <td className="px-4 py-3 text-slate-400 tabular-nums">₹105</td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">12.5%</td>
                      <td className="px-4 py-3 text-right tabular-nums">14.8%</td>
                      <td className="px-4 py-3">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-550 font-bold rounded text-[9px] select-none">
                          SATURATED
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Negotiation Pivot Points visual cards */}
            <section className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest select-none">
                Negotiation Pivot Points
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150/40 space-y-1.5 text-left">
                  <h5 className="text-xs font-extrabold text-slate-905 tracking-tight uppercase">Lower Working Capital</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Highlight Modenik's 4-day replenishment turnaround compared to Lux's 10-day wait.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150/40 space-y-1.5 text-left">
                  <h5 className="text-xs font-extrabold text-slate-905 tracking-tight uppercase">Performance Bonus</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Anchor on the ₹2 L milestone payout to drive the final bulk order conversion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150/40 space-y-1.5 text-left">
                  <h5 className="text-xs font-extrabold text-slate-905 tracking-tight uppercase">Market Expansion</h5>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    Leverage the strong retail pull of the new Josh Innerwear catalog to replace slower units.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer action buttons */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-end shrink-0">
            <button 
              type="button"
              onClick={onClose}
              disabled={isLogged}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-250 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all text-center select-none disabled:opacity-50"
            >
              Snooze for Next Visit
            </button>

            <button 
              type="button"
              onClick={handleLogOutcome}
              disabled={isLogged}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs active:scale-[0.98] transition-all text-center text-white select-none ${
                isLogged ? 'bg-emerald-500' : 'bg-slate-950 hover:bg-blue-700'
              }`}
            >
              <AnimatePresence mode="wait">
                {isLogged ? (
                  <motion.div 
                    key="logged"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Outcome Saved ✓</span>
                  </motion.div>
                ) : (
                  <motion.span key="normal">
                    Log Outcome / Mark as Discussed
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
