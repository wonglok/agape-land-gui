import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import {
  Detailed,
  MapControls,
  OrbitControls,
  OrthographicCamera,
  Environment,
  PerspectiveCamera,
  Plane,
  Box,
  MeshTransmissionMaterial,
} from '@react-three/drei'
// import { AmbientLight } from 'three140'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { CoreReady } from '@/content-landing-page/Core/Core'
import { AvatarLanding } from '@/content-landing-page/AvatarLanding/AvatarLanding'

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

      {/* <MapControls
        panSpeed={1}
        object-position={[0, 50 * 1.0, 50 * 1.618]}
        object-rotation={[0.0, 0, 0]}
        target={[0, 0, 0]}
        screenSpacePanning={false}
        enableRotate={false}
      ></MapControls> */}

      <Background></Background>

      <group rotation={[0, Math.PI * 0.25 * 0.0, 0]}>
        {/* <gridHelper args={[1000, 100, 0x000000, 0x000000]}></gridHelper> */}
      </group>

      <group rotation={[Math.PI * -0.5, 0, 0]} position={[0, 0.15, 0]}>
        <group scale={0.1} position={[0, 0, 0]}>
          <DirectForceGraph></DirectForceGraph>
        </group>
      </group>

      <Environment preset='apartment'></Environment>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.9} mipmapBlur intensity={3}></Bloom>
      </EffectComposer>

      <CoreReady></CoreReady>

      <AvatarLanding
        mapURL={`/scene/2023-01-07-skycity/skycity.glb`}
      ></AvatarLanding>

      {/*  */}

      {/*  */}
    </group>
  )
}
