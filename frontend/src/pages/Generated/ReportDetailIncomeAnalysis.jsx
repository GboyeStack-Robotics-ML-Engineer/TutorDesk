import React from 'react';

export const ReportDetailIncomeAnalysis = () => {
  return (
    <>
      

<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-8 gap-space-4">
<div>
<a className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary mb-space-2 font-label text-label transition-colors" href="#">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        Back to Reports
                    </a>
<h2 className="font-display-md text-display-md text-on-surface">Income Analysis</h2>
<p className="font-body text-body text-on-surface-variant mt-1">Detailed breakdown of revenue streams.</p>
</div>
<div className="flex flex-wrap gap-space-2">
<div className="inline-flex bg-surface-container-low rounded-lg p-1 border border-paper-200">
<button className="px-space-3 py-space-1 rounded-md bg-paper-0 shadow-sm border border-paper-200 font-label text-label text-on-surface">Month</button>
<button className="px-space-3 py-space-1 rounded-md font-label text-label text-on-surface-variant hover:bg-paper-200 transition-colors">Quarter</button>
<button className="px-space-3 py-space-1 rounded-md font-label text-label text-on-surface-variant hover:bg-paper-200 transition-colors">Year</button>
</div>
<button className="bg-primary text-on-primary px-space-4 py-space-2 rounded-lg font-label text-label flex items-center gap-2 hover:bg-surface-tint transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Export PDF
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-4 lg:gap-space-6">

<div className="lg:col-span-3 bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)] relative overflow-hidden">
<div className="flex justify-between items-start mb-space-6">
<div>
<h3 className="font-title-sm text-title-sm text-on-surface">Income Over Time</h3>
<div className="mt-space-2 flex items-baseline gap-space-2">
<span className="font-data-display text-data-display text-display-md text-primary">₦1,245,000</span>
<span className="inline-flex items-center text-success-solid bg-success-tint px-2 py-0.5 rounded-full font-label text-label">
<span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                                    +12.5%
                                </span>
</div>
</div>
</div>

<div className="w-full h-64 relative border-b border-l border-paper-200">
<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 250">

<path d="M0 50 H1000 M0 100 H1000 M0 150 H1000 M0 200 H1000" fill="none" stroke="#E5E2D8" stroke-dasharray="4,4" stroke-width="1"></path>

<defs>
<linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#005248" stop-opacity="0.1"></stop>
<stop offset="100%" stop-color="#005248" stop-opacity="0"></stop>
</linearGradient>
</defs>
<path d="M0 200 L100 180 L200 150 L300 170 L400 120 L500 140 L600 90 L700 110 L800 60 L900 80 L1000 40 L1000 250 L0 250 Z" fill="url(#chartGradient)"></path>

<path className="chart-line" d="M0 200 L100 180 L200 150 L300 170 L400 120 L500 140 L600 90 L700 110 L800 60 L900 80 L1000 40" fill="none" stroke="#005248" stroke-linejoin="round" stroke-width="2"></path>

<circle className="data-point" cx="200" cy="150" fill="#FFFFFF" r="4" stroke="#005248" stroke-width="2" style={{"animationDelay":"0.2s"}}></circle>
<circle className="data-point" cx="400" cy="120" fill="#FFFFFF" r="4" stroke="#005248" stroke-width="2" style={{"animationDelay":"0.4s"}}></circle>
<circle className="data-point" cx="600" cy="90" fill="#FFFFFF" r="4" stroke="#005248" stroke-width="2" style={{"animationDelay":"0.6s"}}></circle>
<circle className="data-point" cx="800" cy="60" fill="#FFFFFF" r="4" stroke="#005248" stroke-width="2" style={{"animationDelay":"0.8s"}}></circle>
<circle className="data-point" cx="1000" cy="40" fill="#FFFFFF" r="4" stroke="#005248" stroke-width="2" style={{"animationDelay":"1.0s"}}></circle>
</svg>

<div className="absolute -bottom-6 left-0 w-full flex justify-between px-2 font-caption text-caption text-on-surface-variant">
<span>Jan</span>
<span>Feb</span>
<span>Mar</span>
<span>Apr</span>
<span>May</span>
<span>Jun</span>
</div>
</div>
</div>

<div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-space-4 lg:gap-space-6 mt-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.04)]">
<div className="flex justify-between items-center mb-space-4">
<h3 className="font-title-sm text-title-sm text-on-surface">Income by Student</h3>
<button className="text-primary hover:text-surface-tint font-label text-label transition-colors">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-paper-200 text-on-surface-variant font-label text-label">
<th className="pb-space-2 font-medium">Student Name</th>
<th className="pb-space-2 font-medium">Sessions</th>
<th className="pb-space-2 font-medium text-right">Revenue</th>
</tr>
</thead>
<tbody className="text-body font-body text-on-surface">
<tr className="border-b border-paper-200/50 hover:bg-surface-bright transition-colors">
<td className="py-space-3 flex items-center gap-space-2">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-title-sm text-title-sm">OO</div>
                                            Oluwaseun Ojo
                                        </td>
<td className="py-space-3">12</td>
<td className="py-space-3 text-right font-data-display text-data-display">₦240,000</td>
</tr>
<tr className="border-b border-paper-200/50 hover:bg-surface-bright transition-colors">
<td className="py-space-3 flex items-center gap-space-2">
<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-title-sm text-title-sm">CA</div>
                                            Chidinma Adebayo
                                        </td>
<td className="py-space-3">8</td>
<td className="py-space-3 text-right font-data-display text-data-display">₦160,000</td>
</tr>
<tr className="hover:bg-surface-bright transition-colors">
<td className="py-space-3 flex items-center gap-space-2">
<div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-title-sm text-title-sm">EK</div>
                                            Emeka Kalu
                                        </td>
<td className="py-space-3">10</td>
<td className="py-space-3 text-right font-data-display text-data-display">₦150,000</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.04)]">
<div className="flex justify-between items-center mb-space-4">
<h3 className="font-title-sm text-title-sm text-on-surface">Income by Subject</h3>
<button className="text-primary hover:text-surface-tint font-label text-label transition-colors">View All</button>
</div>
<div className="space-y-space-4">

<div>
<div className="flex justify-between font-body text-body mb-1">
<span>Further Mathematics</span>
<span className="font-data-display text-data-display">₦520,000</span>
</div>
<div className="w-full bg-paper-200 rounded-full h-1.5">
<div className="bg-primary h-1.5 rounded-full" style={{"width":"45%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between font-body text-body mb-1">
<span>Physics (A-Level)</span>
<span className="font-data-display text-data-display">₦380,000</span>
</div>
<div className="w-full bg-paper-200 rounded-full h-1.5">
<div className="bg-surface-tint h-1.5 rounded-full" style={{"width":"32%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between font-body text-body mb-1">
<span>Chemistry</span>
<span className="font-data-display text-data-display">₦220,000</span>
</div>
<div className="w-full bg-paper-200 rounded-full h-1.5">
<div className="bg-tertiary h-1.5 rounded-full" style={{"width":"18%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between font-body text-body mb-1">
<span>General English</span>
<span className="font-data-display text-data-display">₦125,000</span>
</div>
<div className="w-full bg-paper-200 rounded-full h-1.5">
<div className="bg-outline h-1.5 rounded-full" style={{"width":"5%"}}></div>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
