import { getID } from '@/lib/getID'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import fragmentShader from './shader/fragmentShader.glsl'
import vertexShader from './shader/vertexShader.glsl'

export function BlobMat({ ...mat }) {
  let time = useMemo(() => {
    return { value: 0 }
  }, [])

  useFrame((st, dt) => {
    time.value = window.performance.now() / 1000
  })

  return (
    <meshPhysicalMaterial
      color={'#ffffff'}
      {...mat}
      onBeforeCompile={(shader) => {
        //
        //
        shader.uniforms.time = time
        //
        shader.vertexShader = vertexShader
        shader.fragmentShader = fragmentShader
        //
        //
      }}
      customProgramCacheKey={() => {
        return vertexShader + fragmentShader
      }}
      key={vertexShader + fragmentShader + getID()}
    ></meshPhysicalMaterial>
  )
}
