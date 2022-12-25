import React, { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { Uniform, Vector3 } from 'three'
import { BlendFunction } from 'postprocessing'

const fragmentShader = `

uniform sampler2D screen;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // + texture2D(screen, uv)
	outputColor = vec4(inputColor.rgb, inputColor.a);
}

`

export class CustomVisualEffect extends Effect {
  constructor({ fbo }) {
    super('CustomVisualEffect', fragmentShader, {
      blendFunction: BlendFunction.Normal,
      uniforms: new Map([
        //
        ['screen', new Uniform(fbo.texture)],
      ]),
    })
  }
}

// Effect component
export const GLOverlay = forwardRef(function EffectFunc({ fbo }, ref) {
  const effect = useMemo(() => new CustomVisualEffect({ fbo }), [fbo])
  return <primitive ref={ref} object={effect} />
})
