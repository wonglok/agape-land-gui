import { useCore } from '@/hooks/use-core'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Clock, Spherical, Vector3 } from 'three'

export function AvaZoom({ mouse3d }) {
  let get = useThree((s) => s.get)
  let camera = useThree((s) => s.camera)
  let controls = useThree((s) => s.controls)

  let { core, ava } = useMemo(() => {
    let api = {
      loops: [],
      cleans: [],
      now: {},
      onLoop: (v) => {
        api.loops.push(v)
      },
      work: (st, dt) => {
        api.loops.forEach((it) => it(st, dt))
      },
      clean: () => {
        api.cleans.forEach((t) => t())
        api.cleans = []
        api.loops = []
      },
      onClean: (cl) => {
        api.cleans.push(cl)
      },
    }

    let st = get()
    for (let kn in st) {
      api.now[kn] = st[kn]
    }

    let ava = new AvaZoomCore({ core: api, controls, mouse3d, camera })

    return { core: api, ava }
  }, [camera, controls, mouse3d, get])

  useEffect(() => {
    return () => {
      ava.clean()
    }
  }, [ava])

  useFrame((st, dt) => {
    for (let kn in st) {
      core.now[kn] = st[kn]
    }
    core.work(st, dt)
  })

  return null
}

class AvaZoomCore {
  clean() {
    this.core.clean()
  }
  constructor({ core, controls, mouse3d, camera }) {
    this.core = core
    this.mouse3d = mouse3d
    this.camera = camera
    this.keyState = {
      fwdPressed: false,
      bkdPressed: false,
      lftPressed: false,
      rgtPressed: false,
      joyStickDown: false,
      joyStickAngle: 0,
      joyStickVertical: 0,
      joyStickHorizontal: 0,
    }
    this.keyboard = new KeyboardControls({ core: this.core, parent: this })
    this.tempVector = new Vector3()
    this.upVector = new Vector3(0, 1, 0)
    this.mouse3dSpeed = 10

    this.globalCameraPos = new Vector3()
    this.deltaRot = new Vector3()
    //////////

    import('nipplejs')
      .then((s) => {
        return s.default
      })
      .then(async (nip) => {
        document.querySelector('#avacontrols')?.remove()
        core.onClean(() => {
          document.querySelector('#avacontrols')?.remove()
        })
        let zone = document.createElement('div')
        zone.id = 'avacontrols'
        document.body.appendChild(zone)

        //
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
        //
        zone.style.zIndex = '100'
        zone.style.position = 'absolute'
        zone.style.display = 'flex'
        zone.style.justifyContent = 'center'
        zone.style.alignItems = 'center'

        zone.style.left = '25px'
        zone.style.bottom = '25px'
        // zone.style.left = 'calc(50% - 85px / 2)'
        // zone.style.bottom = 'calc(85px / 2)'
        zone.style.width = 'calc(85px)'
        zone.style.height = 'calc(85px)'
        zone.style.borderRadius = 'calc(85px)'
        zone.style.userSelect = 'none'
        // zone.style.backgroundColor = 'rgba(0,0,0,1)'=
        zone.style.backgroundImage = `url(/hud/rot.svg)`
        zone.style.backgroundSize = `cover`
        zone.style.backdropFilter = 'invert(1)'
        zone.style.userSelect = `none`
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
              //   this.keyState.joyStickHorizontal = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed

              //   //
              // } else if (data?.direction?.angle === 'right') {
              //   if (data.direction.y == 'up') {
              //     this.keyState.joyStickHorizontal = data.angle.radian - Math.PI * 0.5
              //   } else {
              //     this.keyState.joyStickHorizontal =
              //       data.angle.radian - Math.PI * 2.0 - Math.PI * 0.5
              //   }

              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else if (data?.direction?.angle === 'left') {
              //   this.keyState.joyStickHorizontal = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else {
              //   this.keyState.joyStickHorizontal = data.angle.radian - Math.PI * 0.5
              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed *
              //     -1.0
              // }

              // console.log(data.vector.y)
              // if (data?.direction?.y == 'up') {
              //   this.keyState.joyStickVertical = data.vector.y
              // } else if (data?.direction?.y == 'down') {
              // }

              this.keyState.joyStickVertical = data.vector.y
              this.keyState.joyStickHorizontal = -data.vector.x

              if (this.keyState.joyStickVertical <= -0.4) {
                this.keyState.joyStickVertical = -0.4
              }
              if (this.keyState.joyStickVertical >= 0.4) {
                this.keyState.joyStickVertical = 0.4
              }

              if (this.keyState.joyStickHorizontal >= 0.4) {
                this.keyState.joyStickHorizontal = 0.4
              }
              if (this.keyState.joyStickHorizontal <= -0.4) {
                this.keyState.joyStickHorizontal = -0.4
              }

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
          })

          this.spherical = new Spherical()

          let clock = new Clock()
          this.core.onLoop(() => {
            let delta = clock.getDelta()
            // let angle = controls.getAzimuthalAngle()
            if (this.keyState.joyStickDown) {
              // controls.object.getWorldPosition(this.globalCameraPos)
              // this.globalCameraPos.y = controls.target.y
              // let dist = controls.target.distanceTo(this.globalCameraPos)

              // this.deltaRot.setFromCylindricalCoords(
              //   dist,
              //   controls.getAzimuthalAngle() +
              //     delta * this.keyState.joyStickHorizontal
              // )

              // let y = camera.position.y
              // camera.position.sub(controls.target)
              // camera.position.copy(this.deltaRot)
              // camera.position.add(controls.target)
              // camera.position.y = y

              this.spherical.setFromCartesianCoords(
                this.camera.position.x - controls.target.x,
                this.camera.position.y - controls.target.y,
                this.camera.position.z - controls.target.z
              )

              this.spherical.phi +=
                this.keyState.joyStickVertical * -delta * 0.75
              this.spherical.theta +=
                this.keyState.joyStickHorizontal * -delta * 0.75

              //
              // this.spherical.radius +=
              //   this.keyState.joyStickVertical * delta * 10.0

              // if (this.spherical.radius <= 0.5) {
              //   this.spherical.radius = 0.5
              // }
              // if (this.spherical.radius >= 50) {
              //   this.spherical.radius = 50
              // }

              if (this.spherical.phi <= 0.03) {
                this.spherical.phi = 0.03
              }
              if (this.spherical.phi >= Math.PI * 0.5) {
                this.spherical.phi = Math.PI * 0.5
              }
              this.camera.position.setFromSpherical(this.spherical)
              this.camera.position.add(controls.target)

              // this.tempVector
              //   .set(0, 0, -1)
              //   .applyAxisAngle(
              //     this.upVector,
              //     angle + this.keyState.joyStickAngle
              //   )

              // this.mouse3d.position.addScaledVector(
              //   this.tempVector,
              //   this.mouse3dSpeed *
              //     delta *
              //     this.keyState.joyStickVertical *
              //     0.75
              // )
            }
          })
        })
      })
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

        case 'ArrowUp':
          this.parent.keyState.joyStickVertical = 0.5
          break
        case 'ArrowDown':
          this.parent.keyState.joyStickVertical = -0.5
          break
        case 'ArrowLeft':
          this.parent.keyState.joyStickHorizontal = 0.5
          break
        case 'ArrowRight':
          this.parent.keyState.joyStickHorizontal = -0.5
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

        case 'ArrowUp':
          this.parent.keyState.joyStickVertical = 0
          break
        case 'ArrowDown':
          this.parent.keyState.joyStickVertical = -0
          break
        case 'ArrowRight':
          this.parent.keyState.joyStickHorizontal = 0
          break
        case 'ArrowLeft':
          this.parent.keyState.joyStickHorizontal = -0
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
