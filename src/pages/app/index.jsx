import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'

export default function AppBox() {
  let gate = useSnapshot(GateState)
  // tenantID

  return (
    <div>
      {gate.userSession && JSON.stringify(gate.userSession)}
      {/*  */}
      123
      {/*  */}
      123
      {/*  */}
    </div>
  )
}
