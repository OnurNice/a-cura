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

  // A-Cura Corporate Blue Palette
  const tourColors = ['#1d4ed8', '#0284c7', '#475569'];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [A_CURA_HQ.lat, A_CURA_HQ.lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
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

    // 1. HQ Marker (A-Cura Navy)
    const hqIcon = L.divIcon({
      className: 'custom-hq-marker',
      html: `
        <div style="background: #0f172a; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(15,23,42,0.3); border: 2px solid white; font-weight: bold; font-size: 13px;">
          🏥
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const hqMarker = L.marker([A_CURA_HQ.lat, A_CURA_HQ.lng], { icon: hqIcon }).addTo(layerGroup);
    hqMarker.bindPopup(`
      <div style="font-family: sans-serif; padding: 2px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${A_CURA_HQ.name}</div>
        <div style="font-size: 11px; color: #64748b;">${A_CURA_HQ.address}, ${A_CURA_HQ.city}</div>
        <div style="margin-top: 4px; font-size: 10px; background: #eff6ff; color: #1d4ed8; padding: 2px 6px; border-radius: 4px; display: inline-block; font-weight: 600;">
          Start & Ziel Depot
        </div>
      </div>
    `);

    const bounds = L.latLngBounds([L.latLng(A_CURA_HQ.lat, A_CURA_HQ.lng)]);

    const displayedTours = activeTourId
      ? tours.filter(t => t.id === activeTourId)
      : tours;

    displayedTours.forEach((tour, tIndex) => {
      const color = tourColors[tIndex % tourColors.length];
      const routeCoords: [number, number][] = [[A_CURA_HQ.lat, A_CURA_HQ.lng]];

      tour.stops.forEach(stop => {
        const client = clients.find(c => c.id === stop.clientId);
        if (!client) return;

        routeCoords.push([client.lat, client.lng]);
        bounds.extend([client.lat, client.lng]);

        const isDone = stop.status === 'completed';
        const isProgress = stop.status === 'in_progress';

        const markerHtml = `
          <div style="
            background: ${isDone ? '#059669' : isProgress ? '#f59e0b' : color};
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 12px;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            cursor: pointer;
          ">
            ${isDone ? '✓' : stop.order}
          </div>
        `;

        const stopIcon = L.divIcon({
          className: 'custom-stop-marker',
          html: markerHtml,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const stopMarker = L.marker([client.lat, client.lng], { icon: stopIcon }).addTo(layerGroup);

        stopMarker.bindPopup(`
          <div style="font-family: sans-serif; min-width: 200px; padding: 2px;">
            <div style="font-weight: 700; font-size: 13px; color: #0f172a;">${client.name}</div>
            <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">
              ${client.address}, Wetzlar
            </div>
            <div style="font-size: 11px; background: #f8fafc; padding: 4px 6px; border-radius: 4px;">
              ⏰ <strong>${stop.plannedArrival} Uhr</strong> • PG ${client.careLevel}
            </div>
          </div>
        `);

        stopMarker.on('click', () => {
          if (onSelectStop) onSelectStop(client.id);
        });
      });

      // Close route back to HQ
      routeCoords.push([A_CURA_HQ.lat, A_CURA_HQ.lng]);

      L.polyline(routeCoords, {
        color: color,
        weight: activeTourId === tour.id ? 4 : 2.5,
        opacity: activeTourId && activeTourId !== tour.id ? 0.35 : 0.8,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(layerGroup);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 15 });
    }
  }, [tours, clients, activeTourId, onSelectStop]);

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] flex items-center gap-3 z-[1000] text-slate-600">
        <span className="flex items-center gap-1 font-semibold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          Zentrale
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-brand-600"></span>
          Geplant
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Erledigt
        </span>
      </div>
    </div>
  );
};
