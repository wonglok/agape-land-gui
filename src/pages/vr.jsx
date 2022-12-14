import {
  Walker,
  XRContent,
} from '@/content-landing-page/MetaverseWelcome/XRUserControls'
import { Environment, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { VRButton } from '@react-three/xr'

export default function VR() {
  return (
    <>
      <Canvas>
        <Content></Content>
      </Canvas>
      <VRButton></VRButton>
    </>
  )
}

function Content() {
  let glb = useGLTF(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)

  return (
    <group>
      <XRContent></XRContent>
      <Environment preset='night'></Environment>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}
