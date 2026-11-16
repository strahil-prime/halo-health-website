import { assign, setup } from 'xstate';

/** The demo checklist in the app preview: which actions are ticked. */
export const dailyActionsMachine = setup({
  types: {
    context: {} as { done: boolean[] },
    input: {} as { done: boolean[] },
    events: {} as { type: 'TOGGLE'; index: number },
  },
}).createMachine({
  id: 'dailyActions',
  context: ({ input }) => ({ done: input.done }),
  initial: 'inProgress',
  states: {
    inProgress: {
      always: {
        guard: ({ context }) => context.done.every(Boolean),
        target: 'complete',
      },
    },
    complete: {
      always: {
        guard: ({ context }) => !context.done.every(Boolean),
        target: 'inProgress',
      },
    },
  },
  on: {
    TOGGLE: {
      actions: assign({
        done: ({ context, event }) =>
          context.done.map((value, i) => (i === event.index ? !value : value)),
      }),
    },
  },
});
