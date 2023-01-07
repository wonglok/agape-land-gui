import { useFrame } from '@react-three/fiber'

export function BirdCamSync({ player }) {
  useFrame(({ controls, camera }) => {
    //
    if (controls) {
      controls.update()
      camera.position.sub(controls.target)
      controls.target.copy(player.position)
      camera.position.add(player.position)
    }
  })
  return <group></group>
}
