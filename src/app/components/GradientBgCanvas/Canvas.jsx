"use client";
import { Canvas } from "@react-three/fiber";
import { Plane } from "./Plane";

export function GradientBgCanvas() {
  return (
    <Canvas>
      <Plane />
    </Canvas>
  );
}
