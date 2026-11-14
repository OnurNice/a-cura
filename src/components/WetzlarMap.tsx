import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Tour, Client } from '../types';
import { A_CURA_HQ } from '../data/mockData';

interface WetzlarMapProps {
  tours: Tour[];
  clients: Client[];
  activeTourId?: string;
  onSelectStop?: (clientId: string) => void;
}

export const WetzlarMap: React.FC<WetzlarMapProps> = ({
  tours,
  clients,
  activeTourId,
  onSelectStop
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  // Colors for different tours
  const tourColors = ['#0d9488', '#0284c7', '#8b5cf6', '#f59e0b', '#ec4899'];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map centered on Wetzlar
      const map = L.map(mapContainerRef.current, {
        center: [A_CURA_HQ.lat, A_CURA_HQ.lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Add CartoDB Positron clean map tiles (looks modern, slick and professional)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      layerGroupRef.current = layerGroup;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Add HQ Marker
    const hqIcon = L.divIcon({
      className: 'custom-hq-marker',
      html: `
        <div style="background: linear-gradient(135deg, #059669, #047857); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(5,150,105,0.4); border: 2px solid white; font-weight: bold; font-size: 14px;">
          🏥
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const hqMarker = L.marker([A_CURA_HQ.lat, A_CURA_HQ.lng], { icon: hqIcon }).addTo(layerGroup);
    hqMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 4px;">
        <div style="font-weight: 700; color: #065f46; font-size: 14px;">${A_CURA_HQ.name}</div>
        <div style="font-size: 12px; color: #4b5563;">${A_CURA_HQ.address}, ${A_CURA_HQ.zip} ${A_CURA_HQ.city}</div>
        <div style="margin-top: 6px; font-size: 11px; background: #ecfdf5; color: #047857; padding: 4px 8px; border-radius: 4px; display: inline-block; font-weight: 600;">
          Start- & Ziel-Depot
        </div>
      </div>
    `);

    const bounds = L.latLngBounds([L.latLng(A_CURA_HQ.lat, A_CURA_HQ.lng)]);

    // Filter tours: if activeTourId is selected, show that, otherwise show all
    const displayedTours = activeTourId
      ? tours.filter(t => t.id === activeTourId)
      : tours;

    displayedTours.forEach((tour, tIndex) => {
      const color = tourColors[tIndex % tourColors.length];
      const routeCoords: [number, number][] = [[A_CURA_HQ.lat, A_CURA_HQ.lng]];

      tour.stops.forEach((stop, sIndex) => {
        const client = clients.find(c => c.id === stop.clientId);
        if (!client) return;

        routeCoords.push([client.lat, client.lng]);
        bounds.extend([client.lat, client.lng]);

        // Status badge color
        const isDone = stop.status === 'completed';
        const isProgress = stop.status === 'in_progress';

        const markerHtml = `
          <div style="
            background: ${isDone ? '#10b981' : isProgress ? '#f59e0b' : color};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 13px;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            position: relative;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${isDone ? '✓' : stop.order}
            ${isProgress ? '<span style="position: absolute; top: -3px; right: -3px; width: 10px; height: 10px; background: #ef4444; border-radius: 50%; border: 1.5px solid white;"></span>' : ''}
          </div>
        `;

        const stopIcon = L.divIcon({
          className: 'custom-stop-marker',
          html: markerHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const stopMarker = L.marker([client.lat, client.lng], { icon: stopIcon }).addTo(layerGroup);

        stopMarker.bindPopup(`
          <div style="font-family: sans-serif; min-width: 220px; padding: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="background: ${color}20; color: ${color}; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                Halt #${stop.order} • ${tour.name.split(':')[0]}
              </span>
              <span style="font-size: 11px; font-weight: 600; color: #475569;">
                PG ${client.careLevel}
              </span>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: #1e293b;">${client.name}</div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">
              📍 ${client.address}, ${client.zip} ${client.city}
            </div>
            <div style="display: flex; gap: 8px; font-size: 12px; background: #f8fafc; padding: 6px; border-radius: 6px; margin-bottom: 6px;">
              <div>⏰ <strong>${stop.plannedArrival} - ${stop.plannedDeparture}</strong></div>
              <div>🔑 <strong>${client.keyBox.hasKey ? 'Safe ' + client.keyBox.pinCode : 'Persönlich'}</strong></div>
            </div>
            <div style="font-size: 11px; color: #047857; margin-bottom: 4px;">
              ✓ ${client.sgbXI_Services[0] || 'Grundpflege'}
            </div>
            ${client.sgbV_Services.length > 0 ? `<div style="font-size: 11px; color: #0284c7;">💉 ${client.sgbV_Services[0]}</div>` : ''}
          </div>
        `);

        stopMarker.on('click', () => {
          if (onSelectStop) onSelectStop(client.id);
        });
      });

      // Close circuit back to HQ
      routeCoords.push([A_CURA_HQ.lat, A_CURA_HQ.lng]);

      // Draw polyline connecting HQ and stops
      L.polyline(routeCoords, {
        color: color,
        weight: activeTourId === tour.id ? 4 : 3,
        opacity: activeTourId && activeTourId !== tour.id ? 0.4 : 0.85,
        dashArray: activeTourId === tour.id ? undefined : '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(layerGroup);
    });

    // Fit map bounds smoothly
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [tours, clients, activeTourId, onSelectStop]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-md border border-slate-200/80 text-xs flex items-center gap-3 z-[1000]">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block shadow-sm"></span>
          <span>A-Cura Zentrale Wetzlar</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-3 h-3 rounded-full bg-teal-600 inline-block shadow-sm"></span>
          <span>Geplanter Halt</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
          <span>Gerade in Pflege</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
          <span>Abgeschlossen</span>
        </div>
      </div>
    </div>
  );
};
