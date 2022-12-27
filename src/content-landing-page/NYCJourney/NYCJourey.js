import { Box, Center, Html, Stats, Text3D, useGLTF } from '@react-three/drei'
// import { useReady, useScrollStore } from '../Core/useScrollStore'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import {
  AnimationMixer,
  BufferAttribute,
  Clock,
  Object3D,
  Vector3,
} from 'three'
import { TheVortex } from '../TheVortex/TheVortex'
import { MathUtils } from 'three'
import { UIContent } from '@/lib/UIContent'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
// import { Octree } from './Octree'
// import { StaticGeometryGenerator } from 'three-mesh-bvh'
// import md5 from 'md5'
import { Gesture, WheelGesture } from '@use-gesture/vanilla'
import { CardPlane } from './CardPlane'
import { GateState } from '../LoginContentGate/GateState'
import { useSnapshot } from 'valtio'
import anime from 'animejs'

let max = 45.156355645706554
let scheduleStartTime = {
  Camera013_Orientation: 20.00234154719934,
  Camera003_Orientation: 2.983478243416083,
  Camera_Orientation: 4.169748749595136,
  Camera006_Orientation: 9.723748170225846,
  Camera001_Orientation: 16.358542590352094,
  Camera004_Orientation: 23.157913127575213,
  Camera009_Orientation: 24.46997318724838,
  Camera010_Orientation: 28.19060252266285,
  Camera012_Orientation: 32.20940756626385,
  Camera005_Orientation: 36.707416925716934,
  Camera008_Orientation: 41.34326200740272,
  Camera011_Orientation: 7.8282304198105255,
  Camera002_Orientation: 0,
  end: max,
}
let order = [
  'Camera002_Orientation',
  'Camera003_Orientation',
  'Camera_Orientation',
  'Camera011_Orientation',
  'Camera006_Orientation',
  'Camera001_Orientation',
  'Camera013_Orientation',
  'Camera004_Orientation',
  'Camera009_Orientation',
  'Camera010_Orientation',
  'Camera012_Orientation',
  'Camera005_Orientation',
  'Camera008_Orientation',
  'end',
]

