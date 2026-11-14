import React, { useState } from 'react';
import {
  ReceiptEuro,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  Calendar,
  Lock,
  Building2,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { Employee, PayrollRecord } from '../types';

interface PayrollViewProps {
  payrollRecords: PayrollRecord[];
  employees: Employee[];
  onUpdatePayroll: (record: PayrollRecord) => void;
}

export const PayrollView: React.FC<PayrollViewProps> = ({
  payrollRecords,
  employees,
  onUpdatePayroll
}) => {
  const [selectedMonth, setSelectedMonth] = useState('2026-11');
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    payrollRecords[0]?.id || ''
  );
  const [exportSuccess, setExportSuccess] = useState(false);

  // Compute total payouts
  const totalGrossSum = payrollRecords.reduce((acc, r) => acc + r.totalGross, 0);
  const totalSfnBonuses = payrollRecords.reduce((acc, r) => acc + r.sfnBonuses, 0);
  const totalNetSum = payrollRecords.reduce((acc, r) => acc + r.estimatedNet, 0);
  const totalEmployerSum = payrollRecords.reduce((acc, r) => acc + r.employerTotal, 0);

  const selectedRecord =
    payrollRecords.find(r => r.id === selectedRecordId) || payrollRecords[0];
  const selectedEmployee = employees.find(
    e => e.id === selectedRecord?.employeeId
  );

  // Export DATEV-compatible CSV format
  const handleExportDatevCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent +=
      'Personalnummer;Mitarbeiter;Monat;Sollstunden;Iststunden;Grundbrutto;SFN_Zuschlag_Par3b;Gesamtbrutto;Netto_Schaetzung;Status\r\n';

    payrollRecords.forEach((r, idx) => {
      const emp = employees.find(e => e.id === r.employeeId);
      csvContent += `${1001 + idx};${emp?.name || 'Mitarbeiter'};${r.month};${r.baseHours};${r.actualHours};${r.baseGross.toFixed(2)};${r.sfnBonuses.toFixed(2)};${r.totalGross.toFixed(2)};${r.estimatedNet.toFixed(2)};${r.status}\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DATEV_LODAS_Acura_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  const approveMonth = () => {
    if (selectedRecord) {
      onUpdatePayroll({
        ...selectedRecord,
        status: 'freigegeben'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Lohnbuchhaltung & Zeiterfassung
            </h1>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
              DATEV-Kompatibel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automatische Berechnung steuerfreier SFN-Zuschläge (§ 3b EStG für Nacht-, Sonntags- & Feiertagsdienste).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800"
          >
            <option value="2026-11">November 2026 (Aktiv)</option>
            <option value="2026-10">Oktober 2026 (Abgerechnet)</option>
            <option value="2026-09">September 2026 (Archiv)</option>
          </select>

          <button
            onClick={handleExportDatevCSV}
            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DATEV CSV Export</span>
          </button>
        </div>
      </div>

      {/* Export notification */}
      {exportSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-900 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>DATEV LODAS Exportdatei erfolgreich heruntergeladen! Bereit für Steuerberater / Kanzlei.</span>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">Gesamtbrutto (Monat)</div>
          <div className="text-2xl font-black text-slate-900">
            {totalGrossSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Inkl. Grundgehälter & Zulagen
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            Steuerfreie SFN-Zuschläge
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {totalSfnBonuses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>§ 3b EStG steuer- & SV-frei</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            Nettolöhne Auszahlung (ca.)
          </div>
          <div className="text-2xl font-black text-blue-600">
            {totalNetSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Überweisung an Mitarbeiter zum 28.
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            Arbeitgeber-Gesamtaufwand
          </div>
          <div className="text-2xl font-black text-purple-700">
            {totalEmployerSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Inkl. AG-Sozialversicherungsanteile
          </div>
        </div>
      </div>

      {/* Main Grid: Payroll Table on Left, Printable PaySlip on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Employee Payroll Records List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Lohnabrechnungen November 2026
            </h3>
            <span className="text-xs text-slate-500">
              Klicken zur Lohnschein-Vorschau
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold">
                <tr>
                  <th className="p-3 pl-4">Mitarbeiter</th>
                  <th className="p-3 text-center">Stunden</th>
                  <th className="p-3 text-right">SFN-Zuschlag</th>
                  <th className="p-3 text-right">Gesamtbrutto</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payrollRecords.map(record => {
                  const emp = employees.find(e => e.id === record.employeeId);
                  const isSelected = record.id === selectedRecordId;

                  return (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedRecordId(record.id)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-brand-50/80 font-semibold text-brand-950'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <td className="p-3 pl-4">
                        <div className="font-bold">{emp?.name}</div>
                        <div className="text-[10px] text-slate-400">{emp?.role}</div>
                      </td>
                      <td className="p-3 text-center font-mono">
                        {record.actualHours}h
                        {record.overtimeHours > 0 && (
                          <span className="text-amber-600 block text-[10px]">
                            (+{record.overtimeHours}h Überstd.)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-700">
                        +{record.sfnBonuses.toFixed(2)} €
                      </td>
                      <td className="p-3 text-right font-mono font-black">
                        {record.totalGross.toFixed(2)} €
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            record.status === 'freigegeben'
                              ? 'bg-emerald-100 text-emerald-800'
                              : record.status === 'geprüft'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Detailed Printable PaySlip Preview (5 cols) */}
        {selectedRecord && selectedEmployee && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-brand-600">
                  A-CURA PFLEGEDIENST WETZLAR
                </div>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Verdienstabrechnung {selectedRecord.month}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedEmployee.name} • Personal-Nr. #1002
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                title="Lohnschein drucken"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Grundvergütung ({selectedRecord.actualHours}h à {selectedRecord.hourlyWage.toFixed(2)} €)</span>
                <span className="font-mono font-bold text-slate-800">
                  {selectedRecord.baseGross.toFixed(2)} €
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700 font-medium">
                <span>Nachtzuschlag 25% ({selectedRecord.nightHours}h)</span>
                <span className="font-mono">
                  +{(selectedRecord.nightHours * selectedRecord.hourlyWage * 0.25).toFixed(2)} €
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700 font-medium">
                <span>Sonntagszuschlag 50% ({selectedRecord.sundayHours}h)</span>
                <span className="font-mono">
                  +{(selectedRecord.sundayHours * selectedRecord.hourlyWage * 0.5).toFixed(2)} €
                </span>
              </div>

              {selectedRecord.holidayHours > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700 font-medium">
                  <span>Feiertagszuschlag 125% ({selectedRecord.holidayHours}h)</span>
                  <span className="font-mono">
                    +{(selectedRecord.holidayHours * selectedRecord.hourlyWage * 1.25).toFixed(2)} €
                  </span>
                </div>
              )}

              {selectedRecord.carDeduction > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-500">
                  <span>1%-Regelung Dienstwagen E-Flotte</span>
                  <span className="font-mono text-rose-600">
                    -{selectedRecord.carDeduction.toFixed(2)} €
                  </span>
                </div>
              )}

              {/* Total Gross */}
              <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                <span>Gesamt-Bruttoverdienst</span>
                <span className="font-mono">{selectedRecord.totalGross.toFixed(2)} €</span>
              </div>

              {/* Estimated Net */}
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mt-2 flex justify-between items-center">
                <div>
                  <div className="font-bold text-emerald-950 text-xs">
                    Geschätzter Auszahlungsbetrag (Netto)
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    Steuerklasse I / IV (ohne Kirchensteuer)
                  </div>
                </div>
                <span className="font-mono font-black text-emerald-800 text-base">
                  {selectedRecord.estimatedNet.toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Approve button */}
            <div className="pt-2">
              <button
                onClick={approveMonth}
                disabled={selectedRecord.status === 'freigegeben'}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {selectedRecord.status === 'freigegeben'
                    ? 'Abrechnung freigegeben ✓'
                    : 'Abrechnung prüfen & freigeben'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
