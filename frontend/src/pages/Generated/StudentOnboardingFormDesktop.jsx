import React from 'react';

export const StudentOnboardingFormDesktop = () => {
  return (
    <>
      
<div className="max-w-3xl w-full bg-paper-0 border border-paper-200 rounded-xl shadow-[0_4px_12px_rgba(22,33,30,0.06)] overflow-hidden">

<div className="p-8 border-b border-paper-200 bg-surface-container-low text-center">
<h1 className="font-display-md text-display-md text-primary mb-2">Welcome to TutorDesk</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
                Let's get started by learning a bit more about the student. This helps us match them with the best resources and teaching style.
            </p>
</div>

<form className="p-8 space-y-10">

<section className="space-y-6">
<div className="flex items-center gap-3 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-primary">person</span>
<h2 className="font-title-md text-title-md text-on-surface">Student Information</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="block font-label text-label text-ink-700" htmlFor="student_name">Full Name</label>
<input className="w-full rounded-DEFAULT px-4 py-3 font-body text-body text-on-surface placeholder-outline-variant" id="student_name" name="student_name" placeholder="e.g. Jane Doe" type="text" />
</div>
<div className="space-y-2">
<label className="block font-label text-label text-ink-700" htmlFor="grade_level">Grade / Academic Level</label>
<select className="w-full rounded-DEFAULT px-4 py-3 font-body text-body text-on-surface" id="grade_level" name="grade_level">
<option disabled="" selected="" value="">Select level...</option>
<option value="primary">Primary School</option>
<option value="middle">Middle School / Junior High</option>
<option value="high">High School / Senior Secondary</option>
<option value="university">University / College</option>
<option value="other">Other</option>
</select>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center gap-3 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-primary">book</span>
<h2 className="font-title-md text-title-md text-on-surface">Academic Focus</h2>
</div>
<div className="space-y-4">
<label className="block font-label text-label text-ink-700">Primary Subjects Needed</label>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<label className="flex items-center p-3 border border-paper-200 rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="h-4 w-4 text-primary border-paper-300 rounded" name="subjects" type="checkbox" defaultValue="math" />
<span className="ml-3 font-body text-body text-on-surface">Mathematics</span>
</label>
<label className="flex items-center p-3 border border-paper-200 rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="h-4 w-4 text-primary border-paper-300 rounded" name="subjects" type="checkbox" defaultValue="science" />
<span className="ml-3 font-body text-body text-on-surface">Sciences</span>
</label>
<label className="flex items-center p-3 border border-paper-200 rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="h-4 w-4 text-primary border-paper-300 rounded" name="subjects" type="checkbox" defaultValue="english" />
<span className="ml-3 font-body text-body text-on-surface">English/Lit</span>
</label>
<label className="flex items-center p-3 border border-paper-200 rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="h-4 w-4 text-primary border-paper-300 rounded" name="subjects" type="checkbox" defaultValue="history" />
<span className="ml-3 font-body text-body text-on-surface">History</span>
</label>
</div>
</div>
<div className="space-y-2">
<label className="block font-label text-label text-ink-700" htmlFor="weaknesses">Current Challenges / Weaknesses</label>
<textarea className="w-full rounded-DEFAULT px-4 py-3 font-body text-body text-on-surface placeholder-outline-variant" id="weaknesses" name="weaknesses" placeholder="e.g. Struggles with algebra concepts, needs help organizing essays..." rows="3" />
</div>
<div className="space-y-2">
<label className="block font-label text-label text-ink-700" htmlFor="goals">Primary Goals</label>
<textarea className="w-full rounded-DEFAULT px-4 py-3 font-body text-body text-on-surface placeholder-outline-variant" id="goals" name="goals" placeholder="e.g. Improve overall grade to a B, prepare for upcoming national exams..." rows="3" />
</div>
</section>

<section className="space-y-6">
<div className="flex items-center gap-3 border-b border-paper-200 pb-2">
<span className="material-symbols-outlined text-primary">psychology</span>
<h2 className="font-title-md text-title-md text-on-surface">Learning Style</h2>
</div>
<div className="space-y-4">
<label className="block font-label text-label text-ink-700">How does the student learn best?</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<label className="relative flex flex-col p-4 border border-paper-200 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="absolute right-4 top-4 h-4 w-4 text-primary border-paper-300" name="learning_style" type="radio" defaultValue="visual" />
<span className="material-symbols-outlined text-ink-500 mb-2" data-icon="visibility">visibility</span>
<span className="font-title-sm text-title-sm text-on-surface mb-1">Visual</span>
<span className="font-caption text-caption text-on-surface-variant">Learns through seeing images, charts, and diagrams.</span>
</label>
<label className="relative flex flex-col p-4 border border-paper-200 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="absolute right-4 top-4 h-4 w-4 text-primary border-paper-300" name="learning_style" type="radio" defaultValue="auditory" />
<span className="material-symbols-outlined text-ink-500 mb-2" data-icon="hearing">hearing</span>
<span className="font-title-sm text-title-sm text-on-surface mb-1">Auditory</span>
<span className="font-caption text-caption text-on-surface-variant">Learns through listening and speaking out loud.</span>
</label>
<label className="relative flex flex-col p-4 border border-paper-200 rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="absolute right-4 top-4 h-4 w-4 text-primary border-paper-300" name="learning_style" type="radio" defaultValue="kinesthetic" />
<span className="material-symbols-outlined text-ink-500 mb-2" data-icon="touch_app">touch_app</span>
<span className="font-title-sm text-title-sm text-on-surface mb-1">Kinesthetic</span>
<span className="font-caption text-caption text-on-surface-variant">Learns through doing, moving, and touching.</span>
</label>
</div>
</div>
</section>

<div className="pt-6 flex justify-end gap-4 border-t border-paper-200">
<button className="px-6 py-3 font-title-sm text-title-sm text-primary bg-paper-0 border border-primary rounded-DEFAULT hover:bg-surface-container-low transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2" type="button">
                    Cancel
                </button>
<button className="px-6 py-3 font-title-sm text-title-sm text-on-primary bg-primary rounded-DEFAULT hover:bg-primary-container hover:text-on-primary-container transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm" type="submit">
                    Complete Onboarding
                </button>
</div>
</form>
</div>

    </>
  );
};
