import { UIContent } from '@/lib/UIContent'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { GateState } from './GateState'

export function Gate({
  // loadingContent = null,
  loggedInContent,
  landingContent,
}) {
  //!SECTION

  let snap = useSnapshot(GateState)

  return <group>{snap.userSession ? loggedInContent : landingContent}</group>
  // if (snap.readyStatus === 'loading') {
  //   return loadingContent
  // } else {
  //   return
  // }
}
