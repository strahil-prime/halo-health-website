'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once for the whole site. Import gsap, ScrollTrigger
// and useGSAP from here, never straight from the packages, so every
// component shares the same registered instance.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Only run motion when the visitor has not asked to reduce it. */
export const motionOK = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
