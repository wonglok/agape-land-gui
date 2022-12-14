import { useFrame } from '@react-three/fiber'
import { Interactive, useController, useXR, XR } from '@react-three/xr'
import { useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'

export function XRContent({ children }) {
  return (
    <group>
      {/*  */}
      <XR>
        <XRUserControls></XRUserControls>
        {/*  */}
        <Walker>{children}</Walker>
      </XR>
    </group>
  )
}

export function XRUserControls() {
  let xrPlayer = useXR((s) => s.player)
  let session = useXR((s) => s.session)
  useFrame(({ camera }) => {
    if (xrPlayer && session) {
      camera.position.lerp(xrPlayer.position, 0.1)
      camera.position.y += 0.5
    } else {
    }
  })

  return null
}

export function Walker({ children }) {
  let [ctrler, setCtrler] = useState(false)
  let player = useXR((s) => s.player)
  let session = useXR((s) => s.session)
  let pt = useMemo(() => {
    return new Vector3(0, 5, 0)
  }, [])

  let isDown = useRef(false)

  let temp = new Vector3()

  useFrame(({ camera }, dt) => {
    if (session) {
      player.position.lerp(pt, 0.1)
    } else {
    }

    if (isDown.current) {
      temp.set(0, 0, -1)

      //
      if (ctrler === lefctController) {
        temp.set(0, 0, 1)
      }
      if (ctrler === rightController) {
        temp.set(0, 0, -1)
      }

      //
      temp.applyQuaternion(camera.quaternion)

      pt.addScaledVector(temp, 10 * dt)
    }
  })

  // const leftController = useController('left')
  // console.log(leftController)

  const rightController = useController('right')
  const lefctController = useController('left')

  return (
    <group>
      <Interactive
        onSelectStart={(event) => {
          setCtrler(event.target)
          isDown.current = true
        }}
        onSelectEnd={(event) => {
          setCtrler(event.target)
          isDown.current = false
        }}
        onSelect={(event) => {
          //
          let target = event.intersection
          if (target) {
            // setCtrler(event.target)
            // pt.copy(target.point)
          }
        }}
      >
        {children}
      </Interactive>
    </group>
  )
}
