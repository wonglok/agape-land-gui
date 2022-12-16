import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { AnimationMixer } from 'three140'

export const usePlayAllAnim = (glb) => {
  let mixer = useMemo(() => new AnimationMixer(glb.scene), [glb.scene])
  useFrame((st, dt) => {
    mixer.update(dt)
  })
  useEffect(() => {
    //!SECTION
    glb.animations.forEach((clip) => {
      mixer.clipAction(clip).play()
    })
  }, [glb.animations, mixer])
}
