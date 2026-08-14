import React from 'react';

export const SettingsAutomationRules1 = () => {
  return (
    <>
      


<div className="p-gutter-mobile md:p-gutter-desktop max-w-max-width mx-auto w-full">
<div className="mb-space-8 flex flex-col md:flex-row md:items-end justify-between gap-space-4">
<div>
<h2 className="font-display-md text-display-md text-on-surface mb-space-1">Automation Rules</h2>
<p className="font-body text-body text-on-surface-variant">Configure 'If/Then' behaviors to reduce manual academic operations.</p>
</div>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-title-sm flex items-center gap-2 hover:bg-surface-tint transition-colors">
<span className="material-symbols-outlined">add_circle</span>
                    New Rule
                </button>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-4">

<div className="lg:col-span-8 space-y-space-4">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-sm relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div className="flex justify-between items-start mb-space-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\"FILL\" 1"}}>bolt</span>
                                    Class Reminder WhatsApp
                                </h3>
<p className="font-caption text-caption text-on-surface-variant mt-1">Rule ID: <span className="font-data-display">RUL-8492</span></p>
</div>
<div className="flex items-center gap-2">
<span className="bg-success-tint text-success-solid px-2 py-1 rounded font-label text-label flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-success-solid"></span> Active
                                 </span>
<button className="text-on-surface-variant hover:text-primary transition-colors p-1">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div className="space-y-space-6">

<div className="bg-surface-container-low rounded-lg p-space-4 border border-paper-200">
<label className="block font-label text-label text-on-surface-variant mb-2">IF (Trigger)</label>
<div className="flex flex-col sm:flex-row gap-3">
<select className="flex-1 bg-paper-0 border-paper-200 rounded-md font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary">
<option>Class is Scheduled</option>
<option>Payment is Overdue</option>
<option>Student is Absent</option>
</select>
<div className="flex items-center gap-2 flex-1">
<span className="font-label text-label text-on-surface-variant whitespace-nowrap">Occurs in</span>
<input className="w-16 bg-paper-0 border-paper-200 rounded-md font-data-display text-data-display text-center focus:border-primary focus:ring-1 focus:ring-primary" type="number" defaultValue="24" />
<select className="bg-paper-0 border-paper-200 rounded-md font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary">
<option>Hours</option>
<option>Days</option>
<option>Minutes</option>
</select>
</div>
</div>
</div>
<div className="flex justify-center -my-2 relative z-10">
<div className="bg-surface-container-highest rounded-full p-1 border border-paper-200">
<span className="material-symbols-outlined text-on-surface-variant">arrow_downward</span>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-space-4 border border-paper-200">
<label className="block font-label text-label text-on-surface-variant mb-2">THEN (Action)</label>
<div className="flex flex-col sm:flex-row gap-3 mb-4">
<select className="flex-1 bg-paper-0 border-paper-200 rounded-md font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary">
<option>Send WhatsApp Message</option>
<option>Send Email</option>
<option>Create Task</option>
</select>
<select className="flex-1 bg-paper-0 border-paper-200 rounded-md font-body text-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary">
<option>To: Student &amp; Parent</option>
<option>To: Student Only</option>
<option>To: Parent Only</option>
</select>
</div>
<div className="bg-paper-0 rounded-md border border-paper-200 p-3">
<label className="block font-label text-label text-on-surface-variant mb-1">Message Template</label>
<textarea className="w-full border-none bg-transparent p-0 font-body text-body focus:ring-0 resize-none text-on-surface" placeholder="Type message..." rows="3" />
<div className="mt-2 flex flex-wrap gap-2">
<button className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded text-caption font-caption hover:bg-paper-200 transition-colors">{Student_Name}</button>
<button className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded text-caption font-caption hover:bg-paper-200 transition-colors">{Class_Time}</button>
<button className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded text-caption font-caption hover:bg-paper-200 transition-colors">{Zoom_Link}</button>
</div>
</div>
</div>
</div>
<div className="mt-space-6 flex justify-end gap-3">
<button className="bg-paper-0 border border-primary text-primary px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-surface-container-low transition-colors">Discard</button>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-surface-tint transition-colors">Save Rule</button>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-space-4">

