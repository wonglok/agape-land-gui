import { useEffect } from 'react'
import Header from '@/config'
import '@/styles/index.css'
import { SESSION_ACCESS_KEY } from '@/content-landing-page/LoginContentGate/LoginContentGate'
// import { SESSION_ACCESS_KEY } from './google'
// import dynamic from 'next/dynamic'

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: false,
// })

function App({ Component, pageProps = { title: 'index' } }) {
  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const sTokenInURL = params.get('token')
    if (sTokenInURL) {
      localStorage.setItem(SESSION_ACCESS_KEY, sTokenInURL)
      window.location.assign(window.location.origin)
    }
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
