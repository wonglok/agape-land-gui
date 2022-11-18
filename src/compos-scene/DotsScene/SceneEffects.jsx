import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useTweaks } from 'use-tweaks'

export const SceneEffects = () => {
  let bloom = useTweaks('Bloom', {
    mipmapBlur: { value: true },
    intensity: { value: 1, min: 0, max: 5 },
    luminanceSmoothing: { value: 0.5, min: 0, max: 1 },
    luminanceThreshold: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <EffectComposer>
      <Bloom {...bloom}></Bloom>
    </EffectComposer>
  )
}
