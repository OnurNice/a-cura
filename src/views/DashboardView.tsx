import React from 'react';
import {
  Users,
  Navigation,
  Clock,
  Fuel,
  AlertTriangle,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  Car,
  HeartPulse,
  Sparkles
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
  // Compute aggregated stats
  const totalStops = tours.reduce((acc, t) => acc + t.stops.length, 0);
  const completedStops = tours.reduce(
    (acc, t) => acc + t.stops.filter(s => s.status === 'completed').length,
    0
  );
  const inProgressStops = tours.reduce(
    (acc, t) => acc + t.stops.filter(s => s.status === 'in_progress').length,
    0
  );

  const totalKmSaved = tours.reduce((acc, t) => acc + (t.fuelSavedKm || 0), 0);
  const totalCo2Saved = tours.reduce((acc, t) => acc + (t.co2SavedKg || 0), 0);

  const activeEmployees = employees.filter(e => e.status === 'active');
  const sickEmployees = employees.filter(e => e.status === 'sick');
  const vacationEmployees = employees.filter(e => e.status === 'vacation');

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-teal-700 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>A-Cura Leitstand • Wetzlar & Lahn-Dill</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Guten Tag, Pflegedienstleitung Wetzlar
            </h1>
            <p className="text-sm text-emerald-100 max-w-2xl mt-1">
              Alle 2 Frühschicht-Touren sind pünktlich im Raum Wetzlar unterwegs.
              KI-Routenoptimierung spart heute bereits <strong>{totalKmSaved.toFixed(1)} km</strong> Fahrweg.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('tours')}
              className="px-4 py-2.5 bg-white text-brand-900 rounded-xl font-bold text-xs shadow-md hover:bg-emerald-50 transition flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-brand-600" />
              <span>Touren verwalten</span>
            </button>
            <button
              onClick={() => onNavigateTab('clients')}
              className="px-4 py-2.5 bg-brand-800/80 hover:bg-brand-800 border border-emerald-400/30 text-white rounded-xl font-bold text-xs transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Klientenübersicht</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Klienten */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              PG 1 - 5 aktiv
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{clients.length}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Betreute Klienten</div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span>Wetzlar, Naunheim, Dalheim</span>
          </div>
        </div>

        {/* Card 2: Hausbesuche heute */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              {completedStops} / {totalStops} erledigt
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalStops}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Heutige Hausbesuche</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedStops / (totalStops || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 3: KI-Fahrstrecke & Ersparnis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Fuel className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              -44% Fahrzeit
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalKmSaved.toFixed(1)} <span className="text-sm font-semibold text-slate-500">km</span>
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Eingesparter Weg heute</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>~{totalCo2Saved.toFixed(1)} kg CO₂ & Sprit gespart</span>
          </div>
        </div>

        {/* Card 4: Mitarbeiter Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
              {sickEmployees.length} Krank / AU
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {activeEmployees.length} <span className="text-sm font-semibold text-slate-500">/ {employees.length}</span>
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Pflegekräfte einsatzbereit</div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
            <span className="text-amber-600 font-medium">1 Urlaub</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">2 im Auto</span>
          </div>
        </div>
      </div>

      {/* Math-Hub Wirtschaftlichkeits- & ROI-Rechner (Hard Fact ROI) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-5 text-white shadow-md border border-slate-700/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Wirtschaftlichkeitsanalyse A-Cura
              </span>
              <span className="text-xs font-bold text-amber-400">
                +2.450 € monatlicher Netto-Ertrag (ROI: 980%)
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">
              Wirtschaftlicher Mehrwert gegenüber dem bisherigen Zustand
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl">
              Durch die mathematische 2-Opt Tourenreduktion und automatische eAU-Dienstplanverknüpfung spart der Pflegedienst ca. <strong>58 Stunden Fachkraft-Fahrzeit</strong> und ca. <strong>740 km Treibstoff</strong> pro Monat ein.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center flex-shrink-0 bg-white/5 p-3 rounded-xl border border-white/10">
            <div>
              <div className="text-[10px] text-slate-400">Software-Kosten</div>
              <div className="text-xs font-bold text-slate-200">250 € / Mt.</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Eingespart</div>
              <div className="text-xs font-bold text-emerald-400">+2.700 € / Mt.</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Netto-Vorteil</div>
              <div className="text-xs font-bold text-amber-300">+2.450 € / Mt.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Active Tours */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-brand-600" />
              <span>Aktive Touren heute</span>
            </h2>
            <button
              onClick={() => onNavigateTab('tours')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Alle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {tours.map(tour => {
            const driver = employees.find(e => e.id === tour.driverId);
            const completedCount = tour.stops.filter(s => s.status === 'completed').length;
            const currentStop = tour.stops.find(s => s.status === 'in_progress');
            const nextStop = tour.stops.find(s => s.status === 'pending');
            const currentClient = clients.find(c => c.id === currentStop?.clientId);
            const nextClient = clients.find(c => c.id === nextStop?.clientId);

            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-brand-300 transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={driver?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={driver?.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{driver?.name}</div>
                      <div className="text-xs text-slate-500">{tour.name}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Unterwegs
                  </span>
                </div>

                {/* Vehicle & Tour metric info */}
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tour.vehicle}</span>
                  </div>
                  <div className="font-mono font-bold text-slate-700">
                    {tour.totalDistanceKm} km • {tour.stops.length} Stopps
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Fortschritt</span>
                    <span className="font-bold text-brand-700">
                      {completedCount} von {tour.stops.length} Patienten
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-500 h-2 rounded-full transition-all"
                      style={{ width: `${(completedCount / tour.stops.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Currently at / Next patient */}
                {currentClient && (
                  <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center justify-between font-bold text-amber-900 mb-0.5">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Aktueller Halt #{currentStop?.order}:
                      </span>
                      <span>{currentStop?.plannedArrival} Uhr</span>
                    </div>
                    <div className="font-semibold text-slate-800">{currentClient.name}</div>
                    <div className="text-slate-500 text-[11px]">{currentClient.address}, Wetzlar</div>
                  </div>
                )}

                {/* One click button to open mobile caregiver view for this driver */}
                <button
                  onClick={() => onOpenMobileCaregiver(tour.id)}
                  className="w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-brand-200/60"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-600" />
                  <span>Pfleger-App (Mobile Ansicht) öffnen</span>
                </button>
              </div>
            );
          })}

          {/* Urgent PDL Notifications */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                Dienstübergabe & Vorkommnisse
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                Heute
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-lg border-l-2 border-emerald-400">
                <div className="font-bold text-slate-200">Erika Schmidt (Hausertorstraße)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  BZ 135 mg/dl • 6 IE Insulin gespritzt von T. Müller. Alles wohlauf.
                </div>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-lg border-l-2 border-amber-400">
                <div className="font-bold text-slate-200">Anna Vogel (Pflegehelferin)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Krankmeldung bis 17.11. • Vertretung durch Mehmet Yilmaz sichergestellt.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Map of Wetzlar with Tour Stops */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brand-600" />
                <span>Live Leitstand Karte: Stadtgebiet Wetzlar</span>
              </h2>
              <p className="text-xs text-slate-500">
                Echtzeit-Standorte, Routenverläufe und Stopps im Lahn-Dill-Kreis
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('tours')}
              className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-bold rounded-lg border border-brand-200 transition"
            >
              Routenplaner Vollbild
            </button>
          </div>

          <div className="h-[520px]">
            <WetzlarMap tours={tours} clients={clients} />
          </div>
        </div>
      </div>
    </div>
  );
};
