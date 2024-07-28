'use client';
import { OrbitControls, Environment } from '@react-three/drei';
import { TeslaThree } from '@/component/teslathree';
import { Canvas } from '@react-three/fiber';
export default function Home() {
  return (
    <>
      <div style={{ backgroundColor: 'white', width: '100%', height: '100vh' }}>
        <Canvas>
          <TeslaThree />
          <OrbitControls minDistance={25} maxDistance={50} />
          <Environment preset="sunset" />
        </Canvas>
      </div>
    </>
  );
}
