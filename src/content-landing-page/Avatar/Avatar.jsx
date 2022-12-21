import { applyGlass } from '@/content-vfx/GlassShader/applyGlass'
import { useCore } from '@/hooks/use-core'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { useFBX } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { Suspense, useMemo, useRef } from 'react'
import {
  AnimationMixer,
  Color,
  MeshPhysicalMaterial,
  Object3D,
  Vector2,
} from 'three'

function Servant({}) {
  let ref = useRef()
  let glb = useGLBLoader(`/servant/lok/lok-compressed.glb`)

  //
  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb])

  let me = false

  let looker = new Object3D()
  let {
    animations: [idleClip],
  } = useFBX(`/rpm/rpm-actions-locomotion/standing.fbx`)
  let {
    animations: [movingClip],
  } = useFBX(`/rpm/rpm-actions-locomotion/running.fbx`)

  let idleAct = mixer.clipAction(idleClip)

  let movingAct = mixer.clipAction(movingClip)

  let core = useCore()
  useEffect(() => {
    glb.scene.traverse((it) => {
      //!SECTION
      if (it.material) {
        if (!it.userData.oMat) {
          it.userData.oMat = it.material.clone()
        }

        it.material = new MeshPhysicalMaterial({
          map: it.userData.oMat.map,
          emissive: new Color('#ffffff'),
          emissiveMap: it.userData.oMat.map,
          emissiveIntensity: 0.1,
          normalMap: it.userData.oMat.normalMap,
          roughnessMap: null,
          metalnessMap: null,
          envMapIntensity: 0.0,
          ior: 1.3,
          transmission: 1.5,
          reflectivity: 0.1,
          thickness: 30,
          roughness: 0.8,
          metalness: 0.0,
        })
        // applyGlass({ core, it })
        // it.material = new MeshPhysicalMaterial({
        //   transmission: 1,
        //   roughness: 0,
        //   ior: 1.4,
        //   thickness: 3.0,
        // })
      }
    })
  }, [core, glb.scene])

  let last = idleAct
  useFrame(({ clock, scene, controls }) => {
    let t = clock.getElapsedTime()

    mixer.setTime(t)
    me = me || scene.getObjectByName('myself-player')

    if (me && ref.current) {
      if (controls) {
        if (controls.getDistance() <= 0.45) {
          ref.current.visible = false
        } else {
          ref.current.visible = true
        }
      }
      if (ref.current.position.distanceTo(me.position) <= 0.1) {
        // looker.lookAt(camera.position)

        if (last) {
          if (idleAct !== last) {
            last.fadeOut(0.5).play()
            idleAct.reset().play()
          }
        }
        last = idleAct
      } else {
        looker.position.y = me.position.y
        looker.lookAt(me.position)

        if (last) {
          if (movingAct !== last) {
            last.fadeOut(0.5).play()
            movingAct.reset().play()
          }
        }
        last = movingAct
      }

      looker.position.copy(ref.current.position)
      ref.current.position.lerp(me.position, 0.2)

      if (ref.current) {
        ref.current.quaternion.slerp(looker.quaternion, 0.16)
      }
    }
  })

  return (
    <group ref={ref}>
      <group position={[0, -1.52, 0]}>
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}

export function Avatar() {
  return (
    <group>
      <Suspense fallback={null}>
        <Servant></Servant>
      </Suspense>
    </group>
  )
}
