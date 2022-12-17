import { BackgroundColor } from '@/content-landing-page/NYCJourney/BackgroundColor'
import { Box } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { LogicNode, onCancel, onPointerMove } from './LogicNode'

export function LogicBoard() {
  let controls = useThree((s) => s.controls)

  return (
    <group>
      <LogicNode></LogicNode>
      <LogicNode></LogicNode>

      {/* ,board */}
      <Box
        onPointerMove={(ev) => {
          onPointerMove(ev, controls)
        }}
        onPointerUp={(ev) => {
          onCancel(ev, controls)
        }}
        onPointerCancel={(ev) => {
          onCancel(ev, controls)
        }}
        onBlur={(ev) => {
          onCancel(ev, controls)
        }}
        args={[1000, 0.1, 1000]}
        visible={false}
      ></Box>

      <gridHelper args={[1000, 500, 0x0000ff, 0x0000ff]}></gridHelper>

      <BackgroundColor color='#333377' />
    </group>
  )
}
