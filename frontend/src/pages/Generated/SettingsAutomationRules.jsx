import React from 'react';

export const SettingsAutomationRules = () => {
  return (
    <>
      
<div className="max-w-max-width mx-auto">

<div className="mb-space-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="flex items-center gap-2 mb-2 text-ink-500 font-label text-label">
<span className="material-symbols-outlined text-[16px]">settings</span>
<span>Settings</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="text-primary font-bold">Automation Rules</span>
</div>
<h2 className="font-title-lg text-title-lg text-ink-900 tracking-tight">Workflow Automations</h2>
<p className="font-body text-body text-ink-500 mt-1 max-w-2xl">Configure precise rules for automated reminders, link distribution, and attendance checks to keep your practice orderly.</p>
</div>
<button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-title-sm text-title-sm flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined text-[20px]">add</span>
                    New Rule
                </button>
</div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-space-6 items-start">

<div className="xl:col-span-2 space-y-space-6">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.04)] relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-primary-fixed"></div>
<div className="flex items-center justify-between mb-space-6 border-b border-paper-100 pb-4">
<h3 className="font-title-md text-title-md text-ink-900 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">edit_square</span>
                                Rule Builder
                            </h3>
<span className="bg-surface-container-low text-ink-700 font-caption text-caption px-2 py-1 rounded border border-paper-200">Draft</span>
</div>
<form className="space-y-space-6">

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
<div className="space-y-1.5">
<label className="font-label text-label text-ink-700 block">Trigger Event</label>
<div className="relative">
<select className="w-full bg-surface-bright border border-paper-200 rounded-lg px-4 py-2.5 font-body text-body text-ink-900 appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none">
<option>Payment Due Date</option>
<option>Class Start Time</option>
<option>Attendance Missing</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none">expand_more</span>
</div>
</div>
<div className="space-y-1.5">
<label className="font-label text-label text-ink-700 block">Target Audience</label>
<div className="relative">
<select className="w-full bg-surface-bright border border-paper-200 rounded-lg px-4 py-2.5 font-body text-body text-ink-900 appearance-none focus:ring-1 focus:ring-primary focus:border-primary outline-none">
<option>All Active Students</option>
<option>Specific Class Group</option>
<option>Overdue Accounts Only</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none">expand_more</span>
</div>
</div>
</div>

<div className="space-y-2">
<label className="font-label text-label text-ink-700 block">Execution Timing</label>
<div className="border border-paper-200 rounded-lg overflow-hidden bg-paper-0">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low font-label text-label text-ink-700 border-b border-paper-200">
<tr>
<th className="py-3 px-4 font-medium w-1/3">Condition</th>
<th className="py-3 px-4 font-medium">Offset Value</th>
<th className="py-3 px-4 font-medium">Metric</th>
<th className="py-3 px-4 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="font-body text-body text-ink-900 divide-y divide-paper-200">
<tr className="hover:bg-surface-bright transition-colors">
<td className="py-3 px-4 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-warning-solid"></span> Before Event
                                                </td>
<td className="py-3 px-4">
<input className="w-16 rounded-md border-paper-300 bg-surface px-2 py-1 text-center focus:ring-1 focus:ring-primary focus:border-primary outline-none text-ink-900" type="number" defaultValue="3" />
</td>
<td className="py-3 px-4 text-ink-500">Days</td>
<td className="py-3 px-4 text-right">
<button className="text-ink-500 hover:text-danger-solid transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</td>
</tr>
<tr className="hover:bg-surface-bright transition-colors">
<td className="py-3 px-4 flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-success-solid"></span> On Event Date
                                                </td>
<td className="py-3 px-4">
<input className="w-16 rounded-md border-transparent bg-surface-container-high px-2 py-1 text-center text-ink-500 cursor-not-allowed" disabled="" type="number" defaultValue="0" />
</td>
<td className="py-3 px-4 text-ink-500">N/A</td>
<td className="py-3 px-4 text-right">
<button className="text-ink-500 hover:text-danger-solid transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</td>
</tr>
</tbody>
</table>
<div className="p-3 bg-surface-bright border-t border-paper-200">
<button className="text-primary font-label text-label flex items-center gap-1 hover:text-primary-container transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">add_circle</span> Add Timing Rule
                                        </button>
</div>
</div>
</div>

