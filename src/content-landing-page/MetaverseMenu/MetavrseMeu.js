/* eslint-disable jsx-a11y/alt-text */
import { Hud, Image, PerspectiveCamera as DPC } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
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
  const cameraOffset = camera.position.z
  if (depth < cameraOffset) depth -= cameraOffset
  else depth += cameraOffset

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

  let viewport = useThree((s) => s.viewport)

  let camera = useMemo(() => {
    let pc = new PerspectiveCamera(65, viewport.aspect, 0.1, 1000)
    pc.updateProjectionMatrix()
    return pc
  }, [viewport.aspect])

  return (
    <>
      <Hud renderPriority={5}>
        <Suspense fallback={null}>
          <DPC makeDefault fov={65} position={[0, 0, 10]}></DPC>

          <group
            position={[
              visibleWidthAtZDepth(10, camera) / 2 + -0.7,
              visibleHeightAtZDepth(10, camera) / 2 + -0.7,
              0,
            ]}
          >
            <Image
              url={`/hud/menu.png`}
              transparent={true}
              scale={[0.7, 0.7]}
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
        </Suspense>
      </Hud>
    </>
  )
}
