import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { Employee, Client, Tour, Shift, Absence, PayrollRecord } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { TourPlanningView } from './views/TourPlanningView';
import { CaregiverMobileView } from './views/CaregiverMobileView';
import { ClientsView } from './views/ClientsView';
import { RosterView } from './views/RosterView';
import { AbsenceView } from './views/AbsenceView';
import { EmployeesView } from './views/EmployeesView';
import { PayrollView } from './views/PayrollView';
import { BillingView } from './views/BillingView';
import { PublicWebsiteView } from './views/PublicWebsiteView';
import { optimizeTourRoute } from './services/routeOptimizer';
import confetti from 'canvas-confetti';

export function App() {
  const [mode, setMode] = useState<'app' | 'website'>('app');
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // Persistent States
  const [employees, setEmployees] = useState<Employee[]>(() => StorageService.getEmployees());
  const [clients, setClients] = useState<Client[]>(() => StorageService.getClients());
  const [tours, setTours] = useState<Tour[]>(() => StorageService.getTours());
  const [shifts, setShifts] = useState<Shift[]>(() => StorageService.getShifts());
  const [absences, setAbsences] = useState<Absence[]>(() => StorageService.getAbsences());
  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => StorageService.getPayroll());

  const [activeCaregiverTourId, setActiveCaregiverTourId] = useState<string>(tours[0]?.id || '');

  // Sync to storage
  useEffect(() => {
    StorageService.saveEmployees(employees);
  }, [employees]);

  useEffect(() => {
    StorageService.saveClients(clients);
  }, [clients]);

  useEffect(() => {
    StorageService.saveTours(tours);
  }, [tours]);

  useEffect(() => {
    StorageService.saveShifts(shifts);
  }, [shifts]);

  useEffect(() => {
    StorageService.saveAbsences(absences);
  }, [absences]);

  useEffect(() => {
    StorageService.savePayroll(payroll);
  }, [payroll]);

  // Reset to initial Wetzlar demo data
  const handleResetData = () => {
    StorageService.resetAll();
    setEmployees(StorageService.getEmployees());
    setClients(StorageService.getClients());
    setTours(StorageService.getTours());
    setShifts(StorageService.getShifts());
    setAbsences(StorageService.getAbsences());
    setPayroll(StorageService.getPayroll());
    confetti({ particleCount: 60, spread: 60 });
  };

  // Open mobile view for specific tour
  const handleOpenMobileCaregiver = (tourId: string) => {
    setActiveCaregiverTourId(tourId);
    setCurrentTab('caregiver');
  };

  // Update a tour (e.g. after optimization or stop completion)
  const handleUpdateTour = (updatedTour: Tour) => {
    setTours(prev => prev.map(t => (t.id === updatedTour.id ? updatedTour : t)));
  };

  // Auto assign all clients to balanced tours and optimize routes
  const handleAutoAssignAllTours = () => {
    // Split 10 clients into 2 tours of 5 stops each
    const half = Math.ceil(clients.length / 2);
    const tour1Clients = clients.slice(0, half);
    const tour2Clients = clients.slice(half);

    const tour1Raw: Tour = {
      id: 'tour-1',
      name: 'Tour 1: Wetzlar Süd & Altstadt (Frühschicht)',
      shift: 'Früh',
      date: '2026-11-14',
      driverId: 'emp-2', // Tobias Müller (Examinierte Fachkraft)
      vehicle: 'Renault Zoe E-Tech (LDK-AC 102)',
      totalDistanceKm: 0,
      totalDurationMin: 0,
      status: 'unterwegs',
      stops: tour1Clients.map((c, idx) => ({
        id: `stop-1-${c.id}`,
        clientId: c.id,
        order: idx + 1,
        plannedArrival: '07:15',
        plannedDeparture: '07:55',
        status: idx === 0 ? 'completed' : idx === 1 ? 'in_progress' : 'pending',
        completedServices: idx === 0 ? c.sgbXI_Services : []
      }))
    };

    const tour2Raw: Tour = {
      id: 'tour-2',
      name: 'Tour 2: Wetzlar West & Lahnauen (Frühschicht)',
      shift: 'Früh',
      date: '2026-11-14',
      driverId: 'emp-4', // Mehmet Yilmaz
      vehicle: 'VW e-Up! (LDK-AC 104)',
      totalDistanceKm: 0,
      totalDurationMin: 0,
      status: 'unterwegs',
      stops: tour2Clients.map((c, idx) => ({
        id: `stop-2-${c.id}`,
        clientId: c.id,
        order: idx + 1,
        plannedArrival: '07:30',
        plannedDeparture: '08:05',
        status: idx === 0 ? 'completed' : 'pending',
        completedServices: idx === 0 ? c.sgbXI_Services : []
      }))
    };

    const opt1 = optimizeTourRoute(tour1Raw, clients, employees, 7, 15).optimizedTour;
    const opt2 = optimizeTourRoute(tour2Raw, clients, employees, 7, 30).optimizedTour;

    setTours([opt1, opt2]);
    confetti({ particleCount: 100, spread: 70 });
  };

  // Add / Update Handlers
  const handleAddEmployee = (emp: Employee) => setEmployees(prev => [...prev, emp]);
  const handleUpdateEmployee = (emp: Employee) =>
    setEmployees(prev => prev.map(e => (e.id === emp.id ? emp : e)));

  const handleAddClient = (client: Client) => setClients(prev => [...prev, client]);
  const handleUpdateClient = (client: Client) =>
    setClients(prev => prev.map(c => (c.id === client.id ? client : c)));

  const handleAddShift = (shift: Shift) => setShifts(prev => [...prev, shift]);
  const handleUpdateShift = (shift: Shift) =>
    setShifts(prev => prev.map(s => (s.id === shift.id ? shift : s)));

  const handleAddAbsence = (abs: Absence) => {
    setAbsences(prev => [...prev, abs]);
    // Also update employee status if sick
    if (abs.type === 'Krankheit') {
      setEmployees(prev =>
        prev.map(e => (e.id === abs.employeeId ? { ...e, status: 'sick' } : e))
      );
    }
  };
  const handleUpdateAbsence = (abs: Absence) =>
    setAbsences(prev => prev.map(a => (a.id === abs.id ? abs : a)));

  const handleUpdatePayroll = (rec: PayrollRecord) =>
    setPayroll(prev => prev.map(p => (p.id === rec.id ? rec : p)));

  // Counts for badges
  const activeToursCount = tours.filter(t => t.status === 'unterwegs').length;
  const pendingSickCount = absences.filter(a => a.type === 'Krankheit').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Main Navigation */}
      <Navbar
        currentMode={mode}
        onChangeMode={setMode}
        onResetData={handleResetData}
        activeToursCount={activeToursCount}
      />

      {/* Mode 1: Public Website (a-cura.de) */}
      {mode === 'website' ? (
        <main className="flex-1 p-6 sm:p-8">
          <PublicWebsiteView onSwitchToApp={() => setMode('app')} />
        </main>
      ) : (
        /* Mode 2: Care Management Back-Office OS */
        <div className="flex-1 flex">
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            pendingSickCount={pendingSickCount}
            activeToursCount={activeToursCount}
            totalClientsCount={clients.length}
          />

          <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
            {currentTab === 'dashboard' && (
              <DashboardView
                tours={tours}
                clients={clients}
                employees={employees}
                absences={absences}
                onNavigateTab={setCurrentTab}
                onOpenMobileCaregiver={handleOpenMobileCaregiver}
              />
            )}

            {currentTab === 'tours' && (
              <TourPlanningView
                tours={tours}
                clients={clients}
                employees={employees}
                onUpdateTour={handleUpdateTour}
                onOpenMobileCaregiver={handleOpenMobileCaregiver}
                onAutoAssignAllTours={handleAutoAssignAllTours}
              />
            )}

            {currentTab === 'caregiver' && (
              <CaregiverMobileView
                tours={tours}
                clients={clients}
                employees={employees}
                initialTourId={activeCaregiverTourId}
                onUpdateTour={handleUpdateTour}
              />
            )}

            {currentTab === 'clients' && (
              <ClientsView
                clients={clients}
                onAddClient={handleAddClient}
                onUpdateClient={handleUpdateClient}
              />
            )}

            {currentTab === 'roster' && (
              <RosterView
                employees={employees}
                shifts={shifts}
                onUpdateShift={handleUpdateShift}
                onAddShift={handleAddShift}
              />
            )}

            {currentTab === 'absence' && (
              <AbsenceView
                absences={absences}
                employees={employees}
                onAddAbsence={handleAddAbsence}
                onUpdateAbsence={handleUpdateAbsence}
              />
            )}

            {currentTab === 'employees' && (
              <EmployeesView
                employees={employees}
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdateEmployee}
              />
            )}

            {currentTab === 'payroll' && (
              <PayrollView
                payrollRecords={payroll}
                employees={employees}
                onUpdatePayroll={handleUpdatePayroll}
              />
            )}

            {currentTab === 'billing' && (
              <BillingView clients={clients} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
