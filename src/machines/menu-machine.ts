import { setup } from 'xstate';

/** Mobile navigation: closed <-> open. */
export const menuMachine = setup({
  types: {
    events: {} as { type: 'TOGGLE' } | { type: 'CLOSE' },
  },
}).createMachine({
  id: 'menu',
  initial: 'closed',
  states: {
    closed: { on: { TOGGLE: 'open' } },
    open: { on: { TOGGLE: 'closed', CLOSE: 'closed' } },
  },
});
