"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function TeslaThree({ color }) {
  const forgedImage = "/forged.png";
  const model = useGLTF("/scene.glb");
  const texture = useTexture(forgedImage);
  const carMaterial = useRef();

  const changeCarPaintColor = () => {
    if (carMaterial.current) {
      carMaterial.current.color.set(color); // Change 'red' to your desired color
    }
  };
  // Function to apply the texture to the car paint
  const applyTexture = () => {
    if (carMaterial.current) {
      carMaterial.current.map = texture;
      carMaterial.current.needsUpdate = true;
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
          if (material.name.includes("carpaint")) {
            carMaterial.current = material;
          }
        });
      }
    });
  };

  // Call the function to traverse materials and apply texture after the model is loaded
  useEffect(() => {
    traverseMaterials(model.scene);
    // changeCarPaintColor();
    applyTexture();
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
