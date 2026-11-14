import React, { useState } from 'react';
import {
  FileCheck2,
  Building,
  Euro,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { Client } from '../types';

interface BillingViewProps {
  clients: Client[];
}

export const BillingView: React.FC<BillingViewProps> = ({ clients }) => {
  const [selectedKasse, setSelectedKasse] = useState('all');

  // Estimate monthly billing values
  const careBudgets: { [key: number]: number } = {
    1: 125,
    2: 761,
    3: 1432,
    4: 1778,
    5: 2200
  };

  const clientBilling = clients.map(c => {
    const sgbXiMax = careBudgets[c.careLevel] || 125;
    const sgbXiBilled = Math.round(sgbXiMax * 0.92); // ~92% budget utilization
    const sgbVBilled = c.sgbV_Services.length * 380; // Treatment care flat rate per month
    const total = sgbXiBilled + sgbVBilled;

    return {
      client: c,
      sgbXiBilled,
      sgbVBilled,
      total
    };
  });

  const totalSgbXi = clientBilling.reduce((acc, b) => acc + b.sgbXiBilled, 0);
  const totalSgbV = clientBilling.reduce((acc, b) => acc + b.sgbVBilled, 0);
  const grandTotal = totalSgbXi + totalSgbV;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              SGB Kassenabrechnung & Kostenträger
            </h1>
            <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              SGB XI & SGB V
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Abrechnung nach Leistungskomplexen (LK) für Pflegekassen und ärztliche Verordnungen (HKP) in Hessen.
          </p>
        </div>

        <button
          onClick={() => alert('DTA Abrechnungsdatei § 302 SGB V / § 105 SGB XI generiert!')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DTA-Kassenexport (§302)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            SGB XI Pflegeversicherung
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalSgbXi.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-2">
            Pflegesachleistungen (LK 1 - 18)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            SGB V Häusliche Krankenpflege
          </div>
          <div className="text-2xl font-black text-blue-600">
            {totalSgbV.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-2">
            Behandlungspflege (Ärztl. Verordnung)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">
            Gesamtumsatz Abrechnungsmonat
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {grandTotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            100% Abrechnungsquote Wetzlar
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Patientenabrechnung & Kassenansprüche
          </h3>
          <span className="text-xs text-slate-500">
            Monat November 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold">
              <tr>
                <th className="p-3.5 pl-5">Patient & Pflegegrad</th>
                <th className="p-3.5">Kostenträger / Kasse</th>
                <th className="p-3.5 text-right">SGB XI Sachleistung</th>
                <th className="p-3.5 text-right">SGB V Behandlung</th>
                <th className="p-3.5 text-right font-black">Summe Abrechnung</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clientBilling.map(({ client, sgbXiBilled, sgbVBilled, total }) => {
                return (
                  <tr key={client.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">
                      {client.name}
                      <span className="ml-2 font-normal text-[11px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                        PG {client.careLevel}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {client.healthInsurance}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-800">
                      {sgbXiBilled.toFixed(2)} €
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-blue-700">
                      {sgbVBilled > 0 ? `+${sgbVBilled.toFixed(2)} €` : '—'}
                    </td>
                    <td className="p-3.5 text-right font-mono font-black text-emerald-700">
                      {total.toFixed(2)} €
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Übertragungsbereit
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
