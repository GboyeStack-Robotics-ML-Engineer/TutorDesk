import React from 'react';

export const SettingsAutomationRules2 = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
<div className="max-w-7xl mx-auto space-y-space-8">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-display-md text-display-md text-on-surface">Automation Rules</h2>
<p className="font-body text-body text-ink-500 mt-1">Configure automated 'If/Then' behaviors for academic operations to reduce manual work.</p>
</div>
<button className="bg-primary text-paper-0 font-label text-label py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm self-start md:self-auto">
<span className="material-symbols-outlined text-sm">add</span>
                        New Rule
                    </button>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 flex flex-col gap-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl shadow-[0_2px_8px_rgba(22,33,30,0.04)] overflow-hidden">
<div className="p-5 border-b border-paper-200 bg-surface-bright flex justify-between items-center">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">build_circle</span>
                                    Rule Builder
                                </h3>
<div className="flex items-center gap-2">
<span className="font-caption text-caption text-ink-500">Status:</span>
<span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success-tint text-success-solid font-label text-[11px] uppercase tracking-wider">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span> Draft
                                    </span>
</div>
</div>
<div className="p-6 space-y-8">

<div className="relative">
<div className="absolute left-4 top-10 bottom-[-40px] w-px bg-paper-200"></div>
<div className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-surface-container border border-paper-300 flex items-center justify-center font-title-sm text-title-sm text-ink-700 shadow-sm z-10 shrink-0">1</div>
<div className="flex-1 space-y-3">
<label className="block font-label text-label text-on-surface">IF (Trigger)</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<select className="w-full bg-surface-bright border border-paper-300 rounded-lg px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[inset_0_0_0_1px_rgba(0,82,72,0.1)] appearance-none cursor-pointer">
<option>Payment is Overdue</option>
<option>Class is Scheduled</option>
<option>Student is Absent</option>
<option>Report Card Generated</option>
</select>
<select className="w-full bg-surface-bright border border-paper-300 rounded-lg px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[inset_0_0_0_1px_rgba(0,82,72,0.1)] appearance-none cursor-pointer">
<option>By 3 Days</option>
<option>By 7 Days</option>
<option>By 14 Days</option>
</select>
</div>
</div>
</div>
</div>

<div className="relative">
<div className="absolute left-4 top-10 bottom-[-40px] w-px bg-paper-200"></div>
<div className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-surface-container border border-paper-300 flex items-center justify-center font-title-sm text-title-sm text-ink-700 shadow-sm z-10 shrink-0">2</div>
<div className="flex-1 space-y-3">
<label className="block font-label text-label text-on-surface">AND (Condition)</label>
<div className="bg-surface p-4 rounded-lg border border-paper-200 flex items-start gap-3">
<span className="material-symbols-outlined text-ink-500 mt-0.5">filter_alt</span>
<div className="flex-1">
<div className="flex flex-wrap gap-2 mb-3">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-paper-0 border border-paper-300 font-caption text-caption text-ink-700 shadow-sm">
                                                            Student Category = Active
                                                            <button className="material-symbols-outlined text-[14px] hover:text-danger-solid ml-1">close</button>
</span>
<button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-dashed border-primary text-primary font-caption text-caption hover:bg-surface-tint hover:text-paper-0 transition-colors">
<span className="material-symbols-outlined text-[14px]">add</span> Add Condition
                                                        </button>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="relative">
<div className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container border border-primary flex items-center justify-center font-title-sm text-title-sm shadow-sm z-10 shrink-0">3</div>
<div className="flex-1 space-y-4">
<label className="block font-label text-label text-on-surface">THEN (Action)</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-1.5">
<span className="font-caption text-caption text-ink-500">Action Type</span>
<select className="w-full bg-surface-bright border border-paper-300 rounded-lg px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
<option>Send WhatsApp Message</option>
<option>Send Email</option>
<option>Create Task</option>
</select>
</div>
<div className="space-y-1.5">
<span className="font-caption text-caption text-ink-500">Target Audience</span>
<select className="w-full bg-surface-bright border border-paper-300 rounded-lg px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
<option>Parent/Guardian</option>
<option>Student</option>
<option>Both</option>
</select>
</div>
</div>
<div className="space-y-1.5 pt-2">
<div className="flex justify-between items-center">
<span className="font-caption text-caption text-ink-500">Message Template</span>
<button className="text-primary hover:text-primary-container font-caption text-caption underline decoration-primary/30 underline-offset-2">Insert Variable</button>
</div>
<textarea className="w-full bg-surface-bright border border-paper-300 rounded-lg px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" rows="3" defaultValue="Hi {{parent_name}}, a gentle reminder that the payment of {{amount_due}} for {{student_name}}'s classes is currently overdue. Please find the payment link attached." />
</div>
</div>
</div>
</div>
</div>

<div className="p-5 border-t border-paper-200 bg-surface-container-low flex justify-end gap-3">
<button className="px-4 py-2 rounded-lg font-label text-label text-on-surface-variant hover:bg-paper-200 transition-colors border border-transparent hover:border-paper-300">Cancel</button>
<button className="px-5 py-2 rounded-lg font-label text-label bg-paper-0 border border-primary text-primary hover:bg-surface-tint hover:text-paper-0 transition-colors shadow-sm">Save as Draft</button>
<button className="px-5 py-2 rounded-lg font-label text-label bg-primary text-paper-0 hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-sm">play_arrow</span> Activate Rule
                                </button>
</div>
</div>

