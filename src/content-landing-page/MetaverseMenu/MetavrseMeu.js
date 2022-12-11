import { Hud, Image } from '@react-three/drei'
import {
  Box,
  Center,
  Environment,
  PerspectiveCamera,
  Text,
  Text3D,
} from '@react-three/drei'
import { GateState } from '../LoginContentGate/GateState'
export function MetaverseMenu() {
  return (
    <>
      <Hud renderPriority={2}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Image
          transparent={true}
          scale={[3.4 * 0.5, 1 * 0.5]}
          url={`/brand/agape-2.png`}
          onClick={(ev) => {
            // console.log(ev)
            GateState.menuOverlay = true
          }}
        ></Image>
      </Hud>
    </>
  )
}
