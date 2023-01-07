import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {
  AnimationMixer,
  Box3,
  Clock,
  Color,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  Spherical,
  Vector3,
} from 'three'
import { Line3 } from 'three'
import { useCore } from '@/hooks/use-core'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { applyGlass } from '@/content-vfx/GlassShader/applyGlass'
import { BirdCamSync } from './BirdCamSync'

export const gameKey = Math.random()

const FBXCache = new Map()
const GLBCache = new Map()
export function AvatarGuide({
  collider = new Mesh(),
  destObj = new Object3D(),
  avatarUrl = `/scene/2023-01-07-skycity/loklok-space-ava.glb`,
}) {
  let core = useCore()

  let aCore = useMemo(() => {
    let aCore = new AvatarChaserCore({
      destination: destObj,
      core,
      name: 'chaser avatar',
      collider,
      avatarUrl,
    })

    return aCore
  }, [destObj, core, collider, avatarUrl])

  useEffect(() => {
    return () => {
      //
    }
  }, [aCore])
  //

  return (
    <group>
      {/*  */}

      <primitive object={aCore} />

      <BirdCamSync player={aCore.player}></BirdCamSync>

      {/*  */}
    </group>
  )
}

class AvatarChaserCore extends Object3D {
  constructor({
    destination = new Object3D(),
    core = false,
    name = false,
    collider,
    avatarUrl,
  }) {
    super()
    //
    console.log('init avatar:', name)
    //
    if (!core) {
      throw new Error('need a core')
    }
    if (!name) {
      throw new Error('need a name')
    }

    //
    //
    this.destination = destination
    this.core = core
    this.name = name
    this.collider = collider

    this.core.onClean(() => {
      this.clear()
    })

    this.avatarContainer = new Object3D()
    this.add(this.avatarContainer)
    this.mixer = new AnimationMixer(this.avatarContainer)
    this.actions = {}
    this.makeAction = (name, url) => {
      let realAction = false

      let fbxLoader = new FBXLoader()

      if (!FBXCache.has(url)) {
        FBXCache.set(url, fbxLoader.loadAsync(url))
      }
      let prom = FBXCache.get(url)

      prom.then((fbx) => {
        let [firstAnim] = fbx.animations
        if (firstAnim) {
          realAction = this.mixer.clipAction(firstAnim, this.avatarContainer)

          this.actions[name] = realAction
          if (name === 'standing') {
            realAction.play()
          }
        }
      })
    }

    let draco = new DRACOLoader()
    draco.setDecoderPath('/draco/')
    let loadGLB = new GLTFLoader()
    loadGLB.setDRACOLoader(draco)

    if (!GLBCache.has(avatarUrl)) {
      GLBCache.set(avatarUrl, loadGLB.loadAsync(avatarUrl))
    }

    //
    let prom = GLBCache.get(avatarUrl)
    prom.then((glb) => {
      //
      glb.scene.traverse((it) => {
        //!SECTION
        it.frustumCulled = false
        if (it.material) {
          if (!it.userData.oMat) {
            it.userData.oMat = it.material.clone()
          }

          it.material = new MeshPhysicalMaterial({
            map: it.userData.oMat.map,
            emissive: new Color('#ffffff'),
            emissiveMap: it.userData.oMat.map,
            emissiveIntensity: 0.15,
            normalMap: it.userData.oMat.normalMap,
            roughnessMap: null,
            metalnessMap: null,
            envMapIntensity: 0.0,
            ior: 1.3,
            transmission: 1.5,
            reflectivity: 0.1,
            thickness: 30,
            roughness: 0.8,
            metalness: 0.0,
          })

          applyGlass({ it, core })
        }
      })
      this.avatarContainer.add(glb.scene)
      glb.scene.position.y = -1.52

      this.makeAction('standing', `/rpm/rpm-actions-locomotion/standing.fbx`)
      this.makeAction('running', `/rpm/rpm-actions-locomotion/running.fbx`)

      let clock = new Clock()
      this.core.onLoop(() => {
        let dt = clock.getDelta()
        this.mixer.update(dt)
        this.updatePlayer(dt)
      })

      this.reset()
    })

    ///////////!SECTION
    this.keyState = {
      needToChase: false,
      fwdPressed: false,
      bkdPressed: false,
      lftPressed: false,
      rgtPressed: false,
      joyStickDown: false,
      joyStickAngle: 0,
      joyStickPressure: 0,
      joyStickSide: 0,
    }

    // character
    this.player = new Mesh(
      new RoundedBoxGeometry(1.0, 2.0, 1.0, 10, 0.5),
      new MeshStandardMaterial()
    )

    this.player.geometry.translate(0, -0.5, 0)
    this.player.capsuleInfo = {
      radius: 0.5,
      segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0)),
    }
    this.player.name = 'myself-player'

    /////////!SECTION
    this.gravity = -30
    this.playerSpeed = 10
    this.physicsSteps = 3
    this.playerIsOnGround = true

    this.changeView = ({ far }) => {
      this.reset()
    }

    /////////!SECTION
    this.playerVelocity = new Vector3()
    this.upVector = new Vector3(0, 1, 0)
    this.tempVector = new Vector3()
    this.tempVector2 = new Vector3()
    this.tempBox = new Box3()
    this.tempMat = new Matrix4()
    this.tempSegment = new Line3()

    // this.keyboardCtrls = new KeyboardControls({ core: this.core, parent: this })
    //

    this.globalCameraPos = new Vector3()
    this.spherical = new Spherical()
    this.deltaRot = new Vector3()

    this.destinationV3World = new Vector3()
    this.lookerO3D = new Object3D()
    this.lastAction = false
    this.t = 0
  }

  canRun() {
    if (this.player.position.distanceTo(this.destination.position) >= 2) {
      return true
    }
    return false
  }

  updatePlayer(delta) {
    this.t += delta
    let collider = this.collider

    // let { camera, controls } = this.core.now

    // if (!camera) {
    //   return
    // }
    // if (!controls) {
    //   return
    // }
    if (!collider) {
      return
    }

    this.playerVelocity.y += this.playerIsOnGround ? 0 : delta * this.gravity
    this.player.position.addScaledVector(this.playerVelocity, delta)

    this.avatarContainer.copy(this.player)

    if (this.canRun()) {
      this.player.lookAt(
        this.destination.position.x,
        this.player.position.y,
        this.destination.position.z
      )
    }
    // //
    // this.tempVector.set(0, 0, 1)

    // this.tempVector.applyQuaternion(this.player.quaternion)
    // this.player.position.addScaledVector(
    //   this.tempVector,
    //   this.playerSpeed * delta * 0.5
    // )

    // this.avatarContainer.position.set(
    //   this.player.position.x,
    //   this.player.position.y,
    //   this.player.position.z
    // )

    // this.avatarContainer.quaternion.set(
    //   this.player.quaternion.x,
    //   this.player.quaternion.y,
    //   this.player.quaternion.z,
    //   this.player.quaternion.w
    // )

    //   // this.avatarContainer.copy(this.player)
    //   // this.avatarContainer.position.y -= -1.5

    if (this.canRun()) {
      let speed = 0.5

      this.tempVector.set(0, 0, 1)
      this.tempVector.applyQuaternion(this.player.quaternion)
      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta * speed
      )
    }

    //   this.avatarContainer.position.copy(this.player.position)
    //   this.avatarContainer.quaternion.copy(this.player.quaternion)

    //   // this.player.position.lerp(this.destination, 0.1)
    //   // // this.lookerO3D.copy()
    //   // this.player.getWorldPosition(this.lookerO3D.position)
    //   this.destination.getWorldPosition(this.destinationV3World)
    //   // //

    //   this.lookerO3D.position.copy(this.player.position)
    //   this.destinationV3World.y = this.player.position.y
    //   this.lookerO3D.lookAt(this.destinationV3World)

    //   this.player.quaternion.slerp(this.lookerO3D.quaternion, 0.15)

    let shouldDo = null

    if (this.actions.standing && this.actions.running) {
      if (this.canRun()) {
        shouldDo = this.actions.running
      } else {
        shouldDo = this.actions.standing
      }

      if (this.lastAction) {
        if (shouldDo !== this.lastAction) {
          if (this.lastAction) {
            this.lastAction.fadeOut(0.3).play()
          }
          if (shouldDo) {
            shouldDo.reset().play()
          }
        }
      }
      this.lastAction = shouldDo
    }

    // if (this.keyState.needToChase) {
    //   if (this.lastAction) {
    //     if (this.actions.running !== this.lastAction) {
    //       this.lastAction.fadeOut(0.5).play()
    //       this.actions.running.reset().play()
    //     }
    //   }
    // } else {
    //   if (this.lastAction) {
    //     if (this.actions.standing !== this.lastAction) {
    //       this.lastAction.fadeOut(0.5).play()
    //       this.actions.standing.reset().play()
    //     }
    //   }
    // }

    // // move the player
    // const angle = controls.getAzimuthalAngle()
    // if (this.keyState.fwdPressed) {
    // this.tempVector.set(0, 0, -1).applyAxisAngle(this.upVector, 0.0)
    // this.player.position.addScaledVector(
    //   this.tempVector,
    //   this.playerSpeed * delta
    // )
    // }

    // if (this.keyState.bkdPressed) {
    //   this.tempVector.set(0, 0, 1).applyAxisAngle(this.upVector, angle)
    //   this.player.position.addScaledVector(
    //     this.tempVector,
    //     this.playerSpeed * delta
    //   )
    // }

    // if (this.keyState.lftPressed) {
    //   this.tempVector.set(-1, 0, 0).applyAxisAngle(this.upVector, angle)
    //   this.player.position.addScaledVector(
    //     this.tempVector,
    //     this.playerSpeed * delta
    //   )
    // }

    // if (this.keyState.rgtPressed) {
    //   this.tempVector.set(1, 0, 0).applyAxisAngle(this.upVector, angle)
    //   this.player.position.addScaledVector(
    //     this.tempVector,
    //     this.playerSpeed * delta
    //   )
    // }

    // if (this.keyState.joyStickDown) {
    //   this.tempVector
    //     .set(0, 0, -1)
    //     .applyAxisAngle(this.upVector, angle + this.keyState.joyStickAngle)

    //   controls.object.getWorldPosition(this.globalCameraPos)
    //   this.globalCameraPos.y = controls.target.y
    //   let dist = controls.target.distanceTo(this.globalCameraPos)

    //   this.deltaRot.setFromCylindricalCoords(
    //     dist,
    //     controls.getAzimuthalAngle() +
    //       0.2 * delta * this.keyState.joyStickSide * 15.0
    //   )
    //   let y = camera.position.y
    //   camera.position.sub(controls.target)
    //   camera.position.copy(this.deltaRot)
    //   camera.position.add(controls.target)
    //   camera.position.y = y

    //   this.player.position.addScaledVector(
    //     this.tempVector,
    //     this.playerSpeed * delta * this.keyState.joyStickPressure * 0.75
    //   )
    // }

    this.player.updateMatrixWorld()

    // adjust player position based on collisions
    const capsuleInfo = this.player.capsuleInfo
    this.tempBox.makeEmpty()
    this.tempMat.copy(this.collider.matrixWorld).invert()
    this.tempSegment.copy(capsuleInfo.segment)

    // get the position of the capsule in the local space of the collider
    this.tempSegment.start
      .applyMatrix4(this.player.matrixWorld)
      .applyMatrix4(this.tempMat)
    this.tempSegment.end
      .applyMatrix4(this.player.matrixWorld)
      .applyMatrix4(this.tempMat)

    // get the axis aligned bounding box of the capsule
    this.tempBox.expandByPoint(this.tempSegment.start)
    this.tempBox.expandByPoint(this.tempSegment.end)

    this.tempBox.min.addScalar(-capsuleInfo.radius)
    this.tempBox.max.addScalar(capsuleInfo.radius)

    this.collider.geometry.boundsTree.shapecast({
      intersectsBounds: (box) => box.intersectsBox(this.tempBox),

      intersectsTriangle: (tri) => {
        // check if the triangle is intersecting the capsule and adjust the
        // capsule position if it is.
        const triPoint = this.tempVector
        const capsulePoint = this.tempVector2

        const distance = tri.closestPointToSegment(
          this.tempSegment,
          triPoint,
          capsulePoint
        )
        if (distance < capsuleInfo.radius) {
          const depth = capsuleInfo.radius - distance
          const direction = capsulePoint.sub(triPoint).normalize()

          this.tempSegment.start.addScaledVector(direction, depth)
          this.tempSegment.end.addScaledVector(direction, depth)
        }
      },
    })

    // get the adjusted position of the capsule collider in world space after checking
    // triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
    // the origin of the player model.
    const newPosition = this.tempVector
    newPosition.copy(this.tempSegment.start).applyMatrix4(collider.matrixWorld)

    // check how much the collider was moved
    const deltaVector = this.tempVector2
    deltaVector.subVectors(newPosition, this.player.position)

    // if the player was primarily adjusted vertically we assume it's on something we should consider ground
    this.playerIsOnGround =
      deltaVector.y > Math.abs(delta * this.playerVelocity.y * 0.25)

    const offset = Math.max(0.0, deltaVector.length() - 1e-5)
    deltaVector.normalize().multiplyScalar(offset)

    // adjust the player model
    this.player.position.add(deltaVector)

    if (!this.playerIsOnGround) {
      deltaVector.normalize()
      this.playerVelocity.addScaledVector(
        deltaVector,
        -deltaVector.dot(this.playerVelocity)
      )
    } else {
      this.playerVelocity.set(0, 0, 0)
    }

    // // adjust the camera
    // camera.position.sub(controls.target)
    // controls.target.copy(this.player.position)
    // camera.position.add(this.player.position)

    // if the player has fallen too far below the level reset their position to the start
    if (this.player.position.y < -25) {
      this.reset()
    }
    // if (this.player.position.distanceTo(this.destination.position) >= 35) {
    //   this.reset()
    // }
  }

  reset() {
    // let { camera } = this.core.now
    // if (!camera) {
    //   return
    // }
    // if (!controls) {
    //   return
    // }

    this.playerIsOnGround = false
    this.playerVelocity.set(0, 0, 0)
    this.player.position.copy(this.destination.position)

    this.player.position.y += 1.1
    this.player.position.x += 2
  }
}

//
