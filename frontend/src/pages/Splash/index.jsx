import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const carouselImages = [
  '/app_screenshot.png',
  '/app_screenshot.png',
  '/app_screenshot.png',
];

const Splash = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // --- CONFIGURATION FOR DEVICE POSITIONS ---
  // Tweak x (horizontal offset), y (bottom offset), and z (stacking order) to perfectly position the devices.
  const devicePositions = {
    desktop: { x: "50%", y: "40px", z: 10 },
    tablet: { x: "0px", y: "0px", z: 20 },
    mobile: { x: "0px", y: "0px", z: 30 },
  };

  // Headline stats rendered in the strip directly beneath the hero band.
  const heroStats = [
    { icon: 'devices', value: '3', label: 'Devices synced' },
    { icon: 'wifi_off', value: '24/7', label: 'Offline access' },
    { icon: 'schedule', value: '10hrs', label: 'Saved weekly' },
    { icon: 'cloud_done', value: '100%', label: 'Autosaved work' },
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen font-body text-ink-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-paper-200/70">
        <div className="flex items-center justify-between gap-6 px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="TutorDesk Logo" className="h-8 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-ink-700 font-medium text-sm">
            <a href="#top" className="relative text-[#095D51] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#095D51]">
              Home
            </a>
            <a href="#features" className="hover:text-[#095D51] transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-[#095D51] transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-[#095D51] transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link to="/login" className="text-ink-700 font-medium hover:text-[#095D51] transition-colors text-sm">
              Log in
            </Link>
            <Link
              to="/signup"
              className="group bg-[#C48037] hover:bg-[#B3702B] text-white pl-4 pr-3 sm:pl-5 sm:pr-4 py-2.5 rounded-full font-medium transition-colors text-sm shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              Get started
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden">
        {/* Soft brand-tinted band */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8EDE7] via-[#E7F4F0] to-[#F5FAF8]" aria-hidden="true" />

        {/* Decorative geometry — echoes the arcs in the reference design */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -left-56 -top-24 w-[520px] h-[520px] rounded-full border-[56px] border-white/45" />
          <div className="absolute -left-24 top-40 w-[260px] h-[260px] rounded-full border-[28px] border-white/35" />
          <div className="absolute -right-40 -top-32 w-[560px] h-[560px] rounded-full bg-white/25" />
          <div className="absolute right-10 bottom-0 w-[320px] h-[320px] rounded-full bg-[#095D51]/[0.04]" />
          <svg className="absolute left-6 bottom-10 w-40 h-40 text-[#095D51]/25 hidden sm:block" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.5 9" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-end pt-14 md:pt-20">
          {/* Copy column */}
          <div className="max-w-xl w-full pb-2 lg:pb-24">
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white pl-1.5 pr-4 py-1.5 rounded-full shadow-sm mb-7">
              <span className="w-6 h-6 rounded-full bg-[#095D51] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              </span>
              <span className="text-xs font-semibold text-[#095D51] tracking-tight">Built for tutors who run it all</span>
            </span>

            <h1
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] font-bold text-ink-900 mb-5 tracking-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Bring Order to Your
              <br />
              <span className="text-[#095D51]">Tutoring Practice</span>
            </h1>

            <p className="text-base md:text-lg text-ink-600 mb-8 leading-relaxed max-w-lg">
              Classes, students, payments and reports in one calm workspace &mdash; on web, mobile and desktop, even when the network drops.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/signup"
                className="group bg-[#C48037] hover:bg-[#B3702B] text-white font-medium pl-7 pr-6 py-3.5 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Get started
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
              </Link>
              <a
                href="#features"
                className="group bg-white hover:bg-paper-100 text-ink-900 border border-white font-medium pl-7 pr-6 py-3.5 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                See the experience
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Multi-Device Layered Mockup — rises out of the band, like the reference photo */}
          <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[500px] z-10 mx-auto mb-10 md:mb-14 lg:mb-20">

          {/* Desktop Device (Back Center) */}
          <div 
            className="absolute -translate-x-1/2 w-[85%] max-w-[600px] aspect-[16/10] bg-[#1C1C1E] rounded-2xl shadow-2xl border border-paper-300 overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2"
            style={{ left: devicePositions.desktop.x, bottom: devicePositions.desktop.y, zIndex: devicePositions.desktop.z }}
          >
            {/* Top Bar */}
            <div className="h-6 bg-[#2C2C2E] flex items-center px-3 gap-1.5 shrink-0 border-b border-[#444]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            {/* Carousel Screen */}
            <div className="flex-1 relative bg-paper-100 overflow-hidden">
               <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                 {carouselImages.map((src, i) => (
                    <img key={i} src={src} className="w-full h-full object-cover object-top shrink-0" alt="Desktop View" />
                 ))}
               </div>
            </div>
          </div>

          {/* Tablet Device (Middle Left) */}
          <div 
            className="absolute w-[35%] max-w-[220px] aspect-[3/4] bg-black rounded-[24px] shadow-2xl border-[6px] border-black overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-2"
            style={{ left: devicePositions.tablet.x, bottom: devicePositions.tablet.y, zIndex: devicePositions.tablet.z }}
          >
             {/* Carousel Screen */}
            <div className="flex-1 relative bg-paper-100 overflow-hidden rounded-[18px]">
               <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                 {carouselImages.map((src, i) => (
                    <img key={i} src={src} className="w-full h-full object-cover object-left-top shrink-0" alt="Tablet View" />
                 ))}
               </div>
            </div>
          </div>

          {/* Mobile Device (Front Right) */}
          <div 
            className="absolute w-[25%] max-w-[140px] aspect-[9/19.5] bg-black rounded-[32px] shadow-2xl border-[8px] border-black overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.04] hover:-translate-y-2"
            style={{ right: devicePositions.mobile.x, bottom: devicePositions.mobile.y, zIndex: devicePositions.mobile.z }}
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45%] h-5 bg-black rounded-b-xl z-10"></div>
             {/* Carousel Screen */}
            <div className="flex-1 relative bg-paper-100 overflow-hidden rounded-[24px]">
               <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                 {carouselImages.map((src, i) => (
                    <img key={i} src={src} className="w-full h-full object-cover object-left-top shrink-0" alt="Mobile View" />
                 ))}
               </div>
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* Hero Stats Strip */}
      <section className="bg-white border-b border-paper-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-paper-200">
          {heroStats.map(({ icon, value, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 py-8 px-4">
              <span className="material-symbols-outlined text-[32px] text-[#095D51]/80 shrink-0">{icon}</span>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#095D51] leading-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {value}
                </div>
                <div className="text-[11px] text-ink-500 font-semibold uppercase tracking-wider mt-1.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#FAF9F5] py-24 border-t border-paper-200/60">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#095D51] mb-4 tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>Built for resilience. Designed for focus.</h2>
          <p className="text-ink-600 max-w-2xl mx-auto">Everything you need to run your tutoring business smoothly, even when connectivity drops.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h3 className="text-xl font-bold text-[#095D51] mb-3">Get paid, stop chasing</h3>
            <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
              Automated Nigerian bank transfer reconciliation and WhatsApp payment reminders. Focus on teaching, not tracking down fees.
            </p>
            {/* Mock element */}
            <div className="bg-[#FAF9F5] border border-paper-200 rounded-lg p-4 mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-ink-500 font-medium">Invoice #102</span>
                <span className="text-[10px] bg-success-tint text-success-solid px-2 py-1 rounded-full font-bold">&#9679; Recorded</span>
              </div>
              <div className="text-lg font-bold text-ink-900">&#8358; 15,000</div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
            <div className="w-12 h-12 bg-[#C48037]/10 text-[#C48037] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h3 className="text-xl font-bold text-[#095D51] mb-3">The student is the atom</h3>
            <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
              Centralized student records with progress tracking, attendance history, and early-warning flags for struggling learners.
            </p>
            {/* Mock element */}
            <div className="bg-[#FAF9F5] border border-paper-200 rounded-lg p-4 mt-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#095D51] text-white flex items-center justify-center font-bold text-xs">AO</div>
              <div className="flex-1">
                <div className="text-sm font-bold text-ink-900 mb-1">Adeola O.</div>
                <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#095D51] w-[78%] h-full rounded-full"></div>
                </div>
                <div className="text-[10px] text-ink-500 mt-1 text-right">78% Mastery</div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-paper-200 flex flex-col">
            <div className="w-12 h-12 bg-ink-200 text-ink-700 rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">wifi_off</span>
            </div>
            <h3 className="text-xl font-bold text-[#095D51] mb-3">Resilient by design</h3>
            <p className="text-ink-600 text-sm leading-relaxed mb-8 flex-1">
              Built for intermittent connectivity. Works entirely offline and survives power cuts with continuous, seamless autosave.
            </p>
            {/* Mock element */}
            <div className="bg-error-tint/50 border border-error-tint rounded-lg p-3 mt-auto text-center">
              <span className="text-xs font-medium text-error-solid flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[14px]">cloud_off</span>
                Working Offline - Changes saved locally
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-[#F0EFEA] rounded-[32px] p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="relative aspect-square md:aspect-auto md:h-full w-full rounded-2xl overflow-hidden shadow-lg">
            <img src="/testimonial.jpg" alt="Chinedu Eze, Tutor" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative z-10 py-6">
            <span className="text-6xl text-[#6B9F96] absolute -top-4 -left-4 opacity-50 font-serif">"</span>
            <blockquote className="text-2xl md:text-3xl font-bold text-[#095D51] mb-8 relative z-10 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              "TutorDesk brought order to the chaos. It literally saves me about 10 hours of administrative work and chasing payments every single week."
            </blockquote>
            <div>
              <div className="font-bold text-ink-900">Chinedu Eze</div>
              <div className="text-sm text-ink-600">Independent A-Level Physics Tutor, Lagos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#095D51] py-24 text-white relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>Simple, transparent pricing.</h2>
          <p className="text-[#A2C7C1] mb-12">Pay as you grow. No hidden fees, no long-term contracts. Just a calm workspace for your practice.</p>

          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl text-left border-t-8 border-[#C48037]">
            <h3 className="text-2xl font-bold text-ink-900 mb-2 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>Professional Desk</h3>
            <div className="flex justify-center items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>&#8358;5,000</span>
              <span className="text-ink-500 text-sm font-medium">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              {['Unlimited students & classes', 'Automated payment reconciliation', 'Offline mode with autosave', 'WhatsApp reminders integration'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-ink-700 text-sm">
                  <span className="material-symbols-outlined text-[#C48037] text-[18px] shrink-0">check</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link to="/signup" className="block w-full bg-[#C48037] hover:bg-[#B3702B] text-white text-center font-bold py-3.5 rounded-lg transition-colors shadow-sm">
              Start 14-day free trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF9F5] border-t border-paper-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="TutorDesk Logo" className="w-6 h-6 rounded-md" style={{ filter: 'grayscale(1) invert(1) brightness(1.5)', mixBlendMode: 'screen', backgroundColor: '#095D51' }} />
              <span className="font-bold text-[#095D51] tracking-tight">TutorDesk</span>
            </div>
            <p className="text-xs text-ink-500">Academic Operations. Order out of scatter.</p>
          </div>
          
          <div className="flex gap-6 text-xs text-ink-600 font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-medium border border-paper-300 px-4 py-1.5 rounded bg-white hover:bg-paper-50 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">login</span> Log In
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center md:text-left text-[10px] text-ink-400">
          &copy; {new Date().getFullYear()} TutorDesk. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Splash;
