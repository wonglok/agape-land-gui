import { usePlayAllAnim } from '@/hooks/use-play-all-anim'
import { Collider } from '@/lib/collider/Collider'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
// import { UIContent } from '@/lib/UIContent'
import { Walker } from '@/lib/walker/Walker'
import {
  Box,
  // Box,
  Environment,
  OrbitControls,
  // PerspectiveCamera,
} from '@react-three/drei'
// import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { XR } from '@react-three/xr'
// import { useXR } from '@react-three/xr'
// import { useEffect, useMemo } from 'react'
// import { AnimationMixer } from 'three140'
import { useSnapshot } from 'valtio'
import { GateState } from '../LoginContentGate/GateState'
// import { Suspense } from 'react'
// import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { TheVortex } from '../TheVortex/TheVortex'

export function MetaverseWelcome() {
  let glb = useGLBLoader(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)
  usePlayAllAnim(glb)

  let gs = useSnapshot(GateState)
  return (
    <group>
      {/* <Box args={[100, 100, 100, 100, 100, 100]}>
        <meshStandardMaterial
          emissive={'#ff0000'}
          wireframe={true}
        ></meshStandardMaterial>
      </Box> */}
      <Collider
        scene={glb.scene}
        onReady={(collider) => {
          return (
            <group>
              <group position={[0, 1.5, 0]}>
                <group position={[5.523, 6.087, -14.196]}>
                  <group scale={0.075}>
                    <theVortex key={TheVortex.key}></theVortex>
                  </group>
                </group>
              </group>

              <OrbitControls makeDefault></OrbitControls>

              <Walker
                startAt={[
                  2.563503709126706,
                  1.595614002597168 + 3,
                  45.14220988974003,
                ]}
                name={'NYC'}
                glb={glb}
                collider={collider}
                onGameReady={({ game }) => {
                  //
                }}
              ></Walker>

              <primitive object={glb.scene}></primitive>
            </group>
          )
        }}
      ></Collider>

      <Environment
        files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
      ></Environment>

      {/* {!gs.supportVR && (

      )} */}
      <BackgroundColor color='#000000'></BackgroundColor>

      {/* <Box></Box> */}
    </group>
  )
}
