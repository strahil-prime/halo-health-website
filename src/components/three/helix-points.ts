/**
 * The CADIEUX helix: two strands of points winding around a vertical axis,
 * shared by the WebGL scene and its still SVG fallback so both look alike.
 */
export interface HelixPoint {
  x: number;
  y: number;
  z: number;
  strand: 0 | 1;
}

export const helix = {
  count: 44, // points per strand
  turns: 2.25,
  radius: 1.1,
  height: 6,
} as const;

export function helixPoints(): HelixPoint[] {
  const points: HelixPoint[] = [];
  for (let i = 0; i < helix.count; i++) {
    const t = i / (helix.count - 1);
    const angle = t * helix.turns * Math.PI * 2;
    const y = (t - 0.5) * helix.height;
    for (const strand of [0, 1] as const) {
      const a = angle + strand * Math.PI;
      points.push({
        x: Math.cos(a) * helix.radius,
        y,
        z: Math.sin(a) * helix.radius,
        strand,
      });
    }
  }
  return points;
}
