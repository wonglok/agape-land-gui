let pattern = new TextureLoader().load(
  `https://dhjz4fdyjzwki.cloudfront.net/texture/images/hexagon/WhiteHexagonalTiles01_1K_Normal.png`
)
pattern.wrapS = RepeatWrapping
pattern.wrapT = RepeatWrapping
pattern.repeat.set(10, 10)
pattern.updateMatrix()
//!SECTION
material.onBeforeCompile = (shader, renderer) => {
  console.log('Defaultmaterail modify')
  shader.uniforms.renderPhase = { value: 4.0 }
  shader.uniforms.target = {
    value: new Vector3(),
  }
  shader.uniforms.useDots = {
    value: true,
  }
  shader.uniforms.resolution = {
    value: new Vector2(1024, 1024),
  }
  shader.uniforms.time = {
    value: 0,
  }
  shader.uniforms.delta = {
    value: 0,
  }
  shader.uniforms.progress = { value: 1 }
  shader.uniforms.raveColor = { value: new Color('#ffffff') }
  shader.uniforms.pattern = {
    value: pattern,
  }

  let pulse = () => {
    shader.uniforms.progress.value = 0
    anime({
      targets: [shader.uniforms.progress],
      value: 1,
      duration: 8000,
      delay: 0,
      easing: 'linear',
      // direction: 'alternate',
      loop: true,
      begin: () => {
        console.log(123)
        if (window.camera.position instanceof Vector3) {
          shader.uniforms.target.value.copy(window.camera.position)
        }
      },
    })
  }
  pulse()

  let clock = new Clock()
  let rAFID = 0
  let rAF = () => {
    rAFID = requestAnimationFrame(rAF)

    if (renderer) {
      renderer.getSize(shader.uniforms.resolution.value)
    }

    shader.uniforms.time.value = clock.getElapsedTime()
    shader.uniforms.delta.value = clock.getDelta()

    if (SharedUniforms.raveColor) {
      shader.uniforms.raveColor = SharedUniforms.raveColor
    }
    // console.log(shader.uniforms.time.value)
  }
  rAFID = requestAnimationFrame(rAF)

  let atBeginV = `
        varying vec4 mvPos4;
        varying vec3 vCamPos;

        varying vec2 myUV;
      `
  let atEndV = `
        mvPos4 = modelMatrix * vec4(transformed, 1.0);
        vCamPos = cameraPosition;
        myUV = uv;
      `
  shader.vertexShader = shader.vertexShader.replace(
    `void main() {`,
    `${atBeginV.trim()}void main() {`
  )

  shader.vertexShader = shader.vertexShader.replace(
    `#include <fog_vertex>`,
    `#include <fog_vertex>${atEndV}`
  )

  let atBeginF = `
        uniform float renderPhase;
        uniform float progress;
        uniform float time;
        uniform float delta;
        varying vec4 mvPos4;
        varying vec2 myUV;
        varying vec3 vCamPos;
        uniform vec3 target;
        uniform vec3 raveColor;
        uniform vec2 resolution;
        uniform sampler2D pattern;

        vec2 rotate2d(vec2 v, float a) {
          float s = sin(a);
          float c = cos(a);
          mat2 m = mat2(c, -s, s, c);
          return m * v;
        }


        float dot2( in vec2 v ) { return dot(v,v); }
        float dot2( in vec3 v ) { return dot(v,v); }
        float ndot( in vec2 a, in vec2 b ) { return a.x*b.x - a.y*b.y; }

        // Round Cone - exact   (https://www.shadertoy.com/view/tdXGWr)

        float sdRoundCone( vec3 p, vec3 a, vec3 b, float r1, float r2 )
        {
          // sampling independent computations (only depend on shape)
          vec3  ba = b - a;
          float l2 = dot(ba,ba);
          float rr = r1 - r2;
          float a2 = l2 - rr*rr;
          float il2 = 1.0/l2;

          // sampling dependant computations
          vec3 pa = p - a;
          float y = dot(pa,ba);
          float z = y - l2;
          float x2 = dot2( pa*l2 - ba*y );
          float y2 = y*y*l2;
          float z2 = z*z*l2;

          // single square root!
          float k = sign(rr)*rr*rr*x2;
          if( sign(z)*a2*z2>k ) return  sqrt(x2 + z2)        *il2 - r2;
          if( sign(y)*a2*y2<k ) return  sqrt(x2 + y2)        *il2 - r1;
                                return (sqrt(x2*a2*il2)+y*rr)*il2 - r1;
        }

      `

  let atEnd = `
          vec4 origColor = gl_FragColor.rgba;
          if (renderPhase == 4.0) {
            float aE = (totalEmissiveRadiance.r + totalEmissiveRadiance.g + totalEmissiveRadiance.b) / 3.0;
            if (aE >= 0.0) {
              gl_FragColor.rgb = gl_FragColor.rgb * aE;
            } else {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
          } else if (renderPhase == 1.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          }

          vec3 center = vec3(0.0, 0.0, 0.0);
          float distFromTarget = length(mvPos4.xyz - target.xyz);
          float turnOnDistance = progress * 130.0;
          float thickness = 10.0;

          vec4 patternNormal = texture2D(pattern, rotate2d(myUV * 2.5, progress * 0.25 * 0.0));
          float gridColorPattern = abs(dot(normalize(patternNormal.rgb), normalize(mvPos4.xyz)));
          if (distFromTarget >= turnOnDistance - thickness && distFromTarget <= (turnOnDistance) + thickness) {
            float fade = (1.0 - abs(distFromTarget - turnOnDistance) / (thickness));

            if (length(gl_FragColor.rgb) <= 0.1) {
              gl_FragColor.rgb += gridColorPattern * fade * raveColor.rgb * 2.0;
            } else {
              gl_FragColor.rgb += gl_FragColor.rgb * gridColorPattern * fade * raveColor.rgb * 2.0;
            }
          }

          float hit = sdRoundCone(mvPos4.xyz, vec3(vCamPos.x, vCamPos.y, vCamPos.z), vec3(target.x, target.y + 0.5, target.z), 1.0, 0.5);

          if (hit <= 0.0) {

            float diff = 30.0;

            float a = mod(gl_FragCoord.x, diff) - diff * 0.5;
            float b = mod(gl_FragCoord.y, diff) - diff * 0.5;

            if (length(vec2(a,b)) > diff * 0.1) {
              discard;
            } else {
              discard;
            }

            return;
          }


          //
          // float raidus = length(vCamPos.xyz - target) / 20.0;
          //
          // if (raidus <= 0.05) {
          //   raidus = 0.05;
          // }
          //
          // if (raidus >= 10.0) {
          //   raidus = 10.0;
          // }
          //
          // float diffTargetCamera = length(vCamPos.xyz - target.xyz);
          // float diffTargetFragment = length(mvPos4.xyz - target.xyz);
          //

          float diff = length((vCamPos.xyz * 0.95 + target * 0.05) - mvPos4.xyz);

          bool cutOff = false;

          float radius = length(vCamPos.xyz - target.xyz);
          radius = radius * 0.1;

          if (diff < radius) {
            cutOff = true;
          }

          if (cutOff) {
            float diff = 30.0;

            float a = mod(gl_FragCoord.x, diff) - diff * 0.5;
            float b = mod(gl_FragCoord.y, diff) - diff * 0.5;

            if (length(vec2(a,b)) > diff * 0.25) {
              discard;
            }
          }
      `
  //
  shader.fragmentShader = `${atBeginF.trim()}\n${shader.fragmentShader}`
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <dithering_fragment>`,
    `#include <dithering_fragment>\n${atEnd.trim()}`
  )
}
