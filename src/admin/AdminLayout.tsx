import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Activity, BookOpen, CalendarDays, ContactRound, LayoutDashboard, LogOut, Menu, Settings, Star, X } from 'lucide-react';

import { adminApi, type AdminUser } from './api/client';

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Leads', icon: ContactRound },
  { to: '/admin/contacts', label: 'Contacts', icon: ContactRound },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/admin/analytics', label: 'Analytics', icon: Activity },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/content', label: 'Content', icon: BookOpen },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    adminApi.current()
      .then(({ admin: current }) => { if (active) setAdmin(current); })
      .catch(() => { if (active) navigate('/admin/login', { replace: true }); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [navigate]);

  const logout = async () => {
    try { await adminApi.logout(); } finally { navigate('/admin/login', { replace: true }); }
  };

  if (loading || !admin) {
    return <main className="grid min-h-screen place-items-center bg-[#F5F5F2] text-sm text-neutral-600">Loading workspace…</main>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className={`${menuOpen ? 'block' : 'hidden'} fixed inset-0 z-40 bg-[#0A0A0A] p-6 text-white lg:sticky lg:top-0 lg:block lg:h-screen`}>
        <div className="flex items-center justify-between">
          <NavLink to="/admin" className="font-display text-2xl">NOVARIYAN</NavLink>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 lg:hidden"><X size={20} /></button>
        </div>
        <p className="mt-2 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-white/45">Studio workspace</p>
        <nav aria-label="Admin navigation" className="mt-10 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex min-h-11 items-center gap-3 px-3 text-sm transition-colors ${isActive ? 'bg-white text-[#0A0A0A]' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={17} aria-hidden="true" />{label}
            </NavLink>
          ))}
        </nav>
        <button type="button" onClick={logout} className="absolute bottom-6 left-6 flex min-h-10 items-center gap-2 text-sm text-white/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <LogOut size={16} aria-hidden="true" /> Sign out
        </button>
      </aside>
      <div className="min-w-0">
        <header className="flex min-h-16 items-center justify-between border-b border-black/10 bg-white px-5 sm:px-8">
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open admin navigation" className="p-2 lg:hidden"><Menu size={20} /></button>
          <span className="font-mono-tech text-xs uppercase tracking-wider text-neutral-500">NOVARIYAN / ADMIN</span>
          <span className="text-sm">{admin.name}</span>
        </header>
        <main className="mx-auto w-full max-w-[1440px] p-5 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
};