
#include <common>

uniform float time;
void main (void) {

  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec4 rainPosition = texture2D(rainPosTex, uv);

  if (rainPosition.w <= 0.0) {
    rainPosition.rgb = vec3(0.0);
    rainPosition.w = rand(uv) + 1.0;
  }

  // rainPosition.x = uv.x;
  // rainPosition.z = uv.y;

  rainPosition.y -= 0.04;


  //
  rainPosition.w -= 0.01;

  gl_FragColor = vec4(rainPosition);
}
