import { Stats, useGLTF } from '@react-three/drei'
// import { useReady, useScrollStore } from '../Core/useScrollStore'
import { useEffect, useMemo, useRef } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { AnimationMixer, BufferAttribute, Vector3 } from 'three'
import { TheVortex } from '../TheVortex/TheVortex'
import { MathUtils } from 'three'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
// import { Octree } from './Octree'
// import { StaticGeometryGenerator } from 'three-mesh-bvh'
// import md5 from 'md5'

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

export function NYCJourney() {
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

  useFrame(({ camera, size, mouse, clock }, dt) => {
    // if (!'ontouchstart' in window) {

    // } else {
    //   myTime.current = MathUtils.damp(
    //     myTime.current,
    //     clock.getElapsedTime() % max,
    //     3,
    //     dt
    //   )
    // }

    myTime.current = MathUtils.damp(
      myTime.current,
      (mouse.x * 0.5 + 0.5) * max,
      3,
      dt
    )

    mixer.setTime(myTime.current)

    let sorted = glb.cameras

    let getRun = (cam) => {
      // if (rot?.current?.position.length() === 0.0) {
      //   return true
      // }

      let info = orderTime.find((e) => e.name === cam.name)

      let now = myTime.current

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

      let adder = 0
      if (size.width < size.height) {
        adder += 15
      }

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
          cam.getWorldPosition(camera.position)
          cam.getWorldQuaternion(camera.quaternion)

          camera.fov = 40 + adder
          camera.near = 1
          camera.far = 300
          camera.updateProjectionMatrix()
        }
      }
    }
  })

  let scene = useThree((s) => s.scene)
  // let camera = useThree((s) => s.camera)

  return (
    <group>
      <Stats></Stats>
      {createPortal(
        <group ref={rot}>
          <group ref={rot2}>
            <primitive object={camera}></primitive>
          </group>
        </group>,
        scene
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

/*



*/
