import React, { useState, useEffect } from 'react';

const Splash = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // --- CONFIGURATION FOR DEVICE POSITIONS ---
  // Tweak these Tailwind CSS positioning classes to adjust where each gadget sits.
  const devicePositions = {
    desktop: "bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-10",
    tablet: "bottom-8 lg:bottom-12 left-4 sm:left-8 z-20",
    mobile: "bottom-8 lg:bottom-12 right-6 sm:right-12 z-30",
  };

  return (
    <div className="bg-surface w-full h-screen flex flex-col items-center justify-center m-0 p-0 overflow-hidden font-body text-on-surface">
      <main className="flex flex-col items-center justify-center text-center fade-in z-10">
        <div className="relative inline-flex items-baseline">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tight">
            tutordesk
          </h1>
          <span
            aria-hidden="true"
            className="w-3 h-3 bg-warning-solid rounded-full ml-1 mb-2 pulse-dot inline-block"
          ></span>
        </div>
        <p className="font-body-lg text-body-lg text-ink-500 mt-space-2 tracking-wide opacity-80">
          Order out of scatter.
        </p>
      </main>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E5E2D8 1px, transparent 1px), linear-gradient(to bottom, #E5E2D8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
    </div>
  );
};

export default Splash;
