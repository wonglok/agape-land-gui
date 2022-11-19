import Header from '@/config'
import '@/styles/index.css'
// import dynamic from 'next/dynamic'

// const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
//   ssr: false,
// })

import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

// create-react-app
if (
  process.env.NODE_ENV === 'development' &&
  typeof localStorage !== 'undefined'
) {
  try {
    studio.initialize()
    studio.extend(extension)
  } catch (e) {}
}

function App({ Component, pageProps = { title: 'index' } }) {
  return (
    <>
      <Header title={pageProps.title} />
      <Component {...pageProps} />

      {/* {Component?.r3f && <>{Component.r3f(pageProps)}</>} */}

      <span
        style={{
          display: 'inline-block',
          position: 'absolute',
          zIndex: 10,
        }}
        id='myroot'
      ></span>
    </>
  )
}

export default App
