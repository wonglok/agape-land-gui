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
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { VRButton, XRButton, Controllers, useController } from '@react-three/xr'
import { useMemo } from 'react'
import {
  Color,
  EquirectangularReflectionMapping,
  Object3D,
  sRGBEncoding,
} from 'three'
import { MeshBasicMaterial } from 'three140'
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
  let glb = useGLTF(`/xr/upsacel4x/4k-querlo-webp.glb`)

  let tex = useTexture(`/env/yoyo.jpg`)
  // let scene = useThree((s) => s.scene)
  tex.mapping = EquirectangularReflectionMapping
  tex.encoding = sRGBEncoding
  // scene.environment = tex
  // scene.background = tex

  glb.scene.traverse((it) => {
    if (it.material) {
      it.material.envMapIntensity = 0.4
    }
  })

  let right = useController('right')

  let ribbon = useMemo(() => {
    return new Object3D()
  }, [])

  ribbon.name = 'rightctrl'

  useFrame(() => {
    if (right) {
      right.controller.getWorldPosition(ribbon.position)
    }
  })

  return (
    <group>
      {/* <NoodleEmitter nameToChase={'rightctrl'}></NoodleEmitter> */}

      {right &&
        createPortal(
          <group position={[0, 0, -6]}>
            <primitive object={ribbon}></primitive>
          </group>,
          right.controller
        )}

      <Environment preset='apartment'></Environment>

      <Controllers
        hideRaysOnBlur={false}
        rayMaterial={new MeshBasicMaterial({ color: new Color('#ffffff') })}
      />

      <group position={[0, -2, 0]}>
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}
