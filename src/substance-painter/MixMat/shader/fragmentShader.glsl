#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
uniform sampler2D map2;
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
uniform sampler2D normalMap2;
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
uniform sampler2D roughnessMap2;

#include <metalnessmap_pars_fragment>
uniform sampler2D metalnessMap2;
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform sampler2D mixMask;
uniform float mixRatio;
void main() {
  vec4 mixMaskColor = texture2D(mixMask, vec2(vUv.x * 0.5, vUv.y * 0.5 + 0.5));
  float mixRatioMask = mixMaskColor.r * mixMaskColor.a;

	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>

  //=========
  //=========
  //=========
  //=========
  //=========
  vec4 sampledDiffuseColor1 = texture2D( map, vUv );
  #ifdef DECODE_VIDEO_TEXTURE
		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)
		sampledDiffuseColor1 = vec4( mix( pow( sampledDiffuseColor1.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor1.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor1.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor1.w );
	#endif
  //=========

  //=========
  vec4 sampledDiffuseColor2 = texture2D( map2, vUv );
  #ifdef DECODE_VIDEO_TEXTURE
		// inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)
		sampledDiffuseColor2 = vec4( mix( pow( sampledDiffuseColor2.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor2.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor2.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor2.w );
	#endif
  //=========

  diffuseColor *= mix(sampledDiffuseColor1, sampledDiffuseColor2, mixRatioMask);
  //=========
  //=========
  //=========
  //=========
  //=========
  //=========
  //=========

	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	// #include <roughnessmap_fragment>
  float roughnessFactor = roughness;
  #ifdef USE_ROUGHNESSMAP
    vec4 texelRoughness1 = texture2D( roughnessMap, vUv );
    vec4 texelRoughness2 = texture2D( roughnessMap2, vUv );
    vec4 texelRoughness = mix(texelRoughness1, texelRoughness2, mixRatioMask);
    // reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
    roughnessFactor *= texelRoughness.g;
  #endif

  float metalnessFactor = metalness;
  #ifdef USE_METALNESSMAP
    vec4 texelMetalness1 = texture2D( metalnessMap, vUv );
    vec4 texelMetalness2 = texture2D( metalnessMap2, vUv );

    vec4 texelMetalness = mix( texelMetalness1, texelMetalness2, mixRatioMask );
    // reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
    metalnessFactor *= texelMetalness.b;
  #endif
	// #include <metalnessmap_fragment>
	// #include <normal_fragment_begin>

  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
  #ifdef FLAT_SHADED
    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );
  #else
    vec3 normal = normalize( vNormal );
    #ifdef DOUBLE_SIDED
      normal = normal * faceDirection;
    #endif
    #ifdef USE_TANGENT
      vec3 tangent = normalize( vTangent );
      vec3 bitangent = normalize( vBitangent );
      #ifdef DOUBLE_SIDED
        tangent = tangent * faceDirection;
        bitangent = bitangent * faceDirection;
      #endif
      #if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
        mat3 vTBN = mat3( tangent, bitangent, normal );
      #endif
    #endif
  #endif
  // non perturbed normal for clearcoat among others
  vec3 geometryNormal = normal;

  #ifdef OBJECTSPACE_NORMALMAP
    vec3 normal1 = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals
    vec3 normal2 = texture2D( normalMap2, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals
    normal = mix(normal1, normal2, mixRatioMask);

    //
    #ifdef FLIP_SIDED
      normal = - normal;
    #endif
    #ifdef DOUBLE_SIDED
      normal = normal * faceDirection;
    #endif
    normal = normalize( normalMatrix * normal );
  #elif defined( TANGENTSPACE_NORMALMAP )
    vec3 mapN1 = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
    vec3 mapN2 = texture2D( normalMap2, vUv ).xyz * 2.0 - 1.0;

    vec3 mapN = mix(mapN1, mapN2, mixRatioMask);
    mapN.xy *= normalScale;

    #ifdef USE_TANGENT
      normal = normalize( vTBN * mapN );
    #else
      normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
    #endif
  #elif defined( USE_BUMPMAP )
    normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
  #endif

	// #include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
