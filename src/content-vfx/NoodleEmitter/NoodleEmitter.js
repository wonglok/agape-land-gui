import { useMemo, useRef } from 'react'
import { NoodleSegmentCompute } from './NoodleSegmentCompute'
import { Object3D, Vector3 } from 'three'
import { NoodleRenderable } from './NoodleRenderable'
// import { ParticleRenderable } from './ParticleRenderable'
import {
  Color,
  DoubleSide,
  FrontSide,
  RepeatWrapping,
  sRGBEncoding,
} from 'three'
import { useCore } from '@/lib/useCore'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'

export function NoodleEmitter({ nameToChase = `myself-player` }) {
  let core = useCore()
  let gl = useThree((s) => s.gl)

  let howManyTracker = 32
  let howLongTail = 128

  let { chaser, group } = useMemo(() => {
    let group = new Object3D()

    let chaser = new Object3D()

    core.onLoop((st, dt) => {
      chaser.rotation.y += dt * 2
    })

    let mouse3d = false
    let up = new Vector3(1, 1, 1)
    let delta = new Vector3(0, 0, 1)
    let adder = new Vector3(0, 0, 0)

    // item
    core.onLoop(({ clock }) => {
      let t = clock.getElapsedTime()
      mouse3d = core.now.scene.getObjectByName(nameToChase)

      if (mouse3d) {
        // let radius = 0.9
        // let speed = 10.5
        adder.copy(mouse3d.position)
        // delta.set(0, 0, radius)
        // up.x = Math.sin(t)
        // up.y = Math.cos(-t)
        // up.z = Math.cos(t)
        // up.normalize()
        // delta.applyAxisAngle(up, 3.141592 + t * speed)
        // adder.add(delta)
        // adder.y += -0.3
        chaser.position.lerp(adder, 0.03)
      }
    })

    let mini = core

    let renderConfig = {
      color: new Color('#ffffff'),
      // emissive: new Color('#ff0000'),
      // emissiveIntensity: 1,
      // envMapIntensity: 0,
      transparent: true,
      opacity: 1.0,
      roughness: 0.1,
      metalness: 0.5,

      // transmission: 0.5,
      // ior: 1.4,
      // thickness: 1.1,
      // side: DoubleSide,

      // // reflectivity: 1,
      // transmission: 0,
      // ior: 1.2,
      // thickness: 0.1,
    }

    // let physics = new PhysicsCompute({
    //   gl: gl,
    //   sizeX: 1,
    //   sizeY: howManyTracker,
    //   tracker: chaser,
    // })

    let sim = new NoodleSegmentCompute({
      node: mini,
      tracker: chaser,
      getTextureAlpha: () => {
        return null //physics.getHeadList()
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
    //   sim,
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

    // ptl.current.intensity = (3 + 1.5 * Math.sin(t * 3.1415) + 0.5) * 0.7
  })

  return (
    <group position={[0, 0, 0]}>
      <primitive object={group}></primitive>
      <primitive object={chaser}></primitive>

      {createPortal(
        <Sphere args={[0.13, 35, 35]}>
          {/* <pointLight
            ref={ptl}
            position={[0, 0.0, 0]}
            intensity={3}
          ></pointLight> */}
          <meshPhysicalMaterial
            metalness={0.0}
            roughness={0}
            reflectivity={3}
            // attenuationColor={`#DD8556`}
            transmission={1}
            thickness={0.1 * 2}
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
