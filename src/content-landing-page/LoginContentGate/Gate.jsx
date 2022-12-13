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

  if (snap.readyStatus === 'init' || snap.readyStatus === 'loading') {
    return loadingContent
  }

  if (snap.readyStatus === 'loggedin' && snap.session) {
    return <Suspense fallback={loadingContent}>{loggedInContent}</Suspense>
  } else {
    return <Suspense fallback={loadingContent}>{landingContent}</Suspense>
  }
}
