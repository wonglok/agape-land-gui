/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef } from 'react'
import { Box, Environment, Loader, useFBX, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useWheel } from '@use-gesture/react'
// import { FrontSide } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { Fog } from 'three'
import { useState } from 'react'
import { AnimationMixer } from 'three'
import { Vector3 } from 'three'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  SSR,
} from '@react-three/postprocessing'
import { Color } from 'three'
import { useEffect } from 'react'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

function Smaller({ url = `/rpm/white-armor-lok.glb` }) {
  const glb = useGLTF(url)

  let sc = clone(glb.scene)

  sc.traverse((it) => {
    it.frustumCulled = false
  })

  let {
    animations: [firstAnim],
  } = useFBX(`/servant/rpm-motion/standing-breathing.fbx`)

  let mixer = new AnimationMixer(sc)
  mixer.clipAction(firstAnim).play()

  let ref = useRef()
  let headCenter = new Vector3()

  useFrame((st, dt) => {
    mixer.update(dt)

    sc.getObjectByName('Head').getWorldPosition(headCenter)

    st.camera.position.fromArray(headCenter.toArray())
    st.camera.position.y += 0.075 * 0.998
    st.camera.position.x += 0.025
    st.camera.lookAt(
      st.camera.position.x,
      st.camera.position.y - 0.02,
      st.camera.position.z - 0.1
    )
  })

  return (
    <group rotation={[0, 0.05, 0]} ref={ref}>
      <primitive object={sc}></primitive>
    </group>
  )
}

function CameraZoom() {
  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)

  let fog = new Fog(0x000000, 0.1, 1)
  scene.background = new Color(0x000000)
  scene.fog = fog
  let move = 1

  useEffect(() => {}, [])

  let [tick, setTick] = useState(0)
  useFrame(({}) => {
    //
    camera.near = 0.01
    camera.far = 2
    camera.fov = move * 130

    fog.near = 0.4
    fog.far = 1.4
    camera.updateProjectionMatrix()
    camera.position.z = 0.0
    camera.position.z += move

    move -= (1 / 300) * Math.pow(1.0 / move, move)

    if (move <= 0.1) {
      move = 1
      setTick((s) => s + 1)
    }
  })

  return (
    <>
      <group>
        <group visible={tick % 4 === 0.0}>
          <Smaller url={`/scene/2023-01-07-skycity/lok-groom.glb`}></Smaller>
        </group>
        <group visible={tick % 4 === 1.0}>
          <Smaller url={`/scene/2023-01-07-skycity/lok-jacket.glb`}></Smaller>
        </group>
        <group visible={tick % 4 === 2.0}>
          <Smaller url={`/scene/2023-01-07-skycity/lok-dune.glb`}></Smaller>
        </group>
        <group visible={tick % 4 === 3.0}>
          <Smaller url={`/rpm/avatar/default-lok.glb`}></Smaller>
        </group>
      </group>
    </>
  )
}

export function ZoomRPM() {
  return (
    <group>
      <CameraZoom></CameraZoom>
    </group>
  )
}

export function Zoom() {
  return (
    <>
      <Canvas gl={{ antialias: true }}>
        <Environment preset='apartment'></Environment>
        <ZoomRPM></ZoomRPM>
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.5} intensity={0.5} mipmapBlur></Bloom>
          <ChromaticAberration offset={[0.001, 0.0]}></ChromaticAberration>
        </EffectComposer>
      </Canvas>
      <Loader></Loader>
    </>
  )
}
