import { Box } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { ServantState } from '../servants-canvas/ServantState'

export const restoreControls = (ev, controls) => {
  if (controls) {
    controls.enabled = true
  }
}
export const disableControls = (ev, controls) => {
  if (controls) {
    controls.enabled = false
  }
}
export const onCancel = (ev, controls) => {
  ServantState.hand = false
  restoreControls(ev, controls)
}
export const onPointerMove = (ev) => {
  if (ServantState.hand) {
    ev.point.y = 0
    ServantState.hand.ds.copy(ev.point).sub(ServantState.hand.ts)
    ServantState.hand.ts.copy(ev.point)
    ServantState.hand.mesh.position.add(ServantState.hand.ds)
  }
}
export const onPointerDown = (ev, controls) => {
  //
  disableControls(ev, controls)
  ServantState.hand = {
    mesh: ev.object,
    data: {
      myData: 1123,
    },
    ts: new Vector3(ev.point.x, 0, ev.point.z),
    ds: new Vector3(0, 0, 0),
  }
}

export function LogicNode({ position = [0, 0, 0] }) {
  const controls = useThree((s) => s.controls)

  return (
    <group>
      {/*  */}

      {/*  */}
      <Box
        args={[1, 0.1, 1]}
        onPointerDown={(ev) => {
          ev.stopPropagation()
          onPointerDown(ev, controls)
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
      ></Box>

      {/*  */}
    </group>
  )
}
