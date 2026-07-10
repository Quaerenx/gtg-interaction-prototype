"use client";

import { Component, ReactNode, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  MeshStandardMaterial,
  Vector3
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

type Triple = [number, number, number];

type HeroCanvasProps = {
  onFailure: () => void;
};

type BoundaryProps = {
  children: ReactNode;
  onFailure: () => void;
};

type FlowRibbon = {
  id: string;
  color: string;
  opacity: number;
  radius: number;
  points: Triple[];
};

type ActivationNode = {
  id: string;
  position: Triple;
  rotation: Triple;
  scale: Triple;
};

const SYMBOL_SOURCE_CENTER: Triple = [2014.97, 1424.725, 0];
const SYMBOL_GEOMETRY_SCALE = 0.00098;
const SYMBOL_EXTRUDE_DEPTH = 250;
const GTG_SYMBOL_PATHS = [
  "M2322.72,2405.45l863.5-349.65c10.04-4.07,16.75-14.85,16.75-26.95v-826.72c0-19.75-17.23-33.56-33.66-26.97l-373.87,149.99c-10.08,4.04-16.82,14.85-16.82,26.97v257.57c0,19.75,17.23,33.56,33.66,26.97l76.32-30.61c16.42-6.59,33.66,7.22,33.66,26.97v191.22c0,12.09-6.7,22.88-16.75,26.95l-302.06,122.31c-16.44,6.66-33.73-7.16-33.73-26.95v-759.13c0-12.09,6.7-22.88,16.75-26.95l599.76-242.85c10.04-4.07,16.75-14.85,16.75-26.95v-257.51c0-19.79-17.29-33.6-33.73-26.95l-863.5,349.65c-10.04,4.07-16.75,14.85-16.75,26.95v1395.68c0,19.79,17.29,33.6,33.73,26.95Z",
  "M1724.58,1524.93l-373.87-152.54c-16.45-6.71-33.78,7.11-33.78,26.92v257.45c0,12.07,6.68,22.84,16.69,26.92l110.47,45.08c10.01,4.09,16.69,14.86,16.69,26.92v188.42c0,19.86-17.41,33.68-33.88,26.89l-302.29-124.85c-9.97-4.12-16.6-14.86-16.6-26.89v-759c0-19.86,17.41-33.68,33.88-26.89l565.5,233.56c16.46,6.8,33.88-7.02,33.88-26.89v-257.37c0-12.03-6.63-22.77-16.6-26.89l-863.5-356.64c-16.46-6.8-33.88,7.02-33.88,26.89v1395.54c0,12.03,6.63,22.77,16.6,26.89l863.5,356.64c16.46,6.8,33.88-7.02,33.88-26.89v-826.37c0-12.07-6.68-22.84-16.69-26.92Z",
  "M3110.98,405.33l-416.25-85.06c-4.39-.9-8.9-.46-13.09,1.27l-657.89,270.98c-5.57,2.29-11.67,2.29-17.24,0l-657.89-270.98c-4.19-1.73-8.71-2.16-13.09-1.27l-416.25,85.06c-25.36,5.18-28.37,45.05-4.16,55.05l959.39,395.94h-2.45v1596.61c0,12.02,6.62,22.76,16.58,26.88l115.12,47.66c5.59,2.31,11.72,2.31,17.31,0l115.12-47.66c9.96-4.12,16.58-14.86,16.58-26.88V877.57c0-12.03,6.64-22.77,16.61-26.89l945.74-390.3c24.22-9.99,21.21-49.87-4.16-55.05Z"
];

class CanvasBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    if (this.state.failed) {
      return null;
    }

    return this.props.children;
  }
}

