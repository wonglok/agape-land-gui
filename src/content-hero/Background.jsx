import { Sphere, useTexture } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { DoubleSide, Fog } from 'three'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'

export function Background() {
  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)

  camera.far = 3000
  camera.near = 3
  camera.updateProjectionMatrix()

  let texture = useTexture(`/places/yo/ma-galaxy.jpg`)
  texture.encoding = sRGBEncoding
  texture.mapping = EquirectangularReflectionMapping

  // scene.background = texture

  return (
    <>
      <Sphere rotation={[-0.65, 2, 0]} args={[1700, 50, 50]}>
        <meshBasicMaterial side={DoubleSide} map={texture}></meshBasicMaterial>
      </Sphere>
    </>
  )
}
