"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export function TeslaThree(props) {
  const model = useGLTF("/scene.glb");
  const carMaterial = useRef();

  // Function to change the color of the car paint
  const changeCarPaintColor = () => {
    if (carMaterial.current) {
      console.log("I am called");
      carMaterial.current.color.set("yellow"); // Change 'red' to your desired color
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

  // Call the function to traverse materials after the model is loaded
  useEffect(() => {
    traverseMaterials(model.scene);
    changeCarPaintColor();
  }, [model.scene]);

  return (
    <>
      <mesh>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
}
