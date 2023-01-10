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
    <group>
      {/* <OrbitControls makeDefault></OrbitControls> */}
      <MapControls
        object-position={[0, 0, 100]}
        enableDamping
        screenSpacePanning
        makeDefault
      ></MapControls>
      <Background></Background>
      <DirectForceGraph></DirectForceGraph>
      <Environment preset='apartment'></Environment>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.6} mipmapBlur intensity={3}></Bloom>
      </EffectComposer>
    </group>
  )
}
