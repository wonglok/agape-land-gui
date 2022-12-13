import { Collider } from '@/lib/collider/Collider'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { UIContent } from '@/lib/UIContent'
import { Walker } from '@/lib/walker/Walker'
import { Box, Environment, OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { TheVortex } from '../TheVortex/TheVortex'

export function MetaverseWelcome() {
  let glb = useGLBLoader(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)
  return (
    <group>
      {/* <LoadingGroup></LoadingGroup> */}

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
              ></Walker>
              <primitive object={glb.scene}></primitive>
            </group>
          )
        }}
      ></Collider>

      <Environment
        files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
      ></Environment>

      <EffectComposer resolutionScale={0.1} disableNormalPass multisampling={2}>
        <Bloom
          mipmapBlur
          radius={0.5}
          intensity={2}
          width={256}
          height={256}
          luminanceThreshold={0.3}
        ></Bloom>
      </EffectComposer>

      <BackgroundColor color='#000000'></BackgroundColor>

      {/* <Box></Box> */}
    </group>
  )
}
