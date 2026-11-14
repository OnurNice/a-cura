import { Employee, Client, Tour, Shift, Absence, PayrollRecord } from '../types';

export const A_CURA_HQ = {
  name: 'A-Cura Betreuungs- & Pflegedienst Wetzlar',
  address: 'Ostendstraße 10',
  zip: '35584',
  city: 'Wetzlar (Naunheim)',
  lat: 50.5795,
  lng: 8.5230,
  phone: '06441 / 7869627',
  mobile: '0157 / 54150233',
  email: 'info@a-cura.de',
  owner: 'Mehtap Sarac'
};

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Mehtap Sarac',
    role: 'PDL',
    qualifications: ['Inhaberin & Pflegedienstleitung (PDL)', 'Examinierte Fachkraft', 'Pflegeberaterin § 37.3', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'VW ID.3 (LDK-AC 101)',
    phone: '0157 / 54150233',
    email: 'sarac@a-cura.de',
    address: 'Ostendstraße 10, 35584 Wetzlar',
    contractHours: 40,
    hourlyWage: 32.00,
    vacationDaysPerYear: 30,
    remainingVacationDays: 16,
    overtimeHours: 4.5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-2',
    name: 'Tobias Müller',
    role: 'Fachkraft',
    qualifications: ['Examinierter Altenpfleger', 'SGB V Behandlungspflege LG1/LG2', 'Praxisanleiter', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'Renault Zoe E-Tech (LDK-AC 102)',
    phone: '0176 / 553 9102',
    email: 't.mueller@a-cura.de',
    address: 'Lindenstraße 8, 35576 Wetzlar',
    contractHours: 38.5,
    hourlyWage: 24.20,
    vacationDaysPerYear: 30,
    remainingVacationDays: 18,
    overtimeHours: 12.0,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-3',
    name: 'Laura Sommer',
    role: 'Fachkraft',
    qualifications: ['Examinierte Gesundheits- & Krankenpflegerin', 'Schmerzexpertin', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'Smart EQ Forfour (LDK-AC 103)',
    phone: '0151 / 920 3341',
    email: 'l.sommer@a-cura.de',
    address: 'Frankfurter Str. 42, 35578 Wetzlar',
    contractHours: 35,
    hourlyWage: 24.50,
    vacationDaysPerYear: 30,
    remainingVacationDays: 8,
    overtimeHours: 4.5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1594824813590-78ff952dfa76?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-4',
    name: 'Mehmet Yilmaz',
    role: 'Pflegehelfer',
    qualifications: ['Pflegehelfer mit Zertifikat LG1 / LG2', 'Erste-Hilfe Ausbilder', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'VW e-Up! (LDK-AC 104)',
    phone: '0170 / 449 8192',
    email: 'm.yilmaz@a-cura.de',
    address: 'Silhöfer Str. 17, 35578 Wetzlar',
    contractHours: 38.5,
    hourlyWage: 18.80,
    vacationDaysPerYear: 28,
    remainingVacationDays: 12,
    overtimeHours: 9.0,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-5',
    name: 'Anna Vogel',
    role: 'Pflegehelfer',
    qualifications: ['Pflegeassistenz', 'LG1 Basisqualifikation', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'Smart EQ Forfour (LDK-AC 105)',
    phone: '0160 / 771 9084',
    email: 'a.vogel@a-cura.de',
    address: 'Wiesenweg 3, 35582 Dutenhofen',
    contractHours: 30,
    hourlyWage: 17.50,
    vacationDaysPerYear: 28,
    remainingVacationDays: 16,
    overtimeHours: 0,
    status: 'sick', // AU aktuell eingetragen zur Demo!
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-6',
    name: 'Stefan Braun',
    role: 'Betreuungskraft',
    qualifications: ['Zertifizierte Betreuungskraft § 43b SGB XI', 'Gedächtnistraining', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'Opel Corsa-e (LDK-AC 106)',
    phone: '0172 / 311 0928',
    email: 's.braun@a-cura.de',
    address: 'Goethestraße 29, 35578 Wetzlar',
    contractHours: 25,
    hourlyWage: 17.00,
    vacationDaysPerYear: 28,
    remainingVacationDays: 5,
    overtimeHours: -2.0,
    status: 'vacation', // Im Urlaub zur Demo!
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-7',
    name: 'Jessica Wolf',
    role: 'Wundexperte',
    qualifications: ['Examinierte Pflegefachkraft', 'Wundexpertin ICW', 'Palliative Care', 'B-Führerschein'],
    hasDriverLicense: true,
    assignedVehicle: 'VW ID.3 (LDK-AC 107)',
    phone: '0157 / 882 1435',
    email: 'j.wolf@a-cura.de',
    address: 'Altenberger Str. 12, 35576 Wetzlar',
    contractHours: 38.5,
    hourlyWage: 25.00,
    vacationDaysPerYear: 30,
    remainingVacationDays: 21,
    overtimeHours: 3.5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cl-1',
    name: 'Erika Schmidt',
    careLevel: 3,
    healthInsurance: 'AOK Hessen',
    insuranceNumber: 'V294819028',
    address: 'Hausertorstraße 22',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5585,
    lng: 8.5012,
    phone: '06441 / 23901',
    emergencyContact: {
      name: 'Thomas Schmidt (Sohn)',
      phone: '0171 / 992 104',
      relation: 'Sohn & Vorsorgebevollmächtigter'
    },
    doctor: {
      name: 'Dr. med. H. Weber (Hausarzt Wetzlar)',
      phone: '06441 / 44210'
    },
    keyBox: {
      hasKey: true,
      location: 'Neben der Haustür hinter dem Blumenkübel',
      pinCode: '4821'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '07:15 - 08:00',
    durationMinutes: 40,
    sgbXI_Services: ['LK 01: Große Grundpflege (Ganzkörperwäsche, Ankleiden)'],
    sgbV_Services: ['HKP 04: Blutzuckermessung & Insulingabe nach Schema', 'HKP 12: Richten & Verabreichen von Medikamenten'],
    requiresQualifiedNurse: true,
    allergiesNotes: 'Penicillin-Allergie. Neigt morgens zu Hypoglykämie (BZ < 70). Vor Insulingabe BZ messen!',
    vitalHistory: [
      {
        id: 'vit-1',
        timestamp: 'Gestern, 07:25 Uhr',
        bloodPressureSystolic: 130,
        bloodPressureDiastolic: 82,
        heartRate: 74,
        bloodSugar: 128,
        notes: 'Wohlbefinden gut, 6 IE Insulin s.c. verabreicht.'
      }
    ]
  },
  {
    id: 'cl-2',
    name: 'Heinz Weber',
    careLevel: 4,
    healthInsurance: 'Barmer',
    insuranceNumber: 'B847291039',
    address: 'Silhöfer Str. 39',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5541,
    lng: 8.5029,
    phone: '06441 / 30192',
    emergencyContact: {
      name: 'Monika Weber (Ehefrau)',
      phone: '06441 / 30192',
      relation: 'Ehefrau'
    },
    doctor: {
      name: 'Dr. med. A. Keller (Kardiologie)',
      phone: '06441 / 89120'
    },
    keyBox: {
      hasKey: false,
      location: 'Ehefrau öffnet an der Haustür'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '08:05 - 08:45',
    durationMinutes: 40,
    sgbXI_Services: ['LK 02: Kleine Grundpflege (Teilwäsche, Transfer)', 'LK 11: Zubereitung Frühstück'],
    sgbV_Services: ['HKP 24: Kompressionsstrümpfe Kl. II anziehen (bds.)'],
    requiresQualifiedNurse: false,
    allergiesNotes: 'Z.n. Schlaganfall, Halbseitenlähmung rechts. Transfer mit Rutschbrett.',
    vitalHistory: [
      {
        id: 'vit-2',
        timestamp: 'Gestern, 08:15 Uhr',
        bloodPressureSystolic: 138,
        bloodPressureDiastolic: 88,
        heartRate: 68,
        bloodSugar: 98,
        notes: 'Strümpfe angezogen, Haut intakt.'
      }
    ]
  },
  {
    id: 'cl-3',
    name: 'Gertrud Becker',
    careLevel: 2,
    healthInsurance: 'TK - Techniker Krankenkasse',
    insuranceNumber: 'T994820172',
    address: 'Garbenheimer Str. 12',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5630,
    lng: 8.5175,
    phone: '06441 / 55214',
    emergencyContact: {
      name: 'Markus Becker (Enkel)',
      phone: '0162 / 349 901',
      relation: 'Enkel'
    },
    doctor: {
      name: 'Gemeinschaftspraxis Dom Wetzlar',
      phone: '06441 / 20040'
    },
    keyBox: {
      hasKey: true,
      location: 'Schlüsselsafe links neben Briefkasten',
      pinCode: '1945'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '08:50 - 09:25',
    durationMinutes: 35,
    sgbXI_Services: ['LK 03: Hilfe bei der Nahrungsaufnahme', 'LK 07: Mobilisation & Gehtraining'],
    sgbV_Services: ['HKP 12: Medikamente einnehmen überwachen'],
    requiresQualifiedNurse: false,
    allergiesNotes: 'Leichte Demenz. Braucht freundliche Ansprache & Motivation zum Trinken.',
    vitalHistory: []
  },
  {
    id: 'cl-4',
    name: 'Wilhelm Wagner',
    careLevel: 3,
    healthInsurance: 'AOK Hessen',
    insuranceNumber: 'A193820194',
    address: 'Altenberger Str. 45',
    zip: '35576',
    city: 'Wetzlar',
    lat: 50.5480,
    lng: 8.4910,
    phone: '06441 / 78103',
    emergencyContact: {
      name: 'Sabine Wagner (Tochter)',
      phone: '0175 / 449 109',
      relation: 'Tochter'
    },
    doctor: {
      name: 'Dr. med. R. Schneider (Chirurgie / Wundambulant)',
      phone: '06441 / 61902'
    },
    keyBox: {
      hasKey: true,
      location: 'Carport Pfeiler links',
      pinCode: '7723'
    },
    visitDays: ['Mo', 'Mi', 'Fr'],
    preferredTime: '09:30 - 10:15',
    durationMinutes: 45,
    sgbXI_Services: ['LK 02: Kleine Grundpflege'],
    sgbV_Services: ['HKP 31: Spezielle Wundversorgung Ulcus cruris rechtes Bein (aseptischer Verbandswechsel)'],
    requiresQualifiedNurse: true,
    allergiesNotes: 'ACHTUNG: Steriler Verband am Unterschenkel rechts! Nur durch examinierte Fachkraft / Wundexperte.',
    vitalHistory: [
      {
        id: 'vit-3',
        timestamp: 'Vorgestern, 09:40 Uhr',
        bloodPressureSystolic: 125,
        bloodPressureDiastolic: 79,
        heartRate: 72,
        notes: 'Wundgrund sauber granulierend, keine Infektzeichen. Schaumverband erneuert.'
      }
    ]
  },
  {
    id: 'cl-5',
    name: 'Maria Hoffmann',
    careLevel: 5,
    healthInsurance: 'IKK Classic',
    insuranceNumber: 'I391820491',
    address: 'Nauborner Str. 84',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5390,
    lng: 8.5070,
    phone: '06441 / 44918',
    emergencyContact: {
      name: 'Klaus Hoffmann (Ehemann)',
      phone: '06441 / 44918',
      relation: 'Pflegender Angehöriger'
    },
    doctor: {
      name: 'Dr. med. E. Braun (Neurologie)',
      phone: '06441 / 34091'
    },
    keyBox: {
      hasKey: false,
      location: 'Angehöriger öffnet immer'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '10:20 - 11:05',
    durationMinutes: 45,
    sgbXI_Services: ['LK 01: Große Grundpflege (Bettbad)', 'LK 05: Dekubitus-Prophylaxe & 30°-Lagerung'],
    sgbV_Services: ['HKP 16: PEG-Sondenernährung & Verbandswechsel', 'HKP 12: Medikamente per Sonde'],
    requiresQualifiedNurse: true,
    allergiesNotes: 'Schwerste Beeinträchtigung der Selbstständigkeit. PEG-Kost 1000ml Nutricomp.',
    vitalHistory: []
  },
  {
    id: 'cl-6',
    name: 'Günter Schäfer',
    careLevel: 2,
    healthInsurance: 'DAK Gesundheit',
    insuranceNumber: 'D884910283',
    address: 'Dalheimer Grund 15',
    zip: '35576',
    city: 'Wetzlar',
    lat: 50.5645,
    lng: 8.4830,
    phone: '06441 / 90431',
    emergencyContact: {
      name: 'Carola Schäfer (Schwiegertochter)',
      phone: '0173 / 889 123',
      relation: 'Schwiegertochter'
    },
    doctor: {
      name: 'Dr. med. P. Krause',
      phone: '06441 / 51234'
    },
    keyBox: {
      hasKey: true,
      location: 'Kellerabgang weißes Kästchen',
      pinCode: '0304'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '07:30 - 08:00',
    durationMinutes: 30,
    sgbXI_Services: ['LK 02: Unterstützung Körperpflege'],
    sgbV_Services: ['HKP 12: Medikamentengabe morgens', 'HKP 01: Vitalzeichenkontrolle'],
    requiresQualifiedNurse: false,
    allergiesNotes: 'Sturzgefährdet. Rollator muss griffbereit stehen.',
    vitalHistory: []
  },
  {
    id: 'cl-7',
    name: 'Hildegard Bauer',
    careLevel: 3,
    healthInsurance: 'Barmer',
    insuranceNumber: 'B109283741',
    address: 'Braunfelser Str. 78',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5510,
    lng: 8.4720,
    phone: '06441 / 88392',
    emergencyContact: {
      name: 'Jürgen Bauer (Sohn)',
      phone: '0151 / 229 441',
      relation: 'Sohn'
    },
    doctor: {
      name: 'Dr. med. M. Bergmann',
      phone: '06441 / 77192'
    },
    keyBox: {
      hasKey: true,
      location: 'Hinterer Garteneingang',
      pinCode: '9120'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '08:15 - 08:55',
    durationMinutes: 40,
    sgbXI_Services: ['LK 01: Große Grundpflege im Bad', 'LK 08: Mund- und Zahnpflege'],
    sgbV_Services: ['HKP 24: Kompressionsstrümpfe anziehen'],
    requiresQualifiedNurse: false,
    allergiesNotes: 'Schwindel beim Aufstehen, immer 2 Minuten an der Bettkante sitzen lassen.',
    vitalHistory: []
  },
  {
    id: 'cl-8',
    name: 'Hans Klein',
    careLevel: 4,
    healthInsurance: 'AOK Hessen',
    insuranceNumber: 'A948271038',
    address: 'Hermannsteiner Str. 31',
    zip: '35576',
    city: 'Wetzlar',
    lat: 50.5720,
    lng: 8.4980,
    phone: '06441 / 66201',
    emergencyContact: {
      name: 'Renate Klein (Tochter)',
      phone: '0170 / 991 382',
      relation: 'Tochter'
    },
    doctor: {
      name: 'Dr. med. H. Weber',
      phone: '06441 / 44210'
    },
    keyBox: {
      hasKey: true,
      location: 'Schlüsselkasten Haustür links',
      pinCode: '3344'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '09:10 - 09:55',
    durationMinutes: 45,
    sgbXI_Services: ['LK 01: Vollbad / Duschen (Mo + Do)', 'LK 02: Teilwäsche'],
    sgbV_Services: ['HKP 04: BZ-Messung & Insulin pen', 'HKP 12: Medikamente'],
    requiresQualifiedNurse: true,
    allergiesNotes: 'Schwerhörig. Deutlich und von vorne sprechen.',
    vitalHistory: []
  },
  {
    id: 'cl-9',
    name: 'Renate Schneider',
    careLevel: 2,
    healthInsurance: 'TK - Techniker Krankenkasse',
    insuranceNumber: 'T449102839',
    address: 'Steindorfer Str. 18',
    zip: '35578',
    city: 'Wetzlar',
    lat: 50.5360,
    lng: 8.4810,
    phone: '06441 / 33819',
    emergencyContact: {
      name: 'Petra Schneider (Nichte)',
      phone: '0160 / 441 902',
      relation: 'Nichte'
    },
    doctor: {
      name: 'Hausarztpraxis Steindorf',
      phone: '06441 / 22100'
    },
    keyBox: {
      hasKey: false,
      location: 'Patientin öffnet selbst'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    preferredTime: '10:00 - 10:40',
    durationMinutes: 40,
    sgbXI_Services: ['LK 11: Zubereitung warmer Mahlzeiten', 'LK 14: Begleitung bei Behördengängen/Einkauf'],
    sgbV_Services: ['HKP 01: Blutdruckkontrolle'],
    requiresQualifiedNurse: false,
    allergiesNotes: 'Bluthochdruckpatientin.',
    vitalHistory: []
  },
  {
    id: 'cl-10',
    name: 'Kurt Fischer',
    careLevel: 3,
    healthInsurance: 'AOK Hessen',
    insuranceNumber: 'A883910294',
    address: 'Karl-Kellner-Ring 24',
    zip: '35576',
    city: 'Wetzlar',
    lat: 50.5550,
    lng: 8.5080,
    phone: '06441 / 44812',
    emergencyContact: {
      name: 'Frank Fischer (Sohn)',
      phone: '0171 / 882 910',
      relation: 'Sohn'
    },
    doctor: {
      name: 'Urologische Gemeinschaftspraxis Wetzlar',
      phone: '06441 / 49012'
    },
    keyBox: {
      hasKey: true,
      location: 'Hinterhof Mülltonnenüberdachung',
      pinCode: '6612'
    },
    visitDays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    preferredTime: '10:45 - 11:25',
    durationMinutes: 40,
    sgbXI_Services: ['LK 02: Kleine Grundpflege', 'LK 03: Hilfe beim Essen'],
    sgbV_Services: ['HKP 18: Katheterpflege & Wechsel des Urinbeutels', 'HKP 12: Medikamente'],
    requiresQualifiedNurse: true,
    allergiesNotes: 'Dauerkatheter. Urinmenge und Farbe im Tourenbuch dokumentieren.',
    vitalHistory: []
  }
];

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'tour-1',
    name: 'Tour 1: Wetzlar Süd & Altstadt (Frühschicht)',
    shift: 'Früh',
    date: '2026-11-14',
    driverId: 'emp-2', // Tobias Müller (Examinierte Fachkraft)
    vehicle: 'Renault Zoe E-Tech (LDK-AC 102)',
    totalDistanceKm: 18.4,
    totalDurationMin: 225,
    unoptimizedDistanceKm: 34.2,
    fuelSavedKm: 15.8,
    co2SavedKg: 2.8,
    status: 'unterwegs',
    stops: [
      {
        id: 'stop-1-1',
        clientId: 'cl-1', // Erika Schmidt
        order: 1,
        plannedArrival: '07:15',
        plannedDeparture: '07:55',
        actualArrival: '07:14',
        actualDeparture: '07:52',
        status: 'completed',
        completedServices: ['LK 01: Große Grundpflege', 'HKP 04: BZ-Messung & Insulin', 'HKP 12: Medikamente'],
        vitalRecord: {
          id: 'vr-101',
          timestamp: '07:22 Uhr',
          bloodPressureSystolic: 128,
          bloodPressureDiastolic: 80,
          heartRate: 72,
          bloodSugar: 135,
          notes: '6 IE Insulin verabreicht. Patientin gut gelaunt.'
        },
        nurseNotes: 'Wunde am linken Schienbein kontrolliert, Pflaster trocken.'
      },
      {
        id: 'stop-1-2',
        clientId: 'cl-2', // Heinz Weber
        order: 2,
        plannedArrival: '08:05',
        plannedDeparture: '08:45',
        actualArrival: '08:04',
        actualDeparture: '08:42',
        status: 'completed',
        completedServices: ['LK 02: Kleine Grundpflege', 'HKP 24: Kompressionsstrümpfe Kl. II'],
        vitalRecord: {
          id: 'vr-102',
          timestamp: '08:12 Uhr',
          bloodPressureSystolic: 134,
          bloodPressureDiastolic: 84,
          heartRate: 70,
          bloodSugar: 102
        },
        nurseNotes: 'Strümpfe angelegt. Ehefrau hat Frühstück vorbereitet.'
      },
      {
        id: 'stop-1-3',
        clientId: 'cl-4', // Wilhelm Wagner (Wundversorgung)
        order: 3,
        plannedArrival: '08:55',
        plannedDeparture: '09:40',
        actualArrival: '08:57',
        status: 'in_progress', // Aktuell hier!
        completedServices: ['LK 02: Kleine Grundpflege'],
        nurseNotes: 'Wundverband Ulcus cruris wird gerade steril gewechselt.'
      },
      {
        id: 'stop-1-4',
        clientId: 'cl-5', // Maria Hoffmann (PEG)
        order: 4,
        plannedArrival: '09:50',
        plannedDeparture: '10:35',
        status: 'pending',
        completedServices: []
      },
      {
        id: 'stop-1-5',
        clientId: 'cl-10', // Kurt Fischer (Katheter)
        order: 5,
        plannedArrival: '10:45',
        plannedDeparture: '11:25',
        status: 'pending',
        completedServices: []
      }
    ]
  },
  {
    id: 'tour-2',
    name: 'Tour 2: Wetzlar West & Lahnauen (Frühschicht)',
    shift: 'Früh',
    date: '2026-11-14',
    driverId: 'emp-4', // Mehmet Yilmaz (Pflegehelfer LG1/LG2)
    vehicle: 'VW e-Up! (LDK-AC 104)',
    totalDistanceKm: 21.2,
    totalDurationMin: 195,
    unoptimizedDistanceKm: 38.6,
    fuelSavedKm: 17.4,
    co2SavedKg: 3.1,
    status: 'unterwegs',
    stops: [
      {
        id: 'stop-2-1',
        clientId: 'cl-6', // Günter Schäfer
        order: 1,
        plannedArrival: '07:30',
        plannedDeparture: '08:00',
        actualArrival: '07:28',
        actualDeparture: '07:58',
        status: 'completed',
        completedServices: ['LK 02: Unterstützung Körperpflege', 'HKP 12: Medikamente']
      },
      {
        id: 'stop-2-2',
        clientId: 'cl-7', // Hildegard Bauer
        order: 2,
        plannedArrival: '08:15',
        plannedDeparture: '08:55',
        actualArrival: '08:14',
        status: 'in_progress',
        completedServices: ['LK 01: Große Grundpflege']
      },
      {
        id: 'stop-2-3',
        clientId: 'cl-3', // Gertrud Becker
        order: 3,
        plannedArrival: '09:10',
        plannedDeparture: '09:45',
        status: 'pending',
        completedServices: []
      },
      {
        id: 'stop-2-4',
        clientId: 'cl-8', // Hans Klein
        order: 4,
        plannedArrival: '10:00',
        plannedDeparture: '10:45',
        status: 'pending',
        completedServices: []
      },
      {
        id: 'stop-2-5',
        clientId: 'cl-9', // Renate Schneider
        order: 5,
        plannedArrival: '11:00',
        plannedDeparture: '11:40',
        status: 'pending',
        completedServices: []
      }
    ]
  }
];

export const INITIAL_SHIFTS: Shift[] = [
  // Heutige Schichten 14.11.2026
  { id: 'sh-1', employeeId: 'emp-1', date: '2026-11-14', type: 'F', startTime: '07:00', endTime: '15:30', notes: 'PDL Bürodienst & Qualitätskontrolle' },
  { id: 'sh-2', employeeId: 'emp-2', date: '2026-11-14', type: 'F', startTime: '06:45', endTime: '15:15', tourId: 'tour-1' },
  { id: 'sh-3', employeeId: 'emp-3', date: '2026-11-14', type: 'S', startTime: '14:30', endTime: '21:30', notes: 'Spätschicht Tour Süd' },
  { id: 'sh-4', employeeId: 'emp-4', date: '2026-11-14', type: 'F', startTime: '07:00', endTime: '15:00', tourId: 'tour-2' },
  { id: 'sh-5', employeeId: 'emp-5', date: '2026-11-14', type: 'K', startTime: '00:00', endTime: '00:00', notes: 'Arbeitsunfähig (AU liegt vor)' },
  { id: 'sh-6', employeeId: 'emp-6', date: '2026-11-14', type: 'U', startTime: '00:00', endTime: '00:00', notes: 'Erholungsurlaub' },
  { id: 'sh-7', employeeId: 'emp-7', date: '2026-11-14', type: 'F', startTime: '08:00', endTime: '16:30', notes: 'Wundvisiten Lahn-Dill' },

  // Weitere Tage für Wochenübersicht
  { id: 'sh-8', employeeId: 'emp-2', date: '2026-11-15', type: 'F', startTime: '06:45', endTime: '15:15' },
  { id: 'sh-9', employeeId: 'emp-3', date: '2026-11-15', type: 'F', startTime: '07:00', endTime: '15:30' },
  { id: 'sh-10', employeeId: 'emp-4', date: '2026-11-15', type: 'S', startTime: '14:30', endTime: '21:30' },
  { id: 'sh-11', employeeId: 'emp-7', date: '2026-11-15', type: 'Frei', startTime: '00:00', endTime: '00:00' },
  { id: 'sh-12', employeeId: 'emp-2', date: '2026-11-16', type: 'F', startTime: '06:45', endTime: '15:15' },
  { id: 'sh-13', employeeId: 'emp-3', date: '2026-11-16', type: 'S', startTime: '14:30', endTime: '21:30' },
  { id: 'sh-14', employeeId: 'emp-4', date: '2026-11-16', type: 'F', startTime: '07:00', endTime: '15:00' },
  { id: 'sh-15', employeeId: 'emp-7', date: '2026-11-16', type: 'F', startTime: '08:00', endTime: '16:30' }
];

export const INITIAL_ABSENCES: Absence[] = [
  {
    id: 'abs-1',
    employeeId: 'emp-5', // Anna Vogel
    type: 'Krankheit',
    startDate: '2026-11-12',
    endDate: '2026-11-17',
    status: 'genehmigt',
    doctorCertificate: true,
    substituteId: 'emp-4', // Mehmet Yilmaz vertritt
    reason: 'Akute Bronchitis (AU von Hausarztpraxis übermittelt)'
  },
  {
    id: 'abs-2',
    employeeId: 'emp-6', // Stefan Braun
    type: 'Urlaub',
    startDate: '2026-11-09',
    endDate: '2026-11-20',
    status: 'genehmigt',
    doctorCertificate: false,
    reason: 'Jahresurlaub'
  },
  {
    id: 'abs-3',
    employeeId: 'emp-3', // Laura Sommer
    type: 'Urlaub',
    startDate: '2026-12-23',
    endDate: '2026-12-30',
    status: 'beantragt',
    doctorCertificate: false,
    reason: 'Weihnachtsurlaub'
  }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay-1',
    employeeId: 'emp-1', // Sabrina Keller (PDL)
    month: '2026-11',
    baseHours: 168,
    actualHours: 174.5,
    overtimeHours: 6.5,
    nightHours: 4,
    sundayHours: 16,
    holidayHours: 0,
    hourlyWage: 28.50,
    baseGross: 4788.00,
    sfnBonuses: 256.50, // Steuerfreie SFN-Zuschläge (§ 3b EStG)
    carDeduction: 120.00,
    totalGross: 5044.50,
    estimatedNet: 3120.00,
    employerTotal: 6020.00,
    payoutDate: '2026-11-28',
    status: 'geprüft'
  },
  {
    id: 'pay-2',
    employeeId: 'emp-2', // Tobias Müller
    month: '2026-11',
    baseHours: 160,
    actualHours: 172.0,
    overtimeHours: 12.0,
    nightHours: 14,
    sundayHours: 24,
    holidayHours: 8,
    hourlyWage: 24.20,
    baseGross: 3872.00,
    sfnBonuses: 484.00, // Deutlich mehr SFN Zuschläge wegen Wochenenddienst
    carDeduction: 0,
    totalGross: 4356.00,
    estimatedNet: 2790.00,
    employerTotal: 5180.00,
    payoutDate: '2026-11-28',
    status: 'freigegeben'
  },
  {
    id: 'pay-3',
    employeeId: 'emp-3', // Laura Sommer
    month: '2026-11',
    baseHours: 147,
    actualHours: 151.5,
    overtimeHours: 4.5,
    nightHours: 18,
    sundayHours: 16,
    holidayHours: 0,
    hourlyWage: 24.50,
    baseGross: 3601.50,
    sfnBonuses: 306.25,
    carDeduction: 0,
    totalGross: 3907.75,
    estimatedNet: 2540.00,
    employerTotal: 4660.00,
    payoutDate: '2026-11-28',
    status: 'geprüft'
  },
  {
    id: 'pay-4',
    employeeId: 'emp-4', // Mehmet Yilmaz
    month: '2026-11',
    baseHours: 160,
    actualHours: 169.0,
    overtimeHours: 9.0,
    nightHours: 8,
    sundayHours: 20,
    holidayHours: 0,
    hourlyWage: 18.80,
    baseGross: 3008.00,
    sfnBonuses: 225.60,
    carDeduction: 0,
    totalGross: 3233.60,
    estimatedNet: 2190.00,
    employerTotal: 3860.00,
    payoutDate: '2026-11-28',
    status: 'geprüft'
  },
  {
    id: 'pay-5',
    employeeId: 'emp-7', // Jessica Wolf
    month: '2026-11',
    baseHours: 160,
    actualHours: 163.5,
    overtimeHours: 3.5,
    nightHours: 6,
    sundayHours: 8,
    holidayHours: 0,
    hourlyWage: 25.00,
    baseGross: 4000.00,
    sfnBonuses: 137.50,
    carDeduction: 120.00,
    totalGross: 4137.50,
    estimatedNet: 2680.00,
    employerTotal: 4940.00,
    payoutDate: '2026-11-28',
    status: 'entwurf'
  }
];
