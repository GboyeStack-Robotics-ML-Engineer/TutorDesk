import React from 'react';

export const QuizBuilderDesktopAdmin = () => {
  return (
    <>
      
<div className="max-w-max-width mx-auto flex gap-space-8">

<div className="flex-1 flex flex-col gap-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-sm">
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-space-3">
<span className="font-data-display text-data-display text-primary bg-primary-fixed/20 px-2 py-1 rounded">Q1</span>
<span className="font-label text-label text-ink-500 uppercase tracking-wide">Multiple Choice</span>
</div>
<div className="flex gap-2 text-ink-500">
<button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">content_copy</span></button>
<button className="hover:text-danger-solid transition-colors"><span className="material-symbols-outlined">delete</span></button>
<button className="hover:text-primary transition-colors cursor-move"><span className="material-symbols-outlined">drag_indicator</span></button>
</div>
</div>
<div className="mb-space-4">
<label className="font-label text-label text-ink-700 block mb-space-2">Question Text</label>
<textarea className="w-full bg-surface border border-paper-200 rounded-lg p-space-3 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none" rows="2" defaultValue="What is the formula for calculating kinetic energy?" />
</div>
<div className="space-y-space-3">
<label className="font-label text-label text-ink-700 block">Options &amp; Answer Key</label>
<div className="flex items-center gap-space-3">
<input className="text-primary focus:ring-primary w-4 h-4 border-paper-300" name="q1_answer" type="radio" />
<input className="flex-1 bg-surface border border-paper-200 rounded p-2 font-data-display text-data-display focus:border-primary focus:outline-none" type="text" defaultValue="E = mc^2" />
<button className="text-ink-500 hover:text-danger-solid"><span className="material-symbols-outlined">close</span></button>
</div>
<div className="flex items-center gap-space-3">
<input checked="" className="text-primary focus:ring-primary w-4 h-4 border-paper-300" name="q1_answer" type="radio" />
<input className="flex-1 bg-surface border-primary ring-1 ring-primary-fixed-dim/50 rounded p-2 font-data-display text-data-display focus:outline-none" type="text" defaultValue="KE = 1/2 mv^2" />
<span className="text-success-solid bg-success-tint px-2 py-1 rounded text-caption font-label flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> Correct</span>
<button className="text-ink-500 hover:text-danger-solid"><span className="material-symbols-outlined">close</span></button>
</div>
<div className="flex items-center gap-space-3">
<input className="text-primary focus:ring-primary w-4 h-4 border-paper-300" name="q1_answer" type="radio" />
<input className="flex-1 bg-surface border border-paper-200 rounded p-2 font-data-display text-data-display focus:border-primary focus:outline-none" type="text" defaultValue="F = ma" />
<button className="text-ink-500 hover:text-danger-solid"><span className="material-symbols-outlined">close</span></button>
</div>
<button className="flex items-center gap-2 text-primary font-label text-label hover:text-primary-container mt-space-2">
<span className="material-symbols-outlined">add</span> Add Option
                            </button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-sm">
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-space-3">
<span className="font-data-display text-data-display text-primary bg-primary-fixed/20 px-2 py-1 rounded">Q2</span>
<span className="font-label text-label text-ink-500 uppercase tracking-wide">Short Answer</span>
</div>
<div className="flex gap-2 text-ink-500">
<button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">content_copy</span></button>
<button className="hover:text-danger-solid transition-colors"><span className="material-symbols-outlined">delete</span></button>
<button className="hover:text-primary transition-colors cursor-move"><span className="material-symbols-outlined">drag_indicator</span></button>
</div>
</div>
<div className="mb-space-4">
<label className="font-label text-label text-ink-700 block mb-space-2">Question Text</label>
<textarea className="w-full bg-surface border border-paper-200 rounded-lg p-space-3 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none" rows="2" defaultValue="Explain briefly why the sky appears blue during the day." />
</div>
<div>
<label className="font-label text-label text-ink-700 block mb-space-2">Expected Keywords (Auto-grading)</label>
<div className="flex flex-wrap gap-2 mb-2">
<span className="bg-paper-100 border border-paper-200 px-3 py-1 rounded-full font-label text-label flex items-center gap-1 text-ink-900">Rayleigh scattering <button className="hover:text-danger-solid"><span className="material-symbols-outlined text-[14px]">close</span></button></span>
<span className="bg-paper-100 border border-paper-200 px-3 py-1 rounded-full font-label text-label flex items-center gap-1 text-ink-900">shorter wavelengths <button className="hover:text-danger-solid"><span className="material-symbols-outlined text-[14px]">close</span></button></span>
</div>
<input className="w-full bg-surface border border-paper-200 rounded p-2 font-body text-body focus:border-primary focus:outline-none" placeholder="Add keyword..." type="text" />
</div>
</div>

<button className="border-2 border-dashed border-paper-300 bg-surface rounded-lg p-space-4 flex items-center justify-center gap-2 text-ink-500 hover:text-primary hover:border-primary hover:bg-paper-0 transition-all font-title-sm text-title-sm">
<span className="material-symbols-outlined">add_circle</span> Add New Question
                    </button>
</div>

<div className="w-80 flex flex-col gap-space-6 shrink-0">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-sm">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 border-b border-paper-200 pb-2">Quiz Settings</h3>
<div className="space-y-space-4">
<div>
<label className="font-label text-label text-ink-700 block mb-space-1">Total Points</label>
<div className="font-data-display text-data-display text-primary">20 pts</div>
</div>
<div>
<label className="font-label text-label text-ink-700 block mb-space-2">Time Limit (Minutes)</label>
<input className="w-full bg-surface border border-paper-200 rounded p-2 font-data-display text-data-display focus:border-primary focus:outline-none" type="number" defaultValue="30" />
</div>
<label className="flex items-center gap-3 cursor-pointer">
<input checked="" className="text-primary focus:ring-primary rounded border-paper-300 h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-900">Shuffle Questions</span>
</label>
<label className="flex items-center gap-3 cursor-pointer">
<input className="text-primary focus:ring-primary rounded border-paper-300 h-4 w-4" type="checkbox" />
<span className="font-label text-label text-ink-900">Allow Retakes</span>
</label>
</div>
<div className="mt-space-6 pt-space-4 border-t border-paper-200 flex flex-col gap-space-3">
<button className="w-full bg-primary text-on-primary rounded-lg py-2 px-4 font-title-sm text-title-sm hover:bg-on-primary-fixed-variant transition-colors">
                                Save &amp; Publish
                            </button>
<button className="w-full bg-paper-0 border border-primary text-primary rounded-lg py-2 px-4 font-title-sm text-title-sm flex items-center justify-center gap-2 hover:bg-paper-50 transition-colors">
<span className="material-symbols-outlined text-[18px]">visibility</span> Preview Mode
                            </button>
</div>
</div>

<div className="bg-surface border border-paper-200 rounded-lg p-space-4 flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-success-solid"></div>
<span className="font-label text-label text-ink-700">All changes saved to cloud</span>
<span className="material-symbols-outlined text-ink-500 ml-auto" data-icon="cloud_done">cloud_done</span>
</div>
</div>
</div>

    </>
  );
};
