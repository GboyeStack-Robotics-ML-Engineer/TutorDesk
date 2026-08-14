import React from 'react';

export const SettingsAccountSecurity = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-gutter-mobile md:p-gutter-desktop">
<div className="max-w-3xl mx-auto space-y-8 pb-12">
<div>
<h2 className="font-display-md text-display-md text-ink-900 mb-2">Account &amp; Security</h2>
<p className="font-body text-body text-ink-500">Manage your credentials and active sessions.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.06)]">
<div className="flex items-start justify-between mb-4">
<div>
<h3 className="font-title-sm text-title-sm text-ink-900">Email Address</h3>
<p className="font-caption text-caption text-ink-500 mt-1">Primary contact for notifications.</p>
</div>
<span className="material-symbols-outlined text-ink-500" data-icon="mail">mail</span>
</div>
<div className="space-y-4 mt-6">
<div>
<label className="block font-label text-label text-ink-700 mb-1">Current Email</label>
<input className="w-full bg-surface-container-low border border-paper-200 rounded-DEFAULT px-3 py-2 font-data-display text-data-display text-ink-500 cursor-not-allowed" disabled="" type="email" defaultValue="tutor@tutordesk.example.com" />
</div>
<button className="text-primary font-label text-label hover:underline">Change Email Address</button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.06)]">
<div className="flex items-start justify-between mb-4">
<div>
<h3 className="font-title-sm text-title-sm text-ink-900">Phone Number</h3>
<p className="font-caption text-caption text-ink-500 mt-1">Used for urgent SMS alerts.</p>
</div>
<span className="material-symbols-outlined text-ink-500" data-icon="phone_iphone">phone_iphone</span>
</div>
<div className="space-y-4 mt-6">
<div>
<label className="block font-label text-label text-ink-700 mb-1">Mobile Number</label>
<div className="flex gap-2">
<div className="w-20 bg-surface-container-low border border-paper-200 rounded-DEFAULT px-3 py-2 flex items-center justify-center font-data-display text-data-display text-ink-700">
                                        +234
                                    </div>
<input className="flex-1 bg-paper-0 border border-paper-200 rounded-DEFAULT px-3 py-2 font-data-display text-data-display text-ink-900 focus:border-primary focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-shadow" type="tel" defaultValue="803 123 4567" />
</div>
</div>
<button className="bg-paper-0 border border-primary text-primary font-label text-label py-2 px-4 rounded-DEFAULT hover:bg-surface-container-low transition-colors">Update Phone</button>
</div>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.06)]">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-4 border-b border-paper-200 pb-2">Password</h3>
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<p className="font-body text-body text-ink-700">Last changed: 3 months ago</p>
<p className="font-caption text-caption text-ink-500 mt-1">We recommend updating your password regularly.</p>
</div>
<button className="bg-primary text-on-primary font-label text-label py-2 px-6 rounded-DEFAULT hover:bg-opacity-90 transition-opacity whitespace-nowrap">Reset Password</button>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-lg p-space-6 shadow-[0_2px_8px_rgba(22,33,30,0.06)]">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-4 border-b border-paper-200 pb-2">Active Sessions</h3>
<div className="space-y-4">

<div className="flex items-center justify-between p-4 bg-success-tint rounded-lg border border-success-solid border-opacity-20">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-paper-0 border border-paper-200 flex items-center justify-center text-ink-700">
<span className="material-symbols-outlined" data-icon="computer">computer</span>
</div>
<div>
<p className="font-title-sm text-title-sm text-ink-900 flex items-center gap-2">MacBook Pro 16" <span className="bg-success-solid text-paper-0 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Current</span></p>
<p className="font-caption text-caption text-ink-500 mt-0.5">Lagos, Nigeria • Chrome • IP: 102.89.x.x</p>
</div>
</div>
</div>

<div className="flex items-center justify-between p-4 border border-paper-200 rounded-lg">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-low border border-paper-200 flex items-center justify-center text-ink-700">
<span className="material-symbols-outlined" data-icon="smartphone">smartphone</span>
</div>
<div>
<p className="font-title-sm text-title-sm text-ink-900">iPhone 13 Pro</p>
<p className="font-caption text-caption text-ink-500 mt-0.5">Abuja, Nigeria • Safari • Active 2h ago</p>
</div>
</div>
<button className="text-error font-label text-label hover:underline">Revoke</button>
</div>
</div>
</div>

<div className="bg-danger-tint border border-danger-solid border-opacity-30 rounded-lg p-space-6 mt-space-8">
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-danger-solid mt-1" data-icon="warning">warning</span>
<div className="flex-1">
<h3 className="font-title-sm text-title-sm text-danger-solid mb-1">Delete Account</h3>
<p className="font-body text-body text-ink-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
<div className="space-y-3">
<label className="block font-label text-label text-ink-700">To confirm, type "delete my account" below:</label>
<input className="w-full max-w-md bg-paper-0 border border-danger-solid border-opacity-30 rounded-DEFAULT px-3 py-2 font-body text-body text-ink-900 focus:border-danger-solid focus:ring-1 focus:ring-danger-solid outline-none" placeholder="delete my account" type="text" />
<div>
<button className="bg-danger-solid text-on-error font-label text-label py-2 px-6 rounded-DEFAULT hover:bg-opacity-90 transition-opacity mt-2 opacity-50 cursor-not-allowed">Delete Account</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
};
