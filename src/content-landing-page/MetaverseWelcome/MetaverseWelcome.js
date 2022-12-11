import { UIContent } from '@/lib/UIContent'
import { Box } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { TheVortex } from '../TheVortex/TheVortex'

export function MetaverseWelcome() {
  return (
    <group>
      <Suspense
        fallback={
          <group>
            <LoadingGroup />
          </group>
        }
      >
        <group scale={0.05}>
          <theVortex key={TheVortex.key}></theVortex>
        </group>

        <EffectComposer
          resolutionScale={0.1}
          disableNormalPass
          renderPriority={3}
          multisampling={2}
        >
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
      </Suspense>

      {/* <Box></Box> */}
    </group>
  )
}
