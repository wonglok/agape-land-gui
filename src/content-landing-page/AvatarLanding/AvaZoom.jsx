import { useCore } from '@/hooks/use-core'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Clock, Spherical, Vector3 } from 'three'

export function AvaZoom({ mouse3d }) {
  let core = useMemo(() => {
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
    return api
  }, [])

  useFrame((st, dt) => {
    for (let kn in st) {
      core.now[kn] = st[kn]
    }
    core.work(st, dt)
  })

  useEffect(() => {
    return () => {
      core.clean()
    }
  }, [core])

  let camera = useThree((s) => s.camera)
  let controls = useThree((s) => s.controls)
  useEffect(() => {
    if (!controls) {
      return
    }
    let ava = new AvaZoomCore({ core, controls, mouse3d, camera })
    return () => {
      ava.clean()
    }
  }, [core, controls, mouse3d, camera])
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
      joyStickPressure: 0,
      joyStickSide: 0,
    }

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
        zone.style.left = 'calc(50% - 65px / 2)'
        zone.style.bottom = 'calc(65px / 2)'
        zone.style.width = 'calc(65px)'
        zone.style.height = 'calc(65px)'
        zone.style.borderRadius = 'calc(65px)'
        zone.style.userSelect = 'none'
        // zone.style.backgroundColor = 'rgba(0,0,0,1)'=
        zone.style.backgroundImage = `url(/hud/rot.svg)`
        zone.style.backgroundSize = `cover`
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
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickVertical =
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

              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else if (data?.direction?.angle === 'left') {
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5

              //   this.keyState.joyStickVertical =
              //     (Math.min(Math.abs(data.distance / 50.0) * 4, 5) / 5.0) *
              //     speed
              // } else {
              //   this.keyState.joyStickSide = data.angle.radian - Math.PI * 0.5
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
              this.keyState.joyStickSide = -data.vector.x * 0.8

              if (this.keyState.joyStickVertical <= -1) {
                this.keyState.joyStickVertical = -1
              }
              if (this.keyState.joyStickVertical >= 1) {
                this.keyState.joyStickVertical = 1
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
          })

          this.spherical = new Spherical()

          let clock = new Clock()
          this.core.onLoop(() => {
            let delta = clock.getDelta()
            let angle = controls.getAzimuthalAngle()
            if (this.keyState.joyStickDown) {
              controls.object.getWorldPosition(this.globalCameraPos)
              this.globalCameraPos.y = controls.target.y
              let dist = controls.target.distanceTo(this.globalCameraPos)

              this.deltaRot.setFromCylindricalCoords(
                dist,
                controls.getAzimuthalAngle() +
                  delta * this.keyState.joyStickSide
              )

              let y = camera.position.y
              camera.position.sub(controls.target)
              camera.position.copy(this.deltaRot)
              camera.position.add(controls.target)
              camera.position.y = y

              this.spherical.setFromCartesianCoords(
                this.camera.position.x - controls.target.x,
                this.camera.position.y - controls.target.y,
                this.camera.position.z - controls.target.z
              )

              this.spherical.phi +=
                this.keyState.joyStickVertical * -delta * 0.75
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
              if (this.spherical.phi >= Math.PI * 0.5 * 0.9) {
                this.spherical.phi = Math.PI * 0.5 * 0.9
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
