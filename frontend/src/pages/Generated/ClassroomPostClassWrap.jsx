import React from 'react';

export const ClassroomPostClassWrap = () => {
  return (
    <>
      



<div className="px-space-6 py-space-6 flex flex-col gap-space-8 overflow-y-auto">

<section className="flex flex-col gap-space-3">
<h2 className="font-label text-label text-ink-700">Attendance Status</h2>
<div className="flex flex-col sm:flex-row gap-space-3">
<label className="flex-1 relative cursor-pointer group">
<input checked="" className="peer sr-only" name="attendance" type="radio" defaultValue="present" />
<div className="w-full py-space-3 px-space-4 border border-paper-300 peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-on-primary-container bg-paper-0 text-on-surface font-label text-label rounded-lg flex items-center justify-center gap-space-2 transition-all duration-200 hover:bg-paper-100 peer-checked:hover:bg-primary-container shadow-sm peer-checked:shadow-none">
<span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform peer-checked:font-[FILL,1]" style={{"fontVariationSettings":"\"FILL\" 1"}}>check_circle</span>
                            Present
                        </div>
</label>
<label className="flex-1 relative cursor-pointer group">
<input className="peer sr-only" name="attendance" type="radio" defaultValue="absent" />
<div className="w-full py-space-3 px-space-4 border border-paper-300 peer-checked:border-danger-solid peer-checked:bg-danger-tint peer-checked:text-danger-solid bg-paper-0 text-on-surface font-label text-label rounded-lg flex items-center justify-center gap-space-2 transition-all duration-200 hover:bg-paper-100 shadow-sm peer-checked:shadow-none">
<span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">cancel</span>
                            Absent
                        </div>
</label>
<label className="flex-1 relative cursor-pointer group">
<input className="peer sr-only" name="attendance" type="radio" defaultValue="late" />
<div className="w-full py-space-3 px-space-4 border border-paper-300 peer-checked:border-warning-solid peer-checked:bg-warning-tint peer-checked:text-warning-solid bg-paper-0 text-on-surface font-label text-label rounded-lg flex items-center justify-center gap-space-2 transition-all duration-200 hover:bg-paper-100 shadow-sm peer-checked:shadow-none">
<span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">schedule</span>
                            Late
                        </div>
</label>
</div>
</section>

<section className="flex flex-col gap-space-3">
<div className="flex justify-between items-end">
<label className="font-label text-label text-ink-700" htmlFor="session-notes">Session Feedback &amp; Notes</label>
<div className="flex items-center gap-1.5 text-success-solid font-caption text-caption opacity-80 animate-pulse">
<span className="material-symbols-outlined text-[14px]">cloud_done</span>
<span>Autosaved just now</span>
</div>
</div>
<div className="relative group">
<textarea className="w-full min-h-[140px] bg-paper-0 border border-paper-300 rounded-lg p-space-4 font-body text-body text-on-surface placeholder:text-ink-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y shadow-sm" id="session-notes" placeholder="Summarize the topics covered, student's performance, and areas for improvement..." />
<div className="absolute bottom-3 right-3 pointer-events-none text-ink-500 opacity-0 group-focus-within:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</div>
</div>
</section>

<section className="flex flex-col gap-space-3">
<label className="font-label text-label text-ink-700">Homework &amp; Resources</label>
<div className="flex flex-col sm:flex-row gap-space-3">

<button className="flex-1 flex items-center justify-between border border-paper-300 bg-paper-0 p-space-3 rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors text-left group shadow-sm" type="button">
<div className="flex items-center gap-space-3">
<div className="w-10 h-10 rounded-md bg-surface-container-low flex items-center justify-center text-primary border border-paper-200 group-hover:bg-paper-0 transition-colors">
<span className="material-symbols-outlined text-[20px]">library_books</span>
</div>
<div className="flex flex-col">
<span className="font-label text-label text-on-surface">Select from Library</span>
<span className="font-caption text-caption text-ink-500">Attach worksheet or reading</span>
</div>
</div>
<span className="material-symbols-outlined text-ink-500 group-hover:text-primary">chevron_right</span>
</button>

<div className="relative flex-1 group">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-ink-500 text-[20px] group-focus-within:text-primary transition-colors">event</span>
</div>
<input className="w-full h-full min-h-[64px] border border-paper-300 rounded-lg pl-11 pr-4 py-space-3 font-body text-body text-on-surface bg-paper-0 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm cursor-pointer hover:bg-surface-container-low" placeholder="Set due date" readonly="" type="text" defaultValue="Next Session (Oct 24)" />
</div>
</div>
</section>

<section className="flex flex-col gap-space-4 p-space-4 border border-paper-200 rounded-xl bg-surface-container-low relative overflow-hidden">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
<div className="flex items-start justify-between relative z-10">
<div className="flex flex-col gap-1 pr-6">
<h3 className="font-label text-label text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary" style={{"fontVariationSettings":"\"FILL\" 1"}}>mark_email_read</span>
                            Send Update to Parent
                        </h3>
<p className="font-caption text-caption text-ink-500 leading-relaxed">
                            Automatically share the session summary and homework attachment with Mr. Johnson via WhatsApp.
                        </p>
</div>

<label className="relative inline-flex items-center cursor-pointer mt-1 flex-shrink-0">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-paper-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-paper-0 after:border-paper-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
</label>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 relative z-10 shadow-sm group">
<button aria-label="Edit Message" className="absolute top-3 right-3 text-ink-500 hover:text-primary transition-colors p-1 rounded hover:bg-surface-container-low">
<span className="material-symbols-outlined text-[16px]">edit</span>
</button>
<p className="font-body text-body text-ink-700 pr-8 italic">
                        "Hi Mr. Johnson! Adebayo and I just finished a great Physics session. He did exceptionally well with kinematic equations today. I've attached a practice sheet for Thursday. Let me know if you have any questions!"
                    </p>
<div className="mt-space-3 flex items-center gap-2">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-paper-200 font-caption text-caption text-ink-700">
<span className="material-symbols-outlined text-[14px]">attachment</span>
<span>Kinematics_WS1.pdf</span>
</div>
</div>
</div>
</section>
</div>

<footer className="px-space-6 py-space-4 border-t border-paper-200 bg-surface flex items-center justify-between rounded-b-xl">
<button className="px-space-3 py-space-2 font-label text-label text-ink-700 hover:text-on-surface hover:bg-paper-200 rounded-md transition-colors flex items-center gap-2" type="button">
                Cancel
            </button>
<button className="px-space-6 py-2.5 bg-warning-solid text-paper-0 font-label text-label rounded-lg flex items-center gap-2 hover:bg-secondary hover:shadow-md transition-all shadow-sm active:scale-95" type="button">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"\"FILL\" 1"}}>task_alt</span>
                Finish &amp; Close
            </button>
</footer>

    </>
  );
};
