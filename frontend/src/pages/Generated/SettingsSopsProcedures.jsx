import React from 'react';

export const SettingsSopsProcedures = () => {
  return (
    <>
      

<div className="hidden md:flex justify-between items-center px-gutter-desktop w-full h-16 fixed top-0 right-0 left-64 z-40 bg-background border-b border-paper-200">
<div className="flex items-center gap-space-4">
<div className="flex items-center gap-space-2 text-ink-500 hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined text-[20px]">arrow_back</span>
<span className="font-label text-label">Settings</span>
</div>
<div className="w-px h-6 bg-paper-200"></div>
<span className="font-label text-label text-primary font-bold">Standard Operating Procedures</span>
</div>
<div className="flex items-center gap-space-4">
<button className="p-space-2 rounded-full hover:bg-surface-container-low transition-colors text-ink-500 group">
<span className="material-symbols-outlined group-active:opacity-70 transition-opacity">sync</span>
</button>
<button className="p-space-2 rounded-full hover:bg-surface-container-low transition-colors text-ink-500 group relative">
<span className="material-symbols-outlined group-active:opacity-70 transition-opacity">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-solid"></span>
</button>
<button className="p-space-2 rounded-full hover:bg-surface-container-low transition-colors text-ink-500 group">
<span className="material-symbols-outlined group-active:opacity-70 transition-opacity">account_circle</span>
</button>
</div>
</div>

<div className="flex-1 overflow-y-auto md:pt-16 p-gutter-mobile md:p-gutter-desktop">
<div className="max-w-[1000px] mx-auto flex flex-col gap-space-6">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-4 mb-space-4">
<div>
<h1 className="font-display-md text-display-md text-on-background mb-space-2">Practice Manual</h1>
<p className="font-body text-body text-ink-500 max-w-2xl">Define and standardize your operational procedures to ensure consistent quality across all client interactions. These documents serve as your practice's internal truth.</p>
</div>
<button className="self-start md:self-auto bg-primary text-on-primary font-label text-label px-space-4 py-space-3 rounded-DEFAULT hover:bg-surface-tint transition-colors flex items-center gap-space-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">add</span>
                        New Procedure
                    </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-space-6">

<div className="md:col-span-4 flex flex-col gap-space-4">
<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 shadow-[0_2px_8px_rgba(22,33,30,0.06)]">
<h2 className="font-title-sm text-title-sm text-on-background mb-space-4 flex items-center gap-space-2">
<span className="material-symbols-outlined text-primary text-[20px]">library_books</span>
                                Categories
                            </h2>
<ul className="flex flex-col gap-space-1">
<li>
<button className="w-full text-left flex items-center justify-between px-space-3 py-space-2 rounded-DEFAULT bg-surface-container-low text-primary font-label text-label border border-paper-200">
<span>Enquiry &amp; Onboarding</span>
<span className="bg-paper-0 px-2 py-0.5 rounded-full text-[11px] border border-paper-200">3 Docs</span>
</button>
</li>
<li>
<button className="w-full text-left flex items-center justify-between px-space-3 py-space-2 rounded-DEFAULT hover:bg-surface-container-lowest text-ink-700 font-label text-label transition-colors">
<span>Payment Reconciliation</span>
<span className="bg-surface-container-high px-2 py-0.5 rounded-full text-[11px]">1 Doc</span>
</button>
</li>
<li>
<button className="w-full text-left flex items-center justify-between px-space-3 py-space-2 rounded-DEFAULT hover:bg-surface-container-lowest text-ink-700 font-label text-label transition-colors">
<span>Classroom Protocol</span>
<span className="bg-surface-container-high px-2 py-0.5 rounded-full text-[11px]">2 Docs</span>
</button>
</li>
<li>
<button className="w-full text-left flex items-center justify-between px-space-3 py-space-2 rounded-DEFAULT hover:bg-surface-container-lowest text-ink-700 font-label text-label transition-colors">
<span>Complaint Resolution</span>
<span className="bg-surface-container-high px-2 py-0.5 rounded-full text-[11px]">1 Doc</span>
</button>
</li>
</ul>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4">
<div className="flex items-center gap-space-3 mb-space-3">
<div className="w-8 h-8 rounded-full bg-success-tint flex items-center justify-center text-success-solid">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
</div>
<div>
<p className="font-label text-label text-ink-900">System Synced</p>
<p className="font-caption text-caption text-ink-500">Last updated 2m ago</p>
</div>
</div>
</div>
</div>

<div className="md:col-span-8 flex flex-col gap-space-4">
<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-[0_2px_8px_rgba(22,33,30,0.06)] overflow-hidden flex flex-col h-[600px]">

<div className="border-b border-paper-200 p-space-4 flex items-start justify-between bg-surface-bright">
<div>
<div className="flex items-center gap-space-2 mb-space-1">
<span className="font-caption text-caption text-ink-500 uppercase tracking-wider">Enquiry &amp; Onboarding</span>
<span className="w-1 h-1 rounded-full bg-paper-300"></span>
<span className="font-caption text-caption text-ink-500">Draft</span>
</div>
<input className="font-title-md text-title-md text-on-background border-none p-0 focus:ring-0 bg-transparent w-full" placeholder="Procedure Title" type="text" defaultValue="Initial Client Consultation Flow" />
</div>
<div className="flex gap-space-2">
<button className="px-space-3 py-space-2 border border-paper-300 rounded-DEFAULT text-ink-700 font-label text-label hover:bg-surface-container-low transition-colors">Cancel</button>
<button className="px-space-3 py-space-2 bg-primary text-on-primary rounded-DEFAULT font-label text-label hover:bg-surface-tint transition-colors">Save Changes</button>
</div>
</div>

<div className="flex items-center gap-space-2 px-space-4 py-space-2 border-b border-paper-200 bg-surface-container-lowest">
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700"><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
<div className="w-px h-4 bg-paper-200 mx-1"></div>
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700"><span className="material-symbols-outlined text-[18px]">format_list_numbered</span></button>
<div className="w-px h-4 bg-paper-200 mx-1"></div>
<button className="p-1 rounded hover:bg-surface-container-low text-ink-700 flex items-center gap-1 text-[13px] font-label"><span className="material-symbols-outlined text-[16px]">add_link</span> Link</button>
</div>

<div className="flex-1 p-space-6 overflow-y-auto bg-paper-0">
<div className="font-body text-body text-on-surface-variant max-w-prose space-y-4">
<p>When a prospective client first reaches out via WhatsApp or the booking form, follow this sequence to ensure a professional and standardized onboarding experience.</p>
<h3 className="font-title-sm text-title-sm text-on-background mt-space-6 mb-space-2">1. Initial Response (Within 2 Hours)</h3>
<p>Reply with the standard greeting template. Ensure you request the following details if not already provided:</p>
<ul className="list-disc pl-5 space-y-1">
<li>Student's current grade level</li>
<li>Primary subjects requiring assistance</li>
<li>Preferred days of the week</li>
</ul>
<h3 className="font-title-sm text-title-sm text-on-background mt-space-6 mb-space-2">2. Assessment Scheduling</h3>
<p>Offer two distinct time slots for a 15-minute diagnostic assessment call. Use the Calendly link or propose times directly. Note: Do not confirm a regular slot until the assessment is complete.</p>
<div className="bg-surface-container p-space-4 border-l-4 border-primary rounded-r-DEFAULT my-space-4">
<p className="font-data-display text-data-display text-primary text-sm"><strong>Script snippet:</strong> "To best understand [Student Name]'s needs, I'd like to schedule a brief 15-minute diagnostic call. Would Tuesday at 4 PM or Wednesday at 5 PM work better for you?"</p>
</div>
<p>Document any specific learning challenges mentioned during this phase in the student's preliminary profile note.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
