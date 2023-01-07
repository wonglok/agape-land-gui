import { useCore } from '@/hooks/use-core'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Clock, Spherical, Vector3 } from 'three'

export function AvaZoom({ mouse3d }) {
  let camera = useThree((s) => s.camera)
  let controls = useThree((s) => s.controls)

  let { core, ava } = useMemo(() => {
    let api = {
      loops: [],
      cleans: [],
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

    let ava = new AvaZoomCore({ core: api, controls, mouse3d, camera })

    return { core: api, ava }
  }, [camera, controls, mouse3d])

  useEffect(() => {
    return () => {
      ava.core.clean()
    }
  }, [ava])

  useFrame((st, dt) => {
    core.work(st, dt)
  })

  return null
}

class AvaZoomCore {
  clean() {
    this.core.clean()
  }
  constructor({ core, controls, mouse3d, camera }) {
    if (!controls) {
      return
    }
    this.core = core
    this.mouse3d = mouse3d
    this.camera = camera
    this.controls = controls
    this.keyState = {
      fwdPressed: false,
      bkdPressed: false,
      lftPressed: false,
      rgtPressed: false,

      fwdArrowPressed: false,
      bkdArrowPressed: false,
      lftArrowPressed: false,
      rgtArrowPressed: false,

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

            let distance = controls.getDistance()
            let speed = 1

            if (data?.angle?.radian) {
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
        })
      })

    this.spherical = new Spherical()
    let clock = new Clock()
    this.core.onLoop(() => {
      controls.update()

      let delta = clock.getDelta()

      if (this.keyState.joyStickDown) {
        this.spherical.setFromCartesianCoords(
          this.camera.position.x - this.controls.target.x,
          this.camera.position.y - this.controls.target.y,
          this.camera.position.z - this.controls.target.z
        )

        this.spherical.phi += this.keyState.joyStickVertical * -delta * 0.75
        this.spherical.theta += this.keyState.joyStickHorizontal * -delta * 0.75

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
        this.camera.position.add(this.controls.target)

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

      if (this.keyState.fwdArrowPressed) {
        this.spherical.setFromCartesianCoords(
          this.camera.position.x - this.controls.target.x,
          this.camera.position.y - this.controls.target.y,
          this.camera.position.z - this.controls.target.z
        )

        this.spherical.phi += -0.5 * delta * 0.75
        this.spherical.theta += 0 * delta * 0.75

        if (this.spherical.phi <= 0.03) {
          this.spherical.phi = 0.03
        }
        if (this.spherical.phi >= Math.PI * 0.5) {
          this.spherical.phi = Math.PI * 0.5
        }
        this.camera.position.setFromSpherical(this.spherical)
        this.camera.position.add(this.controls.target)
      }

      if (this.keyState.bkdArrowPressed) {
        this.spherical.setFromCartesianCoords(
          this.camera.position.x - this.controls.target.x,
          this.camera.position.y - this.controls.target.y,
          this.camera.position.z - this.controls.target.z
        )

        this.spherical.phi += 0.5 * delta * 0.75
        this.spherical.theta += 0 * delta * 0.75

        if (this.spherical.phi <= 0.03) {
          this.spherical.phi = 0.03
        }
        if (this.spherical.phi >= Math.PI * 0.5) {
          this.spherical.phi = Math.PI * 0.5
        }
        this.camera.position.setFromSpherical(this.spherical)
        this.camera.position.add(this.controls.target)
      }

      if (this.keyState.lftArrowPressed) {
        this.spherical.setFromCartesianCoords(
          this.camera.position.x - this.controls.target.x,
          this.camera.position.y - this.controls.target.y,
          this.camera.position.z - this.controls.target.z
        )

        this.spherical.phi += -0 * delta * 0.75
        this.spherical.theta += -0.5 * delta * 0.75

        if (this.spherical.phi <= 0.03) {
          this.spherical.phi = 0.03
        }
        if (this.spherical.phi >= Math.PI * 0.5) {
          this.spherical.phi = Math.PI * 0.5
        }
        this.camera.position.setFromSpherical(this.spherical)
        this.camera.position.add(this.controls.target)
      }
      if (this.keyState.rgtArrowPressed) {
        this.spherical.setFromCartesianCoords(
          this.camera.position.x - this.controls.target.x,
          this.camera.position.y - this.controls.target.y,
          this.camera.position.z - this.controls.target.z
        )

        this.spherical.phi += -0 * delta * 0.75
        this.spherical.theta += 0.5 * delta * 0.75

        if (this.spherical.phi <= 0.03) {
          this.spherical.phi = 0.03
        }
        if (this.spherical.phi >= Math.PI * 0.5) {
          this.spherical.phi = Math.PI * 0.5
        }
        this.camera.position.setFromSpherical(this.spherical)
        this.camera.position.add(this.controls.target)
      }
    })
  }
}

class KeyboardControls {
  constructor({ core, parent }) {
    this.core = core
    this.parent = parent
    this.keydown = (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.parent.keyState.fwdArrowPressed = true
          break
        case 'ArrowDown':
          this.parent.keyState.bkdArrowPressed = true
          break
        case 'ArrowRight':
          this.parent.keyState.rgtArrowPressed = true
          break
        case 'ArrowLeft':
          this.parent.keyState.lftArrowPressed = true
          break

        case 'Space':
          this.parent.playerVelocity.y = 5.0
          break
      }
    }

    this.keyup = (e) => {
      switch (e.code) {
        case 'ArrowUp':
          this.parent.keyState.fwdArrowPressed = false
          break
        case 'ArrowDown':
          this.parent.keyState.bkdArrowPressed = false
          break
        case 'ArrowRight':
          this.parent.keyState.rgtArrowPressed = false
          break
        case 'ArrowLeft':
          this.parent.keyState.lftArrowPressed = false
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
