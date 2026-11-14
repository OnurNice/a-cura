import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  Key,
  MapPin,
  Clock,
  Play
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
  onOpenMobileCaregiver
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0]?.id || '');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationSuccessMsg, setOptimizationSuccessMsg] = useState<string | null>(null);
  const [optimizationStep, setOptimizationStep] = useState<string>('');

  const currentTour = tours.find(t => t.id === selectedTourId) || tours[0];
  const assignedDriver = employees.find(e => e.id === currentTour?.driverId);

  // Single primary optimization action
  const handleRunOptimizer = () => {
    if (!currentTour) return;
    setIsOptimizing(true);
    setOptimizationSuccessMsg(null);
    setOptimizationStep('Berechne Distanzmatrix & optimiere Reihenfolge...');

    setTimeout(() => {
      const { optimizedTour, distanceSavedKm, timeSavedMinutes } =
        optimizeTourRoute(currentTour, clients, employees);

      onUpdateTour(optimizedTour);
      setIsOptimizing(false);
      setOptimizationStep('');

      setOptimizationSuccessMsg(
        `Optimiert: ${distanceSavedKm} km weniger Fahrstrecke & ca. ${timeSavedMinutes} Min. Fahrzeit gespart.`
      );

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleDriverChange = (driverId: string) => {
    if (!currentTour) return;
    const newDriver = employees.find(e => e.id === driverId);
    onUpdateTour({
      ...currentTour,
      driverId,
      vehicle: newDriver?.assignedVehicle || currentTour.vehicle
    });
  };

  return (
    <div className="space-y-4">
      {/* Header bar (Just ONE clear primary action, no clutter) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Tourenplanung & Routenoptimierung
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatische Reihenfolgeberechnung für mobile Pfleger ab Ostendstraße 10, Wetzlar.
          </p>
        </div>

        <button
          onClick={handleRunOptimizer}
          disabled={isOptimizing}
          className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isOptimizing ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-brand-200" />
          )}
          <span>{isOptimizing ? 'Optimiere...' : 'Route optimieren'}</span>
        </button>
      </div>

      {/* Optimization Message */}
      {optimizationSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{optimizationSuccessMsg}</span>
          </div>
          <button
            onClick={() => setOptimizationSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-sm font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tour Selection (Clean Tabs) */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {tours.map(tour => {
            const isSelected = tour.id === selectedTourId;
            return (
              <button
                key={tour.id}
                onClick={() => setSelectedTourId(tour.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-white text-brand-800 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tour.name.split(':')[0]} ({tour.stops.length} Stopps)
              </button>
            );
          })}
        </div>

        {/* Quiet Driver Select */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Fahrer:</span>
          <select
            value={currentTour?.driverId}
            onChange={e => handleDriverChange(e.target.value)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.assignedVehicle.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Stops List & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Stops List (Clean, Calm, No Button Clutter) (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-semibold text-slate-800">
                Stopps Reihenfolge ({currentTour?.stops.length})
              </span>
              <span>{currentTour?.totalDistanceKm} km gesamt</span>
            </div>

            <div className="space-y-1.5">
              {currentTour?.stops.map(stop => {
                const client = clients.find(c => c.id === stop.clientId);
                if (!client) return null;
                const isCompleted = stop.status === 'completed';

                return (
                  <div
                    key={stop.id}
                    className={`p-2.5 rounded-lg border text-xs transition ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200/70 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] text-white ${
                            isCompleted ? 'bg-emerald-600' : 'bg-brand-700'
                          }`}
                        >
                          {isCompleted ? '✓' : stop.order}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{client.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {client.address}, Wetzlar
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-[11px]">
                        <div className="font-mono font-semibold text-slate-700">
                          {stop.plannedArrival} Uhr
                        </div>
                        <span className="text-slate-400">PG {client.careLevel}</span>
                      </div>
                    </div>

                    {client.keyBox.hasKey && (
                      <div className="mt-1.5 pt-1 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Key className="w-3 h-3 text-slate-400" />
                        <span>Tresor PIN: {client.keyBox.pinCode}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Map (7 cols) */}
        <div className="lg:col-span-7">
          <div className="h-[460px]">
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
