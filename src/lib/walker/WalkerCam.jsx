import { Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { MathUtils, Object3D, Vector3 } from 'three'
import { MeshBVH } from 'three-mesh-bvh'

const ProperDistance = 25
const Padding = 5

export function WalkerCam({ collider }) {
  let ref = useRef()

  useFrame(({ raycaster, mouse, camera, controls }, dt) => {
    //
    if (collider.geometry) {
      if ('ontouchstart' in window) {
        raycaster.setFromCamera({ x: 0, y: 0 }, camera)
      } else {
        raycaster.setFromCamera(mouse, camera)
      }

      /** @type {MeshBVH} */
      let bvh = collider.geometry.boundsTree
      // let res = bvh.raycastFirst(raycaster.ray)

      //
      if (controls) {
        raycaster.setFromCamera({ x: 0, y: 0 }, camera)
        raycaster.ray.lookAt(controls.target)

        let hit = bvh.raycastFirst(raycaster.ray)

        if (hit) {
          if (hit.distance <= controls.getDistance()) {
            controls.deltaDir = controls.deltaDir || 0

            controls.deltaDir = MathUtils.lerp(
              controls.deltaDir,
              hit.distance - controls.getDistance(),
              0.4
            )
          }
        }

        if (Math.abs(controls.deltaDir) > 0) {
          let dir = camera.position.clone().sub(controls.target).normalize()
          camera.position.addScaledVector(dir, dt * 25 * controls.deltaDir)
          controls.deltaDir -= dt * 25 * controls.deltaDir
        }

        // if (controls.tick > 0) {
        //   let dir = camera.position.clone().sub(controls.target).normalize()
        //   camera.position.addScaledVector(dir, dt * 25 * controls.deltaDir)
        //   controls.deltaDir -= dt * 25 * controls.deltaDir
        //   controls.tick--
        // }

        // if (hit) {
        //   if (currentDiff - hit.distance >= 0) {
        //     if (!camera.userData.ticker) {
        //       camera.userData.restoreTo = controls.getDistance()
        //       camera.userData.ticker = 5 * 120.0
        //     }
        //     let restore = controls.maxDistance
        //     controls.maxDistance = hit.distance
        //     controls.update()
        //     controls.maxDistance = restore
        //   }
        // }

        // if (camera.userData.ticker > 0) {
        //   if (
        //     Math.abs(controls.getDistance() - camera.userData.restoreTo) <= 1
        //   ) {
        //     camera.userData.ticker = 0
        //     camera.userData.restoreTo = 0
        //   } else {
        //     camera.userData.ticker--

        //     let dir = camera.position.clone().sub(controls.target).normalize()
        //     camera.position.addScaledVector(dir, dt * 1)
        //   }
        // }

        // if (camera.userData.status === 'needsRestore') {
        //   controls.maxDistance = camera.userData.restoreToDist
        //   let adder = camera.position.clone()
        //   adder.sub(controls.target)
        //   adder.normalize()
        //   camera.position.add(adder)
        //   controls.update()

        //   console.log(camera.position)
        // }
      }

      //
    }

    //
  })
  return <group ref={ref}></group>
}