<div className="space-y-2">
<label className="font-label text-label text-ink-700 block">Delivery Channel</label>
<div className="flex flex-wrap gap-4">
<label className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-success-tint/30 cursor-pointer transition-colors">
<input checked="" className="text-primary focus:ring-primary rounded-sm border-paper-300" type="checkbox" />
<span className="material-symbols-outlined text-primary text-[20px]">mail</span>
<span className="font-body text-body text-ink-900">Email</span>
</label>
<label className="flex items-center gap-2 p-3 border border-paper-200 rounded-lg hover:bg-surface-bright cursor-pointer transition-colors">
<input className="text-primary focus:ring-primary rounded-sm border-paper-300" type="checkbox" />
<span className="material-symbols-outlined text-ink-500 text-[20px]">sms</span>
<span className="font-body text-body text-ink-900">SMS (Nigeria Only)</span>
</label>
<label className="flex items-center gap-2 p-3 border border-paper-200 rounded-lg hover:bg-surface-bright cursor-pointer transition-colors">
<input className="text-primary focus:ring-primary rounded-sm border-paper-300" type="checkbox" />
<span className="material-symbols-outlined text-ink-500 text-[20px]">notifications_active</span>
<span className="font-body text-body text-ink-900">In-App Alert</span>
</label>
</div>
</div>
<div className="pt-4 border-t border-paper-200 flex justify-end gap-3">
<button className="px-4 py-2 border border-paper-300 rounded-lg font-title-sm text-title-sm text-ink-700 hover:bg-surface-container-low transition-colors" type="button">Cancel</button>
<button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm hover:bg-primary-container transition-colors shadow-sm" type="button">Save Rule</button>
</div>
</form>
</div>
</div>

<div className="xl:col-span-1 space-y-space-6">

<div className="bg-[#FDFBF7] border border-paper-300 rounded-xl p-space-6 shadow-[inset_0_0_20px_rgba(229,226,216,0.5)] relative">
<div className="absolute -top-3 -right-3 w-16 h-16 opacity-10 pointer-events-none">

<svg className="text-ink-900" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" stroke-width="2"></circle><path d="M30 50 L70 50 M50 30 L50 70" stroke="currentColor" stroke-width="2"></path></svg>
</div>
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-ink-500 text-[18px]">preview</span>
<h4 className="font-label text-label text-ink-700 uppercase tracking-wider">Message Preview</h4>
</div>
<div className="bg-paper-0 border border-paper-200 rounded-lg p-4 font-data-display text-data-display text-[13px] leading-relaxed text-ink-900 relative">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-container-high rounded-l-lg"></div>
<p className="text-ink-500 mb-2 border-b border-paper-100 pb-2">Subject: Reminder: Upcoming Payment for <span className="bg-warning-tint px-1 rounded text-secondary">{{CourseName}}</span></p>
<p className="mt-2">Hello <span className="bg-warning-tint px-1 rounded text-secondary">{{StudentName}}</span>,</p>
<br />
<p>This is an automated reminder that your payment of <span className="bg-warning-tint px-1 rounded text-secondary">{{AmountDue}}</span> is due on <span className="bg-warning-tint px-1 rounded text-secondary">{{DueDate}}</span>.</p>
<br />
<p>Please ensure timely transfer to avoid class interruptions. You can view your invoice via the student portal.</p>
<br />
<p className="text-ink-500">Regards,<br />TutorDesk System</p>
</div>
<p className="mt-3 font-caption text-caption text-ink-500 text-center">Preview reflects dynamic data injection.</p>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 shadow-sm">
<h4 className="font-title-sm text-title-sm text-ink-900 mb-4 px-2">Active Workflows</h4>
<div className="space-y-2">

<div className="flex items-center justify-between p-3 border border-paper-200 rounded-lg hover:border-primary-fixed-dim transition-colors group">
<div className="flex items-start gap-3">
<div className="p-2 bg-success-tint text-success-solid rounded-md mt-0.5">
<span className="material-symbols-outlined text-[16px]">payments</span>
</div>
<div>
<p className="font-body text-body text-ink-900 font-medium">3-Day Payment Reminder</p>
<p className="font-caption text-caption text-ink-500">Emails all active students</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input checked="" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-paper-0 border-2 border-primary appearance-none cursor-pointer translate-x-5 transition-transform" id="toggle1" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer border border-primary" htmlFor="toggle1"></label>
</div>
</div>

<div className="flex items-center justify-between p-3 border border-paper-200 rounded-lg hover:border-primary-fixed-dim transition-colors group">
<div className="flex items-start gap-3">
<div className="p-2 bg-surface-container-high text-ink-700 rounded-md mt-0.5">
<span className="material-symbols-outlined text-[16px]">link</span>
</div>
<div>
<p className="font-body text-body text-ink-900 font-medium">Zoom Link Auto-Send</p>
<p className="font-caption text-caption text-ink-500">1 hour before scheduled class</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-paper-0 border-2 border-paper-300 appearance-none cursor-pointer transition-transform" id="toggle2" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-container-high cursor-pointer border border-paper-300" htmlFor="toggle2"></label>
</div>
</div>

<div className="flex items-center justify-between p-3 border border-paper-200 rounded-lg hover:border-primary-fixed-dim transition-colors group">
<div className="flex items-start gap-3">
<div className="p-2 bg-danger-tint text-danger-solid rounded-md mt-0.5">
<span className="material-symbols-outlined text-[16px]">how_to_reg</span>
</div>
<div>
<p className="font-body text-body text-ink-900 font-medium">Missing Attendance Ping</p>
<p className="font-caption text-caption text-ink-500">15 mins after class start</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input checked="" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-paper-0 border-2 border-primary appearance-none cursor-pointer translate-x-5 transition-transform" id="toggle3" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary cursor-pointer border border-primary" htmlFor="toggle3"></label>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
