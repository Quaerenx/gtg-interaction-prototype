"use client";

import { Component, ReactNode, RefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, DoubleSide, Group, MathUtils, SRGBColorSpace } from "three";
import { HeroCustomer, HeroService } from "@/content/site";

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 540;
const FRAME = {
  x: 54,
  y: 54,
  width: 1092,
  height: 432
} as const;
const LOGO_FIELD = {
  x: 94,
  y: 138,
  width: 1012,
  height: 270,
  radius: 18
} as const;
const PROOF_LABEL = "REPRESENTATIVE CUSTOMER";

type HeroCanvasProps = {
  services: HeroService[];
  mediaItems: HeroCustomer[];
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

function drawFittedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  size: number,
  weight: number
) {
  let fontSize = size;
  context.font = `${weight} ${fontSize}px Arial, sans-serif`;

  while (context.measureText(text).width > maxWidth && fontSize > 18) {
    fontSize -= 1;
    context.font = `${weight} ${fontSize}px Arial, sans-serif`;
  }

  context.fillText(text, x, y);
}

function drawCustomerCardGrid(context: CanvasRenderingContext2D) {
  context.strokeStyle = "rgba(244,239,228,0.12)";
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
}

function drawAngularMarker(context: CanvasRenderingContext2D) {
  context.save();
  context.fillStyle = "#f02018";
  context.beginPath();
  context.moveTo(1044, 92);
  context.lineTo(1116, 92);
  context.lineTo(1090, 116);
  context.lineTo(1018, 116);
  context.closePath();
  context.fill();

  context.fillStyle = "#9e0d0a";
  context.beginPath();
  context.moveTo(1116, 92);
  context.lineTo(1138, 104);
  context.lineTo(1112, 128);
  context.lineTo(1090, 116);
  context.closePath();
  context.fill();
  context.restore();
}

function drawCustomerCardBase(context: CanvasRenderingContext2D, item: HeroCustomer, index: number) {
  context.fillStyle = index % 2 === 0 ? "#181817" : "#10100f";
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  context.fillStyle = "#22221f";
  context.fillRect(FRAME.x, FRAME.y, FRAME.width, FRAME.height);
  context.strokeStyle = "rgba(244,239,228,0.16)";
  context.lineWidth = 2;
  context.strokeRect(FRAME.x, FRAME.y, FRAME.width, FRAME.height);

  drawCustomerCardGrid(context);

  context.save();
  context.beginPath();
  context.roundRect(LOGO_FIELD.x, LOGO_FIELD.y, LOGO_FIELD.width, LOGO_FIELD.height, LOGO_FIELD.radius);
  context.fillStyle = "#f4efe4";
  context.fill();
  context.restore();

  drawAngularMarker(context);

  context.fillStyle = "#f4efe4";
  context.font = "700 26px Arial, sans-serif";
  context.fillText((item.proofLabel ?? PROOF_LABEL).toUpperCase(), 84, 104);
  context.strokeStyle = "rgba(244,239,228,0.34)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(84, 112);
  context.lineTo(372, 112);
  context.stroke();

  context.fillStyle = "rgba(244,239,228,0.72)";
  drawFittedText(context, item.label.toUpperCase(), 84, 462, 1032, 26, 600);
  context.fillStyle = "rgba(244,239,228,0.52)";
  context.font = "700 22px Arial, sans-serif";
  context.textAlign = "right";
  context.fillText(`${String(index + 1).padStart(2, "0")} / 18`, 1048, 462);
  context.textAlign = "left";
}

function drawCustomerLogo(context: CanvasRenderingContext2D, image: HTMLImageElement) {
  const clearSpace = 28;
  const logoBoxX = LOGO_FIELD.x + clearSpace;
  const logoBoxY = LOGO_FIELD.y + clearSpace;
  const logoBoxWidth = LOGO_FIELD.width - clearSpace * 2;
  const logoBoxHeight = LOGO_FIELD.height - clearSpace * 2;
  const scale = Math.min(logoBoxWidth / image.naturalWidth, logoBoxHeight / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const x = logoBoxX + (logoBoxWidth - width) / 2;
  const y = logoBoxY + (logoBoxHeight - height) / 2;

  context.save();
  context.beginPath();
  context.roundRect(LOGO_FIELD.x, LOGO_FIELD.y, LOGO_FIELD.width, LOGO_FIELD.height, LOGO_FIELD.radius);
  context.clip();
  context.fillStyle = "#f4efe4";
  context.fillRect(LOGO_FIELD.x, LOGO_FIELD.y, LOGO_FIELD.width, LOGO_FIELD.height);
  context.drawImage(image, x, y, width, height);
  context.restore();
}

function makeCustomerTexture(item: HeroCustomer, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create customer texture");
  }

  drawCustomerCardBase(context, item, index);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  const image = new Image();
  image.decoding = "async";
  image.onload = () => {
    drawCustomerCardBase(context, item, index);
    drawCustomerLogo(context, image);
    texture.needsUpdate = true;
  };
  image.src = item.visual;

  return texture;
}

function ServiceRing({
  services,
  mediaItems,
  progressRef,
  isMobile
}: {
  services: HeroService[];
  mediaItems: HeroCustomer[];
  progressRef: RefObject<number>;
  isMobile: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const ringItems = useMemo(
    () =>
      services
        .map((_service, index) => mediaItems[index % mediaItems.length])
        .filter((item): item is HeroCustomer => Boolean(item)),
    [mediaItems, services]
  );
  const textures = useMemo(() => ringItems.map((item, index) => makeCustomerTexture(item, index)), [ringItems]);
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
      {ringItems.map((item, index) => {
        const angle = index * ((Math.PI * 2) / ringItems.length);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <mesh key={item.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
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
  mediaItems: HeroCustomer[];
  progressRef: RefObject<number>;
  isMobile: boolean;
}) {
  return (
    <ServiceRing
      services={props.services}
      mediaItems={props.mediaItems}
      progressRef={props.progressRef}
      isMobile={props.isMobile}
    />
  );
}

export function HeroCanvas({ services, mediaItems, progressRef, isMobile, onFailure }: HeroCanvasProps) {
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
          <Scene services={services} mediaItems={mediaItems} progressRef={progressRef} isMobile={isMobile} />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
