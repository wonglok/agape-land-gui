import {
  Center,
  Environment,
  OrbitControls,
  Sphere,
  Text,
  Text3D,
  useFBX,
  useGLTF,
} from '@react-three/drei'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import { AnimationMixer, Color, MeshStandardMaterial } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import daysFont from '@/../public/fonts/Days/Days_Regular.json'
import { MeshPhysicalMaterial } from 'three140'
import { useCallCore } from '@/hooks/use-call-core'
import { AvaSim } from './AvaSim'
import { Simulation } from './Simulation'
export function AvaLand() {
  return (
    <Canvas>
      <OrbitControls></OrbitControls>

      <Suspense
        fallback={
          <group position={[0, 0.5, 1]} rotation={[-0.35, 0, 0]} scale={0.155}>
            <Agape text={'Loading...'}></Agape>
          </group>
        }
      >
        <Suspense
          fallback={
            <group
              position={[0, 0.5, 1]}
              rotation={[-0.35, 0, 0]}
              scale={0.155}
            >
              <Agape text={'Loading...'}></Agape>
            </group>
          }
        >
          <YoBB></YoBB>
          <group position={[0, 0.5, 1]} rotation={[-0.35, 0, 0]} scale={0.155}>
            <Agape text={`Agape`}></Agape>
          </group>
        </Suspense>

        <Environment preset='apartment'></Environment>
        <YoCam></YoCam>
        <YoBG></YoBG>
      </Suspense>

      <gridHelper args={[100, 100, 0x00ffff, 0x00ffff]} />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur luminanceThreshold={0.98} />
      </EffectComposer>
    </Canvas>
  )
}

function Agape({ text }) {
  return (
    <group>
      <Center>
        <Text3D
          bevelEnabled
          bevelOffset={-0.01}
          bevelSize={0.05}
          bevelSegments={5}
          font={daysFont}
          letterSpacing={0.1}
        >
          {`${text}`}
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

let idx = 0

function YoBB() {
  let [motionURL, setMotion] = useState(
    `/servant/yobb/motion/selected/arms-hip-hop-dance.fbx`
  )
  let glb = useGLTF(`/servant/yobb/avatar/yobb.glb`)

  let {
    animations: [firstClipNeu],
  } = useFBX(motionURL)

  let mixer = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useFrame((_, dt) => {
    mixer.update(dt)
  })

  useEffect(() => {
    mixer.stopAllAction()
    mixer.clipAction(firstClipNeu)?.play()
    glb.scene.traverse((it) => {
      if (it.material) {
        if (it.name === 'capsule_Cube') {
          it.material = new MeshPhysicalMaterial({
            emissive: '#F08BDC',
            emissiveIntensity: 0,
            roughness: 0.0,
            metalness: 1.0,
            color: '#F08BDC',
          })
        }
        it.frustumCulled = false
      }
    })
  }, [firstClipNeu, glb.scene, mixer])

  return (
    <group>
      {glb && <Simulation glb={glb}></Simulation>}
      {glb && <AvaSim glb={glb}></AvaSim>}

      {/*  */}
      <group
        onClick={() => {
          idx++
          idx = idx % MyDances.length
          setMotion(MyDances[idx])
          // setIdx((s) => (s + 1) % MyDances.length)
        }}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <primitive object={glb.scene}></primitive>
      </group>
    </group>
  )
}
