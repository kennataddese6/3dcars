"use client";
import { OrbitControls, Environment } from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
export default function Home() {
  return (
    <>
      <div className="visualContainer">
        <div className="modelContainer">
          <Canvas>
            <TeslaThree />
            <OrbitControls minDistance={15} maxDistance={50} />
            <Environment preset="sunset" />
          </Canvas>
        </div>
        <div className="colorChoiceContainer">
          <h1 className="center-text">Choose a color below</h1>
          <ul>
            <li style={{ color: "green" }}>Green</li>
            <li style={{ color: "yellow" }}>Yellow</li>
            <li style={{ color: "red" }}>Red</li>
          </ul>
        </div>
      </div>
    </>
  );
}
