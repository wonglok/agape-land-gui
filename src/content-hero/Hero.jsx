import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import {
  Detailed,
  Environment,
  MapControls,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
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
        object-position={[0, 50 * 1.0, 50 * 1.618]}
        object-rotation={[0.0, 0, 0]}
        target={[0, 0, 0]}
        enableDamping={true}
        screenSpacePanning={false}
        makeDefault
        enableRotate={false}
      ></MapControls>

      <Background></Background>

      <group rotation={[0, Math.PI * 0.25 * 0.0, 0]}>
        <gridHelper args={[1000, 100, 0x000000, 0x000000]}></gridHelper>
        <Plane
          position={[0, -10, 0]}
          rotation={[-Math.PI * 0.5, 0, 0]}
          args={[1000, 1000]}
        >
          <meshStandardMaterial
            color={'#999999'}
            roughness={1.0}
          ></meshStandardMaterial>
        </Plane>
      </group>

      <group rotation={[Math.PI * -0.5, 0, 0]}>
        <group scale={0.1} position={[0, 0, 0]}>
          <DirectForceGraph></DirectForceGraph>
        </group>
      </group>

      <Environment preset='apartment'></Environment>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.9} mipmapBlur intensity={3}></Bloom>
      </EffectComposer>
    </group>
  )
}
