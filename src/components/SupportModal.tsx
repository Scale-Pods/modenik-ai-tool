import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, HelpCircle, CheckCircle, MessageSquare } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [ticketCategory, setTicketCategory] = useState('SAP sync issue');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setTicketDescription('');
      onClose();
    }, 1500);
  };

  const FAQs = [
    { q: "Why is primary sales out of sync?", a: "SAP primary sales data syncs automatically every 2 hours. If a manual push fails, trigger the Sync button in the header." },
    { q: "How are slab payouts calculated?", a: "Calculated dynamically based on Jan+Feb run rate coupled with Q4 target. Check the Milestone engine in Distributor 360 sheet." },
    { q: "Who approves outstanding collection blocks?", a: "All credit blockage overrides must be approved and synced via Manager Cockpit panel overrides." }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Overlay backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-slate-950 p-6 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2.5 text-left">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm font-black tracking-tight uppercase">Support Helpdesk &amp; FAQ</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Submit sales tickets or read guides</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Scroll Container */}
          <div className="p-6 overflow-y-auto space-y-6 text-left">
            
            {/* Ticket Submission Form */}
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Submit Support Ticket</h4>
              
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Category</label>
                <select 
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-700 cursor-pointer"
                >
                  <option value="SAP sync issue">SAP primary ledger mismatch</option>
                  <option value="Milestone Calculation check">Milestone payout check</option>
                  <option value="DMS sync failure">Secondary connector sync error</option>
                  <option value="Profile details dispute">Profile credentials change</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Enter details about your issue..."
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-700"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all text-white flex items-center justify-center gap-1.5 active:scale-95 ${
                  isSubmitted ? 'bg-emerald-500' : 'bg-slate-950 hover:bg-blue-700 shadow-md'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Ticket Submitted ✓</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Support Request</span>
                  </>
                )}
              </button>
            </form>

            {/* Accordion FAQ list */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black text-slate-505 uppercase tracking-widest pl-1">Frequently Answered</h4>
              
              <div className="space-y-2.5">
                {FAQs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1 text-left">
                    <h5 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{faq.q}</span>
                    </h5>
                    <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed pl-5">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
