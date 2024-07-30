"use client";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import Image from "next/image";
export default function Home() {
  const [color, setColor] = useState("#000");
  const camRef = useRef();
  return (
    <>
      <div className="visualContainer">
        <div className="modelContainer">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <PerspectiveCamera makeDefault ref={camRef} position={[2, 1, 4]} />
            <TeslaThree color={color} />
            <OrbitControls
              target={[0, 0, 0]}
              autoRotate
              autoRotateSpeed={0.1}
              camera={camRef.current}
              minDistance={20}
              maxDistance={50}
              maxPolarAngle={Math.PI / 2}
            />
            <Environment preset="sunset" />
          </Canvas>
        </div>
        <div className="colorChoiceContainer">
          <label className="bold-text">Choose your car model</label>
          <div className="carmodelContainer">
            <Image
              src={"/tesla3.png"}
              alt="tesla model three"
              width={150}
              height={100}
              className="modelsImage"
            />
            Tesla Model Y
          </div>
          <div className="carmodelContainer">
            <Image
              src={"/teslay.png"}
              alt="tesla model three"
              width={150}
              height={100}
              className="modelsImage"
            />
            Tesla Model 3
          </div>
          <div className="carmodelContainer">
            <Image
              src={"/teslaz.jpg"}
              alt="tesla model three"
              width={150}
              height={100}
              className="modelsImage"
            />
            Tesla Cybertruck
          </div>
          <label className="bold-text">Change color</label>
          <div className="colorPickerContainer">
            <div className="colorpicker" style={{ backgroundColor: color }}>
              <input
                type="color"
                className="colorinput"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <label htmlFor="" className="text-secondary">
              {color}
            </label>
          </div>
          <button className="create-order">Create Order</button>
        </div>
      </div>
    </>
  );
}
