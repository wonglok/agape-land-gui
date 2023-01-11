import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import {
  // Plane,
  // Box,
  // MeshTransmissionMaterial,
  // Detailed,
  // MapControls,
  // OrbitControls,
  // OrthographicCamera,
  Environment,
  PerspectiveCamera,
} from '@react-three/drei'
// import { AmbientLight } from 'three140'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { CoreReady } from '@/content-landing-page/Core/Core'
import { AvatarLanding } from '@/content-landing-page/AvatarLanding/AvatarLanding'
import { Perf } from 'r3f-perf'

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
        <gridHelper args={[1000, 250, '#8F6A1A', '#8F6A1A']}></gridHelper>
      </group>
      <group rotation={[Math.PI * -0.5, 0, 0]} position={[0, 1, 0]}>
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
      {/*  */}]
      {process.env.NODE_ENV === 'development' && (
        <Perf
          showGraph={false}
          minimal={false}
          className='r3f-perf'
          style={{
            right: 'auto',
            top: 'auto',
            left: 0,
            top: 0,
            zIndex: 2000,
          }}
        />
      )}
    </group>
  )
}
