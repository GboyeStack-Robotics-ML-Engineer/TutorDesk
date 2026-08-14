import React from 'react';
import './Availability.css';

const Availability = () => {
  return (
    <div className="bg-background h-full w-full flex text-on-surface antialiased">
      <div className="flex flex-col md:flex-row w-full h-full max-w-7xl mx-auto md:p-space-6 md:gap-space-8">
        {/* Left Step Rail (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 h-full py-space-6 pl-space-4 pr-space-8 border-r border-paper-200">
          <div className="mb-space-8">
            <span className="font-display-md text-display-md font-bold text-primary">TutorDesk</span>
          </div>
          <nav aria-label="Progress" className="flex-1">
            <ol className="overflow-hidden" role="list">
              {/* Steps will be mapped here */}
            </ol>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full bg-paper-0 md:rounded-xl md:border border-paper-200 shadow-sm relative overflow-hidden">
          {/* Mobile Header (Only visible on small screens) */}
          <header className="md:hidden flex items-center justify-between p-space-4 border-b border-paper-200 bg-paper-0">
            <span className="font-display-md text-title-lg font-bold text-primary">TutorDesk</span>
            <span className="font-label text-label text-ink-500">Step 2 of 5</span>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-gutter-mobile md:p-space-8 pb-32">
            <div className="max-w-2xl mx-auto w-full">
              <div className="mb-space-8 text-center md:text-left">
                <h1 className="font-display-lg text-display-lg text-primary mb-2">Teaching Availability</h1>
                <p className="font-body text-body-lg text-ink-700">Define your standard weekly schedule. This helps students know when you are open for bookings.</p>
              </div>

              {/* Timezone Warning */}
              <div className="bg-surface-container-low rounded-lg p-space-4 mb-space-8 flex items-start gap-3 border border-paper-200">
                <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                <div>
                  <p className="font-label text-label font-bold text-on-surface">Timezone detected: West Africa Time (WAT)</p>
                  <p className="font-body text-body text-ink-700 mt-1">Your availability will be shown to students in their local time.</p>
                </div>
              </div>

              {/* Availability Grid */}
              <div className="space-y-space-4">
                {/* Day rows will be mapped here */}
              </div>

              <div className="mt-space-8 p-space-4 bg-paper-100 rounded-lg border border-paper-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-ink-700">coffee</span>
                  <h3 className="font-title-sm text-title-sm font-bold">Rest Periods</h3>
                </div>
                <p className="font-body text-body text-ink-700 mb-4">You can set specific buffer times between classes or block out lunch hours in your advanced settings later.</p>
              </div>
            </div>
          </div>

          {/* Persistent Footer */}
          <div className="absolute bottom-0 w-full bg-paper-0 border-t border-paper-200 p-space-4 md:px-space-8 flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <button className="font-label text-label font-bold text-ink-700 hover:text-primary flex items-center gap-1 px-4 py-2 rounded-md transition-colors hover:bg-surface-container-low" type="button">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
            </button>
            <div className="flex items-center gap-space-3">
              <button className="font-label text-label font-bold text-ink-500 hover:text-ink-700 hidden sm:block px-4 py-2" type="button">
                Skip for now
              </button>
              <button className="bg-primary hover:bg-primary-container text-on-primary font-label text-label font-bold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2 shadow-sm" type="button">
                Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Availability;
