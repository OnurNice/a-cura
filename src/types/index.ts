export type Role = 'PDL' | 'Fachkraft' | 'Pflegehelfer' | 'Betreuungskraft' | 'Wundexperte';

export interface VitalRecord {
  id: string;
  timestamp: string;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  bloodSugar?: number; // mg/dl
  weightKg?: number;
  temperatureCelsius?: number;
  oxygenSaturation?: number; // SpO2 %
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: Role;
  qualifications: string[];
  hasDriverLicense: boolean;
  assignedVehicle: string;
  phone: string;
  email: string;
  address: string;
  contractHours: number; // e.g. 38.5
  hourlyWage: number; // e.g. 23.50 €
  baseSalary?: number;
  vacationDaysPerYear: number;
  remainingVacationDays: number;
  overtimeHours: number;
  status: 'active' | 'sick' | 'vacation' | 'off';
  avatar: string;
}

export interface Client {
  id: string;
  name: string;
  careLevel: 1 | 2 | 3 | 4 | 5; // Pflegegrad
  healthInsurance: string; // e.g. 'AOK Hessen'
  insuranceNumber: string;
  address: string;
  zip: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  doctor: {
    name: string;
    phone: string;
  };
  keyBox: {
    hasKey: boolean;
    location?: string;
    pinCode?: string;
  };
  visitDays: ('Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So')[];
  preferredTime: string; // e.g. '07:30 - 08:15'
  durationMinutes: number; // standard care duration
  sgbXI_Services: string[]; // Grundpflege (Körperpflege, Ernährung, Mobilität)
  sgbV_Services: string[]; // Behandlungspflege (Medikamente, BZ, Verbände)
  requiresQualifiedNurse: boolean;
  allergiesNotes?: string;
  vitalHistory: VitalRecord[];
}

export interface TourStop {
  id: string;
  clientId: string;
  order: number;
  plannedArrival: string;
  plannedDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedServices: string[];
  vitalRecord?: VitalRecord;
  clientSignature?: string;
  nurseNotes?: string;
}

export interface Tour {
  id: string;
  name: string;
  shift: 'Früh' | 'Spät' | 'Nacht';
  date: string;
  driverId: string;
  vehicle: string;
  stops: TourStop[];
  totalDistanceKm: number;
  totalDurationMin: number;
  unoptimizedDistanceKm?: number;
  fuelSavedKm?: number;
  co2SavedKg?: number;
  status: 'geplant' | 'unterwegs' | 'abgeschlossen';
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  type: 'F' | 'S' | 'N' | 'T' | 'U' | 'K' | 'Frei'; // Früh, Spät, Nacht, Teildienst, Urlaub, Krank
  startTime: string;
  endTime: string;
  tourId?: string;
  notes?: string;
}

export interface Absence {
  id: string;
  employeeId: string;
  type: 'Krankheit' | 'Urlaub' | 'Fortbildung' | 'Sonderurlaub';
  startDate: string;
  endDate: string;
  status: 'beantragt' | 'genehmigt' | 'abgelehnt';
  substituteId?: string;
  doctorCertificate: boolean; // AU Bescheinigung
  reason?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string; // e.g. '2026-11'
  baseHours: number;
  actualHours: number;
  overtimeHours: number;
  nightHours: number; // +25% Zuschlag (§3b EStG)
  sundayHours: number; // +50% Zuschlag (§3b EStG)
  holidayHours: number; // +125% Zuschlag (§3b EStG)
  hourlyWage: number;
  baseGross: number;
  sfnBonuses: number;
  carDeduction: number;
  totalGross: number;
  estimatedNet: number;
  employerTotal: number;
  payoutDate: string;
  status: 'entwurf' | 'geprüft' | 'freigegeben';
}
