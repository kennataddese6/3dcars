import React from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
export function TeslaThree(props) {
  const model = useGLTF('/scene.glb');
  // Create a new material with the desired color
  const carMaterial = new MeshStandardMaterial({ color: 'green' }); // Change 'red' to your desired color

  // Apply the new material to the car model
  model.scene.traverse(child => {
    if (child.isMesh) {
      child.material = carMaterial;
    }
  });
  return (
    <mesh>
      <primitive object={model.scene} />
    </mesh>
  );
}
