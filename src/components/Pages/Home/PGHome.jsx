/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { StylesDashboard } from '@/components/Shared/StylesDashboard'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'
import { LeftMenu } from './Compos/LeftMenu'
import { Dash } from './Dash/Dash'
import { DesktopOnly } from '@/lib/desktop/DesktopOnly'

export function PGHome({ content }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      <DesktopOnly>
        <StylesDashboard></StylesDashboard>
        <LeftMenu></LeftMenu>
        <Dash></Dash>
      </DesktopOnly>
    </>
  )
}
