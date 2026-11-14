import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  Key,
  ShieldAlert,
  Calendar,
  Clock,
  HeartPulse,
  Filter,
  Check,
  FileText,
  UserPlus
} from 'lucide-react';
import { Client } from '../types';

interface ClientsViewProps {
  clients: Client[];
  onAddClient: (client: Client) => void;
  onUpdateClient: (client: Client) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onAddClient,
  onUpdateClient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCareLevel, setFilterCareLevel] = useState<string>('all');
  const [filterDay, setFilterDay] = useState<string>('all');
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New client form state
  const [newName, setNewName] = useState('');
  const [newCareLevel, setNewCareLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [newInsurance, setNewInsurance] = useState('AOK Hessen');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newKeyPin, setNewKeyPin] = useState('');
  const [newTime, setNewTime] = useState('08:00 - 08:45');
  const [newSgbXi, setNewSgbXi] = useState('LK 01: Große Grundpflege');
  const [newSgbV, setNewSgbV] = useState('HKP 12: Medikamente einnehmen');

  // Filter clients
  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.healthInsurance.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      filterCareLevel === 'all' || c.careLevel.toString() === filterCareLevel;

    const matchesDay =
      filterDay === 'all' || c.visitDays.includes(filterDay as any);

    return matchesSearch && matchesLevel && matchesDay;
  });

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAddress) return;

    const newClientObj: Client = {
      id: `cl-${Date.now()}`,
      name: newName,
      careLevel: newCareLevel,
      healthInsurance: newInsurance,
      insuranceNumber: `V${Math.floor(100000000 + Math.random() * 900000000)}`,
      address: newAddress,
      zip: '35578',
      city: 'Wetzlar',
      lat: 50.555 + (Math.random() - 0.5) * 0.02,
      lng: 8.502 + (Math.random() - 0.5) * 0.03,
      phone: newPhone || '06441 / ' + Math.floor(10000 + Math.random() * 90000),
      emergencyContact: {
        name: 'Angehöriger / Betreuer',
        phone: '0171 / 1234567',
        relation: 'Familie'
      },
      doctor: {
        name: 'Hausarztpraxis Wetzlar',
        phone: '06441 / 44210'
      },
      keyBox: {
        hasKey: Boolean(newKeyPin),
        location: newKeyPin ? 'Schlüsseltresor Haustür' : undefined,
        pinCode: newKeyPin || undefined
      },
      visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      preferredTime: newTime,
      durationMinutes: 40,
      sgbXI_Services: [newSgbXi],
      sgbV_Services: newSgbV ? [newSgbV] : [],
      requiresQualifiedNurse: newCareLevel >= 4 || Boolean(newSgbV),
      allergiesNotes: 'Neu aufgenommen. Erstanamnese durch PDL erfolgt.',
      vitalHistory: []
    };

    onAddClient(newClientObj);
    setIsAddModalOpen(false);
    setSelectedClientId(newClientObj.id);

    // Reset inputs
    setNewName('');
    setNewAddress('');
    setNewPhone('');
    setNewKeyPin('');
  };

  const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Klienten- & Patientenverwaltung
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {clients.length} Pflegebedürftige
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Digitale Pflegeakten, Pflegegrade 1-5, Betreuungstage und SGB V/XI Leistungsmodule im Raum Wetzlar.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Neuen Klienten aufnehmen</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Klient, Adresse in Wetzlar, Kasse suchen..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-brand-500"
          />
        </div>

        {/* Filter Care Level */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Pflegegrad:</span>
          <select
            value={filterCareLevel}
            onChange={e => setFilterCareLevel(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700"
          >
            <option value="all">Alle Grade (1-5)</option>
            <option value="1">Pflegegrad 1</option>
            <option value="2">Pflegegrad 2</option>
            <option value="3">Pflegegrad 3</option>
            <option value="4">Pflegegrad 4</option>
            <option value="5">Pflegegrad 5</option>
          </select>
        </div>

        {/* Filter Day */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Besuchstag:</span>
          <select
            value={filterDay}
            onChange={e => setFilterDay(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700"
          >
            <option value="all">Alle Wochentage</option>
            {daysOfWeek.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Client List on Left, Active Client Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Client List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
          {filteredClients.map(client => {
            const isSelected = client.id === selectedClientId;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition text-xs space-y-2 ${
                  isSelected
                    ? 'bg-brand-50/80 border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      {client.name}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{client.address}, Wetzlar</span>
                    </div>
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-teal-100 text-teal-800">
                    PG {client.careLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-100">
                  <div className="text-slate-600 font-medium">
                    {client.healthInsurance}
                  </div>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-700">
                    <Clock className="w-3 h-3 text-brand-600" />
                    <span>{client.preferredTime}</span>
                  </div>
                </div>

                {/* Days tags */}
                <div className="flex items-center gap-1">
                  {daysOfWeek.map(d => {
                    const isActive = client.visitDays.includes(d as any);
                    return (
                      <span
                        key={d}
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-brand-600 text-white'
                            : 'bg-slate-100 text-slate-300'
                        }`}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Dossier View (7 cols) */}
        {selectedClient && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900">{selectedClient.name}</h2>
                  <span className="bg-brand-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">
                    Pflegegrad {selectedClient.careLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>📍 {selectedClient.address}, {selectedClient.zip} {selectedClient.city}</span>
                  <span>•</span>
                  <span>Vers.-Nr: {selectedClient.insuranceNumber}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-700 block">
                  {selectedClient.healthInsurance}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  Kostenübernahme aktiv
                </span>
              </div>
            </div>

            {/* Visit Days & Time schedule */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span>Geplante Pflegetage & Zeitfenster</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {daysOfWeek.map(d => {
                    const isVisit = selectedClient.visitDays.includes(d as any);
                    return (
                      <span
                        key={d}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          isVisit
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-white text-slate-400 border border-slate-200'
                        }`}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  ⏰ {selectedClient.preferredTime} ({selectedClient.durationMinutes} Min.)
                </div>
              </div>
            </div>

            {/* Access & Key Safe & Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1: Key Safe */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  <span>Wohnungszugang & Schlüsseltresor</span>
                </div>
                {selectedClient.keyBox.hasKey ? (
                  <div className="text-xs">
                    <div className="font-mono font-bold text-amber-900 text-sm">
                      PIN: {selectedClient.keyBox.pinCode}
                    </div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      {selectedClient.keyBox.location}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-amber-800">
                    Kein Tresor hinterlegt. Patient oder Angehörige öffnen persönlich.
                  </div>
                )}
              </div>

              {/* Box 2: Emergency Contact */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1.5">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Notfallkontakt & Bevollmächtigter</span>
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">
                    {selectedClient.emergencyContact.name}
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium">
                    {selectedClient.emergencyContact.phone} ({selectedClient.emergencyContact.relation})
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Instructions & SGB services */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Leistungskomplexe SGB XI & SGB V
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="bg-emerald-50/60 border border-emerald-200 p-3 rounded-xl">
                  <div className="font-bold text-emerald-900 mb-1">
                    SGB XI Grundpflege & Betreuung (Pflegekasse):
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-emerald-800">
                    {selectedClient.sgbXI_Services.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {selectedClient.sgbV_Services.length > 0 && (
                  <div className="bg-sky-50/60 border border-sky-200 p-3 rounded-xl">
                    <div className="font-bold text-sky-900 mb-1">
                      SGB V Häusliche Krankenpflege (Ärztliche Verordnung):
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-sky-800">
                      {selectedClient.sgbV_Services.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Alert notes */}
            {selectedClient.allergiesNotes && (
              <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-xs space-y-1">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Wichtige medizinische Besonderheiten:</span>
                </div>
                <div className="text-rose-700 font-medium">
                  {selectedClient.allergiesNotes}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Neuer Klient aufnehmen */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                Neuen Klienten aufnehmen (Wetzlar)
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vollständiger Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="z.B. Hildegard Becker"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pflegegrad (1-5)</label>
                  <select
                    value={newCareLevel}
                    onChange={e => setNewCareLevel(Number(e.target.value) as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value={1}>Pflegegrad 1</option>
                    <option value={2}>Pflegegrad 2</option>
                    <option value={3}>Pflegegrad 3</option>
                    <option value={4}>Pflegegrad 4</option>
                    <option value={5}>Pflegegrad 5</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pflegekasse</label>
                  <select
                    value={newInsurance}
                    onChange={e => setNewInsurance(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="AOK Hessen">AOK Hessen</option>
                    <option value="Barmer">Barmer</option>
                    <option value="TK - Techniker Krankenkasse">TK Techniker</option>
                    <option value="DAK Gesundheit">DAK Gesundheit</option>
                    <option value="IKK Classic">IKK Classic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Adresse in Wetzlar *</label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  placeholder="z.B. Karl-Kellner-Ring 18, 35576 Wetzlar"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telefonnummer</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    placeholder="06441 / 12345"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Schlüsselsafe PIN</label>
                  <input
                    type="text"
                    value={newKeyPin}
                    onChange={e => setNewKeyPin(e.target.value)}
                    placeholder="z.B. 4821 (optional)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Wunschzeitfenster</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  placeholder="08:00 - 08:45"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md"
                >
                  Klient speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
