/* eslint-disable jsx-a11y/alt-text */
import { WalkerState } from '@/lib/walker/WalkerState'
import {
  Image,
  PerspectiveCamera as DPC,
  Icosahedron,
  Center,
  Text3D,
  useTexture,
  Sphere,
} from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import {
  DoubleSide,
  PerspectiveCamera,
  Quaternion,
  RepeatWrapping,
  sRGBEncoding,
} from 'three'
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
import { LoadingGroup } from '../LoginContentGate/LoadingGroup'

//
// import { Perf } from 'r3f-perf'
// import { AvatarChaser } from '../AvatarChaser/AvatarChaser'
//

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
  //
  let roughnessMapTex = useTexture(`/texture/snow/pattern.jpeg`)
  roughnessMapTex.encoding = sRGBEncoding
  roughnessMapTex.wrapS = roughnessMapTex.wrapT = RepeatWrapping
  roughnessMapTex.repeat.y = 2 / 1.5
  roughnessMapTex.repeat.x = 3.4 / 1.5
  roughnessMapTex.needsUpdate = true

  useFrame((st, dt) => {
    roughnessMapTex.offset.x += dt * 0.2
  })

  return (
    <>
      <CoreReady></CoreReady>

      <MenuLayout
        topRight={
          <Suspense fallback={<LoadingGroup />}>
            {
              <>
                <group rotation={[0.0, 0.0, 0]} position={[0.0, 0.0, 0.0]}>
                  <group scale={0.05}>
                    <Center>
                      <Text3D
                        height={0.01}
                        font={daysFont}
                        onPointerDown={() => {
                          //
                          GateState.menuOverlay = !GateState.menuOverlay
                        }}
                      >
                        = Menu =
                        <meshPhysicalMaterial
                          roughness={0.0}
                          metalness={0.0}
                          color={'#00ffff'}
                          emissive={'#00ffff'}
                          emissiveIntensity={0.4}
                        ></meshPhysicalMaterial>
                      </Text3D>
                    </Center>
                  </group>

                  <group
                    position={[0, -0.15, 0]}
                    rotation={[0.5, -Math.PI * 0.5, 0]}
                    scale={0.2}
                  >
                    <Sphere
                      onPointerDown={() => {
                        //
                        GateState.menuOverlay = !GateState.menuOverlay
                      }}
                      args={[0.45, 35, 35]}
                    >
                      <meshPhysicalMaterial
                        metalness={0.0}
                        roughness={0}
                        reflectivity={3}
                        // attenuationColor={`#DD8556`}
                        transmission={1}
                        thickness={0.45 * 2}
                        ior={1.15}
                        side={DoubleSide}
                        envMapIntensity={0}
                        emissive={'#ffffff'}
                        color={'#ffffff'}
                        // attenuationColor={'#E20074'}
                        // transmissionMap={roughnessMapTex}
                        attenuationDistance={30}
                        emissiveMap={roughnessMapTex}
                        emissiveIntensity={1.4}
                        roughnessMap={roughnessMapTex}
                        metalnessMap={roughnessMapTex}
                        alphaMap={roughnessMapTex}
                        // normalMap={normalMapTex}
                        // envMap={snowNormal}
                      ></meshPhysicalMaterial>
                    </Sphere>
                  </group>
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

    cameraProxy.position.lerp(wp, 0.1)
    cameraProxy.quaternion.slerp(wq, 1.0)

    let adder = 0
    if (size.width < size.height && size.width <= 560) {
      adder += 25
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
      // gps.current.lookAt(cameraProxy.position)
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
      <group position={[0, 0, -0.3]} scale={0.15}>
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
