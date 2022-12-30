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
import {
  VRButton,
  XRButton,
  Controllers,
  useController,
  ARButton,
  XR,
  useXR,
} from '@react-three/xr'
import { useMemo } from 'react'
import {
  Color,
  EquirectangularReflectionMapping,
  MeshPhysicalMaterial,
  Object3D,
  sRGBEncoding,
} from 'three'
import { MeshBasicMaterial, Vector3 } from 'three140'
import { useSnapshot } from 'valtio'

export default function VR() {
  // let gs = useSnapshot(GateState)
  return (
    <>
      {/* <XRButton mode='AR'></XRButton> */}
      <Canvas gl={{ antialias: true }}>
        <XR referenceSpace='local'>
          {/* <XRContent> */}
          <Content></Content>
          {/* </XRContent> */}
        </XR>
      </Canvas>
      <ARButton></ARButton>

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

  // let apartment = useEnvironment({ preset: 'apartment' })
  // apartment.encoding = sRGBEncoding

  // let tex = useTexture(`/env/yoyo.jpg`)
  // // let scene = useThree((s) => s.scene)
  // tex.mapping = EquirectangularReflectionMapping
  // tex.encoding = sRGBEncoding
  // scene.environment = tex

  // let sesison = useXR((s) => s.session)
  // if (sesison) {
  //   scene.background = null
  // } else {
  //   scene.background = tex
  // }

  glb.scene.traverse((it) => {
    if (it.name === 'Plane') {
      it.visible = false
    }
    if (it.material) {
      if (!it.userData.oMat) {
        it.userData.oMat = it.material.clone()
      }
      // it.material = new MeshPhysicalMaterial({
      //   map: it.userData.oMat.map,
      //   emissive: new Color('#ffffff'),
      //   emissiveMap: it.userData.oMat.map,
      //   emissiveIntensity: 0.2,
      //   roughness: 1,
      //   roughnessMap: it.userData.oMat.roughnessMap,
      //   metalnessMap: it.userData.oMat.metalnessMap,
      //   transmission: 1.1,
      //   ior: 1.3,
      //   thickness: 1,
      //   transparent: true,
      //   opacity: 1,
      // })
      // it.material.envMap = apartment
      it.material.envMapIntensity = 2.5
    }
  })

  let right = useController('right')

  let ribbon = useMemo(() => {
    return new Object3D()
  }, [])

  ribbon.name = 'rightctrl'

  let base = new Vector3()

  let diff = new Vector3()
  //
  useFrame(({ camera }) => {
    if (right) {
      right.controller.getWorldPosition(base)
      diff.set(0, 0, -5).applyQuaternion(right.controller.quaternion)
      base.add(diff)
      ribbon.position.lerp(base, 0.1)
    }
  })

  return (
    <group>
      <NoodleEmitter nameToChase={'rightctrl'}></NoodleEmitter>

      <primitive object={ribbon}></primitive>
      {/* {right &&
        createPortal(<group position={[0, 0, -6]}></group>, right.controller)} */}

      <Environment preset='night'></Environment>

      <Controllers
        hideRaysOnBlur={false}
        rayMaterial={new MeshBasicMaterial({ color: new Color('#ffffff') })}
      />

      <group position={[0, -1, 0]} scale={0.25}>
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}
