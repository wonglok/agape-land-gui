import { useEffect, useMemo, useRef, useState } from 'react'
import { Object3D } from 'three'
import { Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  useAnimations,
  useFBX,
  useGLTF,
  Sphere,
  Text,
  Circle,
  OrbitControls,
} from '@react-three/drei'
// import anime from 'animejs'
// import { LookAt } from './LookAt'
export const ControlState = {
  keyForward: false,
  keyBackward: false,
  keyLeft: false,
  keyRight: false,

  keyE: false,
  keyQ: false,
}
const Config = {
  //
  avatarURL: `/rpm/avatar/default-lok.glb`,
  //
  runURL: `/rpm/rpm-actions-locomotion/running.fbx`,
  standURL: `/rpm/rpm-actions-locomotion/standing.fbx`,
}

export function BridgeControl({ children = () => null }) {
  let controls = useThree((s) => s.controls)
  let camera = useThree((s) => s.camera)
  camera.near = 0.1
  camera.far = 100
  camera.fov = 75
  camera.updateProjectionMatrix()

  useEffect(() => {
    let hh = ({ key }) => {
      if (key === 'w') {
        ControlState.keyForward = true
      }
      if (key === 's') {
        ControlState.keyBackward = true
      }

      if (key === 'a') {
        ControlState.keyLeft = true
      }
      if (key === 'd') {
        ControlState.keyRight = true
      }

      // if (key === 'e') {
      //   ControlState.keyE = true
      // }
      // if (key === 'q') {
      //   ControlState.keyQ = true
      // }
    }
    window.addEventListener('keydown', hh)
    return () => {
      window.removeEventListener('keydown', hh)
    }
  }, [])

  //
  useEffect(() => {
    let hh = ({ key }) => {
      if (key === 'w') {
        ControlState.keyForward = false
      }
      if (key === 's') {
        ControlState.keyBackward = false
      }
      if (key === 'a') {
        ControlState.keyLeft = false
      }
      if (key === 'd') {
        ControlState.keyRight = false
      }

      // if (key === 'e') {
      //   ControlState.keyE = false
      // }
      // if (key === 'q') {
      //   ControlState.keyQ = false
      // }
    }
    window.addEventListener('keyup', hh)
    return () => {
      window.removeEventListener('keyup', hh)
    }
  }, [])

  let gl = useThree((s) => s.gl)

  let up = useMemo(() => {
    return new Vector3(0, 1, 0)
  }, [])

  let temp = useMemo(() => {
    return new Vector3(0, 0, 0)
  }, [])

  let { player } = useMemo(() => {
    let player = new Object3D()
    return { player }
  }, [])

  useEffect(() => {
    gl.domElement.style.touchAction = 'none'
    gl.domElement.style.userSelect = 'none'
  }, [gl])

  useFrame(({ camera }, dt) => {
    if (!controls) {
      return
    }
    controls.update()

    temp.set(0, 0, 0)

    if (ControlState.keyForward) {
      temp.set(0, 0, -1)
      // temp.applyQuaternion(camera.quaternion)
      temp.applyAxisAngle(up, controls.getAzimuthalAngle())

      player.position.addScaledVector(temp, 3.333 * dt)
    }

    if (ControlState.keyBackward) {
      temp.set(0, 0, 1)
      // temp.applyQuaternion(camera.quaternion)
      temp.applyAxisAngle(up, controls.getAzimuthalAngle())

      player.position.addScaledVector(temp, 3.333 * dt)
    }

    if (ControlState.keyLeft) {
      temp.set(-1, 0, 0)
      // temp.applyQuaternion(camera.quaternion)
      temp.applyAxisAngle(up, controls.getAzimuthalAngle())

      player.position.addScaledVector(temp, 3.333 * dt)
    }
    if (ControlState.keyRight) {
      temp.set(1, 0, 0)
      // temp.applyQuaternion(camera.quaternion)
      temp.applyAxisAngle(up, controls.getAzimuthalAngle())

      player.position.addScaledVector(temp, 3.333 * dt)
    }

    if (ControlState.keyE) {
      temp.set(0, 1, 0)

      player.position.addScaledVector(temp, 3.333 * dt)
    }
    if (ControlState.keyQ) {
      temp.set(0, -1, 0)

      player.position.addScaledVector(temp, 3.333 * dt)
    }

    // adjust the camera
    controls.target.y -= 1.6
    camera.position.sub(controls.target)
    controls.target.copy(player.position)
    camera.position.add(player.position)
    controls.target.y += 1.6

    window.player = player.position.toArray()
    window.camera = camera.position.toArray()
  })

  return (
    <group>
      {children({ player })}
      <OrbitControls
        minDistance={0}
        maxDistance={0.01}
        enableDamping={true}
        rotateSpeed={-1}
        makeDefault
      ></OrbitControls>
      {/* <group position={[0.7141255933707404, 1.4, -18.160777622439785]}> */}

      {/* </group> */}
      {/* [
    0.7141255933707404,
    0,
    -18.160777622439785
] */}
      {/* {player && <AvatarSwimming player={player}></AvatarSwimming>} */}
      {/* {createPortal(<></>, player)} */}
      <primitive object={player}></primitive>
    </group>
  )
}

function AvatarSwimming({ player }) {
  const glb = useGLTF(Config.avatarURL)

  glb.scene.traverse((it) => {
    it.frustumCulled = false
  })

  const swim = useFBX(Config.runURL)
  const float = useFBX(Config.standURL)

  swim.animations[0].name = 'swim'
  float.animations[0].name = 'float'

  const anim = useAnimations(
    [float.animations[0], swim.animations[0]],
    glb.scene
  )
  const [st, setSt] = useState('float')

  //
  useEffect(() => {
    const arr = Object.values(anim.actions).filter(
      (e) => e.getClip().name === st
    )

    arr.forEach((it) => {
      it.reset().fadeIn(0.4).play()
    })

    return () => {
      arr.forEach((it) => {
        it.reset().fadeOut(0.4).play()
      })
    }
  }, [anim.actions, st])

  useFrame(() => {
    glb.scene.position.lerp(player.position, 0.1)

    if (glb.scene.position.distanceTo(player.position) >= 0.1) {
      setSt('swim')
      glb.scene.lookAt(player.position.x, player.position.y, player.position.z)
    } else {
      setSt('float')
      glb.scene.lookAt(
        player.position.x,
        glb.scene.position.y,
        player.position.z
      )
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}
