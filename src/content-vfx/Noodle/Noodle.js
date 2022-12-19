import { useEffect, useMemo, useRef } from 'react'
import { PhysicsCompute } from './PhysicsCompute'
import { NoodleSegmentCompute } from './NoodleSegmentCompute'
import { Object3D } from 'three140'
import { NoodleRenderable } from './NoodleRenderable'
import { ParticleRenderable } from './ParticleRenderable'
import { Color, DoubleSide, FrontSide } from 'three'
import { useCore } from '@/lib/useCore'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'

export function Noodle({}) {
  let core = useCore()
  let ref = useRef()
  let gl = useThree((s) => s.gl)

  let howManyTracker = 64
  let howLongTail = 32

  let { group } = useMemo(() => {
    let group = new Object3D()

    let chaser = new Object3D()

    core.onLoop(() => {
      let mouse3d = core.now.scene.getObjectByName('mouse3d')
      if (mouse3d) {
        chaser.position.lerp(mouse3d.position, 0.5)
      }

      if (ref.current && mouse3d) {
        ref.current.position.lerp(mouse3d.position, 0.5)
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

  useFrame(() => {})

  //
  return (
    <group position={[0, 0, 0]}>
      <primitive object={group}></primitive>
      <Icosahedron
        ref={ref}
        onPointerDown={() => {
          //
        }}
        args={[0.45, 3]}
      >
        <meshPhysicalMaterial
          metalness={0}
          roughness={0}
          attenuationColor={`#DD8556`}
          transmission={1}
          thickness={0.35 * 2.0 + 1.0}
          ior={1.1}
          side={DoubleSide}
        ></meshPhysicalMaterial>
      </Icosahedron>
    </group>
  )
}
