import React from 'react';

export const CreateEditClassDesktop = () => {
  return (
    <>
      

<div className="fixed inset-0 bg-ink-900/40 backdrop-blur-sm z-40 transition-opacity"></div>

<div className="relative bg-paper-0 rounded-xl w-full max-w-3xl max-h-[921px] flex flex-col z-50 border border-paper-200 shadow-[0_8px_32px_-4px_rgba(22,33,30,0.08)] overflow-hidden">

<div className="flex items-center justify-between px-space-6 py-space-4 border-b border-paper-200 bg-surface">
<h2 className="font-title-lg text-title-lg text-ink-900">Schedule Session</h2>
<button className="text-ink-500 hover:text-ink-900 transition-colors p-1 rounded-full hover:bg-paper-100">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto custom-scrollbar p-space-6 bg-paper-0">
<form className="space-y-space-6">

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="student">Student</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" data-icon="search">search</span>
<input className="w-full pl-10 pr-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body placeholder:text-ink-500" id="student" placeholder="Search students..." type="text" />
</div>
</div>

<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="subject">Subject</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" data-icon="menu_book">menu_book</span>
<select className="w-full pl-10 pr-10 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body appearance-none" id="subject">
<option disabled="" selected="" value="">Select subject</option>
<option value="math">Advanced Mathematics</option>
<option value="physics">Physics 101</option>
<option value="literature">English Literature</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" data-icon="arrow_drop_down">arrow_drop_down</span>
</div>
</div>
</div>
<hr className="border-t border-paper-200" />

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="date">Date</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" data-icon="calendar_today">calendar_today</span>
<input className="w-full pl-10 pr-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-data-display text-data-display" id="date" type="date" />
</div>
</div>
<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="start_time">Start Time</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" data-icon="schedule">schedule</span>
<input className="w-full pl-10 pr-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-data-display text-data-display" id="start_time" type="time" />
</div>
</div>
<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="duration">Duration</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" data-icon="timer">timer</span>
<select className="w-full pl-10 pr-10 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body appearance-none" id="duration">
<option value="30">30 minutes</option>
<option value="45">45 minutes</option>
<option selected="" value="60">1 hour</option>
<option value="90">1.5 hours</option>
<option value="120">2 hours</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" data-icon="arrow_drop_down">arrow_drop_down</span>
</div>
</div>
</div>

<div className="bg-warning-tint border border-warning-solid/30 rounded-lg p-space-3 flex gap-3 items-start">
<span className="material-symbols-outlined text-warning-solid shrink-0 mt-0.5" data-icon="warning">warning</span>
<div>
<h4 className="font-title-sm text-title-sm text-warning-solid">Tight Schedule Warning</h4>
<p className="font-body text-body text-on-surface-variant mt-1">This session leaves less than 15 minutes of rest period before your next scheduled class with <span className="font-medium text-ink-900">Sarah Jenkins</span>.</p>
</div>
</div>
<hr className="border-t border-paper-200" />

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

<div className="space-y-space-2 bg-surface-container-low p-space-4 rounded-lg border border-paper-200">
<label className="flex items-center gap-2 font-title-sm text-title-sm text-ink-900">
<span className="material-symbols-outlined text-ink-700" data-icon="event_repeat">event_repeat</span>
                            Recurrence
                        </label>
<div className="flex items-center gap-3">
<label className="flex items-center gap-2 cursor-pointer">
<input checked="" className="text-primary focus:ring-primary h-4 w-4 border-paper-300" name="recurrence" type="radio" defaultValue="none" />
<span className="font-body text-body text-ink-700">None</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="text-primary focus:ring-primary h-4 w-4 border-paper-300" name="recurrence" type="radio" defaultValue="weekly" />
<span className="font-body text-body text-ink-700">Weekly</span>
</label>
</div>
</div>

<div className="space-y-space-2 bg-surface-container-low p-space-4 rounded-lg border border-paper-200">
<label className="flex items-center gap-2 font-title-sm text-title-sm text-ink-900">
<span className="material-symbols-outlined text-ink-700" data-icon="video_camera_front">video_camera_front</span>
                            Platform
                        </label>
<div className="flex items-center gap-3">
<label className="flex items-center gap-2 cursor-pointer">
<input checked="" className="text-primary focus:ring-primary h-4 w-4 border-paper-300" name="platform" type="radio" defaultValue="tutordesk" />
<span className="font-body text-body text-ink-700">TutorDesk Space</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
<input className="text-primary focus:ring-primary h-4 w-4 border-paper-300" name="platform" type="radio" defaultValue="zoom" />
<span className="font-body text-body text-ink-700">External Link</span>
</label>
</div>
</div>
</div>

<div className="space-y-space-1">
<label className="block font-label text-label text-ink-700" htmlFor="notes">Session Notes (Optional)</label>
<textarea className="w-full px-3 py-2 bg-surface border border-paper-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim transition-all font-body text-body placeholder:text-ink-500 resize-none" id="notes" placeholder="Topics to cover..." rows="2" />
</div>
</form>
</div>

<div className="flex items-center justify-end gap-space-3 px-space-6 py-space-4 border-t border-paper-200 bg-surface">
<button className="px-space-4 py-2 font-title-sm text-title-sm text-ink-700 bg-paper-0 border border-paper-300 rounded-lg hover:bg-paper-100 hover:text-ink-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:ring-offset-1" type="button">
                Cancel
            </button>
<button className="px-space-4 py-2 font-title-sm text-title-sm text-paper-0 bg-primary rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 flex items-center gap-2" type="submit">
<span className="material-symbols-outlined text-[18px]" data-icon="check">check</span>
                Save Session
            </button>
</div>
</div>

    </>
  );
};
