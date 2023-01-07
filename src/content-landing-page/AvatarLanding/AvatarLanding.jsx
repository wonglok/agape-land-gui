import { Collider } from '@/lib/collider/Collider'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
import { WalkerGame } from '@/lib/walker/WalkerGame'
import { Avatar } from '../Avatar/Avatar'
import { useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { AvatarChaser } from '../AvatarChaser/AvatarChaser'
import { AvatarGuide } from './AvatarGuide'
import { Mouse3D } from '@/content-vfx/Noodle/Mouse3D'
import { useMemo } from 'react'
import { Object3D } from 'three'
import { BirdCamSync } from './BirdCamSync'

export function AvatarLanding({ mapURL }) {
  let glb = useGLBLoader(mapURL)

  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let destObj = useMemo(() => {
    let dd = new Object3D()
    dd.position.y = 2.5
    return dd
  }, [])
  return (
    <group>
      <Collider
        scene={glb.scene}
        onReady={(collider) => {
          return (
            <group>
              <primitive object={glb.scene}></primitive>

              {/* <group position={[0, 1.5, 0]}>
                <group position={[5.523, 6.087, -14.196]}>
                  <group scale={0.075}>
                    <theVortex key={TheVortex.key}></theVortex>
                  </group>
                </group>
              </group> */}

              <OrbitControls
                args={[camera, gl.domElement]}
                makeDefault
                enableRotate={false}
                enablePan={false}
                object-position={[0, 10, 10]}
                target={[0, 0, 0]}
              ></OrbitControls>

              {/* <WalkerGame
                startAt={[
                  0, 1.5, 0,
                  // 2.563503709126706,
                  // 1.595614002597168 + 1.5,
                  // 45.14220988974003,
                ]}
                glb={glb}
                collider={collider}
                onGameReady={({ game, core }) => {
                  //
                  //
                }}
              ></WalkerGame>

              <Avatar></Avatar> */}

              {/* <AvatarChaser collider={collider}></AvatarChaser>

 */}

              <group>
                <Mouse3D mouse3d={destObj} collider={collider}></Mouse3D>
              </group>
              <AvatarGuide destObj={destObj} collider={collider}></AvatarGuide>
            </group>
          )
        }}
      ></Collider>

      <Environment preset='apartment' background></Environment>
    </group>
  )
}
