import React from 'react';
import { HeartHandshake, RotateCcw } from 'lucide-react';

interface NavbarProps {
  currentMode: 'app' | 'website';
  onChangeMode: (mode: 'app' | 'website') => void;
  onResetData: () => void;
  activeToursCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onChangeMode,
  onResetData
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & CI */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-sm">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  A-CURA<span className="text-brand-600">.de</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Wetzlar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Ambulanter Betreuungs- & Pflegedienst
              </p>
            </div>
          </div>

          {/* Clean Segmented Mode Control (Quiet, no loud buttons) */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onChangeMode('app')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentMode === 'app'
                  ? 'bg-white text-brand-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Betriebssystem
            </button>
            <button
              onClick={() => onChangeMode('website')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentMode === 'website'
                  ? 'bg-white text-brand-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Webseite
            </button>
          </nav>

          {/* Profile & Quiet Reset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm('Möchten Sie die Demodaten für Wetzlar neu laden?')) {
                  onResetData();
                }
              }}
              title="Demodaten zurücksetzen"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Mehtap Sarac"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Mehtap Sarac</div>
                <div className="text-[10px] text-slate-500">Inhaberin & Leitung</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
