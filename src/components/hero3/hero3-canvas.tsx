"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  MathUtils,
  Mesh,
  Vector3
} from "three";
import styles from "./hero3.module.css";

type FieldBlock = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  tone: "paper" | "ink" | "signal";
};

const fieldBlocks: FieldBlock[] = [
  { position: [-1.9, 1.2, -0.7], rotation: [0.08, -0.34, 0.08], scale: [2.5, 0.12, 1.25], tone: "paper" },
  { position: [1.2, 1.05, -1.1], rotation: [-0.04, 0.42, -0.05], scale: [2.2, 0.12, 1.1], tone: "ink" },
  { position: [-1.3, 0.08, 0.15], rotation: [0.03, 0.24, -0.04], scale: [2.7, 0.16, 1.35], tone: "paper" },
  { position: [1.72, -0.18, -0.35], rotation: [-0.08, -0.3, 0.06], scale: [2.25, 0.15, 1.2], tone: "paper" },
  { position: [-0.1, -1.22, -0.6], rotation: [0.06, -0.12, 0], scale: [3.1, 0.13, 1.18], tone: "ink" },
  { position: [0.15, 0.4, 1.05], rotation: [0, -0.1, 0.14], scale: [1.4, 0.18, 0.22], tone: "signal" },
  { position: [-2.5, -0.75, 0.72], rotation: [0.1, 0.28, -0.08], scale: [1.2, 0.14, 0.68], tone: "paper" },
  { position: [2.45, 0.62, 0.38], rotation: [-0.08, -0.3, 0.1], scale: [1.15, 0.13, 0.62], tone: "signal" }
];

const signalNodes: [number, number, number][] = [
  [-2.7, 1.46, 0.4],
  [-1.45, 0.3, 1.32],
  [0.52, 1.28, 0.7],
  [2.62, 0.06, 0.65],
  [1.32, -1.22, 0.2],
  [-2.08, -1.14, 0.48]
];

function toneColor(tone: FieldBlock["tone"]) {
  if (tone === "signal") {
    return "#d20a1e";
  }

  return tone === "ink" ? "#222522" : "#d8d8cf";
}

function FlowLine({ points, color, radius }: { points: [number, number, number][]; color: string; radius: number }) {
  const curve = useMemo(
    () => new CatmullRomCurve3(points.map((point) => new Vector3(...point))),
    [points]
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 72, radius, 6, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.72} toneMapped={false} />
    </mesh>
  );
}

function StructuralLines() {
  const geometry = useMemo(() => {
    const segments = [
      [-3.6, 1.72, -1.3, 3.5, 1.18, -1.2],
      [-3.5, 0.78, -0.2, 3.7, 0.34, -0.1],
      [-3.2, -0.42, 0.4, 3.45, -0.78, 0.2],
      [-2.7, -1.7, -0.6, 2.85, -1.4, -0.72]
    ];
    const positions = segments.flatMap((segment) => segment);
    const result = new BufferGeometry();
    result.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return result;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={new Color("#2f332f")} transparent opacity={0.24} />
    </lineSegments>
  );
}

function ProceduralField() {
  const rootRef = useRef<Group>(null);
  const signalRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!rootRef.current) {
      return;
    }

    const targetX = state.pointer.y * 0.08;
    const targetY = state.pointer.x * 0.12;
    rootRef.current.rotation.x = MathUtils.damp(rootRef.current.rotation.x, targetX, 4.5, delta);
    rootRef.current.rotation.y = MathUtils.damp(rootRef.current.rotation.y, targetY, 4.5, delta);
    rootRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.035;

    if (signalRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
      signalRef.current.scale.set(pulse, pulse, pulse);
      signalRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={rootRef} rotation={[-0.1, -0.04, 0]}>
      <StructuralLines />
      <FlowLine
        color="#d20a1e"
        radius={0.016}
        points={[
          [-3.2, 0.92, 0.9],
          [-1.65, 0.58, 1.14],
          [-0.15, 0.72, 1.35],
          [1.28, 0.22, 1.02],
          [3.25, 0.48, 0.78]
        ]}
      />
      <FlowLine
        color="#424742"
        radius={0.011}
        points={[
          [-3.45, -0.62, 0.5],
          [-1.72, -0.32, 0.82],
          [-0.22, -0.58, 1.18],
          [1.46, -0.24, 0.94],
          [3.5, -0.58, 0.5]
        ]}
      />

      {fieldBlocks.map((block, index) => (
        <mesh key={index} position={block.position} rotation={block.rotation} scale={block.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={toneColor(block.tone)}
            roughness={0.78}
            metalness={block.tone === "signal" ? 0.1 : 0.02}
            transparent
            opacity={block.tone === "paper" ? 0.9 : 0.96}
          />
        </mesh>
      ))}

      {signalNodes.map((position, index) => (
        <mesh ref={index === 2 ? signalRef : undefined} key={index} position={position} rotation={[0.3, 0.45, 0.55]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#d20a1e" roughness={0.54} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export function Hero3Canvas({ onFailure }: { onFailure: () => void }) {
  return (
    <Canvas
      className={styles.heroCanvas}
      data-testid="hero3-webgl"
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.12, 7.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onError={onFailure}
    >
      <ambientLight intensity={1.85} />
      <directionalLight position={[3.8, 4.6, 5.4]} intensity={2.1} color="#f2f1ea" />
      <directionalLight position={[-4.2, -2.4, 3.2]} intensity={0.9} color="#9da19b" />
      <pointLight position={[0.4, 0.5, 3.4]} intensity={1.2} color="#d20a1e" distance={7} />
      <ProceduralField />
    </Canvas>
  );
}
