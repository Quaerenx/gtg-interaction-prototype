"use client";

import { Component, type MutableRefObject, type ReactNode, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Vector3
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { EXPERIENCE_MOTION, rangeProgress } from "@/components/motion/experience-motion";

type Triple = [number, number, number];

type HeroCanvasProps = {
  active: boolean;
  onFailure: () => void;
  progressRef: MutableRefObject<number>;
};

type BoundaryProps = {
  children: ReactNode;
  onFailure: () => void;
};

type ExitRoute = {
  id: string;
  bend: Triple;
  end: Triple;
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

const exitRoutes: ExitRoute[] = [
  {
    id: "solution-data-analytics",
    bend: [-1.46, 0.56, 0.42],
    end: [-3.05, 0.98, -0.32]
  },
  {
    id: "solution-data-streaming",
    bend: [-1.24, -0.12, 0.48],
    end: [-2.38, -0.48, 0.08]
  },
  {
    id: "solution-infrastructure-automation",
    bend: [0, 0.76, 0.54],
    end: [0, 1.48, -0.42]
  },
  {
    id: "solution-devops-quality",
    bend: [1.24, -0.12, 0.48],
    end: [2.38, -0.48, 0.08]
  },
  {
    id: "solution-consulting-support",
    bend: [1.46, 0.56, 0.42],
    end: [3.05, 0.98, -0.32]
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

function TopologyRoute({ progressRef, route }: { progressRef: MutableRefObject<number>; route: ExitRoute }) {
  const materialRef = useRef<MeshBasicMaterial>(null);
  const endpointRef = useRef<Group>(null);
  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 0, 0.18),
        new Vector3(...route.bend),
        new Vector3(...route.end)
      ]),
    [route.bend, route.end]
  );

  useFrame(() => {
    const { identityEnd, activeEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
    const edgeProgress = rangeProgress(progressRef.current, identityEnd, activeEnd);
    const nodeProgress = rangeProgress(progressRef.current, activeEnd, pullbackEnd);
    if (materialRef.current) {
      materialRef.current.opacity = 0.035 + edgeProgress * 0.27;
    }
    endpointRef.current?.scale.setScalar(0.001 + nodeProgress * 0.11);
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 72, 0.009, 6, false]} />
        <meshBasicMaterial ref={materialRef} color="#a9aaa4" transparent opacity={0.035} toneMapped={false} />
      </mesh>
      <group ref={endpointRef} position={route.end} rotation={[0.16, 0.24, 0.78]} scale={0.001}>
        <mesh>
          <boxGeometry args={[1, 1, 0.54]} />
          <meshStandardMaterial color="#a9aaa4" metalness={0.1} roughness={0.76} />
        </mesh>
      </group>
    </>
  );
}

function BoundarySignal({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const materialRef = useRef<MeshBasicMaterial>(null);
  const signalRef = useRef<Group>(null);
  const curve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, -0.02, 0.18),
        new Vector3(0.18, -0.72, 0.42),
        new Vector3(0, -1.38, 0.08)
      ]),
    []
  );

  useFrame(() => {
    const settleProgress = rangeProgress(
      progressRef.current,
      EXPERIENCE_MOTION.hero.boundaries.pullbackEnd,
      1
    );
    if (materialRef.current) {
      materialRef.current.opacity = settleProgress * 0.28;
    }
    signalRef.current?.scale.setScalar(0.001 + settleProgress * 0.14);
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 48, 0.008, 6, false]} />
        <meshBasicMaterial ref={materialRef} color="#a9aaa4" transparent opacity={0} toneMapped={false} />
      </mesh>
      <group ref={signalRef} position={[0, -1.38, 0.08]} rotation={[0.1, 0.2, 0.78]} scale={0.001}>
        <mesh>
          <boxGeometry args={[1, 1, 0.5]} />
          <meshStandardMaterial
            color="#e30613"
            emissive="#4b0509"
            emissiveIntensity={0.24}
            metalness={0.1}
            roughness={0.66}
          />
        </mesh>
      </group>
    </>
  );
}

function DataCoreScene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const coreRef = useRef<Group>(null);
  const fieldRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const progress = progressRef.current;
    const { identityEnd, activeEnd, pullbackEnd } = EXPERIENCE_MOTION.hero.boundaries;
    const activeProgress = rangeProgress(progress, identityEnd, activeEnd);
    const pullbackProgress = rangeProgress(progress, activeEnd, pullbackEnd);
    const settleProgress = rangeProgress(progress, pullbackEnd, 1);
    const breathe = Math.sin(state.clock.elapsedTime * 0.62) * 0.014 * (1 - settleProgress);

    if (coreRef.current) {
      coreRef.current.rotation.x = -0.08 + Math.sin(state.clock.elapsedTime * 0.28) * 0.018;
      coreRef.current.rotation.y = -0.12 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      coreRef.current.rotation.z = 0.02;
      coreRef.current.scale.setScalar(1.05 - pullbackProgress * 0.2 + breathe);
    }

    if (fieldRef.current) {
      fieldRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.025 * activeProgress;
      fieldRef.current.scale.setScalar(0.84 + pullbackProgress * 0.15);
    }

    camera.position.z = 7.1 + pullbackProgress * 1.25;
  });

  return (
    <>
      <ambientLight intensity={1.24} />
      <directionalLight position={[2.4, 3.2, 4.8]} intensity={1.62} color="#f3f1ea" />
      <directionalLight position={[-3.4, -1.8, 2.8]} intensity={0.54} color="#858984" />
      <pointLight position={[0, 0.2, 2.8]} intensity={0.46} color="#e30613" distance={5.4} />

      <group ref={fieldRef}>
        {exitRoutes.map((route) => (
          <TopologyRoute key={route.id} progressRef={progressRef} route={route} />
        ))}
        <BoundarySignal progressRef={progressRef} />
      </group>

      <group ref={coreRef} position={[0, -0.04, 0]}>
        <SymbolCore />
      </group>
    </>
  );
}

export function HeroCanvas({ active, onFailure, progressRef }: HeroCanvasProps) {
  return (
    <div className="hero-canvas-wrap" data-testid="webgl-hero" aria-hidden="true">
      <CanvasBoundary onFailure={onFailure}>
        <Canvas
          className="hero-canvas"
          dpr={[1, 1.5]}
          frameloop={active ? "always" : "never"}
          camera={{ position: [0, 0.04, 7.1], fov: 36 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={onFailure}
        >
          <DataCoreScene progressRef={progressRef} />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
