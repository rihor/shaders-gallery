import { useEffect, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import niceColors from "nice-color-palettes";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { Color, Euler } from "three";

const PlaneShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseFreq: 0,
    uNoiseSpeed: 0,
    uColors: null,
    uCoordShiftSpeed: 0,
    uNoiseFlowMultiplier: 0,
    uNoiseColorSpeedMultiplier: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ PlaneShaderMaterial });

const randomIndex = Math.floor(Math.random() * niceColors.length);
let pallete = niceColors[59];
console.log(randomIndex);
pallete = pallete.map((c) => new Color(c));

console.log(pallete);

export function Plane() {
  const shaderMaterialRef = useRef(null);
  const geometryRef = useRef(null);
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (shaderMaterialRef.current?.uniforms) {
      shaderMaterialRef.current.uTime += delta;
    }
  });

  const controls = useControls("plane", {
    size: {
      value: 4,
      max: 2,
      min: 1,
    },
    uNoiseFreq: {
      value: 0.65,
      min: 0.001,
      max: 1,
      step: 0.001,
    },
    uNoiseSpeed: {
      value: 0.1,
      min: 0.001,
      max: 2,
      step: 0.001,
    },
    uCoordShiftSpeed: {
      value: 0.05,
      min: 0.001,
      max: 3,
      step: 0.001,
    },
    uNoiseColorFlowMultiplier: {
      value: 0.23,
      min: 0.01,
      max: 0.5,
      step: 0.001,
    },
    uNoiseColorSpeedMultiplier: {
      value: 0.06,
      min: 0.01,
      max: 0.5,
      step: 0.0001,
    },
  });

  useEffect(() => {
    console.log(viewport);
  }, [viewport]);

  return (
    <mesh rotation={new Euler(0, 0, 0.15)}>
      <planeGeometry
        args={[
          0.5 + controls.size * viewport.width,
          0.5 + controls.size * viewport.width,
          200,
          200,
        ]}
        ref={geometryRef}
      />
      <planeShaderMaterial
        ref={shaderMaterialRef}
        key={PlaneShaderMaterial.key}
        color="#0ff"
        uNoiseFreq={controls.uNoiseFreq}
        uNoiseSpeed={controls.uNoiseSpeed}
        uCoordShiftSpeed={controls.uCoordShiftSpeed}
        uColors={pallete}
        uNoiseFlowMultiplier={controls.uNoiseFlowMultiplier}
        uNoiseColorSpeedMultiplier={controls.uNoiseColorSpeedMultiplier}
      />
    </mesh>
  );
}
