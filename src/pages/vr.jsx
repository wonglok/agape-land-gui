import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { XRContent } from '@/content-landing-page/MetaverseWelcome/XRUserControls'
import {
  Environment,
  Lightformer,
  useEnvironment,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { VRButton } from '@react-three/xr'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'
import { useSnapshot } from 'valtio'

export default function VR() {
  let gs = useSnapshot(GateState)
  return (
    <>
      <Canvas gl={{ antialias: true }}>
        <Content></Content>
      </Canvas>
      {gs.supportVR && <VRButton></VRButton>}
    </>
  )
}

function Content() {
  let glb = useGLTF(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)
  let tex = useTexture(`/env/yoyo.jpg`)
  let scene = useThree((s) => s.scene)
  tex.mapping = EquirectangularReflectionMapping
  tex.encoding = sRGBEncoding
  scene.environment = tex
  scene.background = tex

  glb.scene.traverse((it) => {
    if (it.material) {
      it.material.envMapIntensity = 3.5
    }
  })
  return (
    <group>
      <XRContent>
        {/**/}
        <primitive object={glb.scene}></primitive>
      </XRContent>
    </group>
  )
}
