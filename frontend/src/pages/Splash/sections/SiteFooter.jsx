import React from 'react';
import { Link } from 'react-router-dom';

export const SiteFooter = () => (
  <footer className="bg-[#FAF9F5] border-t border-paper-200 py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="TutorDesk Logo"
            className="w-6 h-6 rounded-md"
            style={{ filter: 'grayscale(1) invert(1) brightness(1.5)', mixBlendMode: 'screen', backgroundColor: '#095D51' }}
          />
          <span className="font-bold text-[#095D51] tracking-tight">TutorDesk</span>
        </div>
        <p className="text-xs text-ink-500">Academic Operations. Order out of scatter.</p>
      </div>

      <div className="flex gap-6 text-xs text-ink-600 font-medium">
        <a href="#offer" className="hover:text-primary transition-colors">What we offer</a>
        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        <a href="#" className="hover:text-primary transition-colors">Support</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-xs font-medium border border-paper-300 px-4 py-1.5 rounded bg-white hover:bg-paper-50 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[14px]">login</span> Log In
        </Link>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-8 text-center md:text-left text-[10px] text-ink-400">
      &copy; {new Date().getFullYear()} TutorDesk. All rights reserved.
    </div>
  </footer>
);
