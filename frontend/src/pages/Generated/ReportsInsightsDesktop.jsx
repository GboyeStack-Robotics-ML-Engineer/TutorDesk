import React from 'react';

export const ReportsInsightsDesktop = () => {
  return (
    <>
      

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-space-8 gap-space-4">
<div>
<h2 className="font-title-lg text-title-lg text-on-surface mb-1">Reports</h2>
<p className="font-body text-body text-ink-500">Academic and financial overview.</p>
</div>
<div className="flex items-center gap-space-3 bg-paper-0 border border-paper-200 p-1 rounded-lg elev-1">
<button className="px-space-4 py-1.5 rounded bg-surface-container-low text-on-surface font-label text-label font-bold">This Month</button>
<button className="px-space-4 py-1.5 rounded text-ink-500 hover:text-on-surface font-label text-label transition-colors">Last Month</button>
<button className="px-space-4 py-1.5 rounded text-ink-500 hover:text-on-surface font-label text-label transition-colors">YTD</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-space-6 mb-space-8">

<div className="md:col-span-2 bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1 flex flex-col relative overflow-hidden">
<div className="flex justify-between items-start mb-space-6 relative z-10">
<div>
<h3 className="font-title-sm text-title-sm text-on-surface">Income Overview</h3>
<p className="font-caption text-caption text-ink-500 mt-1">Total revenue collected</p>
</div>
<div className="text-right">
<span className="font-display-md text-display-md text-primary">₦245,000</span>
<div className="flex items-center justify-end gap-1 text-success-solid font-caption text-caption mt-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+12.5% vs last month</span>
</div>
</div>
</div>

<div className="flex-1 mt-4 relative min-h-[200px] flex items-end">

<div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-ink-500 font-data-display text-xs w-10 border-r border-paper-200 pr-2 pb-2">
<span>300k</span>
<span>200k</span>
<span>100k</span>
<span>0</span>
</div>

<div className="ml-12 flex-1 h-full relative">

<div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
<div className="border-b border-paper-200 w-full h-0"></div>
<div className="border-b border-paper-200 w-full h-0"></div>
<div className="border-b border-paper-200 w-full h-0"></div>
<div className="border-b border-paper-200 w-full h-0"></div>
</div>

<svg className="absolute inset-0 w-full h-full pb-8" preserveAspectRatio="none" viewBox="0 0 100 100">
<defs>
<linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#005248" stop-opacity="0.2"></stop>
<stop offset="100%" stop-color="#005248" stop-opacity="0"></stop>
</linearGradient>
</defs>
<path d="M0 80 L15 65 L30 75 L45 40 L60 50 L75 20 L90 30 L100 10" fill="none" stroke="#005248" stroke-width="2" vector-effect="non-scaling-stroke"></path>
<path d="M0 80 L15 65 L30 75 L45 40 L60 50 L75 20 L90 30 L100 10 L100 100 L0 100 Z" fill="url(#chartGradient)"></path>
</svg>

<div className="absolute bottom-0 left-0 right-0 flex justify-between text-ink-500 font-data-display text-xs pt-2 border-t border-paper-200">
<span>Wk 1</span>
<span>Wk 2</span>
<span>Wk 3</span>
<span>Wk 4</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1 flex-1 flex flex-col justify-center items-center text-center">
<h3 className="font-title-sm text-title-sm text-ink-700 mb-2">Average Attendance</h3>
<div className="relative w-32 h-32 my-4 flex items-center justify-center">

<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="100, 100" stroke-width="3"></path>
<path className="text-secondary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="88, 100" stroke-width="3"></path>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-display-md text-display-md text-on-surface">88%</span>
</div>
</div>
<p className="font-caption text-caption text-ink-500 mt-2">Target: 95%</p>
</div>

<div className="bg-surface-container-low border border-paper-200 rounded-xl p-space-4 flex items-center justify-between">
<div>
<h4 className="font-label text-label text-on-surface">Data Sync Status</h4>
<p className="font-caption text-caption text-ink-500">Last updated: Just now</p>
</div>
<div className="bg-success-tint px-3 py-1 rounded-full flex items-center gap-1.5 border border-success-solid/20">
<span className="w-2 h-2 bg-success-solid rounded-full"></span>
<span className="font-label text-label text-success-solid text-xs">Synced</span>
</div>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl elev-1 overflow-hidden">
<div className="px-space-6 py-space-4 border-b border-paper-200 flex justify-between items-center bg-background">
<h3 className="font-title-sm text-title-sm text-on-surface">Revenue per Student</h3>
<button className="text-primary hover:text-primary-container font-label text-label flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-sm">download</span>
                        Export
                    </button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-paper-200 bg-surface-container-lowest">
<th className="py-space-3 px-space-6 font-label text-label text-ink-500 font-medium">Student Name</th>
<th className="py-space-3 px-space-6 font-label text-label text-ink-500 font-medium">Subject</th>
<th className="py-space-3 px-space-6 font-label text-label text-ink-500 font-medium text-right">Sessions</th>
<th className="py-space-3 px-space-6 font-label text-label text-ink-500 font-medium text-right">Amount (₦)</th>
<th className="py-space-3 px-space-6 font-label text-label text-ink-500 font-medium">Status</th>
</tr>
</thead>
<tbody className="font-body text-body text-on-surface divide-y divide-paper-200">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-space-4 px-space-6 font-medium">Chioma Adeyemi</td>
<td className="py-space-4 px-space-6 text-ink-700">Mathematics</td>
<td className="py-space-4 px-space-6 text-right font-data-display">8</td>
<td className="py-space-4 px-space-6 text-right font-data-display font-medium">40,000</td>
<td className="py-space-4 px-space-6">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-label bg-success-tint text-success-solid border border-success-solid/20">Paid</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-space-4 px-space-6 font-medium">Oluwaseun Okafor</td>
<td className="py-space-4 px-space-6 text-ink-700">Physics</td>
<td className="py-space-4 px-space-6 text-right font-data-display">6</td>
<td className="py-space-4 px-space-6 text-right font-data-display font-medium">30,000</td>
<td className="py-space-4 px-space-6">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-label bg-warning-tint text-warning-solid border border-warning-solid/20">Pending</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-space-4 px-space-6 font-medium">Aisha Bello</td>
<td className="py-space-4 px-space-6 text-ink-700">Chemistry</td>
<td className="py-space-4 px-space-6 text-right font-data-display">4</td>
<td className="py-space-4 px-space-6 text-right font-data-display font-medium">20,000</td>
<td className="py-space-4 px-space-6">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-label bg-success-tint text-success-solid border border-success-solid/20">Paid</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

    </>
  );
};
