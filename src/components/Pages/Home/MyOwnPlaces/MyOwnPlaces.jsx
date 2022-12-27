import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'
import { SectionHeader } from '../Compos/SectionHeader'

export function MyOwnPlaces() {
  let gs = useSnapshot(GateState)

  return (
    <div className='relative h-full max-h-screen ease-soft-in-out xl:ml-68.5 transition-all duration-200'>
      <SectionHeader
        title='Places'
        subTitle='Where you can hangout'
        bgImage='/brand/place.webp'
        bgOffsetY={52}
      ></SectionHeader>
    </div>
  )
}
