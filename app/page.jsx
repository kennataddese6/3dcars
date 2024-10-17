"use client";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera as DreiPerspectiveCamera,
} from "@react-three/drei";
import { TeslaThree } from "@/component/teslathree";
import { LowTeslaThree } from "@/component/lowteslathree";
import { LowCyberTruck } from "@/component/lowcybertruck";
import { TeslaModelY } from "@/component/teslamodely";
import { CyberTruck } from "@/component/cybertruck";
import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import colors from "@/app/colors.json";
import { Suspense } from "react";
import Spinner from "./spinner";
export default function Home() {
  const [color, setColor] = useState("#000");
  const [texture, setTexture] = useState("/K001.png");
  const [option, setOption] = useState(1);
  const [expandBottom, setExpandBottom] = useState(false);
  const [carmodel, setCarModel] = useState("3");
  const [colorIndex, setColorIndex] = useState(0);
  const [quality, setQuality] = useState("low");
  const camRef = useRef();
  const camRefCyberTruck = useRef();
  const camRefModelY = useRef();
  const handleOptionClick = (option) => {
    setOption(option);
    setExpandBottom(true);
  };
  return (
    <>
      <div className="visualContainer d-xl-flex ">
        <div className="modelContainer col-xl-8">
          {quality === "low" ? (
            <>
              {carmodel === "3" ? (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRef}
                        position={[2, 1, 1]}
                      />
                      <LowTeslaThree color={color} texture={texture} />
                      <OrbitControls
                        target={[0, 0, 0]}
                        autoRotate
                        autoRotateSpeed={0.1}
                        camera={camRef.current}
                        minDistance={800}
                        maxDistance={1000}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </>
                </Suspense>
              ) : carmodel === "cybertruck" ? (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRefCyberTruck}
                        position={[2, 1, 1]}
                      />
                      <LowCyberTruck color={color} texture={texture} />
                      <OrbitControls
                        target={[0, 0, 0]}
                        autoRotate
                        autoRotateSpeed={0.1}
                        camera={camRefCyberTruck.current}
                        minDistance={5}
                        maxDistance={7}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </>
                </Suspense>
              ) : (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRefModelY}
                        position={[2, 1, 1]}
                      />
                      <TeslaModelY color={color} texture={texture} />
                      <OrbitControls
                        target={[0, 0, 0]}
                        autoRotate
                        autoRotateSpeed={0.1}
                        camera={camRefModelY.current}
                        minDistance={1}
                        maxDistance={13}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </>
                </Suspense>
              )}
            </>
          ) : (
            <>
              {carmodel === "3" ? (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRef}
                        position={[2, 1, 1]}
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
                  </>
                </Suspense>
              ) : carmodel === "cybertruck" ? (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRefCyberTruck}
                        position={[2, 1, 1]}
                      />
                      <CyberTruck color={color} texture={texture} />
                      <OrbitControls
                        target={[0, 0, 0]}
                        autoRotate
                        autoRotateSpeed={0.1}
                        camera={camRefCyberTruck.current}
                        minDistance={5}
                        maxDistance={7}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </>
                </Suspense>
              ) : (
                <Suspense fallback={<Spinner />}>
                  <>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                      <DreiPerspectiveCamera
                        makeDefault
                        ref={camRefModelY}
                        position={[2, 1, 1]}
                      />
                      <TeslaModelY color={color} texture={texture} />
                      <OrbitControls
                        target={[0, 0, 0]}
                        autoRotate
                        autoRotateSpeed={0.1}
                        camera={camRefModelY.current}
                        minDistance={1}
                        maxDistance={3}
                        maxPolarAngle={Math.PI / 2}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </>
                </Suspense>
              )}
            </>
          )}
        </div>
        <div
          className={expandBottom ? "mobilemenuContainer" : ""}
          onClick={() => {
            setExpandBottom(false);
          }}
        >
          <div
            className={`d-xl-none  ${
              expandBottom ? "mobileMenuActive" : "mobileMenu"
            }`}
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
                  <div
                    className={`carmodelContainer ${
                      carmodel === "3" ? "carmodelContainerActive" : ""
                    }`}
                    onClick={() => {
                      setCarModel("3");
                      setExpandBottom(false);
                    }}
                  >
                    Tesla Model 3
                  </div>
                  <div
                    className={`carmodelContainer ${
                      carmodel === "cybertruck" ? "carmodelContainerActive" : ""
                    }`}
                    onClick={() => {
                      setCarModel("cybertruck");
                      setExpandBottom(false);
                    }}
                  >
                    Tesla Cybertruck
                  </div>
                  {quality === "low" ? (
                    ""
                  ) : (
                    <div
                      className={`carmodelContainer ${
                        carmodel === "teslamodely"
                          ? "carmodelContainerActive"
                          : ""
                      }`}
                      onClick={() => {
                        setCarModel("teslamodely");
                        setExpandBottom(false);
                      }}
                    >
                      Tesla Model y
                    </div>
                  )}
                  <p className="text-secondary center-text">
                    Select model quality
                  </p>
                  <div className="d-flex justify-content-around flex-wrap">
                    <div
                      className={`qualityselection ${
                        quality === "low" ? "qualityselected" : ""
                      }`}
                      onClick={() => setQuality("low")}
                    >{`Low quality <1mb`}</div>
                    <div
                      className={`qualityselection ${
                        quality === "high" ? "qualityselected" : ""
                      }`}
                      onClick={() => setQuality("high")}
                    >{`High quality >20mb`}</div>
                  </div>
                </>
              ) : option === 2 ? (
                <>
                  <p className="text-secondary">Color</p>
                  <div className="d-flex flex-wrap">
                    {colors.map((colour, index) => (
                      <div
                        key={index}
                        className={`colorpicker ${
                          colorIndex === index ? "colorpickeractive" : ""
                        }`}
                        style={{ backgroundColor: `#${colour.color}` }}
                        onClick={() => {
                          setColor(`#${colour.color}`);
                          setTexture(`${colour.texture}`);
                          setColorIndex(index);
                          setExpandBottom(false);
                        }}
                      >
                        <Image
                          src={colour.texture}
                          alt="textue"
                          width={40}
                          height={40}
                          className="circleborder"
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>option 3</>
              )}
            </div>
          </div>
        </div>
        <div className="colorChoiceContainer d-none d-xl-block ">
          <div>
            <div className="menuContainerDesktop">
              <div
                className={option === 1 ? "menuItemActive1" : "memu1"}
                onClick={() => {
                  setOption(1);
                }}
              >
                Select Model
              </div>
              <div
                className={option === 2 ? "menuItemActive2" : ""}
                onClick={() => {
                  setOption(2);
                }}
              >
                Choose Color
              </div>
              <div
                className={option === 3 ? "menuItemActive3" : "menu3"}
                onClick={() => {
                  setOption(3);
                }}
              >
                Review
              </div>
            </div>
          </div>
          {option === 1 ? (
            <>
              {" "}
              <div
                className={`carmodelContainer ${
                  carmodel === "3" ? "carmodelContainerActive" : ""
                }`}
                onClick={() => setCarModel("3")}
              >
                Tesla Model 3
              </div>
              <div
                className={`carmodelContainer ${
                  carmodel === "cybertruck" ? "carmodelContainerActive" : ""
                }`}
                onClick={() => setCarModel("cybertruck")}
              >
                Tesla Cybertruck
              </div>
              {quality === "low" ? (
                ""
              ) : (
                <div
                  className={`carmodelContainer ${
                    carmodel === "teslamodely" ? "carmodelContainerActive" : ""
                  }`}
                  onClick={() => setCarModel("teslamodely")}
                >
                  Tesla Model y
                </div>
              )}
              <p className="text-secondary center-text">Select model quality</p>
              <div className="d-flex justify-content-around flex-wrap">
                <div
                  className={`qualityselection ${
                    quality === "low" ? "qualityselected" : ""
                  }`}
                  onClick={() => setQuality("low")}
                >{`Low quality <1mb`}</div>
                <div
                  className={`qualityselection ${
                    quality === "high" ? "qualityselected" : ""
                  }`}
                  onClick={() => setQuality("high")}
                >{`High quality >20mb`}</div>
              </div>
            </>
          ) : option === 2 ? (
            <>
              <p className="text-secondary">Color</p>
              <div className="d-flex flex-wrap">
                {colors.map((colour, index) => (
                  <div
                    key={index}
                    className={`colorpicker ${
                      colorIndex === index ? "colorpickeractive" : ""
                    }`}
                    style={{ backgroundColor: `#${colour.color}` }}
                    onClick={() => {
                      setColor(`#${colour.color}`);
                      setTexture(`${colour.texture}`);
                      setColorIndex(index);
                    }}
                  >
                    <Image
                      src={colour.texture}
                      alt="textue"
                      width={40}
                      height={40}
                      className="circleborder"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>option 3</>
          )}
        </div>
      </div>
    </>
  );
}
