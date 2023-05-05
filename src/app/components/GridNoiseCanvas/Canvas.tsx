"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { Plane } from "./Plane";

export function GridNoiseCanvas() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <ambientLight />
        <orthographicCamera
          args={[-1, 1, 1, -1, 0, 1]}
          position={[0.25, -0.25, 3]}
        />
        <Plane />
      </Canvas>
    </>
  );
}
