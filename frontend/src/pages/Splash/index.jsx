import React from 'react';
import { SiteNav } from './sections/SiteNav';
import { HeroConstellation } from './sections/HeroConstellation';
import { WhatWeOffer } from './sections/WhatWeOffer';
import { MultiDevice } from './sections/MultiDevice';
import { Pricing } from './sections/Pricing';
import { Features } from './sections/Features';
import { Testimonial } from './sections/Testimonial';
import { SiteFooter } from './sections/SiteFooter';

/**
 * TutorDesk landing page.
 *
 * Each band is its own module under ./sections — this file only decides the
 * order the story is told in: the scatter being unified, what the platform
 * offers, where it runs, what it costs, then the supporting detail.
 */
const Splash = () => (
  <div className="bg-[#FAF9F5] min-h-screen font-body text-ink-900 overflow-x-hidden">
    <SiteNav />
    <HeroConstellation />
    <WhatWeOffer />
    <MultiDevice />
    <Pricing />
    <Features />
    <Testimonial />
    <SiteFooter />
  </div>
);

export default Splash;
