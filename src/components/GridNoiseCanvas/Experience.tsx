"use client";
import { useControls } from "leva";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { LowResNoise } from "./LowResNoise/LowResNoise";
import { BlendFunction, BloomEffect, GlitchMode } from "postprocessing";
import { useEffect, useRef } from "react";
import { Model } from "./Model/Model";
import { LowResNoiseEffect } from "./LowResNoise/LowResNoiseEffect";

export function Experience() {
  const viewport = useThree((state) => state.viewport);
  const ref = useRef<typeof BloomEffect>(null);
  const noiseRef = useRef<LowResNoiseEffect>(null);

  useEffect(() => {
    if (ref.current) {
      (ref.current as unknown as BloomEffect).intensity = 0.5;
    }
  }, [ref])

  const noiseControls = useControls("noise", {
    size: {
      value: 282.35,
      min: 50,
      max: 2048,
      step: 0.001,
    },
    lightness: {
      value: 0.28,
      min: 0.01,
      max: 1,
      step: 0.001,
    },
  });

  const modelControls = useControls("model", {
    color: {
      value: "#8cbe79"
    }
  });

  return (
    <>
      <color args={['#1c1b1d']} attach="background" />

      <EffectComposer multisampling={0}>
        <Bloom
          blendFunction={BlendFunction.ADD}
          ref={ref}
          // @ts-ignore
          mipmapBlur
          luminanceThreshold={0.9}
        />
        <LowResNoise
          ref={noiseRef}
          size={noiseControls.size}
          opacity={noiseControls.lightness}
          aspectRatio={viewport.width / viewport.height}
          blendFunction={BlendFunction.COLOR_DODGE}
        />
      </EffectComposer>

      <orthographicCamera
        args={[-1, 1, 1, -1, 0, 1]}
        position={[0.25, -0.25, 3]}
      />

      <ambientLight args={["#fff", 1.]} />

      <Model color={modelControls.color} />

      <OrbitControls />
    </>
  );
}
