/* eslint-disable jsx-a11y/alt-text */
import { WalkerState } from '@/lib/walker/WalkerState'
import {
  Hud,
  Image,
  PerspectiveCamera as DPC,
  useAspect,
} from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { VRButton } from '@react-three/xr'
import { Suspense, useMemo, useRef } from 'react'
import { PerspectiveCamera, Quaternion } from 'three'
import { useSnapshot } from 'valtio'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  signOut,
} from '../LoginContentGate/GateMethods'
import { GateState } from '../LoginContentGate/GateState'
import { Vector3 } from 'three140'

//  createPortal, useFrame,
// import { useThree } from '@react-three/fiber'
// import { PerspectiveCamera } from 'three'
const visibleHeightAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  // const cameraOffset = depth // camera.position.z * 0.0
  // if (depth < cameraOffset) depth -= cameraOffset
  // else depth += cameraOffset

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
}

const visibleWidthAtZDepth = (depth, camera) => {
  const height = visibleHeightAtZDepth(depth, camera)
  return height * camera.aspect
}

export function MetaverseMenu() {
  let gs = useSnapshot(GateState)

  return (
    <>
      <MenuLayout
        topRight={
          <Suspense fallback={null}>
            {
              <Image
                url={`/hud/menu.png`}
                transparent={true}
                scale={[0.3, 0.3]}
                onPointerDown={() => {
                  GateState.menuOverlay = !GateState.menuOverlay
                }}
              ></Image>
            }
          </Suspense>
        }
        center={
          <>
            <group>
              <LogintButtons></LogintButtons>
            </group>
          </>
        }
      ></MenuLayout>
    </>
  )
}

export function MenuLayout({ center, topRight }) {
  let camera = useThree((s) => s.camera)
  let gps = useRef()
  let size = useThree((s) => s.size)
  let cameraProxy = camera.clone()
  let wp = new Vector3()
  let wq = new Quaternion()
  useFrame(({ scene }) => {
    let adder = 0
    if (size.width < size.height) {
      adder += 15
    }
    camera.fov = 60 + adder
    camera.updateProjectionMatrix()

    if (gps.current) {
      gps.current.position.fromArray([
        //
        (visibleWidthAtZDepth(2, camera) / 2) * 1.0 - 0.23,
        (visibleHeightAtZDepth(2, camera) / 2) * 1.0 - 0.23,
        5,
      ])
    }

    camera.getWorldPosition(wp)
    camera.getWorldQuaternion(wq)

    cameraProxy.position.lerp(wp, 0.1)
    cameraProxy.quaternion.slerp(wq, 0.1)
  })

  return (
    <>
      {createPortal(
        <group position={[0, 0, -7]}>
          <group ref={gps}>{topRight}</group>
          {center}
        </group>,
        cameraProxy
      )}
      <primitive object={cameraProxy}></primitive>
    </>
  )
}

export function LogintButtons() {
  let gate = useSnapshot(GateState)
  return (
    <>
      {gate.menuOverlay && (
        <Suspense fallback={null}>
          {
            <>
              {gate.userSession && (
                <>
                  <Image
                    position={[0, 0.0, 0]}
                    scale={[2.39, 0.61]}
                    transparent={true}
                    url={`/hud/login-logout.png`}
                    onPointerDown={() => {
                      //
                      signOut()
                    }}
                  ></Image>
                </>
              )}

              {!gate.userSession && (
                <>
                  <Image
                    position={[0, 0.61 * 1.1, 0]}
                    scale={[2.39, 0.61]}
                    transparent={true}
                    url={`/hud/login-google.png`}
                    onPointerDown={() => {
                      //
                      loginGoogle()
                      //
                    }}
                  ></Image>

                  {gate.supportEth && (
                    <Image
                      position={[0, 0.0, 0]}
                      scale={[2.39, 0.61]}
                      transparent={true}
                      url={`/hud/login-metamask.png`}
                      onPointerDown={() => {
                        //
                        loginEth()
                        //
                      }}
                    ></Image>
                  )}

                  <Image
                    position={[0, -0.61 * 1.1, 0]}
                    scale={[2.39, 0.61]}
                    transparent={true}
                    url={`/hud/login-guest.png`}
                    onPointerDown={() => {
                      //
                      loginGuest()
                      //
                    }}
                  ></Image>
                </>
              )}
            </>
          }
        </Suspense>
      )}
    </>
  )
}
