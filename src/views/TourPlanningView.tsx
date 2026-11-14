import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  Key,
  Clock,
  Car
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Tour, Client, Employee } from '../types';
import { WetzlarMap } from '../components/WetzlarMap';
import { optimizeTourRoute } from '../services/routeOptimizer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

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
  onUpdateTour
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0]?.id || '');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationSuccessMsg, setOptimizationSuccessMsg] = useState<string | null>(null);

  const currentTour = tours.find(t => t.id === selectedTourId) || tours[0];

  const handleRunOptimizer = () => {
    if (!currentTour) return;
    setIsOptimizing(true);
    setOptimizationSuccessMsg(null);

    setTimeout(() => {
      const { optimizedTour, distanceSavedKm, timeSavedMinutes } =
        optimizeTourRoute(currentTour, clients, employees);

      onUpdateTour(optimizedTour);
      setIsOptimizing(false);

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
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tourenplanung & KI-Routen
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatische Reihenfolgeberechnung für mobile Pfleger ab Ostendstraße 10, Wetzlar.
          </p>
        </div>

        <Button
          onClick={handleRunOptimizer}
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{isOptimizing ? 'Optimiere...' : 'Route optimieren'}</span>
        </Button>
      </div>

      {/* Success Banner */}
      {optimizationSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
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

      {/* Tour Selection & Driver */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          {tours.map(tour => {
            const isSelected = tour.id === selectedTourId;
            return (
              <button
                key={tour.id}
                onClick={() => setSelectedTourId(tour.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tour.name.split(':')[0]} ({tour.stops.length} Stopps)
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Fahrer:</span>
          <select
            value={currentTour?.driverId}
            onChange={e => handleDriverChange(e.target.value)}
            className="p-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-800"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Stops List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <CardTitle className="text-xs font-semibold text-slate-900">
                Stopps Reihenfolge ({currentTour?.stops.length})
              </CardTitle>
              <span className="text-xs text-slate-500 font-mono">
                {currentTour?.totalDistanceKm} km gesamt
              </span>
            </CardHeader>

            <CardContent className="p-3 space-y-2">
              {currentTour?.stops.map(stop => {
                const client = clients.find(c => c.id === stop.clientId);
                if (!client) return null;
                const isCompleted = stop.status === 'completed';

                return (
                  <div
                    key={stop.id}
                    className={`p-3 rounded-lg border text-xs transition ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-slate-50/50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] text-white ${
                            isCompleted ? 'bg-emerald-600' : 'bg-brand-700'
                          }`}
                        >
                          {isCompleted ? '✓' : stop.order}
                        </span>
                        <div>
                          <div className="font-semibold text-slate-900">{client.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {client.address}, Wetzlar
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-[11px]">
                        <div className="font-mono font-medium text-slate-700">
                          {stop.plannedArrival} Uhr
                        </div>
                        <span className="text-slate-400">PG {client.careLevel}</span>
                      </div>
                    </div>

                    {client.keyBox.hasKey && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Key className="w-3 h-3 text-slate-400" />
                        <span>Tresor PIN: {client.keyBox.pinCode}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right: Map (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden h-[460px] p-0">
            <WetzlarMap
              tours={tours}
              clients={clients}
              activeTourId={selectedTourId}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
