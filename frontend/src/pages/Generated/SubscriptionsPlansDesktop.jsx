import React from 'react';

export const SubscriptionsPlansDesktop = () => {
  return (
    <>
      

<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-space-8 gap-space-4 border-b border-paper-200 pb-space-4">
<div>
<h2 className="font-title-lg text-title-lg text-ink-900 mb-1">Subscription Plans</h2>
<p className="font-body text-body text-ink-500 max-w-2xl">Manage recurring billing for your students. Automated invoices are generated based on these active schedules.</p>
</div>
<button className="bg-primary text-paper-0 font-label text-label py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]">
<span className="material-symbols-outlined text-[18px]">add</span>
                Add Plan
            </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-4 mb-space-8">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 flex flex-col justify-between shadow-sm shadow-[#16211E]/[0.06]">
<div className="flex items-center gap-2 text-ink-500 font-label text-label mb-2">
<span className="material-symbols-outlined text-[18px]">autorenew</span>
                    Active Recurring Revenue
                </div>
<div className="font-display-md text-display-md text-ink-900 font-data-display text-data-display tracking-tight">
                    ₦450,000<span className="text-ink-500 text-sm">/mo</span>
</div>
</div>
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 flex flex-col justify-between shadow-sm shadow-[#16211E]/[0.06]">
<div className="flex items-center gap-2 text-ink-500 font-label text-label mb-2">
<span className="material-symbols-outlined text-[18px]">group</span>
                    Students on Plans
                </div>
<div className="font-display-md text-display-md text-ink-900">
                    12 <span className="text-ink-500 text-sm font-body text-body">Active</span>
</div>
</div>
<div className="bg-warning-tint border border-paper-300 rounded-xl p-space-4 flex flex-col justify-between shadow-sm shadow-[#16211E]/[0.06]">
<div className="flex items-center gap-2 text-warning-solid font-label text-label mb-2">
<span className="material-symbols-outlined text-[18px]">warning</span>
                    Action Required
                </div>
<div className="font-body text-body text-ink-900">
<strong>2</strong> paused plans need attention.
                </div>
<a className="font-label text-label text-warning-solid underline mt-1 hover:text-secondary-container transition-colors" href="#">Review paused</a>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl shadow-sm shadow-[#16211E]/[0.06] overflow-hidden">

<div className="hidden md:grid grid-cols-12 gap-4 p-space-4 border-b border-paper-200 bg-surface-container-low font-label text-label text-ink-500 uppercase tracking-wider text-xs">
<div className="col-span-3">Student &amp; Subject</div>
<div className="col-span-2">Amount</div>
<div className="col-span-2">Billing Cycle</div>
<div className="col-span-2">Next Charge</div>
<div className="col-span-2">Status</div>
<div className="col-span-1 text-right">Actions</div>
</div>

<div className="flex flex-col divide-y divide-paper-200">

<div className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-space-4 hover:bg-surface-container-low transition-colors items-center cursor-pointer">
<div className="md:col-span-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary font-title-sm text-title-sm border border-primary-fixed">OA</div>
<div>
<div className="font-title-sm text-title-sm text-ink-900">Oluwaseun Adebayo</div>
<div className="font-body text-body text-ink-500 text-sm">A-Level Mathematics</div>
</div>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Amount</span>
<span className="font-data-display text-data-display text-ink-900">₦40,000</span>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Billing Cycle</span>
<span className="font-body text-body text-ink-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-ink-500">event_repeat</span> Monthly
                        </span>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Next Charge</span>
<span className="font-body text-body text-ink-900">Oct 24, 2023</span>
</div>
<div className="md:col-span-2 flex items-center justify-between md:justify-start">
<span className="md:hidden font-label text-label text-ink-500">Status</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-tint text-success-solid font-label text-label border border-success-solid/20">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span>
                            Active
                        </span>
</div>
<div className="md:col-span-1 text-right flex justify-end gap-2">
<button className="text-ink-500 hover:text-primary p-2 rounded-lg hover:bg-paper-200 transition-colors" title="Edit Plan">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="text-ink-500 hover:text-ink-900 p-2 rounded-lg hover:bg-paper-200 transition-colors md:opacity-0 group-hover:opacity-100" title="View History">
<span className="material-symbols-outlined text-[20px]">history</span>
</button>
</div>
</div>

<div className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-space-4 hover:bg-surface-container-low transition-colors items-center cursor-pointer bg-surface/50">
<div className="md:col-span-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary font-title-sm text-title-sm border border-secondary-fixed">CN</div>
<div>
<div className="font-title-sm text-title-sm text-ink-900 opacity-80">Chioma Nnadi</div>
<div className="font-body text-body text-ink-500 text-sm">IGCSE Physics</div>
</div>
</div>
<div className="md:col-span-2 flex flex-col md:block opacity-80">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Amount</span>
<span className="font-data-display text-data-display text-ink-900">₦25,000</span>
</div>
<div className="md:col-span-2 flex flex-col md:block opacity-80">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Billing Cycle</span>
<span className="font-body text-body text-ink-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-ink-500">event_repeat</span> Bi-Weekly
                        </span>
</div>
<div className="md:col-span-2 flex flex-col md:block opacity-80">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Next Charge</span>
<span className="font-body text-body text-ink-500 italic">Paused</span>
</div>
<div className="md:col-span-2 flex items-center justify-between md:justify-start">
<span className="md:hidden font-label text-label text-ink-500">Status</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-ink-700 font-label text-label border border-paper-300">
<span className="material-symbols-outlined text-[14px]">pause</span>
                            Paused
                        </span>
</div>
<div className="md:col-span-1 text-right flex justify-end gap-2">
<button className="text-ink-500 hover:text-primary p-2 rounded-lg hover:bg-paper-200 transition-colors" title="Resume Plan">
<span className="material-symbols-outlined text-[20px]">play_arrow</span>
</button>
</div>
</div>

<div className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-space-4 hover:bg-surface-container-low transition-colors items-center cursor-pointer">
<div className="md:col-span-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary font-title-sm text-title-sm border border-primary-fixed">ED</div>
<div>
<div className="font-title-sm text-title-sm text-ink-900">Emmanuel Danjuma</div>
<div className="font-body text-body text-ink-500 text-sm">SSCE English</div>
</div>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Amount</span>
<span className="font-data-display text-data-display text-ink-900">₦30,000</span>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Billing Cycle</span>
<span className="font-body text-body text-ink-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-ink-500">event_repeat</span> Monthly
                        </span>
</div>
<div className="md:col-span-2 flex flex-col md:block">
<span className="md:hidden font-label text-label text-ink-500 mb-1">Next Charge</span>
<span className="font-body text-body text-ink-900">Nov 01, 2023</span>
</div>
<div className="md:col-span-2 flex items-center justify-between md:justify-start">
<span className="md:hidden font-label text-label text-ink-500">Status</span>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success-tint text-success-solid font-label text-label border border-success-solid/20">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span>
                            Active
                        </span>
</div>
<div className="md:col-span-1 text-right flex justify-end gap-2">
<button className="text-ink-500 hover:text-primary p-2 rounded-lg hover:bg-paper-200 transition-colors" title="Edit Plan">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
<button className="text-ink-500 hover:text-ink-900 p-2 rounded-lg hover:bg-paper-200 transition-colors md:opacity-0 group-hover:opacity-100" title="View History">
<span className="material-symbols-outlined text-[20px]">history</span>
</button>
</div>
</div>
</div>


</div>

    </>
  );
};
