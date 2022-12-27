import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Color } from 'three140'

export function BackgroundColor({ color = `#F08BDC` }) {
  let scene = useThree((s) => s.scene)
  useEffect(() => {
    let origColor = scene.background
    scene.background = new Color(color).convertLinearToSRGB()

    let orig = document.body.style.backgroundColor
    document.body.style.backgroundColor = color
    return () => {
      scene.background = origColor
      document.body.style.backgroundColor = orig
    }
  }, [color, scene])

  return null
}
