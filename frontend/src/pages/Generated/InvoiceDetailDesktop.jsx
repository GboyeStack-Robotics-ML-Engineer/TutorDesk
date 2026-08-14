import React from 'react';

export const InvoiceDetailDesktop = () => {
  return (
    <>
      



<div className="flex-1 max-w-[1200px] w-full mx-auto px-gutter-mobile md:px-gutter-desktop py-space-6 md:py-space-8 grid grid-cols-1 lg:grid-cols-12 gap-space-6">

<div className="lg:col-span-8 flex flex-col gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-space-4 relative overflow-hidden">

<div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-solid"></div>
<div>
<div className="flex items-center gap-space-2 mb-space-2">
<span className="bg-danger-tint text-danger-solid font-label text-label px-2 py-1 rounded border border-danger-solid/20">Overdue</span>
<span className="text-ink-500 font-caption text-caption">Due 3 days ago (Oct 24, 2023)</span>
</div>
<h2 className="font-display-md text-display-md text-primary">Aisha O.</h2>
<p className="text-ink-500 font-body text-body">Student ID: #ST-8892</p>
</div>
<div className="text-left md:text-right">
<p className="text-ink-500 font-label text-label uppercase tracking-wider mb-1">Total Amount Due</p>
<p className="font-data-display text-[32px] leading-[38px] font-semibold text-primary">₦45,000</p>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
<h3 className="font-title-sm text-title-sm text-primary mb-space-4 border-b border-paper-200 pb-space-2">Itemized Charges</h3>
<div className="flex flex-col gap-space-4">

<div className="flex justify-between items-start py-space-2 border-b border-paper-100 last:border-0">
<div>
<p className="font-title-sm text-title-sm text-on-surface">Mathematics Tutoring</p>
<p className="text-ink-500 font-caption text-caption">4 sessions @ ₦10,000/session</p>
</div>
<span className="font-data-display text-data-display text-primary">₦40,000</span>
</div>

<div className="flex justify-between items-start py-space-2 border-b border-paper-100 last:border-0">
<div>
<p className="font-title-sm text-title-sm text-on-surface">Exam Prep Material</p>
<p className="text-ink-500 font-caption text-caption">Digital PDF + Practice Tests</p>
</div>
<span className="font-data-display text-data-display text-primary">₦5,000</span>
</div>

<div className="flex justify-between items-center pt-space-4 mt-space-2 border-t-2 border-paper-200">
<span className="font-title-md text-title-md text-primary">Total</span>
<span className="font-data-display text-[20px] leading-[26px] font-semibold text-primary">₦45,000</span>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6 flex flex-col gap-space-3">
<button className="w-full bg-primary text-on-primary font-label text-label py-3 px-4 rounded transition-colors hover:bg-primary-container flex items-center justify-center gap-space-2">
<span className="material-symbols-outlined text-[18px]">payments</span>
                        Record Payment
                    </button>
<button className="w-full bg-paper-0 text-primary border border-primary font-label text-label py-3 px-4 rounded transition-colors hover:bg-paper-100 flex items-center justify-center gap-space-2">
<span className="material-symbols-outlined text-[18px]">notifications_active</span>
                        Send Reminder
                    </button>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
<div className="flex items-center gap-space-2 mb-space-4 pb-space-2 border-b border-paper-200">
<span className="material-symbols-outlined text-primary">account_balance</span>
<h3 className="font-title-sm text-title-sm text-primary">Bank Transfer Details</h3>
</div>
<div className="flex flex-col gap-space-3">
<div>
<p className="text-ink-500 font-label text-label uppercase tracking-wider text-[11px] mb-1">Account Name</p>
<p className="font-body-lg text-body-lg text-on-surface">Chidi Okeke</p>
</div>
<div className="flex items-center justify-between group">
<div>
<p className="text-ink-500 font-label text-label uppercase tracking-wider text-[11px] mb-1">Account Number</p>
<p className="font-data-display text-data-display text-on-surface">0123456789</p>
</div>
<button className="text-primary hover:bg-paper-100 p-2 rounded transition-colors" title="Copy Account Number">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
</div>
<div>
<p className="text-ink-500 font-label text-label uppercase tracking-wider text-[11px] mb-1">Bank</p>
<p className="font-body-lg text-body-lg text-on-surface">Access Bank</p>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-elev-1 p-space-6">
<h3 className="font-title-sm text-title-sm text-primary mb-space-4 pb-space-2 border-b border-paper-200">Activity Log</h3>
<div className="relative pl-4 border-l border-paper-200 flex flex-col gap-space-4">

<div className="relative">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-paper-200 border-2 border-paper-0"></div>
<p className="font-body text-body text-on-surface">Invoice Viewed</p>
<p className="font-caption text-caption text-ink-500">Oct 25, 2023 at 10:42 AM</p>
</div>

<div className="relative">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-paper-200 border-2 border-paper-0"></div>
<p className="font-body text-body text-on-surface">Invoice Sent via Email</p>
<p className="font-caption text-caption text-ink-500">Oct 17, 2023 at 08:00 AM</p>
</div>

<div className="relative">
<div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-paper-200 border-2 border-paper-0"></div>
<p className="font-body text-body text-on-surface">Invoice Created</p>
<p className="font-caption text-caption text-ink-500">Oct 17, 2023 at 07:45 AM</p>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
