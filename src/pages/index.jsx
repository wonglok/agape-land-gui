import { DotScene } from '@/compos-scene/DotsScene/DotScene'
import { AgapeSheet } from '@/compos-scene/DotsScene/AgapeSheet'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { SheetProvider } from '@theatre/r3f'

export default function Index() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      AgapeSheet.project.ready.then(() =>
        AgapeSheet.sequence.play({
          iterationCount: Infinity,
          range: [0, 6],
          direction: 'alternate',
        })
      )
    }
  }, [])

  //
  return (
    <div className='w-full h-full'>
      {/* {`<OpenMetaverse usingYour={glb.scene} />`} */}
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={AgapeSheet}>
          <Suspense fallback={null}>
            <DotScene></DotScene>
          </Suspense>
        </SheetProvider>
      </Canvas>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Agape Land',
    }, // will be passed to the page component as props
  }
}

///

//

///

//
