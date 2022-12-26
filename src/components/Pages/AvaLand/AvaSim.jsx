import { Sphere } from '@react-three/drei'
import { createPortal } from '@react-three/fiber'
import { useMemo } from 'react'
let boneNames = [
  { radius: 0.1, name: 'Head' },

  { radius: 0.06, name: 'Hips' },
  { radius: 0.03, name: 'Spine' },
  { radius: 0.03, name: 'Spine1' },
  { radius: 0.03, name: 'Spine2' },
  { radius: 0.03, name: 'Neck' },

  //
  // { radius: 0.03, name: 'HeadTop_End' },
  { radius: 0.03, name: 'LeftShoulder' },
  { radius: 0.03, name: 'LeftArm' },
  { radius: 0.03, name: 'LeftForeArm' },
  { radius: 0.03, name: 'RightShoulder' },
  { radius: 0.03, name: 'RightArm' },
  { radius: 0.03, name: 'RightForeArm' },

  //!SECTION

  { radius: 0.03, name: 'LeftUpLeg' },
  { radius: 0.03, name: 'LeftLeg' },
  { radius: 0.03, name: 'LeftFoot' },
  { radius: 0.03, name: 'LeftToeBase' },
  { radius: 0.03, name: 'LeftToe_End' },
  { radius: 0.03, name: 'RightUpLeg' },
  { radius: 0.03, name: 'RightLeg' },
  { radius: 0.03, name: 'RightFoot' },
  { radius: 0.03, name: 'RightToeBase' },
  { radius: 0.03, name: 'RightToe_End' },

  //

  { radius: 0.05, name: 'LeftHand' },
  { radius: 0.05, name: 'RightHand' },

  // fingers
  // { radius: 0.005, name: 'LeftHandThumb1' },
  // { radius: 0.005, name: 'LeftHandThumb2' },
  // { radius: 0.005, name: 'LeftHandThumb3' },
  // { radius: 0.005, name: 'LeftHandThumb4' },
  // { radius: 0.005, name: 'LeftHandIndex1' },
  // { radius: 0.005, name: 'LeftHandIndex2' },
  // { radius: 0.005, name: 'LeftHandIndex3' },
  // { radius: 0.005, name: 'LeftHandIndex4' },
  // { radius: 0.005, name: 'LeftHandMiddle1' },
  // { radius: 0.005, name: 'LeftHandMiddle2' },
  // { radius: 0.005, name: 'LeftHandMiddle3' },
  // { radius: 0.005, name: 'LeftHandMiddle4' },
  // { radius: 0.005, name: 'LeftHandRing1' },
  // { radius: 0.005, name: 'LeftHandRing2' },
  // { radius: 0.005, name: 'LeftHandRing3' },
  // { radius: 0.005, name: 'LeftHandRing4' },
  // { radius: 0.005, name: 'LeftHandPinky1' },
  // { radius: 0.005, name: 'LeftHandPinky2' },
  // { radius: 0.005, name: 'LeftHandPinky3' },
  // { radius: 0.005, name: 'LeftHandPinky4' },
  // { radius: 0.005, name: 'RightHandThumb1' },
  // { radius: 0.005, name: 'RightHandThumb2' },
  // { radius: 0.005, name: 'RightHandThumb3' },
  // { radius: 0.005, name: 'RightHandThumb4' },
  // { radius: 0.005, name: 'RightHandIndex1' },
  // { radius: 0.005, name: 'RightHandIndex2' },
  // { radius: 0.005, name: 'RightHandIndex3' },
  // { radius: 0.005, name: 'RightHandIndex4' },
  // { radius: 0.005, name: 'RightHandMiddle1' },
  // { radius: 0.005, name: 'RightHandMiddle2' },
  // { radius: 0.005, name: 'RightHandMiddle3' },
  // { radius: 0.005, name: 'RightHandMiddle4' },
  // { radius: 0.005, name: 'RightHandRing1' },
  // { radius: 0.005, name: 'RightHandRing2' },
  // { radius: 0.005, name: 'RightHandRing3' },
  // { radius: 0.005, name: 'RightHandRing4' },
  // { radius: 0.005, name: 'RightHandPinky1' },
  // { radius: 0.005, name: 'RightHandPinky2' },
  // { radius: 0.005, name: 'RightHandPinky3' },
  // { radius: 0.005, name: 'RightHandPinky4' },

  // Jesus loves you dear dear dear LOK <3
]

export function AvaSim({ glb }) {
  let bones = useMemo(() => {
    let bones = []
    glb.scene.traverse((it) => {
      if (it.isBone) {
        let found = boneNames.find(
          (e) => it.name.replace('mixamorig', '') === e.name
        )
        if (found) {
          found.bone = it
          bones.push(found)
        }
      }
    })
    return bones
  }, [glb.scene])

  let yomat = (
    <meshPhysicalMaterial
      transmission={1.5}
      ior={1.15}
      thickness={5.5}
      emissive={'#F08BDC'}
      emissiveIntensity={1}
      roughness={1.0}
      metalness={0.0}
      color={'#F08BDC'}
    ></meshPhysicalMaterial>
  )
  return (
    <group>
      {bones.map((it) => {
        return createPortal(
          <>
            <group>
              <Sphere
                userData={{ keepVisible: true }}
                args={[it.radius, 15, 15]}
                material={yomat}
              ></Sphere>
            </group>
          </>,
          it.bone
        )
      })}
    </group>
  )
}
