import { UIContent } from '@/lib/UIContent'
import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { GateState } from './GateState'

export function Gate({
  loadingContent = null,
  loggedInContent,
  landingContent,
}) {
  //!SECTION

  let snap = useSnapshot(GateState)

  if (snap.readyStatus === 'loading') {
    return loadingContent
  } else {
    return <group>{snap.session ? loggedInContent : landingContent}</group>
  }
}
