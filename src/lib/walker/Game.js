import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import {
  Box3,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Spherical,
  Vector3,
} from 'three'
import { Line3 } from 'three'
import { GateState } from '@/content-landing-page/LoginContentGate/GateState'

const moduloWrapAround = (offset, capacity) =>
  ((offset % capacity) + capacity) % capacity

export const gameKey = Math.random()
export class Game {
  constructor({ startAt = [0, 3, 0], core = false, name = false, collider }) {
    console.log('init game:', name)
    //
    if (!core) {
      throw new Error('need a core')
    }
    if (!name) {
      throw new Error('need a name')
    }
    this.startAt = startAt
    this.core = core
    this.name = name
    this.collider = collider
    ///////////!SECTION
    this.keyState = {
      fwdPressed: false,
      bkdPressed: false,
      lftPressed: false,
      rgtPressed: false,
      joyStickDown: false,
      joyStickAngle: 0,
      joyStickPressure: 0,
      joyStickSide: 0,
    }

    /////////!SECTION
    this.gravity = -30
    this.playerSpeed = 10
    this.physicsSteps = 3
    this.playerIsOnGround = true

    //////////

    import('nipplejs')
      .then((s) => {
        return s.default
      })
      .then(async (nip) => {
        let zone = document.createElement('div')
        document.body.appendChild(zone)

        // zone.style.cssText = `
        //   display: flex;
        //   justify-content: center;
        //   align-items:center;
        //   position: absolute;
        //   z-index: 200;
        //   bottom: calc(100px / 2);
        //   left: calc(50% - 100px / 2);
        //   width: 100px;
        //   height: 100px;
        // `
        zone.style.zIndex = '100'
        zone.style.position = 'absolute'
        zone.style.display = 'flex'
        zone.style.justifyContent = 'center'
        zone.style.alignItems = 'center'
        zone.style.left = 'calc(50% - 125px / 2)'
        zone.style.bottom = 'calc(125px / 2)'
        zone.style.width = 'calc(125px)'
        zone.style.height = 'calc(125px)'
        zone.style.borderRadius = 'calc(125px)'
        zone.style.userSelect = 'none'
        // zone.style.backgroundColor = 'rgba(0,0,0,1)'
        zone.style.backgroundImage = `url(/hud/walk.png)`
        zone.style.backgroundSize = `cover`
        this.dynamic = nip.create({
          color: 'white',
          zone: zone,
          mode: 'dynamic',
        })

        this.dynamic.on('added', (evt, nipple) => {
          this.dynamic.on('start move end dir plain', (evta, data) => {
            if (evta.type === 'start') {
              this.keyState.joyStickDown = true
            }

            let distance = this.core.now.controls.getDistance()
            let speed = 1

            if (data?.angle?.radian) {
              //
              // //
              // if (data?.direction?.angle === 'up') {
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickPressure =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed

              //   //
              // } else if (data?.direction?.angle === 'right') {
              //   if (data.direction.y == 'up') {
              //     this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5
              //   } else {
              //     this.keyState.joyStickSide =
              //       data.angle.radian - Math.PI * 2.0 - Math.PI * 0.5
              //   }

              //   this.keyState.joyStickPressure =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else if (data?.direction?.angle === 'left') {
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickPressure =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else {
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5
              //   this.keyState.joyStickPressure =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed *
              //     -1.0
              // }

              // console.log(data.vector.y)
              // if (data?.direction?.y == 'up') {
              //   this.keyState.joyStickPressure = data.vector.y
              // } else if (data?.direction?.y == 'down') {
              // }

              this.keyState.joyStickPressure = data.vector.y
              this.keyState.joyStickSide = -data.vector.x * 0.8

              if (this.keyState.joyStickPressure <= -1) {
                this.keyState.joyStickPressure = -1
              }
              if (this.keyState.joyStickPressure >= 1) {
                this.keyState.joyStickPressure = 1
              }

              if (this.keyState.joyStickSide >= Math.PI * 0.5) {
                this.keyState.joyStickSide = Math.PI * 0.5
              }
              if (this.keyState.joyStickSide <= -Math.PI * 0.5) {
                this.keyState.joyStickSide = -Math.PI * 0.5
              }

              //
              // this.keyState.joyStickAngle = data.angle.radian + Math.PI * 1.5
            }

            if (evta.type === 'end') {
              this.keyState.joyStickDown = false
            }
          })
          nipple.on('removed', () => {
            nipple.off('start move end dir plain')
          })

          this.core.onClean(() => {
            nipple.destroy()
            zone.remove()
          })
        })
      })

    this.changeView = ({ far }) => {
      let { camera, controls } = this.core.now

      this.reset()
      camera.position
        .sub(controls.target)
        .normalize()
        .multiplyScalar(far)
        .add(controls.target)
    }

    // character
    this.player = new Mesh(
      new RoundedBoxGeometry(1.0, 2.0, 1.0, 10, 0.5),
      new MeshStandardMaterial()
    )
    this.player.position.fromArray(startAt)
    this.player.geometry.translate(0, -0.5, 0)
    this.player.capsuleInfo = {
      radius: 0.5,
      segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0)),
    }
    this.player.name = 'myself-player'

