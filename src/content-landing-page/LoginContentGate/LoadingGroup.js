import { Center, Html, Image, Text3D } from '@react-three/drei'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'

export function LoadingGroup() {
  let camera = useThree((s) => s.camera)
  let cloned = camera.clone()

  useFrame(() => {
    camera.getWorldPosition(cloned.position)
    camera.getWorldQuaternion(cloned.quaternion)
  })
  return (
    <group>
      <Suspense fallback={null}>
        <Html
          calculatePosition={(el, cam, size) => {
            return [size.width / 2, size.height / 2]
          }}
          center
        >
          <img
            className='w-6/12 lg:w-64'
            src={`/brand/agape-2.png`}
            alt={'agape town - here we go!'}
          ></img>
        </Html>

        {/* <BackgroundColor color='#F08BDC'></BackgroundColor> */}

        {createPortal(
          <group position={[0, 0, -5]}>
            {/* <Image
              position={[0, 0, 0]}
              scale={[2.39, 0.61]}
              transparent={true}
              url={`/brand/agape-2.png`}
            ></Image> */}
            {/* <Html center>
              <img
                className='w-6/12 lg:w-64'
                src={`/brand/agape-2.png`}
                alt={'agape town - here we go!'}
              ></img>
            </Html> */}
          </group>,
          cloned
        )}
        <primitive object={cloned}></primitive>
      </Suspense>
    </group>
  )
}
