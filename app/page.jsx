"use client";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera as DreiPerspectiveCamera,
} from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { CyberTruck } from "@/component/cybertruck";
import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import colors from "@/app/colors.json";
export default function Home() {
  const [color, setColor] = useState("#000");
  const [texture, setTexture] = useState("");
  const [option, setOption] = useState(1);
  const [expandBottom, setExpandBottom] = useState(false);
  const [carmodel, setCarModel] = useState("3");
  const camRef = useRef();
  const handleOptionClick = (option) => {
    setOption(option);
    setExpandBottom(true);
  };
  return (
    <>
      <div className="visualContainer d-xl-flex ">
        <div className="modelContainer col-xl-9">
          {carmodel === "3" ? (
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <DreiPerspectiveCamera
                makeDefault
                ref={camRef}
                position={[2, 1, 4]}
              />
              <TeslaThree color={color} texture={texture} />
              <OrbitControls
                target={[0, 0, 0]}
                autoRotate
                autoRotateSpeed={0.1}
                camera={camRef.current}
                minDistance={500}
                maxDistance={800}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment preset="sunset" />
            </Canvas>
          ) : (
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <DreiPerspectiveCamera
                makeDefault
                ref={camRef}
                position={[2, 1, 4]}
              />
              <CyberTruck color={color} texture={texture} />
              <OrbitControls
                target={[0, 0, 0]}
                autoRotate
                autoRotateSpeed={0.1}
                camera={camRef.current}
                minDistance={500}
                maxDistance={800}
                maxPolarAngle={Math.PI / 2}
              />
              <Environment preset="sunset" />
            </Canvas>
          )}
        </div>
        <div
          className={expandBottom ? "mobilemenuContainer" : ""}
          onClick={() => {
            setExpandBottom(false);
          }}
        >
          <div
            className="d-xl-none mobileMenu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menuContainer">
              <div
                className={option === 1 ? "menuItemActive1" : ""}
                onClick={() => {
                  handleOptionClick(1);
                }}
              >
                Select Model
              </div>
              <div
                className={option === 2 ? "menuItemActive2" : ""}
                onClick={() => {
                  handleOptionClick(2);
                }}
              >
                Choose Color
              </div>
              <div
                className={option === 3 ? "menuItemActive3" : ""}
                onClick={() => {
                  handleOptionClick(3);
                }}
              >
                Review
              </div>
            </div>
            <div className={expandBottom ? "px-3" : "d-none"}>
              {option === 1 ? (
                <>
                  {" "}
                  <div className="carmodelContainer">Tesla Model Y</div>
                  <div className="carmodelContainer">Tesla Model 3</div>
                  <div
                    className="carmodelContainer"
                    onClick={() => setCarModel("cybertruck")}
                  >
                    Tesla Cybertruck
                  </div>
                </>
              ) : option === 2 ? (
                <>
                  <p className="text-secondary">Color</p>
                  <div className="d-flex flex-wrap">
                    {colors.map((colour, index) => (
                      <div
                        key={index}
                        className="colorpicker"
                        style={{ backgroundColor: `#${colour.color}` }}
                        onClick={() => {
                          setColor(`#${colour.color}`);
                          setTexture(`${colour.texture}`);
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-secondary mt-4">Custom color</p>
                  <div
                    className="colorpicker"
                    style={{ backgroundColor: color }}
                  >
                    <input
                      type="color"
                      className="colorinput"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>option 3</>
              )}
            </div>
          </div>
        </div>
        <div className="colorChoiceContainer d-none d-xl-block">
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
              objectFit="cover"
              className="modelsImage"
            />
            Tesla Model 3
          </div>
          <div
            className="carmodelContainer"
            onClick={() => setCarModel("cybertruck")}
          >
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
