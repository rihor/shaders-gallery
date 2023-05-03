"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { Plane } from "./Plane";
import { Leva, useControls } from "leva";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Euler } from "three";

export function GradientBgCanvas() {
  const posControls = useControls("camera.pos", {
    x: { value: 0, min: -1, max: 1, step: 0.001 },
    y: { value: -0.4, min: -1, max: 1, step: 0.001 },
    z: { value: 2.35, min: -1, max: 5, step: 0.001 },
  });

  const rotationControls = useControls("camera.rotation", {
    x: { value: 0.19, min: -Math.PI, max: Math.PI, step: 0.001 },
    y: { value: 0, min: -Math.PI, max: Math.PI, step: 0.001 },
    z: { value: 0, min: -Math.PI, max: Math.PI, step: 0.001 },
  });

  const fovControls = useControls("camera.fov", {
    fov: {
      value: 50,
      min: 20,
      max: 80,
    },
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Leva />
      <Canvas>
        <PerspectiveCamera
          makeDefault
          fov={fovControls.fov}
          position={[posControls.x, posControls.y, posControls.z]}
          rotation={
            new Euler(
              rotationControls.x,
              rotationControls.y,
              rotationControls.z
            )
          }
        />
        <Plane />
      </Canvas>
    </div>
  );
}
