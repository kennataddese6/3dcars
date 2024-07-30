"use client";
import { OrbitControls, Environment } from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
export default function Home() {
  const [color, setColor] = useState("#800080");
  return (
    <>
      <div className="visualContainer">
        <input
          type="color"
          id="grad-input-4"
          className="color-input"
          name="favcolor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <div
          id="custom-input-4"
          className="custom"
          style={{ backgroundColor: color }}
        />
        <div className="modelContainer">
          <Canvas>
            <TeslaThree color={color} />
            <OrbitControls minDistance={15} maxDistance={50} />
            <Environment preset="sunset" />
          </Canvas>
        </div>
      </div>
    </>
  );
}
