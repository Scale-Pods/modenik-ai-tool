import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Sparkles, 
  Route, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Role, Screen } from './types';
import Login from './components/Login';
import Navigation from './components/Navigation';
import ASMDashboard from './components/ASMDashboard';
import DistributorDetails from './components/DistributorDetails';
import ManagerCockpit from './components/ManagerCockpit';
import Phase23Preview from './components/Phase23Preview';
import BattleCardModal from './components/BattleCardModal';
import ASMProfile from './components/ASMProfile';
import ManagerProfile from './components/ManagerProfile';
import LandingPage from './components/LandingPage';
import SupportModal from './components/SupportModal';
import ManagerAnalyticsHub from './components/ManagerAnalyticsHub';
import ManagerReviewPlanner from './components/ManagerReviewPlanner';
import ManagerStrategyCockpit from './components/ManagerStrategyCockpit';

export default function App() {
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<Role>('ASM');
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [battleCard, setBattleCard] = useState({
    isOpen: false,
    distributorName: 'UP DB (1004821)'
  });

  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [plannerOptimizing, setPlannerOptimizing] = useState(false);
  const [plannerOptimized, setPlannerOptimized] = useState(false);

  const handleLoginSuccess = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleOptimizeRoute = () => {
    setPlannerOptimizing(true);
    setTimeout(() => {
      setPlannerOptimizing(false);
      setPlannerOptimized(true);
    }, 1500);
  };

  // Wire up support helpdesk event listener at the component top-level
  useEffect(() => {
    const handleSupportClick = () => setIsSupportOpen(true);
    window.addEventListener('open-support-helpdesk', handleSupportClick);
    return () => window.removeEventListener('open-support-helpdesk', handleSupportClick);
  }, []);

  // 1. Rendering Landing Page when showLanding is true
  if (showLanding) {
    return <LandingPage onEnterDashboard={() => setShowLanding(false)} />;
  }

  // 2. Rendering Login screen when unauthenticated
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Visual database for Planner view
  const weeklyPlannerVisits = plannerOptimized ? [
    { day: 'Monday', time: '09:30 AM', client: 'UP DB (1004821)', status: 'COMPLETED', address: 'Lucknow North Cluster', optimized: true },
    { day: 'Tuesday', time: '10:15 AM', client: 'Nagar DB (1003498)', status: 'COMPLETED', address: 'Kanpur Central Gate', optimized: true },
    { day: 'Wednesday', time: '11:30 AM', client: 'Bihar DB (1005291)', status: 'SCHEDULED', address: 'Patna South Gali', optimized: true },
    { day: 'Thursday', time: '01:45 PM', client: 'APTL DB (1007421)', status: 'SCHEDULED', address: 'Varanasi East Mall', optimized: true },
    { day: 'Friday', time: '03:15 PM', client: 'Lucknow Hub', status: 'SCHEDULED', address: 'Sect 12 Depot', optimized: true }
  ] : [
    { day: 'Monday', time: '10:00 AM', client: 'UP DB (1004821)', status: 'COMPLETED', address: 'Lucknow North Cluster', optimized: false },
    { day: 'Tuesday', time: '11:30 AM', client: 'Nagar DB (1003498)', status: 'COMPLETED', address: 'Kanpur Central Gate', optimized: false },
    { day: 'Wednesday', time: '02:00 PM', client: 'APTL DB (1007421)', status: 'SCHEDULED', address: 'Varanasi East Mall', optimized: false },
    { day: 'Thursday', time: '09:00 AM', client: 'Bihar DB (1005291)', status: 'PENDING', address: 'Patna South Gali', optimized: false },
    { day: 'Friday', time: '04:30 PM', client: 'Lucknow Hub', status: 'PENDING', address: 'Sect 12 Depot', optimized: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-blue-100 flex flex-col">
      {/* Universal Side-Nav Drawer & Top Contextual Bar Headers */}
      <Navigation 
        role={role}
        activeScreen={activeScreen}
        onScreenChange={(screen) => {
          if (screen === 'profile') {
            setActiveScreen('profile');
          } else {
            setActiveScreen(screen);
          }
        }}
        onSwitchRole={() => setIsLoggedIn(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Workspace Frame container */}
      <main className="flex-grow md:pl-24 py-8 px-6 pb-24 md:pb-8 transition-all duration-305">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* SCREEN 1: ASM dashboard view */}
              {activeScreen === 'dashboard' && role === 'ASM' && (
                <ASMDashboard 
                  searchFilter={searchQuery}
                  onOpenBattleCard={(name) => setBattleCard({ isOpen: true, distributorName: name })}
                  onNavigateToDistributor={() => setActiveScreen('distributors')}
                  onNavigateToPlanner={() => setActiveScreen('planner')}
                />
              )}

              {/* SCREEN 1 [FOR ROLE=MANAGER]: Manager executive cockpit */}
              {activeScreen === 'dashboard' && role === 'Manager' && (
                <ManagerCockpit 
                  searchFilter={searchQuery}
                  onNavigateToReports={() => setActiveScreen('phase23')}
                />
              )}

              {/* SCREEN 2: Distributors detailed 360 sheet view */}
              {activeScreen === 'distributors' && role === 'ASM' && (
                <DistributorDetails 
                  searchFilter={searchQuery}
                  onOpenBattleCard={(name) => setBattleCard({ isOpen: true, distributorName: name })}
                />
              )}
              {activeScreen === 'distributors' && role === 'Manager' && (
                <ManagerAnalyticsHub />
              )}

              {/* SCREEN 3: Routine Planner agenda calendar */}
              {activeScreen === 'planner' && role === 'ASM' && (
                <div className="space-y-8 text-left">
                  {/* Title banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Visit Planner</h2>
                      <p className="text-sm font-semibold text-slate-500">Route &amp; Travel optimization for Rakesh</p>
                    </div>

                    <button 
                      type="button"
                      onClick={handleOptimizeRoute}
                      disabled={plannerOptimizing}
                      className={`px-5 py-3 rounded-xl font-bold text-xs select-none shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-white ${
                        plannerOptimized ? 'bg-emerald-600' : 'bg-slate-950 hover:bg-blue-700'
                      }`}
                    >
                      {plannerOptimizing ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Recalculating...</span>
                        </>
                      ) : plannerOptimized ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span>AI Route Optimized ✓</span>
                        </>
                      ) : (
                        <>
                          <Route className="w-4 h-4" />
                          <span>Optimize Travel Route</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Operational Agenda split layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Day-to-Day calendar (Left grid) */}
                    <div className="lg:col-span-2 space-y-4">
                      {plannerOptimized && (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <p className="text-xs text-emerald-955 font-bold">
                              Route sequence rearranged dynamically.
                            </p>
                            <p className="text-[10.5px] text-emerald-800 font-semibold">
                              Estimated travel time reduced by 42 minutes based on traffic and geographic clusters.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="glass-panel rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center select-none pb-2 border-b border-indigo-50">
                          <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Weekly Visits Schedule</h3>
                          <span className="text-[10px] bg-blue-50 text-blue-700 font-extrabold px-2 py-0.5 rounded-full">5 Days Plan</span>
                        </div>

                        <div className="divide-y divide-slate-100 space-y-2">
                          {weeklyPlannerVisits.map((v, i) => {
                            const statusColor = v.status === 'COMPLETED' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : v.status === 'SCHEDULED' 
                              ? 'bg-blue-105 text-blue-800' 
                              : 'bg-slate-100 text-slate-500';

                            return (
                              <div key={v.day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 first:pt-1 last:pb-1">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 text-center shrink-0">
                                    <p className="text-xs font-black text-slate-850">{v.day.slice(0, 3)}</p>
                                    <p className="text-[10px] font-bold text-slate-400 font-mono">Day {i + 1}</p>
                                  </div>
                                  <div className="h-8 w-[1.5px] bg-slate-150"></div>
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-900">{v.client}</h4>
                                    <p className="text-[10.5px] text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                      <span>{v.address}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-extrabold text-slate-400 font-mono flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-slate-405" />
                                    <span>{v.time}</span>
                                  </span>
                                  <span className={`px-2.5 py-0.5 text-[9px] font-black rounded ${statusColor}`}>
                                    {v.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Operational Guidelines assistant (Right side sidebar list) */}
                    <aside className="glass-panel p-6 rounded-2xl space-y-6">
                      <div className="flex items-center gap-2 select-none">
                        <CalendarDays className="w-6 h-6 text-blue-700" />
                        <h3 className="text-sm font-bold text-slate-955 tracking-tight uppercase">Visit Protocol</h3>
                      </div>

                      <div className="space-y-4 text-xs text-slate-650 leading-relaxed font-semibold">
                        <div className="p-3 bg-red-50 text-red-955 rounded-xl border border-red-100 flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-red-655 shrink-0" />
                          <p className="text-[11px]">
                            Always review the active <strong>AI Battle Card</strong> immediately before greeting the distributor.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-705 font-bold select-none text-[10px]">1</div>
                          <p className="leading-snug">Perform physical catalog audit of shelves to record competitor stocks.</p>
                        </div>

                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-705 font-bold select-none text-[10px]">2</div>
                          <p className="leading-snug">Validate outstanding ledger sync via SAP connector to guarantee release.</p>
                        </div>

                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-705 font-bold select-none text-[10px]">3</div>
                          <p className="leading-snug">Present the Milestones Ladder targets with the payout calculators.</p>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              )}
              {activeScreen === 'planner' && role === 'Manager' && (
                <ManagerReviewPlanner />
              )}

              {/* SCREEN 4: Combined futuristic Phase 2 & 3 Previews */}
              {activeScreen === 'phase23' && role === 'ASM' && (
                <Phase23Preview />
              )}
              {activeScreen === 'phase23' && role === 'Manager' && (
                <ManagerStrategyCockpit />
              )}

              {/* SCREEN 5: Separated Role Profile Pages */}
              {activeScreen === 'profile' && role === 'ASM' && (
                <ASMProfile onLogout={() => setIsLoggedIn(false)} />
              )}
              {activeScreen === 'profile' && role === 'Manager' && (
                <ManagerProfile onLogout={() => setIsLoggedIn(false)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent AI Battle Card Dialog overlays */}
      <BattleCardModal 
        isOpen={battleCard.isOpen}
        onClose={() => setBattleCard({ ...battleCard, isOpen: false })}
        distributorName={battleCard.distributorName}
      />

      {/* Interactive Support Modal helpdesk */}
      <SupportModal 
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
