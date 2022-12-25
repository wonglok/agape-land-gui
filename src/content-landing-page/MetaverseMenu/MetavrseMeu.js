/* eslint-disable jsx-a11y/alt-text */
import { WalkerState } from '@/lib/walker/WalkerState'
import {
  Image,
  PerspectiveCamera as DPC,
  Icosahedron,
  Center,
  Text3D,
} from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { PerspectiveCamera, Quaternion } from 'three'
import { useSnapshot } from 'valtio'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  loginGuestLocal,
  signOut,
} from '../LoginContentGate/GateMethods'
import { GateState } from '../LoginContentGate/GateState'
import { Vector3 } from 'three140'
import { CoreReady } from '../Core/Core'
import { Noodle } from '@/content-vfx/Noodle/Noodle'
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'
// import { Perf } from 'r3f-perf'
// import { AvatarChaser } from '../AvatarChaser/AvatarChaser'

import daysFont from '@/../public/fonts/Days/Days_Regular.json'

function TextYo({ text, onPointerDown }) {
  return (
    <group>
      <Center>
        <Text3D
          bevelEnabled
          bevelOffset={-0.01}
          bevelSize={0.05}
          bevelSegments={5}
          font={daysFont}
          letterSpacing={0.1}
          onPointerDown={onPointerDown}
        >
          {text}
          <meshPhysicalMaterial
            transmission={1.3}
            thickness={1.4}
            ior={1.1}
            roughness={1.0}
            metalness={0.0}
            color={'#F08BDC'}
            emissive={'#F08BDC'}
            emissiveIntensity={0.85}
          ></meshPhysicalMaterial>
        </Text3D>
      </Center>
    </group>
  )
}
function Agape() {
  return (
    <group
      position={[0, 1.8, -1]}
      rotation={[0 - 0.0 * Math.PI * 0.5, 0, 0]}
      scale={0.5}
    >
      <TextYo text={`Welcome!`}></TextYo>
    </group>
  )
}

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
  return (
    <>
      <CoreReady></CoreReady>

      <MenuLayout
        topRight={
          <Suspense fallback={<LoadingGroup />}>
            {
              <>
                <group
                  rotation={[0.0, 0.0, 0]}
                  position={[0.0, 0.0, 0.0]}
                  scale={0.05}
                >
                  <group>
                    <Center>
                      <Text3D
                        font={daysFont}
                        onPointerDown={() => {
                          //
                          GateState.menuOverlay = !GateState.menuOverlay
                        }}
                      >
                        {`Login`}
                        <meshPhysicalMaterial
                          transmission={0.0}
                          thickness={1.4}
                          ior={1.1}
                          roughness={0.0}
                          metalness={0.0}
                          color={'#00ffff'}
                          emissive={'#00ffff'}
                          emissiveIntensity={0.8}
                        ></meshPhysicalMaterial>
                      </Text3D>
                    </Center>
                  </group>
                </group>
                {/* <group scale={1}>
                  <Icosahedron
                    onPointerDown={() => {
                      //
                      GateState.menuOverlay = !GateState.menuOverlay
                    }}
                    args={[0.13, 4]}
                    renderOrder={-1}
                  >
                    <meshPhysicalMaterial
                      metalness={0}
                      roughness={0}
                      emissive={`#ff0000`}
                      emissiveIntensity={gate.menuOverlay ? 1 : 0}
                      envMapIntensity={0}
                      transmission={4}
                      reflectivity={1}
                      thickness={1.3}
                      ior={0.95}
                      flatShading={false}
                      depthTest={false}
                    ></meshPhysicalMaterial>
                  </Icosahedron>
                </group> */}
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
  let topRightRef = useRef()
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

  useFrame((st, dt) => {
    let t = st.clock.getElapsedTime()
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
        visibleWidthAtZDepth(2, camera) * 0.5 + -0.2,
        visibleHeightAtZDepth(2, camera) * 0.5 + -0.1,
        -1,
      ])
      gps.current.lookAt(cameraProxy.position)
    }

    //
    //
    // if (topRightRef.current) {
    //   topRightRef.current.position.y = Math.sin(t * 8) * 0.05
    //   topRightRef.current.rotation.y += dt * 3
    // }
    //
  })

  return (
    <>
      {createPortal(
        <group position={[0, 0, -1]}>
          <group name='chaser-menu' ref={gps}>
            <group name='bb00'></group>
            <group ref={topRightRef}>{topRight}</group>
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
      <group position={[0, 0, -0.3]} scale={0.113}>
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
                      // onClick={() => {
                      //   //
                      //   signOut()
                      // }}
                    ></Image>
                  </>
                )}

                {!gate.userSession && (
                  <>
                    <Agape></Agape>
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

                    {/* local */}
                    {process.env.NODE_ENV === 'development' && (
                      <Image
                        position={[0, -0.61 * 2.3, 0]}
                        scale={[2.39, 0.61]}
                        transparent={true}
                        url={`/hud/login-guest.png`}
                        onPointerDown={() => {
                          //
                          loginGuestLocal()
                          //
                        }}
                      ></Image>
                    )}
                  </>
                )}
              </>
            }
          </Suspense>
        )}
      </group>
    </>
  )
}
