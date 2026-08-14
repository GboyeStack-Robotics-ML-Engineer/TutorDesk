import React from 'react';

export const MaterialsLibraryDesktop = () => {
  return (
    <>
      

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-4 mb-space-8 shrink-0">
<div>
<div className="flex items-center gap-space-2 text-ink-500 font-label text-label mb-space-1">
<span>Library</span>
<span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
<span className="text-primary font-bold">All Materials</span>
</div>
<h2 className="font-display-lg text-display-lg text-on-background">Materials Library</h2>
</div>
<button className="bg-primary text-on-primary hover:bg-primary-container transition-colors py-space-2 px-space-4 rounded-lg flex items-center justify-center gap-space-2 font-title-sm text-title-sm whitespace-nowrap self-start sm:self-auto border border-primary">
<span className="material-symbols-outlined" data-icon="add">add</span>
                        Add material
                    </button>
</div>

<div className="flex flex-1 gap-space-6 overflow-hidden min-h-0">

<aside className="hidden lg:flex flex-col w-64 shrink-0 bg-paper-0 border border-paper-200 rounded-xl overflow-hidden h-full">
<div className="p-space-4 border-b border-paper-200 bg-paper-50 flex justify-between items-center">
<h3 className="font-title-sm text-title-sm text-on-background">Browse structure</h3>
<button className="text-ink-500 hover:text-on-background transition-colors p-1 rounded hover:bg-paper-200">
<span className="material-symbols-outlined text-[20px]" data-icon="keyboard_double_arrow_left">keyboard_double_arrow_left</span>
</button>
</div>
<div className="overflow-y-auto p-space-2 flex-1 custom-scrollbar">

<div className="mb-1">
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg hover:bg-paper-100 transition-colors text-left group">
<span className="material-symbols-outlined text-ink-500 text-[20px] transition-transform rotate-90" data-icon="chevron_right">chevron_right</span>
<span className="material-symbols-outlined text-tertiary text-[20px]" data-icon="folder" data-weight="fill">folder</span>
<span className="font-label text-label text-on-background flex-1">WAEC Prep</span>
</button>
<div className="pl-space-8 flex flex-col gap-1 mt-1">
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg bg-surface-container-low text-primary font-medium text-left">
<span className="material-symbols-outlined text-primary text-[20px]" data-icon="folder_open" data-weight="fill">folder_open</span>
<span className="font-label text-label">Mathematics</span>
</button>
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg hover:bg-paper-100 text-ink-700 text-left transition-colors">
<span className="material-symbols-outlined text-ink-500 text-[20px]" data-icon="folder" data-weight="fill">folder</span>
<span className="font-label text-label">English Language</span>
</button>
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg hover:bg-paper-100 text-ink-700 text-left transition-colors">
<span className="material-symbols-outlined text-ink-500 text-[20px]" data-icon="folder" data-weight="fill">folder</span>
<span className="font-label text-label">Physics</span>
</button>
</div>
</div>

<div className="mb-1">
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg hover:bg-paper-100 transition-colors text-left group">
<span className="material-symbols-outlined text-ink-500 text-[20px] transition-transform group-hover:text-on-background" data-icon="chevron_right">chevron_right</span>
<span className="material-symbols-outlined text-ink-500 text-[20px]" data-icon="folder" data-weight="fill">folder</span>
<span className="font-label text-label text-ink-700 flex-1">JAMB Intensive</span>
</button>
</div>

<div className="mb-1">
<button className="w-full flex items-center gap-space-2 p-space-2 rounded-lg hover:bg-paper-100 transition-colors text-left group">
<span className="material-symbols-outlined text-ink-500 text-[20px] transition-transform group-hover:text-on-background" data-icon="chevron_right">chevron_right</span>
<span className="material-symbols-outlined text-ink-500 text-[20px]" data-icon="folder" data-weight="fill">folder</span>
<span className="font-label text-label text-ink-700 flex-1">Junior Sec (JSS 1-3)</span>
</button>
</div>
</div>
</aside>

<div className="flex-1 flex flex-col h-full overflow-hidden">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-3 mb-space-4 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-space-4">
<div className="flex items-center gap-space-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
<button className="bg-surface-tint text-paper-0 px-space-3 py-space-1 rounded-full font-label text-label border border-surface-tint whitespace-nowrap">All Types</button>
<button className="bg-paper-100 text-ink-700 hover:bg-paper-200 px-space-3 py-space-1 rounded-full font-label text-label border border-paper-300 transition-colors whitespace-nowrap">Documents</button>
<button className="bg-paper-100 text-ink-700 hover:bg-paper-200 px-space-3 py-space-1 rounded-full font-label text-label border border-paper-300 transition-colors whitespace-nowrap">Slides</button>
<button className="bg-paper-100 text-ink-700 hover:bg-paper-200 px-space-3 py-space-1 rounded-full font-label text-label border border-paper-300 transition-colors whitespace-nowrap">Quizzes</button>
</div>
<div className="flex items-center gap-space-3 border-t sm:border-t-0 sm:border-l border-paper-200 pt-space-3 sm:pt-0 sm:pl-space-4 shrink-0">
<label className="flex items-center gap-space-2 cursor-pointer group">
<div className="relative">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-9 h-5 bg-paper-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</div>
<span className="font-label text-label text-ink-700 group-hover:text-on-background transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="cloud_download">cloud_download</span>
                                        Available offline
                                    </span>
</label>
<button className="text-ink-500 hover:bg-paper-200 p-1.5 rounded transition-colors flex items-center justify-center border border-paper-200 lg:hidden">
<span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
</button>
</div>
</div>

<div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-4 pb-space-8">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 elev-1 hover:border-primary-fixed/50 transition-colors group cursor-pointer flex flex-col h-full relative">
<div className="absolute top-space-4 right-space-4 z-10">
<button className="text-ink-500 hover:text-primary transition-colors bg-paper-0/80 rounded-full p-1 backdrop-blur-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</div>
<div className="flex items-start gap-space-3 mb-space-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low border border-paper-200 flex items-center justify-center shrink-0 text-danger-solid group-hover:bg-danger-tint/30 transition-colors">
<span className="material-symbols-outlined text-[28px]" data-icon="picture_as_pdf" data-weight="fill">picture_as_pdf</span>
</div>
<div className="pr-6">
<div className="flex items-center gap-2 mb-1">
<span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-700 tracking-wider uppercase border border-paper-300">WAEC</span>
<span className="bg-success-tint px-2 py-0.5 rounded text-[10px] font-bold text-success-solid tracking-wider uppercase border border-success-solid/20 flex items-center gap-0.5">
<span className="material-symbols-outlined text-[10px]" data-icon="offline_pin">offline_pin</span> Offline
                                                </span>
</div>
<h4 className="font-title-sm text-title-sm text-on-background line-clamp-2 group-hover:text-primary transition-colors">Algebraic Fractions &amp; Equations Past Questions</h4>
</div>
</div>
<div className="mt-auto pt-space-3 border-t border-paper-200 flex justify-between items-center">
<p className="font-caption text-caption text-ink-500">Mathematics • SS3</p>
<p className="font-data-display text-data-display text-ink-500 text-[12px]">2.4 MB</p>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 elev-1 hover:border-primary-fixed/50 transition-colors group cursor-pointer flex flex-col h-full relative">
<div className="absolute top-space-4 right-space-4 z-10">
<button className="text-ink-500 hover:text-primary transition-colors bg-paper-0/80 rounded-full p-1 backdrop-blur-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</div>
<div className="flex items-start gap-space-3 mb-space-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low border border-paper-200 flex items-center justify-center shrink-0 text-secondary group-hover:bg-warning-tint/30 transition-colors">
<span className="material-symbols-outlined text-[28px]" data-icon="slideshow" data-weight="fill">slideshow</span>
</div>
<div className="pr-6">
<div className="flex items-center gap-2 mb-1">
<span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-700 tracking-wider uppercase border border-paper-300">WAEC</span>
<span className="bg-success-tint px-2 py-0.5 rounded text-[10px] font-bold text-success-solid tracking-wider uppercase border border-success-solid/20 flex items-center gap-0.5">
<span className="material-symbols-outlined text-[10px]" data-icon="offline_pin">offline_pin</span> Offline
                                                </span>
</div>
<h4 className="font-title-sm text-title-sm text-on-background line-clamp-2 group-hover:text-primary transition-colors">Introduction to Trigonometry (Slide Deck)</h4>
</div>
</div>
<div className="mt-auto pt-space-3 border-t border-paper-200 flex justify-between items-center">
<p className="font-caption text-caption text-ink-500">Mathematics • SS2</p>
<p className="font-data-display text-data-display text-ink-500 text-[12px]">5.1 MB</p>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 elev-1 hover:border-primary-fixed/50 transition-colors group cursor-pointer flex flex-col h-full relative">
<div className="absolute top-space-4 right-space-4 z-10">
<button className="text-ink-500 hover:text-primary transition-colors bg-paper-0/80 rounded-full p-1 backdrop-blur-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</div>
<div className="flex items-start gap-space-3 mb-space-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low border border-paper-200 flex items-center justify-center shrink-0 text-primary group-hover:bg-success-tint/30 transition-colors">
<span className="material-symbols-outlined text-[28px]" data-icon="quiz" data-weight="fill">quiz</span>
</div>
<div className="pr-6">
<div className="flex items-center gap-2 mb-1">
<span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-700 tracking-wider uppercase border border-paper-300">JAMB</span>
<span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-500 tracking-wider uppercase border border-paper-300 flex items-center gap-0.5">
<span className="material-symbols-outlined text-[10px]" data-icon="cloud">cloud</span> Online
                                                </span>
</div>
<h4 className="font-title-sm text-title-sm text-on-background line-clamp-2 group-hover:text-primary transition-colors">Mock Exam 1: Quantitative Reasoning</h4>
</div>
</div>
<div className="mt-auto pt-space-3 border-t border-paper-200 flex justify-between items-center">
<p className="font-caption text-caption text-ink-500">General Math • Intensive</p>
<p className="font-caption text-caption text-ink-500 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="timer">timer</span> 45m</p>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-4 elev-1 hover:border-primary-fixed/50 transition-colors group cursor-pointer flex flex-col h-full relative">
<div className="absolute top-space-4 right-space-4 z-10">
<button className="text-ink-500 hover:text-primary transition-colors bg-paper-0/80 rounded-full p-1 backdrop-blur-sm">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</div>
<div className="flex items-start gap-space-3 mb-space-3">
<div className="w-12 h-12 rounded-lg bg-surface-container-low border border-paper-200 flex items-center justify-center shrink-0 text-primary-container group-hover:bg-primary-fixed/30 transition-colors">
<span className="material-symbols-outlined text-[28px]" data-icon="article" data-weight="fill">article</span>
</div>
<div className="pr-6">
<div className="flex items-center gap-2 mb-1">
<span className="bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold text-ink-700 tracking-wider uppercase border border-paper-300">Internal</span>
<span className="bg-success-tint px-2 py-0.5 rounded text-[10px] font-bold text-success-solid tracking-wider uppercase border border-success-solid/20 flex items-center gap-0.5">
<span className="material-symbols-outlined text-[10px]" data-icon="offline_pin">offline_pin</span> Offline
                                                </span>
</div>
<h4 className="font-title-sm text-title-sm text-on-background line-clamp-2 group-hover:text-primary transition-colors">Lesson Plan: Circle Geometry Fundamentals</h4>
</div>
</div>
<div className="mt-auto pt-space-3 border-t border-paper-200 flex justify-between items-center">
<p className="font-caption text-caption text-ink-500">Mathematics • SS1</p>
<p className="font-data-display text-data-display text-ink-500 text-[12px]">1.2 MB</p>
</div>
</div>

<div className="bg-transparent border border-dashed border-outline-variant rounded-xl p-space-4 hover:border-primary hover:bg-surface-container-low transition-colors group cursor-pointer flex flex-col items-center justify-center h-full min-h-[160px] text-ink-500 hover:text-primary">
<span className="material-symbols-outlined text-[32px] mb-space-2" data-icon="add_circle">add_circle</span>
<h4 className="font-title-sm text-title-sm">Upload New Material</h4>
<p className="font-caption text-caption text-center mt-1 max-w-[200px]">Drag and drop files here or click to browse.</p>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
