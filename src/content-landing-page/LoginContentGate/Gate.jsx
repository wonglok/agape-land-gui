import { UIContent } from '@/lib/UIContent'
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
    return loggedInContent
  } else {
    return landingContent
  }
}
