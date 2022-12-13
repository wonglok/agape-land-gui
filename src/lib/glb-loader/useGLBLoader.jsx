import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from './GLTFLoader'

export function useGLBLoader(sceneURL) {
  let glb = useLoader(GLTFLoader, sceneURL, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })
  glb.url = sceneURL
  return glb
}
