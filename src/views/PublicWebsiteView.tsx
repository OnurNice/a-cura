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
  Home,
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
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              A-Cura Wetzlar: 06441 / 7869627 • Mobil: 0157 / 54150233
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              Anerkannter Betreuungsdienst nach § 45b SGB XI
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
                <HeartHandshake className="w-4 h-4 text-brand-600" />
                <span>A-Cura Betreuungsdienst Wetzlar & Lahn-Dill-Kreis</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Entlastung im Alltag mit <span className="text-brand-600">Herz</span> und Erfahrung.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Willkommen bei <strong>A-Cura</strong>. Wir begleiten Seniorinnen, Senioren und Familien mit Kindern mit Beeinträchtigungen in Wetzlar. 
                Als anerkannter Betreuungsdienst nach § 45b SGB XI unterstützen wir Sie direkt bei Anträgen gegenüber der Pflegekasse.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#rechner"
                  className="px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Pflegekassen-Budget berechnen</span>
                </a>
                <a
                  href="https://wa.me/4915754150233"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Kontakt</span>
                </a>
                <a
                  href="tel:064417869627"
                  className="px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl border border-slate-200 shadow-xs transition flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>06441 / 7869627</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">§ 45b Kassenleistung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">Ab Pflegegrad 1 (125 €)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">Lahn-Dill-Kreis</span>
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
                    <span>Wetzlar-Naunheim</span>
                  </div>
                  <h3 className="text-xl font-black">Ostendstraße 10, 35584 Wetzlar</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Stützpunkt für ambulante Betreuung, Alltagsbegleitung & Pflegeberatung
                  </p>
                </div>
              </div>

              {/* Floating pill badge */}
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl">
                  125€
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Monatlicher Entlastungsbetrag</div>
                  <div className="text-[11px] text-slate-500">100% von der Kasse bezahlt</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Über Uns / Gründergeschichte Mehtap Sarac */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-50 to-teal-50/40 rounded-3xl p-8 sm:p-12 border border-brand-200/80 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 text-center md:text-left">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                  alt="Mehtap Sarac"
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover shadow-lg mx-auto md:mx-0 border-4 border-white"
                />
                <div className="mt-3">
                  <div className="font-extrabold text-slate-900 text-base">Mehtap Sarac</div>
                  <div className="text-xs font-semibold text-brand-700">Gründerin & Inhaberin A-Cura</div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 bg-brand-100 px-3 py-1 rounded-full">
                  <Heart className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
                  <span>Unsere Geschichte: Aus persönlicher Betroffenheit gewachsen</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  „Ich weiß, was pflegende Angehörige täglich leisten.“
                </h2>
                <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    Mein Sohn kam mit einer Zerebralparese auf die Welt. Jahrelang war ich selbst Leistungsempfängerin und habe am eigenen Leib erfahren, wie überwältigend der Pflegealltag, die Bürokratie der Kassen und die ständige Sorge sein können.
                  </p>
                  <p>
                    Aus dieser tiefen persönlichen Erfahrung heraus habe ich <strong>A-Cura</strong> in Wetzlar gegründet: Um betroffenen Familien zur Seite zu stehen, Ihnen die bürokratische Last mit den Pflegekassen abzunehmen und Ihnen verlässliche, herzliche Betreuung im Alltag zu schenken.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-brand-900">
                  <span className="flex items-center gap-1">✓ Persönliche Beratung</span>
                  <span className="flex items-center gap-1">✓ Direkte Kassenabrechnung</span>
                  <span className="flex items-center gap-1">✓ Feste Bezugspersonen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reale A-Cura Leistungsbereiche */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
              Unser Leistungsangebot im Lahn-Dill-Kreis
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Wie wir Sie und Ihre Familie entlasten
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Anerkannte Angebote zur Unterstützung im Alltag – zu 100% über die Pflegekasse finanzierbar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Entlastungsleistungen § 45b */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Entlastungsbetrag (§ 45b SGB XI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jeder Pflegebedürftige ab Pflegegrad 1 hat Anspruch auf <strong>125 € pro Monat</strong>. Wir nutzen dieses Budget für Alltagsbegleitung, Vorlesen, Gedächtnistraining und Spaziergänge.
              </p>
            </div>

            {/* Card 2: Seniorenbetreuung */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Seniorenbetreuung & Alltagshilfe
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Einkaufshilfen, Begleitung zu Arztterminen, Apothekengänge, gemeinsame Mahlzeitenzubereitung und liebevolle Gesellschaft gegen Einsamkeit im Alter.
              </p>
            </div>

            {/* Card 3: Kinderbetreuung & Handicap */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Kinderbetreuung & Beeinträchtigung
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Einfühlsame Betreuung von Kindern und Jugendlichen mit körperlicher oder geistiger Beeinträchtigung (z. B. Zerebralparese). Wertvolle Auszeiten für Eltern und Geschwister.
              </p>
            </div>

            {/* Card 4: Verhinderungspflege § 39 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Verhinderungspflege (§ 39 SGB XI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wenn Sie als pflegender Angehöriger im Urlaub, krank oder verhindert sind, übernimmt A-Cura stundenweise oder tageweise die Betreuung – bezahlt von der Kasse (bis zu 1.612 €).
              </p>
            </div>

            {/* Card 5: Hausmeister- & Gartenservice */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Flower2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Hausmeister- & Gartenservice
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rasenmähen, Heckenrückschnitt, Gartenpflege und kleine handwerkliche Arbeiten rund ums Haus im gesamten Lahn-Dill-Kreis für mehr Sicherheit im eigenen Zuhause.
              </p>
            </div>

            {/* Card 6: Pflegeberatung § 37.3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Pflegeberatung (§ 37.3 SGB XI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gesetzlich verpflichtende Beratungsbesuche für Pflegegeldempfänger (halbjährlich oder vierteljährlich). Wir stellen den Nachweis direkt für Ihre Pflegekasse aus.
              </p>
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
              A-Cura Pflegekassen-Rechner
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Wählen Sie Ihren Pflegegrad, um die monatlichen Leistungen und Entlastungsbudgets einzusehen.
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
              {/* Entlastungsbetrag */}
              <div className="bg-white p-5 rounded-2xl border-2 border-brand-500 shadow-xs">
                <div className="text-xs font-bold text-brand-700 mb-1">
                  Entlastungsbetrag § 45b (A-Cura)
                </div>
                <div className="text-3xl font-black text-slate-900">
                  125 € <span className="text-sm font-semibold text-slate-500">/ Mt.</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Zusätzlicher Anspruch für Betreuung, Haushalt & Alltagshilfe
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
                  Monatliche Auszahlung bei privater häuslicher Pflege
                </div>
              </div>

              {/* Verhinderungspflege */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-emerald-700 mb-1">
                  Verhinderungspflege § 39
                </div>
                <div className="text-3xl font-black text-emerald-700">
                  bis 1.612 €
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Jährliches Budget für Urlaubs- oder Krankheitsvertretung
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                <span>Jetzt kostenlose Beratung für Pflegegrad {selectedCareLevel} vereinbaren</span>
                <ChevronRight className="w-4 h-4" />
              </a>
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
                Persönlicher Kontakt in Wetzlar
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                Sprechen Sie uns an – wir helfen Ihnen gerne.
              </h2>
              <p className="text-xs text-slate-300">
                Mehtap Sarac und das Team von A-Cura beraten Sie verständlich, kostenfrei und auf Augenhöhe.
              </p>
            </div>

            {contactSent ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400 text-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 2 Stunden persönlich bei Ihnen.</span>
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
                  <label className="font-bold text-slate-300 block mb-1">Telefonnummer / Mobil *</label>
                  <input
                    type="tel"
                    required
                    placeholder="z.B. 0157 / 54150233"
                    className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-300 block mb-1">Wie können wir helfen?</label>
                  <textarea
                    rows={3}
                    placeholder="z.B. Entlastungsbetrag § 45b, Seniorenbetreuung, Kinderbetreuung, Gartenpflege..."
                    className="w-full p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-black text-sm rounded-xl shadow-lg transition"
                  >
                    Kostenlose Anfrage absenden
                  </button>
                  <a
                    href="https://wa.me/4915754150233"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
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
            <span>• Betreuungsdienst Wetzlar</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Ostendstraße 10, 35584 Wetzlar (Naunheim) • Inhaberin: Mehtap Sarac</span>
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
