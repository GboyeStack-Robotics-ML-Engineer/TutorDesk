import React from 'react';

export const MonthlyReportGeneratorDesktop = () => {
  return (
    <>
      

<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-4 mb-space-8">
<div>
<h1 className="font-display-lg text-display-lg text-ink-900">Report Generator</h1>
<p className="font-body-lg text-body-lg text-ink-500 mt-1">Reviewing auto-composed monthly report.</p>
</div>
<div className="flex items-center gap-space-3">
<button className="px-space-4 py-2 bg-paper-0 border border-primary text-primary font-title-sm text-title-sm rounded-lg hover:bg-paper-50 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[20px]">edit</span>
                    Edit
                </button>
<button className="px-space-4 py-2 bg-primary text-paper-0 font-title-sm text-title-sm rounded-lg hover:bg-primary-container transition-colors flex items-center gap-2 shadow-[0_2px_4px_rgba(22,33,30,0.1)]">
<span className="material-symbols-outlined text-[20px]">send</span>
                    Share to Parent Portal
                </button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl shadow-[0_2px_12px_rgba(22,33,30,0.06)] p-space-6 md:p-space-8 max-w-4xl mx-auto relative overflow-hidden">

<div className="border-b border-paper-200 pb-space-6 mb-space-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-space-4">
<div>
<div className="font-title-sm text-title-sm text-ink-500 uppercase tracking-wider mb-2">Monthly Progress Report</div>
<h2 className="font-display-md text-display-md text-ink-900">Amaka Nnamdi</h2>
<div className="font-body text-body text-ink-700 mt-1">Grade 10 Mathematics • October 2023</div>
</div>
<div className="text-right">
<div className="font-data-display text-data-display text-ink-900 bg-paper-100 px-3 py-1 rounded-md border border-paper-200 inline-block">ID: AN-2394-OCT</div>
<div className="font-caption text-caption text-ink-500 mt-2">Generated: Nov 1, 2023</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4 mb-space-8">

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 flex items-center gap-space-4">
<div className="w-12 h-12 rounded-full bg-success-tint flex items-center justify-center text-success-solid">
<span className="material-symbols-outlined">event_available</span>
</div>
<div>
<div className="font-label text-label text-ink-500 uppercase">Attendance</div>
<div className="font-display-md text-display-md text-ink-900">95%</div>
</div>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-lg p-space-4 flex items-center gap-space-4">
<div className="w-12 h-12 rounded-full bg-warning-tint flex items-center justify-center text-warning-solid">
<span className="material-symbols-outlined">monitoring</span>
</div>
<div>
<div className="font-label text-label text-ink-500 uppercase">Average Score</div>
<div className="font-display-md text-display-md text-ink-900">82%</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-6 mb-space-8">
<div>
<h3 className="font-title-md text-title-md text-ink-900 mb-space-3 flex items-center gap-2 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-success-solid">star</span>
                        Strengths
                    </h3>
<div className="bg-success-tint/30 border border-success-tint rounded-lg p-space-4">
<div className="font-title-sm text-title-sm text-success-solid mb-1">Algebraic Expressions</div>
<p className="font-body text-body text-ink-700">Amaka has shown exceptional understanding in simplifying complex algebraic equations and solving linear systems. Her methodology is clear and consistent.</p>
</div>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink-900 mb-space-3 flex items-center gap-2 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-warning-solid">target</span>
                        Focus Areas
                    </h3>
<div className="bg-warning-tint/30 border border-warning-tint rounded-lg p-space-4">
<div className="font-title-sm text-title-sm text-warning-solid mb-1">Trigonometry</div>
<p className="font-body text-body text-ink-700">We will dedicate more time next month to applying trigonometric ratios (sine, cosine, tangent) to real-world word problems to build confidence.</p>
</div>
</div>
</div>

<div className="mb-space-6">
<h3 className="font-title-md text-title-md text-ink-900 mb-space-3">Tutor's Note</h3>
<div className="font-body-lg text-body-lg text-ink-900 leading-relaxed space-y-4">
<p>Amaka has had a very productive October. Her engagement during our bi-weekly sessions remains high, and she consistently completes her assigned practice materials on time. I am particularly impressed by her resilience when tackling difficult algebra sets.</p>
<p>Moving into November, our primary goal will be to bridge the gap between abstract trigonometric concepts and practical applications. She is well-positioned for the upcoming mid-term assessments.</p>
</div>
</div>

<div className="mt-space-8 pt-space-4 border-t border-paper-200 flex justify-between items-center opacity-60">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-ink-500 text-[18px]">verified</span>
<span className="font-caption text-caption text-ink-500">Auto-generated via TutorDesk AI</span>
</div>
<div className="font-data-display text-data-display text-ink-500 text-xs">PAGE 1 OF 1</div>
</div>
</div>

    </>
  );
};
