import { useComputeEnvMap } from '@/lib/useComputeEnvMap'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { sRGBEncoding } from 'three'
// import { RGBELoader } from 'three-stdlib'
import { EquirectangularReflectionMapping } from 'three'
import { useTweaks } from 'use-tweaks'

export function Light({}) {
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

  //
  let { envLightIntensity, rotY } = useTweaks('ComputedEnvMap', {
    rotY: { value: 0.5, min: -10, max: 10 },
    envLightIntensity: { value: 2.61, min: -10, max: 10 },
  })

  //
  let uniforms = {
    rotY: { value: rotY },
    envLightIntensity: { value: envLightIntensity },
    hdrTexture: { value: bg },
  }

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
vec4 mainImage (vec2 uv, vec3 direction, vec3 pos)  {

  vec4 hdrTextureC4 = texture2D(hdrTexture, uv);

  hdrTextureC4.rgb *= hdrTextureC4.a;

  hdrTextureC4.rgb *= vec3(
    1.0 - pattern(uv.xy * 15.0 + 0.1, time * 0.01),
    1.0 - pattern(uv.xy * 15.0 + 0.0, time * 0.01),
    1.0 - pattern(uv.xy * 15.0 + -0.1, time * 0.01)
  );

  hdrTextureC4 *= envLightIntensity;

  return hdrTextureC4;
}
`,
    uniforms,
    16,
    true
  )
  let scene = useThree((s) => s.scene)
  scene.environment = envMap

  scene.background = texture

  return null
}
