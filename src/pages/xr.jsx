import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { XRContent } from '@/content-landing-page/MetaverseWelcome/XRUserControls'
import { NoodleEmitter } from '@/content-vfx/NoodleEmitter/NoodleEmitter'
import {
  Environment,
  Lightformer,
  Sphere,
  useEnvironment,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { Canvas, createPortal, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { VRButton, XRButton, Controllers, useController } from '@react-three/xr'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'
import { useSnapshot } from 'valtio'

export default function VR() {
  let gs = useSnapshot(GateState)
  return (
    <>
      <XRButton mode='AR'></XRButton>
      <Canvas gl={{ antialias: true }}>
        <XRContent>
          <Content></Content>
        </XRContent>
      </Canvas>
      {/* {gs.supportAR ? (
        <XRButton></XRButton>
      ) : (
        gs.supportVR && <VRButton></VRButton>
      )} */}
    </>
  )
}

//
function Content() {
  // let glb = useGLTF(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)
  let glb = useGLTF(`/xr/querlo.glb`)

  // let tex = useTexture(`/env/yoyo.jpg`)
  // let scene = useThree((s) => s.scene)
  // tex.mapping = EquirectangularReflectionMapping
  // tex.encoding = sRGBEncoding
  // scene.environment = tex
  // scene.background = tex

  glb.scene.traverse((it) => {
    if (it.material) {
      it.material.envMapIntensity = 1.0
    }
  })

  let right = useController('right')

  return (
    <group>
      <NoodleEmitter nameToChase={'rightctrl'}></NoodleEmitter>
      {right &&
        createPortal(
          <>
            <group position={[0, 1, 0]}>
              <group name={'rightctrl'}></group>
            </group>
          </>,
          right.controller
        )}
      {/**/}

      {right && <primitive object={right.controller}></primitive>}
      <Environment preset='sunset'></Environment>
      {/* <ambientLight />
      <pointLight position={[10, 10, 10]} /> */}
      <Controllers />

      <group position={[0, -2, 0]}>
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}
