import React from 'react';

export const SettingsProfileBio = () => {
  return (
    <>
      


<div className="p-6 md:p-8 max-w-max-width mx-auto w-full">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-space-8">
<div>
<h2 className="font-display-md text-display-md text-ink-900">Profile &amp; Bio</h2>
<p className="font-body text-body text-ink-500 mt-1">Manage your public presence and professional details.</p>
</div>
<div className="flex items-center gap-3">
<button className="bg-paper-0 border border-primary text-primary px-4 py-2 rounded-lg font-label text-label hover:bg-paper-100 transition-colors">View Public Profile</button>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-label hover:bg-opacity-90 transition-opacity">Save Changes</button>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6">

<div className="lg:col-span-1 space-y-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 border-b border-paper-200 pb-2">Public Identity</h3>
<div className="flex flex-col items-center mb-space-6 text-center">
<div className="relative group cursor-pointer">
<img className="w-24 h-24 rounded-full object-cover border border-paper-300" data-alt="A close-up portrait of a professional African mathematics tutor in a warmly lit, modern classroom setting, shot with a shallow depth of field. Warm paper aesthetic, sharp focus, inviting expression, high-end commercial photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKBy8z_Mkb3CqDbTHzBebJ5tMy2EehBpoy5PcTkyYXufDywoN8hkz7_xnKG3QtTuG7wyf2vGrBsgZc6AWEMuIFgtllqfTo-qeeihsGOstFXoUrtOUFCzCcX4lDeNpSJjqsSNVJDzyAwKDehlnr3_T47C8jKWoTIp4b9SBh9pCYqgozdtpJArmtxfvyB-Mm78Tl49ANkU6DUqx3LAiY-wUpmpI-mOnvQjJz9-oxtfLnm2NBWau7EiO7" />
<div className="absolute inset-0 bg-ink-900 bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-paper-0">photo_camera</span>
</div>
</div>
<p className="font-caption text-caption text-ink-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
</div>
<div className="space-y-space-4">
<div>
<label className="block font-label text-label text-ink-700 mb-space-1">Full Name</label>
<input className="w-full bg-surface border border-paper-300 rounded-lg px-3 py-2 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" type="text" defaultValue="Dr. Emmanuel Ojo" />
</div>
<div>
<label className="block font-label text-label text-ink-700 mb-space-1">Professional Headline</label>
<input className="w-full bg-surface border border-paper-300 rounded-lg px-3 py-2 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" type="text" defaultValue="Senior Mathematics Instructor" />
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 border-b border-paper-200 pb-2">Introductory Media</h3>
<div className="border-2 border-dashed border-paper-300 rounded-lg p-6 text-center bg-surface-container-low hover:bg-paper-100 transition-colors cursor-pointer">
<span className="material-symbols-outlined text-ink-500 text-3xl mb-2">video_call</span>
<p className="font-label text-label text-ink-700">Upload Intro Video</p>
<p className="font-caption text-caption text-ink-500 mt-1">MP4, WebM (Max 2 mins)</p>
</div>
</section>
</div>

<div className="lg:col-span-2 space-y-space-6">

<section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 border-b border-paper-200 pb-2">Qualifications &amp; Bio</h3>
<div className="space-y-space-4">
<div>
<label className="block font-label text-label text-ink-700 mb-space-1">Teaching Approach (Bio)</label>
<textarea className="w-full bg-surface border border-paper-300 rounded-lg px-3 py-2 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none" rows="4" defaultValue="I believe in practical, application-based learning to demystify complex mathematical concepts." />
</div>
<div>
<div className="flex justify-between items-center mb-space-1">
<label className="font-label text-label text-ink-700">Degrees &amp; Certifications</label>
<button className="text-primary font-label text-label hover:underline flex items-center text-sm"><span className="material-symbols-outlined text-sm mr-1">add</span>Add New</button>
</div>
<div className="space-y-2">
<div className="flex items-center justify-between bg-surface-container-low border border-paper-200 p-3 rounded-lg">
<div>
<p className="font-body text-body text-ink-900 font-medium">Ph.D. in Applied Mathematics</p>
<p className="font-caption text-caption text-ink-500">University of Lagos • 2015</p>
</div>
<div className="flex gap-2">
<button className="text-ink-500 hover:text-ink-900"><span className="material-symbols-outlined text-[20px]">edit</span></button>
<button className="text-ink-500 hover:text-danger-solid"><span className="material-symbols-outlined text-[20px]">delete</span></button>
</div>
</div>
<div className="flex items-center justify-between bg-surface-container-low border border-paper-200 p-3 rounded-lg">
<div>
<p className="font-body text-body text-ink-900 font-medium">Advanced Teaching Certificate</p>
<p className="font-caption text-caption text-ink-500">National Teachers Institute • 2012</p>
</div>
<div className="flex gap-2">
<button className="text-ink-500 hover:text-ink-900"><span className="material-symbols-outlined text-[20px]">edit</span></button>
<button className="text-ink-500 hover:text-danger-solid"><span className="material-symbols-outlined text-[20px]">delete</span></button>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 elev-1">
<h3 className="font-title-sm text-title-sm text-ink-900 mb-space-4 border-b border-paper-200 pb-2">Subjects &amp; Target Levels</h3>
<div className="space-y-space-6">
<div>
<label className="block font-label text-label text-ink-700 mb-space-2">Subjects Taught</label>
<div className="flex flex-wrap gap-2 mb-2">
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label text-label">Further Math <button className="hover:text-tertiary-container"><span className="material-symbols-outlined text-[16px]">close</span></button></span>
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label text-label">Calculus <button className="hover:text-tertiary-container"><span className="material-symbols-outlined text-[16px]">close</span></button></span>
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label text-label">Physics <button className="hover:text-tertiary-container"><span className="material-symbols-outlined text-[16px]">close</span></button></span>
</div>
<div className="flex gap-2">
<input className="flex-1 bg-surface border border-paper-300 rounded-lg px-3 py-2 font-body text-body focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" placeholder="Add a subject..." type="text" />
<button className="bg-paper-200 text-ink-900 px-3 py-2 rounded-lg font-label text-label hover:bg-paper-300 transition-colors">Add</button>
</div>
</div>
<div>
<label className="block font-label text-label text-ink-700 mb-space-2">Grade Levels</label>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
<label className="flex items-center gap-2 p-2 border border-paper-300 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="form-checkbox text-primary rounded border-paper-300 focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-body text-body">Primary</span>
</label>
<label className="flex items-center gap-2 p-2 border border-primary bg-success-tint rounded-lg cursor-pointer transition-colors">
<input checked="" className="form-checkbox text-primary rounded border-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-body text-body text-primary">JSS</span>
</label>
<label className="flex items-center gap-2 p-2 border border-primary bg-success-tint rounded-lg cursor-pointer transition-colors">
<input checked="" className="form-checkbox text-primary rounded border-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-body text-body text-primary">SSS</span>
</label>
<label className="flex items-center gap-2 p-2 border border-primary bg-success-tint rounded-lg cursor-pointer transition-colors">
<input checked="" className="form-checkbox text-primary rounded border-primary focus:ring-primary h-4 w-4" type="checkbox" />
<span className="font-body text-body text-primary">Undergrad</span>
</label>
</div>
</div>
</div>
</section>
</div>
</div>
</div>

    </>
  );
};
