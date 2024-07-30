"use client";
import { OrbitControls, Environment } from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
export default function Home() {
  const [color, setColor] = useState("red");
  return (
    <>
      <div className="visualContainer">
        <div className="modelContainer">
          <Canvas>
            <TeslaThree color={color} />
            <OrbitControls minDistance={15} maxDistance={50} />
            <Environment preset="sunset" />
          </Canvas>
        </div>
        <div className="colorChoiceContainer">
          <h1 className="center-text">Choose a color below</h1>
          <ul>
            <li style={{ color: "green" }} onClick={() => setColor("green")}>
              Green
            </li>
            <li style={{ color: "yellow" }} onClick={() => setColor("yellow")}>
              Yellow
            </li>
            <li style={{ color: "red" }} onClick={() => setColor("red")}>
              Red
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
