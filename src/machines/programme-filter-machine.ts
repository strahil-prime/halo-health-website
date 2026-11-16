import { assign, setup } from 'xstate';
import type { ProgrammeCategory } from '@/content/home';

export type ProgrammeFilter = 'all' | ProgrammeCategory;

/** Which programme category the visitor is browsing. */
export const programmeFilterMachine = setup({
  types: {
    context: {} as { filter: ProgrammeFilter },
    events: {} as { type: 'FILTER'; filter: ProgrammeFilter },
  },
}).createMachine({
  id: 'programmeFilter',
  context: { filter: 'all' },
  on: {
    FILTER: {
      guard: ({ context, event }) => context.filter !== event.filter,
      actions: assign({ filter: ({ event }) => event.filter }),
    },
  },
});
