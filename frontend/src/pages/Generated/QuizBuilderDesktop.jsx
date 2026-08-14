import React from 'react';

export const QuizBuilderDesktop = () => {
  return (
    <>
      
<div className="max-w-max-width w-full grid grid-cols-12 gap-space-6 items-start">

<div className="col-span-8 flex flex-col gap-space-4 pb-space-8">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-diffuse relative group transition-all">

<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-3">
<span className="bg-surface-container text-ink-700 font-data-display text-data-display w-8 h-8 rounded-full flex items-center justify-center">1</span>
<span className="font-label text-label text-ink-500 bg-paper-100 px-2 py-1 rounded">Multiple Choice</span>
</div>
<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="text-ink-500 hover:text-primary p-1 rounded hover:bg-paper-100"><span className="material-symbols-outlined text-sm">content_copy</span></button>
<button className="text-danger-solid hover:bg-danger-tint p-1 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>

<div className="mb-space-6">
<textarea className="w-full bg-transparent border-0 border-b border-paper-200 focus:border-primary focus:ring-0 px-0 py-2 font-title-sm text-title-sm text-on-surface resize-none placeholder-ink-500" rows="2" defaultValue="What is the formula for the circumference of a circle given its radius 'r'?" />
</div>

<div className="flex flex-col gap-space-3">

<div className="flex items-center gap-3 group/opt">
<button className="w-6 h-6 rounded-full border border-paper-300 flex items-center justify-center text-paper-0 hover:border-primary transition-colors"></button>
<input className="flex-1 bg-surface-container-lowest border border-paper-200 rounded py-2 px-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body" type="text" defaultValue="πr²" />
<button className="text-ink-500 opacity-0 group-hover/opt:opacity-100 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">close</span></button>
</div>

<div className="flex items-center gap-3 group/opt">
<button className="w-6 h-6 rounded-full border border-success-solid bg-success-solid flex items-center justify-center text-paper-0">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"\"FILL\" 1"}}>check_circle</span>
</button>
<div className="flex-1 relative">
<input className="w-full bg-success-tint/30 border border-success-solid rounded py-2 px-3 focus:outline-none font-body text-body text-success-solid font-medium" type="text" defaultValue="2πr" />
<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-label text-success-solid bg-success-tint px-2 py-0.5 rounded">Answer</span>
</div>
<button className="text-ink-500 opacity-0 group-hover/opt:opacity-100 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">close</span></button>
</div>

<div className="flex items-center gap-3 group/opt">
<button className="w-6 h-6 rounded-full border border-paper-300 flex items-center justify-center text-paper-0 hover:border-primary transition-colors"></button>
<input className="flex-1 bg-surface-container-lowest border border-paper-200 rounded py-2 px-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body" type="text" defaultValue="πd²" />
<button className="text-ink-500 opacity-0 group-hover/opt:opacity-100 hover:text-danger-solid p-1"><span className="material-symbols-outlined text-sm">close</span></button>
</div>

<button className="flex items-center gap-2 text-primary font-label text-label py-2 hover:bg-paper-100 rounded w-max px-2 mt-1 transition-colors">
<span className="material-symbols-outlined text-sm">add</span> Add Option
                             </button>
</div>

<div className="mt-space-6 pt-space-4 border-t border-paper-200 flex justify-end items-center gap-3">
<span className="font-label text-label text-ink-500">Points</span>
<input className="w-16 text-center border border-paper-200 rounded py-1 px-2 font-data-display text-data-display focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="number" defaultValue="1" />
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-diffuse relative group transition-all">
<div className="flex justify-between items-start mb-space-4">
<div className="flex items-center gap-3">
<span className="bg-surface-container text-ink-700 font-data-display text-data-display w-8 h-8 rounded-full flex items-center justify-center">2</span>
<span className="font-label text-label text-ink-500 bg-paper-100 px-2 py-1 rounded">Short Answer</span>
</div>
<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="text-ink-500 hover:text-primary p-1 rounded hover:bg-paper-100"><span className="material-symbols-outlined text-sm">content_copy</span></button>
<button className="text-danger-solid hover:bg-danger-tint p-1 rounded"><span className="material-symbols-outlined text-sm">delete</span></button>
</div>
</div>
<div className="mb-space-6">
<textarea className="w-full bg-transparent border-0 border-b border-paper-200 focus:border-primary focus:ring-0 px-0 py-2 font-title-sm text-title-sm text-on-surface resize-none placeholder-ink-500" rows="2" defaultValue="Explain the relationship between the radius and diameter of a circle." />
</div>
<div className="bg-surface-container-lowest border border-dashed border-paper-300 rounded p-space-4 text-ink-500 font-body text-body italic">
                            Student answer will be entered here...
                        </div>
