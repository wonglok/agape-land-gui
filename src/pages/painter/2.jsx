import { Mix4Mat } from '@/substance-painter/Mix4Mat/Mix4Mat'
import {
  Box,
  Cone,
  Environment,
  Icosahedron,
  Loader,
  OrbitControls,
  Plane,
  Sphere,
  useGLTF,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function Material() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <Suspense fallback={null}>
          <Content></Content>
          <Environment preset='apartment'></Environment>
          <OrbitControls></OrbitControls>
        </Suspense>

        {/*  */}
        {/*  */}
      </Canvas>
      <Loader></Loader>
    </div>
  )
}

function Content() {
  let glb1 = useGLTF(`/material/denim_fabric_2k.gltf/denim_fabric_2k.gltf`)
  let glb2 = useGLTF(
    `/material/fabric_pattern_07_2k.gltf/fabric_pattern_07_2k.gltf`
  )
  let glb3 = useGLTF(
    `/material/painted_metal_shutter_1k.gltf/painted_metal_shutter_1k.gltf`
  )
  let glb4 = useGLTF(
    `/material/cobblestone_floor_04_1k.gltf/cobblestone_floor_04_1k.gltf`
  )

  let getMat = (glbObject) => {
    let matBucket = false
    glbObject.scene.traverse((it) => {
      if (it.material && !matBucket) {
        matBucket = it.material
      }
    })
    return matBucket
  }

  return (
    <group>
      {glb1.scene && glb2.scene && glb3.scene && glb4.scene && (
        <Icosahedron rotation={[0, Math.PI, 0]} args={[3, 8]}>
          <Mix4Mat
            attach='material'
            mat1={getMat(glb1)}
            mat2={getMat(glb2)}
            mat3={getMat(glb3)}
            mat4={getMat(glb4)}
          ></Mix4Mat>
        </Icosahedron>
      )}
    </group>
  )
}
