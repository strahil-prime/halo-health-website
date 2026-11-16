import { assign, setup } from 'xstate';

/**
 * A single-open accordion.
 * `collapsible: false` keeps one panel open at all times (programmes, where
 * the open item also drives the photo); `true` lets the open one close (FAQ).
 */
export const accordionMachine = setup({
  types: {
    context: {} as { openId: string | null; collapsible: boolean },
    input: {} as { openId: string | null; collapsible?: boolean },
    events: {} as { type: 'TOGGLE'; id: string } | { type: 'OPEN'; id: string },
  },
}).createMachine({
  id: 'accordion',
  context: ({ input }) => ({
    openId: input.openId,
    collapsible: input.collapsible ?? true,
  }),
  on: {
    OPEN: {
      guard: ({ context, event }) => context.openId !== event.id,
      actions: assign({ openId: ({ event }) => event.id }),
    },
    TOGGLE: [
      {
        guard: ({ context, event }) => context.openId !== event.id,
        actions: assign({ openId: ({ event }) => event.id }),
      },
      {
        guard: ({ context }) => context.collapsible,
        actions: assign({ openId: null }),
      },
    ],
  },
});