<div className="space-y-4 mt-4">
<h3 className="font-title-sm text-title-sm text-on-surface border-b border-paper-200 pb-2">Active Rules</h3>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-paper-300 transition-colors shadow-sm group">
<div className="flex items-start gap-4">
<div className="mt-1 w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">schedule_send</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<h4 className="font-label text-label text-on-surface">Pre-class Reminder (24h)</h4>
<span className="inline-block w-2 h-2 rounded-full bg-success-solid"></span>
</div>
<p className="font-caption text-caption text-ink-500">IF Class starts in 24h THEN send WhatsApp to Student</p>
<div className="flex items-center gap-4 mt-2">
<span className="font-data-display text-[12px] text-ink-700 bg-surface px-2 py-0.5 rounded border border-paper-200">Triggered: 142 times</span>
<span className="font-data-display text-[12px] text-ink-700 bg-surface px-2 py-0.5 rounded border border-paper-200">Success Rate: 98%</span>
</div>
</div>
</div>
<div className="flex items-center gap-2 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 text-ink-500 hover:text-primary rounded-md hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">edit</span></button>
<button className="p-1.5 text-ink-500 hover:text-primary rounded-md hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">pause_circle</span></button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-paper-300 transition-colors shadow-sm group">
<div className="flex items-start gap-4">
<div className="mt-1 w-10 h-10 rounded-full bg-warning-tint flex items-center justify-center text-warning-solid">
<span className="material-symbols-outlined">payments</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<h4 className="font-label text-label text-on-surface">Payment Overdue (3 Days)</h4>
<span className="inline-block w-2 h-2 rounded-full bg-warning-solid"></span>
</div>
<p className="font-caption text-caption text-ink-500">IF Payment overdue by 3 days THEN Email Parent</p>
<div className="flex items-center gap-4 mt-2">
<span className="font-data-display text-[12px] text-ink-700 bg-surface px-2 py-0.5 rounded border border-paper-200">Triggered: 28 times</span>
<span className="font-data-display text-[12px] text-ink-700 bg-surface px-2 py-0.5 rounded border border-paper-200">Success Rate: 100%</span>
</div>
</div>
</div>
<div className="flex items-center gap-2 self-end md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-1.5 text-ink-500 hover:text-primary rounded-md hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">edit</span></button>
<button className="p-1.5 text-ink-500 hover:text-primary rounded-md hover:bg-surface-container"><span className="material-symbols-outlined text-[20px]">pause_circle</span></button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(22,33,30,0.06)] relative flex flex-col">

<div className="h-24 bg-surface-container-high relative overflow-hidden flex items-end p-4 border-b border-paper-200">
<div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{"backgroundImage":"radial-gradient(circle at top right, #a7f0e2 0%, transparent 60%)"}}></div>
<h3 className="font-title-sm text-title-sm text-on-surface relative z-10 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-lg">visibility</span> Live Preview
                                </h3>
</div>

<div className="p-4 bg-[#E5DDD5] min-h-[250px] flex flex-col justify-end relative">

<div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-3 shadow-sm max-w-[85%] self-end mb-2 relative">
<p className="font-body text-[14px] leading-snug text-ink-900">
                                        Hi <span className="bg-warning-tint px-1 rounded text-warning-solid font-data-display text-[12px]">Mr. Adebayo</span>, a gentle reminder that the payment of <span className="bg-warning-tint px-1 rounded text-warning-solid font-data-display text-[12px]">₦45,000</span> for <span className="bg-warning-tint px-1 rounded text-warning-solid font-data-display text-[12px]">Tolu</span>'s classes is currently overdue. Please find the payment link attached.
                                    </p>
<div className="text-right mt-1">
<span className="font-caption text-[10px] text-ink-500">10:42 AM <span className="material-symbols-outlined text-[12px] text-[#4FC3F7] ml-0.5 align-middle">done_all</span></span>
</div>
</div>
<div className="bg-paper-0 rounded-lg p-2 shadow-sm max-w-[85%] self-end flex items-center gap-2 mb-1">
<div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-ink-500">link</span>
</div>
<div className="overflow-hidden">
<p className="font-label text-[12px] text-on-surface truncate">Secure Payment Link</p>
<p className="font-caption text-[10px] text-primary truncate">pay.tutordesk.com/inv_882</p>
</div>
</div>
</div>
<div className="p-3 bg-surface border-t border-paper-200">
<p className="font-caption text-caption text-ink-500 text-center flex justify-center items-center gap-1">
<span className="material-symbols-outlined text-[14px]">info</span> Previewing as WhatsApp Message
                                </p>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-4 shadow-sm flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-ink-500">bolt</span>
<div>
<p className="font-display-md text-[28px] text-on-surface leading-none mb-1">842</p>
<p className="font-caption text-caption text-ink-500 leading-tight">Total Automations Fired (30d)</p>
</div>
</div>
<div className="bg-paper-0 border border-paper-200 rounded-xl p-4 shadow-sm flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-success-solid">trending_up</span>
<div>
<p className="font-display-md text-[28px] text-success-solid leading-none mb-1">12hrs</p>
<p className="font-caption text-caption text-ink-500 leading-tight">Time Saved this week</p>
</div>
</div>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-xl p-4">
<h4 className="font-label text-label text-on-surface mb-2 flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[16px]">lightbulb</span> Pro Tip
                            </h4>
<p className="font-caption text-[13px] text-ink-700 leading-relaxed">
                                Avoid sending automated messages outside of business hours (8 PM - 8 AM) to ensure better engagement rates with parents. You can set time-boundaries in global preferences.
                            </p>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
