import { UIContent } from '@/lib/UIContent'
import { Box } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { TheVortex } from '../TheVortex/TheVortex'

export function MetaverseWelcome() {
  return (
    <group>
      <Suspense
        fallback={
          <group>
            <UIContent>
              <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
                <img
                  className='w-6/12 lg:w-64'
                  src={`/brand/agape-2.png`}
                  alt={'agape town - here we go!'}
                ></img>
              </div>
            </UIContent>
          </group>
        }
      >
        <group scale={0.05}>
          <theVortex key={TheVortex.key}></theVortex>
        </group>

        <EffectComposer
          resolutionScale={0.1}
          disableNormalPass
          renderPriority={1}
          multisampling={20}
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
