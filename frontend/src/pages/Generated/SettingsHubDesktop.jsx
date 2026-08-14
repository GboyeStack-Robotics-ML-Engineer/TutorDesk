import React from 'react';

export const SettingsHubDesktop = () => {
  return (
    <>
      

<aside className="w-full md:w-64 flex-shrink-0 bg-surface-container-low border-r border-paper-200 h-full overflow-y-auto hidden md:flex flex-col py-space-6">
<div className="px-space-4 mb-space-4">
<h2 className="font-title-sm text-title-sm text-ink-900">Settings Hub</h2>
</div>

</aside>

<div className="flex-1 overflow-y-auto bg-background p-gutter-mobile md:p-gutter-desktop">
<div className="max-w-4xl mx-auto w-full">

<div className="mb-space-8">
<h2 className="font-display-md text-display-md text-primary mb-2">Practice Settings</h2>
<p className="font-body text-body text-ink-500 max-w-2xl">Manage your teaching business parameters, automation flows, and client-facing information from a central, organized workspace.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<div className="w-10 h-10 rounded-DEFAULT bg-primary-container/10 flex items-center justify-center mb-4 text-primary">
<span className="material-symbols-outlined fill">badge</span>
</div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1">Practice Identity</h3>
<p className="font-caption text-caption text-ink-500 mb-4 flex-grow">Manage your public profile, bio, credentials, and how you appear to new students.</p>
<div className="flex items-center text-primary font-label text-label group-hover:translate-x-1 transition-transform">
                            View Settings <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer shadow-[0_2px_8px_rgba(22,33,30,0.04)] md:col-span-2 lg:col-span-1">
<div className="w-10 h-10 rounded-DEFAULT bg-secondary-container/20 flex items-center justify-center mb-4 text-secondary">
<span className="material-symbols-outlined fill">work_history</span>
</div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1">Operations &amp; Logistics</h3>
<p className="font-caption text-caption text-ink-500 mb-4 flex-grow">Set your working hours, student capacity, and standard operating procedures.</p>
<div className="flex items-center text-secondary font-label text-label group-hover:translate-x-1 transition-transform">
                            Manage Logistics <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<div className="w-10 h-10 rounded-DEFAULT bg-success-tint flex items-center justify-center mb-4 text-success-solid">
<span className="material-symbols-outlined fill">account_balance</span>
</div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1">Financials</h3>
<p className="font-caption text-caption text-ink-500 mb-4 flex-grow">Update bank details, pricing structures, and invoice automation rules.</p>
<div className="flex items-center text-success-solid font-label text-label group-hover:translate-x-1 transition-transform">
                            Payment Details <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer shadow-[0_2px_8px_rgba(22,33,30,0.04)] lg:col-span-2">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-DEFAULT bg-primary-container flex items-center justify-center flex-shrink-0 text-on-primary-container">
<span className="material-symbols-outlined fill">supervisor_account</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-ink-900 mb-1">Client &amp; Parent Portal</h3>
<p className="font-body text-body text-ink-500 mb-4">Configure what parents and students can see. Manage communication hours, progress report visibility, and automated notifications.</p>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-1 bg-surface-container-high rounded font-caption text-caption text-ink-700">Communication Hours</span>
<span className="px-2 py-1 bg-surface-container-high rounded font-caption text-caption text-ink-700">Portal Access</span>
</div>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-4 flex flex-col hover:border-primary/50 transition-colors group cursor-pointer shadow-[0_2px_8px_rgba(22,33,30,0.04)]">
<div className="w-10 h-10 rounded-DEFAULT bg-tertiary/10 flex items-center justify-center mb-4 text-tertiary">
<span className="material-symbols-outlined fill">smart_toy</span>
</div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1">System &amp; Automation</h3>
<p className="font-caption text-caption text-ink-500 mb-4 flex-grow">Define rules for automated reminders, scheduling conflicts, and account preferences.</p>
<div className="flex items-center text-tertiary font-label text-label group-hover:translate-x-1 transition-transform">
                            Configure Rules <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
