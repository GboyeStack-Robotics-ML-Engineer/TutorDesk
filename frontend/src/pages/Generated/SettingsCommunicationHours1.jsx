import React from 'react';

export const SettingsCommunicationHours1 = () => {
  return (
    <>
      
<div className="mb-space-8">
<div className="flex items-center gap-2 text-on-surface-variant mb-2">
<a className="font-label text-label hover:text-primary" href="#">Settings</a>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="font-label text-label text-primary">Communication Hours</span>
</div>
<h2 className="font-display-md text-display-md text-on-surface mb-2">Communication Hours</h2>
<p className="font-body text-body text-on-surface-variant max-w-2xl">Manage when students can expect a response from you, and configure automated replies for off-hours inquiries.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6 items-start">

<div className="lg:col-span-7 flex flex-col gap-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_4px_rgba(22,33,30,0.02)]">
<div className="flex items-center justify-between mb-space-6 border-b border-paper-200 pb-space-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Weekly Availability</h3>
<p className="font-caption text-caption text-on-surface-variant mt-1">Set your standard response windows.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
<span className="ml-3 font-label text-label text-on-surface">Enable Hours</span>
</label>
</div>
<div className="flex flex-col gap-space-4">

<div className="grid grid-cols-12 gap-4 items-center">
<div className="col-span-4 sm:col-span-3">
<span className="font-label text-label text-on-surface">Weekdays</span>
<p className="font-caption text-caption text-on-surface-variant">Mon - Fri</p>
</div>
<div className="col-span-8 sm:col-span-9 flex items-center gap-2">
<div className="relative flex-1">
<input className="w-full bg-surface-container-low border border-paper-300 rounded focus:ring-1 focus:ring-primary focus:border-primary font-data-display text-data-display px-3 py-2 text-on-surface" type="time" defaultValue="09:00" />
</div>
<span className="font-body text-body text-on-surface-variant px-1">to</span>
<div className="relative flex-1">
<input className="w-full bg-surface-container-low border border-paper-300 rounded focus:ring-1 focus:ring-primary focus:border-primary font-data-display text-data-display px-3 py-2 text-on-surface" type="time" defaultValue="17:00" />
</div>
<button className="text-on-surface-variant hover:text-danger-solid p-2 ml-1">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>

<div className="grid grid-cols-12 gap-4 items-center opacity-60 hover:opacity-100 transition-opacity">
<div className="col-span-4 sm:col-span-3">
<span className="font-label text-label text-on-surface">Saturday</span>
</div>
<div className="col-span-8 sm:col-span-9 flex items-center gap-2">
<button className="w-full bg-surface border border-dashed border-paper-300 rounded font-label text-label text-on-surface-variant py-2 flex justify-center items-center gap-2 hover:border-primary hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">add</span> Add Hours
                                    </button>
</div>
</div>

<div className="grid grid-cols-12 gap-4 items-center opacity-60 hover:opacity-100 transition-opacity">
<div className="col-span-4 sm:col-span-3">
<span className="font-label text-label text-on-surface">Sunday</span>
</div>
<div className="col-span-8 sm:col-span-9 flex items-center gap-2">
<button className="w-full bg-surface border border-dashed border-paper-300 rounded font-label text-label text-on-surface-variant py-2 flex justify-center items-center gap-2 hover:border-primary hover:text-primary transition-colors">
<span className="material-symbols-outlined text-[18px]">add</span> Add Hours
                                    </button>
</div>
</div>
</div>
<div className="mt-space-6 flex items-start gap-3 bg-surface-container-low p-4 rounded-lg border border-paper-200">
<span className="material-symbols-outlined text-primary mt-0.5">info</span>
<div>
<p className="font-label text-label text-on-surface mb-1">Timezone Handling</p>
<p className="font-caption text-caption text-on-surface-variant">Hours are based on your current timezone (WAT). Students will see these hours converted to their local time automatically.</p>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_4px_rgba(22,33,30,0.02)]">
<div className="flex items-center justify-between mb-space-6 border-b border-paper-200 pb-space-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Out of Office Auto-Reply</h3>
<p className="font-caption text-caption text-on-surface-variant mt-1">Message sent automatically outside active hours.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
<span className="ml-3 font-label text-label text-on-surface">Enable Reply</span>
</label>
</div>
<div className="flex flex-col gap-space-4">
<div className="flex flex-col gap-1">
<label className="font-label text-label text-on-surface">Message Subject</label>
<input className="w-full bg-surface-container-low border border-paper-300 rounded focus:ring-1 focus:ring-primary focus:border-primary font-body text-body px-3 py-2 text-on-surface" type="text" defaultValue="Thanks for reaching out! (Out of Office)" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label text-label text-on-surface flex justify-between">
<span>Message Body</span>
<span className="text-on-surface-variant font-caption">Use {NextAvailable} to insert next active time</span>
</label>
<textarea className="w-full bg-surface-container-low border border-paper-300 rounded focus:ring-1 focus:ring-primary focus:border-primary font-body text-body px-3 py-2 text-on-surface resize-none" rows="4" defaultValue="Hello! 

Thanks for your message. I am currently outside of my standard communication hours. I will review your inquiry and get back to you by {NextAvailable}. 

For urgent technical issues regarding an upcoming session, please refer to the Resource Hub.

Best,
Professor" />
</div>
</div>
</section>

<div className="flex justify-end gap-3 pt-space-2">
<button className="px-6 py-2 border border-paper-300 rounded bg-paper-0 text-on-surface font-title-sm text-title-sm hover:bg-surface-container-low transition-colors">Discard Changes</button>
<button className="px-6 py-2 bg-primary text-on-primary rounded font-title-sm text-title-sm hover:bg-opacity-90 transition-colors shadow-sm">Save Preferences</button>
</div>
</div>

<div className="lg:col-span-5 sticky top-24">
<h3 className="font-title-sm text-title-sm text-on-surface-variant mb-space-4 flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">visibility</span>
                        Student Portal Preview
                    </h3>
<div className="bg-surface-dim rounded-xl p-space-4 sm:p-space-6 border border-paper-200">

<div className="bg-paper-0 rounded-lg border border-paper-300 shadow-sm overflow-hidden flex flex-col h-[400px]">

<div className="bg-surface-container-low p-4 border-b border-paper-200 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a female academic tutor in her late 30s, smiling warmly, wearing a neat blouse, set against a bright, minimalist office background with soft natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB45czMp3vACyu3_AjXlKA9ShFyo1L9xoAd7RXaA_N4z7_8VFcSd_HHAnZvOMWrlcd_hrK3PwXzuTYKoUtauQ7FuZbgHUMgcrA9-olAsvsSB_2-FxITs5qQEsW916VJFTkLeMT95d4zAhz7kLPWYoDhGAqJaSzrIWQQlL4Svihp7LPWQgmfYsFXSNCX6vaLv_FrfPmZ6e4CMQeN6c0TVM7NiRDldcIX8fqihnfmyrCJsoup0zqKJF4" />
</div>
<div>
<p className="font-title-sm text-title-sm text-on-surface">Prof. Adebayo</p>
<div className="flex items-center gap-1.5 mt-0.5">
<div className="w-2 h-2 rounded-full bg-outline"></div>
<p className="font-caption text-caption text-on-surface-variant">Away</p>
</div>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
</div>

<div className="flex-1 p-4 bg-surface flex flex-col gap-4 overflow-y-auto">
<div className="flex flex-col items-center my-2">
<span className="bg-paper-200 text-on-surface-variant px-3 py-1 rounded-full font-caption text-caption">Today, 7:30 PM</span>
</div>

<div className="flex justify-end">
<div className="bg-tertiary-container text-on-tertiary-container rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%]">
<p className="font-body text-body text-[14px]">Hi Professor, I had a quick question about the assignment due on Friday. Do we need to include primary sources for the second section?</p>
</div>
</div>

<div className="flex justify-start">
<div className="flex gap-2 max-w-[85%]">
<div className="w-6 h-6 rounded-full bg-primary-container shrink-0 mt-1 flex items-center justify-center text-on-primary-container font-label text-[10px]">
<span className="material-symbols-outlined text-[14px]">smart_toy</span>
</div>
<div className="bg-surface-container-highest text-on-surface rounded-2xl rounded-tl-none px-4 py-2.5">
<p className="font-label text-label text-primary mb-1 border-b border-outline-variant pb-1">Automated Reply</p>
<p className="font-body text-body text-[14px] whitespace-pre-wrap">Hello! 

Thanks for your message. I am currently outside of my standard communication hours. I will review your inquiry and get back to you by <strong className="font-title-sm">Tomorrow at 9:00 AM</strong>. 

For urgent technical issues regarding an upcoming session, please refer to the Resource Hub.

Best,
Professor</p>
</div>
</div>
</div>
</div>

<div className="p-3 border-t border-paper-200 bg-surface-container-low flex items-center gap-2">
<div className="flex-1 bg-surface border border-paper-300 rounded-full px-4 py-2 flex items-center justify-between opacity-70">
<span className="font-body text-body text-on-surface-variant text-[14px]">Type a message...</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">send</span>
</div>
</div>
</div>

<div className="mt-space-4 flex items-start gap-3 bg-surface p-3 rounded border border-paper-300 border-l-4 border-l-warning-solid">
<span className="material-symbols-outlined text-warning-solid text-[20px] mt-0.5">schedule</span>
<p className="font-caption text-caption text-on-surface-variant">
                                During offline hours, your profile badge changes from <span className="text-success-solid font-label">Active</span> to <span className="text-outline font-label">Away</span>, setting clear expectations before students even open the chat.
                            </p>
</div>
</div>
</div>
</div>

    </>
  );
};
