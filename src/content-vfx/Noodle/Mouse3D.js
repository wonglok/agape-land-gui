import { Icosahedron } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils, Object3D, Vector3 } from 'three'
import { MeshBVH } from 'three-mesh-bvh'
import { NoodleEmitter } from '../NoodleEmitter/NoodleEmitter'
import { Noodle } from './Noodle'
export function Mouse3D({ collider, mouse3d }) {
  let mouser = useRef({ isDown: false })

  useFrame(({ raycaster, mouse, camera, controls }, dt) => {
    //
    if (collider.geometry) {
      // if ('ontouchstart' in window) {
      //   mouse.x = 0
      //   mouse.y = 0
      // }
      raycaster.setFromCamera(mouse, camera)

      /** @type {MeshBVH} */
      let bvh = collider.geometry.boundsTree
      let res = bvh.raycastFirst(raycaster.ray)

      if (res) {
        if (mouse3d && mouser.current.isDown) {
          mouse3d.position.copy(res.point)
          mouse3d.position.addScaledVector(res.face.normal, 1.0)
        }
      }
    }

    //
  })

  let get = useThree((s) => s.get)
  let gl = useThree((s) => s.gl)
  useEffect(() => {
    let h = () => {
      mouser.current.isDown = true
    }
    let h2 = () => {
      mouser.current.isDown = false
    }
    let h3 = () => {
      let { raycaster, mouse, camera, controls } = get()
      if (collider.geometry) {
        // if ('ontouchstart' in window) {
        //   mouse.x = 0
        //   mouse.y = 0
        // }
        raycaster.setFromCamera(mouse, camera)

        /** @type {MeshBVH} */
        let bvh = collider.geometry.boundsTree
        let res = bvh.raycastFirst(raycaster.ray)

        if (res) {
          mouse3d.position.copy(res.point)
          mouse3d.position.addScaledVector(res.face.normal, 1.0)

          mouse3d.position.lerp(mouse3d.position, 1)
        }
      }
    }
    gl.domElement.addEventListener('click', h3)
    gl.domElement.addEventListener('mousedown', h)
    gl.domElement.addEventListener('mouseup', h2)
    gl.domElement.addEventListener('touchstart', h)
    gl.domElement.addEventListener('touchend', h2)
    return () => {
      gl.domElement.removeEventListener('mousedown', h)
      gl.domElement.removeEventListener('mouseup', h2)
      gl.domElement.removeEventListener('touchstart', h)
      gl.domElement.removeEventListener('touchend', h2)
    }
  }, [collider.geometry, get, gl, mouse3d.position])

  return <group></group>
}
