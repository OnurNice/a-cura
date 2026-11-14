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
  PhoneCall,
  Sparkles,
  ChevronRight,
  ShieldCheck,
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
  pendingSickCount,
  activeToursCount,
  totalClientsCount
}) => {
  const menuItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Cockpit & Leitstand',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'tours' as NavTab,
      label: 'Touren & KI-Routen',
      icon: Navigation,
      badge: `${activeToursCount} aktiv`,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'caregiver' as NavTab,
      label: 'Pfleger-App (Mobil)',
      icon: Smartphone,
      badge: 'Live',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'clients' as NavTab,
      label: 'Klienten & Pflegeakten',
      icon: Users,
      badge: `${totalClientsCount}`,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    {
      id: 'roster' as NavTab,
      label: 'Dienstplan & Schichten',
      icon: CalendarDays,
      badge: null
    },
    {
      id: 'absence' as NavTab,
      label: 'Urlaub & Krankheit',
      icon: CalendarOff,
      badge: pendingSickCount > 0 ? `${pendingSickCount} AU` : null,
      badgeColor: 'bg-rose-100 text-rose-800 font-bold'
    },
    {
      id: 'employees' as NavTab,
      label: 'Mitarbeiter & Fuhrpark',
      icon: UserCheck,
      badge: null
    },
    {
      id: 'payroll' as NavTab,
      label: 'Lohnbuchhaltung',
      icon: ReceiptEuro,
      badge: 'DATEV',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'billing' as NavTab,
      label: 'SGB Abrechnung',
      icon: FileCheck2,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4">
      <div className="space-y-6">
        {/* Navigation list */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Pflege-Verwaltung
          </div>
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-brand-600 stroke-[2.4]' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badgeColor || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Location Dispatch Info */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-3.5 rounded-xl shadow-sm border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-brand-400" />
            <div className="text-xs font-bold">Stützpunkt Wetzlar</div>
          </div>
          <p className="text-[11px] text-slate-300 mb-3">
            Philosophenweg 14, 35578 Wetzlar
          </p>
          <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              24h Rufbereitschaft
            </span>
            <span className="font-mono text-slate-300">06441 / 982</span>
          </div>
        </div>
      </div>

      {/* Bottom SaaS License Info */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            A-Cura Care OS v2.4
          </span>
          <span className="font-semibold text-slate-700">DSGVO §9</span>
        </div>
        <div className="text-[10px] text-slate-400">
          Lizenz: Ambulanter Pflegedienst Wetzlar
        </div>
      </div>
    </aside>
  );
};
