import { UIContent } from '@/lib/UIContent'
import { GoogleContent } from '@/pages/google'
import { Center, Environment, Text, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Color, sRGBEncoding } from 'three'
import { Core } from '../Core/Core'
import { NYCJourney } from '../NYCJourney/NYCJourey'
import { useLandingPageStore } from './LandingPageStore'

export function CanvasPage({}) {
  let gui = useLandingPageStore((s) => s.gui)
  return (
    <Canvas
      //
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#F08BDC',
      }}
      {...{
        gl: { antialias: false, logarithmicDepthBuffer: false },
        onCreated: (st) => {
          // st.events.connect(document.body)

          st.scene.background = new Color('#F08BDC')
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
          st.gl.shadowMap.enabled = false

          Core.now.canvas = Core.makeAutoNode('canvas')
          for (let kn in st) {
            Core.now.canvas.now[kn] = st[kn]
          }
          st.gl.setAnimationLoop(Core.work)
        },
      }}
    >
      <UIContent>
        <div className='fixed top-0 right-0 z-20 mt-2 mr-2'>
          <img
            onClick={(ev) => {
              ///
              console.log(ev)
              useLandingPageStore.setState({ gui: 'login' })
            }}
            className='h-8 lg:h-12'
            src={`/brand/agape-2.png`}
            alt={'agape town - here we go!'}
          ></img>
        </div>

        {gui === 'login' && (
          <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
            <div className='relative w-full max-w-sm p-2 px-4 bg-white lg:max-w-lg rounded-xl -translate-y-28'>
              <div>AGAPE TOWN</div>
              <div>
                <GoogleContent></GoogleContent>
              </div>

              <div
                onClick={() => {
                  //
                  useLandingPageStore.setState({ gui: '' })
                }}
                className='absolute right-0 p-2 px-4 text-white bg-pink-500 -top-12 rounded-xl'
              >
                Close
              </div>
            </div>
          </div>
        )}
      </UIContent>

      <Suspense
        fallback={
          <UIContent>
            <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
              <img
                className='w-6/12 lg:w-64'
                layout={'responsive'}
                src={`/brand/agape-2.png`}
                alt={'agape town - here we go!'}
              ></img>
            </div>
          </UIContent>
        }
      >
        <Environment
          files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
        ></Environment>
        <NYCJourney></NYCJourney>
      </Suspense>

      <EffectComposer resolutionScale={0.1} disableNormalPass multisampling={4}>
        <Bloom
          mipmapBlur
          radius={0.5}
          intensity={2}
          width={256}
          height={256}
          luminanceThreshold={0.3}
        ></Bloom>
      </EffectComposer>
      {/*  */}
    </Canvas>
  )
}
