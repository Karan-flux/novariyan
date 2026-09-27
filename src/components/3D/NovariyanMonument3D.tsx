import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import {
  WebGLSafeWrapper,
  useReducedMotion,
} from './WebGLSafeWrapper';

export type MonumentMode =
  | 'monolith'
  | 'wireframe'
  | 'kinetic'
  | 'exploded';

interface MonumentSceneProps {
  mode: MonumentMode;
  reducedMotion: boolean;
}

interface FloatingParticlesProps {
  reducedMotion: boolean;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  reducedMotion,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 90;
    const arr = new Float32Array(count * 3);

    // Deterministic pseudo-random values keep the particle field
    // visually stable across renders without relying on Math.random().
    let seed = 731;

    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i += 1) {
      const r = 2.6 + random() * 2.4;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      arr[i * 3] =
        r * Math.sin(phi) * Math.cos(theta);

      arr[i * 3 + 1] =
        r *
        Math.sin(phi) *
        Math.sin(theta) *
        0.85;

      arr[i * 3 + 2] =
        r * Math.cos(phi);
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    pointsRef.current.rotation.y =
      state.clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        color="#181818"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
};

const ArchitecturalNMonument: React.FC<
  MonumentSceneProps
> = ({
  mode,
  reducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftPillarRef = useRef<THREE.Mesh>(null);
  const rightPillarRef = useRef<THREE.Mesh>(null);
  const diagonalBeamRef = useRef<THREE.Mesh>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const satelliteARef = useRef<THREE.Mesh>(null);
  const satelliteBRef = useRef<THREE.Mesh>(null);

  const isWireframe = mode === 'wireframe';

  const monolithMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#141414',
        metalness: 0.78,
        roughness: 0.24,
        wireframe: isWireframe,
      }),
    [isWireframe],
  );

  const accentBeamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#232323',
        metalness: 0.85,
        roughness: 0.18,
        wireframe: isWireframe,
      }),
    [isWireframe],
  );

  const obsidianSphereMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#090909',
        metalness: 0.9,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        wireframe: isWireframe,
      }),
    [isWireframe],
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A2A2A',
        metalness: 0.6,
        roughness: 0.3,
      }),
    [],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;

    if (!group) {
      return;
    }

    const t = state.clock.getElapsedTime();

    const targetRotY =
      state.pointer.x * 0.35 +
      (mode === 'kinetic'
        ? t * 0.35
        : Math.sin(t * 0.25) * 0.12);

    const targetRotX =
      -state.pointer.y * 0.2 +
      Math.cos(t * 0.2) * 0.05;

    if (!reducedMotion) {
      const rotationLerp = Math.min(
        delta * 3.5,
        1,
      );

      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        targetRotY,
        rotationLerp,
      );

      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        targetRotX,
        rotationLerp,
      );

      group.position.y = Math.sin(t * 0.9) * 0.07;
    }

    const explodeOffset =
      mode === 'exploded' ? 0.42 : 0;

    const positionLerp = Math.min(
      delta * 5,
      1,
    );

    if (leftPillarRef.current) {
      leftPillarRef.current.position.x =
        THREE.MathUtils.lerp(
          leftPillarRef.current.position.x,
          -1.05 - explodeOffset,
          positionLerp,
        );
    }

    if (rightPillarRef.current) {
      rightPillarRef.current.position.x =
        THREE.MathUtils.lerp(
          rightPillarRef.current.position.x,
          1.05 + explodeOffset,
          positionLerp,
        );
    }

    if (diagonalBeamRef.current) {
      diagonalBeamRef.current.position.z =
        THREE.MathUtils.lerp(
          diagonalBeamRef.current.position.z,
          0.22 + explodeOffset * 0.7,
          positionLerp,
        );
    }

    if (
      coreSphereRef.current &&
      !reducedMotion
    ) {
      coreSphereRef.current.position.y =
        -0.18 +
        Math.sin(t * 1.4) * 0.09;
    }

    if (
      outerRingRef.current &&
      !reducedMotion
    ) {
      const speed =
        mode === 'kinetic' ? 0.65 : 0.18;

      outerRingRef.current.rotation.z =
        t * speed;

      outerRingRef.current.rotation.x =
        Math.PI / 2.5 +
        Math.sin(t * 0.4) * 0.1;
    }

    if (
      innerRingRef.current &&
      !reducedMotion
    ) {
      const speed =
        mode === 'kinetic' ? -0.8 : -0.22;

      innerRingRef.current.rotation.y =
        t * speed;
    }

    if (
      satelliteARef.current &&
      !reducedMotion
    ) {
      satelliteARef.current.position.x =
        Math.cos(t * 0.7) * 2.15;

      satelliteARef.current.position.z =
        Math.sin(t * 0.7) * 1.4;

      satelliteARef.current.position.y =
        0.6 +
        Math.sin(t * 1.1) * 0.25;
    }

    if (
      satelliteBRef.current &&
      !reducedMotion
    ) {
      satelliteBRef.current.position.x =
        Math.cos(t * 0.5 + Math.PI) * 1.95;

      satelliteBRef.current.position.z =
        Math.sin(t * 0.5 + Math.PI) * 1.6;

      satelliteBRef.current.position.y =
        -0.45 +
        Math.cos(t * 0.9) * 0.25;
    }
  });

  return (
    <group>
      {/* Main Interactive N Sculpture */}
      <group
        ref={groupRef}
        position={[0, 0.2, 0]}
      >
        {/* Left Vertical Monolith */}
        <mesh
          ref={leftPillarRef}
          position={[-1.05, 0, -0.12]}
          material={monolithMaterial}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.56, 2.95, 0.56]} />
        </mesh>

        {/* Right Vertical Monolith */}
        <mesh
          ref={rightPillarRef}
          position={[1.05, 0, 0.12]}
          material={monolithMaterial}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.56, 2.95, 0.56]} />
        </mesh>

        {/* Precision Top Architectural Cap on Right Pillar */}
        <mesh
          position={[1.05, 1.72, 0.12]}
          material={accentBeamMaterial}
        >
          <boxGeometry args={[0.56, 0.34, 0.56]} />
        </mesh>

        {/* Cantilevered Diagonal Traverse Beam forming the N */}
        <mesh
          ref={diagonalBeamRef}
          position={[0, 0.02, 0.22]}
          rotation={[0, 0, 0.64]}
          material={accentBeamMaterial}
          castShadow
        >
          <boxGeometry args={[0.54, 3.55, 0.48]} />
        </mesh>

        {/* Central Levitating Obsidian Core Sphere */}
        <mesh
          ref={coreSphereRef}
          position={[0, -0.18, -0.15]}
          material={obsidianSphereMaterial}
        >
          <sphereGeometry args={[0.66, 48, 48]} />
        </mesh>

        {/* Precision Orbital Ring 1 */}
        <mesh
          ref={outerRingRef}
          position={[0, 0, 0]}
          rotation={[
            Math.PI / 2.5,
            0.25,
            0,
          ]}
          material={ringMaterial}
        >
          <torusGeometry
            args={[2.05, 0.014, 16, 120]}
          />
        </mesh>

        {/* Precision Orbital Ring 2 */}
        <mesh
          ref={innerRingRef}
          position={[0, 0, 0]}
          rotation={[
            Math.PI / 3.2,
            -0.45,
            0.2,
          ]}
          material={ringMaterial}
        >
          <torusGeometry
            args={[1.55, 0.01, 16, 100]}
          />
        </mesh>

        {/* Orbiting Satellite Sphere A */}
        <mesh
          ref={satelliteARef}
          position={[-1.9, 0.8, 0.5]}
          material={obsidianSphereMaterial}
        >
          <sphereGeometry args={[0.14, 24, 24]} />
        </mesh>

        {/* Orbiting Polyhedral Node B */}
        <mesh
          ref={satelliteBRef}
          position={[1.8, -0.4, 0.7]}
          material={accentBeamMaterial}
        >
          <icosahedronGeometry
            args={[0.2, 0]}
          />
        </mesh>
      </group>

      {/* Architectural Stepped Plinth / Pedestal */}
      <group position={[0, -1.95, 0]}>
        <mesh
          position={[0, 0.16, 0]}
          material={monolithMaterial}
        >
          <cylinderGeometry
            args={[1.35, 1.55, 0.24, 8]}
          />
        </mesh>

        <mesh
          position={[0, -0.12, 0]}
          material={accentBeamMaterial}
        >
          <cylinderGeometry
            args={[1.65, 1.85, 0.32, 8]}
          />
        </mesh>
      </group>

      <FloatingParticles
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

