import { Image } from '@react-three/drei'
import { Suspense } from 'react'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'

export function LoadingGroup() {
  return (
    <group>
      {/*  */}
      <Image
        position={[0, 0, 0]}
        scale={[2.39, 0.61]}
        transparent={true}
        url={`/brand/agape-2.png`}
      ></Image>
      {/*  */}
      <BackgroundColor color='#F08BDC'></BackgroundColor>
    </group>
  )
}
