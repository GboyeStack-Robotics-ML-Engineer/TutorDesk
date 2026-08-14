import React from 'react';

export const MessagesDesktop = () => {
  return (
    <>
      

<div className="w-full md:w-80 lg:w-96 border-r border-paper-200 bg-paper-50 flex flex-col h-full z-10 flex-shrink-0" id="thread-list">
<div className="p-space-4 border-b border-paper-200 bg-paper-0 flex justify-between items-center shrink-0">
<h2 className="font-title-md text-title-md text-primary">Inbox</h2>
<button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">edit_square</span>
</button>
</div>

<div className="overflow-y-auto flex-1">

<div className="p-space-4 border-b border-paper-200 bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors relative">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div className="flex items-start gap-3">
<img className="w-12 h-12 rounded-full object-cover border border-paper-200" data-alt="A young male student looking attentive. Clean minimalist background, slightly muted colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV-CWq7k0KDs8G2ei4RX4wkOkkeToeazEiIy-B7TvQ5PYxAIDWKzmlNgzY1FZK_Gf5AEfUUDgDKVUqkXjNTX0cKbPOgYCNfimt5dihRgKMLfb3K5MHsg1Y2HzcF0R7j31TPirbUU3AupyiKH_IKT0YKvsLqkUFoWWNLPKpDsoz29IHuYrRkcIzzadUeVWH34DH8vZ7Z5XvsSFogrXXWwMTwsJgqY5DjdIiCgYKfR9yP0uf1990471n" />
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-title-sm text-title-sm text-on-surface truncate">Chidi Okeke</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap">10:42 AM</span>
</div>
<p className="font-body text-body text-ink-900 truncate font-medium">I'm having trouble with the quadratic equations homework.</p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 bg-success-tint text-success-solid rounded-full font-caption text-caption flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">chat</span> WhatsApp
                                    </span>
</div>
</div>
<div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
</div>
</div>

<div className="p-space-4 border-b border-paper-200 bg-paper-0 cursor-pointer hover:bg-surface-container-low transition-colors">
<div className="flex items-start gap-3">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-title-md text-title-md shrink-0">AA</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-title-sm text-title-sm text-on-surface truncate">Amina Alabi (Parent)</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap">Yesterday</span>
</div>
<p className="font-body text-body text-ink-500 truncate">Thank you for the progress report.</p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 bg-surface-container text-ink-700 rounded-full font-caption text-caption flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">sms</span> SMS
                                    </span>
</div>
</div>
</div>
</div>

<div className="p-space-4 border-b border-paper-200 bg-paper-0 cursor-pointer hover:bg-surface-container-low transition-colors">
<div className="flex items-start gap-3">
<img className="w-12 h-12 rounded-full object-cover border border-paper-200" data-alt="A young female student smiling. Warm lighting, modern academic setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgRyEqrWrPP2XhRw_4FmyahbCJb6V2Hk3gS3r475E01JOGc_kw-89a131Bx7-7_4O3-7vWInroZd5W_LE9D6wx19BqG8JKYGhddBF6QiWNTZByB0ck7hwLwk2Vp2DTyYddRRFsSP5aUhKL7KnJV_kz8JGBZWv3FXQumnqhZUewZjFQkWYWRXIOuBsg8Fy-Zd2pxtFyLI3b1_9gmsZUID2LuDEr6OxexVHzVpdxUB1OnB4D6rmnE94O" />
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="font-title-sm text-title-sm text-on-surface truncate">Folake Davies</h3>
<span className="font-caption text-caption text-ink-500 whitespace-nowrap">Tue</span>
</div>
<p className="font-body text-body text-ink-500 truncate">Will we cover organic chemistry next week?</p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 bg-surface-container text-ink-700 rounded-full font-caption text-caption flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">mail</span> Email
                                    </span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="flex-1 bg-paper-0 flex flex-col h-full hidden md:flex" id="active-thread">

<div className="h-16 px-space-4 border-b border-paper-200 flex justify-between items-center bg-paper-0 shrink-0">
<div className="flex items-center gap-3">
<button className="md:hidden text-ink-500 mr-2" id="back-to-list">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<img className="w-10 h-10 rounded-full object-cover border border-paper-200" data-alt="A young male student looking attentive. Clean minimalist background, slightly muted colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3iqOOij18k2AVEl2Xn6pXX0gKos1vm5GktKyfDLWR3eKb8kdgrtea7EkXOjd_NjS1JEaeEdTUZ_mwjb3v09fhXDVEEPx3MSY0CSrYWKXNM_kRpYhkAFDcuTvDByQLznxfUzyovX-2S-daadz62onVG_NWI4slKNGAAHxMBGs827Vlm7ZGeAYS8he53M6GSmpTv-zwQB9JijoG2HTnk5WyC1-IxfoEeeGsZ7QyjlbS2MBD4AS6avrB" />
<div>
<h2 className="font-title-sm text-title-sm text-on-surface">Chidi Okeke</h2>
<p className="font-caption text-caption text-success-solid flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-success-solid inline-block"></span> Active on WhatsApp
                            </p>
</div>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-ink-500 hover:bg-surface-container-low rounded-full transition-colors">
<span className="material-symbols-outlined">call</span>
</button>
<button className="p-2 text-ink-500 hover:bg-surface-container-low rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>

<div className="bg-warning-tint border-b border-paper-200 p-space-2 text-center">
<p className="font-caption text-caption text-warning-solid flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                        Outside standard communication hours. Messages may be queued.
                    </p>
</div>

<div className="flex-1 overflow-y-auto p-space-4 bg-paper-50 flex flex-col gap-space-4">

<div className="flex items-center justify-center my-2">
<div className="bg-paper-200 h-[1px] w-full max-w-[100px]"></div>
<span className="font-caption text-caption text-ink-500 px-4 uppercase tracking-wider">Today</span>
<div className="bg-paper-200 h-[1px] w-full max-w-[100px]"></div>
</div>

<div className="flex justify-center">
<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-3 max-w-sm text-center">
<span className="material-symbols-outlined text-primary mb-1">payments</span>
<p className="font-body text-body text-ink-900">Payment received for 4 sessions (Nov)</p>
<p className="font-caption text-caption text-ink-500 mt-1">9:00 AM</p>
</div>
</div>

<div className="flex items-end gap-2">
<img className="w-8 h-8 rounded-full object-cover shrink-0" data-alt="A young male student looking attentive. Clean minimalist background, slightly muted colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_zqe24fESz_DnxI2FMc94jpkZJ9C-v7rJ8GENxPMZe1A6sGX1ThpfxgxGl-7YwI4mKpwFiSF7nEbZ8LbFTiSfjNIMJrsrYmHecgOxrQl-8kmMcWH83OC05PMWQqHVZ8BcV9zznJKmAGvC5GZUp7QE-0arhfH85DhUFJtNyGA17H55FA0rpuLogCaO9at4Rs1qp_uSyxCRNwmNAXwiwjiJKL2NXn7zLnaKPrA5aukV_MlnIrwx7sGg" />
<div className="bg-paper-0 border border-paper-200 rounded-2xl rounded-bl-sm p-space-3 max-w-[80%] shadow-sm shadow-ink-900/5">
<p className="font-body text-body text-on-surface">Good morning sir.</p>
<span className="font-caption text-caption text-ink-500 mt-1 block text-right">10:40 AM</span>
</div>
</div>

<div className="flex items-end gap-2">
<div className="w-8 h-8 shrink-0"></div> 
<div className="bg-paper-0 border border-paper-200 rounded-2xl rounded-bl-sm p-space-3 max-w-[80%] shadow-sm shadow-ink-900/5">
<p className="font-body text-body text-on-surface">I'm having trouble with the quadratic equations homework from yesterday's class.</p>
<span className="font-caption text-caption text-ink-500 mt-1 block text-right">10:42 AM</span>
</div>
</div>
</div>

<div className="p-space-4 bg-paper-0 border-t border-paper-200 shrink-0">

<div className="flex gap-2 mb-space-3 overflow-x-auto pb-1 no-scrollbar">
<button className="font-label text-label px-3 py-1.5 border border-paper-300 rounded-full text-ink-700 hover:bg-surface-container-low transition-colors whitespace-nowrap">
                            Class Link
                        </button>
<button className="font-label text-label px-3 py-1.5 border border-paper-300 rounded-full text-ink-700 hover:bg-surface-container-low transition-colors whitespace-nowrap">
                            Homework Reminder
                        </button>
<button className="font-label text-label px-3 py-1.5 border border-paper-300 rounded-full text-ink-700 hover:bg-surface-container-low transition-colors whitespace-nowrap">
                            Payment Details
                        </button>
</div>
<div className="flex items-end gap-2 bg-surface-container-low border border-paper-300 rounded-xl p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
<button className="p-2 text-ink-500 hover:text-primary transition-colors shrink-0">
<span className="material-symbols-outlined">attach_file</span>
</button>
<textarea className="flex-1 bg-transparent border-none focus:ring-0 resize-none font-body text-body py-2 max-h-32 min-h-[40px] text-on-surface" placeholder="Type a message..." rows="1" style={{"scrollbarWidth":"thin"}} />
<div className="flex items-center gap-2 shrink-0">

<div className="relative group">
<button className="flex items-center gap-1 p-1.5 bg-success-tint text-success-solid rounded-lg font-caption text-caption hover:bg-success-tint/80 transition-colors">
<span className="material-symbols-outlined text-[16px]">chat</span>
<span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
</button>
</div>

<button className="bg-primary text-white p-2 rounded-lg hover:bg-primary-container transition-colors shadow-sm shadow-primary/20 flex items-center justify-center">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>send</span>
</button>
</div>
</div>
</div>
</div>

    </>
  );
};
