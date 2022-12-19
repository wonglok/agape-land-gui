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
  } = useFBX(`/servant/rpm-motion/float.fbx`)

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
      <Box visible={false} args={[0.3, 1, 0.3]} onPointerDown={() => {}}></Box>

      <pointLight power={3.5} position={[-0.3, 0.5, 0.3]}></pointLight>
      <pointLight
        power={3.5}
        color='hotpink'
        position={[-0.3, 0.5, -0.3]}
      ></pointLight>
      <group rotation={[0, 0.0, 0]}>
        <primitive object={glb.scene}></primitive>

        <Cylinder args={[1, 1, 0.15, 6, 6]} position={[0, -0.125, 0]}>
          <meshPhysicalMaterial
            transmission={1}
            thickness={10}
            roughness={0}
            reflectivity={1}
            metalness={0.3}
          ></meshPhysicalMaterial>
        </Cylinder>
      </group>
    </group>
  )
}

export function Avatar({ me }) {
  console.log(me)
  return (
    <group>
      <Suspense fallback={null}>
        <Servant me={me}></Servant>
      </Suspense>
      {/*  */}
    </group>
  )
}
