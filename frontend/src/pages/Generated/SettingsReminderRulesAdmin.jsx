import React from 'react';

export const SettingsReminderRulesAdmin = () => {
  return (
    <>
      

<div className="mb-space-8 flex flex-col md:flex-row md:items-end justify-between gap-space-4">
<div>
<div className="flex items-center gap-2 mb-2">
<a className="text-ink-500 hover:text-primary font-label text-label flex items-center gap-1 transition-colors" href="#">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            Settings
                        </a>
<span className="text-ink-500 text-label">/</span>
<span className="text-primary font-label text-label">Automated Billing</span>
</div>
<h1 className="font-title-lg text-title-lg text-on-surface">Reminder Rules</h1>
<p className="font-body text-body text-ink-500 mt-1 max-w-2xl">Configure automated messaging rules to chase pending and overdue payments from students.</p>
</div>
<div className="flex gap-space-3">
<button className="bg-paper-0 border border-primary text-primary px-4 py-2 rounded font-label text-label hover:bg-paper-50 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">history</span>
                        View Logs
                    </button>
<button className="bg-primary text-on-primary px-4 py-2 rounded font-label text-label hover:bg-on-primary-fixed transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
                        New Rule
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6">

<div className="lg:col-span-8 flex flex-col gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined">schedule</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm text-on-surface">Upcoming Payment Heads-up</h3>
<div className="flex items-center gap-2 mt-1">
<span className="font-data-display text-caption text-ink-500 bg-paper-100 px-2 py-0.5 rounded">T-3 DAYS</span>
<span className="w-1 h-1 rounded-full bg-ink-500"></span>
<span className="font-caption text-caption text-ink-500">Triggers 3 days before due date</span>
</div>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-solid"></div>
</label>
</div>
<div className="border-t border-paper-200 pt-space-4 mt-space-2">
<div className="flex flex-wrap gap-4">
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-ink-700 mb-2">Delivery Channels</label>
<div className="flex gap-2">
<div className="bg-paper-100 border border-paper-300 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">mail</span>
<span className="font-caption text-caption text-ink-900">Email</span>
</div>
<div className="bg-paper-100 border border-paper-300 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">chat</span>
<span className="font-caption text-caption text-ink-900">WhatsApp</span>
</div>
</div>
</div>
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-ink-700 mb-2">Message Template</label>
<button className="w-full text-left bg-surface border border-paper-200 px-3 py-2 rounded hover:border-primary transition-colors flex justify-between items-center group-hover:bg-paper-50">
<span className="font-body text-body text-ink-900 truncate">"Friendly Reminder: Upcoming Invoice..."</span>
<span className="material-symbols-outlined text-ink-500">edit</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-warning-solid"></div>
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-warning-tint flex items-center justify-center text-warning-solid">
<span className="material-symbols-outlined">event</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm text-on-surface">Due Date Notice</h3>
<div className="flex items-center gap-2 mt-1">
<span className="font-data-display text-caption text-ink-500 bg-paper-100 px-2 py-0.5 rounded">T-0 DAYS</span>
<span className="w-1 h-1 rounded-full bg-ink-500"></span>
<span className="font-caption text-caption text-ink-500">Triggers on the due date at 9:00 AM</span>
</div>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-success-solid"></div>
</label>
</div>
<div className="border-t border-paper-200 pt-space-4 mt-space-2">
<div className="flex flex-wrap gap-4">
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-ink-700 mb-2">Delivery Channels</label>
<div className="flex gap-2">
<div className="bg-paper-100 border border-paper-300 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">mail</span>
<span className="font-caption text-caption text-ink-900">Email</span>
</div>
<div className="bg-paper-100 border border-paper-300 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">chat</span>
<span className="font-caption text-caption text-ink-900">WhatsApp</span>
</div>
<div className="bg-paper-100 border border-paper-300 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">sms</span>
<span className="font-caption text-caption text-ink-900">SMS</span>
</div>
</div>
</div>
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-ink-700 mb-2">Message Template</label>
<button className="w-full text-left bg-surface border border-paper-200 px-3 py-2 rounded hover:border-primary transition-colors flex justify-between items-center group-hover:bg-paper-50">
<span className="font-body text-body text-ink-900 truncate">"Today is the day! Invoice #{{ID}}..."</span>
<span className="material-symbols-outlined text-ink-500">edit</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-danger-tint/20 border border-danger-tint rounded-lg p-space-6 elev-1 relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-solid"></div>
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-danger-tint flex items-center justify-center text-danger-solid">
<span className="material-symbols-outlined">warning</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm text-danger-solid">Overdue Escalation</h3>
<div className="flex items-center gap-2 mt-1">
<span className="font-data-display text-caption text-danger-solid bg-danger-tint px-2 py-0.5 rounded">T+2 DAYS</span>
<span className="w-1 h-1 rounded-full bg-danger-solid opacity-50"></span>
<span className="font-caption text-caption text-danger-solid opacity-90">Triggers 2 days after due date</span>
</div>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-danger-solid"></div>
</label>
</div>
<div className="border-t border-danger-tint/50 pt-space-4 mt-space-2">
<div className="flex flex-wrap gap-4">
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-danger-solid opacity-90 mb-2">Delivery Channels</label>
<div className="flex gap-2">
<div className="bg-paper-0 border border-danger-tint px-3 py-1.5 rounded flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[16px] text-danger-solid">sms</span>
<span className="font-caption text-caption text-danger-solid font-bold">SMS (Priority)</span>
</div>
<div className="bg-paper-0 border border-danger-tint/50 px-3 py-1.5 rounded flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-ink-700">mail</span>
<span className="font-caption text-caption text-ink-900">Email</span>
</div>
</div>
</div>
<div className="flex-1 min-w-[200px]">
<label className="block font-label text-label text-danger-solid opacity-90 mb-2">Message Template</label>
<button className="w-full text-left bg-paper-0 border border-danger-tint px-3 py-2 rounded hover:border-danger-solid transition-colors flex justify-between items-center group-hover:shadow-sm">
<span className="font-body text-body text-ink-900 truncate">"URGENT: Payment Overdue for..."</span>
<span className="material-symbols-outlined text-danger-solid">edit</span>
</button>
</div>
</div>
</div>
</div>

<button className="w-full border-2 border-dashed border-paper-300 hover:border-primary text-ink-500 hover:text-primary rounded-lg p-space-6 flex flex-col items-center justify-center gap-2 transition-colors bg-surface-container-low/50 hover:bg-surface-container-low">
<span className="material-symbols-outlined text-[24px]">add_circle</span>
<span className="font-label text-label">Add a new reminder stage</span>
</button>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 sticky top-24">
<div className="flex items-center gap-2 mb-space-4 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-primary">visibility</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Template Preview</h3>
</div>
<div className="bg-surface-container-low rounded-lg p-4 mb-4">
<div className="flex items-center gap-2 mb-3">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-[16px] text-on-tertiary-fixed">person</span>
</div>
<div>
<div className="font-label text-label text-ink-900">WhatsApp Message</div>
<div className="font-caption text-caption text-ink-500">Previewing: Due Date Notice</div>
</div>
</div>
<div className="bg-paper-0 border border-paper-200 rounded-lg p-3 rounded-tl-none relative shadow-sm">
<p className="font-body text-body text-ink-900">
                                    Hi <span className="bg-secondary-fixed/50 px-1 rounded font-data-display text-caption">StudentName</span>, 👋<br /><br />
                                    This is a reminder that your payment for <span className="bg-secondary-fixed/50 px-1 rounded font-data-display text-caption">Month/Subject</span> is due today.<br /><br />
                                    Amount: <span className="font-data-display text-body font-bold">₦25,000</span><br /><br />
                                    Please use the link below to pay or upload your transfer receipt to maintain access to class materials.
                                </p>
<div className="mt-3 pt-3 border-t border-paper-200">
<a className="text-primary font-label text-label flex items-center gap-1 hover:underline" href="#">
                                        Pay Now <span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
</div>
</div>
</div>
<div className="mt-space-6">
<h4 className="font-label text-label text-ink-700 mb-2">Available Variables</h4>
<div className="flex flex-wrap gap-2">
<span className="font-data-display text-caption bg-paper-100 text-ink-700 px-2 py-1 rounded border border-paper-200 hover:border-primary cursor-pointer transition-colors">{{StudentName}}</span>
<span className="font-data-display text-caption bg-paper-100 text-ink-700 px-2 py-1 rounded border border-paper-200 hover:border-primary cursor-pointer transition-colors">{{AmountDue}}</span>
<span className="font-data-display text-caption bg-paper-100 text-ink-700 px-2 py-1 rounded border border-paper-200 hover:border-primary cursor-pointer transition-colors">{{DueDate}}</span>
<span className="font-data-display text-caption bg-paper-100 text-ink-700 px-2 py-1 rounded border border-paper-200 hover:border-primary cursor-pointer transition-colors">{{PaymentLink}}</span>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 mt-space-4">
<h3 className="font-title-sm text-title-sm text-on-surface mb-space-4">Global Preferences</h3>
<div className="space-y-4">
<div className="flex items-start justify-between">
<div>
<div className="font-label text-label text-ink-900">Quiet Hours</div>
<div className="font-caption text-caption text-ink-500 max-w-[200px]">Don't send messages between 9PM and 8AM</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-start justify-between pt-4 border-t border-paper-200">
<div>
<div className="font-label text-label text-ink-900">Auto-Pause on Dispute</div>
<div className="font-caption text-caption text-ink-500 max-w-[200px]">Stop reminders if student marks as "Paid" pending verification</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
