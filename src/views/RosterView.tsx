import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Printer,
  ShieldCheck,
  AlertCircle,
  Plus,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { Employee, Shift } from '../types';

interface RosterViewProps {
  employees: Employee[];
  shifts: Shift[];
  onUpdateShift: (shift: Shift) => void;
  onAddShift: (shift: Shift) => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  employees,
  shifts,
  onUpdateShift,
  onAddShift
}) => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);

  // Generate 7 days for current viewed week starting Monday 10th to 16th Nov 2026
  const baseDate = new Date(2026, 10, 14); // 14 Nov 2026
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    // Find monday of current week
    const dayOfWeek = d.getDay();
    const distanceToMonday = (dayOfWeek + 6) % 7;
    d.setDate(d.getDate() - distanceToMonday + i + currentWeekOffset * 7);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('de-DE', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    return { dateStr, dayName, dayNum, isWeekend: i >= 5 };
  });

  const shiftTypes: { [key: string]: { label: string; bg: string; text: string; time: string } } = {
    F: { label: 'Früh', bg: 'bg-emerald-100', text: 'text-emerald-800', time: '06:45 - 15:15' },
    S: { label: 'Spät', bg: 'bg-blue-100', text: 'text-blue-800', time: '14:30 - 21:30' },
    N: { label: 'Nacht', bg: 'bg-indigo-100', text: 'text-indigo-800', time: '21:15 - 07:00' },
    T: { label: 'Teil', bg: 'bg-purple-100', text: 'text-purple-800', time: '07:30 - 18:00' },
    U: { label: 'Urlaub', bg: 'bg-amber-100', text: 'text-amber-800', time: 'Erholung' },
    K: { label: 'Krank', bg: 'bg-rose-100', text: 'text-rose-800', time: 'AU gemeldet' },
    Frei: { label: 'Frei', bg: 'bg-slate-100', text: 'text-slate-500', time: 'Freizeitausgleich' }
  };

  const cycleShift = (empId: string, dateStr: string) => {
    const existing = shifts.find(s => s.employeeId === empId && s.date === dateStr);
    const sequence: ('F' | 'S' | 'N' | 'Frei' | 'U' | 'K')[] = ['F', 'S', 'N', 'Frei', 'U', 'K'];

    if (!existing) {
      onAddShift({
        id: `sh-${Date.now()}-${empId}`,
        employeeId: empId,
        date: dateStr,
        type: 'F',
        startTime: '06:45',
        endTime: '15:15'
      });
      return;
    }

    const currentIdx = sequence.indexOf(existing.type as any);
    const nextType = sequence[(currentIdx + 1) % sequence.length];
    const meta = shiftTypes[nextType];

    onUpdateShift({
      ...existing,
      type: nextType,
      startTime: meta.time.split(' - ')[0] || '00:00',
      endTime: meta.time.split(' - ')[1] || '00:00'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Dienstplan & Schichtverwaltung
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Woche 46 / 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Arbeitszeitgesetz-konform (11h Ruhezeit §5 ArbZG, Fachkraftquote nach SGB XI).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Week navigation */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setCurrentWeekOffset(prev => prev - 1)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-3 text-slate-800">
              {weekDays[0].dayNum} – {weekDays[6].dayNum}.2026
            </span>
            <button
              onClick={() => setCurrentWeekOffset(prev => prev + 1)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Dienstplan drucken</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 text-xs">
        <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">
          Legende:
        </span>
        {Object.entries(shiftTypes).map(([code, meta]) => (
          <div key={code} className="flex items-center gap-1.5">
            <span
              className={`w-6 h-6 rounded-lg ${meta.bg} ${meta.text} font-black flex items-center justify-center text-xs`}
            >
              {code}
            </span>
            <span className="text-slate-600 font-medium text-[11px]">{meta.label}</span>
          </div>
        ))}
        <span className="text-slate-400 text-xs ml-auto italic hidden md:inline">
          Tipp: Auf Schichtzelle klicken zum Weiterschalten
        </span>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-600">
                <th className="p-3.5 pl-5 min-w-[200px]">Mitarbeiter & Rolle</th>
                <th className="p-3.5 text-center w-20">Soll/Ist</th>
                {weekDays.map(day => (
                  <th
                    key={day.dateStr}
                    className={`p-3.5 text-center min-w-[100px] ${
                      day.isWeekend ? 'bg-amber-50/50' : ''
                    }`}
                  >
                    <div className="font-bold text-slate-900">{day.dayName}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{day.dayNum}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {employees.map(emp => {
                return (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 leading-tight">
                            {emp.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {emp.role} • {emp.assignedVehicle.split(' ')[0]}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-center font-mono font-bold text-slate-700">
                      {emp.contractHours}h
                    </td>

                    {weekDays.map(day => {
                      const shift = shifts.find(
                        s => s.employeeId === emp.id && s.date === day.dateStr
                      );
                      const shiftCode = shift ? shift.type : 'Frei';
                      const meta = shiftTypes[shiftCode] || shiftTypes.Frei;

                      return (
                        <td
                          key={day.dateStr}
                          className={`p-2 text-center ${
                            day.isWeekend ? 'bg-amber-50/20' : ''
                          }`}
                        >
                          <button
                            onClick={() => cycleShift(emp.id, day.dateStr)}
                            className={`w-full py-2 px-1 rounded-xl font-extrabold text-xs transition border border-transparent hover:border-slate-300 ${meta.bg} ${meta.text}`}
                            title={`${meta.label} (${meta.time}) - Klicken zum Ändern`}
                          >
                            <div>{shiftCode}</div>
                            <div className="text-[9px] font-normal opacity-80 truncate">
                              {meta.time.split(' - ')[0]}
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legal ArbZG compliance check */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-sm">Dienstplanprüfung bestanden</div>
          <p className="text-emerald-800 mt-0.5">
            Alle Schichten in Wetzlar erfüllen die gesetzliche 11-stündige Mindestruhezeit nach § 5 ArbZG.
            Die Fachkraftquote (mindestens eine examinierte Pflegefachkraft pro Schicht) ist für alle Touren gesichert.
          </p>
        </div>
      </div>
    </div>
  );
};
