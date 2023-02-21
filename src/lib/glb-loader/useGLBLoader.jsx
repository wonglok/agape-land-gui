import { useLoader, useThree } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// import { GLTFLoader } from './GLTFLoader'
import { MyGLTFLoader } from '@/content-hero/Loading/MyGLTFLoader147'

export function useGLBLoader(sceneURL) {
  let glb = useLoader(MyGLTFLoader, sceneURL, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
  })

  window.camera = useThree((s) => s.camera)
  glb.url = sceneURL
  return glb
}
