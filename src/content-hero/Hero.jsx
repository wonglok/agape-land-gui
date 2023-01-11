import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import {
  Detailed,
  Environment,
  MapControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'
import { AmbientLight } from 'three140'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export function Hero() {
  return (
    <>
      <Canvas>
        <Content></Content>
      </Canvas>
    </>
  )
}

function Content() {
  return (
    <group rotation={[0, 0, 0]}>
      <PerspectiveCamera position={[0, 0, 0]} makeDefault></PerspectiveCamera>

      <MapControls
        panSpeed={1.5}
        object-position={[0, 40 * 1.3, 50 * 1.3]}
        object-rotation={[0.0, 0, 0]}
        target={[0, 0, 0]}
        enableDamping={true}
        screenSpacePanning={false}
        makeDefault
        enableRotate={false}
      ></MapControls>

      <Background></Background>

      <gridHelper args={[500, 50, 0xffaa00, 0xffaa00]}></gridHelper>

      <group rotation={[Math.PI * -0.5, 0, 0]}>
        <group scale={0.1} position={[0, 0, 0]}>
          <DirectForceGraph></DirectForceGraph>
        </group>
      </group>

      <Environment preset='apartment'></Environment>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={3}></Bloom>
      </EffectComposer>
    </group>
  )
}
