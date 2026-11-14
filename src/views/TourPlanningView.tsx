import React, { useState } from 'react';
import {
  Navigation,
  Sparkles,
  Car,
  User,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  Plus,
  ArrowUpDown,
  TrendingDown,
  ShieldCheck,
  Key,
  ChevronRight,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Tour, Client, Employee } from '../types';
import { WetzlarMap } from '../components/WetzlarMap';
import { optimizeTourRoute } from '../services/routeOptimizer';

interface TourPlanningViewProps {
  tours: Tour[];
  clients: Client[];
  employees: Employee[];
  onUpdateTour: (updatedTour: Tour) => void;
  onOpenMobileCaregiver: (tourId: string) => void;
  onAutoAssignAllTours: () => void;
}

export const TourPlanningView: React.FC<TourPlanningViewProps> = ({
  tours,
  clients,
  employees,
  onUpdateTour,
  onOpenMobileCaregiver,
  onAutoAssignAllTours
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0]?.id || '');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationSuccessMsg, setOptimizationSuccessMsg] = useState<string | null>(null);

  const currentTour = tours.find(t => t.id === selectedTourId) || tours[0];
  const assignedDriver = employees.find(e => e.id === currentTour?.driverId);

  // Trigger route optimization
  const handleRunOptimizer = () => {
    if (!currentTour) return;
    setIsOptimizing(true);
    setOptimizationSuccessMsg(null);

    setTimeout(() => {
      const { optimizedTour, distanceSavedKm, timeSavedMinutes, co2SavedKg, warnings } =
        optimizeTourRoute(currentTour, clients, employees);

      onUpdateTour(optimizedTour);
      setIsOptimizing(false);

      setOptimizationSuccessMsg(
        `Erfolgreich optimiert! ${distanceSavedKm} km weniger Fahrstrecke (-${Math.round(
          (distanceSavedKm / (optimizedTour.unoptimizedDistanceKm || 30)) * 100
        )}%) & ca. ${timeSavedMinutes} Min. Fahrzeit gespart.`
      );

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  // Change assigned driver for tour
  const handleDriverChange = (driverId: string) => {
    if (!currentTour) return;
    const newDriver = employees.find(e => e.id === driverId);
    const updated: Tour = {
      ...currentTour,
      driverId,
      vehicle: newDriver?.assignedVehicle || currentTour.vehicle
    };
    onUpdateTour(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Tourenplanung & KI-Routenoptimierung
            </h1>
            <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
              VRP Smart Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Minimiert automatisch Leerfahrten, optimiert Stopp-Reihenfolgen und gleicht SGB V Qualifikationen in Wetzlar ab.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onAutoAssignAllTours}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Alle Klienten auto-verteilen</span>
          </button>

          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="px-4 py-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-600/20 transition flex items-center gap-2 disabled:opacity-70"
          >
            {isOptimizing ? (
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>{isOptimizing ? 'Optimiere Route...' : 'KI-Route jetzt berechnen'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification after Optimization */}
      {optimizationSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-900 animate-fadeIn">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{optimizationSuccessMsg}</span>
          </div>
          <button
            onClick={() => setOptimizationSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tour Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tours.map(tour => {
          const isSelected = tour.id === selectedTourId;
          const driver = employees.find(e => e.id === tour.driverId);
          return (
            <button
              key={tour.id}
              onClick={() => setSelectedTourId(tour.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                isSelected
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Car className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="leading-tight">{tour.name.split(':')[0]}</div>
                <div className={`text-[10px] font-normal ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {driver?.name || 'Kein Fahrer'} • {tour.stops.length} Stopps
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Tour Details & Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Tour Stops & Optimization Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Driver & Efficiency Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Zugewiesener Fahrer & Dienstwagen
              </span>
              <button
                onClick={() => onOpenMobileCaregiver(currentTour.id)}
                className="text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
              >
                <Play className="w-3 h-3 text-brand-600" />
                <span>Pfleger-App öffnen</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={assignedDriver?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={assignedDriver?.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div className="flex-1">
                <select
                  value={currentTour.driverId}
                  onChange={e => handleDriverChange(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-1.5 focus:ring-brand-500"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role} • {emp.assignedVehicle})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{assignedDriver?.assignedVehicle}</span>
                  <span>•</span>
                  <span>{assignedDriver?.qualifications[0]}</span>
                </div>
              </div>
            </div>

            {/* Savings stats box */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-2 rounded-xl">
                <div className="text-[10px] text-slate-500 font-semibold">Strecke gesamt</div>
                <div className="text-sm font-black text-slate-800">{currentTour.totalDistanceKm} km</div>
              </div>
              <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-emerald-800 font-semibold">Eingespart</div>
                <div className="text-sm font-black text-emerald-700">-{currentTour.fuelSavedKm || 0} km</div>
              </div>
              <div className="bg-teal-50 p-2 rounded-xl border border-teal-100">
                <div className="text-[10px] text-teal-800 font-semibold">CO₂ Minderung</div>
                <div className="text-sm font-black text-teal-700">~{currentTour.co2SavedKg || 0} kg</div>
              </div>
            </div>
          </div>

          {/* Stops List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Geplante Stopps ({currentTour.stops.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                Depot: Ostendstraße 10, Wetzlar (HQ)
              </span>
            </div>

            <div className="space-y-2">
              {currentTour.stops.map((stop, idx) => {
                const client = clients.find(c => c.id === stop.clientId);
                if (!client) return null;
                const isCompleted = stop.status === 'completed';
                const isCurrent = stop.status === 'in_progress';

                return (
                  <div
                    key={stop.id}
                    className={`p-3 rounded-xl border transition text-xs space-y-2 ${
                      isCompleted
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : isCurrent
                        ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs text-white ${
                            isCompleted
                              ? 'bg-emerald-600'
                              : isCurrent
                              ? 'bg-amber-500'
                              : 'bg-slate-700'
                          }`}
                        >
                          {isCompleted ? '✓' : stop.order}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {client.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {client.address}, Wetzlar
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-800">
                          {stop.plannedArrival} - {stop.plannedDeparture}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          PG {client.careLevel} • {client.durationMinutes}m
                        </span>
                      </div>
                    </div>

                    {/* Services and Key info */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <div className="truncate max-w-[240px] text-slate-600">
                        {client.sgbXI_Services[0]}
                      </div>
                      <div className="flex items-center gap-2">
                        {client.keyBox.hasKey ? (
                          <span className="text-amber-700 font-semibold flex items-center gap-1 bg-amber-100/70 px-1.5 py-0.5 rounded">
                            <Key className="w-3 h-3" />
                            <span>Code {client.keyBox.pinCode}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Kein Safe</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Leaflet Map (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-brand-600" />
              <span>Kartendarstellung Tour Wetzlar</span>
            </div>
            <div className="text-xs text-slate-500">
              Start & Ende: Zentrale Ostendstraße (Naunheim)
            </div>
          </div>

          <div className="h-[620px] rounded-2xl overflow-hidden shadow-sm">
            <WetzlarMap
              tours={tours}
              clients={clients}
              activeTourId={selectedTourId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
