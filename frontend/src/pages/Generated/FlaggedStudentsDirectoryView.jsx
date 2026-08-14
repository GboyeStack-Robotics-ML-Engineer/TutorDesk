import React from 'react';

export const FlaggedStudentsDirectoryView = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-gutter-desktop bg-surface-container-low">
<div className="max-w-[1200px] mx-auto">

<div className="grid grid-cols-3 gap-space-4 mb-space-8">
<div className="bg-paper-0 p-space-4 rounded-lg border hairline-border border-paper-200 elev-1">
<div className="flex items-center gap-2 text-danger-solid mb-2">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>warning</span>
<span className="font-label text-label uppercase tracking-wider">High Priority</span>
</div>
<p className="font-display-lg text-display-lg text-ink-900">12</p>
<p className="font-caption text-caption text-ink-500">Requires contact today</p>
</div>
<div className="bg-paper-0 p-space-4 rounded-lg border hairline-border border-paper-200 elev-1">
<div className="flex items-center gap-2 text-warning-solid mb-2">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>schedule</span>
<span className="font-label text-label uppercase tracking-wider">Missed Sessions</span>
</div>
<p className="font-display-lg text-display-lg text-ink-900">8</p>
<p className="font-caption text-caption text-ink-500">2+ consecutive absences</p>
</div>
<div className="bg-paper-0 p-space-4 rounded-lg border hairline-border border-paper-200 elev-1">
<div className="flex items-center gap-2 text-secondary mb-2">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>trending_down</span>
<span className="font-label text-label uppercase tracking-wider">Performance Drop</span>
</div>
<p className="font-display-lg text-display-lg text-ink-900">5</p>
<p className="font-caption text-caption text-ink-500">&gt;15% score decrease</p>
</div>
</div>

<div className="flex items-center justify-between mb-space-4 px-space-2">
<h3 className="font-title-md text-title-md text-ink-900">Flagged Roster</h3>
<div className="flex items-center gap-2 font-label text-label text-ink-500">
<span>Sorted by:</span>
<button className="flex items-center text-primary hover:text-primary-container font-semibold">
                            Severity <span className="material-symbols-outlined text-sm ml-1">arrow_downward</span>
</button>
</div>
</div>

<div className="flex flex-col gap-space-2">

<div className="bg-paper-0 border hairline-border border-danger-tint rounded-lg p-space-4 flex items-center justify-between hover:bg-surface-bright transition-colors group relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-solid"></div>
<div className="flex items-center gap-space-6 flex-1 ml-2">
<div className="flex items-center gap-space-3 w-1/3">
<img className="w-12 h-12 rounded-full object-cover border hairline-border border-paper-200" data-alt="A professional headshot of a young Nigerian student looking slightly concerned but determined, warm natural lighting, modern minimalist background with subtle academic elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDojqvMboU77avA5sVB4W-FdN4g2ELFW0W-nGeaI8s9hcE5Ywmy9ECMXz6oD65Zd1aqcr8HP1z6atZaexHKk9kDIWsMIEpguo1deHBQlD3-mpQ-42y2HIOHVSHY5XwidUyH3-waWKKg_GvdEJKAkVot9GdJibj7yw8v3ceTm9djLLad2eh8utfPYHtW5F0hiz4csyXtEy7wYaxJIioWcvoqpXYqiytwOwtvX9C7ALMCMhqp2dlCiw3H" />
<div>
<p className="font-title-sm text-title-sm text-ink-900 group-hover:text-primary transition-colors cursor-pointer">Chinedu Okeke</p>
<p className="font-caption text-caption text-ink-500">Grade 11 Mathematics</p>
</div>
</div>
<div className="flex-1 flex gap-2">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-danger-tint text-danger-solid font-label text-label">
<span className="material-symbols-outlined text-[14px]">warning</span>
                                    Missed 3 Sessions
                                </span>
<span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-warning-tint text-warning-solid font-label text-label">
<span className="material-symbols-outlined text-[14px]">trending_down</span>
                                    Score: 45% (was 68%)
                                </span>
</div>
<div className="text-right w-1/5 pr-4">
<p className="font-data-display text-data-display text-ink-700">Last contact:</p>
<p className="font-caption text-caption text-error font-semibold">7 days ago</p>
</div>
</div>
<div className="flex items-center gap-space-3">
<button className="p-2 text-ink-500 hover:text-primary transition-colors border hairline-border border-transparent hover:border-paper-300 rounded bg-paper-0" title="View History">
<span className="material-symbols-outlined">history</span>
</button>
<button className="px-4 py-2 bg-paper-0 border hairline-border border-primary text-primary rounded font-label text-label hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">call</span>
                                Follow Up
                            </button>
