import React from 'react';

export const DiagnosticAssessmentEntryDesktop = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-gutter-desktop">
<div className="max-w-3xl mx-auto space-y-space-8">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex items-center gap-space-4 elev-1 relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-48 h-48 bg-tertiary-fixed-dim rounded-full blur-3xl opacity-30 pointer-events-none"></div>
<img className="w-12 h-12 rounded-full object-cover border border-paper-200" data-alt="A professional, well-lit headshot portrait of a Nigerian secondary school student in a neat uniform. The background is a soft, out-of-focus academic setting, bathed in warm, natural light characteristic of an organized modern classroom. The image uses a warm, academic aesthetic with crisp focus on the subject, embodying the 'warm paper and ink' design philosophy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT9RB7mJKa24gZUyVbiUZfe9zuAPlv5kjew30u9imFPCWjWqRVXZyOb8j3ugHr_iwxPYcMZVM5ElIXETkdaY6lJ3q2WsFGA-6BW4ToOrN3NkAX1RUnA4kz_QEKwMJqvONrOfq3Y6v0X8JNbTZwlDZRLB0zJyVdzW3iC1v1q6wP2an4EWJ31F5ErezHcjErX87pAv4CEvhoTtm-cR8Z3fmikvpmPmR-bV7b8x9Vp_PAiTETLnOEdH4f" />
<div>
<h2 className="font-title-sm text-title-sm text-ink-900">Diagnostic Entry for Adewale Johnson</h2>
<p className="font-body text-body text-ink-500">Form 4 • Mathematics Track</p>
</div>
<div className="ml-auto bg-primary-container text-on-primary-container font-caption text-caption px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="history">history</span>
                        Last Assessment: 14 days ago
                    </div>
</div>

<form className="grid grid-cols-1 md:grid-cols-12 gap-space-6">

<div className="md:col-span-8 bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 space-y-space-6">
<div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="assignment">assignment</span>
                                Assessment Details
                            </h3>
<p className="font-caption text-caption text-ink-500 mb-space-4">Record the primary parameters of the diagnostic test.</p>
<hr className="border-t border-paper-200 mb-space-4" />
</div>
<div className="space-y-space-4">

<div className="flex flex-col gap-1">
<label className="font-label text-label text-ink-700" htmlFor="assessment_name">Assessment Title <span className="text-danger-solid">*</span></label>
<input className="w-full bg-surface-container-lowest border border-paper-300 rounded px-3 py-2 font-body text-body text-ink-900 placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-tertiary-fixed-dim transition-shadow" id="assessment_name" name="assessment_name" placeholder="e.g. Mid-Term Geometry Baseline" type="text" />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-4">

<div className="flex flex-col gap-1">
<label className="font-label text-label text-ink-700" htmlFor="subject">Subject Domain</label>
<div className="relative">
<select className="w-full bg-surface-container-lowest border border-paper-300 rounded px-3 py-2 font-body text-body text-ink-900 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-tertiary-fixed-dim transition-shadow" id="subject" name="subject">
<option disabled="" selected="" value="">Select Subject...</option>
<option value="math">Mathematics</option>
<option value="english">English Language</option>
<option value="science">Basic Science</option>
<option value="physics">Physics</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-ink-500 pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-1">
<label className="font-label text-label text-ink-700" htmlFor="date_administered">Date Administered</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border border-paper-300 rounded px-3 py-2 font-data-display text-data-display text-ink-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-tertiary-fixed-dim transition-shadow" id="date_administered" name="date_administered" type="date" />
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-4 bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 space-y-space-6 relative overflow-hidden group">

<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-tint opacity-5 rounded-full transition-transform group-hover:scale-150 duration-500 pointer-events-none"></div>
<div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-[20px]" data-icon="score">score</span>
                                Results
                            </h3>
<p className="font-caption text-caption text-ink-500 mb-space-4">Quantitative outcome.</p>
<hr className="border-t border-paper-200 mb-space-4" />
</div>
<div className="flex flex-col gap-space-4 h-full">
<div className="flex flex-col gap-1">
<label className="font-label text-label text-ink-700" htmlFor="raw_score">Raw Score</label>
<div className="flex items-end gap-2">
<input className="w-full bg-surface-container-lowest border border-paper-300 rounded px-3 py-2 font-display-md text-display-md text-ink-900 placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-tertiary-fixed-dim transition-shadow text-center" id="raw_score" name="raw_score" placeholder="0" type="number" />
<span className="font-body text-body text-ink-500 pb-2">/ 100</span>
</div>
</div>
<div className="mt-auto pt-space-4">
<div className="bg-surface-container-low border border-paper-200 rounded p-3 flex justify-between items-center">
<span className="font-label text-label text-ink-700">Performance Band</span>
<span className="bg-warning-tint text-warning-solid font-data-display text-data-display px-2 py-0.5 rounded text-sm border border-warning-solid/20">--</span>
</div>
</div>
</div>
</div>

<div className="md:col-span-12 bg-paper-0 border border-paper-200 rounded-lg p-space-6 elev-1 space-y-space-4">
<div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1 flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="edit_note">edit_note</span>
                                Qualitative Assessment
                            </h3>
<hr className="border-t border-paper-200 mt-space-3 mb-space-4" />
</div>
<div className="flex flex-col gap-1">
<label className="font-label text-label text-ink-700" htmlFor="tutor_notes">Tutor Observations &amp; Notes</label>
<textarea className="w-full bg-surface-container-lowest border border-paper-300 rounded px-3 py-2 font-body text-body text-ink-900 placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-tertiary-fixed-dim transition-shadow resize-y" id="tutor_notes" name="tutor_notes" placeholder="Note specific areas of struggle, behavioral observations, or contextual factors during the test..." rows="4" />
</div>
</div>

<div className="md:col-span-12 bg-surface-bright border border-paper-200 rounded-lg p-space-6 border-dashed group hover:bg-paper-50 transition-colors cursor-pointer">
<div className="flex flex-col items-center justify-center text-center space-y-3 py-space-4">
<div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center border border-paper-200 text-ink-500 group-hover:text-primary transition-colors group-hover:scale-110 duration-200">
<span className="material-symbols-outlined" data-icon="upload_file">upload_file</span>
</div>
<div>
<h4 className="font-title-sm text-title-sm text-ink-900">Upload Physical Script</h4>
<p className="font-caption text-caption text-ink-500 mt-1">Drag and drop scanned exam paper, or click to browse</p>
</div>
<span className="font-caption text-caption text-outline bg-surface-container rounded px-2 py-1 mt-2 border border-paper-200">PDF, JPG up to 10MB</span>
</div>
</div>
</form>

<div className="h-space-8"></div>
</div>
</div>

    </>
  );
};
