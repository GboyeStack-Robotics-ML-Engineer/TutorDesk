import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { DemoFlowGuide } from '../../../demo/DemoFlowGuide';

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 8,
    filter: 'blur(2px)',
  },
  enter: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.35, 
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: -4,
    filter: 'blur(1px)',
    transition: { 
      duration: 0.2, 
      ease: [0.4, 0, 1, 1],
    }
  },
};

export const PortalLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

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
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <DemoFlowGuide />
    </div>
  );
};