<div className="mt-space-4">
<label className="block font-label text-label text-ink-700 mb-1">Keywords for auto-grading (optional)</label>
<input className="w-full border border-paper-200 rounded py-2 px-3 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" placeholder="e.g. twice, double, half" type="text" />
</div>
<div className="mt-space-6 pt-space-4 border-t border-paper-200 flex justify-end items-center gap-3">
<span className="font-label text-label text-ink-500">Points</span>
<input className="w-16 text-center border border-paper-200 rounded py-1 px-2 font-data-display text-data-display focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="number" defaultValue="3" />
</div>
</div>

<button className="w-full border-2 border-dashed border-paper-300 rounded-xl p-space-6 flex flex-col items-center justify-center text-ink-500 hover:text-primary hover:border-primary hover:bg-paper-100 transition-all gap-2 group">
<span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">add_circle</span>
<span className="font-title-sm text-title-sm">Add New Question</span>
</button>
</div>

<div className="col-span-4 sticky top-space-4">
<div className="bg-paper-0 border border-paper-200 rounded-xl overflow-hidden shadow-diffuse">
<div className="bg-surface-container p-space-4 border-b border-paper-200 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"\"FILL\" 1"}}>tune</span>
<h3 className="font-title-sm text-title-sm text-on-surface">Quiz Settings</h3>
</div>
<div className="p-space-6 flex flex-col gap-space-6">

<div>
<h4 className="font-label text-label text-ink-700 uppercase tracking-wider mb-space-3">Access &amp; Timing</h4>
<div className="flex flex-col gap-space-4">
<div>
<label className="block font-label text-label text-ink-700 mb-1">Time Limit</label>
<div className="flex items-center gap-2">
<input className="flex-1 border border-paper-200 rounded py-2 px-3 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="number" defaultValue="30" />
<span className="font-body text-body text-ink-500">mins</span>
</div>
</div>
<div>
<label className="block font-label text-label text-ink-700 mb-1">Allowed Attempts</label>
<select className="w-full border border-paper-200 rounded py-2 px-3 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-paper-0">
<option selected="" value="1">1 Attempt</option>
<option value="2">2 Attempts</option>
<option value="3">3 Attempts</option>
<option value="unlimited">Unlimited</option>
</select>
</div>
</div>
</div>
<hr className="border-paper-200" />

<div>
<h4 className="font-label text-label text-ink-700 uppercase tracking-wider mb-space-3">Grading</h4>
<div className="flex flex-col gap-space-3">
<label className="flex items-start gap-3 cursor-pointer group">
<div className="relative flex items-center mt-0.5">
<input checked="" className="w-4 h-4 rounded border-paper-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" type="checkbox" />
</div>
<div>
<span className="block font-label text-label text-on-surface group-hover:text-primary transition-colors">Auto-grade MCQ</span>
<span className="block font-caption text-caption text-ink-500 mt-0.5">Instantly score multiple choice</span>
</div>
</label>
<label className="flex items-start gap-3 cursor-pointer group">
<div className="relative flex items-center mt-0.5">
<input className="w-4 h-4 rounded border-paper-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer" type="checkbox" />
</div>
<div>
<span className="block font-label text-label text-on-surface group-hover:text-primary transition-colors">Show Answers Post-Submission</span>
<span className="block font-caption text-caption text-ink-500 mt-0.5">Students see correct answers immediately</span>
</div>
</label>
</div>
</div>
<div className="bg-surface-container rounded p-space-4 mt-space-2 border border-paper-200">
<div className="flex justify-between items-center mb-1">
<span className="font-label text-label text-ink-700">Total Points</span>
<span className="font-data-display text-data-display text-primary font-bold">4</span>
</div>
<div className="flex justify-between items-center">
<span className="font-label text-label text-ink-700">Questions</span>
<span className="font-data-display text-data-display text-ink-900">2</span>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
