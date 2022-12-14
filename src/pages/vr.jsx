import {
  Walker,
  XRContent,
} from '@/content-landing-page/MetaverseWelcome/XRUserControls'
import {
  Environment,
  EnvironmentPortal,
  Lightformer,
  useEnvironment,
  useGLTF,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { VRButton } from '@react-three/xr'
import { BoxBufferGeometry } from 'three140'

export default function VR() {
  return (
    <>
      <Canvas gl={{ antialias: true }}>
        <Content></Content>
      </Canvas>
      <VRButton></VRButton>
    </>
  )
}

function Content() {
  let glb = useGLTF(`/scene/2022-11-28-NYC/NYC_Expo_30.glb`)

  return (
    <group>
      <Environment background preset='night'>
        <group position={[6, 0, 0]}>
          <Lightformer
            form='rect' // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color='orange' // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]} // Target position (optional = undefined)
            position={[15, 10, -10]}
          />
          <Lightformer
            form='rect' // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color='cyan' // (optional = white)
            scale={[5, 10]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]} // Target position (optional = undefined)
            position={[-15, 10, -10]}
          />
        </group>
      </Environment>
      <XRContent>
        {/**/}
        <primitive object={glb.scene}></primitive>{' '}
      </XRContent>
    </group>
  )
}
