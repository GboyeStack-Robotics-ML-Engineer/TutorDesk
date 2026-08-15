import React from 'react';
import { Link } from 'react-router-dom';

const planFeatures = [
  'Unlimited students & classes',
  'Automated payment reconciliation',
  'Offline mode with autosave',
  'WhatsApp reminders integration',
];

export const Pricing = () => (
  <section id="pricing" className="bg-[#095D51] py-24 text-white relative">
    <div
      className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    ></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Simple, transparent pricing.
      </h2>
      <p className="text-[#A2C7C1] mb-12">
        Pay as you grow. No hidden fees, no long-term contracts. Just a calm workspace for your practice.
      </p>

      <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl text-left border-t-8 border-[#C48037]">
        <h3
          className="text-2xl font-bold text-ink-900 mb-2 text-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Professional Desk
        </h3>
        <div className="flex justify-center items-baseline gap-1 mb-8">
          <span className="text-5xl font-bold text-[#095D51]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            &#8358;5,000
          </span>
          <span className="text-ink-500 text-sm font-medium">/month</span>
        </div>

        <ul className="space-y-4 mb-8">
          {planFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-ink-700 text-sm">
              <span className="material-symbols-outlined text-[#C48037] text-[18px] shrink-0">check</span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to="/signup"
          className="block w-full bg-[#C48037] hover:bg-[#B3702B] text-white text-center font-bold py-3.5 rounded-lg transition-colors shadow-sm"
        >
          Start 14-day free trial
        </Link>
      </div>
    </div>
  </section>
);
