import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Clock,
  MapPin,
  Calculator,
  CheckCircle2,
  Users,
  Sparkles,
  Heart,
  ChevronRight,
  MessageCircle,
  Baby,
  Flower2,
  FileCheck2,
  UserCheck
} from 'lucide-react';

interface PublicWebsiteViewProps {
  onSwitchToApp: () => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = ({
  onSwitchToApp
}) => {
  const [selectedCareLevel, setSelectedCareLevel] = useState<number>(3);
  const [contactSent, setContactSent] = useState(false);

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
      {/* Top Banner (A-Cura Navy / Royal Blue) */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-brand-300">
              A-Cura Betreuungsdienst Wetzlar
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">
              Tel: 06441 / 7869627 • Mobil: 0157 / 54150233
            </span>
          </div>
          <button
            onClick={onSwitchToApp}
            className="text-xs font-semibold text-brand-300 hover:text-white transition"
          >
            Mitarbeiter-Login →
          </button>
        </div>
      </div>

      {/* Hero Section (A-Cura CI: Clean, Calm, No Button Clutter) */}
      <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/60">
                Anerkannter Betreuungsdienst nach § 45b SGB XI
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Entlastung im Alltag mit <span className="text-brand-700">Herz</span> und Erfahrung.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
                Willkommen bei <strong>A-Cura</strong>. Wir begleiten Seniorinnen, Senioren und Familien mit pflegebedürftigen Kindern in Wetzlar und im Lahn-Dill-Kreis. 
                Als anerkannter Betreuungsdienst unterstützen wir Sie direkt bei den Leistungen der Pflegekasse.
              </p>

              {/* Just ONE clean CTA row */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#kontakt"
                  className="px-5 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  Kostenlose Beratung anfragen
                </a>
                <a
                  href="https://wa.me/4915754150233"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">✓ 100% Kassenleistung</span>
                <span className="flex items-center gap-1">✓ Ab Pflegegrad 1</span>
                <span className="flex items-center gap-1">✓ Wetzlar & Lahn-Dill</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 relative">
                <img
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80"
                  alt="A-Cura Betreuung Wetzlar"
                  className="w-full h-80 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="text-sm font-bold">Ostendstraße 10, 35584 Wetzlar</div>
                  <div className="text-xs text-slate-300">
                    A-Cura Stützpunkt Naunheim
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Über Uns / Gründergeschichte Mehtap Sarac */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Mehtap Sarac"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-200"
              />
              <div>
                <h2 className="text-base font-bold text-slate-900">Mehtap Sarac</h2>
                <div className="text-xs text-brand-700 font-medium">Gründerin & Inhaberin A-Cura</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              „Mein Sohn kam mit einer Zerebralparese auf die Welt. Jahrelang war ich selbst Leistungsempfängerin und kenne die Sorgen, den Pflegealltag und die bürokratischen Hürden aus eigener Erfahrung.
              Deshalb habe ich A-Cura in Wetzlar gegründet: Um pflegende Angehörige ehrlich zu entlasten und für Seniorinnen, Senioren und Kinder mit Handicap da zu sein.“
            </p>
          </div>
        </div>
      </section>

      {/* Leistungsangebot (A-Cura CI) */}
      <section className="py-14 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Unser Leistungsangebot in Wetzlar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Anerkannte Betreuungs- und Entlastungsleistungen – direkt mit der Pflegekasse abrechenbar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Entlastungsbetrag (§ 45b SGB XI)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                125 € monatliches Budget ab Pflegegrad 1 für Alltagsbegleitung, Spaziergänge und Unterstützung im Haushalt.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <Baby className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Kinder- & Seniorenbetreuung
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Einfühlsame Betreuung von Kindern mit Beeinträchtigungen (z. B. Zerebralparese) und Senioren gegen Einsamkeit.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                <Flower2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Hausmeister- & Gartenservice
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Rasenmähen, Gartenpflege und kleine handwerkliche Arbeiten rund ums Haus im gesamten Lahn-Dill-Kreis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pflegekassen-Rechner (Quiet, Clean) */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Pflegekassen-Rechner
            </h2>
            <p className="text-xs text-slate-500">
              Wählen Sie den Pflegegrad für die monatlichen Ansprüche.
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                onClick={() => setSelectedCareLevel(level)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
                  selectedCareLevel === level
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Grad {level}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500">Entlastungsbetrag § 45b</div>
              <div className="text-2xl font-bold text-brand-700 mt-1">125 € / Mt.</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Für A-Cura Betreuung</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500">Pflegegeld (Angehörige)</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">{currentBenefit.geld} € / Mt.</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Auszahlung der Kasse</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Clean Form, Single Submit Action) */}
      <section id="kontakt" className="py-14 bg-slate-50/60">
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Kontakt & Beratung in Wetzlar
            </h2>
            <p className="text-xs text-slate-500">
              Schreiben Sie uns oder rufen Sie uns direkt an: 06441 / 7869627
            </p>
          </div>

          {contactSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs text-center font-medium">
              Vielen Dank! Wir melden uns innerhalb weniger Stunden bei Ihnen.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ihr Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Vor- und Nachname"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Telefonnummer *</label>
                <input
                  type="tel"
                  required
                  placeholder="0157 / 54150233"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nachricht</label>
                <textarea
                  rows={3}
                  placeholder="Wie können wir Ihnen oder Ihrer Familie helfen?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Anfrage absenden
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            A-CURA Betreuungsdienst • Ostendstraße 10, 35584 Wetzlar • Inhaberin: Mehtap Sarac
          </div>
          <div>
            Tel: 06441 / 7869627 • Mobil: 0157 / 54150233 • E-Mail: sarac@a-cura.de
          </div>
        </div>
      </footer>
    </div>
  );
};
