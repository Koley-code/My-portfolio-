'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { siteConfig } from '../lib/siteConfig';

type BallPhysics = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  radius: number;
  phase: number;
};

const skillColors = [
  '#00a8ff',
  '#7c3aed',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
  '#6366f1',
];

function createGolfDimpleTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const spacing = 32;
  const radius = 8;

  for (let y = -spacing; y < size + spacing; y += spacing) {
    for (let x = -spacing; x < size + spacing; x += spacing) {
      const row = Math.round(y / spacing);
      const offset = row % 2 === 0 ? 0 : spacing / 2;

      const px = x + offset;
      const py = y;

      const gradient = ctx.createRadialGradient(
        px - 2,
        py - 2,
        1,
        px,
        py,
        radius
      );

      gradient.addColorStop(0, '#454545');
      gradient.addColorStop(0.42, '#888888');
      gradient.addColorStop(0.72, '#d5d5d5');
      gradient.addColorStop(1, '#ffffff');

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.8, 2.8);
  texture.anisotropy = 4;

  return texture;
}

function createShadowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    10,
    size / 2,
    size / 2,
    size / 2
  );

  gradient.addColorStop(
    0,
    'rgba(20, 25, 30, 0.45)'
  );

  gradient.addColorStop(
    0.45,
    'rgba(20, 25, 30, 0.22)'
  );

  gradient.addColorStop(
    1,
    'rgba(20, 25, 30, 0)'
  );

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);

  texture.needsUpdate = true;

  return texture;
}

