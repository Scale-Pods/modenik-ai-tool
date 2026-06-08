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
  BarChart3,
  Settings,
  X,
  Key,
  Server,
  User,
  Lock,
  AtSign,
  Link
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

  const [configuringConnector, setConfiguringConnector] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, Record<string, string>>>({});

  const openConfig = (id: string) => setConfiguringConnector(id);

  const closeConfig = () => setConfiguringConnector(null);

  const updateConfigValue = (connectorId: string, field: string, value: string) => {
    setConfigValues(prev => ({
      ...prev,
      [connectorId]: { ...(prev[connectorId] || {}), [field]: value }
    }));
  };

  const connectorConfigs: Record<string, { label: string; key: string; type: string; icon: React.ReactNode; placeholder: string }[]> = {
    tally: [
      { label: 'Server URL', key: 'serverUrl', type: 'text', icon: <Server className="w-4 h-4" />, placeholder: 'https://your-tally-server:9000' },
      { label: 'Company Name', key: 'companyName', type: 'text', icon: <Building className="w-4 h-4" />, placeholder: 'Modenik Lifestyle Pvt Ltd' },
      { label: 'Port', key: 'port', type: 'number', icon: <Link className="w-4 h-4" />, placeholder: '9000' },
      { label: 'Username', key: 'username', type: 'text', icon: <User className="w-4 h-4" />, placeholder: 'admin' },
      { label: 'Password', key: 'password', type: 'password', icon: <Lock className="w-4 h-4" />, placeholder: '••••••••' },
    ],
    sheets: [
      { label: 'API Key', key: 'apiKey', type: 'password', icon: <Key className="w-4 h-4" />, placeholder: 'AIzaSy...' },
      { label: 'Client Email', key: 'clientEmail', type: 'text', icon: <AtSign className="w-4 h-4" />, placeholder: 'service@modenik-sheets.iam.gserviceaccount.com' },
      { label: 'Private Key', key: 'privateKey', type: 'password', icon: <Lock className="w-4 h-4" />, placeholder: '-----BEGIN PRIVATE KEY-----' },
      { label: 'Default Sheet ID', key: 'sheetId', type: 'text', icon: <FileSpreadsheet className="w-4 h-4" />, placeholder: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms' },
    ],
    whatsapp: [
      { label: 'Phone Number ID', key: 'phoneNumberId', type: 'text', icon: <MessageSquare className="w-4 h-4" />, placeholder: '123456789012345' },
      { label: 'WhatsApp Business API Token', key: 'apiToken', type: 'password', icon: <Key className="w-4 h-4" />, placeholder: 'EAAT...' },
      { label: 'Business Account ID', key: 'businessAccountId', type: 'text', icon: <User className="w-4 h-4" />, placeholder: '123456789012345' },
      { label: 'Webhook Verification Token', key: 'webhookToken', type: 'password', icon: <Lock className="w-4 h-4" />, placeholder: 'your_verify_token' },
    ],
    sap: [
      { label: 'SAP Server URL', key: 'serverUrl', type: 'text', icon: <Server className="w-4 h-4" />, placeholder: 'https://your-sap-instance:44300' },
      { label: 'Client ID', key: 'clientId', type: 'text', icon: <User className="w-4 h-4" />, placeholder: 'SAP_CLIENT_001' },
      { label: 'Client Secret', key: 'clientSecret', type: 'password', icon: <Lock className="w-4 h-4" />, placeholder: '••••••••' },
      { label: 'System Number', key: 'systemNumber', type: 'text', icon: <Link className="w-4 h-4" />, placeholder: '00' },
      { label: 'Gateway Host', key: 'gatewayHost', type: 'text', icon: <Server className="w-4 h-4" />, placeholder: 'gw.modernik.sap.internal' },
    ],
    email: [
      { label: 'SMTP Host', key: 'smtpHost', type: 'text', icon: <Server className="w-4 h-4" />, placeholder: 'smtp.gmail.com' },
      { label: 'SMTP Port', key: 'smtpPort', type: 'number', icon: <Link className="w-4 h-4" />, placeholder: '587' },
      { label: 'Email Address', key: 'email', type: 'text', icon: <AtSign className="w-4 h-4" />, placeholder: 'reports@modenik.in' },
      { label: 'App Password', key: 'appPassword', type: 'password', icon: <Key className="w-4 h-4" />, placeholder: 'xxxx xxxx xxxx xxxx' },
    ],
    mobile: [
      { label: 'API Base URL', key: 'apiUrl', type: 'text', icon: <Server className="w-4 h-4" />, placeholder: 'https://api.modenik-mobile.in/v1' },
      { label: 'App Key', key: 'appKey', type: 'password', icon: <Key className="w-4 h-4" />, placeholder: 'mk_live_...' },
      { label: 'Organization ID', key: 'orgId', type: 'text', icon: <Building className="w-4 h-4" />, placeholder: 'org_modenik_east' },
      { label: 'API Secret', key: 'apiSecret', type: 'password', icon: <Lock className="w-4 h-4" />, placeholder: '••••••••' },
    ],
  };

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
        { label: 'Configure', action: () => openConfig('tally') },
        { label: 'Sync Now', action: () => triggerSync('tally') },
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
        { label: 'Configure', action: () => openConfig('sheets') },
        { label: 'Export Data', action: () => {} },
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
        { label: 'Configure', action: () => openConfig('whatsapp') },
        { label: 'Send Broadcast', action: () => {} },
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
        { label: 'Configure', action: () => openConfig('sap') },
        { label: 'Sync Ledger', action: () => {} },
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
        { label: 'Configure', action: () => openConfig('email') },
        { label: 'Send Report', action: () => {} },
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
        { label: 'Configure', action: () => openConfig('mobile') },
        { label: 'Push Update', action: () => {} },
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
                          {action.label === 'Configure' ? <Settings className="w-3 h-3" /> : idx === 0 ? <RefreshCw className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
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

      {/* Connector Configuration Modal */}
      <AnimatePresence>
        {configuringConnector && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConfig}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Configure {connectors.find(c => c.id === configuringConnector)?.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-semibold">Enter your API credentials and connection details</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeConfig}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body - Config Fields */}
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {(connectorConfigs[configuringConnector] || []).map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        {field.icon}
                      </div>
                      <input
                        type={field.type}
                        value={configValues[configuringConnector]?.[field.key] || ''}
                        onChange={(e) => updateConfigValue(configuringConnector, field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeConfig}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    closeConfig();
                    // Simulate saving - could connect to real backend
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                >
                  Save & Connect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
