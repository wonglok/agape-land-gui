import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { RedirectToPage } from '@/lib/login/RedirectToPage'
import { useSnapshot } from 'valtio'

export default function RedirGateHTML({ redirect = '/avatar', children }) {
  let gs = useSnapshot(GateState)

  return (
    <>
      {gs.userSession ? (
        <>{children}</>
      ) : (
        <RedirectToPage redirect={redirect}></RedirectToPage>
      )}
    </>
  )
}

//
