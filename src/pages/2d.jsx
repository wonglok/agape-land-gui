/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  loginEth,
  loginGoogle,
  loginGuest,
  loginGuestLocal,
  signOut,
} from '@/content-landing-page/LoginContentGate/GateMethods'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'

export default function Page() {
  let gate = useSnapshot(GateState)
  return (
    <div>
      {gate.userSession && (
        <>
          <img
            className='cursor-pointer'
            src={`/hud/login-logout.png`}
            onClick={() => {
              //
              signOut()
            }}
            // onClick={() => {
            //   //
            //   signOut()
            // }}
          ></img>
        </>
      )}
      {!gate.userSession && (
        <>
          <img
            className='cursor-pointer'
            src={`/hud/login-google.png`}
            onClick={() => {
              //
              loginGoogle()
              //
            }}
          ></img>

          {gate.supportEth && (
            <img
              className='cursor-pointer'
              src={`/hud/login-metamask.png`}
              onClick={() => {
                //
                loginEth()
                //
              }}
            ></img>
          )}

          <img
            className='cursor-pointer'
            src={`/hud/login-guest.png`}
            onClick={() => {
              //
              loginGuest()
              //
            }}
          ></img>

          {/* local */}
          {process.env.NODE_ENV === 'development' && (
            <img
              className='cursor-pointer'
              src={`/hud/login-guest.png`}
              onClick={() => {
                //
                loginGuestLocal()
                //
              }}
            ></img>
          )}
        </>
      )}
    </div>
  )
}
