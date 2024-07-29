'use client';
import { useRef, useEffect } from 'react';
import { extend, useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Box, Plane } from '@react-three/drei';
import { OldTV } from "./OldTV";
import * as THREE from 'three';
import { randInt } from 'three/src/math/MathUtils.js';

export default function Experience()
{
    const rigidBody = useRef<RapierRigidBody>(null);

    const xSize = 0.90;
    const ySize = 0.90;

    const left = useRef<RapierRigidBody>(null);
    const right = useRef<RapierRigidBody>(null);
    const bottom = useRef<RapierRigidBody>(null);


    var x = 500;
    var y = 500;



    useFrame(state => 
        {
            if(left.current && right.current && bottom.current){
                x = new THREE.Vector3(1, 0, 0).unproject(state.camera).x;
                y = new THREE.Vector3(0, 1, 0).unproject(state.camera).y;
                left.current.setTranslation({x:-x, y: 0, z: 0}, true);
                right.current.setTranslation({x:x, y: 0, z: 0}, true);
                bottom.current.setTranslation({x:0, y: -y, z: 0}, true);
            }
            if (rigidBody.current) {
                var pos = rigidBody.current.translation();
                var normPos = new THREE.Vector3(pos.x, pos.y, pos.z).project(state.camera);
                var vel = rigidBody.current.linvel()
                if((normPos.y < -1.1 && vel.y < 0) || (normPos.x < -1.1 && vel.x < 0) || (normPos.x > 1.1 && vel.x > 0))
                {
                    rigidBody.current.setLinvel({x:-2, y:5, z:0}, true);
                    rigidBody.current.setAngvel({x:0.2, y:0.1, z:0}, true);
                    rigidBody.current.setTranslation({x: x*0.7, y: y*0.7, z: 0}, true);
                }
            }
        });

    return(
        <>
            <ambientLight intensity={10} />
            <RigidBody ref={rigidBody} position={[50, 80, 0]} restitution={2} friction={0} angularDamping={0} linearDamping={0} linearVelocity={[10, 0, 0]} angularVelocity={[0, 0, 0]}>
                <OldTV position={[0, 0, 0]} rotation={[0, 0, 0]} />
            </RigidBody>
            <RigidBody ref={bottom}  type="fixed">
                <Box position={[0, 0, 0]} rotation={[0, 0, 0]} args={[500, 1, 500]} >
                    <meshPhongMaterial color="#ffff" opacity={0} transparent />
                </Box>
            </RigidBody>

            <RigidBody ref={left} type="fixed">
                <Box position={[0, 0, 0]} rotation={[0, 0, 0]} args={[1, 500, 100]} >
                    <meshPhongMaterial color="#ffff" opacity={0} transparent />
                </Box>
            </RigidBody>

            <RigidBody ref={right} type="fixed">
                <Box position={[0, 0, 0]} rotation={[0, 0, 0]} args={[1, 500, 100]} >
                    <meshPhongMaterial color="#ffff" opacity={0} transparent />
                </Box>
            </RigidBody>

            <RigidBody type="fixed">
                <Box position={[0, 0, -50]} rotation={[0, 0, 0]} args={[500, 500, 1]} >
                    <meshPhongMaterial color="#ffff" opacity={0} transparent />

                </Box>
            </RigidBody>

            <RigidBody type="fixed">
                <Box position={[0, 0, 50]} rotation={[0, 0, 0]} args={[500, 500, 1]} >
                    <meshPhongMaterial color="#ffff" opacity={0} transparent />
                </Box>
            </RigidBody>
        </>
    );
}