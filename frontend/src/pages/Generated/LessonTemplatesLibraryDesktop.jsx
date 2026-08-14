import React from 'react';

export const LessonTemplatesLibraryDesktop = () => {
  return (
    <>
      

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-4 mb-space-8">
<div>
<h2 className="font-title-lg text-title-lg text-on-surface mb-space-1">Lesson Templates</h2>
<p className="font-body text-body text-on-surface-variant">Create and manage reusable structured lessons.</p>
</div>
<button className="inline-flex items-center justify-center gap-space-2 bg-primary text-paper-0 px-space-6 py-space-3 rounded-lg font-label text-label font-bold hover:bg-primary-container transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">add</span>
                New Template
            </button>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6 items-start">

<div className="lg:col-span-5 flex flex-col gap-space-4">

<div className="flex items-center justify-between mb-space-2">
<div className="flex gap-space-2 overflow-x-auto pb-1 no-scrollbar">
<button className="px-space-3 py-space-1 rounded-full bg-primary-container/10 text-primary border border-primary-fixed font-label text-label whitespace-nowrap">All Subjects</button>
<button className="px-space-3 py-space-1 rounded-full bg-paper-0 text-on-surface-variant border border-paper-300 hover:bg-paper-100 font-label text-label whitespace-nowrap transition-colors">Math</button>
<button className="px-space-3 py-space-1 rounded-full bg-paper-0 text-on-surface-variant border border-paper-300 hover:bg-paper-100 font-label text-label whitespace-nowrap transition-colors">Physics</button>
</div>
</div>

<article className="bg-paper-0 border border-primary shadow-[0_4px_12px_rgba(22,33,30,0.08)] rounded-xl p-space-4 relative cursor-pointer overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
<div className="flex justify-between items-start mb-space-3">
<div className="flex items-center gap-space-2">
<div className="w-8 h-8 rounded bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">calculate</span>
</div>
<span className="font-label text-label text-primary font-bold">Algebra II</span>
</div>
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-space-1">Intro to Quadratic Equations</h3>
<p className="font-body text-body text-on-surface-variant mb-space-4 line-clamp-2">Covers standard form, factoring simple quadratics, and an introduction to the quadratic formula.</p>
<div className="flex items-center gap-space-4 text-ink-500 font-caption text-caption">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
<span>4 Sections</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">attachment</span>
<span>2 Files</span>
</div>
<div className="flex items-center gap-1 ml-auto text-primary font-medium hover:underline">
<span>Edit Template</span>
</div>
</div>
</article>

<article className="bg-paper-0 border border-paper-200 hover:border-paper-300 shadow-sm rounded-xl p-space-4 cursor-pointer transition-all hover:bg-surface-bright group">
<div className="flex justify-between items-start mb-space-3">
<div className="flex items-center gap-space-2">
<div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">science</span>
</div>
<span className="font-label text-label text-on-surface-variant font-medium">WAEC Prep</span>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<h3 className="font-title-sm text-title-sm text-on-surface mb-space-1">Kinematics Review</h3>
<p className="font-body text-body text-on-surface-variant mb-space-4 line-clamp-2">Past WAEC questions on linear motion, velocity-time graphs, and equations of motion.</p>
<div className="flex items-center gap-space-4 text-ink-500 font-caption text-caption">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
<span>3 Sections</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">assignment</span>
<span>1 Homework</span>
</div>
</div>
</article>

<article className="bg-paper-0 border border-paper-200 hover:border-paper-300 shadow-sm rounded-xl p-space-4 cursor-pointer transition-all hover:bg-surface-bright group">
<div className="flex justify-between items-start mb-space-3">
<div className="flex items-center gap-space-2">
<div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">language</span>
</div>
<span className="font-label text-label text-on-surface-variant font-medium">English Lit</span>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<h3 className="font-title-sm text-title-sm text-on-surface mb-space-1">Themes in 'Things Fall Apart'</h3>
<p className="font-body text-body text-on-surface-variant mb-space-4 line-clamp-2">Character analysis of Okonkwo and discussion on tradition vs. change.</p>
<div className="flex items-center gap-space-4 text-ink-500 font-caption text-caption">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_list_numbered</span>
<span>5 Sections</span>
</div>
</div>
</article>
</div>

<div className="lg:col-span-7 bg-paper-0 border border-paper-200 rounded-2xl shadow-[0_2px_8px_rgba(22,33,30,0.04)] overflow-hidden flex flex-col h-[800px] sticky top-24">

<div className="px-space-6 py-space-4 border-b border-paper-200 bg-surface-bright flex justify-between items-center">
<div>
<div className="flex items-center gap-space-2 mb-1">
<span className="px-2 py-0.5 rounded bg-warning-tint text-secondary font-data-display text-[12px] font-bold tracking-tight uppercase">Draft</span>
<span className="font-caption text-caption text-ink-500">Last saved: 2 mins ago</span>
</div>
</div>
<div className="flex items-center gap-space-3">
<button className="text-on-surface-variant hover:text-primary font-label text-label px-space-3 py-space-2 rounded-lg transition-colors">Discard</button>
<button className="bg-paper-0 border border-primary text-primary px-space-4 py-space-2 rounded-lg font-label text-label font-bold hover:bg-primary-container/10 transition-colors">Save Draft</button>
<button className="bg-primary text-paper-0 px-space-4 py-space-2 rounded-lg font-label text-label font-bold hover:bg-primary-container transition-colors shadow-sm inline-flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                            Publish
                        </button>
</div>
</div>

<div className="flex-1 overflow-y-auto p-space-6 bg-background/50">

<div className="mb-space-8 space-y-space-4">
<div>
<label className="block font-label text-label text-on-surface-variant mb-space-1">Template Title</label>
<input className="w-full px-space-3 py-space-2 bg-paper-0 border border-paper-300 rounded-lg font-title-md text-title-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed transition-shadow" type="text" defaultValue="Intro to Quadratic Equations" />
</div>
<div className="grid grid-cols-2 gap-space-4">
<div>
<label className="block font-label text-label text-on-surface-variant mb-space-1">Subject / Category</label>
<select className="w-full px-space-3 py-space-2 bg-paper-0 border border-paper-300 rounded-lg font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed appearance-none">
<option>Algebra II</option>
<option>Geometry</option>
<option>Physics</option>
</select>
</div>
<div>
<label className="block font-label text-label text-on-surface-variant mb-space-1">Estimated Duration</label>
<div className="relative">
<input className="w-full pl-space-3 pr-10 py-space-2 bg-paper-0 border border-paper-300 rounded-lg font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed text-right" type="number" defaultValue="60" />
<span className="absolute right-space-3 top-1/2 -translate-y-1/2 font-caption text-caption text-on-surface-variant">mins</span>
</div>
</div>
</div>
<div>
<label className="block font-label text-label text-on-surface-variant mb-space-1">Learning Objectives</label>
<textarea className="w-full px-space-3 py-space-2 bg-paper-0 border border-paper-300 rounded-lg font-body text-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-fixed transition-shadow resize-none" rows="3" defaultValue="Students will be able to identify a quadratic equation in standard form and solve simple equations by factoring." />
</div>
</div>

<div className="mb-space-6">
<div className="flex items-center justify-between mb-space-4">
<h4 className="font-title-sm text-title-sm text-on-surface">Lesson Structure</h4>
<button className="text-primary font-label text-label font-bold hover:underline inline-flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">add_circle</span> Add Section
                            </button>
</div>
<div className="space-y-space-3">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 flex gap-space-3 group relative cursor-move hover:border-primary-fixed transition-colors">
<div className="text-paper-300 group-hover:text-ink-500 pt-1">
<span className="material-symbols-outlined">drag_indicator</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-space-2">
<input className="bg-transparent font-label text-label font-bold text-on-surface w-full focus:outline-none border-b border-transparent focus:border-primary-fixed px-1" type="text" defaultValue="1. Warm-up: Review Linear Equations" />
<span className="font-data-display text-[12px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">10 min</span>
</div>
<textarea className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-paper-200 rounded font-body text-body text-on-surface-variant focus:outline-none focus:border-primary focus:bg-paper-0 resize-none transition-all" rows="2" defaultValue="Quick 5-question quiz on solving 2x + 3 = 11 to activate prior knowledge." />
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 flex gap-space-3 group relative cursor-move hover:border-primary-fixed transition-colors">
<div className="text-paper-300 group-hover:text-ink-500 pt-1">
<span className="material-symbols-outlined">drag_indicator</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-space-2">
<input className="bg-transparent font-label text-label font-bold text-on-surface w-full focus:outline-none border-b border-transparent focus:border-primary-fixed px-1" type="text" defaultValue="2. Introduction to Standard Form" />
<span className="font-data-display text-[12px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">15 min</span>
</div>
<textarea className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-paper-200 rounded font-body text-body text-on-surface-variant focus:outline-none focus:border-primary focus:bg-paper-0 resize-none transition-all" rows="2" defaultValue="Define ax^2 + bx + c = 0. Show examples and non-examples (e.g., cubic equations)." />

<div className="mt-space-3 p-space-2 border border-paper-200 rounded-lg bg-surface-bright flex items-center justify-between">
<div className="flex items-center gap-space-2">
<span className="material-symbols-outlined text-primary text-[20px]">picture_as_pdf</span>
<span className="font-caption text-caption text-on-surface font-medium">Standard_Form_Cheatsheet.pdf</span>
</div>
<button className="text-on-surface-variant hover:text-danger-solid"><span className="material-symbols-outlined text-[18px]">close</span></button>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 flex gap-space-3 group relative cursor-move hover:border-primary-fixed transition-colors">
<div className="text-paper-300 group-hover:text-ink-500 pt-1">
<span className="material-symbols-outlined">drag_indicator</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-space-2">
<input className="bg-transparent font-label text-label font-bold text-on-surface w-full focus:outline-none border-b border-transparent focus:border-primary-fixed px-1" type="text" defaultValue="3. Solving by Factoring" />
<span className="font-data-display text-[12px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">25 min</span>
</div>
<textarea className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-paper-200 rounded font-body text-body text-on-surface-variant focus:outline-none focus:border-primary focus:bg-paper-0 resize-none transition-all" rows="2" defaultValue="Walkthrough finding factors of 'c' that add up to 'b' when 'a' is 1. Guided practice on whiteboard." />
</div>
</div>
</div>
</div>

<div className="border-t border-paper-200 pt-space-6 mt-space-6">
<h4 className="font-title-sm text-title-sm text-on-surface mb-space-3">Assigned Homework &amp; Materials</h4>
<div className="border border-dashed border-paper-300 rounded-xl p-space-6 text-center bg-surface-bright hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-12 h-12 bg-primary-container/10 text-primary rounded-full flex items-center justify-center mx-auto mb-space-2">
<span className="material-symbols-outlined">upload_file</span>
</div>
<p className="font-label text-label font-bold text-on-surface mb-1">Upload Worksheets or Links</p>
<p className="font-caption text-caption text-on-surface-variant">Drag and drop files here, or click to browse.</p>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
