"use client";
import { useControls } from "leva";
import { EffectComposer, Bloom, Pixelation } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { LowResNoise } from "./LowResNoise/LowResNoise";
import { BlendFunction } from "postprocessing";

export function Experience() {
  const viewport = useThree((state) => state.viewport);

  const noiseControls = useControls("noise", {
    size: {
      value: 282.35,
      min: 50,
      max: 2048,
      step: 0.001,
    },
    lightness: {
      value: 0.1,
      min: 0.01,
      max: 1,
      step: 0.001,
    },
  });

  return (
    <>
      <color args={['#fff']} attach="background" />

      <EffectComposer multisampling={0}>
        <LowResNoise
          size={noiseControls.size}
          opacity={noiseControls.lightness}
          aspectRatio={viewport.width / viewport.height}
          blendFunction={BlendFunction.MULTIPLY}
        />
        {/* <Bloom blendFunction={BlendFunction.COLOR_BURN} /> */}
      </EffectComposer>

      <orthographicCamera
        args={[-1, 1, 1, -1, 0, 1]}
        position={[0.25, -0.25, 3]}
      />
      {/* <Plane /> */}

      <mesh>
        <boxGeometry />
        <meshBasicMaterial color={[1, 1, 0.2]} />
      </mesh>
      <OrbitControls />
    </>
  );
}
