import React from 'react';
import {
  Users,
  CalendarCheck,
  Fuel,
  Car,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Tour, Client, Employee, Absence } from '../types';
import { WetzlarMap } from '../components/WetzlarMap';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

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
  onNavigateTab
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
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Leitstand & Cockpit
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Echtzeit-Übersicht für A-Cura Wetzlar • Stützpunkt Ostendstraße 10
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-slate-600 bg-white">
            {activeEmployees.length} Mitarbeiter im Einsatz
          </Badge>
          <Badge variant="default">
            2 Touren aktiv
          </Badge>
        </div>
      </div>

      {/* 4 Standardized Metric Cards (Pixel-Perfect Alignment) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Klienten im Dienst</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">{clients.length}</div>
            <p className="text-xs text-slate-500 mt-1">Wetzlar & Lahn-Dill-Kreis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Hausbesuche heute</CardTitle>
            <CalendarCheck className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {completedStops} <span className="text-xs font-normal text-slate-400">/ {totalStops}</span>
            </div>
            <p className="text-xs text-brand-700 font-medium mt-1">
              {Math.round((completedStops / (totalStops || 1)) * 100)}% abgeschlossen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Fahrweg-Einsparung</CardTitle>
            <Fuel className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-brand-700">
              -{totalKmSaved.toFixed(1)} <span className="text-xs font-normal text-slate-400">km</span>
            </div>
            <p className="text-xs text-emerald-700 font-medium mt-1">
              -42% Leerfahrten durch KI-VRP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Krankmeldungen (AU)</CardTitle>
            <Car className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {sickEmployees.length} <span className="text-xs font-normal text-slate-400">/ {employees.length}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              1 Vertretung zugewiesen
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wirtschaftlichkeits-Box (Clean, Structured) */}
      <Card className="bg-slate-50/50 border-slate-200">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <span>Wirtschaftlicher Mehrwert A-Cura</span>
              <Badge variant="success" className="font-mono text-[10px]">
                +2.450 € / Monat Netto-Vorteil
              </Badge>
            </div>
            <p className="text-slate-500 text-[11px]">
              Einsparung von ca. 58 Stunden Fachkraft-Fahrzeit und 740 km Treibstoff pro Monat gegenüber manueller Zettelplanung.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-600">
            <div>Lizenz: <strong className="text-slate-800">250 €/Mt.</strong></div>
            <div>Ersparnis: <strong className="text-emerald-700">+2.700 €/Mt.</strong></div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Active Tours & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Tours List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Aktive Touren
          </h2>

          <div className="space-y-3">
            {tours.map(tour => {
              const driver = employees.find(e => e.id === tour.driverId);
              const completedCount = tour.stops.filter(s => s.status === 'completed').length;
              const currentStop = tour.stops.find(s => s.status === 'in_progress');
              const currentClient = clients.find(c => c.id === currentStop?.clientId);

              return (
                <Card
                  key={tour.id}
                  onClick={() => onNavigateTab('tours')}
                  className="cursor-pointer hover:border-brand-400 transition-all p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={driver?.avatar}
                        alt={driver?.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{driver?.name}</div>
                        <div className="text-[11px] text-slate-500">{tour.name.split(':')[0]}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {tour.stops.length} Stopps
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>{tour.vehicle.split('(')[0]}</span>
                    <span className="font-medium text-slate-700">
                      {completedCount} von {tour.stops.length} erledigt
                    </span>
                  </div>

                  {currentClient && (
                    <div className="bg-slate-50 p-2 rounded-lg text-[11px] text-slate-600 flex items-center justify-between">
                      <span className="font-medium">📍 Gerade bei: {currentClient.name}</span>
                      <span className="font-mono text-slate-400">{currentStop?.plannedArrival} Uhr</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right: Map (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Kartenverlauf Wetzlar
            </h2>
            <span className="text-xs text-slate-400">
              Start: Ostendstraße 10
            </span>
          </div>
          <Card className="overflow-hidden h-[380px] p-0">
            <WetzlarMap tours={tours} clients={clients} />
          </Card>
        </div>
      </div>
    </div>
  );
};
