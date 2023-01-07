import { useEffect, useMemo, useRef } from 'react'
import { PhysicsCompute } from './PhysicsCompute'
import { NoodleSegmentCompute } from './NoodleSegmentCompute'
import { Object3D, Vector3 } from 'three140'
import { NoodleRenderable } from './NoodleRenderable'
import { ParticleRenderable } from './ParticleRenderable'
import {
  Color,
  DoubleSide,
  EquirectangularRefractionMapping,
  FrontSide,
  RepeatWrapping,
  sRGBEncoding,
} from 'three'
import { useCore } from '@/lib/useCore'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, Sphere, useTexture } from '@react-three/drei'
// import { MouseEmitter } from './MouseEmitter'

export function Noodle({ mouse3d = false, nameToChase = `myself-player` }) {
  let core = useCore()
  let gl = useThree((s) => s.gl)

  let howManyTracker = 64
  let howLongTail = 64

  let { chaser, group } = useMemo(() => {
    let group = new Object3D()

    let chaser = new Object3D()

    core.onLoop((st, dt) => {
      chaser.rotation.y += dt * 2
    })
    let up = new Vector3(0, 1, 0)
    let delta = new Vector3(0, 0, 1)
    let adder = new Vector3(0, 0, 0)

    // item
    core.onLoop(({ clock }) => {
      let t = clock.getElapsedTime()
      // mouse3d = core.now.scene.getObjectByName(nameToChase)

      if (mouse3d) {
        let radius = 1
        let speed = 1.5
        adder.copy(mouse3d.position)
        delta.set(0, 0, radius)
        delta.applyAxisAngle(up, t * speed)
        adder.add(delta)
        chaser.position.lerp(adder, 0.03)
      }
    })

    let mini = core

    let renderConfig = {
      color: new Color('#ffffff'),
      // emissive: new Color('#E2E58D'),
      emissiveIntensity: 1,
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

    // let pars = new ParticleRenderable({
    //   renderConfig,
    //   sizeX: 1,
    //   sizeY: howManyTracker,
    //   core: mini,
    //   getTextureAlpha: () => {
    //     return physics.getHeadList()
    //   },
    //   getTextureBeta: () => {
    //     return physics.getHeadList2()
    //   },
    // })

    // group.add(pars)

    mini.onClean(() => {
      // pars.removeFromParent()
      noodle.o3d.removeFromParent()
    })

    return {
      chaser,
      group: group,
    }
  }, [core, gl, howLongTail, howManyTracker, nameToChase])

  let roughnessMapTex = useTexture(`/texture/snow/pattern.jpeg`)
  roughnessMapTex.encoding = sRGBEncoding
  roughnessMapTex.wrapS = roughnessMapTex.wrapT = RepeatWrapping
  roughnessMapTex.repeat.y = 2 / 1.5
  roughnessMapTex.repeat.x = 3.4 / 1.5
  roughnessMapTex.needsUpdate = true

  useFrame((st, dt) => {
    roughnessMapTex.offset.x += dt * 0.2
  })

  let t = 0
  let ptl = useRef()
  useFrame((st, dt) => {
    t += dt

    ptl.current.intensity = (3 + 1.5 * Math.sin(t * 3.1415) + 0.5) * 0.7
  })

  return (
    <group position={[0, 0, 0]}>
      <primitive object={group}></primitive>
      <primitive object={chaser}></primitive>

      {createPortal(
        <Sphere args={[0.45, 35, 35]}>
          <pointLight
            ref={ptl}
            position={[0, 0.0, 0]}
            intensity={3}
          ></pointLight>
          <meshPhysicalMaterial
            metalness={0.0}
            roughness={0}
            reflectivity={3}
            // attenuationColor={`#DD8556`}
            transmission={1}
            thickness={0.45 * 2}
            ior={1.15}
            side={DoubleSide}
            envMapIntensity={0}
            emissive={'#ffffff'}
            color={'#ffffff'}
            // attenuationColor={'#E20074'}
            // transmissionMap={roughnessMapTex}
            attenuationDistance={30}
            emissiveMap={roughnessMapTex}
            emissiveIntensity={1.4}
            roughnessMap={roughnessMapTex}
            metalnessMap={roughnessMapTex}
            alphaMap={roughnessMapTex}
            // normalMap={normalMapTex}
            // envMap={snowNormal}
          ></meshPhysicalMaterial>
        </Sphere>,
        chaser
      )}
    </group>
  )
}
