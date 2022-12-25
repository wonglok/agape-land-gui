import {
  Center,
  Environment,
  Text,
  Text3D,
  useFBX,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useState } from 'react'
import { Suspense } from 'react'
import { AnimationMixer, Color, MeshStandardMaterial } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import daysFont from '@/../public/fonts/Days/Days_Regular.json'
export function AvaLand() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Agape></Agape>
        <Suspense fallback={<Text>Loading Dance move...</Text>}>
          <YoBB></YoBB>
        </Suspense>
        <Environment preset='apartment'></Environment>
        <gridHelper args={[100, 100, 0x00ffff, 0x00ffff]} />

        <YoCam></YoCam>
        <YoBG></YoBG>
      </Suspense>
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={0.98} />
      </EffectComposer>
    </Canvas>
  )
}

function Agape() {
  return (
    <group position={[0, 0.5, 1]} rotation={[-0.35, 0, 0]} scale={0.155}>
      <Center>
        <Text3D
          bevelEnabled
          bevelOffset={-0.01}
          bevelSize={0.05}
          bevelSegments={5}
          font={daysFont}
          letterSpacing={0.1}
        >
          {`AGAPE`}
          <meshPhysicalMaterial
            transmission={1.5}
            ior={1.15}
            thickness={5.5}
            emissive={'#F08BDC'}
            emissiveIntensity={1}
            roughness={1.0}
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

let MyDances = [
  `/servant/yobb/motion/selected/arms-hip-hop-dance.fbx`,
  `/servant/yobb/motion/selected/balle.fbx`,
  `/servant/yobb/motion/selected/belly-dance.fbx`,
  `/servant/yobb/motion/selected/hi.fbx`,
  `/servant/yobb/motion/selected/idle-basic.fbx`,
  `/servant/yobb/motion/selected/idle-happy.fbx`,
  `/servant/yobb/motion/selected/idle-neutral.fbx`,
  `/servant/yobb/motion/selected/running.fbx`,
  `/servant/yobb/motion/selected/silly-dance.fbx`,
  `/servant/yobb/motion/selected/twist-dance.fbx`,
]

function YoBB() {
  let [idx, setIdx] = useState(0)
  let glb = useGLTF(`/servant/yobb/avatar/yobb.glb`)

  let {
    animations: [firstClipNeu],
  } = useFBX(MyDances[idx])

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useFrame((st, dt) => {
    mixer.update(dt)
  })

  mixer.stopAllAction()
  mixer.clipAction(firstClipNeu)?.play()
  glb.scene.traverse((it) => {
    if (it.material) {
      if (it.name === 'capsule_Cube') {
        it.material = new MeshStandardMaterial({
          transmission: 1.5,
          ior: 1.15,
          thickness: 5.5,
          emissive: '#F08BDC',
          emissiveIntensity: 1,
          roughness: 1.0,
          metalness: 0,
          color: '#F08BDC',
        })
        // it.material.color = new Color('#F08BDC')
      }
      it.frustumCulled = false
    }
  })
  return (
    <group
      onPointerDown={() => {
        setIdx((s) => (s + 1) % MyDances.length)
      }}
    >
      <group rotation={[-Math.PI * 0.5, 0, 0]}>
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}
