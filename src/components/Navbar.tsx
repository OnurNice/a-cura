import React from 'react';
import {
  HeartHandshake,
  Globe,
  LayoutDashboard,
  RotateCcw,
  Bell,
  Search,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentMode: 'app' | 'website';
  onChangeMode: (mode: 'app' | 'website') => void;
  onResetData: () => void;
  activeToursCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onChangeMode,
  onResetData,
  activeToursCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  A-CURA<span className="text-brand-600">.de</span>
                </span>
                <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-brand-200/60">
                  Ambulant OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Mobile Altenpflege • Stützpunkt Wetzlar & Lahn-Dill
              </p>
            </div>
          </div>

          {/* Mode Switcher: Software vs. Öffentliche Website */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onChangeMode('app')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentMode === 'app'
                  ? 'bg-white text-slate-900 shadow-xs font-bold text-brand-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-600" />
              <span>Pflegemanagement</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
            <button
              onClick={() => onChangeMode('website')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentMode === 'website'
                  ? 'bg-white text-slate-900 shadow-xs font-bold text-blue-700'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>a-cura.de Website</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                Live
              </span>
            </button>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Möchten Sie alle Daten auf die Wetzlar-Standard-Demodaten zurücksetzen?')) {
                  onResetData();
                }
              }}
              title="Demodaten neu laden"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Demodaten</span>
            </button>

            {/* Quick status pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{activeToursCount} Touren aktiv</span>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Sabrina Keller"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">Sabrina Keller</div>
                <div className="text-[10px] text-slate-500 font-medium">PDL • Pflegedienstleitung</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
