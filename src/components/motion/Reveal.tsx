'use client';

import { motion, useReducedMotion } from 'motion/react';
import { motion as motionTokens } from '../../appTheme';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  once?: boolean;
  variant?: 'rise' | 'scale' | 'slide-left' | 'slide-right';
  fill?: boolean;
};

export function Reveal({ children, delay = 0, distance = 42, once = true, variant = 'rise', fill = false }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = {
    rise: { opacity: 0, y: distance, scale: 0.975 },
    scale: { opacity: 0, y: distance * 0.35, scale: 0.92 },
    'slide-left': { opacity: 0, x: distance, scale: 0.98 },
    'slide-right': { opacity: 0, x: -distance, scale: 0.98 },
  }[variant];

  return (
    <motion.div
      style={fill ? { height: '100%' } : undefined}
      initial={shouldReduceMotion ? false : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ ...motionTokens.reveal.viewport, once }}
      transition={{
        duration: motionTokens.reveal.duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: motionTokens.reveal.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
