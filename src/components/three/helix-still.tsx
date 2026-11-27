import { helix, helixPoints } from './helix-points';

/**
 * Still version of the helix, drawn as SVG on the server. It is what visitors
 * see first, and all they see with reduced motion, on low-power devices or
 * without WebGL.
 */
export function HelixStill({ className }: { className?: string }) {
  const points = helixPoints();
  const scale = 46;
  const tilt = 0.35;
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  return (
    <svg
      viewBox="-200 -200 400 400"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {points
        .map((p) => ({
          // Same tilt as the 3D scene, simple perspective by depth.
          x: (p.x * cos - p.y * sin) * scale,
          y: -(p.x * sin + p.y * cos) * scale,
          depth: (p.z + helix.radius) / (helix.radius * 2),
          strand: p.strand,
        }))
        .sort((a, b) => a.depth - b.depth)
        .map((p, i) => (
          <circle
            key={i}
            cx={p.x.toFixed(1)}
            cy={p.y.toFixed(1)}
            r={(2.6 + p.depth * 2.4).toFixed(2)}
            className={p.strand === 0 ? 'fill-cream' : 'fill-mist'}
            opacity={(0.35 + p.depth * 0.65).toFixed(2)}
          />
        ))}
    </svg>
  );
}
