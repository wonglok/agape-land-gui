import { DataTexture, FloatType, RGBAFormat } from 'three'

export class Trail {
  constructor({ mouse3D, numOfLines, core }) {
    let array = []
    for (let i = 0; i < numOfLines; i++) {
      array[i * 4 + 0] = 0
      array[i * 4 + 1] = 0
      array[i * 4 + 2] = 0
      array[i * 4 + 3] = 1
    }

    let arrF32 = new Float32Array(array)

    let dataTex = new DataTexture(arrF32, 1, numOfLines, RGBAFormat, FloatType)

    let copy = (array, arrF32, px, py, pz) => {
      array.shift()
      array.shift()
      array.shift()
      array.shift()

      array.push(px)
      array.push(py)
      array.push(pz)
      array.push(0)

      arrF32.set(array, 0)
    }

    core.onLoop(() => {
      copy(
        array,
        arrF32,
        Math.random() * 2.0 - 1.0, // mouse3D.position.x,
        Math.random() * 2.0 - 1.0, // mouse3D.position.y,
        Math.random() * 2.0 - 1.0 // mouse3D.position.z
      )
      dataTex.needsUpdate = true
    })

    this.dataTexture = dataTex
  }
}
