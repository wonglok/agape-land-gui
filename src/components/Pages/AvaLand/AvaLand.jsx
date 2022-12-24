import { Environment, useFBX, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Suspense } from 'react'
import { AnimationMixer, Color } from 'three'

export function AvaLand() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <SillyGoose></SillyGoose>
        <YoCam></YoCam>
      </Suspense>
    </Canvas>
  )
}

function YoCam() {
  let camera = useThree((s) => s.camera)
  camera.position.set(0, 1, 3)
  camera.lookAt(0, 1.2, 0)
  return null
}
function SillyGoose() {
  let glb = useGLTF(`/servant/yobb/avatar/yobb.glb`)
  let {
    animations: [firstClipNeu],
  } = useFBX(`/servant/yobb/motion/selected/idle-neutral.fbx`)

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useFrame((st, dt) => {
    mixer.update(dt)
  })
  mixer.clipAction(firstClipNeu)?.play()
  glb.scene.traverse((it) => {
    if (it.material) {
      if (it.name === 'capsule_Cube') {
        it.material.color = new Color('#ff0000')
      }
      it.frustumCulled = false
    }
  })
  return (
    <group>
      <group rotation={[-Math.PI * 0.5, 0, 0]}>
        <primitive object={glb.scene}></primitive>
      </group>
      <Environment preset='apartment'></Environment>
      <gridHelper args={[100, 100, 0xffffff, 0xbababa]} />
    </group>
  )
}
