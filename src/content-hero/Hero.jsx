import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import { Environment, MapControls, OrbitControls } from '@react-three/drei'
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
      {/* <OrbitControls makeDefault></OrbitControls> */}
      <MapControls
        object-position={[0, 50, 50]}
        object-rotation={[0.0, 0, 0]}
        target={[0, 0, 0]}
        enableDamping
        screenSpacePanning={false}
        makeDefault
        enableRotate={false}
      ></MapControls>
      <Background></Background>

      <gridHelper args={[1000, 100]}></gridHelper>
      <group rotation={[Math.PI * -0.5, 0, 0]}>
        <group scale={0.1} position={[0, 0, 0]}>
          <DirectForceGraph></DirectForceGraph>
        </group>
      </group>
      <Environment preset='apartment'></Environment>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.3} mipmapBlur intensity={1}></Bloom>
      </EffectComposer>
    </group>
  )
}
