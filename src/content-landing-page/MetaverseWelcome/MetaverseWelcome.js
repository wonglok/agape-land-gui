import { usePlayAllAnim } from '@/hooks/use-play-all-anim'
import { Collider } from '@/lib/collider/Collider'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
// import { UIContent } from '@/lib/UIContent'
import { WalkerGame } from '@/lib/walker/WalkerGame'
import {
  Box,
  // Box,
  Environment,
  OrbitControls,
  useTexture,
  // PerspectiveCamera,
} from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
// import { useXR } from '@react-three/xr'
// import { useEffect, useMemo } from 'react'
// import { AnimationMixer } from 'three140'
import { TheVortex } from '../TheVortex/TheVortex'
import { CoreReady } from '../Core/Core'
import { Mouse3D } from '@/content-vfx/Noodle/Mouse3D'
import { useThree } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import { WalkerState } from '@/lib/walker/WalkerState'
import { Avatar } from '../Avatar/Avatar'
import { AvatarChaser } from '../AvatarChaser/AvatarChaser'
import { Noodle } from '@/content-vfx/Noodle/Noodle'
import { useRouter } from 'next/router'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'

const GameName = 'NYC'

export function MetaverseWelcome({ online = false }) {
  //public
  let router = useRouter()
  let query = router.query
  let glb = useGLBLoader(
    query.t
      ? `/places/t-mobile/r6-t-mobile--1636713668.glb`
      : `/scene/2022-11-28-NYC/NYC_Expo_30.glb`
  )
  // let glb = useGLBLoader(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)
  // let glb = useGLBLoader(`/places/t-mobile/r6-t-mobile--1636713668.glb`)

  //

  let texture = useTexture(`/hdr/studio_hdri_bright.png`)
  let scene = useThree((s) => s.scene)

  if (query.t) {
    texture.mapping = EquirectangularReflectionMapping
    texture.encoding = sRGBEncoding
    scene.environment = texture
    scene.background = texture
  }

  usePlayAllAnim(glb)

  let camera = useThree((s) => s.camera)
  let gl = useThree((s) => s.gl)

  let walk = useSnapshot(WalkerState)

  return (
    <group>
      <CoreReady></CoreReady>
      <Collider
        scene={glb.scene}
        onReady={(collider) => {
          return (
            <group>
              <primitive object={glb.scene}></primitive>
              {/*
              <group position={[0, 1.5, 0]}>
                <group position={[5.523, 6.087, -14.196]}>
                  <group scale={0.075}>
                    <theVortex key={TheVortex.key}></theVortex>
                  </group>
                </group>
              </group> */}

              <OrbitControls
                args={[camera, gl.domElement]}
                makeDefault
              ></OrbitControls>

              <WalkerGame
                startAt={[
                  0, 1.1, 0,
                  // 2.563503709126706,
                  // 1.595614002597168 + 3,
                  // 45.14220988974003,
                ]}
                name={GameName}
                glb={glb}
                collider={collider}
                onGameReady={({ game, core }) => {
                  //
                  WalkerState[GameName] = game
                  WalkerState.current = game
                }}
              ></WalkerGame>

              {/*  */}
              {/*  */}
              <Avatar></Avatar>

              <AvatarChaser collider={collider}></AvatarChaser>

              <group>
                <Mouse3D collider={collider}></Mouse3D>
              </group>
            </group>
          )
        }}
      ></Collider>

      <group>
        <Noodle chaseName='bb00'></Noodle>
      </group>

      {!query.t && (
        <Environment
          files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
        ></Environment>
      )}
      {/* <EXR url={`/hdr/exr/nebula-1k.exr`}></EXR> */}

      {/* <Environment
        // files={`/hdr/studio_hdri_bright.png`}
        // files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
        // files={}
      ></Environment> */}
    </group>
  )
}
