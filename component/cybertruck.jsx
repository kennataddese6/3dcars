"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function CyberTruck({ color }) {
  const forged = "silver-forged.png";
  const model = useGLTF("/tesla_cybertruck.glb");
  const carMaterial = useRef();
  const textureLoader = new THREE.TextureLoader();
  const forgedTexture = textureLoader.load(forged);

  // Function to change the color of the car paint
  const changeCarPaintColor = () => {
    if (carMaterial.current) {
      carMaterial.current.color.set(color); // Change 'red' to your desired color
    }
  };

  // Traverse the model and find the car paint material
  const traverseMaterials = (object) => {
    object.traverse((node) => {
      if (node.isMesh) {
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach((material) => {
          if (material.name.includes("Bodyl")) {
            carMaterial.current = material;
            carMaterial.current.map = forgedTexture; // Apply the forged texture
            carMaterial.current.needsUpdate = true; // Ensure the material is updated
          }
        });
      }
    });
  };

  // Call the function to traverse materials after the model is loaded
  useEffect(() => {
    traverseMaterials(model.scene);
    // changeCarPaintColor();
  }, [model.scene]);

  useEffect(() => {
    // changeCarPaintColor();
  }, [color]);

  return (
    <>
      <mesh>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
}
