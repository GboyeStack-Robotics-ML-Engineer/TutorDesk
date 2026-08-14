import React from 'react';

export const RescheduleCancelClassDesktop = () => {
  return (
    <>
      

<div className="fixed inset-0 modal-backdrop-pattern flex items-center justify-center z-50 p-gutter-mobile md:p-gutter-desktop backdrop-blur-sm">

<div aria-labelledby="modal-title" aria-modal="true" className="bg-paper-0 border border-paper-200 rounded-xl w-full max-w-2xl modal-shadow flex flex-col max-h-[921px] overflow-hidden" role="dialog">

<div className="px-space-6 py-space-4 border-b border-paper-200 flex justify-between items-start bg-surface sticky top-0 z-10">
<div>
<h2 className="font-title-md text-title-md text-on-surface mb-1" id="modal-title">Manage Class Session</h2>
<p className="font-body text-body text-on-surface-variant">Mathematics 101 with David O.</p>
</div>
<button aria-label="Close modal" className="text-on-surface-variant hover:text-ink-900 transition-colors p-1 rounded-md hover:bg-paper-100">
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
</div>

<div className="px-space-6 border-b border-paper-200 bg-surface flex gap-space-4">
<button className="font-title-sm text-title-sm text-primary font-bold border-b-2 border-primary py-3 px-2 transition-colors" id="tab-reschedule" onclick="switchTab('reschedule')">
                    Reschedule
                </button>
<button className="font-title-sm text-title-sm text-on-surface-variant hover:text-primary py-3 px-2 transition-colors" id="tab-cancel" onclick="switchTab('cancel')">
                    Cancel Class
                </button>
</div>

<div className="p-space-6 overflow-y-auto custom-scrollbar flex-grow">

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 mb-space-6 flex gap-space-4 items-center">
<div className="bg-paper-0 border border-paper-200 rounded-md w-12 h-12 flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary text-[24px]" data-weight="fill">calendar_today</span>
</div>
<div>
<p className="font-label text-label text-on-surface-variant uppercase tracking-wider mb-0.5">Current Schedule</p>
<p className="font-title-sm text-title-sm text-on-surface">Thu, Oct 24 • 10:00 AM - 11:30 AM</p>
</div>
</div>

<div className="tab-content active space-y-space-6" id="content-reschedule">

<div className="space-y-space-4">
<h3 className="font-title-sm text-title-sm text-on-surface">Select New Date &amp; Time</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

<div className="space-y-1">
<label className="font-label text-label text-on-surface-variant block" htmlFor="new-date">Date</label>
<div className="relative">
<input className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition-shadow" id="new-date" type="date" />
</div>
</div>

<div className="space-y-1">
<label className="font-label text-label text-on-surface-variant block" htmlFor="new-time">Time</label>
<div className="relative">
<input className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition-shadow" id="new-time" type="time" />
</div>
</div>
</div>
</div>

<div className="space-y-1">
<label className="font-label text-label text-on-surface-variant block" htmlFor="reschedule-reason">Reason for rescheduling (Optional)</label>
<textarea className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition-shadow resize-none" id="reschedule-reason" placeholder="Briefly explain why you need to move the class..." rows="2" />
</div>

<div className="bg-warning-tint border border-[#E8D1A7] rounded-lg p-space-3 flex gap-space-3 items-start">
<span className="material-symbols-outlined text-warning-solid text-[20px] mt-0.5" data-weight="fill">info</span>
<div>
<p className="font-label text-label text-ink-900 font-bold">Rescheduling Policy</p>
<p className="font-caption text-caption text-ink-700 mt-1">Changes made within 24 hours of the class start time may be subject to a late fee depending on your agreement with the student.</p>
</div>
</div>
</div>

<div className="tab-content space-y-space-6" id="content-cancel">

<div className="bg-danger-tint border border-[#E5C1B9] rounded-lg p-space-4 flex gap-space-3 items-start">
<span className="material-symbols-outlined text-danger-solid text-[24px] flex-shrink-0" data-weight="fill">warning</span>
<div>
<h4 className="font-title-sm text-title-sm text-ink-900 mb-1">Cancellation Policy</h4>
<ul className="font-body text-body text-ink-700 space-y-2 list-disc list-inside">
<li>Cancellations within 24 hours of start time incur a 50% penalty.</li>
<li>Repeated late cancellations may affect your tutor standing.</li>
<li>Refunds to the student will be processed automatically based on policy.</li>
</ul>
</div>
</div>

<div className="space-y-1">
<label className="font-label text-label text-on-surface-variant block" htmlFor="cancel-reason">Reason for cancellation <span className="text-danger-solid">*</span></label>
<select className="w-full bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition-shadow appearance-none" id="cancel-reason">
<option disabled="" selected="" value="">Select a reason...</option>
<option value="illness">Illness / Medical Emergency</option>
<option value="scheduling">Scheduling Conflict</option>
<option value="technical">Technical Difficulties Expected</option>
<option value="other">Other (Please specify below)</option>
</select>
<textarea className="w-full mt-2 bg-paper-0 border border-paper-300 rounded-md px-3 py-2 font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition-shadow resize-none" id="cancel-details" placeholder="Additional details..." rows="2" />
</div>
</div>

<div className="mt-space-6 pt-space-6 border-t border-paper-200">
<label className="flex items-center gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-5 h-5 border border-paper-300 rounded-sm bg-paper-0 checked:bg-primary checked:border-primary transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface" type="checkbox" />
<span className="material-symbols-outlined text-on-primary text-[16px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" data-weight="fill">check</span>
</div>
<div className="flex flex-col">
<span className="font-body text-body text-on-surface font-medium">Notify via WhatsApp</span>
<span className="font-caption text-caption text-on-surface-variant">Send an automated message to the student/parent immediately.</span>
</div>
</label>
</div>
</div>

<div className="px-space-6 py-space-4 border-t border-paper-200 bg-surface flex justify-end gap-space-3 sticky bottom-0 z-10">
<button className="px-4 py-2 rounded-md font-label text-label font-bold text-on-surface-variant bg-paper-0 border border-paper-300 hover:bg-paper-100 transition-colors">
                    Keep Class
                </button>
<button className="px-4 py-2 rounded-md font-label text-label font-bold text-on-primary bg-primary hover:bg-surface-tint transition-colors shadow-sm" id="primary-action-btn">
                    Confirm Reschedule
                </button>
</div>
</div>
</div>


    </>
  );
};
