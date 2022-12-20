/* eslint-disable jsx-a11y/alt-text */
import { WalkerState } from '@/lib/walker/WalkerState'
import { Image, PerspectiveCamera as DPC, Icosahedron } from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
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
import { CoreReady } from '../Core/Core'
import { Noodle } from '@/content-vfx/Noodle/Noodle'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
import { Perf } from 'r3f-perf'

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
  return (
    <>
      <CoreReady></CoreReady>

      <group>
        <Noodle chaseName='bb00'></Noodle>
      </group>

      <MenuLayout
        topRight={
          <Suspense fallback={<LoadingGroup />}>
            {
              <>
                <group scale={1}>
                  <Icosahedron
                    onPointerDown={() => {
                      //
                      GateState.menuOverlay = !GateState.menuOverlay
                    }}
                    args={[0.13, 1]}
                  >
                    <meshPhysicalMaterial
                      metalness={0}
                      roughness={0}
                      emissive={`#DD8556`}
                      emissiveIntensity={0.0}
                      envMapIntensity={0}
                      attenuationColor={`#DD8556`}
                      transmission={8}
                      thickness={0.11 * 5}
                      ior={1.4}
                      flatShading={true}
                    ></meshPhysicalMaterial>
                  </Icosahedron>
                </group>
              </>
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
  let cameraProxy = useMemo(() => {
    return new PerspectiveCamera(45, 1, 0.1, 100)
  }, [])

  let { wp, wq } = useMemo(() => {
    let wp = new Vector3().copy(camera.position)
    let wq = new Quaternion()

    return {
      wp,
      wq,
    }
  }, [camera])

  useFrame(() => {
    camera.getWorldPosition(wp)
    camera.getWorldQuaternion(wq)

    cameraProxy.position.lerp(wp, 0.07)
    cameraProxy.quaternion.slerp(wq, 0.07)

    let adder = 0
    if (size.width < size.height) {
      adder += 15
    }
    camera.fov = 60 + adder
    camera.updateProjectionMatrix()

    if (gps.current) {
      gps.current.position.fromArray([
        //
        (visibleWidthAtZDepth(2, camera) / 2) * 1.0 - 0.3,
        (visibleHeightAtZDepth(2, camera) / 2) * 1.0 - 0.3,
        5,
      ])
      gps.current.lookAt(cameraProxy.position)
    }
    //
  })

  return (
    <>
      {createPortal(
        <group position={[0, 0, -7]}>
          <group name='chaser-menu' ref={gps}>
            <group name='bb00'></group>
            {topRight}
          </group>
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
