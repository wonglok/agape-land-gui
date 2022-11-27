import { Center, Environment, Text, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  SelectiveBloom,
} from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Color, sRGBEncoding } from 'three'
import { Core } from '../Core/Core'
import { NYCJourney } from '../NYCJourney/NYCJourey'
import { TheVortex } from '../TheVortex/TheVortex'

export function CanvasPage({}) {
  return (
    <Canvas
      //
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      {...{
        gl: { antialias: false, logarithmicDepthBuffer: false },
        onCreated: (st) => {
          st.events.connect(document.body)

          st.scene.background = new Color('#00ffff')
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
          st.gl.shadowMap.enabled = false

          Core.now.canvas = Core.makeAutoNode('canvas')
          for (let kn in st) {
            Core.now.canvas.now[kn] = st[kn]
          }
          st.gl.setAnimationLoop(Core.work)
        },
      }}
    >
      <Suspense
        fallback={
          <group position={[0, 0, -10]}>
            <Text fontSize={2} color='#ff00ff'>
              AGAPE Town
            </Text>
          </group>
        }
      >
        <Environment
          files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
        ></Environment>
        <NYCJourney></NYCJourney>
      </Suspense>

      <EffectComposer resolutionScale={0.1} disableNormalPass multisampling={4}>
        <Bloom
          mipmapBlur
          radius={0.5}
          intensity={2}
          width={256}
          height={256}
          luminanceThreshold={0.3}
        ></Bloom>
      </EffectComposer>
      {/*  */}
    </Canvas>
  )
}
