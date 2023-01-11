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
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { PlaneBufferGeometry } from 'three'
import { BoxBufferGeometry } from 'three'
import { Mesh } from 'three'
import { MeshBasicMaterial } from 'three140'
import { Color } from 'three'

export function AvatarLanding({ mapURL }) {
  let glb = useGLBLoader(mapURL)

  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let destObj = useMemo(() => {
    let dd = new Object3D()
    dd.position.y = 1.0
    return dd
  }, [])

  let clothes = [
    //
    // `/scene/2023-01-07-skycity/lok-dark-armor.glb`,
    `/scene/2023-01-07-skycity/lok-dune.glb`,
    // `/scene/2023-01-07-skycity/lok-jacket.glb`,
    `/scene/2023-01-07-skycity/lok-groom.glb`,
  ]
  let makeFollower = (collider, level = 3, aCore) => {
    if (level < 0) {
      return null
    }

    return (
      <AvatarGuide
        offset={[0.01, 1, 0]}
        chaseDist={1.2}
        speed={aCore.playerSpeed * 0.98}
        destObj={aCore.player}
        collider={collider}
        avatarUrl={clothes[level % clothes.length]}
        onACore={(aCore) => {
          return <group>{makeFollower(collider, level - 1, aCore)}</group>
        }}
      ></AvatarGuide>
    )
  }

  let colliderScene = new Object3D() // clone(glb.scene)
  let floor = new Mesh(
    new BoxBufferGeometry(2000, 0.1, 2000),
    new MeshBasicMaterial({ color: new Color('#ffbaba') })
  )
  colliderScene.add(floor)
  return (
    <group>
      <Collider
        scene={colliderScene}
        onReady={(collider) => {
          return (
            <group>
              {/* <primitive object={colliderScene}></primitive> */}
              <primitive object={glb.scene}></primitive>

              <OrbitControls
                args={[camera, gl.domElement]}
                makeDefault
                enableRotate={false}
                enablePan={false}
                object-position={[0, 10, 10]}
                target={[0, 0, 0]}
              ></OrbitControls>

              {/*  */}

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

              <AvatarGuide
                offset={[0, 2, 2]}
                chaseDist={1}
                speed={2}
                destObj={destObj}
                collider={collider}
                avatarUrl={`/scene/2023-01-07-skycity/loklok-space-ava.glb`}
                onACore={(aCore) => {
                  return (
                    <group>
                      <BirdCamSync player={aCore.player}></BirdCamSync>

                      {makeFollower(collider, 3, aCore)}
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

      <Environment preset='apartment' background></Environment>
    </group>
  )
}