interface NovariyanMonument3DProps {
  mode?: MonumentMode;
}

const MonumentFallback: React.FC = () => (
  <div
    className="relative w-full h-full min-h-[420px] flex items-center justify-center bg-[#EBEBE6] border border-[#0A0A0A]/10 overflow-hidden"
    role="img"
    aria-label="NOVARIYAN architectural N monolith"
  >
    <svg
      viewBox="0 0 400 400"
      className="w-72 h-72 text-[#0A0A0A]"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="200"
        cy="200"
        r="150"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="1"
      />

      <ellipse
        cx="200"
        cy="200"
        rx="165"
        ry="65"
        transform="rotate(-18 200 200)"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.2"
      />

      <rect
        x="105"
        y="85"
        width="44"
        height="210"
        fill="#141414"
      />

      <rect
        x="251"
        y="85"
        width="44"
        height="210"
        fill="#141414"
      />

      <circle
        cx="200"
        cy="205"
        r="46"
        fill="#0A0A0A"
      />

      <path
        d="M115 90 L155 90 L285 290 L245 290 Z"
        fill="#262626"
      />

      <polygon
        points="100,325 300,325 320,355 80,355"
        fill="#141414"
      />
    </svg>
  </div>
);

export const NovariyanMonument3D: React.FC<
  NovariyanMonument3DProps
> = ({
  mode = 'monolith',
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <WebGLSafeWrapper
      fallback={<MonumentFallback />}
      className="w-full h-full min-h-[420px] lg:min-h-[580px] relative select-none"
    >
      <Canvas
        camera={{
          position: [0, 0.3, 6.2],
          fov: 38,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={
          reducedMotion ? 'demand' : 'always'
        }
        aria-label="NOVARIYAN architectural N monolith"
      >
        {/* Calibrated Three-Point Studio Lighting */}
        <ambientLight intensity={1.1} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2.6}
          color="#FFFFFF"
        />

        <directionalLight
          position={[-6, 3, -4]}
          intensity={1.4}
          color="#D4D4D8"
        />

        <pointLight
          position={[0, -2, 4]}
          intensity={1.1}
          color="#FFFFFF"
        />

        <ArchitecturalNMonument
          mode={mode}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </WebGLSafeWrapper>
  );
};
