'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    title: 'Placeholder feature one',
    body: 'Short benefit statement. Replace with approved copy.',
  },
  {
    title: 'Placeholder feature two',
    body: 'Short benefit statement. Replace with approved copy.',
  },
  {
    title: 'Placeholder feature three',
    body: 'Short benefit statement. Replace with approved copy.',
  },
];

/** Demonstrates GSAP + ScrollTrigger via the useGSAP hook (auto-cleanup). */
export function FeatureGrid() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-feature]', {
          y: 32,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: scope.current, start: 'top 80%' },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="grid gap-4 md:grid-cols-3">
      {features.map((f) => (
        <Card key={f.title} data-feature>
          <CardTitle>{f.title}</CardTitle>
          <CardDescription>{f.body}</CardDescription>
        </Card>
      ))}
    </div>
  );
}
