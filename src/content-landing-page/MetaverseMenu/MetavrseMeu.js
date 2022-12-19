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
                {/* <Image
                  url={`/hud/menu.png`}
                  transparent={true}
                  scale={[0.3, 0.3]}
                  onPointerDown={() => {
                    GateState.menuOverlay = !GateState.menuOverlay
                  }}
                ></Image> */}
                {/* <group scale={0.3}>
                  <Servant></Servant>
                </group> */}
                {/* <Servant></Servant> */}
                <group scale={1}>
                  <Icosahedron
                    onPointerDown={() => {
                      //
                      GateState.menuOverlay = !GateState.menuOverlay
                    }}
                    args={[0.11, 3]}
                  >
                    <meshPhysicalMaterial
                      metalness={0}
                      roughness={0}
                      emissive={`#DD8556`}
                      emissiveIntensity={0.2}
                      attenuationColor={`#ffffff`}
                      transmission={1}
                      thickness={0.11}
                      ior={1.4}
                    ></meshPhysicalMaterial>
                  </Icosahedron>

                  {/* <group scale={0.003}>
                    <theVortex key={TheVortex.key}></theVortex>
                  </group> */}

                  {/* <theVortex key={TheVortex.key}></theVortex> */}
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

// function Servant() {
//   let ref = useRef()
//   let glb = useGLBLoader(`/servant/lok/lok-compressed.glb`)
//   let {
//     animations: [hiClip],
//   } = useFBX(`/servant/rpm-motion/sit-floor.fbx`)

//   let mixer = useMemo(() => {
//     return new AnimationMixer(glb.scene)
//   }, [glb])
//   useFrame(({ clock }) => {
//     let t = clock.getElapsedTime()
//     mixer.setTime(t)
//   })

//   let hiAct = mixer.clipAction(hiClip)
//   hiAct.play()
//   return (
//     <group ref={ref} position={[-0.25, 0.25, 0]}>
//       <Box
//         visible={false}
//         args={[0.3, 1, 0.3]}
//         onPointerDown={() => {
//           GateState.menuOverlay = !GateState.menuOverlay
//         }}
//       ></Box>

//       <pointLight power={3.5} position={[-0.3, 0.5, 0.3]}></pointLight>
//       <pointLight
//         power={3.5}
//         color='hotpink'
//         position={[-0.3, 0.5, -0.3]}
//       ></pointLight>
//       <group scale={[0.3, 0.3, 0.3]} rotation={[0, -0.5, 0]}>
//         <primitive object={glb.scene}></primitive>

//         <Cylinder args={[1, 1, 0.15, 6, 6]} position={[0, -0.125, 0]}>
//           <meshPhysicalMaterial
//             transmission={1}
//             thickness={10}
//             roughness={0}
//             reflectivity={1}
//             metalness={0.3}
//           ></meshPhysicalMaterial>
//         </Cylinder>
//       </group>
//     </group>
//   )
// }

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
