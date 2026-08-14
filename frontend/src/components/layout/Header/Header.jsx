import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header className={`fixed top-0 right-0 h-14 glass-header border-b border-paper-200/60 flex items-center justify-between px-gutter-desktop z-30 transition-all duration-300 ease-spring ${isCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'}`}>
      
      <div className="flex items-center gap-space-3">
        <button 
          onClick={toggleSidebar}
          className="p-space-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all duration-200 cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            {isCollapsed ? 'menu_open' : 'menu'}
          </span>
        </button>
        
        <div className="flex items-center gap-space-2 text-on-surface-variant font-label text-label hidden sm:flex">
          <Link className="hover:text-primary transition-colors" to="#">Dashboard</Link>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
          <span className="text-primary font-semibold">Current View</span>
        </div>
        
        <h2 className="font-title-sm text-title-sm text-primary sm:hidden">TutorDesk</h2>
      </div>

      <div className="flex items-center gap-space-3">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-space-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '18px' }}>search</span>
          <input 
            className="pl-9 pr-space-4 py-1.5 rounded-full border border-paper-200 bg-surface-container-low/60 text-body font-body text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/8 w-56 transition-all placeholder:text-ink-500 text-[12.5px]" 
            placeholder="Search everywhere..." 
            type="text" 
          />
        </div>
        <button aria-label="Notifications" className="p-1.5 text-on-surface-variant hover:bg-surface-container-high hover:text-primary rounded-full transition-all duration-200 relative">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger-solid rounded-full border border-surface animate-pulse-soft"></span>
        </button>
        <button aria-label="Search" className="p-1.5 text-on-surface-variant hover:bg-surface-container-high hover:text-primary rounded-full transition-all duration-200 md:hidden">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
        </button>
      </div>
    </header>
  );
};
