"use client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { Experience } from "./Experience";

export function GridNoiseCanvas() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <Experience />
      </Canvas>
    </>
  );
}
