// import { useTweaksDisable } from '@/lib/useTweakDisable'
import { Bloom, EffectComposer, SSR } from '@react-three/postprocessing'
import { useEffect, useState } from 'react'
import { useTheatreProps } from './AgapeSheet'

export const SceneEffects = () => {
  let myBloom = useTheatreProps('Bloom', {
    mipmapBlur: { type: 'boolean', value: true },
    intensity: { type: 'number', value: 1, range: [1, 5] },
    luminanceSmoothing: { type: 'number', value: 0.5, range: [0, 1] },
    luminanceThreshold: { type: 'number', value: 0.1, range: [0, 1] },
  })

  return (
    <EffectComposer>
      <Bloom {...myBloom}></Bloom>
      <SSR></SSR>
    </EffectComposer>
  )
}
