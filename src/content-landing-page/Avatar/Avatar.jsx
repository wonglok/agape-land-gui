import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { Box, Cylinder, useFBX } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import { AnimationMixer, Object3D } from 'three'

function Servant({ me = new Object3D() }) {
  let ref = useRef()
  let glb = useGLBLoader(`/servant/lok/lok-compressed.glb`)
  let {
    animations: [hiClip],
  } = useFBX(`/servant/rpm-motion/swim.fbx`)

  //
  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb])

  useFrame(({ clock }) => {
    let t = clock.getElapsedTime()
    mixer.setTime(t)

    //!SECTION

    if (me) {
      ref.current.position.lerp(me.position)
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

export function Avatar({ me }) {
  return (
    <group>
      <Suspense fallback={null}>
        <Servant me={me}></Servant>
      </Suspense>
    </group>
  )
}
