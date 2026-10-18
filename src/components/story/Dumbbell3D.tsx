import { useEffect, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { DumbbellState } from './dumbbellState';

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = new RoomEnvironment();
    const tex = pmrem.fromScene(env, 0.04).texture;
    scene.environment = tex;
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
      env.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
    };
  }, [gl, scene]);
  return null;
}

function Dumbbell({ state }: { state: MutableRefObject<DumbbellState> }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);

  useFrame(({ clock }, dt) => {
    const s = state.current;
    if (group.current) {
      const t = clock.getElapsedTime();
      group.current.rotation.set(s.rotX + Math.sin(t * 0.9) * 0.05 * s.idle, s.rotY + Math.sin(t * 0.6) * 0.22 * s.idle, s.rotZ);
    }
    if (rings.current) {
      rings.current.visible = s.trail > 0.01;
      rings.current.rotation.y += dt * 0.9;
      rings.current.children.forEach((c) => {
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = s.trail * 0.55;
      });
    }
  });

  const metal = { color: '#2b2b30', metalness: 0.9, roughness: 0.32 } as const;
  const plate = { color: '#18181b', metalness: 0.75, roughness: 0.45 } as const;
  const side = [-1, 1];

  return (
    <group ref={group}>
      {/* barra e pega */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 3.3, 32]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.095, 0.095, 1.05, 48]} />
        <meshStandardMaterial color="#0f0f12" metalness={0.5} roughness={0.8} />
      </mesh>
      {side.map((s) => (
        <group key={s}>
          {/* discos hexagonais */}
          <mesh position={[s * 0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.56, 0.56, 0.24, 6]} />
            <meshStandardMaterial {...plate} />
          </mesh>
          <mesh position={[s * 0.96, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.44, 0.44, 0.2, 6]} />
            <meshStandardMaterial {...plate} />
          </mesh>
          {/* aro laranja da marca */}
          <mesh position={[s * 0.84, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.575, 0.575, 0.025, 6]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.55} metalness={0.4} roughness={0.35} />
          </mesh>
          {/* batente */}
          <mesh position={[s * 1.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        </group>
      ))}
      {/* rasto de movimento */}
      <group ref={rings} visible={false}>
        {[1.45, 1.7].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + i * 0.35, 0, 0]}>
            <torusGeometry args={[r, 0.012, 8, 160]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Dumbbell3D({ state }: { state: MutableRefObject<DumbbellState> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      resize={{ offsetSize: true }}
      camera={{ position: [0, 0, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Environment />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -1.5, 2.5]} intensity={14} color="#f97316" />
      <Dumbbell state={state} />
    </Canvas>
  );
}
