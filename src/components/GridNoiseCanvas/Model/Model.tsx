import React from "react";
import { useGLTF } from "@react-three/drei";

interface Props {
  color: string;
}

export function Model(props: Props) {
  const gltf = useGLTF("/crash_bandicoot.gltf") as any;

  return (
    <group {...props} dispose={null} position={[0, -3, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes["2"].geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          emissive={props.color}
          emissiveIntensity={30.}
          color={props.color}
          wireframe
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/crash_bandicoot.gltf");
