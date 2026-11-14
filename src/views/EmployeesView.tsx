import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Car,
  Award,
  Phone,
  Mail,
  Clock,
  Euro,
  Palmtree,
  CheckCircle2,
  AlertTriangle,
  Search,
  UserPlus
} from 'lucide-react';
import { Employee, Role } from '../types';

interface EmployeesViewProps {
  employees: Employee[];
  onAddEmployee: (emp: Employee) => void;
  onUpdateEmployee: (emp: Employee) => void;
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('Fachkraft');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('VW ID.3 (LDK-AC 108)');
  const [contractHours, setContractHours] = useState('38.5');
  const [hourlyWage, setHourlyWage] = useState('24.00');
  const [qualificationsStr, setQualificationsStr] = useState('Examinierte Pflegefachkraft, B-Führerschein');

  const filteredEmployees = employees.filter(
    e =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.assignedVehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name,
      role,
      qualifications: qualificationsStr.split(',').map(s => s.trim()),
      hasDriverLicense: true,
      assignedVehicle: vehicle,
      phone: phone || '0171 / ' + Math.floor(1000000 + Math.random() * 9000000),
      email: email || `${name.toLowerCase().replace(/ /g, '.')}@a-cura.de`,
      address: 'Wetzlar & Umgebung',
      contractHours: Number(contractHours) || 38.5,
      hourlyWage: Number(hourlyWage) || 24.0,
      vacationDaysPerYear: 30,
      remainingVacationDays: 24,
      overtimeHours: 0,
      status: 'active',
      avatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 100000000)}?w=150&auto=format&fit=crop&q=80`
    };

    onAddEmployee(newEmp);
    setIsModalOpen(false);

    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Mitarbeiter- & Fuhrparkverwaltung
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {employees.length} Fachkräfte & Helfer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Qualifikationsprofile nach SGB V/XI, Fahrzeugzuordnung, Arbeitszeitkonten und Stundensätze.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Neuen Mitarbeiter anlegen</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Mitarbeiter, Qualifikation, KFZ suchen..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-brand-500"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 hidden sm:block">
          E-Flotte Wetzlar: 100% Elektrofahrzeuge
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map(emp => {
          return (
            <div
              key={emp.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-brand-300 transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                      {emp.name}
                    </h3>
                    <div className="text-xs text-brand-700 font-bold mt-0.5">
                      {emp.role}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    emp.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : emp.status === 'sick'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {emp.status === 'active' ? 'Im Dienst' : emp.status === 'sick' ? 'Krank (AU)' : 'Urlaub'}
                </span>
              </div>

              {/* Vehicle Assignment */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Car className="w-3.5 h-3.5 text-brand-600" />
                  <span>{emp.assignedVehicle}</span>
                </div>
                <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                  Kat. B
                </span>
              </div>

              {/* Qualifications */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Qualifikationen
                </div>
                <div className="flex flex-wrap gap-1">
                  {emp.qualifications.map((q, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contract & Payroll overview */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold">Wochenstd.</div>
                  <div className="font-bold text-slate-800">{emp.contractHours}h</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold">Stundenlohn</div>
                  <div className="font-bold text-slate-800">{emp.hourlyWage.toFixed(2)} €</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold">Überstunden</div>
                  <div className={`font-bold ${emp.overtimeHours > 0 ? 'text-amber-600' : 'text-slate-800'}`}>
                    {emp.overtimeHours > 0 ? `+${emp.overtimeHours}h` : `${emp.overtimeHours}h`}
                  </div>
                </div>
              </div>

              {/* Contact footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{emp.phone}</span>
                </span>
                <span className="truncate max-w-[140px] text-slate-400">{emp.email}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Employee */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                Neuen Mitarbeiter eintragen (A-Cura)
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Name des Mitarbeiters *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="z.B. Sandra Becker"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Position / Rolle</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Fachkraft">Examinierte Pflegefachkraft</option>
                    <option value="Pflegehelfer">Pflegehelfer (LG1/LG2)</option>
                    <option value="PDL">Pflegedienstleitung (PDL)</option>
                    <option value="Wundexperte">Wundexperte ICW</option>
                    <option value="Betreuungskraft">Betreuungskraft § 43b</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dienstwagen</label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={e => setVehicle(e.target.value)}
                    placeholder="z.B. VW ID.3 (LDK-AC 108)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Wochenstunden (Soll)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={contractHours}
                    onChange={e => setContractHours(e.target.value)}
                    placeholder="38.5"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stundenlohn (€)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hourlyWage}
                    onChange={e => setHourlyWage(e.target.value)}
                    placeholder="24.50"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Telefonnummer</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0171 / 9988776"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Qualifikationen (Kommagetrennt)</label>
                <input
                  type="text"
                  value={qualificationsStr}
                  onChange={e => setQualificationsStr(e.target.value)}
                  placeholder="Examinierte Pflegefachkraft, B-Führerschein"
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
                  Mitarbeiter speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
