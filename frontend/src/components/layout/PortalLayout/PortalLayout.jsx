import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { DemoFlowGuide } from '../../../demo/DemoFlowGuide';

// Previously wrapped <Outlet/> in framer-motion's AnimatePresence for a
// page fade-in transition, keyed by location.pathname. Under React 18
// StrictMode (which `npm run dev` runs), that combination intermittently
// remounted the destination page mid-interaction — including after a
// real navigation had already completed and the user started filling in
// a form, silently resetting it to empty state right as they submitted.
// A cosmetic transition causing silent form data loss isn't a trade worth
// making, and the interaction with StrictMode wasn't reliably fixable
// without real confidence in framer-motion's internals, so the animation
// is removed rather than patched around uncertainty.

export const PortalLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-spring ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <main className="flex-1 mt-14 p-gutter-mobile md:p-gutter-desktop pb-space-8 transition-all duration-300">
          <div className="max-w-max-width mx-auto w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <DemoFlowGuide />
    </div>
  );
};
