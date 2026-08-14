import React from 'react';

export const CreateEditInvoiceDesktop = () => {
  return (
    <>
      

<div className="lg:col-span-8 flex flex-col gap-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 md:p-space-6 flex flex-col gap-space-6 shadow-sm shadow-ink-900/5">
<div className="flex items-center justify-between border-b border-paper-100 pb-space-2">
<h2 className="font-title-md text-title-md text-on-surface m-0 flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                        Client Details
                    </h2>
<span className="font-data-display text-data-display text-on-surface-variant text-sm">#INV-2023-142</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4 md:gap-space-6">

<div className="flex flex-col gap-space-1 md:col-span-2">
<label className="font-label text-label text-on-surface-variant" htmlFor="student-select">Student / Bill To</label>
<div className="relative">
<select className="w-full appearance-none bg-transparent border border-paper-300 rounded-DEFAULT px-space-3 py-space-2 pr-10 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all hover:border-outline" id="student-select">
<option disabled="" selected="" value="">Select an active student or group...</option>
<option value="1">Chidi Okafor (A-Level Math)</option>
<option value="2">Aisha Bello (Physics Tutoring)</option>
<option value="3">Group: UTME Intensive Prep (4 Students)</option>
</select>
<span className="material-symbols-outlined absolute right-space-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="issue-date">Issue Date</label>
<input className="w-full bg-transparent border border-paper-300 rounded-DEFAULT px-space-3 py-space-2 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all hover:border-outline" id="issue-date" type="date" defaultValue="2023-10-26" />
</div>
<div className="flex flex-col gap-space-1">
<label className="font-label text-label text-on-surface-variant" htmlFor="due-date">Due Date</label>
<input className="w-full bg-transparent border border-paper-300 rounded-DEFAULT px-space-3 py-space-2 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all hover:border-outline" id="due-date" type="date" defaultValue="2023-11-02" />
</div>

<div className="flex flex-col gap-space-1 md:col-span-2 pt-space-2">
<label className="font-label text-label text-on-surface-variant">Billing Model</label>
<div className="flex p-1 bg-surface-container-low border border-paper-200 rounded-DEFAULT w-full md:max-w-md">
<button className="flex-1 py-space-1 px-space-2 text-center font-label text-label rounded bg-paper-0 shadow-sm border border-paper-200 text-on-surface transition-colors">One-off</button>
<button className="flex-1 py-space-1 px-space-2 text-center font-label text-label rounded text-on-surface-variant hover:text-on-surface hover:bg-paper-100 transition-colors">Subscription</button>
<button className="flex-1 py-space-1 px-space-2 text-center font-label text-label rounded text-on-surface-variant hover:text-on-surface hover:bg-paper-100 transition-colors">Group Split</button>
</div>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg flex flex-col shadow-sm shadow-ink-900/5 overflow-hidden">
<div className="p-space-4 md:p-space-6 border-b border-paper-100 flex justify-between items-center bg-surface-bright">
<h2 className="font-title-md text-title-md text-on-surface m-0 flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">receipt_long</span>
                        Services Rendered
                    </h2>
</div>

<div className="hidden md:grid grid-cols-12 gap-space-4 px-space-6 py-space-2 bg-surface-container-low border-b border-paper-100 font-label text-label text-on-surface-variant">
<div className="col-span-5">Description &amp; Subject</div>
<div className="col-span-2 text-right">Qty / Hrs</div>
<div className="col-span-3 text-right">Rate (₦)</div>
<div className="col-span-2 text-right">Amount</div>
</div>
<div className="flex flex-col" id="line-items-container">

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 px-space-4 md:px-space-6 py-space-4 border-b border-paper-100 items-start group hover:bg-surface-container-lowest transition-colors relative">

<div className="md:col-span-5 flex flex-col gap-1">
<label className="md:hidden font-label text-label text-primary">Item Description</label>
<input className="w-full bg-transparent border-b border-transparent hover:border-paper-300 focus:border-primary px-0 py-1 font-body text-body text-on-surface focus:outline-none transition-colors placeholder:text-on-surface-variant/50" placeholder="e.g., Physics Tutoring" type="text" defaultValue="A-Level Mathematics - October Intensive" />
<input className="w-full bg-transparent border-b border-transparent hover:border-paper-300 focus:border-primary px-0 py-1 font-caption text-caption text-on-surface-variant focus:outline-none transition-colors placeholder:text-on-surface-variant/40" placeholder="Additional details (optional)" type="text" defaultValue="Covers Calculus and Trigonometry modules" />
</div>

<div className="grid grid-cols-2 md:contents gap-space-4">

<div className="md:col-span-2 flex flex-col gap-1 items-start md:items-end">
<label className="md:hidden font-label text-label text-on-surface-variant">Quantity (Hrs)</label>
<input className="w-full md:w-20 bg-surface-container-low md:bg-transparent border border-paper-200 md:border-transparent md:border-b hover:border-paper-300 focus:border-primary rounded md:rounded-none px-space-2 md:px-0 py-1 font-data-display text-data-display text-on-surface text-left md:text-right focus:outline-none transition-colors" min="0" type="number" defaultValue="12" />
</div>

<div className="md:col-span-3 flex flex-col gap-1 items-start md:items-end">
<label className="md:hidden font-label text-label text-on-surface-variant">Rate (₦)</label>
<div className="flex items-center w-full md:justify-end group-focus-within:text-primary">
<span className="font-data-display text-data-display text-on-surface-variant mr-1 md:hidden">₦</span>
<input className="w-full md:w-28 bg-surface-container-low md:bg-transparent border border-paper-200 md:border-transparent md:border-b hover:border-paper-300 focus:border-primary rounded md:rounded-none px-space-2 md:px-0 py-1 font-data-display text-data-display text-on-surface text-left md:text-right focus:outline-none transition-colors" step="500" type="number" defaultValue="5500" />
</div>
</div>
</div>

<div className="md:col-span-2 flex flex-col gap-1 items-start md:items-end justify-start md:justify-start pt-1 md:pt-0 border-t border-paper-100 md:border-none mt-2 md:mt-0">
<label className="md:hidden font-label text-label text-on-surface-variant">Total Amount</label>
<div className="font-data-display text-data-display text-on-surface font-medium whitespace-nowrap bg-success-tint/30 md:bg-transparent px-2 py-1 md:p-0 rounded text-right w-full md:w-auto">
                                 66,000.00
                             </div>
</div>

<button className="absolute top-space-4 right-space-4 md:static md:absolute md:-right-8 md:top-1/2 md:-translate-y-1/2 text-on-surface-variant hover:text-danger-solid transition-colors p-1 rounded-full hover:bg-danger-tint opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100" title="Remove line item">
<span className="material-symbols-outlined text-[20px]">delete</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-4 px-space-4 md:px-space-6 py-space-4 border-b border-paper-100 items-start group hover:bg-surface-container-lowest transition-colors relative opacity-60 focus-within:opacity-100">
<div className="md:col-span-5 flex flex-col gap-1">
<input className="w-full bg-transparent border-b border-transparent hover:border-paper-300 focus:border-primary px-0 py-1 font-body text-body text-on-surface focus:outline-none transition-colors placeholder:text-on-surface-variant/70" placeholder="Add another item..." type="text" />
</div>

<div className="hidden md:block col-span-2"></div>
<div className="hidden md:block col-span-3"></div>
<div className="hidden md:block col-span-2"></div>
</div>
</div>
<div className="p-space-4 md:p-space-6 bg-surface-bright flex justify-center md:justify-start">
<button className="flex items-center gap-1 text-primary font-label text-label hover:text-primary-container transition-colors px-space-3 py-space-2 rounded-DEFAULT hover:bg-surface-container border border-dashed border-primary/30 hover:border-primary/60">
<span className="material-symbols-outlined text-[18px]">add</span> Add Line Item
                    </button>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 md:p-space-6 flex flex-col gap-space-6 shadow-sm shadow-ink-900/5">
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
<div className="flex flex-col gap-space-2">
<label className="font-label text-label text-on-surface-variant flex items-center gap-1" htmlFor="invoice-notes">
<span className="material-symbols-outlined text-[16px]">edit_note</span> Notes to Client
                        </label>
<textarea className="w-full bg-surface-container-low border border-paper-200 rounded-DEFAULT px-space-3 py-space-2 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-y placeholder:text-on-surface-variant/50 transition-colors hover:border-paper-300" id="invoice-notes" placeholder="Thank you for your continuous engagement. Looking forward to our next session." rows="3" />
</div>
<div className="flex flex-col gap-space-2">
<label className="font-label text-label text-on-surface-variant flex items-center gap-1" htmlFor="invoice-terms">
<span className="material-symbols-outlined text-[16px]">gavel</span> Terms &amp; Conditions
                        </label>
<textarea className="w-full bg-surface-container-low border border-paper-200 rounded-DEFAULT px-space-3 py-space-2 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-y placeholder:text-on-surface-variant/50 transition-colors hover:border-paper-300" id="invoice-terms" rows="3" defaultValue="Payment is due within 7 days of invoice date. Late payments may incur a 5% fee." />
</div>
</div>
</section>
</div>

<aside className="lg:col-span-4 sticky top-[100px] flex flex-col gap-space-4">
<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 flex flex-col gap-space-6 shadow-sm shadow-ink-900/5 relative overflow-hidden">

<div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
<h3 className="font-title-md text-title-md text-on-surface border-b border-paper-100 pb-space-2 m-0">Payment Summary</h3>
<div className="flex flex-col gap-space-3 font-data-display text-data-display">
<div className="flex justify-between items-center text-on-surface-variant">
<span className="font-body text-body">Subtotal</span>
<span>₦ 66,000.00</span>
</div>
<div className="flex justify-between items-center group cursor-pointer transition-colors hover:bg-surface-container-low -mx-2 px-2 py-1 rounded">
<span className="font-body text-body text-primary border-b border-dashed border-primary/50 group-hover:border-primary">Add Discount</span>
<span className="text-on-surface-variant group-hover:text-primary">₦ 0.00</span>
</div>
<div className="flex justify-between items-center group cursor-pointer transition-colors hover:bg-surface-container-low -mx-2 px-2 py-1 rounded">
<span className="font-body text-body text-primary border-b border-dashed border-primary/50 group-hover:border-primary">Add Tax (VAT)</span>
<span className="text-on-surface-variant group-hover:text-primary">₦ 0.00</span>
</div>
</div>
<div className="border-t border-paper-200 pt-space-4 flex justify-between items-end">
<span className="font-title-sm text-title-sm text-on-surface pb-1">Total Due</span>
<span className="font-title-lg text-title-lg text-primary font-data-display leading-none tracking-tight">₦ 66,000.00</span>
</div>

<div className="bg-success-tint/40 rounded-DEFAULT p-space-3 border border-success-solid/20 flex gap-space-3 items-start mt-space-2">
<div className="mt-0.5 text-success-solid"><span className="material-symbols-outlined text-[20px]">account_balance</span></div>
<div className="flex-1">
<div className="flex justify-between items-center mb-1">
<h4 className="font-label text-label text-on-surface m-0">Attach Bank Details</h4>

<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-8 h-4 bg-paper-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-success-solid"></div>
</label>
</div>
<p className="font-caption text-caption text-on-surface-variant m-0 leading-tight">Your default payout account (GTBank ending in 4021) will be included in the footer.</p>
</div>
</div>
</div>

<div className="flex flex-col gap-space-3">
<button className="w-full bg-primary text-on-primary font-label text-label px-space-4 py-space-3 rounded-DEFAULT hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none">
<span className="material-symbols-outlined text-[18px]">mail</span> Save &amp; Send via Email
                </button>
<button className="w-full bg-[#25D366] text-white font-label text-label px-space-4 py-space-3 rounded-DEFAULT hover:bg-[#1EBE5A] transition-colors flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] focus:outline-none">
<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                    Send via WhatsApp
                </button>
</div>

<p className="font-caption text-caption text-on-surface-variant text-center mt-2 px-4">
                Invoices are generated using tabular layout standards for clear financial reconciliation.
            </p>
</aside>

    </>
  );
};
