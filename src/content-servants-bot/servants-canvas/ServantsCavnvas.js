/* eslint-disable @next/next/no-img-element */
import { Canvas, useThree } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { Gate } from '@/content-landing-page/LoginContentGate/Gate'
import { LoadingGroup } from '@/content-landing-page/LoginContentGate/LoadingGroup'
import { MetaverseWelcome } from '@/content-landing-page/MetaverseWelcome/MetaverseWelcome'
import { LandingContent } from '@/content-landing-page/CanvasLayout/LandingContent'
import {
  LogintButtons,
  MenuLayout,
} from '@/content-landing-page/MetaverseMenu/MetavrseMeu'
import { Box, MapControls, OrbitControls } from '@react-three/drei'
import { BackgroundColor } from '@/content-landing-page/NYCJourney/BackgroundColor'
import { useCallback, useEffect } from 'react'
import { ServantState } from './ServantState'
import { Vector2 } from 'three140'
import { Plane, Vector3 } from 'three'

export function ServantsCanvas(
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
        }}
        onCreated={(st) => {}}
      >
        {/*  */}

        <Gate
          //
          loadingContent={
            <>
              <LoadingGroup />
            </>
          }
          //
          loggedInContent={
            <>
              <ControlsContent></ControlsContent>
            </>
          }
          //
          landingContent={
            <>
              <MenuLayout center={<LogintButtons></LogintButtons>}></MenuLayout>
            </>
          }
        ></Gate>

        {/*  */}
      </Canvas>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}

// LET THERE BE LIGHT of GOD's love
// LET's SERVE ONE ANOTHER WITH CHRIST JESUS IN AGAPE.

function ControlsContent() {
  // let ss = useSnapshot(ServantState)

  let controls = useThree((s) => s.controls)
  let camera = useThree((s) => s.camera)
  let reset = useCallback(() => {
    if (!controls) {
      return
    }
    controls.object.position.set(0, 20, 0)
    controls.object.lookAt(0, 0, 0)
    controls.object.rotation.set(0, 0, 0, 'XYZ')
  }, [controls])

  useEffect(() => {
    reset()
    return () => {
      reset()
    }
  }, [reset, camera, controls])

  let restoreControls = () => {
    if (controls) {
      controls.enabled = false
    }
  }
  let onCancel = () => {
    ServantState.hand = false
    restoreControls()
  }
  return (
    <>
      <Box
        onPointerMove={(ev) => {
          //
          if (ServantState.hand) {
            ServantState.hand.ds.copy(ev.point).sub(ServantState.hand.ts)
            ServantState.hand.ts.copy(ev.point)
            ServantState.hand.mesh.position.add(ServantState.hand.ds)
            console.log(ServantState.hand)
            // ServantState.hand.ds.copy(ev.)
          }
        }}
        onPointerUp={() => {
          //
          onCancel()
        }}
        onPointerCancel={() => {
          onCancel()
          //
        }}
        onBlur={() => {
          onCancel()
          //
        }}
        args={[1000, 0.1, 1000]}
        visible={false}
      ></Box>

      <BackgroundColor color='#00ffff' />
      {/*  */}

      <Box
        onPointerUp={() => {
          //
          onCancel()
        }}
        onPointerDown={(ev) => {
          //
          ServantState.hand = {
            mesh: ev.object,
            data: {
              myData: 1123,
            },
            ts: new Vector3(ev.point.x, 0, ev.point.z),
            ds: new Vector3(0, 0, 0),
          }
          if (controls) {
            controls.enabled = false
          }
        }}
        args={[1, 0.1, 1]}
      ></Box>

      {/*  */}
      <MapControls
        panSpeed={1.1}
        enableDamping={false}
        enableRotate={false}
        enableZoom={true}
        makeDefault
      ></MapControls>

      <gridHelper args={[100, 100, 0xffffff, 0xffff00]}></gridHelper>

      <EffectComposer disableNormalPass resolutionScale={0.1} multisampling={2}>
        <Bloom
          mipmapBlur
          radius={0.7}
          intensity={1.5}
          luminanceThreshold={0.2}
        ></Bloom>
      </EffectComposer>
    </>
  )
}
