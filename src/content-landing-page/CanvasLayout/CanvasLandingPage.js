/* eslint-disable @next/next/no-img-element */
import { Canvas, useFrame } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
import { Core } from '../Core/Core'
import { Gate } from '../LoginContentGate/Gate'
import { MetaverseWelcome } from '../MetaverseWelcome/MetaverseWelcome'
import { LandingContent } from './LandingContent'
import { MetaverseMenu } from '../MetaverseMenu/MetavrseMeu'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
// import { XR, Controllers, VRButton, useXR } from '@react-three/xr'
import { useSnapshot } from 'valtio'
import { GateState } from '../LoginContentGate/GateState'
// import { SupplyXR } from '@/lib/walker/SupplyXR'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'

export function CanvasPage(
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
              top: 250,
              zIndex: 2000,
            }}
          />
        )}

        <MetaverseMenu></MetaverseMenu>

        <Gate
          loadingContent={
            <>
              <LoadingGroup />
            </>
          }
          loggedInContent={
            <>
              <MetaverseWelcome></MetaverseWelcome>
            </>
          }
          landingContent={
            <>
              <LandingContent></LandingContent>
            </>
          }
        ></Gate>

        <EffectComposer
          disableNormalPass
          resolutionScale={0.1}
          multisampling={0}
        >
          <Bloom
            mipmapBlur
            radius={0.7}
            intensity={1.5}
            luminanceThreshold={0.2}
          ></Bloom>
        </EffectComposer>
      </Canvas>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}
