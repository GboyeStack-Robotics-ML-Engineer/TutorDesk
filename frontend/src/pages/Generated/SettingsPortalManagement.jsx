import React from 'react';

export const SettingsPortalManagement = () => {
  return (
    <>
      
<div className="mb-space-8">
<h1 className="font-display-md text-display-md text-ink-900 mb-space-2">Portal Management</h1>
<p className="text-ink-500 font-body text-body">Control what parents and students see in their portal view.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6 items-start">
<div className="lg:col-span-2 space-y-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_4px_rgba(22,33,30,0.02)]">
<h2 className="font-title-sm text-title-sm text-ink-900 mb-space-4">Portal Access Link</h2>
<p className="text-ink-500 font-body text-body mb-space-4">Share this unique link with parents so they can access the student portal.</p>
<div className="flex items-center gap-space-2 mt-space-2">
<div className="flex-1 bg-surface-container-low border border-paper-200 rounded px-space-3 py-space-2 font-data-display text-data-display text-ink-700 truncate">
                                    https://tutordesk.app/portal/tutor_xyz123
                                </div>
<button className="bg-paper-0 border border-primary text-primary hover:bg-paper-100 px-space-4 py-space-2 rounded font-label text-label transition-colors whitespace-nowrap flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    Copy Link
                                </button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_4px_rgba(22,33,30,0.02)]">
<h2 className="font-title-sm text-title-sm text-ink-900 mb-space-6">Visibility Settings</h2>
<div className="space-y-space-6">
<div className="flex items-start justify-between">
<div>
<h3 className="font-label text-label text-ink-900 mb-1">Show Progress Reports</h3>
<p className="text-ink-500 font-caption text-caption">Allow parents to view detailed session notes and progress grades.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<hr className="border-paper-200" />
<div className="flex items-start justify-between">
<div>
<h3 className="font-label text-label text-ink-900 mb-1">Show Attendance</h3>
<p className="text-ink-500 font-caption text-caption">Display session attendance records and tardiness logs.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<hr className="border-paper-200" />
<div className="flex items-start justify-between">
<div>
<h3 className="font-label text-label text-ink-900 mb-1">Enable 'I've Paid' Button</h3>
<p className="text-ink-500 font-caption text-caption">Allow parents to self-report bank transfers for manual reconciliation.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</div>

<div className="space-y-space-6">
<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_4px_rgba(22,33,30,0.02)]">
<div className="flex justify-between items-center mb-space-4">
<h2 className="font-title-sm text-title-sm text-ink-900">Invited Parents</h2>
<button className="text-primary hover:text-primary-fixed-dim transition-colors">
<span className="material-symbols-outlined text-[20px]">person_add</span>
</button>
</div>
<div className="space-y-space-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-sm text-title-sm">
                                            A
                                        </div>
<div>
<p className="font-label text-label text-ink-900">Adebayo Family</p>
<p className="font-caption text-caption text-ink-500">Active</p>
</div>
</div>
<button className="text-ink-500 hover:text-ink-900 transition-colors">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high text-ink-700 flex items-center justify-center font-title-sm text-title-sm">
                                            O
                                        </div>
<div>
<p className="font-label text-label text-ink-900">Okafor Family</p>
<p className="font-caption text-caption text-warning-solid">Pending</p>
</div>
</div>
<button className="text-ink-500 hover:text-ink-900 transition-colors">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
