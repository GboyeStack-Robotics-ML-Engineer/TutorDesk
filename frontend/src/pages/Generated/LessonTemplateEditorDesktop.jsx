import React from 'react';

export const LessonTemplateEditorDesktop = () => {
  return (
    <>
      
<div className="w-full max-w-[800px] flex flex-col gap-space-6 pb-space-8">

<div className="flex justify-between items-center bg-paper-0 p-space-4 border border-paper-200 rounded-lg shadow-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-success-solid" data-icon="check_circle">check_circle</span>
<span className="font-label text-label text-ink-500">Draft saved locally</span>
</div>
<div className="flex gap-3">
<button className="px-space-4 py-space-2 font-label text-label text-primary border border-primary rounded hover:bg-primary/5 transition-colors">Preview</button>
<button className="px-space-4 py-space-2 font-label text-label bg-primary text-paper-0 rounded hover:bg-primary-container transition-colors">Save Template</button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-sm p-space-6 flex flex-col gap-space-6">

<div className="focus-ring border-b border-paper-200 pb-2 transition-all">
<input className="w-full font-title-lg text-title-lg text-on-surface bg-transparent border-none p-0 focus:ring-0 placeholder-ink-500/50" placeholder="Lesson Title (e.g., Intro to Algebraic Equations)" type="text" />
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
<div>
<label className="block font-label text-label text-ink-700 mb-1">Subject</label>
<select className="w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-2 focus-ring text-on-surface">
<option>Mathematics</option>
<option>Physics</option>
<option>Literature</option>
</select>
</div>
<div>
<label className="block font-label text-label text-ink-700 mb-1">Target Grade/Level</label>
<select className="w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-2 focus-ring text-on-surface">
<option>JSS 1</option>
<option>JSS 2</option>
<option>SS 1</option>
</select>
</div>
<div>
<label className="block font-label text-label text-ink-700 mb-1">Duration (Mins)</label>
<input className="w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-2 focus-ring text-on-surface" type="number" defaultValue="60" />
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-title-sm text-title-sm text-primary flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="flag">flag</span> Learning Objective
                        </label>
<div className="focus-ring border border-paper-200 rounded-lg p-1 bg-paper-0">
<textarea className="w-full font-body text-body bg-transparent border-none p-3 focus:ring-0 resize-y" placeholder="By the end of this lesson, students will be able to..." rows="3" />
</div>
</div>

<div className="flex flex-col gap-space-4 mt-space-4">
<div className="flex items-center justify-between border-b border-paper-200 pb-2">
<h3 className="font-title-sm text-title-sm text-primary flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="segment">segment</span> Lesson Structure
                            </h3>
<button className="text-primary hover:text-primary-container font-label text-label flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span> Add Section
                            </button>
</div>

<div className="border border-paper-200 rounded-lg bg-surface-bright group relative">
<div className="absolute -left-3 top-4 cursor-grab text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
</div>
<div className="p-space-4 flex flex-col gap-3">
<div className="flex justify-between items-center">
<input className="font-title-md text-title-md text-on-surface bg-transparent border-b border-transparent hover:border-paper-200 focus:border-primary focus:ring-0 p-1 transition-all w-2/3" type="text" defaultValue="Introduction &amp; Warm-up" />
<span className="font-caption text-caption text-ink-500">10 mins</span>
</div>
<textarea className="w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-3 focus-ring resize-y" placeholder="Detailed notes for this section..." rows="3" />
</div>
</div>

<div className="border border-paper-200 rounded-lg bg-surface-bright group relative">
<div className="absolute -left-3 top-4 cursor-grab text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined" data-icon="drag_indicator">drag_indicator</span>
</div>
<div className="p-space-4 flex flex-col gap-3">
<div className="flex justify-between items-center">
<input className="font-title-md text-title-md text-on-surface bg-transparent border-b border-transparent hover:border-paper-200 focus:border-primary focus:ring-0 p-1 transition-all w-2/3" type="text" defaultValue="Core Concept Delivery" />
<span className="font-caption text-caption text-ink-500">30 mins</span>
</div>
<textarea className="w-full font-body text-body bg-paper-0 border border-paper-200 rounded p-3 focus-ring resize-y" placeholder="Detailed notes for this section..." rows="4" />
</div>
</div>
</div>

<div className="flex flex-col gap-2 mt-space-4">
<label className="font-title-sm text-title-sm text-primary flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="attachment">attachment</span> Materials &amp; Resources
                        </label>
<div className="border-2 border-dashed border-paper-300 rounded-lg p-space-6 flex flex-col items-center justify-center bg-paper-50 hover:bg-paper-100 transition-colors cursor-pointer text-center group">
<span className="material-symbols-outlined text-display-md text-ink-500 group-hover:text-primary transition-colors mb-2" data-icon="cloud_upload">cloud_upload</span>
<p className="font-body text-body text-ink-700">Drag &amp; drop files here, or <span className="text-primary font-bold">browse Library</span></p>
<p className="font-caption text-caption text-ink-500 mt-1">Attach worksheets, slides, or reading materials</p>
</div>
</div>

<div className="flex flex-col gap-2 mt-space-4 border-t border-paper-200 pt-space-4">
<label className="font-title-sm text-title-sm text-primary flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span> Homework &amp; Assessment
                        </label>
<div className="focus-ring border border-paper-200 rounded-lg p-1 bg-paper-0">
<textarea className="w-full font-body text-body bg-transparent border-none p-3 focus:ring-0 resize-y" placeholder="Describe the assignment or review tasks..." rows="3" />
</div>
</div>
</div>
</div>

    </>
  );
};
