import { useState, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import niceColors from "nice-color-palettes";
import { Color, Euler } from "three";

import { normalizeInRange } from "../../helpers/math";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

const PlaneShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoiseFreq: 0,
    uNoiseSpeed: 0,
    uColors: null,
    uCoordShiftSpeed: 0,
    uNoiseColorFlowMultiplier: 0,
    uNoiseColorSpeedMultiplier: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ PlaneShaderMaterial });

export function Plane() {
  const shaderMaterialRef = useRef(null);
  const geometryRef = useRef(null);
  const viewport = useThree((state) => state.viewport);
  const [colorIndex, setColorIndex] = useState(66);

  useFrame((state, delta) => {
    if (shaderMaterialRef.current?.uniforms) {
      shaderMaterialRef.current.uTime += delta;
    }
  });

  const controls = useControls("plane", {
    size: {
      value: 10,
      max: 25,
      min: 1,
    },
  });

  const wavesControls = useControls("plane.waves", {
    frequency: {
      value: 0.65,
      min: 0.001,
      max: 2.8,
      step: 0.001,
    },
    speed: {
      value: 0.1,
      min: 0.001,
      max: 1.5,
      step: 0.001,
    },
    movement: {
      value: 0.09,
      min: 0.001,
      max: 1.8,
      step: 0.001,
    },
  });

  const colorsControls = useControls("plane.colors", {
    movement: {
      value: 0.015,
      min: 0.01,
      max: 0.1,
      step: 0.001,
    },
    speed: {
      value: 0.06,
      min: 0.01,
      max: 2,
      step: 0.0001,
    },
    pallete: {
      value: colorIndex,
      step: 1,
      min: 0,
      max: 99,
      onEditEnd: (value) => {
        setColorIndex(value);
      },
    },
  });

  // normalize width between min and max values
  const minSizeValue = 2;
  const maxSizeValue = 4;
  let normalizedWidthInRange = normalizeInRange(
    viewport.width * viewport.factor,
    400,
    2560,
    2,
    4
  );
  normalizedWidthInRange = maxSizeValue + minSizeValue - normalizedWidthInRange; // invert normalized value in range

  return (
    <mesh rotation={new Euler(0, 0, 0.15)}>
      <planeGeometry
        args={[
          controls.size + normalizedWidthInRange * (viewport.width / 2),
          controls.size + normalizedWidthInRange * (viewport.width / 2),
          300,
          300,
        ]}
        ref={geometryRef}
      />
      <planeShaderMaterial
        ref={shaderMaterialRef}
        key={PlaneShaderMaterial.key}
        color="#0ff"
        uNoiseFreq={wavesControls.frequency}
        uNoiseSpeed={wavesControls.speed}
        uCoordShiftSpeed={wavesControls.movement}
        uColors={niceColors[colorIndex].map((x) => new Color(x))}
        uNoiseColorFlowMultiplier={colorsControls.movement}
        uNoiseColorSpeedMultiplier={colorsControls.speed}
      />
    </mesh>
  );
}
