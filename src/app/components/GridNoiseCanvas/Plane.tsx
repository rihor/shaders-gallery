import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

const BgShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseSize: 125,
    uNoiseOpacity: 1,
    uAspectRatio: 1,
    uLightColor: new THREE.Color("#ed4903"),
    uLightDistortionSpeed: 0.04,
    uLightDistortionStrength: 1,
    uLightDistortionWaving: 1,
  },
  vertexShader,
  fragmentShader
);
extend({ BgShaderMaterial });

export function Plane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const viewport = useThree((state) => state.viewport);

  const controls = useControls("noise", {
    noise: folder({
      size: {
        value: 282.35,
        min: 0,
        max: 2048,
        step: 0.001,
      },
      opacity: {
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.001,
      },
    }),
    light: folder({
      color: "#ed4903",
      uLightDistortionSpeed: {
        value: 0.04,
        min: 0.1,
        max: 1,
        step: 0.01,
      },
      uLightDistortionStrength: {
        value: 1,
        min: 0.1,
        max: 10,
        step: 0.01,
      },
      uLightDistortionWaving: {
        value: 9.14,
        min: 0.1,
        max: 25,
        step: 0.001,
      },
    }),
  });

  useFrame((state, delta) => {
    if (ref.current?.uniforms) {
      // @ts-ignore
      ref.current.uTime += delta;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-ignore */}
      <bgShaderMaterial
        ref={ref}
        key={BgShaderMaterial.key}
        uNoiseSize={controls.size}
        uNoiseOpacity={controls.opacity}
        uAspectRatio={viewport.width / viewport.height}
        uLightColor={controls.color}
        uLightDistortionSpeed={controls.uLightDistortionSpeed}
        uLightDistortionStrength={controls.uLightDistortionStrength}
        uLightDistortionWaving={controls.uLightDistortionWaving}
      />
    </mesh>
  );
}
