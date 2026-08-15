import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const carouselImages = ['/app_screenshot.png', '/app_screenshot.png', '/app_screenshot.png'];

/** Shared sliding-screen used inside every device frame. */
const Screen = ({ slide, objectPosition = 'object-top' }) => (
  <div className="absolute inset-0 bg-paper-100 overflow-hidden">
    <div
      className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${slide * 100}%)` }}
    >
      {carouselImages.map((src, i) => (
        <img
          key={i}
          src={src}
          className={`w-full h-full object-cover ${objectPosition} shrink-0`}
          alt=""
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

/**
 * One workspace, every screen.
 *
 * Carries over the layered laptop / tablet / phone mockup that previously
 * opened the page, now on a deep brand band where it reads as a product
 * showcase rather than a hero.
 */
export const MultiDevice = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#07332C] py-20 md:py-28 overflow-hidden">
      {/* Dotted texture + glow */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/3 w-[720px] h-[720px] rounded-full bg-[#8BD4C6]/10 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-1.5 rounded-full mb-6">
            <span className="material-symbols-outlined text-[16px] text-[#8BD4C6]">devices</span>
            <span className="text-xs font-semibold text-[#A2C7C1] tracking-tight">Works everywhere you do</span>
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-4 tracking-tight leading-[1.12]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            One desk, on every screen
          </h2>
          <p className="text-[#A2C7C1] text-base md:text-lg leading-relaxed">
            Plan on the laptop, teach from the tablet, take the payment on your phone. The same workspace, synced &mdash; and it keeps working when the network doesn&rsquo;t.
          </p>
        </motion.div>

        {/* Layered device composition */}
        <motion.div
          className="relative w-full h-[280px] sm:h-[420px] lg:h-[520px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Laptop — dominant, back left */}
          <div className="absolute left-0 bottom-8 w-[78%] max-w-[680px] z-10">
            <div className="bg-[#1C1C1E] rounded-t-2xl border border-white/10 border-b-0 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="h-6 bg-[#2C2C2E] flex items-center px-3 gap-1.5 border-b border-[#444]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="relative aspect-[16/10]">
                <Screen slide={currentSlide} />
              </div>
            </div>
            {/* Laptop base */}
            <div className="h-3 bg-gradient-to-b from-[#3A3A3C] to-[#1C1C1E] rounded-b-xl mx-[-2%] shadow-lg" />
          </div>

          {/* Tablet — mid right */}
          <div className="absolute right-0 bottom-16 w-[30%] max-w-[240px] aspect-[3/4] bg-black rounded-[24px] border-[6px] border-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
            <div className="relative w-full h-full rounded-[18px] overflow-hidden">
              <Screen slide={currentSlide} objectPosition="object-left-top" />
            </div>
          </div>

          {/* Phone — front, overlapping both */}
          <div className="absolute right-[22%] bottom-0 w-[19%] max-w-[150px] aspect-[9/19.5] bg-black rounded-[30px] border-[7px] border-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] z-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-5 bg-black rounded-b-xl z-10" />
            <div className="relative w-full h-full rounded-[24px] overflow-hidden">
              <Screen slide={currentSlide} objectPosition="object-left-top" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
