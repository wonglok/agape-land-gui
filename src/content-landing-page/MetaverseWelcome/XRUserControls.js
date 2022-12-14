import { Box, Sphere } from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import {
  Controllers,
  Interactive,
  useController,
  useXR,
  XR,
} from '@react-three/xr'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, Vector3 } from 'three'

export function XRContent({ children }) {
  return (
    <>
      <XR>
        <Walker>{children}</Walker>
      </XR>
    </>
  )
}

function Walker({ children }) {
  let camera = useThree((s) => s.camera)
  const xrPlayer = useXR((s) => s.player)
  const session = useXR((s) => s.session)
  const rightController = useController('right')
  const lefctController = useController('left')

  let [ctrler, setCtrler] = useState(false)
  let targetPosition = useMemo(() => {
    return new Vector3(0, 1.45, 0)
  }, [])

  let goingFront = useRef(false)
  let goingBack = useRef(false)

  let temp = new Vector3()

  useEffect(() => {
    xrPlayer.position.copy(targetPosition)
  }, [session, xrPlayer, targetPosition])
  useFrame(({ camera }) => {
    camera.position.lerp(xrPlayer.position, 0.1)
  })

  useFrame(({ camera }, dt) => {
    if (session) {
      xrPlayer.position.lerp(targetPosition, 0.1)
    } else {
    }

    if (ctrler === rightController?.uuid) {
      if (goingFront.current) {
        temp.set(0, 0, -1)
        temp.applyQuaternion(rightController.controller.quaternion)
        targetPosition.addScaledVector(temp, 10 * dt)
      }

      if (goingBack.current) {
        temp.set(0, 0, 1)
        temp.applyQuaternion(rightController.controller.quaternion)
        targetPosition.addScaledVector(temp, 10 * dt)
      }
    }
  })

  // const leftController = useController('left')
  // console.log(leftController)

  let ref = useRef()
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.position.copy(xrPlayer.position)
      ref.current.quaternion.copy(xrPlayer.quaternion)
    }
  })
  return (
    <group>
      {/*  */}
      <group visible={false}>
        <Interactive
          onSelectStart={(event) => {
            setCtrler(event.target.uuid)
            goingFront.current = true
          }}
          onSelectEnd={(event) => {
            setCtrler(event.target.uuid)
            goingFront.current = false
          }}
          onSqueezeStart={(event) => {
            setCtrler(event.target.uuid)
            goingBack.current = true
          }}
          onSqueezeEnd={(event) => {
            setCtrler(event.target.uuid)
            goingBack.current = false
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
          <group ref={ref}>
            <Box position={[0, 0, -5]} args={[10, 10, 1]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
            <Box position={[0, 0, 5]} args={[10, 10, 1]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
            <Box position={[0, -5, 0]} args={[10, 1, 10]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
            <Box position={[0, 5, 0]} args={[10, 1, 10]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
            <Box position={[-5, 0, 0]} args={[1, 10, 10]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
            <Box position={[5, 0, 0]} args={[1, 10, 10]}>
              <meshBasicMaterial
                depthWrite={false}
                depthTest={false}
                transparent
                opacity={0}
              ></meshBasicMaterial>
            </Box>
          </group>
        </Interactive>
      </group>
      <Controllers></Controllers>
      {children}
    </group>
  )
}
