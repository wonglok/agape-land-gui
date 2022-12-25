import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { VisualEffect } from '../Effects/VisualEffect'
import { WalkerState } from '@/lib/walker/WalkerState'

export function Drinking({ scene }) {
  let { camera, mouse, raycaster, gl } = useThree((s) => {
    return {
      camera: s.camera,
      mouse: s.mouse,
      raycaster: s.raycaster,
      gl: s.gl,
    }
  })

  useEffect(() => {
    let FXBottle = false
    scene.traverse((it) => {
      if (it.name === 'FXBottle') {
        FXBottle = it
      }
    })
    //

    let tt = 0
    gl.domElement.addEventListener('click', () => {
      raycaster.setFromCamera(mouse, camera)
      let res = raycaster.intersectObject(FXBottle, true)
      if (res && res.length > 0) {
        //
        clearTimeout(tt)
        tt = setTimeout(() => {
          VisualEffect.drunk = false
        }, 4000)
        VisualEffect.drunk = true
      }
    })

    gl.domElement.addEventListener('mousemove', () => {
      //
      raycaster.setFromCamera(mouse, camera)
      let res = raycaster.intersectObject(FXBottle, true)
      if (res && res.length > 0) {
        document.body.style.cursor = 'pointer'
      } else {
        document.body.style.cursor = 'auto'
      }
    })
    //
  }, [camera, gl.domElement, mouse, raycaster, scene])
  return null
}
