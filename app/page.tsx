"use client";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
export default function Home() {
  const [color, setColor] = useState("#000");
  const camRef = useRef();
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
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <PerspectiveCamera makeDefault ref={camRef} position={[2, 1, 4]} />
            <TeslaThree color={color} />
            <OrbitControls
              target={[0, 0, 0]}
              autoRotate
              autoRotateSpeed={0.5}
              camera={camRef.current}
              minDistance={20}
              maxDistance={50}
            />
            <Environment preset="sunset" />
          </Canvas>
        </div>
      </div>
    </>
  );
}
