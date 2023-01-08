/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Suspense, useRef } from 'react'
import {
  Box,
  Center,
  Environment,
  Hud,
  Loader,
  MeshTransmissionMaterial,
  Text3D,
  useFBX,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useWheel } from '@use-gesture/react'
// import { FrontSide } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { Fog, sRGBEncoding } from 'three'
import { useState } from 'react'
import { AnimationMixer } from 'three'
import { Vector3 } from 'three'
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  SSR,
} from '@react-three/postprocessing'
import { Color } from 'three'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping } from 'three'
import font from '../../public/fonts/Days/Days_Regular.json'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

function Smaller({
  visible = true,
  url = `/rpm/white-armor-lok.glb`,
  gesture = `/rpm/rpm-actions-emoji/yes.fbx`,
}) {
  const glb = useGLTF(url)

  let sc = clone(glb.scene)

  sc.traverse((it) => {
    it.frustumCulled = false
  })

  let {
    animations: [firstAnim],
  } = useFBX(gesture)

  let mixer = new AnimationMixer(sc)
  mixer.clipAction(firstAnim).play()

  let ref = useRef()
  let headCenter = new Vector3()

  useFrame((st, dt) => {
    mixer.update(dt)

    if (visible) {
      sc.getObjectByName('Head').getWorldPosition(headCenter)

      st.camera.position.copy(headCenter)
      st.camera.position.y += 0.045 + 0.04
      st.camera.position.x += 0.025 + 0.01
      st.camera.lookAt(
        st.camera.position.x,
        st.camera.position.y - 0.02,
        st.camera.position.z - 0.1
      )
    }
  })

  return (
    <group visible={visible} rotation={[0, 0.0, 0]} ref={ref}>
      <primitive object={sc}></primitive>
    </group>
  )
}

function CameraZoom() {
  let scene = useThree((s) => s.scene)
  let camera = useThree((s) => s.camera)

  let texture = useTexture(`/places/yo/ma-galaxy.jpg`)
  texture.encoding = sRGBEncoding
  texture.mapping = EquirectangularReflectionMapping

  scene.background = texture
  let move = 1

  useEffect(() => {}, [])

  let [tick, setTick] = useState(0)
  useFrame(({}) => {
    //
    camera.near = 0.01
    camera.far = 2
    camera.fov = move * 110

    camera.updateProjectionMatrix()
    camera.position.z = 0.0
    camera.position.z += move

    move -= (1 / 500) * Math.pow(1.0 / move, move)

    if (move <= 0.15) {
      move = 1
      setTick((s) => s + 1)
    }
  })

  return (
    <>
      <group position={[0.005, 1.505, 0.3]} rotation={[-0.4, 0, 0]} scale={0.1}>
        <Center>
          <Text3D
            bevelEnabled
            bevelThickness={0.2}
            bevelSegments={5}
            bevelSize={0.06}
            bevelOffset={0.001}
            font={font}
            size={1.5}
          >
            AGAPE
            <MeshTransmissionMaterial
              {...{
                transmissionSampler: false,
                samples: 6,
                resolution: 1024,
                transmission: 1,
                roughness: 0.3,
                thickness: 1.5,
                ior: 1.5,
                chromaticAberration: 0.26,
                anisotropy: 0.3,
                distortion: 0.3,
                distortionScale: 0.3,
                temporalDistortion: 0.5,
                attenuationDistance: 0.5,
                attenuationColor: '#ffffff',
                color: '#ffffff',
                bg: '#ffffff',
              }}
              // background={texture}
            ></MeshTransmissionMaterial>
          </Text3D>
        </Center>
      </group>
      <group>
        <group>
          <Smaller
            visible={tick % 5 === 0.0}
            gesture={`/rpm/rpm-actions-emoji/salute.fbx`}
            url={`/scene/2023-01-07-skycity/lok-dune.glb`}
          ></Smaller>
        </group>
        <group>
          <Smaller
            visible={tick % 5 === 1.0}
            gesture={`/rpm/rpm-actions-emoji/head.fbx`}
            url={`/scene/2023-01-07-skycity/lok-jacket.glb`}
          ></Smaller>
        </group>
        <group>
          <Smaller
            visible={tick % 5 === 2.0}
            gesture={`/rpm/rpm-actions-emoji/yes.fbx`}
            url={`/scene/2023-01-07-skycity/lok-groom.glb`}
          ></Smaller>
        </group>
        <group>
          <Smaller
            visible={tick % 5 === 3.0}
            gesture={`/rpm/rpm-actions-emoji/bored.fbx`}
            url={`/scene/2023-01-07-skycity/loklok-space-ava.glb`}
          ></Smaller>
        </group>
        <group>
          <Smaller
            visible={tick % 5 === 4.0}
            gesture={`/rpm/rpm-actions-emoji/sit-1.fbx`}
            url={`/rpm/avatar/default-lok.glb`}
          ></Smaller>
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
        <Environment preset='lobby' blur={0.3}></Environment>
        <ZoomRPM></ZoomRPM>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.5} intensity={0.5} mipmapBlur></Bloom>
          <ChromaticAberration offset={[0.001, 0.0]}></ChromaticAberration>
        </EffectComposer>
      </Canvas>
    </>
  )
}
