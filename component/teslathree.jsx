import React from 'react';
import { useGLTF } from '@react-three/drei';

export function TeslaThree(props) {
  const model = useGLTF('/scene.glb');
  return (
    <mesh>
      <primitive object={model.scene} />
    </mesh>
  );
}
