import React, { useState, useRef } from 'react';
import {
  Smartphone,
  Navigation,
  Phone,
  Key,
  CheckCircle2,
  Clock,
  HeartPulse,
  Activity,
  FileSignature,
  ArrowRight,
  ShieldAlert,
  Car,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Tour, Client, Employee, TourStop, VitalRecord } from '../types';

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

  // Current active stop index or first non-completed
  const inProgressIndex = activeTour?.stops.findIndex(s => s.status === 'in_progress');
  const activeIndex = inProgressIndex !== -1 ? inProgressIndex : 0;
  const [currentStopIndex, setCurrentStopIndex] = useState<number>(
    activeIndex >= 0 ? activeIndex : 0
  );

  const currentStop = activeTour?.stops[currentStopIndex];
  const currentClient = clients.find(c => c.id === currentStop?.clientId);

  // Form states for current stop
  const [checkedServices, setCheckedServices] = useState<string[]>(
    currentStop?.completedServices || []
  );
  const [bloodPressureSys, setBloodPressureSys] = useState<string>('128');
  const [bloodPressureDia, setBloodPressureDia] = useState<string>('82');
  const [pulse, setPulse] = useState<string>('72');
  const [bloodSugar, setBloodSugar] = useState<string>('115');
  const [nurseNotes, setNurseNotes] = useState<string>(currentStop?.nurseNotes || '');
  const [showKeySafe, setShowKeySafe] = useState<boolean>(false);
  const [hasSigned, setHasSigned] = useState<boolean>(Boolean(currentStop?.clientSignature));

  const toggleService = (service: string) => {
    setCheckedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  // Mark current stop as completed & advance to next
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
          nurseNotes,
          clientSignature: hasSigned ? 'signed_digital' : undefined,
          vitalRecord: {
            id: `vr-${Date.now()}`,
            timestamp: 'Heute, ' + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            bloodPressureSystolic: Number(bloodPressureSys) || undefined,
            bloodPressureDiastolic: Number(bloodPressureDia) || undefined,
            heartRate: Number(pulse) || undefined,
            bloodSugar: Number(bloodSugar) || undefined,
            notes: nurseNotes
          }
        };
      }
      // If next stop is pending, promote to in_progress
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

    const updatedTour: Tour = {
      ...activeTour,
      stops: updatedStops,
      status: isAllCompleted ? 'abgeschlossen' : 'unterwegs'
    };

    onUpdateTour(updatedTour);

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });

    if (currentStopIndex < activeTour.stops.length - 1) {
      setCurrentStopIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Pfleger-App (Mobile Ansicht für Unterwegs)
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Fahrermodus
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Optimierte Smartphone-Ansicht für die Pflegekraft im Dienstwagen in Wetzlar.
          </p>
        </div>

        {/* Tour Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Aktive Tour:</label>
          <select
            value={selectedTourId}
            onChange={e => {
              setSelectedTourId(e.target.value);
              setCurrentStopIndex(0);
            }}
            className="text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-brand-500"
          >
            {tours.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Container: Mobile Phone Frame Mockup in Center */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
          
          {/* Phone Speaker Notch */}
          <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-700/60 mr-2"></div>
            <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
          </div>

          {/* Screen Content */}
          <div className="bg-slate-50 rounded-[2rem] overflow-hidden text-slate-900 shadow-inner flex flex-col min-h-[680px]">
            
            {/* Mobile App Header */}
            <div className="bg-brand-600 text-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={driver?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={driver?.name}
                    className="w-8 h-8 rounded-full border border-white/60 object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold leading-tight">{driver?.name}</div>
                    <div className="text-[10px] text-emerald-100">{driver?.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold bg-emerald-500 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {activeTour?.shift}schicht
                  </span>
                </div>
              </div>

              {/* Progress counter */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-100 pt-1 border-t border-emerald-500/40">
                <span>Halt {currentStopIndex + 1} von {activeTour?.stops.length}</span>
                <span>Fahrzeug: {activeTour?.vehicle.split('(')[0]}</span>
              </div>
            </div>

            {/* Stop Switcher buttons (Prev / Next) */}
            <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between">
              <button
                disabled={currentStopIndex === 0}
                onClick={() => setCurrentStopIndex(prev => prev - 1)}
                className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-extrabold text-slate-800">
                Patient #{currentStop?.order}: {currentClient?.name}
              </span>
              <button
                disabled={currentStopIndex === (activeTour?.stops.length || 0) - 1}
                onClick={() => setCurrentStopIndex(prev => prev + 1)}
                className="p-1 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Patient Detail Area */}
            {currentClient ? (
              <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[500px]">
                {/* Client Main Card */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                        {currentClient.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        📍 {currentClient.address}, Wetzlar
                      </p>
                    </div>
                    <span className="text-xs font-extrabold bg-brand-100 text-brand-800 px-2.5 py-1 rounded-lg">
                      PG {currentClient.careLevel}
                    </span>
                  </div>

                  {/* Navigation & Call Quick Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        currentClient.address + ', Wetzlar'
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Navigation</span>
                    </a>
                    <a
                      href={`tel:${currentClient.phone}`}
                      className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Anrufen</span>
                    </a>
                  </div>

                  {/* Key Safe box */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-amber-500" />
                        <span>Schlüsselsafe:</span>
                      </span>
                      {currentClient.keyBox.hasKey ? (
                        <button
                          onClick={() => setShowKeySafe(!showKeySafe)}
                          className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]"
                        >
                          {showKeySafe ? currentClient.keyBox.pinCode : '•• Code anzeigen'}
                        </button>
                      ) : (
                        <span className="text-slate-400">Kein Safe (Klingeln)</span>
                      )}
                    </div>
                    {currentClient.keyBox.location && (
                      <div className="text-[11px] text-slate-500 mt-1">
                        Ort: {currentClient.keyBox.location}
                      </div>
                    )}
                  </div>

                  {/* Important Medical Notes / Allergies */}
                  {currentClient.allergiesNotes && (
                    <div className="bg-rose-50 border border-rose-200/80 p-2.5 rounded-xl text-xs">
                      <div className="font-bold text-rose-800 flex items-center gap-1 mb-0.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Wichtiger Pflegehinweis:</span>
                      </div>
                      <div className="text-[11px] text-rose-700 font-medium">
                        {currentClient.allergiesNotes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Checklist */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Leistungen abhaken</span>
                    <span className="text-brand-600 font-semibold text-[11px]">
                      {checkedServices.length} ausgewählt
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {/* SGB XI */}
                    {currentClient.sgbXI_Services.map(srv => {
                      const isChecked = checkedServices.includes(srv);
                      return (
                        <label
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                          />
                          <span className="text-[11px] leading-tight">{srv}</span>
                        </label>
                      );
                    })}

                    {/* SGB V */}
                    {currentClient.sgbV_Services.map(srv => {
                      const isChecked = checkedServices.includes(srv);
                      return (
                        <label
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer transition ${
                            isChecked
                              ? 'bg-blue-50 border-blue-300 text-blue-950 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-[11px] leading-tight">💉 {srv}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Vital Signs Input */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    <span>Vitalwerte erfassen</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-0.5">
                        Blutdruck (RR)
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={bloodPressureSys}
                          onChange={e => setBloodPressureSys(e.target.value)}
                          placeholder="120"
                          className="w-14 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                        />
                        <span className="text-slate-400">/</span>
                        <input
                          type="number"
                          value={bloodPressureDia}
                          onChange={e => setBloodPressureDia(e.target.value)}
                          placeholder="80"
                          className="w-14 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-0.5">
                        Blutzucker (mg/dl)
                      </label>
                      <input
                        type="number"
                        value={bloodSugar}
                        onChange={e => setBloodSugar(e.target.value)}
                        placeholder="110"
                        className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Digital Signature */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <FileSignature className="w-4 h-4 text-brand-600" />
                      <span>Digitale Klienten-Unterschrift</span>
                    </span>
                    {hasSigned && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        ✓ Quittiert
                      </span>
                    )}
                  </div>
                  
                  <div
                    onClick={() => setHasSigned(true)}
                    className="h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition"
                  >
                    {hasSigned ? (
                      <span className="font-serif italic text-lg text-slate-800 select-none">
                        ✍️ {currentClient.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        Tippen zum elektronischen Abzeichnen
                      </span>
                    )}
                  </div>
                </div>

                {/* Complete Button */}
                <button
                  onClick={handleCompleteStop}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Halt #{currentStop?.order} abschließen</span>
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                Kein Klient ausgewählt.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
