import { Icosahedron } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils, Object3D, Vector3 } from 'three'
import { MeshBVH } from 'three-mesh-bvh'
import { NoodleEmitter } from '../NoodleEmitter/NoodleEmitter'
import { Noodle } from './Noodle'
export function Mouse3D({ collider, mouse3d }) {
  let raycastResult = useMemo(() => {
    let dd = new Object3D()
    dd.position.y = 2.5
    return dd
  }, [])
  let mouser = useRef({ isDown: false })

  useFrame(({ raycaster, mouse, camera, controls }, dt) => {
    //
    if (collider.geometry) {
      if ('ontouchstart' in window) {
        mouse.x = 0
        mouse.y = 0
      }
      raycaster.setFromCamera(mouse, camera)

      /** @type {MeshBVH} */
      let bvh = collider.geometry.boundsTree
      let res = bvh.raycastFirst(raycaster.ray)

      if (res) {
      }
      if (mouse3d && mouser.current.isDown) {
        raycastResult.position.copy(res.point)
        raycastResult.position.addScaledVector(res.face.normal, 2.5)
        mouse3d.position.lerp(raycastResult.position, 0.1)
      }
    }

    //
  })

  let get = useThree((s) => s.get)
  let gl = useThree((s) => s.gl)
  useEffect(() => {
    let h = () => {
      //
      mouser.current.isDown = true
    }
    let h2 = () => {
      mouser.current.isDown = false
    }
    let h3 = () => {
      let { raycaster, mouse, camera, controls } = get()
      if (collider.geometry) {
        if ('ontouchstart' in window) {
          mouse.x = 0
          mouse.y = 0
        }
        raycaster.setFromCamera(mouse, camera)

        /** @type {MeshBVH} */
        let bvh = collider.geometry.boundsTree
        let res = bvh.raycastFirst(raycaster.ray)

        if (res) {
          raycastResult.position.copy(res.point)
          raycastResult.position.addScaledVector(res.face.normal, 2.5)

          mouse3d.position.lerp(raycastResult.position, 1)
        }
      }
    }
    gl.domElement.addEventListener('click', h3)
    gl.domElement.addEventListener('pointerdown', h)
    gl.domElement.addEventListener('pointerup', h2)
    return () => {
      gl.domElement.removeEventListener('pointerdown', h)
      gl.domElement.removeEventListener('pointerup', h2)
    }
  }, [gl])

  return (
    <group>
      <Noodle mouse3d={raycastResult}></Noodle>
    </group>
  )
}
