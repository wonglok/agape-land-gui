import { useLoader, useThree } from '@react-three/fiber'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'
import { EXRLoader } from 'three-stdlib'

export function EXR({ url }) {
  let exr = useLoader(EXRLoader, url)

  let scene = useThree((s) => s.scene)

  exr.mapping = EquirectangularReflectionMapping
  scene.environment = exr
  scene.background = exr
  return null
}
