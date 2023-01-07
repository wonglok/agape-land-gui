import { Collider } from '@/lib/collider/Collider'
import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
// import { WalkerGame } from '@/lib/walker/WalkerGame'
// import { Avatar } from '../Avatar/Avatar'
import { useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
// import { AvatarChaser } from '../AvatarChaser/AvatarChaser'
import { AvatarGuide } from './AvatarGuide'
import { useMemo } from 'react'
import { Object3D } from 'three'
import { Mouse3D } from '@/content-vfx/Noodle/Mouse3D'
import { Noodle } from '@/content-vfx/Noodle/Noodle'
import { AvaZoom } from './AvaZoom'
import { BirdCamSync } from './BirdCamSync'

export function AvatarLanding({ mapURL }) {
  let glb = useGLBLoader(mapURL)

  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let destObj = useMemo(() => {
    let dd = new Object3D()
    dd.position.y = 1.0
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

              <OrbitControls
                args={[camera, gl.domElement]}
                makeDefault
                enableRotate={false}
                enablePan={false}
                object-position={[0, 10, 10]}
                target={[0, 0, 0]}
              ></OrbitControls>

              {/* <group position={[0, 1.5, 0]}>
                <group position={[5.523, 6.087, -14.196]}>
                  <group scale={0.075}>
                    <theVortex key={TheVortex.key}></theVortex>
                  </group>
                </group>
              </group> */}

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

              {/* <AvatarChaser collider={collider}></AvatarChaser> */}

              {/*  */}
              <AvatarGuide
                chaseDist={2}
                speed={1.5}
                destObj={destObj}
                collider={collider}
                onACore={(aCore) => {
                  return (
                    <group>
                      <BirdCamSync player={aCore.player}></BirdCamSync>

                      <AvatarGuide
                        offset={[0, 2, 2]}
                        chaseDist={2}
                        destObj={aCore.player}
                        collider={collider}
                        speed={aCore.playerSpeed * 0.8}
                        onACore={(aCore) => {
                          return (
                            <group>
                              <AvatarGuide
                                offset={[0, 2, 2]}
                                chaseDist={2}
                                destObj={aCore.player}
                                collider={collider}
                                speed={aCore.playerSpeed * 0.8}
                                onACore={(aCore) => {
                                  return (
                                    <group>
                                      <AvatarGuide
                                        chaseDist={2}
                                        destObj={aCore.player}
                                        collider={collider}
                                        speed={aCore.playerSpeed * 0.8}
                                        onACore={(aCore) => {
                                          return <group></group>
                                        }}
                                      ></AvatarGuide>
                                    </group>
                                  )
                                }}
                              ></AvatarGuide>
                            </group>
                          )
                        }}
                      ></AvatarGuide>
                    </group>
                  )
                }}
              ></AvatarGuide>

              {/*  */}
              <Mouse3D collider={collider} mouse3d={destObj}></Mouse3D>

              {/*  */}
              <AvaZoom mouse3d={destObj}></AvaZoom>

              {/*  */}
              <Noodle mouse3d={destObj}></Noodle>
            </group>
          )
        }}
      ></Collider>

      <gridHelper
        args={[100, 100, 0x008888, 0x008888]}
        position={[0, 0.01, 0]}
      ></gridHelper>
      <Environment preset='apartment' background></Environment>
    </group>
  )
}
