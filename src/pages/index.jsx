import { DotScene } from '@/compos-scene/DotsScene/DotScene'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function Index() {
  return (
    <div className='w-full h-full'>
      {/* {`<OpenMetaverse usingYour={glb.scene} />`} */}
      <Canvas>
        <Suspense fallback={null}>
          <DotScene></DotScene>
        </Suspense>
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
