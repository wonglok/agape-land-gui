import { Environment } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { NYCJourney } from '../NYCJourney/NYCJourey'

export function LandingContent() {
  return (
    <>
      <Environment
        files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
      ></Environment>

      <BackgroundColor color='#F08BDC'></BackgroundColor>

      <NYCJourney></NYCJourney>

      {/* <EffectComposer resolutionScale={0.1} disableNormalPass multisampling={4}>
        <Bloom
          mipmapBlur
          radius={0.5}
          intensity={2}
          width={256}
          height={256}
          luminanceThreshold={0.3}
        ></Bloom>
      </EffectComposer> */}
    </>
  )
}
