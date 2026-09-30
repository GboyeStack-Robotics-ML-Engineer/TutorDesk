import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Deliberately not PortalLayout: parents/students never see the tutor's
// sidebar (Students, Classes, Invoices to send, etc.) — that's tutor-only
// nav for tutor-only data. Just a header with who's signed in, a way out,
// and a simple tab row so the other 3 parent pages are actually reachable
// (nothing else links to them — login lands on /parent/home only).
const TABS = [
  { to: '/parent/home', label: 'Home' },
  { to: '/parent/progress-reports', label: 'Progress' },
  { to: '/parent/contact-tutor', label: 'Contact Tutor' },
  { to: '/parent/payments-invoices', label: 'Payments' },
];

export const ParentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login/parent', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 border-b border-paper-200 bg-paper-0 flex items-center justify-between px-gutter-mobile md:px-gutter-desktop shrink-0">
        <span className="font-title-sm text-title-sm text-primary">TutorDesk</span>
        <div className="flex items-center gap-space-4">
          {user?.name && (
            <span className="font-label text-label text-ink-700 hidden sm:inline">{user.name}</span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 font-label text-label text-ink-500 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Log out
          </button>
        </div>
      </header>
      <nav className="border-b border-paper-200 bg-paper-0 px-gutter-mobile md:px-gutter-desktop overflow-x-auto">
        <div className="max-w-max-width mx-auto w-full flex gap-space-6">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `py-space-3 font-label text-label whitespace-nowrap border-b-2 transition-colors ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-ink-500 hover:text-ink-900'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="flex-1 p-gutter-mobile md:p-gutter-desktop">
        <div className="max-w-max-width mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
