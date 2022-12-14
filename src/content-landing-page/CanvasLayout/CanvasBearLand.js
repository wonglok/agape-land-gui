/* eslint-disable @next/next/no-img-element */
import { Canvas, useFrame } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
// import { Core } from '../Core/Core'
import { Gate } from '../LoginContentGate/Gate'
import { MetaverseWelcome } from '../MetaverseWelcome/MetaverseWelcome'
import { LandingContent } from './LandingContent'
import { MetaverseMenu } from '../MetaverseMenu/MetavrseMeu'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
// import { XR, Controllers, VRButton, useXR } from '@react-three/xr'
// import { useSnapshot } from 'valtio'
// import { GateState } from '../LoginContentGate/GateState'
// import { SupplyXR } from '@/lib/walker/SupplyXR'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Effect } from '../Effects/Effect'
import { Core, CoreReady } from '../Core/Core'
import { Suspense } from 'react'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { AvatarLanding } from '../AvatarLanding/AvatarLanding'
import { AvaZoom } from '../AvatarLanding/AvaZoom'
// import { Noodle } from '@/content-vfx/Noodle/Noodle'

export function CanvasBearLand(
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
        }}
        {...{
          gl: { antialias: true, logarithmicDepthBuffer: false },
          onCreated: (st) => {
            st.gl.physicallyCorrectLights = true
            st.gl.outputEncoding = sRGBEncoding

            Core.now.canvas = Core.makeDisposableNode({ name: 'canvas' }).sub
            for (let kn in st) {
              Core.now.canvas.now[kn] = st[kn]
            }
          },
        }}
      >
        {/* {process.env.NODE_ENV === 'development' && (
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
        )} */}

        {/* <MetaverseMenu></MetaverseMenu> */}
        {/* <MetaverseWelcome></MetaverseWelcome> */}

        <CoreReady></CoreReady>
        <AvatarLanding
          mapURL={`/scene/2023-01-07-skycity/skycity.glb`}
        ></AvatarLanding>
      </Canvas>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}
