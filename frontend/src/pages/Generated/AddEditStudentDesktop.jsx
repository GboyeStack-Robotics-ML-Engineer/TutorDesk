import React from 'react';

export const AddEditStudentDesktop = () => {
  return (
    <>
      



<div className="flex-1 overflow-y-auto p-8 bg-surface-container-low">
<div className="max-w-4xl mx-auto">
<form className="space-y-6">

<section className="section-card">
<div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
<span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">person</span>
<div>
<h2 className="font-title-md text-title-md text-ink-900">Identity &amp; Contact</h2>
<p className="font-body text-body text-ink-500">Basic personal information for communication.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-3 flex flex-col items-center">
<div className="w-32 h-32 rounded-full border-2 border-dashed border-paper-300 bg-surface flex items-center justify-center flex-col gap-2 hover:border-primary hover:bg-surface-container transition-colors cursor-pointer group relative overflow-hidden">
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-3xl">add_a_photo</span>
<span className="font-caption text-caption text-outline group-hover:text-primary">Upload Photo</span>
</div>
</div>

<div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="md:col-span-2">
<label className="input-label">Full Name</label>
<input className="input-field" placeholder="e.g. Jane Doe" type="text" />
</div>
<div>
<label className="input-label">Email Address</label>
<input className="input-field" placeholder="jane@example.com" type="email" />
</div>
<div>
<label className="input-label">Phone Number</label>
<input className="input-field" placeholder="+234 (0) 800 000 0000" type="tel" />
</div>
<div className="md:col-span-2 mt-2">
<label className="input-label">Guardian Contact (Optional)</label>
<input className="input-field" placeholder="Name &amp; Phone Number" type="text" />
</div>
</div>
</div>
</section>

<section className="section-card">
<div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
<span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">school</span>
<div>
<h2 className="font-title-md text-title-md text-ink-900">Academic Profile</h2>
<p className="font-body text-body text-ink-500">Current level, subjects of interest, and learning objectives.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="input-label">Current Academic Level</label>
<select className="input-field appearance-none">
<option>Select Level...</option>
<option>Primary / Elementary</option>
<option>Junior Secondary (JSS)</option>
<option>Senior Secondary (SSS)</option>
<option>Undergraduate</option>
<option>Professional</option>
</select>
</div>
<div>
<label className="input-label">Primary Subjects</label>
<input className="input-field" placeholder="e.g. Mathematics, Physics (comma separated)" type="text" />
</div>
<div className="md:col-span-2">
<label className="input-label">Learning Goals &amp; Notes</label>
<textarea className="input-field h-24 resize-none" placeholder="Briefly describe what the student aims to achieve..." />
</div>
</div>
</section>

<section className="section-card">
<div className="flex items-start gap-4 mb-6 pb-4 border-b border-paper-200">
<span className="material-symbols-outlined text-primary bg-primary-fixed/20 p-2 rounded-lg">schedule</span>
<div>
<h2 className="font-title-md text-title-md text-ink-900">Logistics &amp; Scheduling</h2>
<p className="font-body text-body text-ink-500">Timezone and preferred availability for sessions.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="input-label">Timezone</label>
<select className="input-field appearance-none">
<option>West Africa Time (WAT) - Lagos</option>
<option>Greenwich Mean Time (GMT) - London</option>
<option>Eastern Standard Time (EST) - New York</option>
</select>
</div>
<div>
<label className="input-label">Preferred Session Length</label>
<select className="input-field appearance-none">
<option>1 Hour</option>
<option>1.5 Hours</option>
<option>2 Hours</option>
</select>
</div>
<div className="md:col-span-2 mt-2">
<label className="input-label mb-2">General Availability</label>
<div className="flex flex-wrap gap-2">
<label className="flex items-center gap-2 bg-surface border border-paper-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-paper-100 transition-colors">
<input className="rounded text-primary focus:ring-primary w-4 h-4 border-outline-variant" type="checkbox" />
<span className="font-caption text-caption text-ink-700">Weekdays (Morning)</span>
</label>
<label className="flex items-center gap-2 bg-surface border border-paper-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-paper-100 transition-colors">
<input className="rounded text-primary focus:ring-primary w-4 h-4 border-outline-variant" type="checkbox" />
<span className="font-caption text-caption text-ink-700">Weekdays (Evening)</span>
</label>
<label className="flex items-center gap-2 bg-surface border border-paper-200 px-3 py-1.5 rounded-full cursor-pointer hover:bg-paper-100 transition-colors">
<input className="rounded text-primary focus:ring-primary w-4 h-4 border-outline-variant" type="checkbox" />
<span className="font-caption text-caption text-ink-700">Weekends</span>
</label>
</div>
</div>
</div>
</section>
</form>

<div className="h-12"></div>
</div>
</div>

    </>
  );
};
