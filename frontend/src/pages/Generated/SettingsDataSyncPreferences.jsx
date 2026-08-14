import React from 'react';

export const SettingsDataSyncPreferences = () => {
  return (
    <>
      
<div className="mb-space-8">
<h1 className="font-display-md text-display-md text-on-surface mb-space-2">Data &amp; Sync Preferences</h1>
<p className="font-body text-body text-ink-500 max-w-2xl">Manage how TutorDesk handles data on your device, optimizes for low-bandwidth connections, and syncs with the cloud.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6">

<div className="lg:col-span-2 flex flex-col gap-space-6">

<section className="bg-paper-0 rounded-lg hairline-border elev-1 p-space-6 relative overflow-hidden">

<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-4 relative z-10 mb-space-4 border-b border-paper-200 pb-space-4">
<div>
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="network_wifi">network_wifi</span>
                                    Data-Saver Mode
                                </h3>
<p className="font-caption text-caption text-ink-500 mt-1">Optimize usage on metered or slow connections.</p>
</div>

<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="space-y-space-4 relative z-10">
<label className="flex items-start gap-space-3 cursor-pointer group">
<div className="pt-1">
<input checked="" className="w-4 h-4 text-primary bg-paper-0 border-outline rounded focus:ring-primary focus:ring-2" type="checkbox" />
</div>
<div>
<p className="font-body text-body text-on-surface group-hover:text-primary transition-colors">Pause high-res image uploads</p>
<p className="font-caption text-caption text-ink-500">Student homework photos will be compressed before upload.</p>
</div>
</label>
<label className="flex items-start gap-space-3 cursor-pointer group">
<div className="pt-1">
<input className="w-4 h-4 text-primary bg-paper-0 border-outline rounded focus:ring-primary focus:ring-2" type="checkbox" />
</div>
<div>
<p className="font-body text-body text-on-surface group-hover:text-primary transition-colors">Auto-detect slow networks</p>
<p className="font-caption text-caption text-ink-500">Automatically switch to manual sync when connection drops below 3G speeds.</p>
</div>
</label>
</div>
</section>

<section className="bg-paper-0 rounded-lg hairline-border elev-1 p-space-6">
<h3 className="font-title-md text-title-md text-on-surface mb-space-1 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="cloud_sync">cloud_sync</span>
                            Sync Behavior
                        </h3>
<p className="font-caption text-caption text-ink-500 mb-space-6 pb-space-4 border-b border-paper-200">Control when and how your local changes are sent to the cloud.</p>
<div className="space-y-space-6">

<div className="space-y-space-4">
<label className="flex items-start gap-space-3 cursor-pointer p-space-3 rounded hover:bg-surface-container-low transition-colors border border-transparent hover:border-paper-200">
<div className="pt-1">
<input checked="" className="w-4 h-4 text-primary bg-paper-0 border-outline focus:ring-primary focus:ring-2" name="sync_mode" type="radio" />
</div>
<div>
<p className="font-label text-label text-on-surface">Continuous Auto-Sync</p>
<p className="font-caption text-caption text-ink-500">Changes are synced immediately. Best for reliable Wi-Fi.</p>
</div>
</label>
<label className="flex items-start gap-space-3 cursor-pointer p-space-3 rounded hover:bg-surface-container-low transition-colors border border-transparent hover:border-paper-200">
<div className="pt-1">
<input className="w-4 h-4 text-primary bg-paper-0 border-outline focus:ring-primary focus:ring-2" name="sync_mode" type="radio" />
</div>
<div>
<p className="font-label text-label text-on-surface">Periodic Sync (Every 30 mins)</p>
<p className="font-caption text-caption text-ink-500">Batches changes to save battery and data.</p>
</div>
</label>
<label className="flex items-start gap-space-3 cursor-pointer p-space-3 rounded hover:bg-surface-container-low transition-colors border border-transparent hover:border-paper-200">
<div className="pt-1">
<input className="w-4 h-4 text-primary bg-paper-0 border-outline focus:ring-primary focus:ring-2" name="sync_mode" type="radio" />
</div>
<div>
<p className="font-label text-label text-on-surface flex items-center gap-2">
                                            Manual Sync Only
                                            <span className="bg-warning-tint text-warning-solid px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Recommended for Data Saver</span>
</p>
<p className="font-caption text-caption text-ink-500">You must tap 'Sync Now' in the top bar to upload changes.</p>
</div>
</label>
</div>
</div>
</section>
</div>

<div className="flex flex-col gap-space-6">

<section className="bg-paper-0 rounded-lg hairline-border elev-1 p-space-6">
<h3 className="font-title-md text-title-md text-on-surface mb-space-1 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="notifications_active">notifications_active</span>
                            Alerts
                        </h3>
<p className="font-caption text-caption text-ink-500 mb-space-6 pb-space-4 border-b border-paper-200">Manage sync and data alerts.</p>
<div className="space-y-space-4">
<div className="flex justify-between items-center gap-space-4">
<div>
<p className="font-label text-label text-on-surface">Sync Errors</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex justify-between items-center gap-space-4">
<div>
<p className="font-label text-label text-on-surface">Offline Mode Active</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex justify-between items-center gap-space-4 opacity-50">
<div>
<p className="font-label text-label text-on-surface">Large File Warning</p>
<p className="font-caption text-caption text-ink-500 text-[11px] mt-1">Requires Data-Saver off</p>
</div>
<label className="relative inline-flex items-center cursor-not-allowed">
<input className="sr-only peer" disabled="" type="checkbox" defaultValue="" />
<div className="w-9 h-5 bg-surface-variant rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4"></div>
</label>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-lg interactive-border p-space-4">
<div className="flex items-center gap-space-3 mb-space-3">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="sd_storage">sd_storage</span>
</div>
<div>
<h4 className="font-label text-label text-on-surface">Local Storage</h4>
<p className="font-caption text-caption text-ink-500">142 MB used for offline cache</p>
</div>
</div>
<button className="w-full bg-paper-0 border border-primary text-primary font-label text-label py-space-2 rounded hover:bg-primary hover:text-paper-0 transition-colors">
                             Clear Cache
                         </button>
</section>
</div>
</div>

<div className="mt-space-8 pt-space-4 border-t border-paper-200 flex justify-end gap-space-4 sticky bottom-0 bg-background/95 backdrop-blur py-space-4 z-30">
<button className="px-space-6 py-space-2 rounded font-label text-label text-ink-700 hover:bg-surface-container-low transition-colors">
                    Discard Changes
                </button>
<button className="px-space-6 py-space-2 rounded font-label text-label bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm">
                    Save Preferences
                </button>
</div>

    </>
  );
};