<div className="glass-card rounded-xl p-space-6">
<h4 className="font-title-sm text-title-sm text-on-surface mb-space-4 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"\"FILL\" 1"}}>visibility</span>
                            Live Preview
                        </h4>
<div className="bg-[#efeae2] rounded-lg p-4 border border-[#d1cbbd] relative">

<div className="flex items-center gap-3 mb-3 pb-2 border-b border-[#d1cbbd]/50">
<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
<span className="material-symbols-outlined text-sm">school</span>
</div>
<div>
<p className="font-title-sm text-title-sm text-on-surface leading-tight">TutorDesk Bot</p>
<p className="font-caption text-caption text-on-surface-variant opacity-70">WhatsApp Business</p>
</div>
</div>
<div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm inline-block max-w-[90%]">
<p className="font-body text-body text-on-surface whitespace-pre-line">Hi <span className="font-data-display text-primary bg-primary-fixed-dim/20 px-1 rounded">John</span>,
                                
                                Reminder: You have an upcoming Math session tomorrow at <span className="font-data-display text-primary bg-primary-fixed-dim/20 px-1 rounded">14:00</span>.
                                
                                Please ensure your homework is submitted.</p>
<p className="text-[10px] text-right text-on-surface-variant mt-1 opacity-70">10:42 AM</p>
</div>
</div>
</div>

<div className="bg-surface-bright border border-paper-200 rounded-xl p-space-6 shadow-sm">
<h4 className="font-title-sm text-title-sm text-on-surface mb-space-4">Rule Performance</h4>
<div className="space-y-4">
<div className="flex justify-between items-end border-b border-paper-200 pb-2">
<span className="font-body text-body text-on-surface-variant">Times Triggered (30d)</span>
<span className="font-data-display text-title-md text-on-surface">142</span>
</div>
<div className="flex justify-between items-end border-b border-paper-200 pb-2">
<span className="font-body text-body text-on-surface-variant">Est. Time Saved</span>
<span className="font-data-display text-title-md text-success-solid">4.5<span className="text-sm font-body">hrs</span></span>
</div>
<div className="flex justify-between items-end">
<span className="font-body text-body text-on-surface-variant">Failures</span>
<span className="font-data-display text-body text-error">0</span>
</div>
</div>
</div>
</div>
</div>

<div className="mt-space-8 bg-paper-0 border border-paper-200 rounded-xl overflow-hidden shadow-sm">
<div className="p-space-4 border-b border-paper-200 bg-surface-container-lowest">
<h3 className="font-title-md text-title-md text-on-surface">Active Rules</h3>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-paper-200 bg-surface-container-low">
<th className="p-space-3 font-label text-label text-on-surface-variant font-medium">Name</th>
<th className="p-space-3 font-label text-label text-on-surface-variant font-medium">Trigger</th>
<th className="p-space-3 font-label text-label text-on-surface-variant font-medium">Action</th>
<th className="p-space-3 font-label text-label text-on-surface-variant font-medium text-right">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-paper-200">
<tr className="hover:bg-paper-100 transition-colors">
<td className="p-space-3 font-body text-body text-on-surface">Payment Overdue Notice</td>
<td className="p-space-3 font-caption text-caption text-on-surface-variant">Invoice &gt; 3 Days Late</td>
<td className="p-space-3 font-caption text-caption text-on-surface-variant">Email Parent</td>
<td className="p-space-3 text-right">
<button className="w-10 h-5 bg-success-solid rounded-full relative inline-flex items-center">
<span className="w-4 h-4 bg-white rounded-full absolute right-1"></span>
</button>
</td>
</tr>
<tr className="hover:bg-paper-100 transition-colors">
<td className="p-space-3 font-body text-body text-on-surface">Post-Class Summary</td>
<td className="p-space-3 font-caption text-caption text-on-surface-variant">Class Ends</td>
<td className="p-space-3 font-caption text-caption text-on-surface-variant">Create Draft Report</td>
<td className="p-space-3 text-right">
<button className="w-10 h-5 bg-surface-variant rounded-full relative inline-flex items-center border border-outline-variant">
<span className="w-4 h-4 bg-white rounded-full absolute left-1 shadow-sm"></span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

    </>
  );
};
