import { MixMat } from '@/substance-painter/MixMat/MixMat'
import {
  Box,
  Environment,
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
    </div>
  )
}

function Content() {
  let glb1 = useGLTF(`/material/denim_fabric_2k.gltf/denim_fabric_2k.gltf`)
  let glb2 = useGLTF(
    `/material/fabric_pattern_07_2k.gltf/fabric_pattern_07_2k.gltf`
  )

  let mat1 = false
  glb1.scene.traverse((it) => {
    if (it.material && !mat1) {
      mat1 = it.material
    }
  })
  //
  let mat2 = false
  glb2.scene.traverse((it) => {
    if (it.material && !mat2) {
      mat2 = it.material
    }
  })
  //
  return (
    <group>
      {glb1.scene && glb2.scene && (
        <Sphere args={[10, 64, 64]}>
          <MixMat attach='material' mat1={mat1} mat2={mat2}></MixMat>
        </Sphere>
      )}
    </group>
  )
}
