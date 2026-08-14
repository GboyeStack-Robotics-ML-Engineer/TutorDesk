import React from 'react';

export const SettingsPaymentDetails = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-gutter-mobile md:p-gutter-desktop">
<div className="max-w-3xl mx-auto w-full pb-space-8">

<div className="mb-space-8">
<h2 className="font-display-md text-display-md text-on-surface mb-space-1">Payment Details</h2>
<p className="font-body text-body text-on-surface-variant">Manage your bank account details, currency, and international payment preferences.</p>
</div>

<div className="flex flex-col gap-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6">
<h3 className="font-title-md text-title-md text-on-surface mb-space-4">Bank Account Details</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">

<div className="flex flex-col gap-space-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="bankName">Bank Name</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-bright border border-paper-300 rounded px-3 py-2.5 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-shadow pr-10" id="bankName">
<option value="gtb">Guaranty Trust Bank (GTB)</option>
<option value="zenith">Zenith Bank</option>
<option value="access">Access Bank</option>
<option value="first">First Bank of Nigeria</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-1 md:col-span-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="accountName">Account Name</label>
<input className="w-full bg-surface-bright border border-paper-300 rounded px-3 py-2.5 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-shadow" id="accountName" type="text" defaultValue="John Doe Academic Services" />
</div>

<div className="flex flex-col gap-space-1 md:col-span-2">
<label className="font-label text-label text-on-surface-variant flex justify-between" htmlFor="accountNumber">
                                    Account Number
                                    <span className="text-caption font-caption text-ink-500">10 digits</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-on-surface-variant">account_balance</span>
<input className="w-full bg-surface-bright border border-paper-300 rounded pl-10 pr-3 py-2.5 font-data-display text-data-display text-on-surface tracking-wider focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-shadow" id="accountNumber" maxlength="10" type="text" defaultValue="0123456789" />
</div>
<p className="font-caption text-caption text-success-solid mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Account verified
                                </p>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6">
<h3 className="font-title-md text-title-md text-on-surface mb-space-4">Currency &amp; Payouts</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">

<div className="flex flex-col gap-space-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="currency">Primary Currency</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-bright border border-paper-300 rounded px-3 py-2.5 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-shadow pr-10" id="currency">
<option value="NGN">Nigerian Naira (₦)</option>
<option value="USD">US Dollar ($)</option>
<option value="GBP">British Pound (£)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="payoutFreq">Payout Frequency</label>
<div className="relative">
<select className="w-full appearance-none bg-surface-bright border border-paper-300 rounded px-3 py-2.5 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-shadow pr-10" id="payoutFreq">
<option value="weekly">Weekly (Fridays)</option>
<option value="biweekly">Bi-weekly</option>
<option value="monthly">Monthly (Last day)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">expand_more</span>
</div>
</div>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6">
<div className="flex items-start justify-between gap-space-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">International Payments</h3>
<p className="font-body text-body text-on-surface-variant max-w-xl">
                                    Accept international payments via Stripe/Paystack routing. 
                                    <span className="block mt-2 p-3 bg-warning-tint text-on-surface rounded border border-warning-solid/20 text-sm">
<span className="font-bold">Note for Nigerian Residents:</span> Funds collected in foreign currencies will be settled in NGN at the prevailing partner bank FX rate, minus a 1.5% processing fee.
                                    </span>
</p>
</div>

<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
<input checked="" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer opacity-0" id="toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" htmlFor="toggle"></label>
</div>
</div>
</section>
</div>

<div className="mt-space-8 pt-space-4 border-t border-paper-200 flex justify-end gap-space-4 items-center sticky bottom-0 bg-surface/90 backdrop-blur pb-space-4 -mb-space-4">
<button className="px-space-4 py-space-2 rounded font-label text-label text-on-surface-variant hover:bg-paper-200 transition-colors">
                        Cancel
                    </button>
<button className="bg-primary text-on-primary px-space-6 py-space-2 rounded font-label text-label hover:bg-primary-fixed-variant shadow-sm transition-all active:scale-95">
                        Save Changes
                    </button>
</div>
</div>
</div>

    </>
  );
};
