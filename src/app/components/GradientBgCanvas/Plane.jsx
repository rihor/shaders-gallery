import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import niceColors from "nice-color-palettes";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { Color } from "three";

const PlaneShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseFreq: 0,
    uNoiseSpeed: 0,
    uColors: null,
    uCoordShiftSpeed: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ PlaneShaderMaterial });

const randomIndex = Math.floor(Math.random() * niceColors.length);
let pallete = niceColors[7];
console.log(randomIndex);
pallete = pallete.map((c) => new Color(c));

console.log(pallete);

export function Plane() {
  const ref = useRef(null);
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (ref.current?.uniforms) {
      ref.current.uTime += delta;
    }
  });

  const controls = useControls("plane", {
    size: {
      value: 5,
      max: 10,
      min: 1,
    },
    uNoiseFreq: {
      value: 1,
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
      value: 0.1,
      min: 0.001,
      max: 3,
      step: 0.001,
    },
  });

  return (
    <mesh>
      <planeGeometry args={[controls.size, controls.size, 150, 150]} />
      <planeShaderMaterial
        ref={ref}
        key={PlaneShaderMaterial.key}
        color="#0ff"
        uNoiseFreq={controls.uNoiseFreq}
        uNoiseSpeed={controls.uNoiseSpeed}
        uCoordShiftSpeed={controls.uCoordShiftSpeed}
        uColors={pallete}
      />
    </mesh>
  );
}
