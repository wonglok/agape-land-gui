/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { StylesDashboard } from '@/components/Shared/StylesDashboard'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'
import { LeftMenu } from '../Compos/LeftMenu'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'
import { SectionHeader } from '../Compos/SectionHeader'

export function PGPlaces({ content }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <div className='relative h-full max-h-screen ease-soft-in-out xl:ml-68.5 transition-all duration-200'>
          <SectionHeader
            title='Domain'
            subTitle='Where you can hangout'
            bgImage='/brand/place.webp'
            bgOffsetY={52}
          ></SectionHeader>
        </div>
      </DesktopOnly>
    </>
  )
}
