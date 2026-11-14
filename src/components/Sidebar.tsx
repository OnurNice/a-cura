import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  Smartphone,
  Users,
  CalendarDays,
  CalendarOff,
  UserCheck,
  ReceiptEuro,
  FileCheck2,
  MapPin
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'tours'
  | 'caregiver'
  | 'clients'
  | 'roster'
  | 'absence'
  | 'employees'
  | 'payroll'
  | 'billing';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingSickCount: number;
  activeToursCount: number;
  totalClientsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingSickCount
}) => {
  const menuItems = [
    { id: 'dashboard' as NavTab, label: 'Leitstand', icon: LayoutDashboard },
    { id: 'tours' as NavTab, label: 'Touren & KI-Routen', icon: Navigation },
    { id: 'caregiver' as NavTab, label: 'Pfleger-App (Mobil)', icon: Smartphone },
    { id: 'clients' as NavTab, label: 'Klienten & Akten', icon: Users },
    { id: 'roster' as NavTab, label: 'Dienstplan', icon: CalendarDays },
    {
      id: 'absence' as NavTab,
      label: 'Urlaub & Krankheit',
      icon: CalendarOff,
      badge: pendingSickCount > 0 ? `${pendingSickCount} AU` : null
    },
    { id: 'employees' as NavTab, label: 'Mitarbeiter & KFZ', icon: UserCheck },
    { id: 'payroll' as NavTab, label: 'Lohnbuchhaltung', icon: ReceiptEuro },
    { id: 'billing' as NavTab, label: 'Kassenabrechnung', icon: FileCheck2 }
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-3.5">
      <div>
        <nav className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-800 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-brand-700' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Subtle Stützpunkt Info */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          <span>A-Cura Wetzlar</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Ostendstraße 10, Naunheim
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          06441 / 7869627
        </div>
      </div>
    </aside>
  );
};
