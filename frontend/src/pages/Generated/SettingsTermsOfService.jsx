import React from 'react';

export const SettingsTermsOfService = () => {
  return (
    <>
      
<div className="max-w-[1000px] mx-auto px-gutter-desktop py-space-8 pb-32">


<form className="space-y-space-8">

<section className="grid grid-cols-1 md:grid-cols-12 gap-space-6 items-start">
<div className="md:col-span-4 flex flex-col gap-space-1">
<h2 className="font-title-sm text-title-sm text-on-surface">Cancellation Policy</h2>
<p className="font-body text-body text-on-surface-variant text-sm pr-4">
                                Establish the notice required to cancel a session without penalty, and define the financial consequences for late cancellations.
                            </p>
</div>
<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<div className="space-y-space-6">
<div>
<label className="block font-label text-label text-on-surface mb-space-2">Required Notice Window</label>
<div className="relative w-full max-w-xs">
<select className="w-full appearance-none bg-paper-0 border border-paper-300 rounded-lg px-4 py-2.5 font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container/20 outline-none transition-all pr-10">
<option value="12">12 Hours before session</option>
<option selected="" value="24">24 Hours before session</option>
<option value="48">48 Hours before session</option>
<option value="custom">Custom timeframe...</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
</div>
<p className="font-caption text-caption text-outline-variant mt-2">Cancellations made before this window incur no fees.</p>
</div>
<div className="pt-space-4 border-t border-paper-100">
<label className="block font-label text-label text-on-surface mb-space-2">Late Cancellation Fee</label>
<div className="flex items-center gap-space-3 max-w-md">
<div className="relative w-1/3">
<select className="w-full appearance-none bg-paper-100 border border-transparent rounded-lg px-3 py-2.5 font-body text-body text-on-surface focus:bg-paper-0 focus:border-primary focus:ring-1 focus:ring-primary-container/20 outline-none transition-all pr-8">
<option value="percentage">% Fee</option>
<option value="flat">Flat Fee</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
<div className="relative flex-1">
<input className="w-full pl-4 pr-8 py-2.5 bg-paper-0 border border-paper-300 rounded-lg font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container/20 outline-none transition-all" placeholder="e.g. 50" type="number" defaultValue="50" />
<span className="absolute right-3 top-1/2 -translate-y-1/2 font-data-display text-on-surface-variant pointer-events-none">%</span>
</div>
</div>
</div>
</div>
</div>
</section>
<hr className="border-paper-200" />

<section className="grid grid-cols-1 md:grid-cols-12 gap-space-6 items-start">
<div className="md:col-span-4 flex flex-col gap-space-1">
<h2 className="font-title-sm text-title-sm text-on-surface">Refund Policy</h2>
<p className="font-body text-body text-on-surface-variant text-sm pr-4">
                                Detail your approach to issuing refunds for prepaid packages or single sessions that do not occur.
                            </p>
</div>
<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.04)] space-y-space-6">
<fieldset className="space-y-space-3">
<legend className="font-label text-label text-on-surface mb-space-2">Standard Refund Eligibility</legend>
<label className="flex items-start gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
<input className="peer appearance-none w-5 h-5 border-2 border-outline rounded-full checked:border-primary checked:bg-paper-0 transition-colors cursor-pointer" name="refund_type" type="radio" defaultValue="strict" />
<div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
</div>
<div className="flex flex-col">
<span className="font-body text-body text-on-surface group-hover:text-primary transition-colors">Strict (No Refunds)</span>
<span className="font-caption text-caption text-on-surface-variant">Payments are final. Unused sessions forfeit their value.</span>
</div>
</label>
<label className="flex items-start gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
<input checked="" className="peer appearance-none w-5 h-5 border-2 border-outline rounded-full checked:border-primary checked:bg-paper-0 transition-colors cursor-pointer" name="refund_type" type="radio" defaultValue="moderate" />
<div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
</div>
<div className="flex flex-col">
<span className="font-body text-body text-on-surface group-hover:text-primary transition-colors">Moderate (Partial Refunds)</span>
<span className="font-caption text-caption text-on-surface-variant">Refunds issued minus a processing fee for remaining balance.</span>
</div>
</label>
</fieldset>
<div className="pt-space-4">
<label className="block font-label text-label text-on-surface mb-space-2 flex justify-between">
<span>Exception Clauses (Optional)</span>
<span className="font-caption text-outline">Rich Text</span>
</label>
<div className="border border-paper-300 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary-container/20 transition-all">

<div className="bg-paper-100 border-b border-paper-200 px-3 py-2 flex items-center gap-2">
<button className="p-1 hover:bg-paper-200 rounded text-on-surface-variant" type="button"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
<button className="p-1 hover:bg-paper-200 rounded text-on-surface-variant" type="button"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
<div className="w-px h-4 bg-paper-300 mx-1"></div>
<button className="p-1 hover:bg-paper-200 rounded text-on-surface-variant" type="button"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
</div>
<textarea className="w-full p-4 bg-paper-0 border-none font-body text-body text-on-surface outline-none resize-y placeholder:text-outline" placeholder="E.g., Medical emergencies or documented technical failures..." rows="3" />
</div>
</div>
</div>
</section>
<hr className="border-paper-200" />

<section className="grid grid-cols-1 md:grid-cols-12 gap-space-6 items-start">
<div className="md:col-span-4 flex flex-col gap-space-1">
<h2 className="font-title-sm text-title-sm text-on-surface">Rescheduling Rules</h2>
<p className="font-body text-body text-on-surface-variant text-sm pr-4">
                                Limit how often a student can move a confirmed slot to maintain a predictable calendar.
                            </p>
</div>
<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<label className="block font-label text-label text-on-surface mb-space-2">Maximum Reschedules Allowed</label>
<div className="flex items-center gap-4">
<div className="relative w-32">
<input className="w-full pl-4 pr-4 py-2.5 bg-paper-0 border border-paper-300 rounded-lg font-data-display text-data-display text-on-surface text-center focus:border-primary focus:ring-1 focus:ring-primary-container/20 outline-none transition-all" max="10" min="0" type="number" defaultValue="2" />
</div>
<span className="font-body text-body text-on-surface-variant">per student, per month.</span>
</div>
</div>
</section>
<hr className="border-paper-200" />

<section className="grid grid-cols-1 md:grid-cols-12 gap-space-6 items-start pb-space-8">
<div className="md:col-span-4 flex flex-col gap-space-1">
<h2 className="font-title-sm text-title-sm text-on-surface">Expected Conduct</h2>
<p className="font-body text-body text-on-surface-variant text-sm pr-4">
                                Outline behavioral expectations, equipment requirements, or preparation rules for academic sessions.
                            </p>
</div>
<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<label className="block font-label text-label text-on-surface mb-space-2">Conduct Guidelines</label>
<textarea className="w-full p-4 bg-paper-0 border border-paper-300 rounded-lg font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary-container/20 outline-none transition-all resize-y placeholder:text-outline" placeholder="Define rules around tardiness (e.g., waiting 15 minutes before marking as no-show), required materials, and general classroom decorum..." rows="5" />
<div className="flex items-center gap-2 mt-3 text-ink-500">
<span className="material-symbols-outlined text-[16px]">info</span>
<span className="font-caption text-caption">This text will be appended to the bottom of the service agreement.</span>
</div>
</div>
</section>
</form>
</div>

    </>
  );
};
