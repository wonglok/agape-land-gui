import { Collider } from '@/lib/collider/Collider'
// import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'
// import { WalkerGame } from '@/lib/walker/WalkerGame'
// import { Avatar } from '../Avatar/Avatar'
import { createPortal, useThree } from '@react-three/fiber'
import {
  CubeCamera,
  Environment,
  MeshRefractionMaterial,
  MeshTransMissionMaterial,
  MeshTransmissionMaterial,
  OrbitControls,
  useEnvironment,
  useGLTF,
} from '@react-three/drei'
// import { AvatarChaser } from '../AvatarChaser/AvatarChaser'
//Suspense,
import { AvatarGuide } from './AvatarGuide'
import { useMemo } from 'react'
import { Object3D, RepeatWrapping } from 'three'
import { Mouse3D } from '@/content-vfx/Noodle/Mouse3D'
import { Noodle } from '@/content-vfx/Noodle/Noodle'
import { AvaZoom } from './AvaZoom'
import { BirdCamSync } from './BirdCamSync'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
// import { PlaneBufferGeometry } from 'three'
// import { BoxBufferGeometry, DoubleSide } from 'three'
// import { Mesh } from 'three'
// import { MeshBasicMaterial } from 'three140'
// import { Color } from 'three'
// import { MeshReflectorMaterial } from '@react-three/drei'

export function BirdWalk({
  fromPos = [-114.53729027988135, -3.5075186591256147, 38.81601512130067],
}) {
  let gl = useThree((s) => s.gl)
  let camera = useThree((s) => s.camera)

  let destObj = useMemo(() => {
    let dd = new Object3D()
    dd.position.y = 1.0

    return dd
  }, [])
  destObj.position.fromArray(fromPos)

  // let clothes = [
  //   //
  //   `/scene/2023-01-07-skycity/lok-dune.glb`,
  //   `/scene/2023-01-07-skycity/lok-jacket.glb`,
  //   `/scene/2023-01-07-skycity/lok-groom.glb`,
  //   `/scene/2023-01-07-skycity/lok-dark-armor.glb`,
  // ]
  // let makeFollower = (collider, level = 3, aCore) => {
  //   if (level < 0) {
  //     return null
  //   }

  //   window.follow = aCore.player

  //   return (
  //     <AvatarGuide
  //       offset={[0.01, 1, 0]}
  //       chaseDist={1.2}
  //       speed={aCore.playerSpeed * 0.98}
  //       destObj={aCore.player}
  //       collider={collider}
  //       avatarUrl={clothes[level % clothes.length]}
  //       onACore={(aCore) => {
  //         return <group>{makeFollower(collider, level - 1, aCore)}</group>
  //       }}
  //     ></AvatarGuide>
  //   )
  // }

  let colliderScene = new Object3D() // clone(glb.scene)
  // let floor = new Mesh(
  //   new BoxBufferGeometry(2000, 0.1, 2000),
  //   new MeshBasicMaterial({ color: new Color('#ffbaba') })
  // )
  // floor.position.y = -1

  //public/
  let querlo = useGLTF(`/places/grass/grass.glb`)
  // let querlo = useGLBLoader(`/xr/upsacel4x/querlo-island.glb`)

  // colliderScene.add(floor)
  colliderScene.traverse((it) => {
    if (it.name === 'ground') {
      it.visible = false
    }
  })

  let cloneQuerlo = clone(querlo.scene)
  colliderScene.add(cloneQuerlo)
  let island = cloneQuerlo.getObjectByName('Terrain001')
  if (island) {
    island.material.map.wrapS = island.material.map.wrapS = RepeatWrapping
    island.material.map.repeat.set(30, 30)
  }

  // let querlo2 = {
  //   scene: clone(querlo.scene),
  // }
  // querlo2.scene.position.x += 50
  // colliderScene.add(querlo2.scene)

  // let querlo3 = {
  //   scene: clone(querlo.scene),
  // }
  // querlo3.scene.position.x -= 50
  // colliderScene.add(querlo3.scene)

  /*

    <MeshTransmissionMaterial
            {...{
              transmissionSampler: false,
              samples: 5,
              resolution: 512,
              transmission: 1,
              roughness: 0.3,
              thickness: 2.5,
              ior: 1.5,
              chromaticAberration: 0.26,
              anisotropy: 0.3,
              distortion: 0.3,
              distortionScale: 0.3,
              temporalDistortion: 0.5,
              attenuationDistance: 0.5,
              attenuationColor: '#ffffff',
              color: '#ffffff',
              side: DoubleSide,
            }}
          ></MeshTransmissionMaterial>*/
  // let tex = useEnvironment({ preset: 'apartment' })
  let controls = useThree((r) => r.controls)

  return (
    <group>
      <primitive object={cloneQuerlo}></primitive>
      {/* <primitive object={querlo2.scene}> </primitive>
      <primitive object={querlo3.scene}> </primitive> */}

      {/* {island &&
        createPortal(
          <MeshRefractionMaterial
            side={DoubleSide}
            envMap={tex}
            bounces={5}
            ior={1.4}
            fresnel={0.1}
            aberrationStrength={0.1}
            color={'#ffffff'}
            fastChroma={true}
          ></MeshRefractionMaterial>,
          island
        )} */}

      <OrbitControls
        args={[camera, gl.domElement]}
        makeDefault
        enableRotate={false}
        enablePan={false}
        object-position={[fromPos[0], fromPos[1] + 25, fromPos[2] + 25]}
        target={fromPos}
      ></OrbitControls>

      <Collider
        scene={colliderScene}
        onReady={(collider) => {
          return (
            <group>
              {/* <primitive object={colliderScene}></primitive> */}
              <group
              // onClick={(ev) => {
              //   console.log(ev.object?.name)
              // }}
              >
                {/* <primitive object={showGLB}></primitive> */}
              </group>
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
                offset={[0, 0, 0]}
                chaseDist={1}
                speed={2}
                destObj={destObj}
                collider={collider}
                avatarUrl={`/scene/2023-01-07-skycity/loklok-space-ava.glb`}
                onACore={(aCore) => {
                  if (controls) {
                    controls.object.position.set(
                      fromPos[0],
                      fromPos[1] + 25,
                      fromPos[2] + 25
                    )
                    controls.target.fromArray(fromPos)
                  }

                  aCore.player.position.fromArray(fromPos)
                  destObj.position.fromArray(fromPos)
                  return (
                    <group>
                      <BirdCamSync player={aCore.player}></BirdCamSync>

                      {/* {makeFollower(collider, 0, aCore)} */}
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

      <Environment files={`/hdr/shanghai_bund_1k.hdr`} background></Environment>
    </group>
  )
}
