import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: 'space_dashboard', label: 'Home', path: '/portal/view/setup-checklist-home-variant' },
  { icon: 'groups', label: 'Students', path: '/portal/view/flagged-students-directory-view' },
  { icon: 'calendar_month', label: 'Schedule', path: '/portal/schedule' },
  { icon: 'video_camera_front', label: 'Classroom', path: '/portal/view/live-classroom-desktop' },
  { icon: 'add_link', label: 'Class links', path: '/portal/view/meeting-generator' },
  { icon: 'receipt_long', label: 'Invoices', path: '/portal/view/invoice-maker' },
  { icon: 'quiz', label: 'Quizzes', path: '/portal/view/quiz-maker' },
  { icon: 'folder_open', label: 'Materials', path: '/portal/view/google-embed' },
];

export const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <nav className={`fixed left-0 top-0 h-screen bg-primary text-on-primary py-5 z-40 transition-all duration-300 ease-spring flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Brand / Logo Area */}
      <div className={`px-space-5 mb-space-6 flex items-center gap-space-3 ${isCollapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden shrink-0">
          <img alt="TutorDesk Logo" className="w-full h-full object-contain" src="/logo_white.png" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-[17px] font-bold text-on-primary tracking-tight truncate leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>TutorDesk</h1>
            <p className="text-[10.5px] text-primary-fixed-dim tracking-wide uppercase font-medium opacity-70">Academic Workspace</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-space-3 flex flex-col gap-space-0.5 no-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-space-3 px-space-3 py-2 rounded-lg font-medium transition-all duration-200 group relative
                ${isActive 
                  ? 'text-on-primary bg-on-primary/12 font-semibold' 
                  : 'text-on-primary/60 hover:text-on-primary hover:bg-on-primary/6'}
                ${isCollapsed ? 'justify-center px-0 mx-2' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-secondary-fixed rounded-r-full"></span>}
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" : undefined }}>{item.icon}</span>
              {!isCollapsed && <span className="text-[12.5px] tracking-wide whitespace-nowrap">{item.label}</span>}
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mx-space-4 my-space-2 border-t border-on-primary/10"></div>

      {/* Bottom Actions */}
      <div className="px-space-3 flex flex-col gap-space-0.5">
        <Link 
          to="/portal/view/settings-hub-desktop"
          className={`flex items-center gap-space-3 px-space-3 py-2 rounded-lg text-on-primary/60 font-medium hover:text-on-primary hover:bg-on-primary/6 transition-all duration-200 ${isCollapsed ? 'justify-center px-0 mx-2' : ''}`}
          title={isCollapsed ? "Settings" : undefined}
        >
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
          {!isCollapsed && <span className="text-[12.5px] tracking-wide">Settings</span>}
        </Link>
        <button 
          className={`flex items-center gap-space-3 px-space-3 py-2 rounded-lg text-on-primary/60 font-medium hover:text-on-primary hover:bg-on-primary/6 transition-all duration-200 w-full text-left ${isCollapsed ? 'justify-center px-0 mx-2' : ''}`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <span aria-hidden="true" className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          {!isCollapsed && <span className="text-[12.5px] tracking-wide">Logout</span>}
        </button>
      </div>
    </nav>
  );
};
