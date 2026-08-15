import React from 'react';
import { Link } from 'react-router-dom';

export const SiteNav = () => (
  <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-paper-200/70">
    <div className="flex items-center justify-between gap-6 px-6 py-4 max-w-7xl mx-auto">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <img src="/logo.png" alt="TutorDesk Logo" className="h-8 object-contain" />
      </Link>

      <div className="hidden md:flex items-center gap-8 text-ink-700 font-medium text-sm">
        <a
          href="#top"
          className="relative text-[#095D51] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#095D51]"
        >
          Home
        </a>
        <a href="#offer" className="hover:text-[#095D51] transition-colors">What we offer</a>
        <a href="#pricing" className="hover:text-[#095D51] transition-colors">Pricing</a>
        <a href="#features" className="hover:text-[#095D51] transition-colors">Features</a>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Link to="/login" className="text-ink-700 font-medium hover:text-[#095D51] transition-colors text-sm">
          Log in
        </Link>
        <Link
          to="/signup"
          className="group bg-[#C48037] hover:bg-[#B3702B] text-white pl-4 pr-3 sm:pl-5 sm:pr-4 py-2.5 rounded-full font-medium transition-colors text-sm shadow-sm flex items-center gap-1.5 whitespace-nowrap"
        >
          Get started
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  </nav>
);
