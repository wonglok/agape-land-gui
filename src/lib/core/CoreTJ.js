import { Object3D } from 'three'

export class CoreTJ extends Object3D {
  constructor() {
    super()
    this.core = {
      loops: [],
      cleans: [],
      onLoop: (v) => {
        this.core.loops.push(v)
      },
      work: (st, dt) => {
        this.core.loops.forEach((it) => it(st, dt))
      },
      clean: () => {
        this.core.cleans.forEach((t) => t())
        this.core.cleans = []
        this.core.loops = []
      },
      onClean: (cl) => {
        this.core.cleans.push(cl)
      },
    }
  }
}
