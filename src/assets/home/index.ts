/**
 * Homepage photography. Static imports give next/image the intrinsic size
 * and a blur placeholder for free.
 *
 * These are stand-in images generated for the design. Replace the files with
 * the licensed shoot (same names) and nothing else needs to change.
 */
import app from './app.jpg';
import clinic from './clinic.jpg';
import closing from './closing.jpg';
import hero from './hero.jpg';
import journalNotes from './journal-notes.jpg';
import journalSleep from './journal-sleep.jpg';
import journalWalk from './journal-walk.jpg';
import move from './move.jpg';
import nourish from './nourish.jpg';
import programmes from './programmes.jpg';
import restore from './restore.jpg';
import sleep from './sleep.jpg';
import coach from './team-coach.jpg';
import navigator from './team-navigator.jpg';
import physician from './team-physician.jpg';
import specialist from './team-specialist.jpg';

export const photos = {
  app,
  clinic,
  closing,
  coach,
  hero,
  journalNotes,
  journalSleep,
  journalWalk,
  move,
  navigator,
  nourish,
  physician,
  programmes,
  restore,
  sleep,
  specialist,
} as const;

export type PhotoId = keyof typeof photos;
