import React, { useState } from 'react';
import {
  CalendarOff,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText,
  Calendar,
  Sparkles,
  HeartCrack,
  Palmtree
} from 'lucide-react';
import { Absence, Employee } from '../types';

interface AbsenceViewProps {
  absences: Absence[];
  employees: Employee[];
  onAddAbsence: (absence: Absence) => void;
  onUpdateAbsence: (absence: Absence) => void;
}

export const AbsenceView: React.FC<AbsenceViewProps> = ({
  absences,
  employees,
  onAddAbsence,
  onUpdateAbsence
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [selectedEmpId, setSelectedEmpId] = useState<string>(employees[0]?.id || '');
  const [absenceType, setAbsenceType] = useState<'Krankheit' | 'Urlaub' | 'Fortbildung'>('Krankheit');
  const [startDate, setStartDate] = useState<string>('2026-11-15');
  const [endDate, setEndDate] = useState<string>('2026-11-20');
  const [hasDoctorCert, setHasDoctorCert] = useState<boolean>(true);
  const [reason, setReason] = useState<string>('');

  const filteredAbsences = absences.filter(
    a => filterType === 'all' || a.type === filterType
  );

  const handleCreateAbsence = (e: React.FormEvent) => {
    e.preventDefault();
    const newAbs: Absence = {
      id: `abs-${Date.now()}`,
      employeeId: selectedEmpId,
      type: absenceType,
      startDate,
      endDate,
      status: 'genehmigt',
      doctorCertificate: hasDoctorCert,
      reason: reason || (absenceType === 'Krankheit' ? 'AU gemeldet' : 'Erholungsurlaub')
    };

    onAddAbsence(newAbs);
    setIsModalOpen(false);
  };

  const assignSubstitute = (absenceId: string, substituteId: string) => {
    const existing = absences.find(a => a.id === absenceId);
    if (!existing) return;
    onUpdateAbsence({
      ...existing,
      substituteId
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Krankheits- & Urlaubsplan
            </h1>
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Fehlzeiten & Vertretungsmanagement
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Erfassung von elektronischen AU-Bescheinigungen (eAU), Urlaubsansprüchen und automatischer Vertretungsplanung in Wetzlar.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Abwesenheit eintragen</span>
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <HeartCrack className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {absences.filter(a => a.type === 'Krankheit').length}
            </div>
            <div className="text-xs text-slate-500 font-semibold">Aktuelle Krankmeldungen (AU)</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Palmtree className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">
              {absences.filter(a => a.type === 'Urlaub').length}
            </div>
            <div className="text-xs text-slate-500 font-semibold">Erholungsurlaub eingetragen</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-700">100%</div>
            <div className="text-xs text-slate-500 font-semibold">Touren-Vertretung gesichert</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            filterType === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Alle ({absences.length})
        </button>
        <button
          onClick={() => setFilterType('Krankheit')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            filterType === 'Krankheit'
              ? 'bg-rose-600 text-white'
              : 'bg-white text-rose-700 hover:bg-rose-50 border border-slate-200'
          }`}
        >
          Krankheit / AU
        </button>
        <button
          onClick={() => setFilterType('Urlaub')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            filterType === 'Urlaub'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-amber-700 hover:bg-amber-50 border border-slate-200'
          }`}
        >
          Urlaub
        </button>
      </div>

      {/* Absences Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredAbsences.map(absence => {
            const employee = employees.find(e => e.id === absence.employeeId);
            const substitute = employees.find(e => e.id === absence.substituteId);
            const isSick = absence.type === 'Krankheit';

            return (
              <div
                key={absence.id}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={employee?.avatar}
                    alt={employee?.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {employee?.name}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isSick
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {absence.type}
                      </span>
                      {absence.doctorCertificate && (
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
                          ✓ eAU liegt vor
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {absence.reason || 'Keine Notiz'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {/* Date range */}
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{absence.startDate} bis {absence.endDate}</span>
                  </div>

                  {/* Substitute selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500">Vertretung:</span>
                    <select
                      value={absence.substituteId || ''}
                      onChange={e => assignSubstitute(absence.id, e.target.value)}
                      className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    >
                      <option value="">-- Keine Vertretung --</option>
                      {employees
                        .filter(e => e.id !== absence.employeeId && e.status === 'active')
                        .map(e => (
                          <option key={e.id} value={e.id}>
                            {e.name} ({e.role})
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Status badge */}
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Genehmigt
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: New Absence */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                Abwesenheit / AU eintragen
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAbsence} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mitarbeiter *</label>
                <select
                  value={selectedEmpId}
                  onChange={e => setSelectedEmpId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Art der Abwesenheit</label>
                <select
                  value={absenceType}
                  onChange={e => setAbsenceType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="Krankheit">Krankheit (AU)</option>
                  <option value="Urlaub">Erholungsurlaub</option>
                  <option value="Fortbildung">Fortbildung / Qualifizierung</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Von Datum</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bis Datum</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {absenceType === 'Krankheit' && (
                <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasDoctorCert}
                    onChange={e => setHasDoctorCert(e.target.checked)}
                    className="rounded text-brand-600"
                  />
                  <span className="font-bold text-slate-700">
                    Ärztliche Arbeitsunfähigkeitsbescheinigung (eAU) liegt vor
                  </span>
                </label>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bemerkung</label>
                <input
                  type="text"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="z.B. Grippaler Infekt / Hausarzt Wetzlar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
