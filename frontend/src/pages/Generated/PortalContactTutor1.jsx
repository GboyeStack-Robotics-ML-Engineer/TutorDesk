import React from 'react';

export const PortalContactTutor1 = () => {
  return (
    <>
      

<section className="flex flex-col md:flex-row items-center md:items-start gap-space-6 mb-space-8 text-center md:text-left">
<div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-paper-200 shrink-0 shadow-[0_2px_12px_rgba(22,33,30,0.06)] bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A portrait of a professional African male tutor in a well-lit home office setting. He is wearing a smart casual light blue button-down shirt. The lighting is warm and natural, creating a welcoming and approachable atmosphere while maintaining a sense of academic competence. The background is a clean, minimalist workspace with a subtle hint of a bookshelf, styled in a bright, modern light-mode aesthetic with high contrast and sharp focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI6KuN-kj77_JMG24SXP0RFIYHqq4xs-YJZDagZ6Hk8AQtiSZGLvj1bJdgoeB8JkaDO9_43lV3ye2-ZgYP1dkgdrPXdDmyv8ITlY-NJcQWViv5vggtGkmakbY7CBAHvEyVDDATP9BwgMsRVEXaZEmEmfyc6-Mr3YFZyRjZvP23pMBQKJYqiZFnCBqm5Em7Vbn-WU1hpP2CAB4_u750fhfb7rawQfLhi82ElDXU8MZ2iG7bw9Utiuug" />
</div>
<div className="flex flex-col justify-center pt-2">
<h2 className="font-display-md text-display-md text-ink-900 mb-1">Dr. Samuel Ojo</h2>
<p className="font-body-lg text-body-lg text-ink-700 mb-space-2">Senior Mathematics Instructor</p>
<div className="flex items-center justify-center md:justify-start gap-2 bg-success-tint border border-success-tint rounded-full px-3 py-1 w-max mx-auto md:mx-0">
<span className="w-2 h-2 rounded-full bg-success-solid relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-solid opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-success-solid"></span>
</span>
<span className="font-label text-label text-success-solid tracking-wide">Currently Online</span>
</div>
</div>
</section>

<section className="bg-paper-100 border border-paper-300 rounded-xl p-space-6 mb-space-8 flex items-start gap-space-4">
<div className="w-10 h-10 rounded-full bg-surface-container-highest text-ink-700 flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined">schedule</span>
</div>
<div>
<h3 className="font-title-sm text-title-sm text-ink-900 mb-1">Communication Hours</h3>
<p className="font-body text-body text-ink-700 leading-relaxed max-w-2xl">
                    Dr. Ojo is typically available to review assignments and respond to messages between <strong className="text-ink-900 font-semibold">3:00 PM and 6:00 PM (WAT)</strong> from Monday to Friday. Messages sent outside these hours will be addressed the following academic day.
                </p>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-space-4 mb-space-8">

<button className="group flex items-center gap-space-4 p-space-4 rounded-xl border border-success-solid bg-paper-0 hover:bg-success-tint/30 transition-all duration-200 text-left shadow-[0_2px_8px_rgba(22,33,30,0.03)] hover:shadow-[0_4px_12px_rgba(46,125,91,0.08)] focus:outline-none focus:ring-2 focus:ring-success-solid focus:border-transparent">
<div className="w-12 h-12 rounded-full bg-success-tint text-success-solid flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>forum</span>
</div>
<div className="flex-1">
<span className="block font-title-sm text-title-sm text-ink-900 mb-0.5">WhatsApp</span>
<span className="block font-caption text-caption text-ink-500">For urgent clarifications</span>
</div>
<div className="w-8 h-8 rounded-full border border-paper-300 flex items-center justify-center group-hover:border-success-solid group-hover:bg-success-solid group-hover:text-paper-0 text-ink-500 transition-colors">
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</div>
</button>

<button className="group flex items-center gap-space-4 p-space-4 rounded-xl border border-paper-300 bg-paper-0 hover:bg-paper-50 transition-all duration-200 text-left shadow-[0_2px_8px_rgba(22,33,30,0.03)] hover:shadow-[0_4px_12px_rgba(22,33,30,0.06)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
<div className="w-12 h-12 rounded-full bg-surface-container-high text-ink-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>mail</span>
</div>
<div className="flex-1">
<span className="block font-title-sm text-title-sm text-ink-900 mb-0.5">Email</span>
<span className="block font-caption text-caption text-ink-500">For detailed reports &amp; files</span>
</div>
<div className="w-8 h-8 rounded-full border border-paper-300 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-paper-0 text-ink-500 transition-colors">
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</div>
</button>
</section>

<section className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 md:p-space-8 shadow-[0_4px_24px_rgba(22,33,30,0.04)]">
<div className="flex items-center gap-3 mb-space-6">
<span className="material-symbols-outlined text-primary">chat_bubble</span>
<h3 className="font-title-md text-title-md text-ink-900">Send Internal Message</h3>
</div>
<form className="flex flex-col gap-space-6">

<div className="flex flex-col gap-space-2">
<label className="font-label text-label text-ink-900" htmlFor="message-subject">Subject Context</label>
<input className="w-full h-12 px-4 border border-paper-300 rounded-lg bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body text-ink-900 placeholder:text-ink-500 transition-all shadow-sm" id="message-subject" placeholder="e.g., Question regarding Week 3 Assignment" type="text" />
</div>

<div className="flex flex-col gap-space-2">
<div className="flex justify-between items-baseline">
<label className="font-label text-label text-ink-900" htmlFor="message-body">Message</label>
<span className="font-caption text-caption text-ink-500">Supports plain text only</span>
</div>
<textarea className="w-full p-4 border border-paper-300 rounded-lg bg-surface-bright focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body text-body text-ink-900 placeholder:text-ink-500 resize-y transition-all shadow-sm" id="message-body" placeholder="Write your message here. Please be as specific as possible to help Dr. Ojo assist you efficiently..." rows="5" />
</div>

<div className="flex justify-end pt-space-2 border-t border-paper-100 mt-2">
<button className="group bg-primary hover:bg-primary-container text-on-primary font-label text-label px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" type="button">
<span>Send Message</span>
<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" style={{"fontVariationSettings":"\"FILL\" 1"}}>send</span>
</button>
</div>
</form>
</section>

    </>
  );
};
