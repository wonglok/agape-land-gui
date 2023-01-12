import { Canvas, useThree } from '@react-three/fiber'
import { Background } from './Background'
import { DirectForceGraph } from './DirectForceGraph'
import {
  Center,
  // Plane,
  // Box,
  // MeshTransmissionMaterial,
  // Detailed,
  // MapControls,
  // OrbitControls,
  // OrthographicCamera,
  Environment,
  PerspectiveCamera,
  Plane,
} from '@react-three/drei'
// import { AmbientLight } from 'three140'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { CoreReady } from '@/content-landing-page/Core/Core'
import { BirdWalk } from '@/content-landing-page/BirdWalk/BirdWalk'
import { Perf } from 'r3f-perf'
import { TheVortex } from '@/content-landing-page/TheVortex/TheVortex'

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
      {/*  */}
      <Background></Background>
      <group position={[0, -5, 0]} rotation={[0, Math.PI * 0.25 * 0.0, 0]}>
        <gridHelper args={[1000, 250, '#8F6A1A', '#8F6A1A']}></gridHelper>
      </group>

      {/* <Plane args={[300, 300]} rotation={[Math.PI * -0.5, 0, 0]}>
        <meshBasicMaterial transparent opacity={0.1}></meshBasicMaterial>
      </Plane> */}

      <group
        rotation={[Math.PI * -0.5 * 0.0, 0, 0]}
        position={[0, 20, 0]}
        scale={1}
      >
        {/* <group scale={[0.1, 0.1, 0.1]} position={[0, 3, 0]}>
          <theVortex key={TheVortex.key}></theVortex>
          <CoreReady></CoreReady>
        </group> */}
        <group scale={0.08}>
          <Center>
            <DirectForceGraph></DirectForceGraph>
          </Center>
        </group>
      </group>

      <Environment preset='apartment'></Environment>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1}></Bloom>
      </EffectComposer>

      <BirdWalk></BirdWalk>

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
