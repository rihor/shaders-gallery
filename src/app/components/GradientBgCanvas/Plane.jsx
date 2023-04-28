import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

const PlaneShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader);

extend({ PlaneShaderMaterial });

export function Plane() {
  return (
    <mesh>
      <planeGeometry />
      <planeShaderMaterial />
    </mesh>
  );
}
