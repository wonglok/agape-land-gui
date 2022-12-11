import { Image } from '@react-three/drei'

export function LoadingGroup() {
  return (
    <group>
      <Image
        position={[0, 0.0, 0]}
        scale={[2.39, 0.61]}
        transparent={true}
        url={`/brand/agape-2.png`}
        onPointerDown={() => {}}
      ></Image>
    </group>
  )
}
