"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function TeslaModelY({ color, texture }) {
  const model = useGLTF("/teslamodelyhigh.glb");
  const carMaterial = useRef();
  const textureLoader = new THREE.TextureLoader();
  const forgedTexture = textureLoader.load(texture);

  // Correct for gamma/lightness issues
  forgedTexture.encoding = THREE.sRGBEncoding;

  // Ensure the texture does not repeat
  forgedTexture.wrapS = THREE.ClampToEdgeWrapping;
  forgedTexture.wrapT = THREE.ClampToEdgeWrapping;

  // Avoid texture repetition by ensuring UVs are adjusted
  forgedTexture.repeat.set(1, 1); // This should be kept at (1,1) for non-repeating
  forgedTexture.offset.set(0, 0); // Keep offset at (0,0)

  // Min and Mag filters for texture clarity
  forgedTexture.minFilter = THREE.LinearMipMapLinearFilter;
  forgedTexture.magFilter = THREE.LinearFilter;

  // Function to create new UV mapping
  const createNewUVs = (geometry) => {
    // Check if geometry already has UVs
    if (geometry.attributes.uv) {
      // Simply create a new UV array
      const position = geometry.attributes.position;
      const uv = new Float32Array(position.count * 2); // Two UV coordinates per vertex

      for (let i = 0; i < position.count; i++) {
        uv[i * 2] = position.getX(i) % 1; // X coordinate
        uv[i * 2 + 1] = position.getY(i) % 1; // Y coordinate
      }

      geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    }
  };

  // Function to apply the texture or color to the car paint material
  const applyMaterialProperties = () => {
    if (carMaterial.current) {
      if (texture) {
        carMaterial.current.map = forgedTexture; // Apply the texture
        carMaterial.current.color.set("white"); // Ensure the texture color shows up correctly
        carMaterial.current.needsUpdate = true; // Ensure the material is updated
      } else {
        carMaterial.current.map = null; // Remove any existing texture
        carMaterial.current.color.set(color); // Apply the color
        carMaterial.current.needsUpdate = true; // Ensure the material is updated
      }
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
          if (
            material.name.includes("body") &&
            !material.name.includes("glass_body")
          ) {
            carMaterial.current = material;
            // Apply new UV mapping
            createNewUVs(node.geometry);
            applyMaterialProperties(); // Apply texture or color to the material
            console.log("Material found and properties applied:", material);
          }
        });
      }
    });
  };

  // Call the function to traverse materials after the model is loaded
  useEffect(() => {
    traverseMaterials(model.scene);
  }, [model.scene, forgedTexture]);

  // Update material properties when the color or texture changes
  useEffect(() => {
    applyMaterialProperties();
  }, [color, forgedTexture]);

  return (
    <>
      <mesh>
        <primitive object={model.scene} />
      </mesh>
    </>
  );
}
