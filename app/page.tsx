"use client";
import { OrbitControls, Environment } from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
export default function Home() {
  const [color, setColor] = useState("#000");
  return (
    <>
      <div className="visualContainer">
        <div className="colorChoiceContainer">
          <label className="bold-text">Choose your color here</label>
          <div className="colorpicker" style={{ backgroundColor: color }}>
            <input
              type="color"
              className="colorinput"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
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
