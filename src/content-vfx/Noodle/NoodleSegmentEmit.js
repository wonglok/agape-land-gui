import {
  Vector3,
  // BufferAttribute,
  // CylinderBufferGeometry,
  // InstancedBufferAttribute,
  // InstancedBufferGeometry,
  // Vector2,
  RepeatWrapping,
  // Mesh,
  // Object3D,
  // Color,
  // IcosahedronBufferGeometry,
  // FrontSide,
  FloatType,
} from 'three'
// import { Geometry } from 'three140/examples/jsm/deprecated/Geometry.js'
// import { MeshPhysicalMaterial } from 'three'
// import { MeshStandardMaterial } from 'three140'
import { CustomGPU } from './CustomGPU'
// import { Core } from '@/content-landing-page/Core/Core'

export class NoodleSegmentEmit {
  constructor({
    node,
    positionHolder,
    normalHolder,
    progressHolder,
    howManyTracker = 10,
    howLongTail = 32,
    gl,
  }) {
    this.gl = gl
    this.node = node
    this.howLongTail = howLongTail
    this.howManyTracker = howManyTracker
    this.WIDTH = howLongTail
    this.HEIGHT = howManyTracker // number of trackers
    this.v3v000 = new Vector3(0, 0, 0)

    this.positionHolder = positionHolder
    this.normalHolder = normalHolder
    this.progressHolder = progressHolder

    this.wait = this.setup({ node })
  }
  async setup({ node }) {
    let renderer = this.gl

    let gpu = (this.gpu = new CustomGPU(
      this.howLongTail,
      this.howManyTracker,
      renderer
    ))

    gpu.setDataType(FloatType)

    const dtPosition = this.gpu.createTexture()
    const lookUpTexture = this.gpu.createTexture()
    this.fillPositionTexture(dtPosition)
    this.fillLookupTexture(lookUpTexture)

    this.positionVariable = this.gpu.addVariable(
      'texturePosition',
      this.positionShader(),
      dtPosition
    )

    this.gpu.setVariableDependencies(this.positionVariable, [
      this.positionVariable,
    ])

    this.positionUniforms = this.positionVariable.material.uniforms

    this.positionUniforms['lookup'] = { value: lookUpTexture }
    this.positionUniforms['dtPosition'] = this.positionHolder
    this.positionUniforms['dtNormal'] = this.normalHolder
    this.positionUniforms['dtProgress'] = this.progressHolder

    this.positionUniforms['time'] = { value: 0 }

    this.node.onLoop((st, dt) => {
      this.positionUniforms['time'].value += dt
    })

    dtPosition.wrapS = RepeatWrapping
    dtPosition.wrapT = RepeatWrapping

    //
    const error = this.gpu.init()
    if (error !== null) {
      console.error(error)
    }
    this.node.onLoop(() => {
      this.render()
    })
  }

  positionShader() {
    let mouseUniforms = () => {
      let str = ``
      let h = this.HEIGHT
      for (let ii = 0; ii < h; ii++) {
        str += `
          // uniform vec3 mouse${ii.toFixed(0)};
        `
      }

      return str
    }

    return /* glsl */ `

    uniform sampler2D dtPosition;
      uniform sampler2D dtNormal;
      uniform sampler2D dtProgress;


      ${mouseUniforms()}

      uniform sampler2D lookup;
      uniform float time;
      vec3 lerp(vec3 a, vec3 b, float w)
      {
        return a + w*(b-a);
      }
      mat4 rotationX( in float angle ) {
        return mat4(	1.0,		0,			0,			0,
                0, 	cos(angle),	-sin(angle),		0,
                0, 	sin(angle),	 cos(angle),		0,
                0, 			0,			  0, 		1);
      }
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                    0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                    0, 		0,				0,	1);
      }
      mat4 rotationZ( in float angle ) {
        return mat4(	cos(angle),		-sin(angle),	0,	0,
                sin(angle),		cos(angle),		0,	0,
                    0,				0,		1,	0,
                    0,				0,		0,	1);
      }

      ${cNoise()}

      #include <common>

      varying vec3 pos;


			void main()	{
        // const float width = resolution.x;
        // const float height = resolution.y;
        // float xID = floor(gl_FragCoord.x);
        // float yID = floor(gl_FragCoord.y);
        // x how long
        // y howManyTracker

        vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

        float currentSegment = floor(gl_FragCoord.x);
        float currentLine = floor(gl_FragCoord.y);

        // seg === 0.0
        if (currentSegment == 0.0) {
          vec2 uvv = vec2(0.0, currentLine / ${this.howManyTracker.toFixed(1)});

          vec4 posBase = texture2D(dtPosition, uvv);
          vec4 normalBase = texture2D(dtNormal, uvv);
          vec4 progressBase = texture2D(dtProgress, uvv);

          vec3 xyz = posBase.rgb + normalBase.rgb * progressBase.r * 5.0;

          gl_FragColor = vec4(xyz.rgb, 1.0);
        } else {

          // // positionChain.rgb = lerp(positionHead.rgb, positionChain.rgb, 0.8);

          // // positionChain.xyz *= 1.0 + sin(time) * 0.25 * 0.0135;

          // // positionChain.xyz = positionChain.xyz - trackerPos;

          // // positionChain.xz *= (1.0 - gl_FragCoord.x / resolution.x * 0.03);
          // // positionChain.y += cnoise(vec3(positionChain.xyz * 1.333)) * 0.1;
          // // positionChain.xyz *= 1.9;

          // // positionChain.xyz = positionChain.xyz + trackerPos;


          vec4 lookupVal = texture2D(lookup, uvCursor);
          vec3 positionChain = texture2D( texturePosition, lookupVal.xy ).xyz;
          gl_FragColor = vec4(positionChain, 1.0);
          //
        }

			}
    `
  }

  fillPositionTexture(texture) {
    let i = 0
    const theArray = texture.image.data

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        theArray[i++] = 0.0
        theArray[i++] = 0.0
        theArray[i++] = 0.0
        theArray[i++] = 0.0
      }
    }
    texture.needsUpdate = true
  }

  fillLookupTexture(texture) {
    let i = 0
    const theArray = texture.image.data
    let items = []

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        let lastOneInArray = items[items.length - 1] || [0, 0]
        theArray[i++] = lastOneInArray[0]
        theArray[i++] = lastOneInArray[1]
        theArray[i++] = this.WIDTH
        theArray[i++] = this.HEIGHT

        items.push([x / this.WIDTH, y / this.HEIGHT])
      }
    }
    texture.needsUpdate = true
  }

  render() {
    if (this.positionUniforms && this.gpu) {
      this.positionUniforms['time'].value = window.performance.now() / 1000
      this.gpu.compute()
    }

    // trackers.forEach((track, idx) => {
    //   let uniform = this.positionUniforms["mouse" + idx];
    //   if (uniform && uniform.value) {
    //     uniform.value.copy(track);
    //     // console.log(idx, track.toArray().join("-"));
    //   }
    // });
  }

  getTextureAfterCompute() {
    return {
      posTexture: this.gpu.getCurrentRenderTarget(this.positionVariable)
        .texture,
    }
  }
}

export const cNoise = () => {
  return /* glsl */ `
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
      float cnoise(vec3 P){
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
      }`
}
