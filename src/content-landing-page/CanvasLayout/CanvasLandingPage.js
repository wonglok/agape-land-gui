import { Environment } from '@react-three/drei'
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

          st.scene.background = new Color('#ffffff')
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
          <group scale={0.13} position={[0, 0, -10]}>
            <theVortex key={TheVortex.key}></theVortex>
          </group>
        }
      >
        <Environment
          files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
          background
        ></Environment>
        <NYCJourney></NYCJourney>
      </Suspense>

      <EffectComposer disableNormalPass multisampling={3}>
        <Bloom
          mipmapBlur
          radius={0.5}
          intensity={2}
          luminanceThreshold={0.3}
        ></Bloom>
      </EffectComposer>
      {/*  */}
    </Canvas>
  )
}
