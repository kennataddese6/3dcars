"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function CyberTruck({ color, texture }) {
  const forged = texture;
  const model = useGLTF("teslacybertruck.glb");
  const carMaterial = useRef();
  const textureLoader = new THREE.TextureLoader();
  const forgedTexture = textureLoader.load(forged);

  // Set the texture to repeat
  forgedTexture.wrapS = THREE.RepeatWrapping;
  forgedTexture.wrapT = THREE.RepeatWrapping;
  forgedTexture.repeat.set(10, 10); // Adjust the repeat values as needed

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
          if (material.name.includes("body")) {
            carMaterial.current = material;
            if (forged) {
              carMaterial.current.color.set("white");
              carMaterial.current.map = forgedTexture; // Apply the forged texture
              carMaterial.current.needsUpdate = true; // Ensure the material is updated
              console.log("Material found and texture applied:", material);
            }
          }
        });
      }
    });
  };

  // Call the function to traverse materials after the model is loaded
  useEffect(() => {
    traverseMaterials(model.scene);
    if (!texture) {
      changeCarPaintColor();
    }
  }, [model.scene, forged]);

  useEffect(() => {
    if (!texture) {
      changeCarPaintColor();
    }
  }, [color, forged]);

  return (
    <>
      <mesh>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
}
