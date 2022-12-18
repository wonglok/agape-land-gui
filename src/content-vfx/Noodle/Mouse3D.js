import { Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Object3D, Vector3 } from 'three'
import { MeshBVH } from 'three-mesh-bvh'

export function Mouse3D({ collider }) {
  let ref = useRef()

  let tv = useMemo(() => new Vector3(), [])
  useFrame(({ raycaster, mouse, camera, controls }) => {
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

      if (res && ref.current) {
        tv.copy(res.point)
        tv.addScaledVector(res.face.normal, 0.6)
      }

      ref.current.position.lerp(tv, 0.15)
    }

    //
  })
  return (
    <group name={'mouse3d'} ref={ref}>
      <Icosahedron
        onPointerDown={() => {
          //
        }}
        args={[0.4, 3]}
      >
        <meshPhysicalMaterial
          metalness={0}
          roughness={0}
          attenuationColor={`#DD8556`}
          transmission={1}
          thickness={0.4 * 2.0 + 1.0}
          ior={1.1}
        ></meshPhysicalMaterial>
      </Icosahedron>
    </group>
  )
}
