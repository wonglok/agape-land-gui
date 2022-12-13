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
import { PerspectiveCamera } from 'three'
import { useSnapshot } from 'valtio'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  signOut,
} from '../LoginContentGate/GateMethods'
import { GateState } from '../LoginContentGate/GateState'

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
  let gate = useSnapshot(GateState)
  let camera = useThree((s) => s.camera)
  let gps = useRef()
  useFrame(({ scene }) => {
    if (gps.current) {
      gps.current.position.fromArray([
        //
        (visibleWidthAtZDepth(5, camera) / 2) * 1.0 - 0.35,
        (visibleHeightAtZDepth(5, camera) / 2) * 1.0 - 0.35,
        // visibleHeightAtZDepth(10, camera) / 2,
        0,
      ])
    }
    if (!scene.children.includes(camera)) {
      scene.add(camera)
    }
  })
  return (
    <>
      {createPortal(
        <group position={[0, 0, -5]}>
          <group ref={gps}>
            <Image
              url={`/hud/menu.png`}
              transparent={true}
              scale={[0.5, 0.5]}
              onPointerDown={async () => {
                GateState.menuOverlay = !GateState.menuOverlay
              }}
            ></Image>
          </group>

          {gate.menuOverlay && (
            <group>
              {gate.session && (
                <>
                  <Image
                    position={[0, 0.0, 0]}
                    scale={[2.39, 0.61]}
                    transparent={true}
                    url={`/hud/login-logout.png`}
                    onPointerDown={() => {
                      //
                      signOut()
                      console.log('out')
                      //
                    }}
                  ></Image>
                </>
              )}
              {!gate.session && (
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

                  {GateState.supportEth && (
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
            </group>
          )}
        </group>,
        camera
      )}
    </>
  )
}
