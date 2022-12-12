import { useEffect } from 'react'
import Header from '@/config'
import '@/styles/index.css'
import {
  // loadSession,
  restoreTokenFromURL,
} from '@/content-landing-page/LoginContentGate/GateMethods'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
// import { useSnapshot } from 'valtio'
// import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
// import { SESSION_ACCESS_KEY } from '@/content-landing-page/LoginContentGate/LoginContentGate'
// import { SESSION_ACCESS_KEY } from './google'
// import dynamic from 'next/dynamic'

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: false,
// })

function App({ Component, pageProps = { title: 'index' } }) {
  useEffect(() => {
    if ('xr' in window.navigator) {
      window.navigator.xr.isSessionSupported('immersive-vr').then(
        (v) => {
          GateState.supportVR = v
        },
        () => {
          GateState.supportVR = false
        }
      )
    }
  }, [])

  useEffect(() => {
    restoreTokenFromURL()
  }, [])

  return (
    <>
      <Header title={pageProps.title} />
      <Component {...pageProps} />

      {/* {Component?.r3f && <>{Component.r3f(pageProps)}</>} */}

      <span
        style={{
          display: 'block',
          position: 'absolute',
          zIndex: 10,
        }}
        id='myroot'
      ></span>
    </>
  )
}

export default App
