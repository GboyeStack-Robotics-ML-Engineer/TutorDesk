import React from 'react';

export const SetupChecklistHomeVariant = () => {
  return (
    <>
      

<div className="mb-space-8 mt-space-4">
<h1 className="font-display-lg text-display-lg text-primary mb-2">Welcome to TutorFlow.</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Let's get your workspace organized. Complete these steps to start conducting professional sessions.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-4">

<div className="lg:col-span-8 bg-paper-0 border border-paper-200 rounded-xl elev-1 p-space-6 flex flex-col">
<div className="flex items-center justify-between mb-space-6 pb-space-4 border-b border-paper-200">
<div>
<h2 className="font-title-lg text-title-lg text-ink-900">Setup Guide</h2>
<p className="font-body text-body text-ink-500 mt-1">1 of 4 tasks completed</p>
</div>
<div className="w-16 h-16 relative">

<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-paper-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3"></path>
<path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="25, 100" stroke-linecap="round" stroke-width="3"></path>
</svg>
<div className="absolute inset-0 flex items-center justify-center font-label text-label text-primary">25%</div>
</div>
</div>
<div className="flex flex-col gap-space-4 flex-1">

<a className="group block border border-success-tint bg-success-tint/20 rounded-lg p-space-4 transition-colors hover:bg-success-tint/40" href="#">
<div className="flex items-start gap-4">
<div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-success-solid flex items-center justify-center text-paper-0">
<span className="material-symbols-outlined text-[16px] font-bold">check</span>
</div>
<div className="flex-1">
<h3 className="font-title-sm text-title-sm text-ink-900 line-through opacity-70">Complete Profile Basics</h3>
<p className="font-body text-body text-ink-500 mt-1">Name, subject expertise, and contact details added.</p>
</div>
</div>
</a>

<a className="group block border border-primary-container bg-surface rounded-lg p-space-4 shadow-sm transition-all hover:border-primary relative overflow-hidden" href="#">

<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div className="flex items-start gap-4">
<div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-primary"></span>
</div>
<div className="flex-1">
<h3 className="font-title-sm text-title-sm text-primary">Add Your First Student</h3>
<p className="font-body text-body text-ink-500 mt-1">Create a student profile to start scheduling and managing records.</p>
</div>
<div className="flex-shrink-0 self-center">
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group block border border-paper-200 bg-surface rounded-lg p-space-4 transition-colors hover:border-paper-300 hover:bg-surface-container-low" href="#">
<div className="flex items-start gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
<div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-paper-300 flex items-center justify-center group-hover:border-outline-variant transition-colors">
</div>
<div className="flex-1">
<h3 className="font-title-sm text-title-sm text-ink-900">Set Availability Hours</h3>
<p className="font-body text-body text-ink-500 mt-1">Define your regular teaching hours to enable scheduling.</p>
</div>
</div>
</a>
<a className="group block border border-paper-200 bg-surface rounded-lg p-space-4 transition-colors hover:border-paper-300 hover:bg-surface-container-low" href="#">
<div className="flex items-start gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
<div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-paper-300 flex items-center justify-center group-hover:border-outline-variant transition-colors">
</div>
<div className="flex-1">
<h3 className="font-title-sm text-title-sm text-ink-900">Add Payment Details</h3>
<p className="font-body text-body text-ink-500 mt-1">Input your bank transfer details for straightforward reconciliation.</p>
</div>
</div>
</a>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4">
<h3 className="font-label text-label text-ink-500 uppercase tracking-wider mb-4">Quick Actions</h3>
<div className="flex flex-col gap-2">
<button className="w-full flex items-center justify-between p-3 rounded bg-primary text-on-primary hover:bg-primary-container transition-colors">
<span className="font-label text-label">Add Student</span>
<span className="material-symbols-outlined text-[18px]">person_add</span>
</button>
<button className="w-full flex items-center justify-between p-3 rounded border border-primary text-primary hover:bg-primary-fixed/10 transition-colors">
<span className="font-label text-label">New Invoice</span>
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
</button>
</div>
</div>

<div className="bg-warning-tint/30 border border-warning-tint rounded-xl p-space-4 flex-1">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-warning-solid">lightbulb</span>
<div>
<h4 className="font-title-sm text-title-sm text-ink-900">Pro Tip</h4>
<p className="font-body text-body text-ink-700 mt-2 text-[14px]">Many tutors prefer to set up their Payment Details early. It ensures your invoices automatically include your bank transfer information.</p>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
