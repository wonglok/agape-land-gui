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
  Clock,
} from 'three'
// import { Geometry } from 'three140/examples/jsm/deprecated/Geometry.js'
// import { MeshPhysicalMaterial } from 'three'
// import { MeshStandardMaterial } from 'three140'
import { CustomGPU } from './CustomGPU'
// import { Core } from '@/content-landing-page/Core/Core'

export class NoodleSegmentCompute {
  constructor({
    node,
    tracker,
    getTextureAlpha,
    howManyTracker = 10,
    howLongTail = 32,
    gl,
  }) {
    //
    this.gl = gl
    this.node = node
    this.howLongTail = howLongTail
    this.howManyTracker = howManyTracker
    this.WIDTH = howLongTail
    this.HEIGHT = howManyTracker // number of trackers
    this.getTextureAlpha = getTextureAlpha
    this.v3v000 = new Vector3(0, 0, 0)
    this.tracker = tracker
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

    //
    this.positionVariable = this.gpu.addVariable(
      'texturePosition',
      this.positionShader(),
      dtPosition
    )

    this.metaVariable = this.gpu.addVariable(
      'textureMeta',
      this.metaShader(),
      dtPosition
    )

    this.trailVariable = this.gpu.addVariable(
      'textureTrail',
      this.trailShader(),
      dtPosition
    )

    this.positionVariable.material.uniforms.dt = { value: 0 }

    this.gpu.setVariableDependencies(this.trailVariable, [
      this.metaVariable,
      this.trailVariable,
    ])
    this.gpu.setVariableDependencies(this.metaVariable, [
      this.metaVariable,
      this.positionVariable,
    ])
    this.gpu.setVariableDependencies(this.positionVariable, [
      this.trailVariable,
      this.metaVariable,
      this.positionVariable,
    ])

    this.positionUniforms = this.positionVariable.material.uniforms
    this.positionUniforms['lookup'] = { value: lookUpTexture }
    this.positionUniforms['headList'] = {
      value: this.getTextureAlpha(),
    }
    this.positionUniforms['trackerPos'] = {
      value: new Vector3(),
    }
    this.positionUniforms['trackerPosLast'] = {
      value: new Vector3(),
    }

    this.positionUniforms.isDown = { value: false }
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'f') {
        this.positionUniforms.isDown.value = true
      }
    })

    setInterval(() => {
      this.positionUniforms.isDown.value = true

      requestAnimationFrame(() => {
        this.positionUniforms.isDown.value = false
      })
    }, 1000)

    window.addEventListener('keyup', (ev) => {
      if (ev.key === 'f') {
        this.positionUniforms.isDown.value = false
      }
    })

    this.positionUniforms['tick'] = { value: 0 }
    let clock = new Clock()
    this.node.onLoop(() => {
      let dt = clock.getDelta()
      this.positionUniforms['tick'].value += 1

      this.positionUniforms['trackerPosLast'].value.copy(
        this.positionUniforms['trackerPos'].value
      )

      this.positionUniforms['trackerPos'].value.copy(this.tracker.position)
      // console.log(this.positionUniforms['trackerPos'].value)
      this.positionUniforms['headList'] = {
        value: this.getTextureAlpha(),
      }
      this.positionUniforms.dt = { value: dt }
      this.metaVariable.material.uniforms.dt = { value: dt }
      this.trailVariable.material.uniforms.dt = { value: dt }
    })

    this.positionUniforms['time'] = { value: 0 }
    // dtPosition.wrapS = RepeatWrapping
    // dtPosition.wrapT = RepeatWrapping

    this.metaVariable.material.uniforms =
      this.positionVariable.material.uniforms

    this.trailVariable.material.uniforms =
      this.positionVariable.material.uniforms

    //
    const error = this.gpu.init()
    if (error !== null) {
      console.error(error)
    }
    this.node.onLoop(() => {
      this.render()
    })
  }

  useLine() {
    return /* glsl */ `(
      (
        // metaHead.b >= 0.05
        mod(tick, floor(resolution.y)) == currentLine || true
      )

      // mod(tick, resolution.y) == currentLine ||
      // mod(tick + 1.0, resolution.y) == currentLine ||
      // mod(tick + 2.0, resolution.y) == currentLine ||
      // mod(tick + 3.0, resolution.y) == currentLine ||
      // mod(tick + 4.0, resolution.y) == currentLine ||
      // mod(tick + 5.0, resolution.y) == currentLine ||
      // mod(tick + 6.0, resolution.y) == currentLine ||
      // mod(tick + 7.0, resolution.y) == currentLine ||
      // mod(tick + 8.0, resolution.y) == currentLine ||
      // mod(tick + 9.0, resolution.y) == currentLine
      // mod(currentLine, 10.0) == 0.0
    )`
  }
  metaShader() {
    return /* glsl */ `

      uniform vec3 trackerPos;

      uniform sampler2D headList;
      uniform sampler2D lookup;
      uniform float tick;
      uniform float time;
      uniform float dt;
      uniform bool isDown;

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

      void main()	{
        vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;
        vec4 positionHead = texture2D( texturePosition, uvCursor);
        vec4 metaHead = texture2D( textureMeta, uvCursor);
        vec4 lookupData = texture2D(lookup, uvCursor);

        vec2 nextUV = lookupData.xy;

        float currentSegment = floor(gl_FragCoord.x);
        float currentLine = floor(gl_FragCoord.y);

        // vec3 noiser = vec3(
        //   rand(uvCursor.xy + 0.1) * 2.0 - 1.0,
        //   rand(uvCursor.xy + 0.2) * 2.0 - 1.0,
        //   rand(uvCursor.xy + 0.3) * 2.0 - 1.0
        // );

        gl_FragColor = metaHead;

        if (gl_FragColor.b <= 1.0) {
          // life
          gl_FragColor.b = 1.0;
        }

        if (isDown && ${this.useLine()}) {
          gl_FragColor.w = 1.0;
        }

        // radius
        gl_FragColor.w *= 0.96;

        // life reamins
        gl_FragColor.b *= 0.96;
      }

    `
  }

  trailShader() {
    return /* glsl */ `
      uniform vec3 trackerPos;

      uniform sampler2D headList;
      uniform sampler2D lookup;
      uniform float tick;
      uniform float time;
      uniform float dt;
      uniform bool isDown;

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


      void main()	{
          vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;
          vec4 trailHead = texture2D( textureTrail, uvCursor );
          vec4 metaHead = texture2D( textureMeta, uvCursor );

          // vec4 lookupData = texture2D(lookup, uvCursor);
          // vec2 nextUV = lookupData.xy;
          float currentSegment = floor(gl_FragCoord.x);
          float currentLine = floor(gl_FragCoord.y);

          gl_FragColor = trailHead;

        if ((${this.useLine()})) {
          // state , hidden or growing
          gl_FragColor.rgb = lerp(trailHead.rgb, trackerPos, 1.0);
        } else {
          gl_FragColor.rgb = trackerPos;
        }
      }

    `
  }

  positionShader() {
    return /* glsl */ `
      uniform vec3 trackerPos;
      uniform vec3 trackerPosLast;


      uniform sampler2D headList;
      uniform sampler2D lookup;
      uniform float tick;
      uniform float time;
      uniform float dt;
      uniform bool isDown;
      vec3 lerp(vec3 a, vec3 b, float w)
      {
        return a + w*(b-a);
      }

      ${rotateStuff()}

      ${cNoise()}

      #include <common>

      varying vec3 pos;

      float atan2(in float y, in float x) {
        bool xgty = (abs(x) > abs(y));
        return mix(3.1415926535897932384626433832795 / 2.0 - atan(x,y), atan(y,x), float(xgty));
      }

      vec3 ballify (vec3 pos, float r) {
        float az = atan2(pos.y, pos.x);
        float el = atan2(pos.z, sqrt(pos.x * pos.x + pos.y * pos.y));
        return vec3(
          r * cos(el) * cos(az),
          r * cos(el) * sin(az),
          r * sin(el)
        );
      }


			void main()	{
        // const float width = resolution.x;
        // const float height = resolution.y;
        // float xID = floor(gl_FragCoord.x);
        // float yID = floor(gl_FragCoord.y);
        vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;
        vec4 positionHead = texture2D( texturePosition, uvCursor );
        vec4 metaHead = texture2D( textureMeta, uvCursor );
        vec4 trailHead = texture2D( textureTrail, uvCursor );
        vec4 lookupData = texture2D(lookup, uvCursor);
        vec2 nextUV = lookupData.xy;
        float currentSegment = floor(gl_FragCoord.x);
        float currentLine = floor(gl_FragCoord.y);

        vec3 noiser = vec3(
          rand(uvCursor.xy + 0.1) * 2.0 - 1.0,
          rand(uvCursor.xy + 0.2) * 2.0 - 1.0,
          rand(uvCursor.xy + 0.3) * 2.0 - 1.0
        );

      if (floor(currentSegment) == 0.0) {
          vec2 uvv = vec2(0.0, currentLine / ${this.howManyTracker.toFixed(1)});
          float ee = uvv.y;
          vec4 positionHeadClone = positionHead;

            vec4 headListData = texture2D(headList, uvv);

            // if (true) {
            //   place = lerp(place, trailHead.rgb, 0.2);
            // }

            if (metaHead.b >= 0.1) {
              vec3 place = lerp(positionHeadClone.rgb, trailHead.rgb, 0.9);//trailHead.rgb;

              positionHeadClone.xyz = positionHeadClone.xyz - place.rgb;

              vec3 latest = noiser * 10.0;
              vec4 metaHead2 = texture2D( textureMeta, nextUV );

              // latest += cnoise(latest.rgb + time) * metaHead.w *  0.5;

              latest.xyz = ballify(latest.rgb, sin(time) * 0.2);

              latest *= rotateQ(normalize(vec3(cos(time), 1.0, sin(time))), time * 3.0);

              positionHeadClone.xyz = latest.rgb;

              positionHeadClone.xyz = positionHeadClone.xyz + place.rgb;

              gl_FragColor = vec4(positionHeadClone.rgb, positionHeadClone.w);

            } else {
              gl_FragColor.rgb = positionHead.rgb;
              gl_FragColor.w = positionHead.w;
            }
        } else {
          vec4 positionChain = texture2D(texturePosition, nextUV );

          vec2 uvv = vec2(0.0, currentLine / ${this.howManyTracker.toFixed(1)});
          // vec4 headListData = texture2D(headList, uvv);

          // vec3 dir = normalize(vec3(trackerPos - trackerPosLast));
          // positionChain.xyz += dir * 0.03;

          // positionChain.xyz = positionChain.xyz - trackerPos;

          // positionChain.xyz = positionChain.xyz + trackerPos;

          gl_FragColor = vec4(positionChain.xyz, positionChain.w);
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

export const rotateStuff = () => {
  return /* glsl */ `
      mat3 rotateX(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              1.0, 0.0, 0.0,
              0.0, c, s,
              0.0, -s, c
          );
      }

      mat3 rotateY(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, 0.0, -s,
              0.0, 1.0, 0.0,
              s, 0.0, c
          );
      }

      mat3 rotateZ(float rad) {
          float c = cos(rad);
          float s = sin(rad);
          return mat3(
              c, s, 0.0,
              -s, c, 0.0,
              0.0, 0.0, 1.0
          );
      }

      mat3 rotateQ (vec3 axis, float rad) {
          float hr = rad / 2.0;
          float s = sin( hr );
          vec4 q = vec4(axis * s, cos( hr ));
          vec3 q2 = q.xyz + q.xyz;
          vec3 qq2 = q.xyz * q2;
          vec2 qx = q.xx * q2.yz;
          float qy = q.y * q2.z;
          vec3 qw = q.w * q2.xyz;

          return mat3(
              1.0 - (qq2.y + qq2.z),  qx.x - qw.z,            qx.y + qw.y,
              qx.x + qw.z,            1.0 - (qq2.x + qq2.z),  qy - qw.x,
              qx.y - qw.y,            qy + qw.x,              1.0 - (qq2.x + qq2.y)
          );
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
`
}
