'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PolygonWall2D from './PolygonWall2D';

<Environment preset="city" />

function FloatingIcosahedron({
  position,
  color,
  speed,
  scale,
  isMobile,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.003 * speed;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        {isMobile ? (
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.38}
            roughness={0.18}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.35}
          />
        ) : (
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.38}
            roughness={0.18}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.35}
            distort={0.2}
            speed={2}
          />
        )}
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, speed, scale }: { position: [number, number, number]; color: string; speed: number; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.15;
      meshRef.current.rotation.y += 0.004;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 16, 100]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.32}
          roughness={0.15}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.28}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, speed, scale }: { position: [number, number, number]; color: string; speed: number; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.24}
          roughness={0.15}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
}

function InfiniteSpring({
  position,
  color,
  scale = 1,
  rotation = [Math.PI / 6, 0, Math.PI / 4],
  isMobile,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  rotation?: [number, number, number];
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    const turns = 5.5;
    const pointsPerTurn = 36;
    const totalPoints = Math.floor(
      turns * pointsPerTurn
    );

    const radius = 0.48;
    const height = 3.4;

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * turns * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * height,
          Math.sin(angle) * radius
        )
      );
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      'centripetal',
      0.5
    );

    return new THREE.TubeGeometry(
      curve,
      220,
      0.13,
      16,
      false
    );
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.0018;

    meshRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
  });

  return (
    <Float
      speed={1.9}
      rotationIntensity={0.15}
      floatIntensity={0.25}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={[9.2, 1.2, -4.5]}
        rotation={rotation}
        scale={1.1}
      >
        {isMobile ? (
          <meshStandardMaterial
            color="#24f0a9"
            transparent
            opacity={0.72}
            roughness={0.22}
            metalness={0.2}
            emissive={color}
            emissiveIntensity={0.09}
          />
        ) : (
          <meshPhysicalMaterial
            color="#24f0a9"
            transparent
            opacity={0.72}
            roughness={0.08}
            metalness={0.2}
            transmission={0.45}
            thickness={0.8}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={0.12}
            iridescenceIOR={1.3}
            emissive={color}
            emissiveIntensity={0.09}
          />
        )}
      </mesh>
    </Float>
  );
}

function createInfiniteStripGeometry() {
  const geometry = new THREE.BufferGeometry();

  const segments = 140;
  const widthSegments = 20;

  const radius = 1.65;
  const stripWidth = 0.9;
  const thickness = 0.07;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  /*
    Wide continuous twisted ribbon.
    The half-twist is what creates the characteristic
    continuous loop shape from your reference.
  */
  const getSurfacePoint = (
    theta: number,
    across: number,
    depth: number
  ) => {
    const halfTwist = theta * 0.5;

    const radialOffset =
      across * stripWidth;

    const radial =
      radius + radialOffset * Math.cos(halfTwist);

    const x =
      radial * Math.cos(theta);

    const y =
      radial * Math.sin(theta);

    const z =
      radialOffset * Math.sin(halfTwist);

    /*
      Approximate surface normal.
    */
    const tangent = new THREE.Vector3(
      -Math.sin(theta),
      Math.cos(theta),
      0
    );

    const widthDirection = new THREE.Vector3(
      Math.cos(halfTwist) * Math.cos(theta),
      Math.cos(halfTwist) * Math.sin(theta),
      Math.sin(halfTwist)
    );

    const normal = new THREE.Vector3()
      .crossVectors(tangent, widthDirection)
      .normalize();

    return {
      point: new THREE.Vector3(
        x + normal.x * depth,
        y + normal.y * depth,
        z + normal.z * depth
      ),
      normal,
    };
  };

  const layerSize =
    (segments + 1) *
    (widthSegments + 1);

  /*
    Front + back
  */
  for (let layer = 0; layer < 2; layer++) {
    const depth =
      layer === 0
        ? thickness
        : -thickness;

    for (let i = 0; i <= segments; i++) {
      const theta =
        (i / segments) *
        Math.PI *
        2;

      for (let j = 0; j <= widthSegments; j++) {
        const across =
          j / widthSegments - 0.5;

        const { point, normal } =
          getSurfacePoint(
            theta,
            across,
            depth
          );

        positions.push(
          point.x,
          point.y,
          point.z
        );

        if (layer === 0) {
          normals.push(
            normal.x,
            normal.y,
            normal.z
          );
        } else {
          normals.push(
            -normal.x,
            -normal.y,
            -normal.z
          );
        }

        uvs.push(
          i / segments,
          j / widthSegments
        );
      }
    }
  }

  /*
    Front and back faces
  */
  for (let layer = 0; layer < 2; layer++) {
    const offset =
      layer * layerSize;

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a =
          offset +
          i * (widthSegments + 1) +
          j;

        const b = a + 1;

        const c =
          offset +
          (i + 1) *
          (widthSegments + 1) +
          j;

        const d = c + 1;

        if (layer === 0) {
          indices.push(a, c, b);
          indices.push(b, c, d);
        } else {
          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }
    }
  }

  /*
    Outer ribbon edges
  */
  for (let i = 0; i < segments; i++) {
    for (const j of [
      0,
      widthSegments,
    ]) {
      const a =
        i * (widthSegments + 1) +
        j;

      const b =
        (i + 1) *
        (widthSegments + 1) +
        j;

      const c =
        layerSize +
        i * (widthSegments + 1) +
        j;

      const d =
        layerSize +
        (i + 1) *
        (widthSegments + 1) +
        j;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      positions,
      3
    )
  );

  geometry.setAttribute(
    'normal',
    new THREE.Float32BufferAttribute(
      normals,
      3
    )
  );

  geometry.setAttribute(
    'uv',
    new THREE.Float32BufferAttribute(
      uvs,
      2
    )
  );

  geometry.setIndex(indices);

  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return geometry;
}

