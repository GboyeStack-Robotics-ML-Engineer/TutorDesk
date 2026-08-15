import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { integrations } from '../data/integrations';

/**
 * Geometry for the orbiting integration nodes.
 *
 * Percentages are resolved against the square constellation stage, so the
 * whole figure scales with its container instead of needing breakpoint maths.
 * Angles start at 12 o'clock and run clockwise.
 */
const RADIUS = 39; // % of the stage, from centre to node centre
const HUB_RADIUS = 15; // % — where the dashed connector leaves the logo
const NODE_GAP = 4.5; // % — breathing room between connector end and node chip

const useNodeGeometry = () =>
  useMemo(
    () =>
      integrations.map((integration, index) => {
        const angle = (index / integrations.length) * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
          ...integration,
          // Node placement, as CSS percentages.
          left: 50 + RADIUS * cos,
          top: 50 + RADIUS * sin,
          // Connector endpoints, in the SVG's 0-100 viewBox space.
          x1: 50 + HUB_RADIUS * cos,
          y1: 50 + HUB_RADIUS * sin,
          x2: 50 + (RADIUS - NODE_GAP) * cos,
          y2: 50 + (RADIUS - NODE_GAP) * sin,
        };
      }),
    []
  );

/**
 * The hero visual: every tool a tutor already uses, drawn into one desk.
 *
 * Motion is layered so it reads as a system coming together rather than a
 * carousel of effects — connectors draw inward, nodes settle, then the ring
 * drifts. Everything collapses to a static figure under prefers-reduced-motion.
 */
const Constellation = () => {
  const nodes = useNodeGeometry();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[540px] aspect-square mx-auto">
      {/* Concentric guide rings — depth without noise */}
      <div className="absolute inset-[8%] rounded-full border border-[#095D51]/[0.07]" aria-hidden="true" />
      <div className="absolute inset-[22%] rounded-full border border-[#095D51]/[0.06]" aria-hidden="true" />

      {/* The orbit. Rotating this wrapper carries the connectors with it. */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
      >
        {/* Dashed connectors, flowing inward toward the hub */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          {nodes.map((node, index) => (
            <motion.line
              key={node.id}
              x1={node.x1}
              y1={node.y1}
              x2={node.x2}
              y2={node.y2}
              stroke="#095D51"
              strokeOpacity="0.38"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeDasharray="1.6 2.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={
                prefersReducedMotion
                  ? undefined
                  : { animation: `td-dash-flow 1.4s linear ${index * 0.12}s infinite` }
              }
            />
          ))}
        </svg>

        {/* Integration nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Counter-rotation keeps every label upright as the ring drifts */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-white rounded-full shadow-[0_4px_16px_rgba(22,33,30,0.10)] border border-white p-1.5 sm:pr-3.5"
            >
              {/* overflow-hidden keeps the chip intact if the icon font fails to load */}
              <span
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                style={{ backgroundColor: `${node.tint}1A`, color: node.tint }}
              >
                <span className="material-symbols-outlined text-[18px] leading-none">{node.icon}</span>
              </span>
              <span className="hidden sm:block text-[11px] lg:text-xs font-semibold text-ink-700 whitespace-nowrap">
                {node.name}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* The hub — TutorDesk, holding it all together */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Breathing halo */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#095D51]/10 blur-xl"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
          aria-hidden="true"
        />
        <motion.div
          className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-[0_12px_40px_rgba(9,93,81,0.18)] border border-white flex items-center justify-center"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
        >
          <img src="/logo.png" alt="TutorDesk" className="w-12 sm:w-14 lg:w-16 object-contain" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const HeroConstellation = () => (
  <section id="top" className="relative overflow-hidden">
    {/* Soft brand-tinted band */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#D8EDE7] via-[#E7F4F0] to-[#F5FAF8]" aria-hidden="true" />

    {/* Decorative geometry */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -left-56 -top-24 w-[520px] h-[520px] rounded-full border-[56px] border-white/45" />
      <div className="absolute -left-24 top-40 w-[260px] h-[260px] rounded-full border-[28px] border-white/35" />
      <div className="absolute -right-40 -top-32 w-[560px] h-[560px] rounded-full bg-white/25" />
      <svg className="absolute left-6 bottom-10 w-40 h-40 text-[#095D51]/25 hidden lg:block" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.5 9" />
      </svg>
    </div>

    <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-14 md:py-20 lg:py-24">
      {/* Copy column */}
      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
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
          Eight Tools.
          <br />
          <span className="text-[#095D51]">One Desk.</span>
        </h1>

        <p className="text-base md:text-lg text-ink-600 mb-8 leading-relaxed max-w-lg">
          WhatsApp for parents, a spreadsheet for fees, Zoom for class, a notebook for everything else. TutorDesk pulls all of it into one calm workspace.
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
            href="#offer"
            className="group bg-white hover:bg-paper-100 text-ink-900 border border-white font-medium pl-7 pr-6 py-3.5 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            See what we offer
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-y-0.5">arrow_downward</span>
          </a>
        </div>
      </motion.div>

      {/* Constellation column */}
      <Constellation />
    </div>
  </section>
);
