import React from 'react';

export const PortalPaymentsInvoices = () => {
  return (
    <>
      
<div className="max-w-max-width mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6">

<div className="lg:col-span-7 space-y-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)] flex flex-col justify-between relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[120px] text-primary">account_balance_wallet</span>
</div>
<div>
<h2 className="font-label text-label text-ink-500 uppercase tracking-wider mb-2">Total Outstanding Balance</h2>
<div className="font-display-lg text-display-lg text-on-surface">₦ 145,000</div>
</div>
<div className="mt-space-6 flex items-center gap-3">
<div className="flex items-center gap-1 bg-danger-tint px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px] text-danger-solid">warning</span>
<span className="font-caption text-caption text-danger-solid">1 Overdue</span>
</div>
<div className="flex items-center gap-1 bg-warning-tint px-2 py-1 rounded-md">
<span className="material-symbols-outlined text-[14px] text-warning-solid" style={{"fontVariationSettings":"\"FILL\" 1"}}>schedule</span>
<span className="font-caption text-caption text-warning-solid">2 Pending</span>
</div>
</div>
</div>

<div>
<h3 className="font-title-md text-title-md text-on-surface mb-space-4 border-b border-paper-200 pb-2">Recent Invoices</h3>
<div className="space-y-space-3">

<div className="bg-surface-container-low border border-primary rounded-lg p-space-4 cursor-pointer relative shadow-[0_2px_8px_rgba(22,33,30,0.04)] transition-transform hover:-translate-y-0.5">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-solid rounded-l-lg"></div>
<div className="flex justify-between items-start mb-2 pl-2">
<div>
<div className="font-title-sm text-title-sm text-on-surface">INV-2023-08A</div>
<div className="font-caption text-caption text-ink-500 mt-0.5">Oct 1 - Oct 15 Sessions</div>
</div>
<div className="bg-danger-tint text-danger-solid font-label text-label px-2 py-0.5 rounded-sm border border-danger-solid/20">Overdue</div>
</div>
<div className="flex justify-between items-end pl-2 mt-4">
<div className="font-caption text-caption text-ink-500">Due: Oct 18, 2023</div>
<div className="font-data-display text-data-display text-on-surface">₦ 45,000</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 cursor-pointer hover:border-paper-300 transition-all hover:-translate-y-0.5 group">
<div className="flex justify-between items-start mb-2">
<div>
<div className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors">INV-2023-08B</div>
<div className="font-caption text-caption text-ink-500 mt-0.5">Oct 16 - Oct 31 Sessions</div>
</div>
<div className="bg-warning-tint text-warning-solid font-label text-label px-2 py-0.5 rounded-sm border border-warning-solid/20">Pending</div>
</div>
<div className="flex justify-between items-end mt-4">
<div className="font-caption text-caption text-ink-500">Due: Nov 5, 2023</div>
<div className="font-data-display text-data-display text-on-surface">₦ 100,000</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 opacity-70">
<div className="flex justify-between items-start mb-2">
<div>
<div className="font-title-sm text-title-sm text-on-surface">INV-2023-07</div>
<div className="font-caption text-caption text-ink-500 mt-0.5">Sep Sessions</div>
</div>
<div className="bg-success-tint text-success-solid font-label text-label px-2 py-0.5 rounded-sm flex items-center gap-1 border border-success-solid/20">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span>
                                            Paid
                                        </div>
</div>
<div className="flex justify-between items-end mt-4">
<div className="font-caption text-caption text-ink-500">Paid: Oct 2, 2023</div>
<div className="font-data-display text-data-display text-ink-500">₦ 120,000</div>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)] sticky top-space-6">
<div className="flex justify-between items-center mb-space-6 border-b border-paper-200 pb-4">
<h3 className="font-title-lg text-title-lg text-on-surface">INV-2023-08A</h3>
<button className="text-ink-500 hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[20px]">download</span>
</button>
</div>

<div className="mb-space-6">
<h4 className="font-label text-label text-ink-500 uppercase tracking-wider mb-3">Itemized Charges</h4>
<div className="space-y-3 font-body text-body text-on-surface">
<div className="flex justify-between items-start border-b border-paper-100 pb-2">
<div>
<div>Mathematics - Grade 10</div>
<div className="font-caption text-caption text-ink-500">4 sessions @ ₦5,000/hr</div>
</div>
<div className="font-data-display text-data-display">₦ 20,000</div>
</div>
<div className="flex justify-between items-start border-b border-paper-100 pb-2">
<div>
<div>Physics - Grade 10</div>
<div className="font-caption text-caption text-ink-500">5 sessions @ ₦5,000/hr</div>
</div>
<div className="font-data-display text-data-display">₦ 25,000</div>
</div>
<div className="flex justify-between items-center pt-2 font-title-sm text-title-sm">
<div>Total Amount Due</div>
<div className="font-data-display text-data-display text-danger-solid">₦ 45,000</div>
</div>
</div>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 mb-space-6">
<h4 className="font-label text-label text-ink-500 uppercase tracking-wider mb-3 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">account_balance</span>
                                    Bank Transfer Details
                                </h4>
<div className="space-y-4">
<div>
<div className="font-caption text-caption text-ink-500 mb-1">Bank Name</div>
<div className="font-body-lg text-body-lg text-on-surface">Guaranty Trust Bank (GTB)</div>
</div>
<div>
<div className="font-caption text-caption text-ink-500 mb-1">Account Name</div>
<div className="font-body-lg text-body-lg text-on-surface">TutorDesk Educational Services</div>
</div>
<div className="bg-paper-0 border border-paper-200 rounded-md p-2 flex justify-between items-center group">
<div>
<div className="font-caption text-caption text-ink-500 mb-0.5">Account Number</div>
<div className="font-data-display text-data-display text-primary font-bold">0123456789</div>
</div>
<button className="text-primary p-2 rounded hover:bg-surface-container-high transition-colors group-hover:bg-surface-container-high" title="Copy Account Number">
<span className="material-symbols-outlined">content_copy</span>
</button>
</div>
</div>
</div>

<div className="pt-space-4 border-t border-paper-200">
<p className="font-caption text-caption text-ink-500 mb-4 text-center">After making the transfer, please confirm below to notify the tutor.</p>
<button className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-colors py-3 rounded-lg font-title-sm text-title-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>check_circle</span>
                                    I've Paid
                                </button>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
