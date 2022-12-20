import { Color } from 'three'
import fragmentShader from './shader/fragmentShader.glsl'
import vertexShader from './shader/vertexShader.glsl'

export function applyGlass({ core, it }) {
  /** @type {MeshPhysicalMaterial} */
  let cloned = it.material.clone()
  //
  it.material = cloned

  // cloned.map = null
  // cloned.roughness = 0
  // cloned.roughnessMap = null
  // cloned.metalnessMap = null
  // cloned.flatShading = false

  // cloned.attenuationColor = new Color('#ffffff')
  // cloned.emissive = new Color('#000000')
  // cloned.thickness = 30.5
  let t = 0
  core.onLoop((st, dt) => {
    t += dt //
  })
  // cloned.

  it.material.onBeforeCompile = (shader) => {
    //
    //
    shader.uniforms.time = { value: 0 }
    core.onLoop((st, dt) => {
      shader.uniforms.time.value += dt
    })
    //
    shader.vertexShader = vertexShader
    shader.fragmentShader = fragmentShader
    //
  }
  it.material.customProgramCacheKey = () => {
    return fragmentShader + vertexShader
  }
}
