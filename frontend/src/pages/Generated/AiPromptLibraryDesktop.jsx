import React from 'react';

export const AiPromptLibraryDesktop = () => {
  return (
    <>
      

<div className="mb-space-8 flex flex-col sm:flex-row sm:items-end justify-between gap-space-4">
<div>
<div className="flex items-center gap-space-2 text-ink-500 mb-space-2">
<span className="material-symbols-outlined text-sm">folder_open</span>
<span className="font-label text-label">Library</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="font-label text-label text-primary font-bold">AI Prompts</span>
</div>
<h2 className="font-display-lg text-display-lg text-on-surface">AI Prompt Library</h2>
<p className="font-body text-body text-ink-500 mt-space-1">Curated instructions for planning, assessment, and administration.</p>
</div>
<div className="flex gap-space-3">
<button className="bg-paper-0 border border-primary text-primary hover:bg-surface-container-low font-title-sm text-title-sm py-2 px-4 rounded-lg flex items-center justify-center gap-space-2 transition-colors shadow-sm">
<span className="material-symbols-outlined text-sm">add</span>
                        New Prompt
                    </button>
</div>
</div>

<div className="space-y-space-8">

<section>
<div className="flex items-center gap-space-3 mb-space-4 border-b border-paper-200 pb-space-2">
<div className="w-8 h-8 rounded bg-tertiary-container/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">design_services</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface">Lesson Planning</h3>
<span className="bg-paper-100 text-ink-700 font-caption text-caption px-2 py-0.5 rounded-full ml-auto">4 items</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 shadow-[0_2px_8px_rgba(22,33,30,0.04)] hover:shadow-[0_4px_12px_rgba(22,33,30,0.08)] hover:border-paper-300 transition-all flex flex-col group">
<div className="flex justify-between items-start mb-space-3">
<div>
<h4 className="font-title-md text-title-md text-primary">Socratic Question Generator</h4>
<div className="flex gap-2 mt-1">
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Literature</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Discussion</span>
</div>
</div>
<button className="text-ink-500 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
<div className="bg-surface-bright border border-paper-200 rounded-lg p-space-3 mb-space-4 flex-1">
<p className="font-data-display text-data-display text-ink-700 line-clamp-3 italic">
                                    "Act as an expert English literature tutor. Generate 5 probing Socratic questions for a high school student reading [Book Title]. The questions should focus on themes of [Theme] and encourage critical thinking rather than simple recall. Provide a brief rationale for why each question is effective."
                                </p>
</div>
<div className="flex justify-between items-center pt-space-2 border-t border-paper-100 border-dashed">
<span className="font-caption text-caption text-ink-500 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">history</span>
                                    Used 12 times
                                </span>
<button className="bg-primary text-on-primary hover:bg-primary-container font-label text-label py-1.5 px-4 rounded-md flex items-center gap-1 transition-colors shadow-sm">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Use Prompt
                                </button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 shadow-[0_2px_8px_rgba(22,33,30,0.04)] hover:shadow-[0_4px_12px_rgba(22,33,30,0.08)] hover:border-paper-300 transition-all flex flex-col group">
<div className="flex justify-between items-start mb-space-3">
<div>
<h4 className="font-title-md text-title-md text-primary">Math Concept Simplifier</h4>
<div className="flex gap-2 mt-1">
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Math</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Analogies</span>
</div>
</div>
<button className="text-ink-500 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
<div className="bg-surface-bright border border-paper-200 rounded-lg p-space-3 mb-space-4 flex-1">
<p className="font-data-display text-data-display text-ink-700 line-clamp-3 italic">
                                    "Explain the mathematical concept of [Concept, e.g., derivatives] to a [Grade Level] student who is struggling to grasp it. Use a clear, real-world analogy that does not involve money. Break down the explanation into 3 simple steps, followed by a low-stakes practice problem."
                                </p>
</div>
<div className="flex justify-between items-center pt-space-2 border-t border-paper-100 border-dashed">
<span className="font-caption text-caption text-ink-500 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">history</span>
                                    Used 8 times
                                </span>
<button className="bg-primary text-on-primary hover:bg-primary-container font-label text-label py-1.5 px-4 rounded-md flex items-center gap-1 transition-colors shadow-sm">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Use Prompt
                                </button>
</div>
</div>
</div>
</section>

<section>
<div className="flex items-center gap-space-3 mb-space-4 border-b border-paper-200 pb-space-2">
<div className="w-8 h-8 rounded bg-secondary-fixed/30 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">rate_review</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface">Student Feedback</h3>
<span className="bg-paper-100 text-ink-700 font-caption text-caption px-2 py-0.5 rounded-full ml-auto">2 items</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 shadow-[0_2px_8px_rgba(22,33,30,0.04)] hover:shadow-[0_4px_12px_rgba(22,33,30,0.08)] hover:border-paper-300 transition-all flex flex-col group">
<div className="flex justify-between items-start mb-space-3">
<div>
<h4 className="font-title-md text-title-md text-primary">Constructive Essay Critique</h4>
<div className="flex gap-2 mt-1">
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Writing</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Feedback</span>
</div>
</div>
<button className="text-ink-500 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
<div className="bg-surface-bright border border-paper-200 rounded-lg p-space-3 mb-space-4 flex-1 relative overflow-hidden">
<div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-warning-tint/50 to-transparent rounded-bl-3xl"></div>
<p className="font-data-display text-data-display text-ink-700 line-clamp-3 italic relative z-10">
                                    "Review the following student essay on [Topic]. Provide feedback using the 'Glow and Grow' framework. Identify 2 specific strengths (Glows) with direct quotes from their text. Identify 2 specific areas for improvement (Grows) related to [Focus Area, e.g., thesis clarity], offering actionable suggestions for revision. Keep tone encouraging."
                                </p>
</div>
<div className="flex justify-between items-center pt-space-2 border-t border-paper-100 border-dashed">
<span className="font-caption text-caption text-ink-500 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">history</span>
                                    Used 24 times
                                </span>
<button className="bg-primary text-on-primary hover:bg-primary-container font-label text-label py-1.5 px-4 rounded-md flex items-center gap-1 transition-colors shadow-sm">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Use Prompt
                                </button>
</div>
</div>
</div>
</section>

<section>
<div className="flex items-center gap-space-3 mb-space-4 border-b border-paper-200 pb-space-2">
<div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-ink-700">
<span className="material-symbols-outlined">inventory_2</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface">Administrative</h3>
<span className="bg-paper-100 text-ink-700 font-caption text-caption px-2 py-0.5 rounded-full ml-auto">1 item</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 shadow-[0_2px_8px_rgba(22,33,30,0.04)] hover:shadow-[0_4px_12px_rgba(22,33,30,0.08)] hover:border-paper-300 transition-all flex flex-col group border-l-4 border-l-outline">
<div className="flex justify-between items-start mb-space-3">
<div>
<h4 className="font-title-md text-title-md text-primary">Parent Progress Update</h4>
<div className="flex gap-2 mt-1">
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Comms</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-ink-500 bg-surface-container px-1.5 py-0.5 rounded">Parents</span>
</div>
</div>
<button className="text-ink-500 hover:text-primary p-1 rounded-md hover:bg-surface-container-low transition-colors" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
<div className="bg-surface-bright border border-paper-200 rounded-lg p-space-3 mb-space-4 flex-1">
<p className="font-data-display text-data-display text-ink-700 line-clamp-3 italic">
                                    "Draft a concise, professional email to the parents of [Student Name]. Summarize their progress over the last 4 sessions covering [Subject/Topics]. Highlight one major breakthrough and one area we are currently focusing on. Maintain a positive, collaborative tone. Keep it under 150 words."
                                </p>
</div>
<div className="flex justify-between items-center pt-space-2 border-t border-paper-100 border-dashed">
<span className="font-caption text-caption text-ink-500 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">history</span>
                                    Used 5 times
                                </span>
<button className="bg-primary text-on-primary hover:bg-primary-container font-label text-label py-1.5 px-4 rounded-md flex items-center gap-1 transition-colors shadow-sm">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Use Prompt
                                </button>
</div>
</div>
</div>
</section>
</div>

<div className="mt-space-8 py-space-8 border-2 border-dashed border-paper-200 rounded-xl flex flex-col items-center justify-center text-center bg-surface-bright/50">
<div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-ink-500 mb-space-3">
<span className="material-symbols-outlined text-2xl">auto_awesome</span>
</div>
<h4 className="font-title-md text-title-md text-on-surface mb-1">Create a Custom Prompt</h4>
<p className="font-body text-body text-ink-500 max-w-sm mb-space-4">Save your most effective AI instructions here for quick access during lesson planning.</p>
<button className="bg-paper-0 border border-primary text-primary hover:bg-surface-container-low font-title-sm text-title-sm py-2 px-4 rounded-lg flex items-center justify-center gap-space-2 transition-colors shadow-sm">
<span className="material-symbols-outlined text-sm">add</span>
                    New Prompt
                </button>
</div>

    </>
  );
};
