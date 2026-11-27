import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { MotionProvider } from '@/components/motion/motion-provider';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { env } from '@/lib/env';
import './globals.css';

// Body: Inter (style guide secondary font).
const inter = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
});

// Display: the style guide specifies "The Seasons" (commercial licence).
// Cormorant Garamond stands in until the licensed web font files are added:
// swap the two files below and nothing else needs to change.
const seasons = localFont({
  src: [
    {
      path: '../fonts/cormorant-garamond-latin-wght-normal.woff2',
      style: 'normal',
      weight: '300 700',
    },
    {
      path: '../fonts/cormorant-garamond-latin-wght-italic.woff2',
      style: 'italic',
      weight: '300 700',
    },
  ],
  variable: '--font-seasons',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: 'Halo Health · Lifestyle Medicine Center',
    template: '%s · Halo Health',
  },
  description:
    'Preventive health and longevity, guided by physicians. A physician-led assessment, one personal plan and a care team that stays with you.',
  openGraph: {
    title: 'Halo Health · Lifestyle Medicine Center',
    description:
      'Know where your health stands. Know what comes next. Preventive health and longevity, guided by physicians.',
    type: 'website',
    siteName: 'Halo Health',
  },
  // Soft launch: copy and photography are still draft, so search engines are
  // asked to stay out. Remove this line for the public launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0b0d0f',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${seasons.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-100 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
