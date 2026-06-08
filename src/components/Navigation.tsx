import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Rocket, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  RefreshCw,
  LogOut,
  Sparkles,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { Role, Screen } from '../types';
import Logo from './Logo';

interface NavigationProps {
  role: Role;
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onSwitchRole: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navigation({
  role,
  activeScreen,
  onScreenChange,
  onSwitchRole,
  searchQuery,
  onSearchChange
}: NavigationProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  const navItems = role === 'ASM' ? [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'distributors' as Screen, label: 'Distributors', icon: Users },
    { id: 'planner' as Screen, label: 'Planner', icon: CalendarDays },
    { id: 'phase23' as Screen, label: 'Phase 2/3', icon: Rocket, isFuture: true },
  ] : [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'distributors' as Screen, label: 'Analytics Hub', icon: Users },
    { id: 'planner' as Screen, label: 'Joint Audits', icon: CalendarDays },
    { id: 'asm_map' as Screen, label: 'ASM Map', icon: MapPin },
    { id: 'phase23' as Screen, label: 'Strategy Cockpit', icon: Rocket, isFuture: true },
  ];

  // Professional Unsplash headshots instead of AI faces
  const profileAvatar = role === 'ASM' 
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80";

  const searchPlaceholder = role === 'ASM' ? "Search accounts..." : "Search East Branch...";

  return (
    <>
      {/* 1. Desktop Hover-expanding Sidebar */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:flex flex-col fixed left-0 top-0 h-full bg-white/70 backdrop-blur-xl border-r border-slate-100 p-4 gap-8 z-[45] shadow-sm pt-8 transition-all duration-300 ease-in-out ${
          isHovered ? 'w-64 px-6' : 'w-20 px-3.5 items-center'
        }`}
      >
        
        {/* Brand section */}
        <div className={`flex flex-col gap-2 select-none border-b border-slate-100 pb-4 w-full ${isHovered ? '' : 'items-center'}`}>
          <div className="flex items-center justify-between w-full">
            <Logo variant="banner" size="md" collapsed={!isHovered} />
            {isHovered && (
              <span className="bg-blue-50 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0">
                V2.1
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 ${isHovered ? 'pl-1 justify-start' : 'justify-center'}`}>
            {isHovered && (
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                {role === 'ASM' ? 'Sales Assistant' : 'Sales Intelligence'}
              </p>
            )}
            {!isHovered && (
              <img src="/assets/ScalePods-logo.png" alt="SP" className="h-6 w-auto opacity-50" />
            )}
          </div>
          {isHovered && (
            <div className="flex items-center gap-2 pl-1 pt-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Powered by</span>
              <img src="/assets/ScalePods-logo.png" alt="ScalePods" className="h-6 w-auto" />
            </div>
          )}
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 w-full">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onScreenChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center rounded-xl text-sm font-semibold transition-all relative ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                } ${isHovered ? 'px-3.5 py-2.5 justify-between w-full' : 'w-12 h-12 justify-center'}`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-450'}`} />
                  {isHovered && <span>{item.label}</span>}
                </div>
                {isHovered && item.isFuture && (
                  <span className="text-[9px] bg-blue-700 text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">
                    Preview
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActivePill"
                    className="absolute left-0 w-1 h-5 bg-blue-700 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom items */}
        <div className={`mt-auto pt-6 border-t border-slate-100 flex flex-col gap-1.5 select-none w-full ${isHovered ? '' : 'items-center'}`}>
          
          <button 
            type="button"
            onClick={onSwitchRole}
            className={`bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isHovered ? 'w-full px-3' : 'w-12 h-12 rounded-xl'
            }`}
            title="Switch User Role"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {isHovered && <span>Switch Role</span>}
          </button>

          <button
            type="button"
            onClick={() => onScreenChange('profile')}
            className={`flex items-center gap-3 py-2 rounded-xl text-xs font-semibold text-slate-550 hover:bg-slate-50 transition-colors text-left ${
              isHovered ? 'px-3.5 w-full' : 'w-12 h-12 justify-center'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4 text-slate-450 shrink-0" />
            {isHovered && <span>Settings</span>}
          </button>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-support-helpdesk'))}
            className={`flex items-center gap-3 py-2 rounded-xl text-xs font-semibold text-slate-550 hover:bg-slate-50 transition-colors text-left ${
              isHovered ? 'px-3.5 w-full' : 'w-12 h-12 justify-center'
            }`}
            title="Support"
          >
            <HelpCircle className="w-4 h-4 text-slate-455 shrink-0" />
            {isHovered && <span>Support</span>}
          </button>
        </div>
      </aside>

      {/* 2. Top Navigation Bar */}
      <header className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm md:pl-[104px]">
        
        {/* Left side actions (Hamburger / Search) */}
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile logo (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <Logo variant="banner" size="md" showText={true} />
          </div>

          <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200/60 rounded-full pl-3.5 pr-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all w-64">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="bg-transparent border-none text-xs text-slate-800 font-medium focus:outline-none w-full p-0 placeholder:text-slate-400"
            />
          </div>

          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/50 text-[11px] font-semibold text-slate-505 px-3 py-1 rounded-full border border-slate-200/20">
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>SAP synced · 2 min ago</span>
          </div>
        </div>

        {/* Right side actions (Notifications / Profile) */}
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <button 
              type="button"
              onClick={handleSync}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="Sync Ledger (SAP)"
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>

            <button 
              type="button"
              onClick={() => setNotifications(0)}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-655 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <div className="h-8 w-[1px] bg-slate-100"></div>

          {/* User profile capsule info */}
          <button 
            type="button"
            onClick={() => onScreenChange('profile')}
            className="flex items-center gap-2.5 hover:bg-slate-50 p-1.5 rounded-xl transition-all border border-transparent hover:border-slate-100 cursor-pointer text-left"
          >
            <img 
              src={profileAvatar} 
              alt="Sales Executive" 
              className="w-10 h-10 rounded-full object-cover border border-slate-100 ring-2 ring-white/50"
            />
            <div className="hidden md:block select-none text-left">
              <p className="text-xs font-bold text-slate-800">
                {role === 'ASM' ? 'Rakesh Kumar Parida' : 'Manoranjan'}
              </p>
              <p className="text-[9px] text-slate-505 font-bold uppercase tracking-wider">
                {role === 'ASM' ? 'Area Sales Manager' : 'Regional Branch Manager'}
              </p>
            </div>
          </button>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-[72px] left-0 w-full bg-white border-b border-slate-100 z-40 p-6 flex flex-col gap-6 shadow-lg"
          >
            <div className="sm:hidden flex items-center bg-slate-50 border border-slate-200/60 rounded-full pl-3.5 pr-4 py-2">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent border-none text-xs text-slate-850 font-medium focus:outline-none w-full p-0"
              />
            </div>

            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onScreenChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-700' 
                        : 'text-slate-650'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-slate-400 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => {
                  onSwitchRole();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Switch Role</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Touch Mobile Bottom Nav-Bar sticky layout */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-[45] bg-white/85 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl flex justify-around items-center px-4 py-3 pb-safe">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 pb-1 transition-all ${
                isActive ? 'text-blue-700 font-bold scale-105' : 'text-slate-450 font-medium'
              }`}
            >
              <IconComponent className="w-5 h-5 text-current shrink-0" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
