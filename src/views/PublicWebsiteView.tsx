import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Clock,
  MapPin,
  Calculator,
  CheckCircle2,
  Car,
  Award,
  Users,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  Stethoscope,
  Heart,
  ChevronRight,
  Home
} from 'lucide-react';

interface PublicWebsiteViewProps {
  onSwitchToApp: () => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = ({
  onSwitchToApp
}) => {
  const [selectedCareLevel, setSelectedCareLevel] = useState<number>(3);
  const [contactSent, setContactSent] = useState(false);

  // German care benefits 2026/2025
  const careBenefits: { [key: number]: { geld: number; sach: number; entlastung: number } } = {
    1: { geld: 0, sach: 0, entlastung: 125 },
    2: { geld: 332, sach: 761, entlastung: 125 },
    3: { geld: 573, sach: 1432, entlastung: 125 },
    4: { geld: 765, sach: 1778, entlastung: 125 },
    5: { geld: 947, sach: 2200, entlastung: 125 }
  };

  const currentBenefit = careBenefits[selectedCareLevel];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 -m-6 sm:-m-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-teal-900 to-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              24h Rufbereitschaft Wetzlar: 06441 / 982 45-0
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              Vertragspartner aller gesetzlichen & privaten Pflegekassen
            </span>
          </div>
          <button
            onClick={onSwitchToApp}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-400 text-white font-bold px-3 py-1 rounded-lg text-[11px] transition shadow-xs"
          >
            <span>Mitarbeiter Leitstand / Software</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>MDK-Prüfnote 1,0 (Sehr gut) • A-Cura Pflegedienst Wetzlar</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Herzliche Pflege in Ihrer vertrauten <span className="text-brand-600">Heimat</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                A-Cura ist Ihr moderner, ambulanter Pflegedienst für Wetzlar und den Lahn-Dill-Kreis. 
                Mit Herz, qualifizierten Pflegefachkräften und leisen Elektro-Fahrzeugen betreuen wir Sie rund um die Uhr zu Hause.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#rechner"
                  className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Pflegegrad-Leistungen berechnen</span>
                </a>
                <a
                  href="tel:06441982450"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-xs transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>06441 / 982 45-0</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">Kostenlose Erstberatung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">Feste Bezugspflege</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">100% E-Mobilität</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80"
                  alt="A-Cura Pflege Wetzlar"
                  className="w-full h-96 object-cover opacity-90 hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-2 w-max mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Wetzlar & Umgebung</span>
                  </div>
                  <h3 className="text-xl font-black">Philosophenweg 14, Wetzlar</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Unser Stützpunkt für ambulante Grund- & Behandlungspflege
                  </p>
                </div>
              </div>

              {/* Floating pill badge */}
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl">
                  1,0
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">MDK-Spitzenbewertung</div>
                  <div className="text-[11px] text-slate-500">Geprüfte Pflegequalität</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Pflegegrad-Rechner */}
      <section id="rechner" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
              Transparente Pflegekassen-Ansprüche
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              A-Cura Pflegegrad-Rechner
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Wählen Sie den Pflegegrad, um die monatlichen Sachleistungsbudgets für ambulante Pflegedienste zu berechnen.
            </p>
          </div>

          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Degree selector buttons */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedCareLevel(level)}
                  className={`py-3 sm:py-4 px-2 rounded-2xl font-black text-center transition border ${
                    selectedCareLevel === level
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs opacity-70 font-semibold">Grad</div>
                  <div className="text-xl sm:text-2xl mt-0.5">{level}</div>
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sachleistung */}
              <div className="bg-white p-5 rounded-2xl border-2 border-brand-500 shadow-xs">
                <div className="text-xs font-bold text-brand-700 mb-1">
                  Pflegesachleistung (A-Cura)
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {currentBenefit.sach > 0 ? `${currentBenefit.sach} €` : '125 €'}
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Monatliches Budget der Pflegekasse für Pflegedienst-Einsätze
                </div>
              </div>

              {/* Pflegegeld */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-600 mb-1">
                  Pflegegeld (Angehörige)
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {currentBenefit.geld} €
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Bei alleiniger Pflege durch Angehörige oder Freunde
                </div>
              </div>

              {/* Entlastungsbetrag */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-emerald-700 mb-1">
                  Entlastungsbetrag § 45b
                </div>
                <div className="text-3xl font-black text-emerald-700">
                  +125 €
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Für Betreuung, Spaziergänge & hauswirtschaftliche Hilfen
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                <span>Jetzt kostenlose Pflegeberatung für Grad {selectedCareLevel} anfordern</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
              Umfassende Pflegeleistungen
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Was wir täglich für Sie leisten
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Professionell, empathisch und stets auf Augenhöhe mit Patienten und Angehörigen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Grundpflege (SGB XI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Körperpflege, Waschen, Duschen, Baden, Hilfe beim Aufstehen, Ankleiden, Betten und Mobilisation nach individuellen Bedürfnissen.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Behandlungspflege (SGB V)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ärztlich verordnete Maßnahmen wie Blutzuckermessung, Insulingabe, Medikamentenverabreichung, Wundversorgung und Kompressionsstrümpfe.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hauswirtschaft & Betreuung
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unterstützung beim Einkaufen, Zubereiten von Mahlzeiten, Begleitung zu Arztterminen und aktivierende Demenzbetreuung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Unverbindliche Beratung in Wetzlar
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                Wir sind für Sie da – Tag & Nacht.
              </h2>
              <p className="text-xs text-slate-300">
                Füllen Sie das Formular aus oder rufen Sie uns direkt an. Wir beraten Sie kostenfrei zur Pflegeeinstufung.
              </p>
            </div>

            {contactSent ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Vielen Dank! Unsere Pflegedienstleitung ruft Sie innerhalb von 2 Stunden zurück.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Ihr Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Vor- und Nachname"
                    className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Telefonnummer *</label>
                  <input
                    type="tel"
                    required
                    placeholder="z.B. 06441 / 12345"
                    className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 block mb-1">Ihr Anliegen</label>
                  <textarea
                    rows={3}
                    placeholder="Für wen suchen Sie Unterstützung? Welcher Pflegegrad liegt vor?"
                    className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-black text-sm rounded-xl shadow-lg transition"
                  >
                    Kostenlose Anfrage absenden
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-brand-500" />
            <span className="font-extrabold text-white text-sm">A-CURA.DE</span>
            <span>• Pflegedienst Wetzlar</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Philosophenweg 14, 35578 Wetzlar</span>
            <span>•</span>
            <button onClick={onSwitchToApp} className="text-brand-400 hover:underline">
              Mitarbeiter-Portal (Intern)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
