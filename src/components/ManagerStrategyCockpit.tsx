import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Rocket,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Coins,
  ShieldCheck,
  Check,
  Building,
  Target,
  RefreshCw,
  Download,
  ExternalLink,
  MessageSquare,
  FileSpreadsheet,
  FileText,
  Mail,
  Wifi,
  WifiOff,
  Clock,
  Database,
  Smartphone,
  Globe,
  BarChart3
} from 'lucide-react';

type ConnectionStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

interface Connector {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: ConnectionStatus;
  lastSync: string;
  color: string;
  bgColor: string;
  actions: { label: string; action: () => void }[];
}

export default function ManagerStrategyCockpit() {
  const [activeTab, setActiveTab] = useState<'phase2' | 'phase3'>('phase2');
  const [requestedForecast, setRequestedForecast] = useState(false);

  const [connectors, setConnectors] = useState<Connector[]>([
    {
      id: 'tally',
      name: 'Tally Prime',
      description: 'Direct ledger sync from Tally Prime ERP. Real-time invoice, payment, and stock data ingestion from distributor accounts.',
      icon: <Database className="w-5 h-5" />,
      status: 'connected',
      lastSync: '2 min ago',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
      actions: [
        { label: 'Sync Now', action: () => triggerSync('tally') },
        { label: 'View Ledger', action: () => {} }
      ]
    },
    {
      id: 'sheets',
      name: 'Google Sheets',
      description: 'Bidirectional sync with Google Sheets. Export sales reports, distributor targets, and incentive calculations directly to Sheets.',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      status: 'connected',
      lastSync: '15 min ago',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-100',
      actions: [
        { label: 'Export Data', action: () => {} },
        { label: 'Open Sheet', action: () => {} }
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Automated broadcast to distributors and ASMs. Send slab alerts, payment reminders, incentive summaries, and bulk notifications.',
      icon: <MessageSquare className="w-5 h-5" />,
      status: 'connected',
      lastSync: '1 hour ago',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
      actions: [
        { label: 'Send Broadcast', action: () => {} },
        { label: 'View History', action: () => {} }
      ]
    },
    {
      id: 'sap',
      name: 'SAP Connector',
      description: 'Enterprise-grade SAP integration for credit management, payment reconciliation, and master data synchronization across branches.',
      icon: <Globe className="w-5 h-5" />,
      status: 'connected',
      lastSync: '5 min ago',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
      actions: [
        { label: 'Sync Ledger', action: () => {} },
        { label: 'Reconcile', action: () => {} }
      ]
    },
    {
      id: 'email',
      name: 'Gmail / Email Gateway',
      description: 'Automated email reports for daily sales summaries, weekly performance decks, and monthly incentive statements to stakeholders.',
      icon: <Mail className="w-5 h-5" />,
      status: 'connected',
      lastSync: '3 hours ago',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-100',
      actions: [
        { label: 'Send Report', action: () => {} },
        { label: '模板管理', action: () => {} }
      ]
    },
    {
      id: 'mobile',
      name: 'ASM Mobile App',
      description: 'Field data collection via ASM mobile app. Real-time visit logging, photo capture, order booking, and geo-tagged attendance.',
      icon: <Smartphone className="w-5 h-5" />,
      status: 'connected',
      lastSync: 'Just now',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-100',
      actions: [
        { label: 'Push Update', action: () => {} },
        { label: 'View Logs', action: () => {} }
      ]
    }
  ]);

  const triggerSync = (id: string) => {
    setConnectors(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: 'syncing' as ConnectionStatus } : c
      )
    );
    setTimeout(() => {
      setConnectors(prev =>
        prev.map(c =>
          c.id === id ? { ...c, status: 'connected' as ConnectionStatus, lastSync: 'Just now' } : c
        )
      );
    }, 2000);
  };

  const totalConnectors = connectors.length;
  const activeConnectors = connectors.filter(c => c.status === 'connected').length;

  const statusIcon = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected': return <Wifi className="w-3.5 h-3.5 text-emerald-600" />;
      case 'disconnected': return <WifiOff className="w-3.5 h-3.5 text-red-500" />;
      case 'syncing': return <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />;
      case 'error': return <WifiOff className="w-3.5 h-3.5 text-orange-500" />;
    }
  };

  const statusLabel = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'syncing': return 'Syncing...';
      case 'error': return 'Error';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 select-none pb-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('phase2')}
          className={`px-6 py-3 font-extrabold text-sm tracking-tight relative transition-all ${
            activeTab === 'phase2' ? 'text-indigo-700' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Phase 2: Regional Connectors</span>
          {activeTab === 'phase2' && (
            <motion.div
              layoutId="managerActiveTabLine"
              className="absolute bottom-0 inset-x-6 h-0.5 bg-indigo-700 rounded-full"
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('phase3')}
          className={`px-6 py-3 font-extrabold text-sm tracking-tight relative transition-all ${
            activeTab === 'phase3' ? 'text-indigo-700' : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <span>Phase 3: Branch Loyalty</span>
          {activeTab === 'phase3' && (
            <motion.div
              layoutId="managerActiveTabLine"
              className="absolute bottom-0 inset-x-6 h-0.5 bg-indigo-700 rounded-full"
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Tab 1: Connectors Hub */}
        {activeTab === 'phase2' && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Header banner */}
            <div className="relative overflow-hidden glass-panel rounded-2xl p-8 shadow-sm">
              <div className="absolute top-4 right-[-32px] rotate-45 bg-indigo-700 text-white font-extrabold text-[9px] uppercase tracking-widest px-8 py-1 select-none">
                Branch Scope
              </div>
              <div className="flex flex-col gap-2 max-w-3xl text-left">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Integration Connectors Hub</h2>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Unified integration layer connecting Tally Prime, Google Sheets, WhatsApp Business, SAP, Email, and Mobile apps. 
                  Bypass local ERP lock-in with bi-directional data sync across all East branch distributors.
                </p>
              </div>
            </div>

            {/* Connector Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{totalConnectors}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Connectors</p>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Wifi className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{activeConnectors}/{totalConnectors}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Connections</p>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">1,847</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data Points Synced Today</p>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">99.2%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uptime (30d)</p>
                </div>
              </div>
            </div>

            {/* Connector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {connectors.map((connector) => (
                <motion.div
                  key={connector.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-panel rounded-2xl border overflow-hidden transition-all hover:shadow-md ${connector.bgColor}`}
                >
                  {/* Header */}
                  <div className="p-5 pb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${connector.color.replace('text-', 'bg-').replace('600', '50')} ${connector.color} border border-current/10 shrink-0`}>
                        {connector.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">{connector.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          {statusIcon(connector.status)}
                          <span className={`text-[10px] font-bold ${
                            connector.status === 'connected' ? 'text-emerald-600' :
                            connector.status === 'syncing' ? 'text-blue-600' :
                            connector.status === 'error' ? 'text-orange-500' : 'text-red-500'
                          }`}>
                            {statusLabel(connector.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {connector.status === 'connected' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="px-5 pb-3">
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed line-clamp-2">
                      {connector.description}
                    </p>
                  </div>

                  {/* Last sync & Actions */}
                  <div className="px-5 py-3 bg-white/50 border-t border-inherit flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Last sync: {connector.lastSync}</span>
                    </span>
                    <div className="flex gap-1.5">
                      {connector.actions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={action.action}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[9px] hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          {idx === 0 ? <RefreshCw className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Integration Stats Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-100">
              <div className="px-6 py-4 border-b border-slate-100 bg-white/40">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Data Flow Activity (Last 24h)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold select-none border-b border-slate-100">
                      <th className="px-6 py-3">Connector</th>
                      <th className="px-6 py-3">Records Synced</th>
                      <th className="px-6 py-3">Errors</th>
                      <th className="px-6 py-3">Last Sync</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Tally Prime', records: '642', errors: '2', last: '2 min ago', status: 'Operational' as const },
                      { name: 'Google Sheets', records: '189', errors: '0', last: '15 min ago', status: 'Operational' as const },
                      { name: 'WhatsApp Business', records: '1,204', errors: '5', last: '1 hour ago', status: 'Degraded' as const },
                      { name: 'SAP Connector', records: '891', errors: '1', last: '5 min ago', status: 'Operational' as const },
                      { name: 'Email Gateway', records: '156', errors: '0', last: '3 hours ago', status: 'Operational' as const },
                      { name: 'ASM Mobile App', records: '423', errors: '3', last: 'Just now', status: 'Operational' as const },
                    ].map((row) => (
                      <tr key={row.name} className="hover:bg-slate-50/50">
                        <td className="px-6 py-3.5 font-bold text-slate-900">{row.name}</td>
                        <td className="px-6 py-3.5 font-semibold text-slate-500 tabular-nums">{row.records}</td>
                        <td className="px-6 py-3.5 font-semibold text-slate-500 tabular-nums">{row.errors}</td>
                        <td className="px-6 py-3.5 text-slate-400 font-medium">{row.last}</td>
                        <td className="px-6 py-3.5">
                          <span className={`px-2 py-0.5 text-[9px] font-black rounded ${
                            row.status === 'Operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Loyalty Dashboard */}
        {activeTab === 'phase3' && (
          <motion.div
            key="phase3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8 text-left"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Vijeta+ Retailer Loyalty Dashboard</h2>
                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
                  Monitoring scan validity scores and points distribution payouts across the entire East region.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRequestedForecast(true)}
                disabled={requestedForecast}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs select-none transition-all active:scale-95 text-white ${
                  requestedForecast ? 'bg-emerald-500' : 'bg-slate-950 hover:bg-indigo-705'
                }`}
              >
                {requestedForecast ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Forecast calculations ready</span>
                  </>
                ) : (
                  <>
                    <span>Generate AI revenue forecasts</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Loyalty KPI stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-505 uppercase tracking-wider">Onboarded Retailers</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">42,500</span>
                  <span className="text-emerald-600 font-bold text-xs">+14% YoY</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-505 uppercase tracking-wider">Valid Scan Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">98.5%</span>
                  <span className="text-indigo-600 font-bold text-xs">AI OCR</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-505 uppercase tracking-wider">Total Incentives Issued</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">₹42.8 Lakhs</span>
                  <span className="text-blue-750 font-bold text-xs">Active wallet</span>
                </div>
              </div>
            </div>

            {/* AI Revenue Forecast Panel */}
            <AnimatePresence>
              {requestedForecast && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6 overflow-hidden pt-4"
                >
                  <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-indigo-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                          <h3 className="text-sm font-black uppercase tracking-wider text-indigo-200">AI Predictive Revenue Engine</h3>
                        </div>
                        <p className="text-[11px] text-slate-350">Generated using 24-month historical primary sales, distributor slab patterns, and seasonal lift</p>
                      </div>
                      <span className="bg-indigo-700/60 text-indigo-200 font-mono text-xs px-3 py-1 rounded-full font-bold border border-indigo-500">
                        Accuracy Index: 94.2%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Q3 Target Forecast</span>
                        <p className="text-2xl font-black text-emerald-400 mt-1">₹15.4 Cr</p>
                        <p className="text-[10px] text-slate-350 font-semibold mt-1">Expected range: ₹14.8 Cr - ₹16.1 Cr</p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Projected Growth Rate</span>
                        <p className="text-2xl font-black text-blue-400 mt-1">+12.4%</p>
                        <p className="text-[10px] text-slate-350 font-semibold mt-1">vs Q2 Primary (₹13.7 Cr)</p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Distributor Upside Pool</span>
                        <p className="text-2xl font-black text-amber-400 mt-1">₹18.5 Lakhs</p>
                        <p className="text-[10px] text-slate-350 font-semibold mt-1">Potential margin unlocks from slab transitions</p>
                      </div>
                    </div>

                    {/* Regional Breakdowns & Recommendations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">Zone-wise Forecasts</h4>
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-300">West Bengal (Ajay Sen)</span>
                            <div className="text-right">
                              <span className="font-bold text-white">₹6.15 Cr</span>
                              <span className="text-emerald-400 ml-2 font-mono text-[10px] font-bold">+8.3%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-300">Odisha Zone (Rakesh Parida)</span>
                            <div className="text-right">
                              <span className="font-bold text-white">₹5.25 Cr</span>
                              <span className="text-emerald-400 ml-2 font-mono text-[10px] font-bold">+9.8%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-300">Bihar Zone 1 (Amar Kumar)</span>
                            <div className="text-right">
                              <span className="font-bold text-white">₹4.00 Cr</span>
                              <span className="text-emerald-400 ml-2 font-mono text-[10px] font-bold">+18.2%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">Recommended Executive Interventions</h4>
                        <div className="space-y-2 text-[10.5px] leading-relaxed text-slate-300 font-semibold">
                          <p className="flex items-start gap-2 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/40">
                            <span className="text-amber-400 font-bold shrink-0">⚡</span>
                            <span>Release the credit lock on <strong>Bihar DB</strong>. They are projected to achieve a ₹42 Lakhs primary contribution this month once stock flow resumes.</span>
                          </p>
                          <p className="flex items-start gap-2 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-800/40">
                            <span className="text-blue-400 font-bold shrink-0">⚡</span>
                            <span>Incentivize <strong>Rakesh Parida</strong> to run a focused weekend drive on Classic Trunk lines; Odisha is ₹12 Lakhs away from target transition.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
