import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  ChevronRight,
  X,
  Layers,
  Crosshair,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ASMLeaderboard } from '../data';
import { ASMLeaderboardEntry } from '../types';

interface ASMMapPageProps {
  searchFilter: string;
}

const createColoredIcon = (color: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="12" cy="9" r="3" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

export default function ASMMapPage({ searchFilter }: ASMMapPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedAsm, setSelectedAsm] = useState<ASMLeaderboardEntry | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');

  const filteredASMs = ASMLeaderboard.filter(m =>
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.state.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.region.toLowerCase().includes(searchFilter.toLowerCase())
  );

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

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [23.5, 86.5],
      zoom: 6.5,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    mapInstance.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Switch tile layers when map style changes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const url = mapStyle === 'streets'
      ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    const attr = mapStyle === 'streets'
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      : '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye';

    L.tileLayer(url, { attribution: attr }).addTo(map);
  }, [mapStyle]);

  // Update markers when filtered ASMs change
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const bounds = L.latLngBounds(filteredASMs.map(a => [a.lat, a.lng] as [number, number]));

    filteredASMs.forEach((asm) => {
      const marker = L.marker([asm.lat, asm.lng], {
        icon: createColoredIcon(getStatusColor(asm.status)),
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:200px;font-family:Inter,sans-serif;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:900;background:${getStatusColor(asm.status)};">
              ${asm.initials}
            </div>
            <div>
              <p style="margin:0;font-size:12px;font-weight:900;color:#0f172a;">${asm.name}</p>
              <p style="margin:0;font-size:9px;color:#64748b;font-weight:600;">${asm.region}, ${asm.state}</p>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;font-size:10px;">
            <span style="color:#94a3b8;font-weight:600;">Achievement</span>
            <span style="text-align:right;font-weight:800;color:#0f172a;">${asm.ach}%</span>
            <span style="color:#94a3b8;font-weight:600;">Target</span>
            <span style="text-align:right;font-weight:800;color:#0f172a;">${asm.targetPrimary}</span>
            <span style="color:#94a3b8;font-weight:600;">Slab Upside</span>
            <span style="text-align:right;font-weight:800;color:#ea580c;">${asm.upside}</span>
            <span style="color:#94a3b8;font-weight:600;">Status</span>
            <span style="text-align:right;font-size:9px;font-weight:800;padding:1px 6px;border-radius:4px;background:${
              asm.status === 'EXCELLENT' ? '#d1fae5' : asm.status === 'ON TRACK' ? '#dbeafe' : '#fee2e2'
            };color:${
              asm.status === 'EXCELLENT' ? '#065f46' : asm.status === 'ON TRACK' ? '#1e40af' : '#991b1b'
            };">${asm.status}</span>
          </div>
        </div>
      `);

      marker.on('click', () => setSelectedAsm(asm));
      markersRef.current.push(marker);
    });

    if (filteredASMs.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
    }
  }, [filteredASMs, mapReady]);

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

      {/* Real Map — isolated so Leaflet's internal z-indexes don't leak out */}
      <div
        className="relative w-full rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        style={{ height: 'clamp(320px, 50vw, 520px)', isolation: 'isolate' }}
      >
        <div ref={mapRef} className="w-full h-full" />

        {/* Map Controls — inside isolated container, z-index is local */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => mapInstance.current?.zoomIn()}
            className="glass-panel bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-100 shadow-sm hover:bg-white cursor-pointer"
          >
            <ZoomIn className="w-4 h-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => mapInstance.current?.zoomOut()}
            className="glass-panel bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-100 shadow-sm hover:bg-white cursor-pointer"
          >
            <ZoomOut className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-[400] glass-panel bg-white/90 backdrop-blur-md rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-4">
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

      {/* ASM Cards Strip — horizontal scroll on mobile, grid on larger screens */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0 -mx-1 px-1">
        {filteredASMs.map((asm) => {
          const isSelected = selectedAsm?.name === asm.name;
          return (
            <button
              type="button"
              key={asm.name}
              onClick={() => setSelectedAsm(isSelected ? null : asm)}
              className={`glass-panel rounded-xl p-4 border text-left transition-all cursor-pointer shrink-0 min-w-[160px] sm:min-w-0 ${
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
