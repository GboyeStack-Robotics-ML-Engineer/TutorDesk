import React from 'react';

export const ParentPortalHome = () => {
  return (
    <>
      

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 md:gap-space-6">

<section className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)] flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-space-4">
<h2 className="font-title-lg text-title-lg text-primary">Next Session</h2>
<span className="bg-warning-tint text-warning-solid px-space-3 py-space-1 rounded-full font-label text-label flex items-center gap-space-2">
<span className="w-2 h-2 rounded-full bg-warning-solid animate-pulse"></span>
                            Starting Soon
                        </span>
</div>
<div className="mb-space-6">
<h3 className="font-title-md text-title-md text-on-surface mb-space-2">Advanced Mathematics - Calculus Intro</h3>
<div className="flex flex-col gap-space-2 text-ink-700 font-body-lg text-body-lg">
<div className="flex items-center gap-space-2">
<span className="material-symbols-outlined text-ink-500">calendar_today</span>
                                Today, 4:00 PM - 5:30 PM
                            </div>
<div className="flex items-center gap-space-2">
<span className="material-symbols-outlined text-ink-500">video_camera_front</span>
                                Online via Zoom
                            </div>
</div>
</div>
</div>
<div className="flex gap-space-4 mt-auto">
<button className="flex-1 bg-warning-solid text-on-primary py-space-3 rounded-DEFAULT font-title-sm text-title-sm hover:bg-opacity-90 transition-opacity">
                        Join Class Now
                    </button>
<button className="bg-paper-0 text-primary border border-primary px-space-4 py-space-3 rounded-DEFAULT font-title-sm text-title-sm hover:bg-surface-container-low transition-colors">
                        Reschedule
                    </button>
</div>
</section>

<section className="md:col-span-4 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)] flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-2 mb-space-4 text-ink-500">
<span className="material-symbols-outlined">payments</span>
<h2 className="font-label text-label uppercase tracking-wider">Current Balance</h2>
</div>
<div className="mb-space-6">
<div className="font-display-md text-display-md text-danger-solid font-bold mb-space-1">
                            ₦ 45,000
                        </div>
<p className="font-body text-body text-ink-500">Due by October 5th</p>
</div>
</div>
<div className="space-y-space-3">
<button className="w-full bg-primary text-on-primary py-space-2 rounded-DEFAULT font-label text-label hover:bg-primary-container transition-colors">
                        Make Payment
                    </button>
<button className="w-full bg-surface-container-low text-primary py-space-2 rounded-DEFAULT font-label text-label hover:bg-surface-container-highest transition-colors">
                        View Invoices
                    </button>
</div>
</section>

<section className="md:col-span-12 bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_-2px_rgba(22,33,30,0.06)]">
<div className="flex justify-between items-center mb-space-6">
<div className="flex items-center gap-space-2">
<span className="material-symbols-outlined text-primary">assessment</span>
<h2 className="font-title-lg text-title-lg text-on-surface">September Progress Report</h2>
</div>
<button className="text-primary hover:text-primary-container font-label text-label flex items-center gap-space-1">
                        View Full Report
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-6">

<div className="p-space-4 bg-surface-container-lowest border border-paper-200 rounded-DEFAULT">
<div className="font-label text-label text-ink-500 mb-space-2">Attendance</div>
<div className="font-title-lg text-title-lg text-success-solid mb-space-1">100%</div>
<div className="font-caption text-caption text-ink-500">8 of 8 sessions attended</div>
</div>

<div className="p-space-4 bg-surface-container-lowest border border-paper-200 rounded-DEFAULT">
<div className="font-label text-label text-ink-500 mb-space-2">Assignments</div>
<div className="font-title-lg text-title-lg text-primary mb-space-1">92%</div>
<div className="font-caption text-caption text-ink-500">Average score this month</div>
</div>

<div className="p-space-4 bg-surface-container-low rounded-DEFAULT md:col-span-1">
<div className="font-label text-label text-ink-700 mb-space-2 flex items-center gap-space-1">
<span className="material-symbols-outlined text-[16px]">edit_note</span>
                            Tutor's Note
                        </div>
<p className="font-body-lg text-body-lg text-ink-900 line-clamp-3 italic">
                            "Aisha has shown excellent improvement in solving quadratic equations. Next month we will focus on introductory calculus concepts to prepare for her mid-terms."
                        </p>
</div>
</div>
</section>
</div>

    </>
  );
};
