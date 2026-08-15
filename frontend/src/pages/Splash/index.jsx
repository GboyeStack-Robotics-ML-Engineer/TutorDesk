import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ── carousel images for the device mockups ── */
const carouselImages = [
  '/app_screenshot.png',
  '/app_screenshot.png',
  '/app_screenshot.png',
];

const Splash = () => {
  const [phase, setPhase] = useState('splash');   // 'splash' → 'transition' → 'home'
  const [logoReady, setLogoReady] = useState(false);
  const [taglineReady, setTaglineReady] = useState(false);
  const [barDone, setBarDone] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ── splash timeline ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLogoReady(true), 300);       // logo fades in
    const t2 = setTimeout(() => setTaglineReady(true), 1200);   // tagline appears
    const t3 = setTimeout(() => setBarDone(true), 2200);        // bar fills
    const t4 = setTimeout(() => setPhase('transition'), 3200);  // begin crossfade
    const t5 = setTimeout(() => setPhase('home'), 3900);        // show home
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  /* ── carousel auto-advance (for home phase) ── */
  useEffect(() => {
    if (phase !== 'home') return;
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [phase]);

  // --- DEVICE POSITION CONFIG (tweak x, y, z) ---
  const devicePositions = {
    desktop: { x: '50%', y: '48px', z: 10 },
    tablet:  { x: '32px', y: '48px', z: 20 },
    mobile:  { x: '48px', y: '48px', z: 30 },
  };

  /* ════════════════════════════════════════════════
     SPLASH SCREEN
  ════════════════════════════════════════════════ */
  if (phase === 'splash' || phase === 'transition') {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #FAF9F5 0%, #F1EFE8 100%)',
          opacity: phase === 'transition' ? 0 : 1,
          transform: phase === 'transition' ? 'scale(1.05)' : 'scale(1)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #095D51 1px, transparent 1px), linear-gradient(to bottom, #095D51 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radial glow behind logo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(9,93,81,0.08) 0%, transparent 70%)',
            opacity: logoReady ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />

        {/* Logo */}
        <img
          src="/logo.png"
          alt="TutorDesk Logo"
          className="relative z-10"
          style={{
            width: '140px',
            height: '140px',
            objectFit: 'contain',
            opacity: logoReady ? 1 : 0,
            transform: logoReady ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(.2,0,0,1), transform 0.8s cubic-bezier(.2,0,0,1)',
          }}
        />

        {/* Brand name */}
        <div
          className="relative z-10 mt-6 flex flex-col items-center"
          style={{
            opacity: logoReady ? 1 : 0,
            transform: logoReady ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
          }}
        >
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: '#095D51' }}>
            <span style={{ color: '#095D51' }}>TUTOR</span>
            <span style={{ color: '#16211E' }}>DESK</span>
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="relative z-10 mt-3 text-sm tracking-[0.2em] font-medium"
          style={{
            color: '#6A716C',
            opacity: taglineReady ? 1 : 0,
            transform: taglineReady ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          Order out of scatter.
        </p>

        {/* Loading bar */}
        <div
          className="relative z-10 mt-8 overflow-hidden rounded-full"
          style={{
            width: '200px',
            height: '3px',
            backgroundColor: '#E5E2D8',
            opacity: taglineReady ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: barDone ? '100%' : '0%',
              background: 'linear-gradient(90deg, #095D51, #1C6B60)',
              transition: 'width 1.0s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     HOME / LANDING PAGE
  ════════════════════════════════════════════════ */
  return (
    <div
      className="bg-[#FAF9F5] min-h-screen font-body text-ink-900 overflow-x-hidden"
      style={{
        animation: 'fadeInUp 0.6s cubic-bezier(.2,0,0,1) both',
      }}
    >
      {/* Inline keyframe for the entrance */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Navigation ── */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto z-50 relative">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="TutorDesk Logo" className="h-9 w-9 object-contain" />
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: '#095D51' }}>TutorDesk</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-ink-700 font-medium text-sm">
          <a href="#features" className="hover:text-[#095D51] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#095D51] transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-[#095D51] transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-ink-700 font-medium hover:text-[#095D51] transition-colors text-sm">
            Log in
          </Link>
          <Link to="/signup" className="bg-[#095D51] hover:bg-[#0E322E] text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm">
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-16 md:pt-14 md:pb-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left copy */}
        <div className="max-w-xl w-full z-20">
          <div className="inline-flex items-center gap-2 bg-[#DCEBE7] text-[#095D51] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#095D51] animate-pulse" />
            Now in beta
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[52px] leading-[1.1] font-bold text-[#0E322E] mb-5 tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            One desk.<br />Three screens.
          </h1>
          <p className="text-base text-[#3A4441] mb-7 leading-relaxed max-w-md">
            The all-in-one operations platform for independent tutors. Manage students, schedule classes, collect payments, and communicate with parents — from any device.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-7">
            <Link to="/signup" className="w-full sm:w-auto bg-[#095D51] hover:bg-[#0E322E] text-white font-medium px-7 py-3.5 rounded-lg transition-all text-center shadow-md hover:shadow-lg">
              Start your free desk →
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-white border border-[#CFCABB] hover:border-[#095D51] text-[#16211E] font-medium px-6 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2">
              See how it works
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#E5E2D8]">
            <div>
              <strong className="block text-2xl font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>3</strong>
              <span className="text-xs text-[#6A716C] font-medium">platforms</span>
            </div>
            <div>
              <strong className="block text-2xl font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>1</strong>
              <span className="text-xs text-[#6A716C] font-medium">workflow</span>
            </div>
            <div>
              <strong className="block text-2xl font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>24/7</strong>
              <span className="text-xs text-[#6A716C] font-medium">access</span>
            </div>
          </div>
        </div>

        {/* ── Device Mockup Area ── */}
        <div className="relative w-full lg:w-[700px] h-[320px] sm:h-[420px] lg:h-[500px] flex items-center justify-center z-10 mt-8 lg:mt-0 mx-auto">
          {/* Desktop */}
          <div
            className="absolute -translate-x-1/2 w-[80%] max-w-[560px] aspect-[16/10] bg-[#1C1C1E] rounded-2xl shadow-2xl border border-[#CFCABB] overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
            style={{ left: devicePositions.desktop.x, bottom: devicePositions.desktop.y, zIndex: devicePositions.desktop.z }}
          >
            <div className="h-6 bg-[#2C2C2E] flex items-center px-3 gap-1.5 shrink-0 border-b border-[#444]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 relative bg-[#F1EFE8] overflow-hidden">
              <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselImages.map((src, i) => (
                  <img key={i} src={src} className="w-full h-full object-cover object-top shrink-0" alt="Desktop View" />
                ))}
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div
            className="absolute w-[32%] max-w-[200px] aspect-[3/4] bg-black rounded-[22px] shadow-2xl border-[5px] border-black overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-1"
            style={{ left: devicePositions.tablet.x, bottom: devicePositions.tablet.y, zIndex: devicePositions.tablet.z }}
          >
            <div className="flex-1 relative bg-[#F1EFE8] overflow-hidden rounded-[17px]">
              <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselImages.map((src, i) => (
                  <img key={i} src={src} className="w-full h-full object-cover object-left-top shrink-0" alt="Tablet View" />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div
            className="absolute w-[22%] max-w-[120px] aspect-[9/19.5] bg-black rounded-[28px] shadow-2xl border-[6px] border-black overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.04] hover:-translate-y-1"
            style={{ right: devicePositions.mobile.x, bottom: devicePositions.mobile.y, zIndex: devicePositions.mobile.z }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42%] h-4 bg-black rounded-b-xl z-10" />
            <div className="flex-1 relative bg-[#F1EFE8] overflow-hidden rounded-[22px]">
              <div className="absolute inset-0 flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselImages.map((src, i) => (
                  <img key={i} src={src} className="w-full h-full object-cover object-left-top shrink-0" alt="Mobile View" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E322E] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Everything on one desk
          </h2>
          <p className="text-[#6A716C] max-w-lg mx-auto">
            Built for Nigerian tutors dealing with scattered tools, unreliable power, and back-to-back classes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '👥', title: 'Student Management', desc: 'Full profiles, progress tracking, early-warning flags — every student in one searchable place.' },
            { icon: '📅', title: 'Smart Scheduling', desc: 'Teaching blocks, rest periods, timezone-aware booking for international clients.' },
            { icon: '💳', title: 'Naira Payments', desc: 'Bank-transfer-first invoicing, automated reminders, and ₦ formatting built in.' },
            { icon: '📚', title: 'Materials Library', desc: 'Reusable lesson templates, offline-available resources, AI-assisted planning.' },
            { icon: '💬', title: 'WhatsApp Messaging', desc: 'One-tap WhatsApp deep-links, message templates, communication-hour boundaries.' },
            { icon: '📊', title: 'Reports & Insights', desc: 'Income trends, attendance rates, student retention — honest charts, no decoration.' },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-[#E5E2D8] rounded-xl p-6 hover:shadow-lg hover:border-[#DCEBE7] transition-all group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-lg font-bold text-[#16211E] mb-2">{f.title}</h3>
              <p className="text-sm text-[#6A716C] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section id="testimonials" className="bg-[#0E322E] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed italic mb-8">
            "Before TutorDesk I was drowning in WhatsApp messages, spreadsheets, and forgotten invoices. Now everything is in one place — I actually finish my admin before my next class starts."
          </p>
          <div className="flex items-center justify-center gap-4">
            <img src="/testimonial.jpg" alt="Chidi Okeke" className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Chidi Okeke</p>
              <p className="text-white/50 text-xs">Mathematics Tutor · Lagos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0E322E] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Simple, honest pricing
          </h2>
          <p className="text-[#6A716C] max-w-lg mx-auto">
            Start free. Upgrade when you're ready — no hidden fees, no card required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { plan: 'Starter', price: 'Free', period: 'forever', features: ['Up to 5 students', 'Basic scheduling', 'Invoice creation', 'WhatsApp integration'], cta: 'Start free', primary: false },
            { plan: 'Professional', price: '₦5,000', period: '/month', features: ['Unlimited students', 'Smart scheduling', 'Automated reminders', 'Materials library', 'Reports & insights', 'Parent portal'], cta: 'Start free trial', primary: true },
            { plan: 'Academy', price: '₦12,000', period: '/month', features: ['Everything in Pro', 'Multiple tutors', 'Group classes', 'Advanced analytics', 'Priority support', 'Custom branding'], cta: 'Contact us', primary: false },
          ].map((p, i) => (
            <div key={i} className={`rounded-xl p-6 border ${p.primary ? 'bg-[#095D51] text-white border-[#095D51] shadow-xl scale-105' : 'bg-white border-[#E5E2D8]'} transition-all hover:shadow-lg`}>
              <p className={`text-sm font-semibold mb-2 ${p.primary ? 'text-[#DCEBE7]' : 'text-[#6A716C]'}`}>{p.plan}</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-3xl font-bold ${p.primary ? 'text-white' : 'text-[#0E322E]'}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.price}</span>
                <span className={`text-sm ${p.primary ? 'text-white/60' : 'text-[#6A716C]'}`}>{p.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className={`text-sm flex items-center gap-2 ${p.primary ? 'text-white/80' : 'text-[#3A4441]'}`}>
                    <span className={`text-xs ${p.primary ? 'text-[#7BB0A6]' : 'text-[#095D51]'}`}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`block w-full text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${p.primary ? 'bg-white text-[#095D51] hover:bg-[#F1EFE8]' : 'bg-[#095D51] text-white hover:bg-[#0E322E]'}`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E5E2D8] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TutorDesk" className="h-7 w-7 object-contain" />
            <span className="text-sm font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>TutorDesk</span>
          </div>
          <p className="text-xs text-[#6A716C]">© 2026 TutorDesk. Built for Nigerian tutors.</p>
          <div className="flex gap-6 text-xs text-[#6A716C]">
            <a href="#" className="hover:text-[#095D51] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#095D51] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#095D51] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Splash;
