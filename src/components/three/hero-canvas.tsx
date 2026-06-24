"use client";

import { Component, ReactNode, RefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, DoubleSide, Group, MathUtils, SRGBColorSpace } from "three";
import { HeroService } from "@/content/site";

type HeroCanvasProps = {
  services: HeroService[];
  progressRef: RefObject<number>;
  isMobile: boolean;
  onFailure: () => void;
};

type BoundaryProps = {
  children: ReactNode;
  onFailure: () => void;
};

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

function smoothRange(value: number, start: number, end: number) {
  return MathUtils.smoothstep(MathUtils.clamp((value - start) / (end - start), 0, 1), 0, 1);
}

function makeServiceTexture(service: HeroService, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 540;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create service texture");
  }

  context.fillStyle = index % 2 === 0 ? "#181817" : "#10100f";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#22221f";
  context.fillRect(54, 54, 1092, 432);

  context.strokeStyle = "rgba(244,239,228,0.13)";
  context.lineWidth = 2;
  for (let x = 120; x < 1120; x += 120) {
    context.beginPath();
    context.moveTo(x, 92);
    context.lineTo(x, 450);
    context.stroke();
  }
  for (let y = 120; y < 440; y += 80) {
    context.beginPath();
    context.moveTo(92, y);
    context.lineTo(1108, y);
    context.stroke();
  }

  context.strokeStyle = "rgba(244,239,228,0.82)";
  context.lineWidth = 9;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(118, 370 - index * 7);
  for (let point = 0; point < 7; point += 1) {
    const x = 118 + point * 160;
    const y = 320 + Math.sin(point * 1.35 + index) * 72 - point * 20;
    context.lineTo(x, y);
  }
  context.stroke();

  context.strokeStyle = "#f02018";
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(118, 420);
  for (let point = 0; point < 7; point += 1) {
    const x = 118 + point * 160;
    const y = 410 + Math.cos(point * 1.1 + index) * 42 - point * 12;
    context.lineTo(x, y);
  }
  context.stroke();

  context.fillStyle = "#f02018";
  for (let point = 1; point < 6; point += 2) {
    const x = 118 + point * 160;
    const y = 320 + Math.sin(point * 1.35 + index) * 72 - point * 20;
    context.beginPath();
    context.arc(x, y, 13, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = "#f4efe4";
  context.font = "700 34px Arial, sans-serif";
  context.fillText(service.label.toUpperCase(), 84, 112);
  context.fillStyle = "rgba(244,239,228,0.72)";
  context.font = "500 24px Arial, sans-serif";
  context.fillText(service.keyword, 84, 462);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function ServiceRing({
  services,
  progressRef,
  isMobile
}: {
  services: HeroService[];
  progressRef: RefObject<number>;
  isMobile: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const textures = useMemo(() => services.map((service, index) => makeServiceTexture(service, index)), [services]);
  const radius = isMobile ? 3.45 : 5.35;
  const panelWidth = isMobile ? 1.5 : 2.52;
  const panelHeight = isMobile ? 0.78 : 1.12;

  useEffect(() => {
    return () => {
      textures.forEach((texture) => texture.dispose());
    };
  }, [textures]);

  useFrame((state) => {
    const progress = progressRef.current;
    const pullback = isMobile ? 0 : smoothRange(progress, 0.45, 0.75);
    const shrink = isMobile ? 0 : smoothRange(progress, 0.76, 0.94);
    const blackout = smoothRange(progress, 0.9, 1);
    const autoRotation = isMobile ? state.clock.elapsedTime * 0.025 : state.clock.elapsedTime * 0.052;

    camera.position.set(
      0,
      MathUtils.lerp(0.12, 1.35, pullback),
      MathUtils.lerp(isMobile ? 7.5 : 8.15, isMobile ? 8.2 : 11.05, pullback)
    );
    camera.rotation.set(0, 0, 0);
    camera.lookAt(0, MathUtils.lerp(0, -0.16, pullback), 0);

    if ("fov" in camera) {
      camera.fov = MathUtils.lerp(isMobile ? 42 : 39, isMobile ? 42 : 49, pullback);
      camera.updateProjectionMatrix();
    }

    if (groupRef.current) {
      const scale = MathUtils.lerp(1, 0.62, shrink);
      groupRef.current.rotation.y = -autoRotation - progress * 1.05 + MathUtils.lerp(0, 0.34, pullback);
      groupRef.current.position.y = MathUtils.lerp(-0.05, -0.16, pullback);
      groupRef.current.scale.setScalar(MathUtils.lerp(scale, 0.36, blackout));
    }
  });

  return (
    <group ref={groupRef}>
      {services.map((service, index) => {
        const angle = index * ((Math.PI * 2) / services.length);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <mesh key={service.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <planeGeometry args={[panelWidth, panelHeight, 12, 4]} />
            <meshBasicMaterial map={textures[index]} side={DoubleSide} transparent opacity={0.94} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene(props: {
  services: HeroService[];
  progressRef: RefObject<number>;
  isMobile: boolean;
}) {
  return <ServiceRing services={props.services} progressRef={props.progressRef} isMobile={props.isMobile} />;
}

export function HeroCanvas({ services, progressRef, isMobile, onFailure }: HeroCanvasProps) {
  return (
    <div className="hero-canvas-wrap" data-testid="webgl-hero">
      <CanvasBoundary onFailure={onFailure}>
        <Canvas
          className="hero-canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.12, isMobile ? 7.5 : 8.15], fov: isMobile ? 42 : 39 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={onFailure}
        >
          <Scene services={services} progressRef={progressRef} isMobile={isMobile} />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
