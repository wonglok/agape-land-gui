import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three140'

export function BirdCamSync({ player }) {
  let lerpPos = new Vector3()
  useFrame(({ controls, camera }) => {
    //
    lerpPos.lerp(player.position, 0.1)
    if (controls) {
      controls.update()
      camera.position.sub(controls.target)
      controls.target.copy(lerpPos)
      camera.position.add(lerpPos)
    }
  })
  return <group></group>
}
