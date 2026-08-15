import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps any page in a smooth fade + slide-up entrance animation.
 * Used by App.jsx with AnimatePresence for cross-page transitions.
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ minHeight: '100vh' }}
  >
    {children}
  </motion.div>
);