</div>
</div>

<div className="bg-paper-0 border hairline-border border-danger-tint rounded-lg p-space-4 flex items-center justify-between hover:bg-surface-bright transition-colors group relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-danger-solid"></div>
<div className="flex items-center gap-space-6 flex-1 ml-2">
<div className="flex items-center gap-space-3 w-1/3">
<div className="w-12 h-12 rounded-full bg-paper-200 flex items-center justify-center font-title-lg text-ink-500">AO</div>
<div>
<p className="font-title-sm text-title-sm text-ink-900 group-hover:text-primary transition-colors cursor-pointer">Aisha Olayinka</p>
<p className="font-caption text-caption text-ink-500">A-Level Physics</p>
</div>
</div>
<div className="flex-1 flex gap-2">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-danger-tint text-danger-solid font-label text-label">
<span className="material-symbols-outlined text-[14px]">payments</span>
                                    Payment Overdue (14d)
                                </span>
</div>
<div className="text-right w-1/5 pr-4">
<p className="font-data-display text-data-display text-ink-700">Last contact:</p>
<p className="font-caption text-caption text-error font-semibold">15 days ago</p>
</div>
</div>
<div className="flex items-center gap-space-3">
<button className="p-2 text-ink-500 hover:text-primary transition-colors border hairline-border border-transparent hover:border-paper-300 rounded bg-paper-0">
<span className="material-symbols-outlined">history</span>
</button>
<button className="px-4 py-2 bg-paper-0 border hairline-border border-primary text-primary rounded font-label text-label hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">mail</span>
                                Send Reminder
                            </button>
</div>
</div>

<div className="bg-paper-0 border hairline-border border-paper-200 rounded-lg p-space-4 flex items-center justify-between hover:bg-surface-bright transition-colors group relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-warning-solid"></div>
<div className="flex items-center gap-space-6 flex-1 ml-2">
<div className="flex items-center gap-space-3 w-1/3">
<img className="w-12 h-12 rounded-full object-cover border hairline-border border-paper-200" data-alt="A thoughtful portrait of a male teenager in a quiet study environment, warm paper-toned lighting, crisp focus on the face with a gently blurred background of books." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjiJdKrWJkqNlP7DrVu6_FDn7vzSxfgauU7dL76hyp7CKUUp6QTeAMuPDZbpfsn8aD5vKpJzG3RVJb7nd_5J-zfGI2r_HclQYgxJ1TpraMdQeMOTkc7Lox0gWSDqMxr4LvgC-wCHAu4cOkjZ_F9RpTs4Jbyg7db69Qm1NPX7f9gfJahMR1S261JZ_a21H9pypNDzu_p019zM8LkI5FBlyr8Y3GGC1FQvV3M5Zs_rjiLEu8xGAGU64j" />
<div>
<p className="font-title-sm text-title-sm text-ink-900 group-hover:text-primary transition-colors cursor-pointer">Emmanuel Bassey</p>
<p className="font-caption text-caption text-ink-500">Grade 9 English</p>
</div>
</div>
<div className="flex-1 flex gap-2">
<span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-warning-tint text-warning-solid font-label text-label">
<span className="material-symbols-outlined text-[14px]">assignment_late</span>
                                    Incomplete Assignments
                                </span>
</div>
<div className="text-right w-1/5 pr-4">
<p className="font-data-display text-data-display text-ink-700">Last contact:</p>
<p className="font-caption text-caption text-ink-500">2 days ago</p>
</div>
</div>
<div className="flex items-center gap-space-3">
<button className="p-2 text-ink-500 hover:text-primary transition-colors border hairline-border border-transparent hover:border-paper-300 rounded bg-paper-0">
<span className="material-symbols-outlined">history</span>
</button>
<button className="px-4 py-2 bg-paper-0 border hairline-border border-ink-500 text-ink-700 rounded font-label text-label hover:bg-paper-100 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">chat</span>
                                Message
                            </button>
</div>
</div>
</div>

<div className="mt-space-6 flex justify-center">
<button className="px-6 py-2 bg-paper-0 border hairline-border border-paper-300 rounded-full font-label text-label text-ink-700 hover:bg-paper-100 transition-colors shadow-sm">
                        Load More Flagged Students
                    </button>
</div>
</div>
</div>

    </>
  );
};
