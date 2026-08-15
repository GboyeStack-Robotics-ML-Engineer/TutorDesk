import React from 'react';

export const Testimonial = () => (
  <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
    <div className="bg-[#F0EFEA] rounded-[32px] p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
      <div className="relative aspect-square md:aspect-auto md:h-full w-full rounded-2xl overflow-hidden shadow-lg">
        <img src="/testimonial.jpg" alt="Chinedu Eze, Tutor" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="relative z-10 py-6">
        <span className="text-6xl text-[#6B9F96] absolute -top-4 -left-4 opacity-50 font-serif">&ldquo;</span>
        <blockquote
          className="text-2xl md:text-3xl font-bold text-[#095D51] mb-8 relative z-10 leading-snug"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          &ldquo;TutorDesk brought order to the chaos. It literally saves me about 10 hours of administrative work and chasing payments every single week.&rdquo;
        </blockquote>
        <div>
          <div className="font-bold text-ink-900">Chinedu Eze</div>
          <div className="text-sm text-ink-600">Independent A-Level Physics Tutor, Lagos</div>
        </div>
      </div>
    </div>
  </section>
);