function GolfBall({
  skill,
  physics,
  color,
}: {
  skill: (typeof siteConfig.skills)[number];
  physics: BallPhysics;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const shadowTexture = useMemo(
    () => createShadowTexture(),
    []
  );

  const dimpleTexture = useMemo(
    () => createGolfDimpleTexture(),
    []
  );

  const fillAngle = useMemo(() => {
    const level = THREE.MathUtils.clamp(skill.level, 0, 100);
    const normalized = level / 100;

    const cutoff = Math.acos(
      THREE.MathUtils.clamp(
        1 - normalized * 2,
        -1,
        1
      )
    );

    return Math.max(0.001, Math.PI - cutoff);
  }, [skill.level]);

  useFrame((_, delta) => {
    physics.velocity.multiplyScalar(0.997);

    if (!groupRef.current) return;

    groupRef.current.position.copy(physics.position);

    groupRef.current.rotation.y += delta * 0.35;

    groupRef.current.rotation.x =
      Math.sin(
        performance.now() * 0.001 +
        physics.phase
      ) * 0.08;

    groupRef.current.rotation.z =
      Math.cos(
        performance.now() * 0.0008 +
        physics.phase
      ) * 0.06;

    if (shadowRef.current) {
      const speed = physics.velocity.length();

      // Shadow moves slightly opposite to the ball's direction.
      shadowRef.current.position.x =
        -physics.velocity.x * 0.08;

      shadowRef.current.position.y =
        -physics.velocity.y * 0.08 - 0.08;

      // Faster movement creates a slightly longer shadow.
      const stretch = THREE.MathUtils.clamp(
        1 + speed * 0.18,
        1,
        1.45
      );

      shadowRef.current.scale.x = 1.35 * stretch;
      shadowRef.current.scale.y = 0.38 / stretch;
    }
  });

  const whiteMaterial = {
    color: '#f4f4f0',
    roughness: 0.76,
    metalness: 0,
    bumpMap: dimpleTexture ?? undefined,
    bumpScale: 0.075,
    clearcoat: 0.35,
    clearcoatRoughness: 0.5,
  };

  return (
    <group ref={groupRef}>
      {/* Ball shadow */}
      <mesh
        ref={shadowRef}
        position={[0, -0.08, -0.9]}
        rotation={[0, 0, 0]}
        renderOrder={-1}
      >
        <circleGeometry args={[0.9, 48]} />

        <meshBasicMaterial
          map={shadowTexture ?? undefined}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh castShadow receiveShadow>
        <sphereGeometry args={[physics.radius, 48, 32]} />
        <meshPhysicalMaterial {...whiteMaterial} />
      </mesh>

      {skill.level > 0 && (
        <mesh scale={[1.01, 1.01, 1.01]}>
          <sphereGeometry
            args={[
              physics.radius,
              48,
              32,
              0,
              Math.PI * 2,
              0,
              fillAngle,
            ]}
          />

          <meshPhysicalMaterial
            color={color}
            roughness={0.68}
            metalness={0.02}
            bumpMap={dimpleTexture ?? undefined}
            bumpScale={0.065}
            side={THREE.DoubleSide}
            emissive={color}
            emissiveIntensity={0.025}
          />
        </mesh>
      )}

      <Html
        center
        zIndexRange={[40, 0]}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: `${physics.radius * 90}px`,
          height: `${physics.radius * 90}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '10px',
            boxSizing: 'border-box',
            color: '#17212b',
            fontFamily: 'Inter, system-ui, sans-serif',
            textShadow: '0 1px 2px rgba(255,255,255,0.95)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: `${physics.radius * 21}px`,
              lineHeight: 1,
              marginBottom: '7px',
            }}
          >
            {skill.icon}
          </div>

          {/* Skill name */}
          <div
            style={{
              width: '100%',
              maxWidth: `${physics.radius * 72}px`,
              fontSize: `${Math.max(
                12,
                physics.radius * 10
              )}px`,
              fontWeight: 800,
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {skill.name}
          </div>

          {/* Percentage */}
          <div
            style={{
              marginTop: '5px',
              fontSize: `${Math.max(
                10,
                physics.radius * 7.5
              )}px`,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontWeight: 800,
              opacity: 0.72,
            }}
          >
            {skill.level}%
          </div>
        </div>
      </Html>
    </group>
  );
}

function SkillsScene({
  visible,
  pointer,
}: {
  visible: boolean;
  pointer: React.MutableRefObject<THREE.Vector2>;
}) {
  const { camera, viewport } = useThree();

  const raycaster = useMemo(
    () => new THREE.Raycaster(),
    []
  );

  const plane = useMemo(
    () =>
      new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        0
      ),
    []
  );

  const pointerWorld = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const balls = useRef<BallPhysics[]>(
    siteConfig.skills.map(() => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloat(-3.8, 3.8),
        THREE.MathUtils.randFloat(-2.5, 2.5),
        0
      ),
      velocity: new THREE.Vector3(
        THREE.MathUtils.randFloat(-3.5, 3.5),
        THREE.MathUtils.randFloat(-3.5, 3.5),
        0
      ),
      radius: 1.4,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  useFrame((state, delta) => {
    if (!visible) return;

    raycaster.setFromCamera(pointer.current, camera);

    raycaster.ray.intersectPlane(plane, pointerWorld);

    const width = viewport.width;
    const height = viewport.height;

    // Ball-to-ball repulsion.
    for (let i = 0; i < balls.current.length; i++) {
      for (let j = i + 1; j < balls.current.length; j++) {
        const ballA = balls.current[i];
        const ballB = balls.current[j];

        const dx = ballB.position.x - ballA.position.x;
        const dy = ballB.position.y - ballA.position.y;

        const distance = Math.hypot(dx, dy);
        const minimumDistance = ballA.radius + ballB.radius;

        if (
          distance > 0 &&
          distance < minimumDistance
        ) {
          const nx = dx / distance;
          const ny = dy / distance;

          const overlap = minimumDistance - distance;
          const separation = overlap * 0.5;

          ballA.position.x -= nx * separation;
          ballA.position.y -= ny * separation;

          ballB.position.x += nx * separation;
          ballB.position.y += ny * separation;

          const velocityA =
            ballA.velocity.x * nx +
            ballA.velocity.y * ny;

          const velocityB =
            ballB.velocity.x * nx +
            ballB.velocity.y * ny;

          const impulse = velocityA - velocityB;

          ballA.velocity.x -= impulse * nx * 0.75;
          ballA.velocity.y -= impulse * ny * 0.75;

          ballB.velocity.x += impulse * nx * 0.75;
          ballB.velocity.y += impulse * ny * 0.75;
        }
      }
    }

    balls.current.forEach((ball) => {
      const dx = ball.position.x - pointerWorld.x;
      const dy = ball.position.y - pointerWorld.y;

      const distance = Math.hypot(dx, dy);
      const repelRadius = 3.0;

      if (
        distance > 0.001 &&
        distance < repelRadius
      ) {
        const force =
          ((repelRadius - distance) / repelRadius) * 7.0;

        ball.velocity.x +=
          (dx / distance) * force * delta;

        ball.velocity.y +=
          (dy / distance) * force * delta;
      }

      ball.velocity.x +=
        Math.sin(
          state.clock.elapsedTime * 0.7 +
          ball.phase
        ) * 0.08 * delta;

      ball.velocity.y +=
        Math.cos(
          state.clock.elapsedTime * 0.6 +
          ball.phase
        ) * 0.08 * delta;

      const maxSpeed = 4;
      const speed = ball.velocity.length();

      if (speed > maxSpeed) {
        ball.velocity.normalize().multiplyScalar(maxSpeed);
      }

      ball.position.x += ball.velocity.x * delta;
      ball.position.y += ball.velocity.y * delta;

      const halfWidth = width / 2 - ball.radius;
      const halfHeight = height / 2 - ball.radius;

      if (ball.position.x >= halfWidth) {
        ball.position.x = halfWidth;
        ball.velocity.x *= -0.92;
      }

      if (ball.position.x <= -halfWidth) {
        ball.position.x = -halfWidth;
        ball.velocity.x *= -0.92;
      }

      if (ball.position.y >= halfHeight) {
        ball.position.y = halfHeight;
        ball.velocity.y *= -0.92;
      }

      if (ball.position.y <= -halfHeight) {
        ball.position.y = -halfHeight;
        ball.velocity.y *= -0.92;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={1.7} />

      <directionalLight
        position={[5, 7, 8]}
        intensity={3}
      />

      <directionalLight
        position={[-5, -2, 4]}
        intensity={1.15}
      />

      <pointLight
        position={[0, 2, 5]}
        intensity={1.3}
        distance={15}
      />

      {siteConfig.skills.map((skill, index) => (
        <GolfBall
          key={skill.name}
          skill={skill}
          physics={balls.current[index]}
          color={skillColors[index % skillColors.length]}
        />
      ))}
    </>
  );
}

function PointerTracker({
  pointer,
}: {
  pointer: React.MutableRefObject<THREE.Vector2>;
}) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    let clearTimer: number | null = null;

    const clearPointer = () => {
      pointer.current.set(999, 999);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointer.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

      pointer.current.y =
        -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const move = (event: PointerEvent) => {
      updatePointer(event);

      if (clearTimer !== null) {
        window.clearTimeout(clearTimer);
        clearTimer = null;
      }
    };

    const down = (event: PointerEvent) => {
      updatePointer(event);

      if (event.pointerType === 'touch') {
        if (clearTimer !== null) {
          window.clearTimeout(clearTimer);
        }

        clearTimer = window.setTimeout(() => {
          clearPointer();
          clearTimer = null;
        }, 550);
      }
    };

    const up = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        if (clearTimer !== null) {
          window.clearTimeout(clearTimer);
        }

        clearTimer = window.setTimeout(() => {
          clearPointer();
          clearTimer = null;
        }, 350);
      }
    };

    const leave = (event: PointerEvent) => {
      // Keep touch interactions active briefly after the pointer leaves.
      if (event.pointerType !== 'touch') {
        clearPointer();
      }
    };

    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerdown', down, { passive: true });
    canvas.addEventListener('pointerup', up, { passive: true });
    canvas.addEventListener('pointercancel', up, { passive: true });
    canvas.addEventListener('pointerleave', leave, { passive: true });

    return () => {
      if (clearTimer !== null) {
        window.clearTimeout(clearTimer);
      }

      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [gl, pointer]);

  return null;
}

export default function SkillsCanvas({
  isMobile,
  visible,
}: {
  isMobile: boolean;
  visible: boolean;
}) {
  const pointer = useRef(new THREE.Vector2(999, 999));

  return (
    <Canvas
      orthographic
      style={{
        touchAction: 'manipulation',
      }}
      camera={{
        position: [0, 0, 12],
        zoom: isMobile ? 32 : 62,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <PointerTracker pointer={pointer} />
      <SkillsScene visible={visible} pointer={pointer} />
    </Canvas>
  );
}