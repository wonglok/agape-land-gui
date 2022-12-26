import { useCore } from '@/lib/useCore'
import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  FloatType,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Points,
  PointsMaterial,
  ShaderMaterial,
} from 'three'
import { CustomGPU } from './CustomGPU'
import rainPosShader from './shaders/rainPosShader.glsl'

class Rain {
  constructor({ gl, core }) {
    console.log('init', 'Rain')

    //
    let ym = 128
    let xm = 128
    let gpu = new CustomGPU(xm, ym, gl)
    gpu.setDataType(FloatType)

    let rainPosTex = gpu.createTexture()
    let rainUVTex = gpu.createTexture()

    let dataPos = rainPosTex.image.data

    let slot = []
    let uv = []
    let i = 0
    for (let y = ym; y < ym; y++) {
      for (let x = xm; x < xm; x++) {
        dataPos[i * 4 + 0.0] = 0.0
        dataPos[i * 4 + 1.0] = 0.0
        dataPos[i * 4 + 2.0] = 0.0
        dataPos[i * 4 + 3.0] = 1.0

        slot.push(0, 0, 0)
        uv.push(x / xm, y / ym)
        i++
      }
    }
    rainPosTex.needsUpdate = true
    rainUVTex.needsUpdate = true

    let varRain = gpu.addVariable('rainPosTex', rainPosShader, rainPosTex)
    varRain.material.uniforms.time = { value: 0 }
    varRain.material.uniforms.idxTex = { value: rainUVTex }

    gpu.setVariableDependencies(varRain, [varRain])

    let error = gpu.init()
    if (error) {
      console.log(error)
      return
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(new Float32Array(slot), 3))
    geo.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2))

    const mat = new ShaderMaterial({
      uniforms: {
        readPos: { value: null },
      },
      vertexShader: `
        #include <common>

        uniform float time;
        uniform sampler2D readPos;
        void main (void) {
          vec4 rainData = texture2D(readPos, uv.xy);

          gl_PointSize = 5.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(rainData.rgb, 1.0);
        }
      `,
    })

    let pts = new Points(geo, mat)
    pts.frustumCulled = false
    core.onLoop(() => {
      gpu.compute()

      mat.uniforms.readPos.value = gpu.getCurrentRenderTarget(varRain).texture
    })

    return <primitive object={pts}></primitive>
  }
}

export function Simulation() {
  let core = useCore()
  let gl = useThree((s) => s.gl)

  return useMemo(() => {
    return new Rain({ gl, core })
  }, [gl, core])
}
