import { useEffect, useMemo, useRef } from 'react'
import { PhysicsCompute } from './PhysicsCompute'
import { NoodleSegmentCompute } from './NoodleSegmentCompute'
import { Object3D } from 'three140'
import { NoodleRenderable } from './NoodleRenderable'
import { ParticleRenderable } from './ParticleRenderable'
import { Color, FrontSide } from 'three'
import { useCore } from '@/lib/useCore'
import { useFrame, useThree } from '@react-three/fiber'

export function Noodle({ chaseName }) {
  let core = useCore()
  let gl = useThree((s) => s.gl)

  let { group } = useMemo(() => {
    let group = new Object3D()

    let chaser = new Object3D()

    core.onLoop(() => {
      let target = core.now.scene.getObjectByName(chaseName)
      if (target) {
        target.getWorldPosition(chaser.position)
      }
    })

    let mini = core
    let howManyTracker = 128
    let howLongTail = 64

    let renderConfig = {
      color: new Color('#ffffff'),
      emissive: new Color('#DD8556'),
      transparent: false,
      roughness: 0.0,
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
  }, [core, gl])

  useFrame(() => {})

  //
  return (
    <group position={[0, 0, 0]}>
      <primitive object={group}></primitive>
    </group>
  )
}
