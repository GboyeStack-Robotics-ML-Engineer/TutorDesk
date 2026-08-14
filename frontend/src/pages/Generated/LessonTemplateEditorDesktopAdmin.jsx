import React from 'react';

export const LessonTemplateEditorDesktopAdmin = () => {
  return (
    <>
      

<div className="flex-1 overflow-y-auto custom-scrollbar p-space-6 flex flex-col gap-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<input className="w-full bg-transparent border-none p-0 focus:ring-0 font-display-md text-display-md text-on-surface placeholder:text-ink-500/50 mb-2" placeholder="Lesson Title..." type="text" defaultValue="Introduction to Algebraic Expressions" />
<textarea className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-body text-on-surface-variant placeholder:text-ink-500/50 resize-none h-16" placeholder="A brief description of this lesson template..." />
</div>

<div className="grid grid-cols-12 gap-space-4">

<div className="col-span-12 lg:col-span-8 bg-paper-0 border border-paper-200 rounded-lg shadow-[0_2px_8px_rgba(22,33,30,0.04)] flex flex-col">
<div className="px-space-4 py-space-3 border-b border-paper-200 flex items-center justify-between bg-surface-container-low rounded-t-lg">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">flag</span>
                                Learning Objectives
                            </h3>
<button className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
<span className="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
<div className="p-space-4 flex flex-col gap-space-2 font-body text-body text-on-surface-variant">
<div className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-[20px] text-ink-500 mt-1 cursor-grab">drag_indicator</span>
<input className="flex-1 bg-surface-container-low border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2" type="text" defaultValue="Understand the concept of variables and constants." />
<button className="opacity-0 group-hover:opacity-100 text-error hover:bg-error-container p-2 rounded transition-all"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</div>
<div className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-[20px] text-ink-500 mt-1 cursor-grab">drag_indicator</span>
<input className="flex-1 bg-surface-container-low border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2" type="text" defaultValue="Evaluate simple algebraic expressions for given values." />
<button className="opacity-0 group-hover:opacity-100 text-error hover:bg-error-container p-2 rounded transition-all"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-4 bg-paper-0 border border-paper-200 rounded-lg shadow-[0_2px_8px_rgba(22,33,30,0.04)] flex flex-col">
<div className="px-space-4 py-space-3 border-b border-paper-200 flex items-center justify-between bg-surface-container-low rounded-t-lg">
<h3 className="font-title-sm text-title-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
                                Attached Resources
                            </h3>
</div>
<div className="p-space-4 flex flex-col gap-space-3 flex-1 overflow-y-auto">

<div className="flex items-center gap-3 p-2 border border-paper-200 rounded hover:border-primary transition-colors cursor-pointer group">
<div className="bg-error-container text-on-error-container p-2 rounded">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</div>
<div className="flex-1 min-w-0">
<p className="font-label text-label text-on-surface truncate">Algebra_Worksheet_1.pdf</p>
<p className="font-data-display text-caption text-ink-500">1.2 MB</p>
</div>
<span className="material-symbols-outlined text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">more_vert</span>
</div>

<div className="mt-auto border-2 border-dashed border-paper-300 rounded-lg p-space-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
<span className="material-symbols-outlined text-primary mb-2">upload_file</span>
<p className="font-label text-label text-primary">Drop files here or click to browse</p>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-4">

<div className="flex items-center justify-between">
<h2 className="font-title-md text-title-md text-on-surface">Lesson Structure</h2>
<button className="bg-primary text-on-primary font-label text-label px-4 py-2 rounded flex items-center gap-2 hover:bg-primary/90 transition-colors">
<span className="material-symbols-outlined text-[18px]">add_circle</span> Add Block
                         </button>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-[0_2px_8px_rgba(22,33,30,0.04)] overflow-hidden">

<div className="bg-surface-container-low border-b border-paper-200 px-space-2 py-space-1 flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-ink-500 cursor-grab px-2">drag_indicator</span>
<span className="font-data-display text-caption text-primary bg-primary/10 px-2 py-1 rounded">TEXT_BLOCK</span>
<div className="h-4 w-px bg-paper-300 mx-2"></div>
<button className="p-1 text-ink-500 hover:text-primary hover:bg-paper-100 rounded"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
<button className="p-1 text-ink-500 hover:text-primary hover:bg-paper-100 rounded"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
<button className="p-1 text-ink-500 hover:text-primary hover:bg-paper-100 rounded"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
<div className="flex-1"></div>
<button className="p-1 text-ink-500 hover:text-error hover:bg-error-container rounded"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</div>
<div className="p-space-4">
<input className="w-full bg-transparent border-none p-0 focus:ring-0 font-title-sm text-title-sm text-on-surface mb-2" type="text" defaultValue="1. Introduction (5 mins)" />
<textarea className="w-full bg-transparent border-none p-0 focus:ring-0 font-body text-body text-on-surface-variant resize-none h-24" placeholder="Start typing content..." defaultValue="Begin by asking students if they have ever used a placeholder in a game or a blank space in a sentence. Explain that in mathematics, variables are just like those blank spaces." />
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg shadow-[0_2px_8px_rgba(22,33,30,0.04)] overflow-hidden border-l-4 border-l-secondary-container">
<div className="bg-surface-container-low border-b border-paper-200 px-space-2 py-space-1 flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-ink-500 cursor-grab px-2">drag_indicator</span>
<span className="font-data-display text-caption text-secondary bg-secondary-container/20 px-2 py-1 rounded">EXERCISE_BLOCK</span>
<div className="flex-1"></div>
<button className="p-1 text-ink-500 hover:text-error hover:bg-error-container rounded"><span className="material-symbols-outlined text-[18px]">delete</span></button>
</div>
<div className="p-space-4 bg-surface-container-lowest">
<input className="w-full bg-transparent border-none p-0 focus:ring-0 font-title-sm text-title-sm text-on-surface mb-4" type="text" defaultValue="Practice Problem 1" />
<div className="bg-on-surface text-surface-container-lowest font-data-display text-body-lg p-space-4 rounded">
                                 3x + 5 = 20<br />
<span className="text-ink-500">Solve for x.</span>
</div>
</div>
</div>
</div>
</div>

<aside className="w-80 bg-paper-0 border-l border-paper-200 overflow-y-auto custom-scrollbar flex flex-col z-30">
<div className="p-space-4 border-b border-paper-200 sticky top-0 bg-paper-0 z-10 flex items-center justify-between">
<h3 className="font-title-sm text-title-sm text-on-surface">Properties</h3>
<button className="text-primary font-label text-label hover:underline">Publish</button>
</div>
<div className="p-space-4 flex flex-col gap-space-6">

<div className="space-y-4">

<div>
<label className="block font-label text-caption text-ink-500 mb-1">Subject</label>
<select className="w-full bg-surface-container-low border border-paper-200 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2 font-data-display text-data-display text-on-surface">
<option>Mathematics</option>
<option>Physics</option>
<option>Literature</option>
</select>
</div>

<div>
<label className="block font-label text-caption text-ink-500 mb-1">Target Level</label>
<select className="w-full bg-surface-container-low border border-paper-200 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2 font-data-display text-data-display text-on-surface">
<option>Middle School</option>
<option>High School</option>
<option>University Prep</option>
</select>
</div>

<div>
<label className="block font-label text-caption text-ink-500 mb-1">Est. Duration (Mins)</label>
<input className="w-full bg-surface-container-low border border-paper-200 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2 font-data-display text-data-display text-on-surface" type="number" defaultValue="45" />
</div>
</div>

<div className="pt-4 border-t border-paper-200">
<label className="block font-label text-caption text-ink-500 mb-2">Topics &amp; Tags</label>
<div className="flex flex-wrap gap-2 mb-3">
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-data-display text-caption px-2 py-1 rounded">
                                algebra <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">close</span>
</span>
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-data-display text-caption px-2 py-1 rounded">
                                basics <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error">close</span>
</span>
</div>
<input className="w-full bg-surface-container-low border border-paper-200 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded px-3 py-2 font-body text-body text-on-surface placeholder:text-ink-500/50" placeholder="Add tag..." type="text" />
</div>

<div className="pt-4 border-t border-paper-200">
<label className="block font-label text-caption text-ink-500 mb-3">Visibility</label>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer">
<input checked="" className="text-primary focus:ring-primary border-paper-300" name="visibility" type="radio" />
<span className="font-body text-body text-on-surface">Private (Draft)</span>
</label>
<label className="flex items-center gap-3 cursor-pointer">
<input className="text-primary focus:ring-primary border-paper-300" name="visibility" type="radio" />
<span className="font-body text-body text-on-surface">Shared with Students</span>
</label>
</div>
</div>
</div>
</aside>

    </>
  );
};
