import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useXR, XR } from '@react-three/xr'
import { useEffect } from 'react'

export function SupplyXR({}) {
  return (
    <XR>
      <Inside></Inside>
    </XR>
  )
}
function Inside() {
  let session = useXR((s) => s.session)
  let xrPlayer = useXR((s) => s.player)
  useEffect(() => {
    GateState.xrSession = session
    GateState.xrPlayer = xrPlayer
  }, [session, xrPlayer])
  return null
}
