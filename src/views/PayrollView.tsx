import React, { useState } from 'react';
import {
  ReceiptEuro,
  Download,
  CheckCircle2,
  Printer,
  Sparkles
} from 'lucide-react';
import { Employee, PayrollRecord } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '../components/ui/table';

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

  const totalGrossSum = payrollRecords.reduce((acc, r) => acc + r.totalGross, 0);
  const totalSfnBonuses = payrollRecords.reduce((acc, r) => acc + r.sfnBonuses, 0);
  const totalNetSum = payrollRecords.reduce((acc, r) => acc + r.estimatedNet, 0);
  const totalEmployerSum = payrollRecords.reduce((acc, r) => acc + r.employerTotal, 0);

  const selectedRecord =
    payrollRecords.find(r => r.id === selectedRecordId) || payrollRecords[0];
  const selectedEmployee = employees.find(
    e => e.id === selectedRecord?.employeeId
  );

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
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Lohnbuchhaltung & Zeiterfassung
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Steuerfreie SFN-Zuschläge nach § 3b EStG (Nacht-, Sonntags- & Feiertagsarbeit) und DATEV-Schnittstelle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
          >
            <option value="2026-11">November 2026</option>
            <option value="2026-10">Oktober 2026</option>
          </select>

          <Button onClick={handleExportDatevCSV}>
            <Download className="w-3.5 h-3.5" />
            <span>DATEV CSV Export</span>
          </Button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs font-medium text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>DATEV LODAS Exportdatei erfolgreich heruntergeladen!</span>
        </div>
      )}

      {/* 4 Standardized Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Gesamtbrutto (Monat)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {totalGrossSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-slate-400 mt-1">Inkl. Grundgehalt & Zulagen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Steuerfreie SFN-Zuschläge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-emerald-700">
              {totalSfnBonuses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-emerald-600 mt-1">§ 3b EStG steuer- & SV-frei</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Netto-Auszahlung (ca.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-brand-700">
              {totalNetSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-slate-400 mt-1">Überweisung zum 28. des Monats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Arbeitgeber-Gesamtaufwand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {totalEmployerSum.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-xs text-slate-400 mt-1">Inkl. AG-Sozialversicherungsanteile</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Table & Payslip Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table on Left (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold text-slate-900">
                Mitarbeiter Abrechnungen
              </CardTitle>
              <span className="text-xs text-slate-400">Zeile wählen für Details</span>
            </CardHeader>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mitarbeiter</TableHead>
                  <TableHead className="text-center">Stunden</TableHead>
                  <TableHead className="text-right">SFN-Zulage</TableHead>
                  <TableHead className="text-right">Gesamtbrutto</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRecords.map(record => {
                  const emp = employees.find(e => e.id === record.employeeId);
                  const isSelected = record.id === selectedRecordId;

                  return (
                    <TableRow
                      key={record.id}
                      onClick={() => setSelectedRecordId(record.id)}
                      className={isSelected ? 'bg-slate-100/80 font-semibold' : 'cursor-pointer'}
                    >
                      <TableCell>
                        <div className="font-semibold text-slate-900">{emp?.name}</div>
                        <div className="text-[11px] text-slate-400">{emp?.role}</div>
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {record.actualHours}h
                      </TableCell>
                      <TableCell className="text-right font-mono text-emerald-700">
                        +{record.sfnBonuses.toFixed(2)} €
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-slate-900">
                        {record.totalGross.toFixed(2)} €
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            record.status === 'freigegeben'
                              ? 'success'
                              : record.status === 'geprüft'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Payslip on Right (5 cols) */}
        {selectedRecord && selectedEmployee && (
          <div className="lg:col-span-5">
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-brand-700 uppercase">
                    A-Cura Betreuungsdienst Wetzlar
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 mt-0.5">
                    Lohnschein {selectedRecord.month}
                  </CardTitle>
                  <p className="text-xs text-slate-400">
                    {selectedEmployee.name} • Personal-Nr. #1002
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.print()}
                  title="Drucken"
                >
                  <Printer className="w-3.5 h-3.5" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-3 pt-4 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Grundgehalt ({selectedRecord.actualHours}h à {selectedRecord.hourlyWage.toFixed(2)} €)</span>
                  <span className="font-mono font-medium text-slate-900">{selectedRecord.baseGross.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700 font-medium">
                  <span>Nachtzuschlag 25% (§3b EStG)</span>
                  <span className="font-mono">+{(selectedRecord.nightHours * selectedRecord.hourlyWage * 0.25).toFixed(2)} €</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700 font-medium">
                  <span>Sonntagszuschlag 50% (§3b EStG)</span>
                  <span className="font-mono">+{(selectedRecord.sundayHours * selectedRecord.hourlyWage * 0.5).toFixed(2)} €</span>
                </div>

                {selectedRecord.carDeduction > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-100 text-slate-500">
                    <span>1%-Regelung Dienstwagen</span>
                    <span className="font-mono text-rose-600">-{selectedRecord.carDeduction.toFixed(2)} €</span>
                  </div>
                )}

                <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-bold text-slate-900">
                  <span>Gesamt-Brutto</span>
                  <span className="font-mono">{selectedRecord.totalGross.toFixed(2)} €</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs">Netto-Auszahlung (Schätzung)</div>
                    <div className="text-[10px] text-slate-500">StKl. I / IV</div>
                  </div>
                  <span className="font-mono font-bold text-brand-800 text-base">
                    {selectedRecord.estimatedNet.toFixed(2)} €
                  </span>
                </div>

                <Button
                  onClick={approveMonth}
                  disabled={selectedRecord.status === 'freigegeben'}
                  className="w-full mt-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {selectedRecord.status === 'freigegeben'
                      ? 'Bereits freigegeben ✓'
                      : 'Abrechnung freigeben'}
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
