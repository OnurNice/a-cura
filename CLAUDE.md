# A-CURA Betreuungsdienst & Pflegemanagement SaaS

## 📌 Projekt-Übersicht
- **Kunde:** A-CURA Betreuungsdienst (Inhaberin: Mehtap Sarac, Ostendstraße 10, 35584 Wetzlar)
- **Geschäftsmodell:** 2.500 € Setup + 250 € / Monat SaaS-Pauschale
- **Ziel:** Ambulanter Pflegedienst Komplettlösung für Wetzlar / Lahn-Dill-Kreis (Dienstplan, mobile Pfleger-App, automatisierte Tourenoptimierung, Lohnbuchhaltung, SGB XI / SGB V Abrechnung).

## 🛠️ Tech Stack & Befehle
- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Leaflet (OSM Wetzlar)
- **Build-Befehl:** `npm run build`
- **Dev-Server:** `npm run dev` (Port 3000)
- **CI / Hosting:** GitHub Pages (`https://onurnice.github.io/a-cura/`) & GitHub Repo (`https://github.com/OnurNice/a-cura`)
- **Routing & Base:** `vite.config.ts` hat `base: './'` (funktioniert auf jeder Subdomain / Cloudflare / GitHub Pages).

## 🎨 Corporate Identity & Design-Regeln
- **Farben:** A-CURA Royal/Navy Blue (`#1d4ed8`, `#1e40af`, `#0f172a`), Reinweiß, Slate Gray.
- **UI-Stil:** Shadcn-ähnliche, extrem aufgeräumte Cards, wenige gezielte Buttons (kein Button-Overload!).
- **Mobile First:** Die Pfleger-App (`CaregiverMobileView.tsx`) ist für die Nutzung auf Smartphones im Auto optimiert (1-Klick Google Maps Navigation, Schlüsseltresor-PIN-Reveal, Vitalwert-Eingabe, digitale Patientenunterschrift).

## 📂 Wichtige Verzeichnisse & Dateien
- `src/services/routeOptimizer.ts`: 2-Opt & Nearest-Neighbor Algorithmus für Wetzlarer Straßengegebenheiten (Urban-Faktor 1.38, SGB V Qualifikationsprüfung).
- `src/services/storage.ts`: Lokale Persistenz (LocalStorage) für Klienten, Mitarbeiter, Touren, Schichten.
- `src/data/mockData.ts`: Klienten-, Mitarbeiter- und Tourendaten (bereit zum Ersetzen durch Mehtaps echte Google-Drive-Dateien).
- `src/views/`:
  - `DashboardView.tsx`: KPI-Cockpit & ROI-Kalkulation
  - `TourPlanningView.tsx`: Interaktive Wetzlar-Karte & Tour-Zuweisung
  - `CaregiverMobileView.tsx`: Mobile Ansicht für Fahrer
  - `RosterView.tsx`: Dienstplaner (Früh/Spät/Nacht/Urlaub/Krank mit ArbZG-Prüfung)
  - `PayrollView.tsx`: Lohnbuchhaltung mit § 3b EStG SFN-Zuschlägen & DATEV-CSV-Export
  - `PublicWebsiteView.tsx`: Öffentlicher Auftritt mit Pflegegradrechner & WhatsApp-Kontakt

## 🚀 Nächste Schritte
1. **Google Drive Daten:** Mehtaps echte Kundenliste (Wetzlar-Adressen) und Mitarbeiterliste in `src/data/mockData.ts` oder Storage einpflegen.
2. **Domain:** Domain `a-cura.de` oder `app.a-cura.de` (aktuell bei Jimdo) auf das Hosting umstellen.
