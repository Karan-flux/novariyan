
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import {
  WebGLSafeWrapper,
  useReducedMotion,
} from './WebGLSafeWrapper';

interface OrbitalInnerProps {
  theme: 'light' | 'dark';
  variant: 'orbital' | 'monolith';
  reducedMotion: boolean;
}

const OrbitalInnerScene: React.FC<OrbitalInnerProps> = ({
  theme,
  variant,
  reducedMotion,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const coreMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: theme === 'dark' ? '#181818' : '#111111',
        metalness: 0.9,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [theme],
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? '#737373' : '#262626',
        metalness: 0.75,
        roughness: 0.25,
      }),
    [theme],
  );

  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();

    root.rotation.y = THREE.MathUtils.lerp(
      root.rotation.y,
      state.pointer.x * 0.4 + elapsed * 0.18,
      Math.min(delta * 3, 1),
    );

    root.rotation.x = THREE.MathUtils.lerp(
      root.rotation.x,
      -state.pointer.y * 0.25 +
        Math.sin(elapsed * 0.3) * 0.1,
      Math.min(delta * 3, 1),
    );

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = elapsed * 0.32;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = elapsed * -0.25;
    }

    if (coreRef.current) {
      coreRef.current.position.y =
        Math.sin(elapsed * 1.2) * 0.08;
    }
  });

  return (
    <group ref={rootRef}>
      {variant === 'orbital' ? (
        <mesh ref={coreRef} material={coreMaterial}>
          <sphereGeometry args={[0.95, 48, 48]} />
        </mesh>
      ) : (
        <mesh
          ref={coreRef}
          rotation={[0.4, 0.6, 0.2]}
          material={coreMaterial}
        >
          <octahedronGeometry args={[1.05, 0]} />
        </mesh>
      )}

      <mesh
        ref={ring1Ref}
        rotation={[Math.PI / 2.2, 0.3, 0]}
        material={ringMaterial}
      >
        <torusGeometry args={[1.65, 0.018, 16, 100]} />
      </mesh>

      <mesh
        ref={ring2Ref}
        rotation={[0.5, Math.PI / 3, -0.4]}
        material={ringMaterial}
      >
        <torusGeometry args={[2.05, 0.012, 16, 100]} />
      </mesh>

      <mesh
        position={[1.45, 0.55, 0.4]}
        material={coreMaterial}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
      </mesh>

      <mesh
        position={[-1.55, -0.45, -0.3]}
        material={coreMaterial}
      >
        <sphereGeometry args={[0.12, 24, 24]} />
      </mesh>
    </group>
  );
};

interface OrbitalSculpture3DProps {
  theme?: 'light' | 'dark';
  variant?: 'orbital' | 'monolith';
  className?: string;
}

export const OrbitalSculpture3D: React.FC<
  OrbitalSculpture3DProps
> = ({
  theme = 'dark',
  variant = 'orbital',
  className = 'w-full h-64 md:h-80',
}) => {
  const reducedMotion = useReducedMotion();

  const fallback = (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 240"
        className="w-48 h-48"
        fill="none"
      >
        <circle
          cx="120"
          cy="120"
          r="52"
          fill={
            theme === 'dark' ? '#1F1F1F' : '#141414'
          }
        />

        <ellipse
          cx="120"
          cy="120"
          rx="96"
          ry="34"
          transform="rotate(-22 120 120)"
          stroke={
            theme === 'dark' ? '#525252' : '#262626'
          }
          strokeWidth="1.5"
        />

        <ellipse
          cx="120"
          cy="120"
          rx="84"
          ry="28"
          transform="rotate(35 120 120)"
          stroke={
            theme === 'dark' ? '#404040' : '#525252'
          }
          strokeWidth="1"
        />
      </svg>
    </div>
  );

  return (
    <WebGLSafeWrapper
      fallback={fallback}
      className={className}
    >
      <Canvas
        camera={{
          position: [0, 0, 5.2],
          fov: 40,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        aria-label="Abstract 3D orbital sculpture"
      >
        <ambientLight
          intensity={theme === 'dark' ? 1.4 : 1.1}
        />

        <directionalLight
          position={[4, 6, 4]}
          intensity={2.8}
          color="#FFFFFF"
        />

        <directionalLight
          position={[-5, -3, -2]}
          intensity={1.2}
          color="#A1A1AA"
        />

        <OrbitalInnerScene
          theme={theme}
          variant={variant}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </WebGLSafeWrapper>
  );
};
