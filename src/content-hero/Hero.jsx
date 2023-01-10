import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import { Environment, OrbitControls } from '@react-three/drei'
import { AmbientLight } from 'three140'

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
      <OrbitControls makeDefault></OrbitControls>
      <Background></Background>
      <DirectForceGraph></DirectForceGraph>
      <Environment preset='apartment'></Environment>
    </group>
  )
}
