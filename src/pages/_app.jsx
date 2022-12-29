import { useEffect } from 'react'
import Header from '@/config'
import '@/styles/index.css'
import { hydration } from '@/content-landing-page/LoginContentGate/GateMethods'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
import { useSnapshot } from 'valtio'
// import { useSnapshot } from 'valtio'
// import { GateState } from '@/content-landing-page/LoginContentGate/GateState'
// import { SESSION_ACCESS_KEY } from '@/content-landing-page/LoginContentGate/LoginContentGate'
// import { SESSION_ACCESS_KEY } from './google'
// import dynamic from 'next/dynamic'

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: false,
// })

function App({ Component, pageProps = { title: 'index' } }) {
  let gs = useSnapshot(GateState)

  useEffect(() => {
    // if ('xr' in window.navigator) {
    //   window?.navigator?.xr
    //     ?.isSessionSupported('immersive-vr')
    //     .then(
    //       (v) => {
    //         GateState.supportVR = v
    //       },
    //       () => {
    //         GateState.supportVR = false
    //       }
    //     )
    //     .then(() => {
    //       window?.navigator?.xr?.isSessionSupported('immersive-ar').then(
    //         (v) => {
    //           GateState.supportAR = v
    //         },
    //         () => {
    //           GateState.supportAR = false
    //         }
    //       )
    //     })
    // }
  }, [])

  useEffect(() => {
    hydration()
  }, [])

  let SEO = Component.SEO || (() => null)

  return (
    <>
      {/*  */}
      <Header {...pageProps} />
      <SEO {...pageProps}></SEO>

      {gs.readyStatus === 'done' ? (
        <Component {...pageProps} />
      ) : (
        <div
          className='fixed top-0 left-0 flex items-center justify-center w-full h-full  z-100'
          // style={{ backgroundColor: `#F08BDC` }}
        >
          <img
            className='w-6/12 lg:w-64'
            src={`/brand/agape-2.png`}
            alt={'agape town - here we go!'}
          ></img>
        </div>
      )}

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
