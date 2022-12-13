import { Center, Image, Text3D } from '@react-three/drei'
import { createPortal, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import fontJSON from '../../../public/fonts/Days/Days_Regular.json'
export function LoadingGroup() {
  let camera = useThree((s) => s.camera)
  return (
    <group>
      <Suspense fallback={null}>
        {createPortal(
          <group position={[0, 0, -5]}>
            <Image
              position={[0, 0, 0]}
              scale={[2.39, 0.61]}
              transparent={true}
              url={`/brand/agape-2.png`}
            ></Image>

            <BackgroundColor color='#F08BDC'></BackgroundColor>
          </group>,
          camera
        )}

        <primitive object={camera}></primitive>
      </Suspense>
    </group>
  )
}
