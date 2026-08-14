import React from 'react';

export const OnboardingAvailabilitySetup = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-gutter-mobile md:p-space-8 pb-32">
<div className="max-w-2xl mx-auto w-full">
<div className="mb-space-8 text-center md:text-left">
<h1 className="font-display-lg text-display-lg text-primary mb-2">Teaching Availability</h1>
<p className="font-body text-body-lg text-ink-700">Define your standard weekly schedule. This helps students know when you are open for bookings.</p>
</div>

<div className="bg-surface-container-low rounded-lg p-space-4 mb-space-8 flex items-start gap-3 border border-paper-200">
<span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
<div>
<p className="font-label text-label font-bold text-on-surface">Timezone detected: West Africa Time (WAT)</p>
<p className="font-body text-body text-ink-700 mt-1">Your availability will be shown to students in their local time.</p>
</div>
</div>

<div className="space-y-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col sm:flex-row sm:items-center gap-space-4 transition-colors hover:border-paper-300">
<div className="w-32 flex items-center gap-3">
<input checked="" className="rounded border-paper-300 text-primary focus:ring-primary h-5 w-5 bg-paper-0 cursor-pointer" type="checkbox" />
<span className="font-title-sm text-title-sm font-semibold text-on-surface">Monday</span>
</div>
<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-space-2">
<div className="relative">
<label className="sr-only">Start Time</label>
<select className="block w-full rounded-md border-paper-300 py-2 pl-3 pr-10 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body text-body bg-paper-0">
<option>09:00 AM</option>
<option>10:00 AM</option>
</select>
</div>
<div className="relative flex items-center gap-2">
<span className="text-ink-500">-</span>
<label className="sr-only">End Time</label>
<select className="block w-full rounded-md border-paper-300 py-2 pl-3 pr-10 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body text-body bg-paper-0">
<option>05:00 PM</option>
<option>06:00 PM</option>
</select>
<button className="text-ink-500 hover:text-danger-solid p-1 rounded-md hover:bg-danger-tint/50 transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>
<button className="text-primary hover:text-primary-container font-label text-label flex items-center gap-1 shrink-0 mt-2 sm:mt-0">
<span className="material-symbols-outlined text-[18px]">add</span> Add hours
                            </button>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col sm:flex-row sm:items-center gap-space-4 transition-colors hover:border-paper-300">
<div className="w-32 flex items-center gap-3">
<input checked="" className="rounded border-paper-300 text-primary focus:ring-primary h-5 w-5 bg-paper-0 cursor-pointer" type="checkbox" />
<span className="font-title-sm text-title-sm font-semibold text-on-surface">Tuesday</span>
</div>
<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-space-2">
<div className="relative">
<select className="block w-full rounded-md border-paper-300 py-2 pl-3 pr-10 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body text-body bg-paper-0">
<option>09:00 AM</option>
</select>
</div>
<div className="relative flex items-center gap-2">
<span className="text-ink-500">-</span>
<select className="block w-full rounded-md border-paper-300 py-2 pl-3 pr-10 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body text-body bg-paper-0">
<option>05:00 PM</option>
</select>
<button className="text-ink-500 hover:text-danger-solid p-1 rounded-md hover:bg-danger-tint/50 transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>
<button className="text-primary hover:text-primary-container font-label text-label flex items-center gap-1 shrink-0 mt-2 sm:mt-0">
<span className="material-symbols-outlined text-[18px]">add</span> Add hours
                            </button>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 flex items-center gap-space-4 opacity-75">
<div className="w-32 flex items-center gap-3">
<input className="rounded border-paper-300 text-primary focus:ring-primary h-5 w-5 bg-paper-0 cursor-pointer" type="checkbox" />
<span className="font-title-sm text-title-sm font-semibold text-ink-700">Wednesday</span>
</div>
<div className="flex-1 text-ink-500 font-body text-body">
                                Unavailable
                            </div>
</div>
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

    </>
  );
};
