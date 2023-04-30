"use client";
import { Canvas } from "@react-three/fiber";
import { Plane } from "./Plane";
import { Leva, useControls } from "leva";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Euler } from "three";

export function GradientBgCanvas() {
  const posControls = useControls("camera.pos", {
    x: { value: 0.96, min: -5, max: 5, step: 0.001 },
    y: { value: -0.61, min: -5, max: 5, step: 0.001 },
    z: { value: -1.13, min: -5, max: 5, step: 0.001 },
  });

  const rotationControls = useControls("camera.rotation", {
    x: { value: -2.01, min: -Math.PI, max: Math.PI, step: 0.001 },
    y: { value: -0.0, min: -Math.PI, max: Math.PI, step: 0.001 },
    z: { value: -0.0, min: -Math.PI, max: Math.PI, step: 0.001 },
  });

  return (
    <div className="absolute top-0 left-0 w-full">
      <Leva />
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[posControls.x, posControls.y, posControls.z]}
          rotation={
            new Euler(
              rotationControls.x,
              rotationControls.y,
              rotationControls.z
            )
          }
        />
        <OrbitControls />
        <Plane />
      </Canvas>
    </div>
  );
}
