'use client';

import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  once?: boolean;
  variant?: 'rise' | 'scale' | 'slide-left' | 'slide-right';
};

export function Reveal({ children, delay = 0, distance = 42, once = true, variant = 'rise' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = {
    rise: { opacity: 0, y: distance, scale: 0.975 },
    scale: { opacity: 0, y: distance * 0.35, scale: 0.92 },
    'slide-left': { opacity: 0, x: distance, scale: 0.98 },
    'slide-right': { opacity: 0, x: -distance, scale: 0.98 },
  }[variant];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.16, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.78, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
