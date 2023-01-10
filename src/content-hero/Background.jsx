import { useTexture } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
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

  scene.background = texture

  return <></>
}
