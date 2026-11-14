import React, { useState } from 'react';
import {
  Smartphone,
  Navigation,
  Phone,
  Key,
  CheckCircle2,
  HeartPulse,
  FileSignature,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Tour, Client, Employee, TourStop } from '../types';

interface CaregiverMobileViewProps {
  tours: Tour[];
  clients: Client[];
  employees: Employee[];
  initialTourId?: string;
  onUpdateTour: (tour: Tour) => void;
}

export const CaregiverMobileView: React.FC<CaregiverMobileViewProps> = ({
  tours,
  clients,
  employees,
  initialTourId,
  onUpdateTour
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(
    initialTourId || tours[0]?.id || ''
  );
  const activeTour = tours.find(t => t.id === selectedTourId) || tours[0];
  const driver = employees.find(e => e.id === activeTour?.driverId);

  const inProgressIndex = activeTour?.stops.findIndex(s => s.status === 'in_progress');
  const activeIndex = inProgressIndex !== -1 ? inProgressIndex : 0;
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(
    activeIndex >= 0 ? activeIndex : 0
  );

  const currentStop = activeTour?.stops[currentStopIndex];
  const currentClient = clients.find(c => c.id === currentStop?.clientId);

  const [checkedServices, setCheckedServices] = useState<string[]>(
    currentStop?.completedServices || []
  );
  const [bloodPressureSys, setBloodPressureSys] = useState<string>('125');
  const [bloodPressureDia, setBloodPressureDia] = useState<string>('80');
  const [bloodSugar, setBloodSugar] = useState<string>('110');
  const [hasSigned, setHasSigned] = useState<boolean>(Boolean(currentStop?.clientSignature));

  const toggleService = (service: string) => {
    setCheckedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleCompleteStop = () => {
    if (!activeTour || !currentStop) return;

    const updatedStops: TourStop[] = activeTour.stops.map((s, idx) => {
      if (idx === currentStopIndex) {
        return {
          ...s,
          status: 'completed',
          actualDeparture: new Date().toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          completedServices: checkedServices,
          clientSignature: hasSigned ? 'signed_digital' : undefined
        };
      }
      if (idx === currentStopIndex + 1 && s.status === 'pending') {
        return {
          ...s,
          status: 'in_progress',
          actualArrival: new Date().toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
      }
      return s;
    });

    const isAllCompleted = updatedStops.every(s => s.status === 'completed');

    onUpdateTour({
      ...activeTour,
      stops: updatedStops,
      status: isAllCompleted ? 'abgeschlossen' : 'unterwegs'
    });

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });

    if (currentStopIndex < activeTour.stops.length - 1) {
      setCurrentStopIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quiet Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Pfleger-App (Mobile Ansicht)
          </h1>
          <p className="text-xs text-slate-500">
            Fahrermodus für Smartphone im Dienstwagen in Wetzlar.
          </p>
        </div>

        <select
          value={selectedTourId}
          onChange={e => {
            setSelectedTourId(e.target.value);
            setCurrentStopIndex(0);
          }}
          className="text-xs font-medium bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700"
        >
          {tours.map(t => (
            <option key={t.id} value={t.id}>
              {t.name.split(':')[0]}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Mockup (Clean, Calm, A-Cura Blue) */}
      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-3 shadow-xl">
          {/* Speaker notch */}
          <div className="w-24 h-3.5 bg-slate-800 rounded-full mx-auto mb-2.5 flex items-center justify-center">
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>

          <div className="bg-slate-50 rounded-[2rem] overflow-hidden text-slate-900 flex flex-col min-h-[580px]">
            {/* Header: A-Cura Corporate Blue */}
            <div className="bg-brand-700 text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={driver?.avatar}
                  alt={driver?.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-white/50"
                />
                <div>
                  <div className="text-xs font-bold leading-tight">{driver?.name}</div>
                  <div className="text-[10px] text-brand-200">
                    Halt {currentStopIndex + 1} von {activeTour?.stops.length}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-brand-200">
                {activeTour?.vehicle.split('(')[0]}
              </span>
            </div>

            {/* Stepper */}
            <div className="bg-white border-b border-slate-200/80 px-3 py-2 flex items-center justify-between text-xs">
              <button
                disabled={currentStopIndex === 0}
                onClick={() => setCurrentStopIndex(prev => prev - 1)}
                className="p-1 text-slate-500 disabled:opacity-20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-slate-800">
                Halt #{currentStop?.order}: {currentClient?.name}
              </span>
              <button
                disabled={currentStopIndex === (activeTour?.stops.length || 0) - 1}
                onClick={() => setCurrentStopIndex(prev => prev + 1)}
                className="p-1 text-slate-500 disabled:opacity-20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stop Details */}
            {currentClient && (
              <div className="p-3.5 space-y-3 flex-1 overflow-y-auto text-xs">
                {/* Client Card */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {currentClient.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        📍 {currentClient.address}, Wetzlar
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      PG {currentClient.careLevel}
                    </span>
                  </div>

                  {/* Clean 2-Action Row */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        currentClient.address + ', Wetzlar'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 px-2 bg-brand-50 hover:bg-brand-100 text-brand-800 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1 border border-brand-200/60"
                    >
                      <Navigation className="w-3 h-3 text-brand-600" />
                      <span>Navigation</span>
                    </a>
                    <a
                      href={`tel:${currentClient.phone}`}
                      className="py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1 border border-slate-200/80"
                    >
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>Anrufen</span>
                    </a>
                  </div>

                  {currentClient.keyBox.hasKey && (
                    <div className="bg-slate-50 p-2 rounded-lg text-[11px] flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1">
                        <Key className="w-3 h-3 text-slate-400" />
                        <span>Schlüsseltresor:</span>
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        PIN {currentClient.keyBox.pinCode}
                      </span>
                    </div>
                  )}
                </div>

                {/* Services Check */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Leistungen
                  </div>
                  {currentClient.sgbXI_Services.concat(currentClient.sgbV_Services).map(srv => {
                    const isChecked = checkedServices.includes(srv);
                    return (
                      <label
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer text-[11px] ${
                          isChecked
                            ? 'bg-brand-50 border-brand-200 text-brand-900 font-medium'
                            : 'bg-slate-50 border-slate-200/60 text-slate-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-brand-600"
                        />
                        <span className="leading-tight">{srv}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Vital Values */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <HeartPulse className="w-3 h-3 text-brand-600" />
                    <span>Vitalwerte</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Blutdruck</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={bloodPressureSys}
                          onChange={e => setBloodPressureSys(e.target.value)}
                          className="w-12 p-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-semibold"
                        />
                        <span className="text-slate-300">/</span>
                        <input
                          type="number"
                          value={bloodPressureDia}
                          onChange={e => setBloodPressureDia(e.target.value)}
                          className="w-12 p-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Blutzucker (mg/dl)</span>
                      <input
                        type="number"
                        value={bloodSugar}
                        onChange={e => setBloodSugar(e.target.value)}
                        className="w-full p-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Signature Pad */}
                <div
                  onClick={() => setHasSigned(!hasSigned)}
                  className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-center cursor-pointer hover:bg-slate-50 transition"
                >
                  <div className="text-[10px] font-medium text-slate-400 mb-1">
                    {hasSigned ? '✓ Quittiert vom Klienten' : 'Tippen für Klienten-Unterschrift'}
                  </div>
                  {hasSigned ? (
                    <div className="font-serif italic text-sm text-slate-800">
                      ✍️ {currentClient.name}
                    </div>
                  ) : (
                    <div className="text-slate-300 text-xs">Unterschriftsfeld</div>
                  )}
                </div>

                {/* Single Primary Action: Complete */}
                <button
                  onClick={handleCompleteStop}
                  className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Halt #{currentStop?.order} abschließen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
