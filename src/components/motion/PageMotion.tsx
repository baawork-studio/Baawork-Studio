'use client';

import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';

type PageMotionProps = {
  children: React.ReactNode;
};

export function PageMotion({ children }: PageMotionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.988 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
