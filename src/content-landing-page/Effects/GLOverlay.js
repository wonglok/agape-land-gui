import React, { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { BlendFunction } from 'postprocessing'
import { useCore } from '@/lib/useCore'
import { Clock } from 'three140'
import { VisualEffect } from './VisualEffect'

export class MyVisual extends Effect {
  constructor({ core }) {
    //
    const fragmentShaderCode = /* glsl */ `

    // uniform vec2 resolution;
    // uniform vec2 texelSize;
    // uniform float cameraNear;
    // uniform float cameraFar;
    // uniform float aspect;

uniform float time;
uniform bool drunk;

      const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

      float noise( in vec2 p ) {
        return sin(p.x)*sin(p.y);
      }

      float fbm4( vec2 p ) {
          float f = 0.0;
          f += 0.5000 * noise( p ); p = m * p * 2.02;
          f += 0.2500 * noise( p ); p = m * p * 2.03;
          f += 0.1250 * noise( p ); p = m * p * 2.01;
          f += 0.0625 * noise( p );
          return f / 0.9375;
      }

      float fbm6( vec2 p ) {
          float f = 0.0;
          f += 0.500000*(0.5 + 0.5 * noise( p )); p = m*p*2.02;
          f += 0.250000*(0.5 + 0.5 * noise( p )); p = m*p*2.03;
          f += 0.125000*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
          f += 0.062500*(0.5 + 0.5 * noise( p )); p = m*p*2.04;
          f += 0.031250*(0.5 + 0.5 * noise( p )); p = m*p*2.01;
          f += 0.015625*(0.5 + 0.5 * noise( p ));
          return f/0.96875;
      }

      float pattern (vec2 p) {
        float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
        return abs(vout);
      }

      void mainUv(inout vec2 uv) {
        if (drunk) {
         uv.x += pattern(uv * 2.5 + time) * 0.07;
         uv.y += pattern(uv * 2.5 - time) * 0.07;
        }
      }

      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = vec4(inputColor.rgb, inputColor.a);
      }

    `
    const myUniforms = {
      //
      drunk: { value: false },
      time: { value: 0 },
      //
    }
    let clock = new Clock()

    core.onLoop(() => {
      myUniforms.drunk.value = VisualEffect.drunk
      myUniforms.time.value = clock.getElapsedTime()
    })

    super('MyVisual', fragmentShaderCode, {
      blendFunction: BlendFunction.Normal,
      uniforms: new Map(
        Object.entries(myUniforms).map(([key, val]) => {
          return [key, val]
        })
      ),
    })
  }
}

// Effect component
export const GLOverlay = forwardRef(function EffectFunc({}, ref) {
  let core = useCore()
  const effect = useMemo(() => new MyVisual({ core }), [core])
  return <primitive ref={ref} object={effect} />
})
