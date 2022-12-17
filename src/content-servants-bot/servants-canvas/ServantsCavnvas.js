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
import { Color, Plane, Vector3 } from 'three'
import { LogicNode, onCancel, onPointerMove } from '../logic-node/LogicNode'
import { LogicBoard } from '../logic-node/LogicBoard'

export function ServantsCanvas(
  {
    //
  }
) {
  return (
    <>
      <Canvas
        //

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
              <LogicBoard></LogicBoard>

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

      <div className=' fixed top-0 right-0 z-10 w-96 h-60'>
        <Canvas onCreated={(st) => {}}>
          <LogicBoard></LogicBoard>

          <ControlsContent></ControlsContent>
        </Canvas>
      </div>

      {/* {gs.xrSession && gs.supportVR && <VRButton></VRButton>} */}
    </>
  )
}

// LET THERE BE LIGHT of GOD's love
// LET's SERVE ONE ANOTHER WITH CHRIST JESUS IN AGAPE

function ControlsContent() {
  // let ss = useSnapshot(ServantState)

  let controls = useThree((s) => s.controls)
  let camera = useThree((s) => s.camera)
  let reset = useCallback(() => {
    if (!controls) {
      return
    }
    controls.object.position.set(0, 20, 0.0)
    controls.target.set(0, 0, 0)
    controls.update()
  }, [controls])

  useEffect(() => {
    reset()
    return () => {
      reset()
    }
  }, [reset, camera, controls])

  //
  return (
    <>
      <MapControls
        panSpeed={1.1}
        enableDamping={false}
        enableRotate={false}
        enableZoom={true}
        makeDefault
      ></MapControls>

      {/*  */}
    </>
  )
}
