'use client'
import { Canvas } from "@react-three/fiber";
import { OldTV } from "./OldTV";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import Experience from "./Experience";
interface Props {}

export default function AnimationCanvas(props: Props){
  return (
    <Canvas className="h-screen" orthographic camera={{ zoom: 10, position: [0, 0, 100], near:10, far: 190}}>
      <Suspense>
        <Physics>
          <Experience/>
        </Physics>
      </Suspense>
    </Canvas>
  );
};
