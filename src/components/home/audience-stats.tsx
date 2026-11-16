'use client';

import NumberFlow from '@number-flow/react';
import { useMachine } from '@xstate/react';
import { Button } from '@/components/ui/button';
import {
  audienceMachine,
  audienceStats,
  type Audience,
} from '@/machines/audience-machine';

const audiences: Audience[] = ['members', 'employers', 'providers'];

/** Demonstrates XState (state) + NumberFlow (animated number). */
export function AudienceStats() {
  const [snapshot, send] = useMachine(audienceMachine);
  const { audience } = snapshot.context;
  const stat = audienceStats[audience];

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div
        role="group"
        aria-label="Choose an audience"
        className="inline-flex gap-1 rounded-xl bg-muted p-1"
      >
        {audiences.map((a) => (
          <Button
            key={a}
            size="sm"
            variant={a === audience ? 'default' : 'ghost'}
            aria-pressed={a === audience}
            onClick={() => send({ type: 'SELECT', audience: a })}
            className="capitalize"
          >
            {a}
          </Button>
        ))}
      </div>
      <NumberFlow
        value={stat.value}
        className="font-display text-6xl font-semibold text-primary tabular-nums"
      />
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