function makeSymbolGeometries() {
  const loader = new SVGLoader();
  const data = loader.parse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4029.94 2849.45">${GTG_SYMBOL_PATHS.map(
      (pathData) => `<path d="${pathData}"/>`
    ).join("")}</svg>`
  );

  return data.paths.flatMap((path) =>
    path.toShapes(true).map((shape) => {
      const geometry = new ExtrudeGeometry(shape, {
        depth: SYMBOL_EXTRUDE_DEPTH,
        bevelEnabled: true,
        bevelThickness: 14,
        bevelSize: 16,
        bevelSegments: 3,
        curveSegments: 12,
        steps: 1
      });

      geometry.translate(-SYMBOL_SOURCE_CENTER[0], -SYMBOL_SOURCE_CENTER[1], -SYMBOL_EXTRUDE_DEPTH / 2);
      geometry.scale(SYMBOL_GEOMETRY_SCALE, -SYMBOL_GEOMETRY_SCALE, SYMBOL_GEOMETRY_SCALE);
      geometry.computeVertexNormals();

      return geometry;
    })
  );
}

const ribbons: FlowRibbon[] = [
  {
    id: "upper-warm-flow",
    color: "#a9aaa4",
    opacity: 0.28,
    radius: 0.012,
    points: [
      [-4.8, 0.7, -0.7],
      [-2.8, 1.02, -0.2],
      [-0.9, 0.86, 0.42],
      [0.7, 1.12, 0.05],
      [2.7, 0.88, -0.36],
      [4.4, 1.18, -0.8]
    ]
  },
  {
    id: "middle-graphite-flow",
    color: "#6f7472",
    opacity: 0.28,
    radius: 0.01,
    points: [
      [-4.9, -0.12, -0.35],
      [-2.2, 0.08, 0.4],
      [-0.8, -0.16, 0.88],
      [0.7, 0.03, 0.38],
      [2.4, -0.08, -0.08],
      [4.8, 0.1, -0.46]
    ]
  },
  {
    id: "lower-red-signal",
    color: "#e30613",
    opacity: 0.18,
    radius: 0.009,
    points: [
      [-4.2, -1.0, 0.1],
      [-2.5, -0.72, 0.5],
      [-1.1, -0.86, 0.8],
      [0.2, -0.68, 0.32],
      [1.8, -0.9, -0.16],
      [3.9, -0.62, -0.48]
    ]
  },
  {
    id: "foreground-fold-line",
    color: "#858984",
    opacity: 0.2,
    radius: 0.007,
    points: [
      [-3.2, 1.55, 0.68],
      [-1.54, 1.24, 0.36],
      [-0.2, 1.46, 0.22],
      [1.18, 1.26, 0.36],
      [3.1, 1.54, 0.62]
    ]
  }
];

const activationNodes: ActivationNode[] = [
  {
    id: "upper-left-node",
    position: [-2.05, 0.94, 0.1],
    rotation: [0.2, 0.32, 0.78],
    scale: [0.16, 0.16, 0.08]
  },
  {
    id: "right-node",
    position: [2.34, -0.08, -0.16],
    rotation: [0.18, -0.42, 0.78],
    scale: [0.14, 0.14, 0.08]
  },
  {
    id: "core-node",
    position: [0.92, 0.62, 0.28],
    rotation: [0.12, -0.4, 0.78],
    scale: [0.12, 0.12, 0.08]
  },
  {
    id: "lower-left-node",
    position: [-1.48, -0.82, 0.48],
    rotation: [0.18, 0.28, 0.78],
    scale: [0.11, 0.11, 0.07]
  }
];

function SymbolCore() {
  const geometries = useMemo(() => makeSymbolGeometries(), []);
  const materials = useMemo(
    () => [
      new MeshStandardMaterial({
        color: "#e30613",
        emissive: "#280306",
        emissiveIntensity: 0.22,
        metalness: 0.12,
        roughness: 0.58,
        side: DoubleSide
      }),
      new MeshStandardMaterial({
        color: "#4b0b10",
        emissive: "#120203",
        emissiveIntensity: 0.14,
        metalness: 0.18,
        roughness: 0.7,
        side: DoubleSide
      })
    ],
    []
  );

  useEffect(() => {
    return () => {
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    };
  }, [geometries, materials]);

  return (
    <group>
      {geometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry} material={materials} />
      ))}
    </group>
  );
}

function Ribbon({ ribbon }: { ribbon: FlowRibbon }) {
  const curve = useMemo(
    () => new CatmullRomCurve3(ribbon.points.map((point) => new Vector3(...point))),
    [ribbon.points]
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 96, ribbon.radius, 8, false]} />
      <meshBasicMaterial color={ribbon.color} transparent opacity={ribbon.opacity} toneMapped={false} />
    </mesh>
  );
}

function ActivationNode({ node }: { node: ActivationNode }) {
  return (
    <mesh position={node.position} rotation={node.rotation} scale={node.scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#e30613"
        emissive="#70050b"
        emissiveIntensity={0.42}
        metalness={0.18}
        roughness={0.58}
      />
    </mesh>
  );
}

function DataCoreScene() {
  const coreRef = useRef<Group>(null);
  const fieldRef = useRef<Group>(null);

  useFrame((state) => {
    const breathe = Math.sin(state.clock.elapsedTime * 0.72) * 0.018;

    if (coreRef.current) {
      coreRef.current.rotation.x = -0.08 + Math.sin(state.clock.elapsedTime * 0.36) * 0.025;
      coreRef.current.rotation.y = -0.18 + Math.sin(state.clock.elapsedTime * 0.34) * 0.18;
      coreRef.current.rotation.z = 0.02;
      coreRef.current.scale.setScalar(1.05 + breathe);
    }

    if (fieldRef.current) {
      fieldRef.current.rotation.y = state.clock.elapsedTime * -0.018;
      fieldRef.current.scale.setScalar(0.88);
    }
  });

  return (
    <>
      <ambientLight intensity={1.24} />
      <directionalLight position={[2.4, 3.2, 4.8]} intensity={1.62} color="#f3f1ea" />
      <directionalLight position={[-3.4, -1.8, 2.8]} intensity={0.54} color="#858984" />
      <pointLight position={[0, 0.2, 2.8]} intensity={0.72} color="#e30613" distance={5.8} />

      <group ref={fieldRef}>
        {ribbons.map((ribbon) => (
          <Ribbon key={ribbon.id} ribbon={ribbon} />
        ))}
        {activationNodes.map((node) => (
          <ActivationNode key={node.id} node={node} />
        ))}
      </group>

      <group ref={coreRef} position={[0, -0.04, 0]}>
        <SymbolCore />
      </group>
    </>
  );
}

export function HeroCanvas({ onFailure }: HeroCanvasProps) {
  return (
    <div className="hero-canvas-wrap" data-testid="webgl-hero" aria-hidden="true">
      <CanvasBoundary onFailure={onFailure}>
        <Canvas
          className="hero-canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.04, 7.1], fov: 36 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={onFailure}
        >
          <DataCoreScene />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
