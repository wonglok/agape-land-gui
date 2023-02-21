import { getID } from '@/lib/getID'
import { useFrame, useThree } from '@react-three/fiber'
import { forwardRef, useMemo } from 'react'
import { Clock, TextureLoader } from 'three'
import { CanvasDrawTexture } from './CanvasDrawTexture'
import fragmentShader from './shader/fragmentShader.glsl'
import vertexShader from './shader/vertexShader.glsl'

export const MixMat = forwardRef(function MixMat({ mat1, mat2 }, ref) {
  let time = useMemo(() => {
    return { value: 0 }
  }, [])

  useFrame((st, dt) => {
    time.value += dt * 0.25
  })

  let raycaster = useThree((s) => s.raycaster)
  let camera = useThree((s) => s.camera)
  let mouse = useThree((s) => s.mouse)
  let scene = useThree((s) => s.scene)
  return (
    <>
      {mat1 && mat2 && (
        <meshPhysicalMaterial
          ref={ref}
          /////////////////////////////////////////////////
          //
          map={mat1.map}
          //
          normalMap={mat1.normalMap}
          //
          roughnessMap={mat1.roughnessMap}
          metalnessMap={mat1.metalnessMap}
          //
          /////////////////////////////////////////////////

          /////////////////////////////////////////////////
          //

          onBeforeCompile={(shader) => {
            shader.uniforms.time = time
            shader.uniforms.mixRatio = { value: 0.5 }

            let dt = 0
            let clock = new Clock()
            setInterval(() => {
              dt = clock.getDelta()
              shader.uniforms.mixRatio.value += dt * 0.25
              if (shader.uniforms.mixRatio.value >= 1.0) {
                shader.uniforms.mixRatio.value = 0.0
              }
            })

            shader.uniforms.mixMask = { value: null }

            new TextureLoader().load(
              `/material/mask/mask-2k.png`,
              (mixMaskTex) => {
                // mixMaskTex.flipY = true
                //
                // mixMaskTex.wrapS = RepeatWrapping
                // mixMaskTex.wrapT = RepeatWrapping
                // mixMaskTex.repeat.setX(1)
                // mixMaskTex.repeat.setY(1)
                // mixMaskTex.needsUpdate = true
                // mixMaskTex.generateMipmaps = true

                shader.uniforms.mixMask.value = mixMaskTex

                let canvasDraw = new CanvasDrawTexture()
                canvasDraw.swapImageWithCanvasOnTexture(mixMaskTex)

                window.addEventListener('pointermove', (ev) => {
                  raycaster.setFromCamera(mouse, camera)
                  const intersects = raycaster.intersectObject(scene, true)
                  if (intersects.length > 0 && intersects[0].uv) {
                    const uv = intersects[0].uv
                    // intersects[0].object.material.map.transformUv(uv)
                    canvasDraw.setCrossPosition(uv.x, 1.0 - uv.y)
                  }
                })

                //canvasDraw
              }
            )

            shader.uniforms.map2 = { value: mat2.map }
            shader.uniforms.normalMap2 = { value: mat2.normalMap }
            shader.uniforms.roughnessMap2 = { value: mat2.roughnessMap }
            shader.uniforms.metalnessMap2 = { value: mat2.metalnessMap }

            //
            shader.vertexShader = vertexShader
            shader.fragmentShader = fragmentShader
            //
            //
          }}
          customProgramCacheKey={() => {
            return vertexShader + fragmentShader
          }}
          key={vertexShader + fragmentShader + getID()}
        ></meshPhysicalMaterial>
      )}
    </>
  )
})
