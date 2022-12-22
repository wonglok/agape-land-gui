
uniform sampler2D tIdx;
uniform float time;
uniform bool isDown;
uniform float dt;
uniform float tick;
uniform vec3 trackerPos;
// uniform sampler2D tEmit;
#include <common>

vec3 lerp(vec3 a, vec3 b, float w) {
  return a + w*(b-a);
}

void main (void) {

  vec2 cellSize = 1.0 / resolution.xy;
  vec2 newCell = gl_FragCoord.xy;
  vec2 uv = newCell * cellSize;
  vec4 emit = texture2D(tEmit, uv);
  vec4 dPos = texture2D(tPos, uv);

  vec3 noiser2 = vec3(
    rand(time + uv.xy + 0.1) * 2.0 - 1.0,
    rand(time + uv.xy + 0.2) * 2.0 - 1.0,
    rand(time + uv.xy + 0.3) * 2.0 - 1.0
  );

  vec3 noiser = vec3(
    rand(dPos.xx+ uv.xy + 0.1) * 2.0 - 1.0,
    rand(dPos.yy+ uv.xy + 0.2) * 2.0 - 1.0,
    rand(dPos.zz+ uv.xy + 0.3) * 2.0 - 1.0
  );

  // if (floor(gl_FragCoord.y) == 0.0) {
  //   if (isDown) {
  //     emit.xyz = emit.w * noiser;
  //   } else {
  //     emit.xyz = vec3(0.0);
  //   }

  // } else {
  //   vec4 emitOld = texture2D(tEmit, vec2(uv.x, mod(uv.y + cellSize.y, 1.0)));
  //   emit = emitOld;
  // }

  // emit.w += dt;

  emit.rgb = noiser.rgb;



  gl_FragColor = emit;
}
