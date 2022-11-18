import { BlobMat } from '@/compos-object/BlobOuter/BlobMat'
import { BlobOuter } from '@/compos-object/BlobOuter/BlobOuter'
import { Box, Center, OrbitControls, Text, Text3D } from '@react-three/drei'
import { Light } from './Light'
import { SceneEffects } from './SceneEffects'

export function DotScene() {
  return (
    <group>
      {/*  */}

      <Light></Light>
      <SceneEffects></SceneEffects>
      {/* <Environment preset='apartment' background></Environment> */}

      {/*  */}
      <group position={[0, 0, 0]}>
        <BlobOuter radius={13}>
          <BlobMat
            envMapIntensity={5}
            roughness={0.02}
            metalness={0.2}
            transmission={0.98}
            reflectivity={1.0}
            ior={1.5}
            thickness={5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            flatShading={false}
            transparent={true}
          ></BlobMat>
        </BlobOuter>
      </group>

      <group position={[0, 0, -25]}>
        <Center>
          <Text3D scale={3.5} font={`/fonts/Days/Days_Regular.json`} {...{}}>
            Agape Land
            <meshPhysicalMaterial
              metalness={0.1}
              emissive={'#00ffff'}
              envMapIntensity={1}
              roughness={0}
            />
          </Text3D>
        </Center>
      </group>

      {/* <Box args={[10, 10, 10]}></Box> */}

      <OrbitControls object-position={[0, 0, 50]} makeDefault></OrbitControls>

      {/*  */}
    </group>
  )
}
