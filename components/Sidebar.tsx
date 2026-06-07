'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart2, List, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/recruiting', label: 'Recruiting', icon: Users },
  { href: '/roster', label: 'Roster & Stats', icon: BarChart2 },
  { href: '/depth-chart', label: 'Depth Chart', icon: List },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-cu-gold text-black p-2 rounded-md"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-cu-black border-r border-cu-gold/20 z-40
          transform transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 border-b border-cu-gold/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cu-gold flex items-center justify-center font-black text-black text-xl">
              CU
            </div>
            <div>
              <div className="font-black text-cu-gold text-sm leading-tight">COLORADO</div>
              <div className="font-bold text-white text-xs leading-tight">BUFFALOES FOOTBALL</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${active
                    ? 'bg-cu-gold text-black font-bold'
                    : 'text-gray-400 hover:bg-cu-gold/10 hover:text-white'
                  }
                `}
              >
                <Icon size={18} className={active ? 'text-black' : 'text-cu-gold group-hover:text-cu-gold'} />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="text-xs text-gray-600 text-center">
            Powered by ESPN API
          </div>
        </div>
      </aside>
    </>
  );
}
