/* eslint-disable @next/next/no-img-element */
import { Canvas } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
// import { Core } from '../Core/Core'
// import { XR, Controllers, VRButton, useXR } from '@react-three/xr'
// import { useSnapshot } from 'valtio'
// import { GateState } from '../LoginContentGate/GateState'
// import { SupplyXR } from '@/lib/walker/SupplyXR'
// import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { MetaverseIntro } from './MetaverseIntro'
// import { Noodle } from '@/content-vfx/Noodle/Noodle'

export function Introduction(
  {
    //
  }
) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .r3f-perf {
          display: none !important;
        }
        @media (min-width: 1400px) {
          .r3f-perf {
            display: block !important;
          }
        }
      `,
        }}
      ></style>
      {/*  */}
      <Canvas
        //
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#F08BDC',
        }}
        {...{
          gl: { antialias: true, logarithmicDepthBuffer: false },
          onCreated: (st) => {
            //

            st.gl.physicallyCorrectLights = true
            st.gl.outputEncoding = sRGBEncoding

            st.gl.shadowMap.enabled = false
          },
        }}
      >
        {process.env.NODE_ENV === 'development' && (
          <Perf
            showGraph={false}
            minimal={false}
            className='r3f-perf'
            style={{
              right: 'auto',
              top: 'auto',
              left: 0,
              top: 0,
              zIndex: 2000,
            }}
          />
        )}

        {/*  */}
        <MetaverseIntro
          mapURL={`/places/t-mobile/r6-t-mobile--1636713668.glb`}
          online={true}
        ></MetaverseIntro>

        <EffectComposer
          disableNormalPass
          resolutionScale={0.1}
          multisampling={0}
        >
          <Bloom
            mipmapBlur
            radius={0.75}
            intensity={1.2}
            luminanceThreshold={0.7}
          ></Bloom>
        </EffectComposer>
      </Canvas>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}
