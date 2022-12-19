import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { useFBX } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { AnimationMixer } from 'three'

function Servant({}) {
  let ref = useRef()
  let glb = useGLBLoader(`/servant/lok/lok-compressed.glb`)
  let {
    animations: [hiClip],
  } = useFBX(`/servant/rpm-motion/swim.fbx`)

  //
  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb])

  let me = false
  useFrame(({ clock, scene }) => {
    let t = clock.getElapsedTime()

    mixer.setTime(t)
    me = me || scene.getObjectByName('player-myself')
    if (me) {
      ref.current.position.lerp(me.position, 0.1)
    }
  })

  let hiAct = mixer.clipAction(hiClip)
  hiAct.play()
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <group rotation={[0, 0.0, 0]}>
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
