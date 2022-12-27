import { AvaLand } from '@/components/Pages/AvaLand/AvaLand'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/avatar'>
      <AvaLand></AvaLand>
    </RedirGateHTML>
  )
}

//
