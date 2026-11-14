# A-Cura Care OS & Webportal (a-cura.de)
### Intelligente Pflegemanagement- & KI-Tourenplanungs-Plattform für ambulante Pflegedienste

Eine voll funktionsfähige, hochmoderne Enterprise-Webanwendung und Plattform für ambulante Altenpflege- und Pflegedienste (speziell vorkonfiguriert für das Stadtgebiet **Wetzlar & den Lahn-Dill-Kreis**).

---

## 💎 Verkaufsargumente & Business Case (2.500 € Setup + 250 € / Monat)

Dieses System bietet jedem Pflegedienstleiter (PDL) und Inhaber sofortigen messbaren Mehrwert:
1. **Bis zu 45% weniger Fahrtkosten & Fahrzeiten**: Durch die mathematische KI-Routenoptimierung (Nearest Neighbor & 2-Opt VRP Heuristik) werden Leerfahrten, kreuzende Wege und Fehleinsätze in Wetzlar eliminiert.
2. **ArbZG- & SGB-V-Sicherheit**: Automatische Prüfung der gesetzlichen 11h-Mindestruhezeiten sowie Qualifikationsabgleich (nur examinierte Fachkräfte dürfen behandlungspflegerische SGB V Leistungen wie sterile Wundverbände oder Insulingaben durchführen).
3. **Pfleger-App (Mobile Ansicht im Dienstwagen)**: Pflegekräfte sehen auf dem Smartphone ihre Route, starten Google/Apple Maps per Klick, rufen Patienten direkt an, sehen Schlüsselsafe-PINs, tragen Vitalwerte ein und lassen Leistungen digital per Touchscreen quittieren.
4. **DATEV-fertige Lohnbuchhaltung**: Automatische Ermittlung steuerfreier Sonntags-, Feiertags- und Nachtzuschläge (SFN § 3b EStG), Überstundenkonten und 1-Klick-CSV-Export für den Steuerberater.
5. **Duales System**: Sowohl **internes Pflegemanagement (Leitstand & Cockpit)** als auch **öffentliche Website für a-cura.de** mit interaktivem Pflegegrad-Rechner zur Neukundengewinnung.

---

## 🚀 Schnellstart & Lokale Ausführung

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten
npm run dev

# 3. Für Produktion bauen
npm run build
```

Der Server startet auf **`http://localhost:3000`**.

---

## 📦 Funktionsmodule im Detail

### 1. 📊 Cockpit & Leitstand (Dashboard)
- Live-Status aller aktiven Touren im Stadtgebiet Wetzlar.
- Echtzeit-Zähler: Betreute Patienten, erledigte Hausbesuche, eingesparte Kilometer & CO₂.
- Wichtige Vorkommnisse & Schichtübergabe-Feed für die Pflegedienstleitung.

### 2. 🚗 Tourenplanung & KI-Routenoptimierung (Flaggschiff)
- Mathematischer VRP/TSP-Optimierungsalgorithmus mit städtischem Wetzlar-Umwegefaktor.
- Interaktive Leaflet-Karte mit Stopp-Nummerierung (#1 bis #5) und Polylines.
- Vorher/Nachher-Vergleich (Fahrstrecke, Fahrzeit, CO₂-Reduktion).
- Automatische 1-Klick-Verteilung aller Patienten auf die verfügbaren Dienstwagen.

### 3. 📱 Pfleger-App (Mobil im Auto)
- Smartphone-optimierte Benutzeroberfläche für mobile Pflegekräfte.
- 1-Klick Navigation via Google Maps & Telefonanruf.
- Schlüsselsafe-Code mit Ausblend-/Einblend-Sicherheit.
- Checkliste für Grundpflege (SGB XI) & Behandlungspflege (SGB V).
- Vitalwerterfassung (Blutdruck, Puls, Blutzucker mg/dl).
- Digitale Quittierung / Signatur-Pad.

### 4. 👵 Klienten & digitale Pflegeakten
- Stammdaten mit Pflegegrad 1–5, Kasse (AOK Hessen, Barmer, TK etc.), Versichertennummer.
- Besuchszeiten, bevorzugte Zeitfenster und hinterlegte Wochentage (Mo–So).
- Spezifische Pflegehinweise & Allergien.
- Schnelle Klienten-Neuanlage mit Wetzlarer Geokoordinaten.

### 5. 📅 Dienstplan & Schichten
- Vollständiger Wochen- und Monatsdienstplan.
- Schnelles Weiterschalten von Schichten (F, S, N, T, U, K, Frei) per Klick.
- Automatischer ArbZG-Prüfhinweis (11h Ruhezeit, Fachkraftquote).

### 6. 🤒 Urlaub & Krankheitsplan (Fehlzeiten)
- Erfassung von eAU-Krankmeldungen und Erholungsurlaub.
- 1-Klick-Vertretungsfinder: Automatische Zuteilung passender Fachkräfte bei Krankheitsausfall.

### 7. 👥 Mitarbeiter & Fuhrpark
- Qualifikationsverwaltung (Examinierte Fachkräfte, LG1/LG2 Helfer, Wundexperten ICW, PDL).
- E-Flotte Zuweisung (VW ID.3, Renault Zoe, Smart EQ, Opel Corsa-e).
- Wochenarbeitszeit, Stundenlöhne und Überstundenkonten.

### 8. 💰 Lohnbuchhaltung & DATEV-Schnittstelle
- Monatliche Abrechnung mit Soll/Ist-Vergleich.
- Steuerfreie SFN-Zuschläge nach § 3b EStG (+25% Nacht, +50% Sonntag, +125% Feiertag).
- 1%-Dienstwagenversteuerung.
- Muster-Lohnabrechnung zum Ausdrucken.
- **1-Klick DATEV LODAS CSV-Export** für die Steuerkanzlei.

### 9. 📑 SGB Kassenabrechnung
- Trennung nach SGB XI (Pflegesachleistungen) und SGB V (ärztliche HKP-Verordnungen).
- DTA § 302 Kassen-Übertragungsübersicht.

### 10. 🌐 Öffentliche Website a-cura.de
- Repräsentative Landing Page für Patienten & Angehörige in Mittelhessen.
- Interaktiver Pflegegrad-Rechner (Geld- vs. Sachleistungsbudget bis 2.200 €/Monat).
- 24/7 Rufbereitschaftshotline & Anfrageformular.

---

## 🛠️ Technologie-Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Mapping & GIS**: Leaflet, OpenStreetMap / CartoDB Tiles
- **Animationen**: Canvas-Confetti
- **Persistenz**: Lokale Datenhaltung (LocalStorage mit sofortiger Wiederherstellung)
