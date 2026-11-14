import React from 'react';
import {
  Users,
  CalendarCheck,
  Fuel,
  Car,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { Tour, Client, Employee, Absence } from '../types';
import { WetzlarMap } from '../components/WetzlarMap';

interface DashboardViewProps {
  tours: Tour[];
  clients: Client[];
  employees: Employee[];
  absences: Absence[];
  onNavigateTab: (tab: any) => void;
  onOpenMobileCaregiver: (tourId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tours,
  clients,
  employees,
  absences,
  onNavigateTab,
  onOpenMobileCaregiver
}) => {
  const totalStops = tours.reduce((acc, t) => acc + t.stops.length, 0);
  const completedStops = tours.reduce(
    (acc, t) => acc + t.stops.filter(s => s.status === 'completed').length,
    0
  );
  const totalKmSaved = tours.reduce((acc, t) => acc + (t.fuelSavedKm || 0), 0);

  const activeEmployees = employees.filter(e => e.status === 'active');
  const sickEmployees = employees.filter(e => e.status === 'sick');

  return (
    <div className="space-y-5">
      {/* Top Welcome (Clean, Calm, No Button Clutter) */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-brand-200">
            A-Cura Betreuungsdienst • Wetzlar & Lahn-Dill
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
            Willkommen, Mehtap Sarac
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            2 Frühschicht-Touren sind aktiv im Einsatz.
            Durch die Tourenoptimierung wurden heute bereits <strong>{totalKmSaved.toFixed(1)} km</strong> Fahrweg eingespart.
          </p>
        </div>
        <div className="text-right text-xs text-brand-200 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
          <div className="font-semibold">Ostendstraße 10, Naunheim</div>
          <div className="text-[11px] text-slate-300">Stützpunkt Wetzlar</div>
        </div>
      </div>

      {/* KPI Cards (Clean, Quiet, Focused) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs text-slate-500 font-medium">Klienten im Dienst</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{clients.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Pflegegrade 1 bis 5</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs text-slate-500 font-medium">Hausbesuche heute</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {completedStops} <span className="text-xs font-normal text-slate-400">/ {totalStops}</span>
          </div>
          <div className="text-[11px] text-brand-600 font-medium mt-1">
            {Math.round((completedStops / (totalStops || 1)) * 100)}% abgeschlossen
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs text-slate-500 font-medium">Fahrstrecke eingespart</div>
          <div className="text-2xl font-bold text-brand-700 mt-1">
            -{totalKmSaved.toFixed(1)} <span className="text-xs font-normal text-slate-400">km</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            ca. 42% weniger Leerfahrten
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs text-slate-500 font-medium">Team im Einsatz</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {activeEmployees.length} <span className="text-xs font-normal text-slate-400">/ {employees.length}</span>
          </div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">
            {sickEmployees.length} Krankmeldung (eAU)
          </div>
        </div>
      </div>

      {/* ROI & Wirtschaftlichkeit (A-Cura CI Blue / Slate) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <span>Wirtschaftlichkeitsanalyse A-Cura</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
              +2.450 € / Monat Netto-Vorteil
            </span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Ersparnis von ca. 58 Stunden Fachkraft-Fahrzeit und 740 km Treibstoff pro Monat gegenüber manueller Zettelplanung.
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-600">
          <div>Kosten: <strong className="text-slate-800">250 €/Mt.</strong></div>
          <div>Ersparnis: <strong className="text-emerald-700">+2.700 €/Mt.</strong></div>
        </div>
      </div>

      {/* Main Grid: Live Touren & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Active Tours List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Aktive Touren heute
          </div>

          {tours.map(tour => {
            const driver = employees.find(e => e.id === tour.driverId);
            const completedCount = tour.stops.filter(s => s.status === 'completed').length;
            const currentStop = tour.stops.find(s => s.status === 'in_progress');
            const currentClient = clients.find(c => c.id === currentStop?.clientId);

            return (
              <div
                key={tour.id}
                onClick={() => onNavigateTab('tours')}
                className="bg-white rounded-xl border border-slate-200/80 p-4 hover:border-brand-300 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={driver?.avatar}
                      alt={driver?.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{driver?.name}</div>
                      <div className="text-[11px] text-slate-500">{tour.name.split(':')[0]}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded">
                    {tour.stops.length} Stopps
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Fahrzeug: {tour.vehicle.split('(')[0]}</span>
                  <span className="font-semibold text-slate-700">
                    {completedCount} von {tour.stops.length} erledigt
                  </span>
                </div>

                {currentClient && (
                  <div className="bg-slate-50 p-2 rounded-lg text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="font-medium">📍 Gerade bei: {currentClient.name}</span>
                    <span className="font-mono text-slate-400">{currentStop?.plannedArrival} Uhr</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Map (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Live Tourenverlauf Wetzlar
          </div>
          <div className="h-[360px]">
            <WetzlarMap tours={tours} clients={clients} />
          </div>
        </div>
      </div>
    </div>
  );
};
