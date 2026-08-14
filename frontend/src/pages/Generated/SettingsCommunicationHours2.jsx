import React from 'react';

export const SettingsCommunicationHours2 = () => {
  return (
    <>
      

<div className="flex flex-col gap-space-2">
<h2 className="font-display-md text-display-md text-ink-900 tracking-tight">Communication Hours</h2>
<p className="font-body text-body text-ink-500 max-w-2xl">Define when students can expect replies and manage automated responses for off-hours inquiries. Changes save automatically.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6">

<div className="lg:col-span-8 flex flex-col gap-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6">
<div className="flex justify-between items-start mb-space-6">
<div>
<h3 className="font-title-md text-title-md text-ink-900 mb-1">Weekly Availability</h3>
<p className="font-body text-body text-ink-500">Set your standard response windows.</p>
</div>

<div className="flex items-center gap-2 bg-surface-container-low border border-paper-200 rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-ink-500 text-sm">schedule</span>
<select className="bg-transparent border-none p-0 m-0 font-label text-label text-ink-700 focus:ring-0 cursor-pointer">
<option>WAT (UTC+1) Lagos</option>
<option>GMT (UTC+0) London</option>
</select>
</div>
</div>

<div className="flex flex-col gap-space-4">

<div className="flex items-center gap-4 py-2 border-b border-paper-100 last:border-0">
<div className="w-24 flex items-center gap-2">
<input checked="" className="rounded border-paper-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-900">Mon</span>
</div>
<div className="flex-1 flex items-center gap-2">
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label">-</span>
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="17:00" />
</div>
<button className="text-ink-500 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>

<div className="flex items-center gap-4 py-2 border-b border-paper-100 last:border-0">
<div className="w-24 flex items-center gap-2">
<input checked="" className="rounded border-paper-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-900">Tue</span>
</div>
<div className="flex-1 flex items-center gap-2">
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label">-</span>
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="17:00" />
</div>
<button className="text-ink-500 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>

<div className="flex items-start gap-4 py-2 border-b border-paper-100 last:border-0">
<div className="w-24 flex items-center gap-2 mt-1.5">
<input checked="" className="rounded border-paper-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-900">Wed</span>
</div>
<div className="flex-1 flex flex-col gap-2">
<div className="flex items-center gap-2">
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label">-</span>
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="13:00" />
<button className="text-ink-500 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>
<div className="flex items-center gap-2">
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="15:00" />
<span className="text-ink-500 font-label">-</span>
<input className="border border-paper-200 rounded-md font-data-display text-data-display text-ink-700 px-2 py-1 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed w-28" type="time" defaultValue="19:00" />
<button className="text-ink-500 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>
<button className="flex items-center gap-1 text-primary font-label text-label w-max mt-1 hover:text-primary-container"><span className="material-symbols-outlined text-sm">add</span> Add hours</button>
</div>
</div>

<div className="flex items-center gap-4 py-2 border-b border-paper-100 last:border-0 opacity-60">
<div className="w-24 flex items-center gap-2">
<input className="rounded border-paper-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-700">Sat</span>
</div>
<div className="flex-1 font-label text-label text-ink-500 italic">
                                    Unavailable
                                </div>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6">
<div className="flex justify-between items-start mb-space-4 border-b border-paper-100 pb-4">
<div>
<h3 className="font-title-md text-title-md text-ink-900 mb-1">Out of Office Auto-Reply</h3>
<p className="font-body text-body text-ink-500">Automatically respond to messages received outside your set hours.</p>
</div>

<div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in mt-1">
<input checked="" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-primary z-10 transition-all duration-200" id="toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary cursor-pointer transition-all duration-200" htmlFor="toggle"></label>
</div>
</div>
<div className="flex flex-col gap-space-2 mt-4">
<label className="font-label text-label text-ink-700">Message Template</label>
<textarea className="w-full border border-paper-200 rounded-lg p-3 font-body text-body text-ink-900 focus:border-primary focus:ring-1 focus:ring-tertiary-fixed placeholder:text-outline-variant resize-none" rows="4" defaultValue="Hello! Thanks for reaching out. I'm currently away from my desk or it's outside my standard communication hours. I typically review and respond to messages within 24 hours on business days. If this is regarding an upcoming session today, please check the 'Resources' tab for any immediate materials." />
<div className="flex justify-between items-center mt-1">
<span className="font-caption text-caption text-ink-500">Supported variables: {StudentName}, {NextSessionTime}</span>
<button className="font-label text-label text-primary hover:text-primary-container border border-primary px-3 py-1 rounded-md transition-colors">Test Auto-Reply</button>
</div>
</div>
</section>
</div>

<div className="lg:col-span-4 flex flex-col gap-space-6">

<section className="bg-surface-container-low border border-paper-200 rounded-lg p-space-6 sticky top-24">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 flex items-center gap-2">
<span className="material-symbols-outlined text-ink-500 text-lg">visibility</span>
                            Student Portal Preview
                        </h3>
<div className="bg-paper-0 border border-paper-200 rounded-lg p-4 shadow-sm mb-4">
<div className="flex items-center gap-3 mb-3 pb-3 border-b border-paper-100">
<div className="relative">
<img alt="Tutor Avatar Mini" className="w-10 h-10 rounded-full object-cover border border-paper-200" data-alt="Small circular avatar, professional tutor, well-lit, academic background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjE-LGxUSNQjIjt5a1_rEPMMYS78d8qMyxdhKDuXTraT6tmUl44y8Y927mMn-IhNoj17ed4l-WZxdCFw9EPrirQDo-v6Kwse_11o_Sqf-RPQLoZAZilj_xRCNJH3Pkok5pRdsyVkY2aH7m5zG8OcdnqWDUYcHn9ST2pxfAyQK-An25pkjN48-YfxMiKZHkJ_KEjdhxI_IqukheH70CKr90vwYAyPgPKZi7jJOBX3Nh0qzNYllv_RoL" />

<div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success-solid border-2 border-paper-0"></div>
</div>
<div>
<p className="font-title-sm text-title-sm text-ink-900">Dr. Sarah Jenkins</p>
<p className="font-caption text-caption text-success-solid flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">schedule</span>
                                        Available now
                                    </p>
</div>
</div>
<div className="bg-surface-container-lowest border border-paper-100 rounded-md p-3">
<p className="font-caption text-caption text-ink-500 mb-1 uppercase tracking-wider">Today's Hours</p>
<p className="font-data-display text-data-display text-ink-900">09:00 - 17:00 WAT</p>
</div>
</div>
<div className="bg-warning-tint border border-warning-solid/20 rounded-lg p-4 flex gap-3">
<span className="material-symbols-outlined text-warning-solid text-xl mt-0.5">info</span>
<div>
<p className="font-label text-label text-on-secondary-container mb-1">Timezone Notice</p>
<p className="font-caption text-caption text-on-secondary-container/80">Students see your availability automatically converted to their local timezone.</p>
</div>
</div>
</section>
</div>
</div>

    </>
  );
};