function InfiniteStrip({
  position,
  scale = 1,
  rotation = [0, 0, 0],
  isMobile,
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(
    () => createInfiniteStripGeometry(),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.22) * 0.15;

    meshRef.current.rotation.y += 0.0018;

    meshRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.12}
      floatIntensity={0.25}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        scale={scale}
        rotation={rotation}
      >
        {isMobile ? (
          <meshStandardMaterial
            color="#3380ed"
            transparent
            opacity={0.52}
            roughness={0.22}
            metalness={0.2}
            emissive="#58dfff"
            emissiveIntensity={0.08}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshPhysicalMaterial
            color="#3380ed"
            transparent
            opacity={0.52}
            roughness={0.08}
            metalness={0.2}
            transmission={0.45}
            thickness={0.8}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={0.12}
            iridescenceIOR={1.3}
            emissive="#58dfff"
            emissiveIntensity={0.08}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 80;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5,
        ] as [number, number, number],
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      const { position, speed, offset } = particle;
      dummy.position.set(
        position[0] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.5,
        position[1] + Math.cos(state.clock.elapsedTime * speed + offset) * 0.3,
        position[2]
      );
      dummy.scale.setScalar(0.02 + Math.sin(state.clock.elapsedTime + offset) * 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
    </instancedMesh>
  );
}



function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#dff7ff"
      />

      <directionalLight
        position={[-10, -5, -5]}
        intensity={0.7}
        color="#f3e8ff"
      />

      <pointLight
        position={[0, 5, 0]}
        intensity={0.6}
        color="#d9fff2"
      />

      <FloatingIcosahedron
        position={[-4, 1, -3]}
        color="#0ea5e9"
        speed={0.5}
        scale={1.2}
        isMobile={isMobile}
      />

      <FloatingIcosahedron
        position={[5, -2, -4]}
        color="#6366f1"
        speed={0.7}
        scale={0.8}
        isMobile={isMobile}
      />
      <FloatingTorus position={[3, 2, -5]} color="#8b5cf6" speed={0.4} scale={0.9} />
      <FloatingTorus position={[-2, -3, -3]} color="#06b6d4" speed={0.6} scale={0.6} />
      <FloatingSphere position={[0, 3, -6]} color="#e0f2fe" speed={0.3} scale={1.5} />
      <FloatingSphere position={[-5, 0, -4]} color="#fae8ff" speed={0.5} scale={1} />
      <FloatingSphere position={[4, 3, -5]} color="#ecfdf5" speed={0.4} scale={0.7} />
      <InfiniteStrip
        position={[-8.4, -3.2, -5]}
        rotation={[Math.PI / 2, 0.3, 1.0]}
        scale={0.9}
        isMobile={isMobile}
      />
      <InfiniteSpring
        position={[4.2, -1.2, -4.5]}
        color="#a78bfa"
        scale={0.9}
        isMobile={isMobile}
      />

      {!isMobile && (
        <>
          <Sparkles
            count={15}
            scale={[18, 12, 10]}
            size={10}
            speed={0.3}
            opacity={0.9}
            color="#00e5ff"
          />

          <Sparkles
            count={10}
            scale={[16, 11, 9]}
            size={8.5}
            speed={0.22}
            opacity={0.85}
            color="#a855f7"
          />

          <Sparkles
            count={5}
            scale={[14, 10, 8]}
            size={7}
            speed={0.18}
            opacity={0.85}
            color="#ff4ecd"
          />
        </>
      )}
      <ParticleField />

      {!isMobile && <Environment preset="city" />}
    </>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 700px)');

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  return {
    isMobile: isMobile ?? false,
    isReady: isMobile !== null,
  };
}

export default function LightScene() {
  const { isMobile, isReady } = useIsMobile();

  return (
    <div className="fixed inset-0 w-screen h-[100lvh] z-0 isolate pointer-events-none">
      <PolygonWall2D />
      {isReady && (
        <Canvas
          className="absolute inset-0 z-10"
          camera={{
            position: [0, 0, isMobile ? 11 : 8],
            fov: isMobile ? 52 : 50,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
          }}
          dpr={isMobile ? 1 : [1, 1.5]}
          resize={{ scroll: false }}
        >
          <group scale={isMobile ? 0.62 : 1}>
            <Scene isMobile={isMobile} />
          </group>
        </Canvas>
      )}
    </div>
  );
}
