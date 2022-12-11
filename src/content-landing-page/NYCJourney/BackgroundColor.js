import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Color } from 'three140'

export function BackgroundColor({ color = `#F08BDC` }) {
  let scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.background = new Color(color).convertLinearToSRGB()
  }, [color, scene])

  return null
}
