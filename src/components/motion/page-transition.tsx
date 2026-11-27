'use client';

import { motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

// The first page a visitor lands on paints straight away (good for loading
// speed); only later navigations inside the site animate in.
let landed = false;

/** Fades and lifts each new page in. Used by `src/app/template.tsx`. */
export function PageTransition({ children }: { children: ReactNode }) {
  const [animate] = useState(() => landed);
  useEffect(() => {
    landed = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
