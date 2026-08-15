import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'STARTER',
    price: '₦12,000',
    users: '2-5 users',
    features: ['Access to all features'],
    accent: 'teal', // dark teal background
  },
  {
    name: 'PRO',
    price: '₦17,000',
    users: '6-10 users',
    features: ['Access to all features'],
    accent: 'gold', // gold background
    popular: true,
  },
  {
    name: 'PLUS',
    price: '₦27,000',
    users: '11-20 users',
    features: ['Access to all features'],
    accent: 'gold',
  },
  {
    name: 'STUDIO',
    price: '₦35,000',
    users: '21-30 users',
    features: ['Access to all features'],
    accent: 'gold',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Pricing = () => (
  <section id="pricing" className="bg-[#095D51] py-24 text-white relative overflow-hidden">
    {/* Background dot pattern */}
    <div
      className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    ></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-14">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Simple, transparent pricing.
        </h2>
        <p className="text-[#A2C7C1] max-w-lg mx-auto">
          Pay as you grow. No hidden fees, no long-term contracts. Just a calm workspace for your practice.
        </p>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {plans.map((plan, index) => {
          const isTeal = plan.accent === 'teal';
          const cardBg = isTeal
            ? 'bg-[#0A4D43]'
            : 'bg-[#D4952F]';
          const nameBg = isTeal
            ? 'bg-[#095D51] text-[#6FD4C0]'
            : 'bg-[#C48037] text-white';

          return (
            <motion.div
              key={plan.name}
              className={`${cardBg} rounded-2xl p-6 flex flex-col relative overflow-hidden border border-white/10 shadow-xl`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-white text-[#C48037] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Popular
                </span>
              )}

              {/* Plan label */}
              <span className={`inline-block self-start text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-5 ${nameBg}`}>
                {plan.name}
              </span>

              {/* Price */}
              <div className="mb-6">
                <span
                  className="text-3xl lg:text-4xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {plan.price}
                </span>
                <span className="text-white/60 text-xs font-medium ml-1">/month</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2 text-white/90 text-sm">
                  <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">group</span>
                  {plan.users}
                </li>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-white/90 text-sm">
                    <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/signup"
                className={`mt-6 block w-full text-center font-semibold py-3 rounded-lg transition-all text-sm shadow-sm ${
                  isTeal
                    ? 'bg-white text-[#095D51] hover:bg-white/90'
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                Get started
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-center text-[#A2C7C1] text-xs mt-10">
        All plans include a 14-day free trial. No credit card required.
      </p>
    </div>
  </section>
);
