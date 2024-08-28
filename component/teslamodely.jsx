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

  // Function to create planar UV mapping
  const createPlanarUVs = (geometry) => {
    const position = geometry.attributes.position;
    const uv = new Float32Array(position.count * 2);

    // Compute bounding box
    geometry.computeBoundingBox();
    const { min, max } = geometry.boundingBox;

    // Map UV coordinates based on X and Y positions within the bounding box
    for (let i = 0; i < position.count; i++) {
      const x = (position.getX(i) - min.x) / (max.x - min.x);
      const y = (position.getY(i) - min.y) / (max.y - min.y);
      uv[i * 2] = x;
      uv[i * 2 + 1] = y;
    }

    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
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
            createPlanarUVs(node.geometry);
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
