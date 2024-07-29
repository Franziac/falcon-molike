import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three';

interface Props {}

export function OldTV(props: Props) {
  const { nodes, materials } = useGLTF('/old-tv.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Mesh_4 as Mesh).geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Mesh_4_1 as Mesh).geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Mesh_4_2 as Mesh).geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Mesh_4_3 as Mesh).geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Mesh_4_4 as Mesh).geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/old-tv.glb')

