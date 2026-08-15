import React from 'react';

export const Features = () => (
  <section id="features" className="bg-[#FAF9F5] py-24 border-t border-paper-200/60">
    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#095D51] mb-4 tracking-tight"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Built for resilience. Designed for focus.
      </h2>
      <p className="text-ink-600 max-w-2xl mx-auto">
        Everything you need to run your tutoring business smoothly, even when connectivity drops.
      </p>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
      {/* Feature 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined">account_balance</span>
        </div>
        <h3 className="text-xl font-bold text-[#095D51] mb-3">Get paid, stop chasing</h3>
        <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
          Automated Nigerian bank transfer reconciliation and WhatsApp payment reminders. Focus on teaching, not tracking down fees.
        </p>
        {/* Mock element */}
        <div className="bg-[#FAF9F5] border border-paper-200 rounded-lg p-4 mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-ink-500 font-medium">Invoice #102</span>
            <span className="text-[10px] bg-success-tint text-success-solid px-2 py-1 rounded-full font-bold">
              &#9679; Recorded
            </span>
          </div>
          <div className="text-lg font-bold text-ink-900">&#8358; 15,000</div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
        <div className="w-12 h-12 bg-[#C48037]/10 text-[#C48037] rounded-xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h3 className="text-xl font-bold text-[#095D51] mb-3">The student is the atom</h3>
        <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
          Centralized student records with progress tracking, attendance history, and early-warning flags for struggling learners.
        </p>
        {/* Mock element */}
        <div className="bg-[#FAF9F5] border border-paper-200 rounded-lg p-4 mt-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#095D51] text-white flex items-center justify-center font-bold text-xs">
            AO
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-ink-900 mb-1">Adeola O.</div>
            <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#095D51] w-[78%] h-full rounded-full"></div>
            </div>
            <div className="text-[10px] text-ink-500 mt-1 text-right">78% Mastery</div>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
        <div className="w-12 h-12 bg-ink-200 text-ink-700 rounded-xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined">wifi_off</span>
        </div>
        <h3 className="text-xl font-bold text-[#095D51] mb-3">Resilient by design</h3>
        <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
          Built for intermittent connectivity. Works entirely offline and survives power cuts with continuous, seamless autosave.
        </p>
        {/* Mock element */}
        <div className="bg-error-tint/50 border border-error-tint rounded-lg p-3 mt-auto text-center">
          <span className="text-xs font-medium text-error-solid flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[14px]">cloud_off</span>
            Working Offline - Changes saved locally
          </span>
        </div>
      </div>
    </div>
  </section>
);
