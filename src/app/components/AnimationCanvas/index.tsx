'use client'
import { Canvas } from "@react-three/fiber";
import { OldTV } from "./OldTV";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Experience from "./Experience";
export default function AnimationCanvas(props){
  return (
    <Canvas className="h-screen" orthographic camera={{ zoom: 10, position: [0, 0, 100], near:50, far: 150}}>
      <Suspense>
        <Physics>
          <Experience/>
        </Physics>
      </Suspense>
    </Canvas>
  );
};
