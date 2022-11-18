import {
  BufferAttribute,
  IcosahedronGeometry,
  SphereGeometry,
  Vector3,
} from 'three'
import { useMemo } from 'react'
import { Perlin } from '@/lib/Perlin'
import { BlobMat } from './BlobMat'
import { getID } from '@/lib/getID'
import {
  BoxBufferGeometry,
  PlaneBufferGeometry,
  SphereBufferGeometry,
} from 'three140'

export function BlobOuter({ radius = 13, children }) {
  let { geo } = useMemo(() => {
    let buffGeoSphere = new IcosahedronGeometry(32, 20)

    let geo = buffGeoSphere

    let k = 2.6
    let time = 0
    let p = new Vector3()
    let sizeArr = []
    for (let i = 0; i < geo.attributes.position.count; i++) {
      p.x = geo.attributes.position.array[i * 3 + 0]
      p.y = geo.attributes.position.array[i * 3 + 1]
      p.z = geo.attributes.position.array[i * 3 + 2]

      p.normalize().multiplyScalar(
        1.75 +
          0.05 * 5 * Perlin.perlin3(p.x * k + time, p.y * k + time, p.z * k)
      )

      sizeArr.push(p.length())
      geo.attributes.position.array[i * 3 + 0] = p.x
      geo.attributes.position.array[i * 3 + 1] = p.y
      geo.attributes.position.array[i * 3 + 2] = p.z
    }
    geo.setAttribute('size', new BufferAttribute(new Float32Array(sizeArr), 1))

    geo.computeVertexNormals()

    let output = geo
    output.scale(radius, radius, radius)

    //
    return {
      geo,
    }
  }, [radius])

  return (
    <mesh key={getID()} geometry={geo}>
      {children}
    </mesh>
  )
}
