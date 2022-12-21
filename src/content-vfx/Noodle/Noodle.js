import { useEffect, useMemo, useRef } from 'react'
import { PhysicsCompute } from './PhysicsCompute'
import { NoodleSegmentCompute } from './NoodleSegmentCompute'
import { Object3D, Vector3 } from 'three140'
import { NoodleRenderable } from './NoodleRenderable'
import { ParticleRenderable } from './ParticleRenderable'
import { Color, DoubleSide, FrontSide } from 'three'
import { useCore } from '@/lib/useCore'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, Sphere, useTexture } from '@react-three/drei'

export function Noodle({ nameToChase = `myself-player` }) {
  let core = useCore()
  let gl = useThree((s) => s.gl)
  let frost = useTexture(`/texture/frost/frost-roughness.png`)

  let howManyTracker = 64
  let howLongTail = 32

  let { chaser, group } = useMemo(() => {
    let group = new Object3D()

    let chaser = new Object3D()

    core.onLoop((st, dt) => {
      chaser.rotation.y += dt * 2
    })
    let mouse3d = false
    let up = new Vector3(0, 1, 0)
    let delta = new Vector3(0, 0, 1)
    let adder = new Vector3(0, 0, 0)

    // item
    core.onLoop(({ clock }) => {
      let t = clock.getElapsedTime()
      mouse3d = core.now.scene.getObjectByName(nameToChase)

      if (mouse3d) {
        let radius = 1
        let speed = 0.6
        adder.copy(mouse3d.position)
        delta.set(0, 0, radius)
        delta.applyAxisAngle(up, t * speed)
        adder.add(delta)
        adder.y += -0.3
        chaser.position.lerp(adder, 0.4)
      }
    })

    let mini = core

    let renderConfig = {
      color: new Color('#ffffff'),
      emissive: new Color('#DD8556'),
      transparent: false,
      roughness: 1.0,
      metalness: 0.0,
      side: FrontSide,
      // reflectivity: 1,
      // transmission: 1,
      // ior: 1.5,
      // thickness: 5.0,
    }

    let physics = new PhysicsCompute({
      gl: gl,
      sizeX: 1,
      sizeY: howManyTracker,
      tracker: chaser,
    })

    let sim = new NoodleSegmentCompute({
      node: mini,
      tracker: chaser,
      getTextureAlpha: () => {
        return physics.getHeadList()
      },
      howManyTracker: howManyTracker,
      howLongTail: howLongTail,
      gl: gl,
    })

    let noodle = new NoodleRenderable({
      renderConfig,
      node: mini,
      sim,
      howManyTracker: howManyTracker,
      howLongTail: howLongTail,
    })

    group.add(noodle.o3d)

    let pars = new ParticleRenderable({
      renderConfig,
      sizeX: 1,
      sizeY: howManyTracker,
      core: mini,
      getTextureAlpha: () => {
        return physics.getHeadList()
      },
      getTextureBeta: () => {
        return physics.getHeadList2()
      },
    })

    group.add(pars)

    mini.onClean(() => {
      pars.removeFromParent()
      noodle.o3d.removeFromParent()
    })

    return {
      chaser,
      group: group,
    }
  }, [core, gl, howLongTail, howManyTracker])

  //
  return (
    <group position={[0, 0, 0]}>
      <primitive object={group}></primitive>

      {createPortal(
        <Sphere args={[0.45, 35, 35]}>
          <meshPhysicalMaterial
            metalness={0.0}
            roughness={1}
            // attenuationColor={`#DD8556`}
            transmission={1.3}
            thickness={2}
            ior={1.3}
            side={DoubleSide}
            envMapIntensity={1}
            // emissive={`#ffffff`}
            roughnessMap={frost}
            metalnessMap={frost}
            normalMap={frost}
            normalScale={[-0.5, -0.5]}
          ></meshPhysicalMaterial>
        </Sphere>,
        chaser
      )}
      <primitive object={chaser}></primitive>
    </group>
  )
}
