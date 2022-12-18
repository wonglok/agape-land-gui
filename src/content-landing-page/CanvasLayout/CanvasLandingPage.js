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
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export function CanvasPage(
  {
    //
  }
) {
  return (
    <>
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
            st.gl.physicallyCorrectLights = true
            st.gl.outputEncoding = sRGBEncoding

            st.gl.shadowMap.enabled = false
          },
        }}
      >
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
          multisampling={2}
        >
          <Bloom
            mipmapBlur
            radius={0.7}
            intensity={1.5}
            luminanceThreshold={0.2}
          ></Bloom>
        </EffectComposer>

        {/*  */}
      </Canvas>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}
