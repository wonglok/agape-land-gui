import { useComputeEnvMap } from '@/lib/useComputeEnvMap'
import { useTweaksDisable } from '@/lib/useTweakDisable'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
// import { RGBELoader } from 'three-stdlib'
import { EquirectangularReflectionMapping } from 'three'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { forwardRef, useEffect } from 'react'
import { useTheatreProps } from './AgapeSheet'

// const LightFwd = forwardRef(function FowradLight({ rotYaxis }, ref) {

// })

// export const Light = e(LightFwd, 'group')

export function Light() {
  //

  // let [hdrURL, setHDRURL] = useState(
  //   `/company-car/map/hdr/wooden_lounge_1k.hdr`
  // )

  // let texture = useLoader(RGBELoader, hdrURL)

  let texture = useTexture(`/env/galaxy2048.png`)
  texture.mapping = EquirectangularReflectionMapping

  let bg = useTexture(`/env/stars4096-2048.jpeg`)
  bg.mapping = EquirectangularReflectionMapping
  bg.encoding = sRGBEncoding

  let { rotY, envLightIntensity } = useTheatreProps('ComputedEnvMap', {
    envLightIntensity: { type: 'number', value: 0.5, range: [0, 10] },
    rotY: { type: 'number', value: 0, range: [0, 2] },

    //rotY
    // mipmapBlur: { type: 'boolean', value: true },
    // intensity: { type: 'number', value: 1, range: [1, 5] },
    // luminanceSmoothing: { type: 'number', value: 0.5, range: [0, 1] },
    // luminanceThreshold: { type: 'number', value: 0.1, range: [0, 1] },
  })

  // let { envLightIntensity, rotY } = useTweaksDisable('ComputedEnvMap', {
  //   rotY: { value: 0.5, min: -10, max: 10 },
  //   envLightIntensity: { value: 1, min: 0, max: 20 },
  // })
  //
  let uniforms = {
    rotY: { value: rotY },
    envLightIntensity: { value: envLightIntensity },
    hdrTexture: { value: bg },
  }

  useEffect(() => {
    //
  }, [])

  //

  let { envMap } = useComputeEnvMap(
    `
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

float pattern (vec2 p, float time) {
  float vout = fbm4( p + time + fbm6(  p + fbm4( p + time )) );
  return abs(vout);
}

uniform sampler2D hdrTexture;
uniform float envLightIntensity;
varying vec3 vWorldDirection;
varying vec3 vPos;
#define RECIPROCAL_PI 0.31830988618
#define RECIPROCAL_PI2 0.15915494

uniform float time;
uniform float rotY;

mat3 rotateY(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

vec4 mainImage ()  {
  vec3 direction = normalize( vWorldDirection * rotateY(rotY));
  vec2 uv;
  uv.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
  uv.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

  vec4 hdrTextureC4 = texture2D(hdrTexture, uv);

  vec4 outColor;
  outColor.a = 1.0;

  // outColor.rgb = vec3(
  //   pattern(vPos.zy * 2.0 + 0.1, time * 0.1),
  //   pattern(vPos.zy * 2.0 + 0.0, time * 0.1),
  //   pattern(vPos.zy * 2.0 + -0.1, time * 0.1)
  // );


  outColor += hdrTextureC4;

  outColor *= envLightIntensity;

  return outColor;
}
`,
    uniforms,
    64,
    true
  )

  let scene = useThree((s) => s.scene)
  scene.environment = envMap

  scene.background = texture

  return (
    <group>
      <e.directionalLight
        theatreKey={'UpperLight'}
        intensity={0.3}
        color={'#0000ff'}
        position={[0, 1.67, 3]}
      ></e.directionalLight>
    </group>
  )
}
