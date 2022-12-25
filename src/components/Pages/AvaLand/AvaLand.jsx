import { Center, Environment, Text3D, useFBX, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import { Suspense } from 'react'
import { AnimationMixer, Color } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import daysFont from '@/../public/fonts/Days/Days_Regular.json'
export function AvaLand() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Agape></Agape>
        <YoBB></YoBB>
        <YoCam></YoCam>
        <YoBG></YoBG>
      </Suspense>
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={0.7} />
      </EffectComposer>
    </Canvas>
  )
}

function Agape() {
  return (
    <group position={[0, 0.1, 1]} rotation={[-0.3, 0, 0]} scale={0.155}>
      <Center>
        <Text3D
          bevelEnabled
          bevelOffset={-0.01}
          bevelSize={0.05}
          bevelSegments={5}
          font={daysFont}
        >
          {`AGAPE`}
          <meshPhysicalMaterial
            transmission={2}
            ior={1.15}
            thickness={5}
            emissive={'#F08BDC'}
            roughness={0}
            metalness={0}
            color={'#F08BDC'}
          ></meshPhysicalMaterial>
        </Text3D>
      </Center>
    </group>
  )
}

function YoBG() {
  let scene = useThree((s) => s.scene)
  scene.background = new Color('#F08BDC')
  return null
}

function YoCam() {
  let camera = useThree((s) => s.camera)
  camera.position.set(0, -0.3 + 1, 3)
  camera.lookAt(0, -0.3 + 1.2, 0)
  return null
}

function YoBB() {
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
        it.material.color = new Color('#F08BDC')
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
      <gridHelper args={[100, 100, 0x00ffff, 0x00ffff]} />
    </group>
  )
}
