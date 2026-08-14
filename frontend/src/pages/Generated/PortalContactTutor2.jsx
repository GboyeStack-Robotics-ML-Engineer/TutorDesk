import React from 'react';

export const PortalContactTutor2 = () => {
  return (
    <>
      

<div className="mb-space-8 md:mb-12">
<h1 className="font-display-md text-display-md text-on-surface mb-space-2">Contact Tutor</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Reach out to your tutor for questions regarding assignments, schedule changes, or academic support.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6 md:gap-space-8">

<div className="lg:col-span-5 flex flex-col gap-space-6">

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 flex flex-col items-center text-center shadow-[0_4px_12px_rgba(22,33,30,0.06)] relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
<img alt="Tutor Avatar" className="w-24 h-24 rounded-full border-4 border-surface-bright object-cover mb-space-4 shadow-sm" data-alt="A high-quality, professional headshot of an experienced male tutor in his late 30s. He is wearing a smart-casual collared shirt, smiling warmly towards the camera. The background is a slightly blurred, bright home office or study environment with bookshelves, conveying an academic yet approachable mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZIeDM3ADnimMpn2zoFPF1fT1TodFURrUL0-vh_EcgR0A5qYmNF8tS6V_7moWJhMZ9NFkYkwxlzZkmftDIS45dG5vwr03YxvBfMNtmTHZ7WIjtDI-XZ0gwLCyadKdcPnjl3Qp9yDPUiyk4J-eWSzJVT-7VCSbn39_nPVgLKOpVuqIrZQhN_KIAGtRQ-1m5s5_Z7tAfZ1GZ_1RXDSaOioNUOgzRwdolmnSsdefkHSrZws5QXf-VWCcK" />
<h2 className="font-title-lg text-title-lg text-on-surface mb-1">Mr. David Oladipo</h2>
<p className="font-body text-body text-on-surface-variant mb-space-4">Mathematics &amp; Physics Tutor</p>
<div className="w-full pt-space-4 border-t border-paper-200">
<div className="flex justify-between items-center mb-2">
<span className="font-label text-label text-on-surface-variant">Communication Hours</span>
<span className="inline-flex items-center gap-1 bg-success-tint text-success-solid px-2 py-1 rounded-full font-caption text-caption">
<span className="w-1.5 h-1.5 rounded-full bg-success-solid"></span> Available Now
                            </span>
</div>
<p className="font-data-display text-data-display text-on-surface bg-paper-100 p-space-2 rounded border border-paper-200 text-left">Mon-Fri: 09:00 AM - 05:00 PM (WAT)</p>
</div>
</div>

<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 shadow-[0_4px_12px_rgba(22,33,30,0.06)]">
<h3 className="font-title-sm text-title-sm text-on-surface mb-space-4 border-b border-paper-200 pb-2">Direct Channels</h3>
<ul className="flex flex-col gap-space-3">
<li>
<a className="flex items-center p-space-3 rounded-lg border border-paper-200 hover:border-primary hover:bg-surface-container-low transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href="#">
<div className="w-10 h-10 rounded-full bg-success-tint text-success-solid flex items-center justify-center mr-space-4 group-hover:bg-success-solid group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined filled" data-icon="forum">forum</span>
</div>
<div className="flex-1">
<div className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors">WhatsApp</div>
<div className="font-caption text-caption text-on-surface-variant">Typical response: 1-2 hours</div>
</div>
<span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="open_in_new">open_in_new</span>
</a>
</li>
<li>
<a className="flex items-center p-space-3 rounded-lg border border-paper-200 hover:border-primary hover:bg-surface-container-low transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" href="mailto:david.oladipo@tutordesk.edu">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mr-space-4 group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-colors">
<span className="material-symbols-outlined filled" data-icon="mail">mail</span>
</div>
<div className="flex-1">
<div className="font-title-sm text-title-sm text-on-surface group-hover:text-primary transition-colors">Email</div>
<div className="font-caption text-caption text-on-surface-variant">Typical response: Within 24 hours</div>
</div>
<span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors" data-icon="arrow_forward">arrow_forward</span>
</a>
</li>
</ul>
</div>
</div>

<div className="lg:col-span-7">
<div className="bg-paper-0 border border-paper-200 rounded-xl p-space-6 md:p-space-8 shadow-[0_4px_12px_rgba(22,33,30,0.06)] h-full flex flex-col">
<div className="mb-space-6 border-b border-paper-200 pb-space-4">
<h3 className="font-title-md text-title-md text-on-surface mb-1">Send a Message</h3>
<p className="font-body text-body text-on-surface-variant">Use this form if direct channels are unavailable or for formal inquiries.</p>
</div>
<form action="#" className="flex-1 flex flex-col" method="POST">
<div className="flex flex-col gap-space-4 flex-1">

<div>
<label className="block font-label text-label text-on-surface mb-1" htmlFor="subject">Subject Matter</label>
<div className="relative">
<select className="w-full bg-surface-bright border border-paper-300 rounded-lg py-3 px-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none hover:border-outline transition-colors" id="subject" name="subject">
<option value="homework">Homework Question</option>
<option value="schedule">Schedule Change Request</option>
<option value="progress">Academic Progress</option>
<option value="other">Other Inquiry</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
</div>
</div>
</div>

<div className="flex-1 flex flex-col">
<label className="block font-label text-label text-on-surface mb-1" htmlFor="message">Message</label>
<textarea className="w-full flex-1 bg-surface-bright border border-paper-300 rounded-lg py-3 px-4 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y min-h-[150px] hover:border-outline transition-colors" id="message" name="message" placeholder="Write your message here..." rows="6" />
<div className="flex justify-between items-center mt-1 px-1">
<span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="info">info</span>
                                        Messages are logged for quality assurance.
                                    </span>
</div>
</div>
</div>

<div className="mt-space-8 pt-space-4 border-t border-paper-200 flex justify-end gap-space-4">
<button className="px-space-6 py-3 border border-paper-300 rounded-lg font-title-sm text-title-sm text-on-surface hover:bg-paper-100 hover:border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors" type="button">
                                Clear
                            </button>
<button className="px-space-6 py-3 bg-primary text-on-primary rounded-lg font-title-sm text-title-sm hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors flex items-center gap-2 shadow-sm" type="submit">
<span>Send Message</span>
<span className="material-symbols-outlined text-[20px]" data-icon="send">send</span>
</button>
</div>
</form>
</div>
</div>
</div>

    </>
  );
};
