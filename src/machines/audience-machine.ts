import { assign, setup } from 'xstate';

/**
 * Example XState v5 machine: which audience the marketing page is speaking to.
 * Pattern to follow for any non-trivial UI flow (multi-step CTAs, quizzes,
 * pricing toggles): define it here with `setup()`, consume it with
 * `useMachine` from @xstate/react.
 */
export type Audience = 'members' | 'employers' | 'providers';

export const audienceStats: Record<Audience, { value: number; label: string }> =
  {
    members: {
      value: 1240,
      label: 'Placeholder: average yearly HSA savings ($)',
    },
    employers: {
      value: 38,
      label: 'Placeholder: lower benefits admin time (%)',
    },
    providers: {
      value: 72,
      label: 'Placeholder: faster claim turnaround (hrs)',
    },
  };

export const audienceMachine = setup({
  types: {
    context: {} as { audience: Audience },
    events: {} as { type: 'SELECT'; audience: Audience },
  },
}).createMachine({
  id: 'audience',
  context: { audience: 'members' },
  initial: 'browsing',
  states: {
    browsing: {
      on: {
        SELECT: {
          actions: assign({ audience: ({ event }) => event.audience }),
        },
      },
    },
  },
});
