import { DotScene } from '@/compos-scene/DotsScene/DotScene'
import { AgapeSheet } from '@/compos-scene/DotsScene/AgapeSheet'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { SheetProvider } from '@theatre/r3f'

///
///
///
///
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

if (
  process.env.NODE_ENV === 'development' &&
  typeof localStorage !== 'undefined'
) {
  try {
    studio.initialize()
    studio.extend(extension)
  } catch (e) {}
}
///
///
///
///

export default function Index() {
  //
  return (
    <div className='w-full h-full'>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={AgapeSheet}>
          <Suspense fallback={null}>
            <Play></Play>
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

function Play() {
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
  return null
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
