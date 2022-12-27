import { Bloom, EffectComposer, SMAA } from '@react-three/postprocessing'
import { GLOverlay } from './GLOverlay'

export function Effect() {
  return (
    <group>
      {/*  */}

      <EffectComposer disableNormalPass resolutionScale={0.1} multisampling={0}>
        <Bloom
          mipmapBlur
          radius={0.7}
          intensity={1.5}
          luminanceThreshold={0.3}
        ></Bloom>
        <GLOverlay></GLOverlay>
      </EffectComposer>
      {/*  */}
    </group>
  )
}
