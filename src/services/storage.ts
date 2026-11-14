import { Employee, Client, Tour, Shift, Absence, PayrollRecord } from '../types';
import {
  INITIAL_EMPLOYEES,
  INITIAL_CLIENTS,
  INITIAL_TOURS,
  INITIAL_SHIFTS,
  INITIAL_ABSENCES,
  INITIAL_PAYROLL
} from '../data/mockData';

const STORAGE_KEYS = {
  EMPLOYEES: 'a_cura_employees_v1',
  CLIENTS: 'a_cura_clients_v1',
  TOURS: 'a_cura_tours_v1',
  SHIFTS: 'a_cura_shifts_v1',
  ABSENCES: 'a_cura_absences_v1',
  PAYROLL: 'a_cura_payroll_v1'
};

export const StorageService = {
  getEmployees(): Employee[] {
    const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_EMPLOYEES;
    }
  },

  saveEmployees(employees: Employee[]): void {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  },

  getClients(): Client[] {
    const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CLIENTS;
    }
  },

  saveClients(clients: Client[]): void {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  },

  getTours(): Tour[] {
    const data = localStorage.getItem(STORAGE_KEYS.TOURS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(INITIAL_TOURS));
      return INITIAL_TOURS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_TOURS;
    }
  },

  saveTours(tours: Tour[]): void {
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(tours));
  },

  getShifts(): Shift[] {
    const data = localStorage.getItem(STORAGE_KEYS.SHIFTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(INITIAL_SHIFTS));
      return INITIAL_SHIFTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_SHIFTS;
    }
  },

  saveShifts(shifts: Shift[]): void {
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(shifts));
  },

  getAbsences(): Absence[] {
    const data = localStorage.getItem(STORAGE_KEYS.ABSENCES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(INITIAL_ABSENCES));
      return INITIAL_ABSENCES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_ABSENCES;
    }
  },

  saveAbsences(absences: Absence[]): void {
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(absences));
  },

  getPayroll(): PayrollRecord[] {
    const data = localStorage.getItem(STORAGE_KEYS.PAYROLL);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PAYROLL, JSON.stringify(INITIAL_PAYROLL));
      return INITIAL_PAYROLL;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PAYROLL;
    }
  },

  savePayroll(payroll: PayrollRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.PAYROLL, JSON.stringify(payroll));
  },

  resetAll(): void {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(INITIAL_TOURS));
    localStorage.setItem(STORAGE_KEYS.SHIFTS, JSON.stringify(INITIAL_SHIFTS));
    localStorage.setItem(STORAGE_KEYS.ABSENCES, JSON.stringify(INITIAL_ABSENCES));
    localStorage.setItem(STORAGE_KEYS.PAYROLL, JSON.stringify(INITIAL_PAYROLL));
  }
};
