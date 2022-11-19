import { useLoader, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Color } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { BridgeControl } from './BridgeControl'

export function WayOut() {
  const [gScene, setGS] = useState(
    <gridHelper args={[100, 100, 0xff0000, 0xffff00]} />
  )
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    // public
    const arrayBufferProm = fetch(`/scene/2022-11-18-way/v0003-v1.glb`)
      // const arrayBufferProm = fetch(`/3d/prototypes/bridge/tMobileBridgeV2-v1.glb`)
      .then((r) => r.arrayBuffer())
    const loader = new GLTFLoader()

    // const lmProm = new TextureLoader().loadAsync(`/3d/prototypes/bridge/lm.jpg`)

    arrayBufferProm.then((arrayBuffer) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      loader.setDRACOLoader(dracoLoader)

      loader.parseAsync(arrayBuffer, '/').then(async (glb) => {
        // const lm = await lmProm
        // lm.encoding = sRGBEncoding

        if (glb?.scene) {
          glb.scene.traverse((it) => {
            if (it.material) {
              it.material.lightMapIntensity = 1
              it.material.emissiveIntensity = 50
              it.material.envMapIntensity = 1
            }
            if (it.material) {
              console.log(it.material, it.material.name)

              if (it.material.name === 'steel black') {
                it.material.roughness = 0.1
                it.material.color = new Color('#333333')
                it.material.metalness = 1
              }
              if (it.material.name === 'plastic') {
                it.material.roughness = 0.1
                it.material.color = new Color('#333333')
                it.material.metalness = 0.5
              }
              if (it.material.name === 'light') {
                it.material.roughness = 0.0
                it.material.color = new Color('#ffffff')
                it.material.emissive = new Color('#ffffff')
              }
            }
          })
        }

        setGS(<primitive object={glb.scene}></primitive>)
      })
    })
  }, [])

  return (
    <group>
      {/* <ambientLight intensity={1}></ambientLight> */}
      <directionalLight
        intensity={1}
        color={'#0000ff'}
        position={[0, 1.67, 3]}
      ></directionalLight>
      {/* <directionalLight
        color={'#0000ff'}
        intensity={1}
        position={[0, 1.67, -1]}
      ></directionalLight> */}
      <group position={[0, 0, 0]} scale={1}>
        {gScene}
      </group>
    </group>
  )
}
