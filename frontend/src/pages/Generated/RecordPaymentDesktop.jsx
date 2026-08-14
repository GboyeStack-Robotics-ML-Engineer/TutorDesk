import React from 'react';

export const RecordPaymentDesktop = () => {
  return (
    <>
      



<div className="p-space-6 overflow-y-auto flex-grow space-y-space-8">

<section className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
<div className="space-y-space-2">
<label className="block font-label text-label text-ink-700" htmlFor="amount">Amount Received</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 font-data-display text-data-display text-ink-500">₦</span>
<input className="w-full pl-8 pr-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors" id="amount" placeholder="0.00" type="text" defaultValue="45,000.00" />
</div>
</div>
<div className="space-y-space-2">
<label className="block font-label text-label text-ink-700" htmlFor="payment_date">Payment Date</label>
<div className="relative">
<input className="w-full pl-3 pr-10 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors" id="payment_date" type="date" defaultValue="2023-10-24" />
</div>
</div>
</section>

<section className="space-y-space-3">
<label className="block font-label text-label text-ink-700">Payment Method</label>
<div className="grid grid-cols-3 gap-space-3">
<label className="cursor-pointer relative">
<input checked="" className="sr-only" name="payment_method" type="radio" defaultValue="bank_transfer" />
<div className="h-full border border-paper-300 rounded-lg p-space-3 flex flex-col items-center justify-center text-center gap-space-2 hover:border-paper-300/80 transition-colors bg-paper-0">
<span className="material-symbols-outlined text-ink-500 radio-icon">account_balance</span>
<span className="font-label text-label text-ink-700">Transfer</span>
</div>
</label>
<label className="cursor-pointer relative">
<input className="sr-only" name="payment_method" type="radio" defaultValue="cash" />
<div className="h-full border border-paper-300 rounded-lg p-space-3 flex flex-col items-center justify-center text-center gap-space-2 hover:border-paper-300/80 transition-colors bg-paper-0">
<span className="material-symbols-outlined text-ink-500 radio-icon">payments</span>
<span className="font-label text-label text-ink-700">Cash</span>
</div>
</label>
<label className="cursor-pointer relative">
<input className="sr-only" name="payment_method" type="radio" defaultValue="card" />
<div className="h-full border border-paper-300 rounded-lg p-space-3 flex flex-col items-center justify-center text-center gap-space-2 hover:border-paper-300/80 transition-colors bg-paper-0">
<span className="material-symbols-outlined text-ink-500 radio-icon">credit_card</span>
<span className="font-label text-label text-ink-700">Card</span>
</div>
</label>
</div>
</section>

<section className="space-y-space-4">
<div className="space-y-space-2">
<label className="block font-label text-label text-ink-700" htmlFor="reference">Reference / Transaction ID <span className="text-ink-500 font-normal">(Optional)</span></label>
<input className="w-full px-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-data-display text-data-display text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors" id="reference" placeholder="e.g. GTB/TRF/092..." type="text" />
</div>
<div className="space-y-space-2">
<label className="block font-label text-label text-ink-700" htmlFor="notes">Internal Note <span className="text-ink-500 font-normal">(Optional)</span></label>
<textarea className="w-full px-3 py-2 bg-paper-0 border border-paper-300 rounded-DEFAULT font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white transition-colors resize-none" id="notes" placeholder="Add a private note regarding this payment..." rows="2" />
</div>
</section>

<section className="p-space-4 bg-paper-100 rounded-lg border border-paper-200 flex items-center justify-between">
<div>
<h3 className="font-title-sm text-title-sm text-ink-900">Mark invoice as paid</h3>
<p className="font-caption text-caption text-ink-500 mt-1">Updates student balance and sends receipt.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-paper-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-paper-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</section>
</div>

<footer className="px-space-6 py-space-4 border-t border-paper-200 bg-surface-bright flex justify-end gap-space-3 shrink-0">
<button className="px-space-4 py-2 rounded-DEFAULT font-label text-label text-ink-700 border border-paper-300 bg-paper-0 hover:bg-paper-100 transition-colors">
                Cancel
            </button>
<button className="px-space-4 py-2 rounded-DEFAULT font-label text-label text-white bg-primary hover:bg-primary-container transition-colors flex items-center gap-space-2">
<span className="material-symbols-outlined text-[18px]">save</span>
                Record Payment
            </button>
</footer>

    </>
  );
};
