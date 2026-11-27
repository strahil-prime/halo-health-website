'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Color, Object3D, type Group, type InstancedMesh } from 'three';
import { helixPoints } from './helix-points';
import type { SceneProps } from './lazy-scene';

// CADIEUX neutrals (cadieux.css): neutral-100 and slate-300.
const strandColours = [new Color('#eef0f1'), new Color('#a3aeb6')] as const;

function Helix() {
  const group = useRef<Group>(null);
  const mesh = useRef<InstancedMesh>(null);
  const points = useMemo(() => helixPoints(), []);

  useLayoutEffect(() => {
    const dummy = new Object3D();
    points.forEach((point, i) => {
      dummy.position.set(point.x, point.y, point.z);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
      mesh.current?.setColorAt(i, strandColours[point.strand]);
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor)
        mesh.current.instanceColor.needsUpdate = true;
    }
  }, [points]);

  // Slow turn, plus a gentle tilt toward the pointer.
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x +=
      (state.pointer.y * 0.25 - group.current.rotation.x) * 0.05;
    group.current.rotation.z +=
      (-state.pointer.x * 0.15 - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group} rotation={[0, 0, 0.35]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial roughness={0.35} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}

/** The WebGL helix. Loaded on demand by `LazyScene`; never import directly. */
export default function HelixScene({ running, onReady }: SceneProps) {
  return (
    <Canvas
      // Pauses rendering (and battery use) while the section is off screen.
      frameloop={running ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} />
      <Helix />
    </Canvas>
  );
}
