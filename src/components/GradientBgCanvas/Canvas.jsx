"use client";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { PerspectiveCamera } from "@react-three/drei";
import { Euler } from "three";

import { Plane } from "./Plane";

export function GradientBgCanvas() {
  const posControls = useControls("camera.position", {
    x: { value: -0.019786382035342692, min: -4, max: 1, step: 0.001 },
    y: { value: -4.168428655322144, min: -4, max: 1, step: 0.001 },
    z: { value: 2.3142236318664575, min: 1, max: 8, step: 0.001 },
  });

  const rotationControls = useControls("camera.rotation", {
    x: { value: 0.7558778474664516, min: -Math.PI, max: Math.PI, step: 0.001 },
    y: {
      value: -0.024146260446489924,
      min: -Math.PI,
      max: Math.PI,
      step: 0.001,
    },
    z: { value: 0.0227549969120772, min: -Math.PI, max: Math.PI, step: 0.001 },
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
      <Leva collapsed={true} />
      <Canvas>
        <PerspectiveCamera
          far={55}
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
