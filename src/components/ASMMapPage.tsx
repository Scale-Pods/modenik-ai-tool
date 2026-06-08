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
  Mail,
  Layers,
  Maximize2,
  Crosshair
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ASMLeaderboard } from '../data';
import { ASMLeaderboardEntry } from '../types';

function FitBounds({ asms }: { asms: ASMLeaderboardEntry[] }) {
  const map = useMap();
  if (asms.length > 0) {
    const bounds = L.latLngBounds(asms.map(a => [a.lat, a.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
  }
  return null;
}

interface ASMMapPageProps {
  searchFilter: string;
}

export default function ASMMapPage({ searchFilter }: ASMMapPageProps) {
  const [selectedAsm, setSelectedAsm] = useState<ASMLeaderboardEntry | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');

  const filteredASMs = ASMLeaderboard.filter(m =>
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.region.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const tileUrl = mapStyle === 'streets'
    ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

  const tileAttribution = mapStyle === 'streets'
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    : '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return '#10b981';
      case 'ON TRACK': return '#2563eb';
      case 'CRITICAL': return '#dc2626';
      default: return '#94a3b8';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EXCELLENT': return 'bg-emerald-100 text-emerald-700';
      case 'ON TRACK': return 'bg-blue-100 text-blue-700';
      case 'CRITICAL': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-left"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMapStyle('streets')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mapStyle === 'streets' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Streets</span>
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('satellite')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              mapStyle === 'satellite' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Satellite</span>
          </button>
        </div>
      </div>

      {/* Real Map */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '520px', zIndex: 1 }}>
        <MapContainer
          center={[23.5, 86.5]}
          zoom={6.5}
          scrollWheelZoom={true}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url={tileUrl}
            attribution={tileAttribution}
          />
          <FitBounds asms={filteredASMs} />

          {filteredASMs.map((asm) => (
            <Marker
              key={asm.name}
              position={[asm.lat, asm.lng]}
              icon={createColoredIcon(getStatusColor(asm.status))}
              eventHandlers={{
                click: () => setSelectedAsm(asm),
              }}
            >
              <Popup>
                <div className="text-left" style={{ minWidth: '200px' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black`}
                      style={{ backgroundColor: getStatusColor(asm.status) }}>
                      {asm.initials}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{asm.name}</p>
                      <p className="text-[9px] text-slate-500 font-semibold">{asm.region}, {asm.state}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <span className="text-slate-400 font-semibold">Achievement</span>
                    <span className="text-right font-bold text-slate-900">{asm.ach}%</span>
                    <span className="text-slate-400 font-semibold">Target</span>
                    <span className="text-right font-bold text-slate-900">{asm.targetPrimary}</span>
                    <span className="text-slate-400 font-semibold">Slab Upside</span>
                    <span className="text-right font-bold text-orange-600">{asm.upside}</span>
                    <span className="text-slate-400 font-semibold">Status</span>
                    <span className={`text-right text-[9px] font-bold px-1.5 py-0.5 rounded ${getStatusLabel(asm.status)}`}>
                      {asm.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <div className="glass-panel bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-100 shadow-sm flex flex-col gap-1">
            <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer" title="Zoom In"
              onClick={() => document.querySelector('.leaflet-control-zoom-in')?.dispatchEvent(new MouseEvent('click'))}>
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] glass-panel bg-white/90 backdrop-blur-md rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#10b981' }} />
            <span className="text-[9px] font-bold text-slate-500">Excellent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2563eb' }} />
            <span className="text-[9px] font-bold text-slate-500">On Track</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#dc2626' }} />
            <span className="text-[9px] font-bold text-slate-500">Critical</span>
          </div>
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
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0`}
                  style={{ backgroundColor: getStatusColor(asm.status) }}>
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black`}
                  style={{ backgroundColor: getStatusColor(selectedAsm.status) }}>
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