let popStatus = [
  {
    /* */ shown: false,
    title: 'Welcome to Agape',
    desc: `Let's start our journey!`,
    at: 1 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    // url: `/scene/2022-11-28-NYC/coverimage/agape.png`,
    url: `/scene/2022-11-28-NYC/coverimage/circle_portal.png`,
  },
  {
    /* */ shown: false,
    title: 'Virtual Mall',
    desc: `Shop in the multiverses which uses our metaverse boilerplates!`,
    at: 152 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/Virtual_mall_05.png`,
  },

  {
    /* */ shown: false,
    title: 'BAR',
    desc: `Socialize and get to know more people in the Agape Club!`,
    at: 400 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/bar.png`,
  },
  {
    /* */ shown: false,
    title: 'Connect to Other Multiverse',
    desc: `Get your first Mech to help you explore multiverses!`,
    at: 750 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/agape.png`,
  },

  {
    /* */ shown: false,
    title: 'JUKE BOX',
    desc: `Get your first Music NFT for tickets to concerts`,
    at: 850 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/concert.png`,
  },

  {
    /* */ shown: false,
    title: 'Experience and Buy',
    desc: `Experience commercials and buy your favorite NFTs`,
    at: 960 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/Ex_buy_02.png`,
  },

  {
    /* */ shown: false,
    title: 'Enter Agape',
    desc: `Enter the Agape Universe NOW!`,
    at: 1050 / 24,
    titleSize: 0.5,
    descSize: 0.5,
    url: `/scene/2022-11-28-NYC/coverimage/mech2.png`,

    onClick: () => {
      GateState.menuOverlay = true
    },
  },
]

export function NYCJourney() {
  let gs = useSnapshot(GateState)
  // let gui = useLandingPageStore((s) => s.gui)
  let rot = useRef()
  let rot2 = useRef()

  let glb = useGLTF(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)

  let camera = useThree((s) => s.camera)

  let myTime = useRef(0)

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useEffect(() => {
    glb.animations.forEach((ui) => {
      mixer.clipAction(ui).play()
    })

    //
  }, [glb, mixer])

  useEffect(() => {
    glb.cameras.forEach((cam) => {
      cam.userData.oldPos = cam.position.clone()
      cam.userData.nowPos = cam.position.clone()
      cam.userData.diff = new Vector3()
      cam.userData.diff.copy(cam.position)
    })
  }, [glb.cameras])

  let lastCam = false

  let orderTime = order.map((e, i) => {
    let nextname = order[i + 1]
    return {
      name: e,
      start: scheduleStartTime[e],
      end: scheduleStartTime[nextname] || e,
    }
  })

  let barRes1 = false
  let barRes2 = false
  let accu = useRef(0)

  useFrame(({ camera, size, mouse, clock }, dt) => {
    if (accu.current <= 0) {
      accu.current = 0
    }
    myTime.current = MathUtils.damp(myTime.current, accu.current, 3, dt)

    // if (!'ontouchstart' in window) {
    // } else {
    // // }

    // if ((mouse.y == 0.0 && mouse.x == 0.0) || gui) {
    //   myTime.current = MathUtils.damp(
    //     myTime.current,
    //     (clock.getElapsedTime() * 0.5) % max,
    //     3,
    //     dt
    //   )
    // } else {
    //   // if (isDown) {
    //   //   // myTime.current = MathUtils.damp(
    //   //   //   myTime.current,
    //   //   //   ((-mouse.y * 0.5 + 0.5) * max) % max,
    //   //   //   1,
    //   //   //   dt
    //   //   // )
    //   // }
    // }

    mixer.setTime(myTime.current)

    barRes1 = barRes1 || document.querySelector('#progressHTML1')
    if (barRes1) {
      barRes1.style.transform = `translateY(-50vh) scale(${(
        (mixer.time / max) * 2.0 +
        0.1
      ).toFixed(3)})`
      // barRes1.style.backgroundColor = `hsl(${
      //   (myTime.current / max) * 30 + 180
      // }deg 80% 60% / 90%)`
    }
    barRes2 = barRes2 || document.querySelector('#progressHTML2')
    if (barRes2) {
      barRes2.style.transform = `translateY(-50vh) scale(${(
        (mixer.time / max) *
        2.0
      ).toFixed(3)})`
    }

    let sorted = glb.cameras

    let getRun = (cam) => {
      // if (rot?.current?.position.length() === 0.0) {
      //   return true
      // }

      let info = orderTime.find((e) => e.name === cam.name)

      let now = mixer.time

      if (info) {
        if (now >= info.start && now <= info.end) {
          return true
        }
      }
    }
    for (let cam of sorted) {
      cam.played = cam.played || 0

      if (!cam.userData.nowPos) {
        return
      }

      if (!cam.userData.oldPos) {
        return
      }

      cam.getWorldPosition(cam.userData.nowPos)

      let diff = cam.userData.nowPos.sub(cam.userData.oldPos).length()

      cam.getWorldPosition(cam.userData.oldPos)

      // let adder = 0
      // if (size.width < size.height) {
      //   adder += 15
      // }

      if (diff > 0.0001) {
        if (lastCam === false) {
          lastCam = cam
          cam.played++
        }
        if (lastCam !== cam) {
          lastCam = cam
          cam.played++
        }

        if (getRun(cam)) {
          cam.getWorldPosition(proxy.position)
          cam.getWorldQuaternion(proxy.quaternion)

          // camera.fov = 42 + adder
          camera.near = 1
          camera.far = 350
          camera.updateProjectionMatrix()
        }
      }
    }
  })
  useEffect(() => {
    let isDown = false
    document.body.style.touchAction = 'none'
    let h = new Gesture(document.body, {
      onDragEnd: () => {
        isDown = false
      },
      onDragStart: () => {
        isDown = true
      },
      onDrag: (ev) => {
        //
        if (isDown) {
          accu.current += -ev.delta[1] / 50.0
        }
      },
    })

    return () => {
      h.destroy()
    }
  }, [])

  useEffect(() => {
    document.body.style.touchAction = 'none'
    let h = new WheelGesture(document.body, (ev) => {
      accu.current += ev.delta[1] / 250.0

      if (accu.current >= max) {
        accu.current = max
      }
    })

    return () => {
      h.destroy()
    }
  }, [])

  let proxy = useMemo(() => {
    return new Object3D()
  }, [])

  let scene = useThree((s) => s.scene)

  // let camera = useThree((s) => s.camera)

  useFrame(() => {
    proxy.getWorldPosition(camera.position)
    proxy.getWorldQuaternion(camera.quaternion)
  })

  let getVisible = (a) => {
    return a.at <= myTime.current + 0.5 && a.at >= myTime.current - 0.5
  }
  return (
    <group>
      <UIContent>
        <div
          className='fixed top-0 right-0 z-10'
          id='progressHTML1'
          style={{ width: '2px', height: '100%', backgroundColor: `#00ffff` }}
        ></div>

        {/* <div
          className='fixed top-0 left-0 z-100'
          id='progressHTML2'
          style={{ width: '3px', backgroundColor: `#00ffff` }}
        ></div> */}
      </UIContent>

      {process.env.NODE_ENV === 'development' && <Stats></Stats>}

      {createPortal(
        <group ref={rot}>
          <group ref={rot2}>
            <primitive object={proxy}></primitive>
          </group>
        </group>,
        scene
      )}

      {createPortal(
        <>
          {!gs.menuOverlay && (
            <>
              {popStatus.map((a, idx) => (
                <group key={a.url} position={[0, 0, -1.2]} scale={0.5}>
                  <CardPlane
                    getVisible={() => getVisible(a)}
                    myTime={myTime}
                    enableRenderImage={idx === 0}
                    data={a}
                    proxy={proxy}
                    mixer={mixer}
                    title={a.title}
                    desc={a.desc}
                    imageURL={a.url}
                    titleSize={a.titleSize}
                    descSize={a.descSize}
                    onNext={() => {
                      //
                      //

                      if (getVisible(a)) {
                        if (a.onClick) {
                          a.onClick(a)
                        } else {
                          let now = accu.current
                          let diff = (popStatus[idx + 1]?.at || now + 3) - now
                          anime({
                            targets: [accu],
                            current: now + diff,
                            duration: Math.abs(diff) * 100,
                            easing: 'linear',
                          })
                        }
                      }
                    }}
                  ></CardPlane>
                </group>
              ))}
            </>
          )}
        </>,
        proxy
      )}
      <primitive object={glb.scene}></primitive>

      <group position={[0, 1.5, 0]}>
        <group position={[5.523, 6.087, -14.196]}>
          <group scale={0.075}>
            <theVortex key={TheVortex.key}></theVortex>
          </group>
        </group>
      </group>
    </group>
  )
}