    ////////!SECTION

    // player.castShadow = true
    // player.receiveShadow = true
    // player.material.shadowSide = 2

    /////////!SECTION
    this.playerVelocity = new Vector3()
    this.upVector = new Vector3(0, 1, 0)
    this.tempVector = new Vector3()
    this.tempVector2 = new Vector3()
    this.tempBox = new Box3()
    this.tempMat = new Matrix4()
    this.tempSegment = new Line3()

    this.keyboardCtrls = new KeyboardControls({ core: this.core, parent: this })
    //

    //
    this.globalCameraPos = new Vector3()
    this.spherical = new Spherical()
    this.deltaRot = new Vector3()
  }

  updatePlayer(delta) {
    let collider = this.collider

    let { camera, controls } = this.core.now

    if (!camera) {
      return
    }
    if (!controls) {
      return
    }
    if (!collider) {
      return
    }

    this.playerVelocity.y += this.playerIsOnGround ? 0 : delta * this.gravity
    this.player.position.addScaledVector(this.playerVelocity, delta)

    // move the player
    const angle = controls.getAzimuthalAngle()
    if (this.keyState.fwdPressed) {
      this.tempVector.set(0, 0, -1).applyAxisAngle(this.upVector, angle)
      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta
      )
    }

    if (this.keyState.bkdPressed) {
      this.tempVector.set(0, 0, 1).applyAxisAngle(this.upVector, angle)
      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta
      )
    }

    if (this.keyState.lftPressed) {
      this.tempVector.set(-1, 0, 0).applyAxisAngle(this.upVector, angle)
      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta
      )
    }

    if (this.keyState.rgtPressed) {
      this.tempVector.set(1, 0, 0).applyAxisAngle(this.upVector, angle)
      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta
      )
    }

    if (this.keyState.joyStickDown) {
      this.tempVector
        .set(0, 0, -1)
        .applyAxisAngle(this.upVector, angle + this.keyState.joyStickAngle)

      controls.object.getWorldPosition(this.globalCameraPos)
      this.globalCameraPos.y = controls.target.y
      let dist = controls.target.distanceTo(this.globalCameraPos)

      this.deltaRot.setFromCylindricalCoords(
        dist,
        controls.getAzimuthalAngle() +
          0.2 * delta * this.keyState.joyStickSide * 15.0
      )
      let y = camera.position.y
      camera.position.sub(controls.target)
      camera.position.copy(this.deltaRot)
      camera.position.add(controls.target)
      camera.position.y = y

      this.player.position.addScaledVector(
        this.tempVector,
        this.playerSpeed * delta * this.keyState.joyStickPressure * 0.75
      )
    }

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

    // adjust the camera
    camera.position.sub(controls.target)
    controls.target.copy(this.player.position)
    camera.position.add(this.player.position)

    // if the player has fallen too far below the level reset their position to the start
    if (this.player.position.y < -25) {
      this.reset()
    }

    if (GateState.xrSession && GateState.xrPlayer) {
      this.player.getWorldPosition(GateState.xrPlayer.position)
    }
  }

  reset() {
    let { camera, controls } = this.core.now
    if (!camera) {
      return
    }
    if (!controls) {
      return
    }
    this.playerIsOnGround = false
    this.playerVelocity.set(0, 0, 0)
    this.player.position.fromArray(this.startAt)
    camera.position.sub(controls.target)
    controls.target.copy(this.player.position)
    camera.position.add(this.player.position)
    controls.update()
  }
}

class KeyboardControls {
  constructor({ core, parent }) {
    this.core = core
    this.parent = parent
    this.keydown = (e) => {
      switch (e.code) {
        case 'KeyW':
          this.parent.keyState.fwdPressed = true
          break
        case 'KeyS':
          this.parent.keyState.bkdPressed = true
          break
        case 'KeyD':
          this.parent.keyState.rgtPressed = true
          break
        case 'KeyA':
          this.parent.keyState.lftPressed = true
          break
        case 'Space':
          this.parent.playerVelocity.y = 5.0

          break
      }
    }

    this.keyup = (e) => {
      switch (e.code) {
        case 'KeyW':
          this.parent.keyState.fwdPressed = false
          break
        case 'KeyS':
          this.parent.keyState.bkdPressed = false
          break
        case 'KeyD':
          this.parent.keyState.rgtPressed = false
          break
        case 'KeyA':
          this.parent.keyState.lftPressed = false
          break
      }
    }
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('keyup', this.keyup)

    this.core.onClean(() => {
      window.removeEventListener('keydown', this.keydown)
      window.removeEventListener('keyup', this.keyup)
    })
  }
}
