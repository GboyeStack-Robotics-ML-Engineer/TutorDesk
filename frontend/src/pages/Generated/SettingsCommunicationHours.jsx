import React from 'react';

export const SettingsCommunicationHours = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto pt-24 pb-32 md:pb-16 px-gutter-mobile md:px-gutter-desktop">
<div className="max-w-4xl mx-auto space-y-space-8">

<div>
<h2 className="font-display-md text-display-md text-on-background mb-space-2">Communication Hours</h2>
<p className="font-body text-body text-ink-500 max-w-2xl">Define when students and parents can expect a response. Messages received outside these hours will be queued according to your preferences.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6 items-start">

<div className="lg:col-span-2 space-y-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden">
<div className="px-space-6 py-space-4 border-b border-paper-200 bg-paper-50 flex justify-between items-center">
<h3 className="font-title-md text-title-md text-on-background flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="schedule">schedule</span>
                                        Response Window
                                    </h3>
<span className="px-2 py-1 bg-success-tint text-success-solid font-label text-caption rounded-full flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span>
                                        Active
                                    </span>
</div>
<div className="p-space-6 space-y-space-4">

<div className="flex flex-col sm:flex-row sm:items-center gap-space-4 pb-space-4 border-b border-paper-100">
<div className="w-32 flex items-center gap-3">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-9 h-5 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
<span className="font-label text-label text-on-background">Monday</span>
</div>
<div className="flex-1 flex items-center gap-3">
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label text-label">to</span>
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="17:00" />
<button className="p-2 text-ink-500 hover:text-danger-solid transition-colors" title="Remove interval">
<span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
</button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center gap-space-4 pb-space-4 border-b border-paper-100">
<div className="w-32 flex items-center gap-3">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-9 h-5 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
<span className="font-label text-label text-on-background">Tuesday</span>
</div>
<div className="flex-1 flex items-center gap-3">
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label text-label">to</span>
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="17:00" />
<button className="p-2 text-ink-500 hover:text-danger-solid transition-colors" title="Remove interval">
<span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
</button>
</div>
</div>

<div className="flex flex-col sm:flex-row items-start gap-space-4 pb-space-4 border-b border-paper-100">
<div className="w-32 flex items-center gap-3 mt-2">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-9 h-5 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
<span className="font-label text-label text-on-background">Wednesday</span>
</div>
<div className="flex-1 space-y-3 w-full">
<div className="flex items-center gap-3 w-full">
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="09:00" />
<span className="text-ink-500 font-label text-label">to</span>
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="12:00" />
<button className="p-2 text-ink-500 hover:text-danger-solid transition-colors" title="Remove interval">
<span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
</button>
</div>
<div className="flex items-center gap-3 w-full">
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="14:00" />
<span className="text-ink-500 font-label text-label">to</span>
<input className="flex-1 bg-paper-50 border border-paper-200 text-on-background font-data-display text-data-display rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-2" type="time" defaultValue="18:00" />
<button className="p-2 text-ink-500 hover:text-danger-solid transition-colors" title="Remove interval">
<span className="material-symbols-outlined text-[20px]" data-icon="close">close</span>
</button>
</div>
<button className="text-primary font-label text-label flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-[16px]" data-icon="add">add</span> Add hours
                                            </button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center gap-space-4">
<div className="w-32 flex items-center gap-3">
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-9 h-5 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
<span className="font-label text-label text-ink-500">Saturday</span>
</div>
<div className="flex-1 flex items-center gap-3">
<span className="text-ink-500 font-body text-body italic">Unavailable</span>
</div>
</div>
</div>
</div>
</div>

<div className="space-y-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden">
<div className="px-space-6 py-space-4 border-b border-paper-200 bg-paper-50">
<h3 className="font-title-md text-title-md text-on-background flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="inbox">inbox</span>
                                        Off-Hours Handling
                                    </h3>
</div>
<div className="p-space-6 space-y-space-6">
<div className="flex items-start gap-4">
<div className="mt-1">
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-paper-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div>
<h4 className="font-title-sm text-title-sm text-on-background">Queue outside hours</h4>
<p className="font-body text-body text-ink-500 text-sm mt-1">Messages are held in your inbox. Senders receive an auto-reply setting expectations.</p>
</div>
</div>
<div className="border-t border-paper-100 pt-space-4">
<label className="block font-label text-label text-on-background mb-space-2">Auto-Reply Message</label>
<div className="relative">
<textarea className="w-full bg-paper-50 border border-paper-200 text-on-background font-body text-body rounded-lg focus:ring-1 focus:ring-primary focus:border-primary p-3 resize-none" rows="4" defaultValue="Hello! Thanks for reaching out. 

I'm currently outside my regular communication hours. I've received your message and will review it when I'm back at my desk. 

Best regards." />
<div className="absolute bottom-2 right-2 text-ink-500 font-caption text-caption">203/500</div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-xl p-space-6">
<h4 className="font-title-sm text-title-sm text-on-background mb-space-4 flex items-center gap-2">
<span className="material-symbols-outlined text-ink-500" data-icon="visibility">visibility</span>
                                    Student View
                                </h4>
<div className="bg-paper-0 border border-paper-200 rounded-lg p-4 relative">

<div className="absolute -left-2 top-4 w-4 h-4 bg-paper-0 border-l border-t border-paper-200 transform -rotate-45"></div>
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-primary text-[18px]" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-caption text-ink-500">Automated Response</span>
</div>
<p className="font-body text-body text-on-background text-sm whitespace-pre-wrap">Hello! Thanks for reaching out. 

I'm currently outside my regular communication hours. I've received your message and will review it when I'm back at my desk.</p>
</div>
</div>
</div>
</div>

<div className="flex justify-end gap-space-4 pt-space-6 border-t border-paper-200">
<button className="px-space-6 py-2 rounded-lg font-label text-label text-primary hover:bg-surface-container-low border border-transparent transition-colors">
                            Discard Changes
                        </button>
<button className="px-space-6 py-2 rounded-lg font-label text-label bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm">
                            Save Configuration
                        </button>
</div>
</div>
</div>

    </>
  );
};
