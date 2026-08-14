import React from 'react';

export const PortalProgressReports = () => {
  return (
    <>
      



<div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 md:gap-space-6">

<div className="md:col-span-4 flex flex-col gap-space-4 md:gap-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5 hover:border-primary-fixed-dim transition-colors">
<div className="flex justify-between items-start mb-space-4">
<span className="font-label text-label text-ink-500 uppercase tracking-wider">Attendance</span>
<div className="bg-success-tint text-success-solid p-2 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-[20px] fill">check_circle</span>
</div>
</div>
<div className="flex items-baseline gap-space-2">
<span className="font-display-lg text-display-lg text-on-background">94%</span>
</div>
<div className="w-full bg-surface-variant h-2 rounded-full mt-space-4 overflow-hidden">
<div className="bg-success-solid h-full rounded-full" style={{"width":"94%"}}></div>
</div>
<p className="font-caption text-caption text-ink-500 mt-space-2 text-right">Excellent standing</p>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5 hover:border-primary-fixed-dim transition-colors">
<div className="flex justify-between items-start mb-space-4">
<span className="font-label text-label text-ink-500 uppercase tracking-wider">Avg. Score</span>
<div className="bg-tertiary-fixed text-tertiary p-2 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-[20px] fill">school</span>
</div>
</div>
<div className="flex items-baseline gap-space-2">
<span className="font-display-lg text-display-lg text-on-background">88</span>
<span className="font-body text-body text-ink-500">/100</span>
</div>
<div className="flex items-center gap-space-1 mt-space-4 text-success-solid">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-caption text-caption">+4% from last month</span>
</div>
</div>
</div>

<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5 flex flex-col relative overflow-hidden">
<div className="flex justify-between items-center mb-space-6 relative z-10">
<h2 className="font-title-md text-title-md text-on-background">Academic Progress</h2>
<select className="bg-surface-container-low border border-paper-200 text-ink-700 font-label text-label rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none">
<option>Last 6 Months</option>
<option>This Year</option>
</select>
</div>

<div className="flex-1 flex items-end justify-between gap-2 pt-8 relative z-10 h-48">

<div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-ink-500 font-caption text-caption opacity-60">
<span>100</span>
<span>80</span>
<span>60</span>
</div>

<div className="absolute inset-0 top-8 bottom-8 left-6 border-b border-paper-200">
<div className="absolute w-full h-[1px] bg-paper-200 top-0 opacity-50"></div>
<div className="absolute w-full h-[1px] bg-paper-200 top-1/2 opacity-50 transform -translate-y-1/2"></div>
</div>

<div className="flex flex-col items-center gap-2 z-10 ml-8 group">
<div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim border-2 border-paper-0 shadow-sm relative transition-transform group-hover:scale-125 group-hover:bg-primary-container group-hover:z-20 cursor-pointer" style={{"marginBottom":"80px"}}>
<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-caption text-caption px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">78%</div>
</div>
<span className="font-caption text-caption text-ink-500">Sep</span>
</div>
<div className="flex flex-col items-center gap-2 z-10 group">
<div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim border-2 border-paper-0 shadow-sm relative transition-transform group-hover:scale-125 group-hover:bg-primary-container group-hover:z-20 cursor-pointer" style={{"marginBottom":"95px"}}>
<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-caption text-caption px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">82%</div>
</div>
<span className="font-caption text-caption text-ink-500">Oct</span>
</div>
<div className="flex flex-col items-center gap-2 z-10 group">
<div className="w-3 h-3 rounded-full bg-tertiary-fixed border-2 border-paper-0 shadow-sm relative transition-transform group-hover:scale-125 group-hover:bg-primary-container group-hover:z-20 cursor-pointer" style={{"marginBottom":"90px"}}>
<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-caption text-caption px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">80%</div>
</div>
<span className="font-caption text-caption text-ink-500">Nov</span>
</div>
<div className="flex flex-col items-center gap-2 z-10 group">
<div className="w-3 h-3 rounded-full bg-primary-fixed-dim border-2 border-paper-0 shadow-sm relative transition-transform group-hover:scale-125 group-hover:bg-primary-container group-hover:z-20 cursor-pointer" style={{"marginBottom":"110px"}}>
<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-caption text-caption px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">85%</div>
</div>
<span className="font-caption text-caption text-ink-500">Dec</span>
</div>
<div className="flex flex-col items-center gap-2 z-10 group">
<div className="w-3 h-3 rounded-full bg-primary-container border-2 border-paper-0 shadow-sm relative transition-transform group-hover:scale-125 group-hover:bg-primary-container group-hover:z-20 cursor-pointer" style={{"marginBottom":"125px"}}>
<div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-caption text-caption px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">88%</div>
</div>
<span className="font-caption text-caption text-ink-500">Jan</span>
</div>
</div>

<div className="absolute bottom-8 left-6 right-0 h-32 bg-gradient-to-t from-primary-fixed/10 to-transparent opacity-50 z-0 pointer-events-none"></div>
</div>

<div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-space-4 md:gap-space-6 mt-space-2">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm shadow-[#16211E]/5">
<div className="flex justify-between items-center mb-space-4">
<h2 className="font-title-md text-title-md text-on-background">Monthly Reports</h2>
<button aria-label="View all reports" className="text-primary hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-low">
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
<ul className="flex flex-col gap-space-3">
<li className="flex items-center justify-between p-3 rounded-lg border border-paper-200 hover:bg-surface-container-low transition-colors group cursor-pointer">
<div className="flex items-center gap-space-3">
<div className="bg-surface-variant text-ink-700 p-2 rounded-md">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</div>
<div>
<p className="font-title-sm text-title-sm text-on-background">January Progress</p>
<p className="font-caption text-caption text-ink-500">Math &amp; Science • 2.4 MB</p>
</div>
</div>
<button aria-label="Download January Report" className="text-ink-500 group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">download</span>
</button>
</li>
<li className="flex items-center justify-between p-3 rounded-lg border border-paper-200 hover:bg-surface-container-low transition-colors group cursor-pointer">
<div className="flex items-center gap-space-3">
<div className="bg-surface-variant text-ink-700 p-2 rounded-md">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</div>
<div>
<p className="font-title-sm text-title-sm text-on-background">December Review</p>
<p className="font-caption text-caption text-ink-500">End of Term • 3.1 MB</p>
</div>
</div>
<button aria-label="Download December Report" className="text-ink-500 group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">download</span>
</button>
</li>
</ul>
</div>

<div className="bg-primary-container border border-primary-fixed-dim rounded-xl p-space-6 shadow-sm shadow-[#16211E]/10 relative overflow-hidden">

<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
<div className="relative z-10">
<div className="flex items-center gap-space-2 mb-space-4 text-on-primary-container">
<span className="material-symbols-outlined text-[20px]">edit_note</span>
<h2 className="font-title-md text-title-md">Tutor Notes</h2>
</div>
<div className="bg-paper-0/90 backdrop-blur-sm rounded-lg p-space-4 border border-paper-200/50">
<p className="font-body text-body text-on-background mb-space-2">
                                "Sarah showed excellent comprehension of algebraic expressions this week. She's moving past memorization and beginning to understand the underlying logic. We'll focus on word problems next session to apply these concepts."
                            </p>
<div className="flex items-center justify-between mt-space-4 pt-space-3 border-t border-paper-200/50">
<div className="flex items-center gap-space-2">
<div className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-caption text-caption font-bold">
                                        MR
                                    </div>
<span className="font-label text-label text-ink-700">Mr. Reynolds</span>
</div>
<span className="font-caption text-caption text-ink-500">2 days ago</span>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
