/* eslint-disable jsx-a11y/alt-text */
import { Hud, Image, useTexture } from '@react-three/drei'
import {
  Box,
  Center,
  Environment,
  PerspectiveCamera,
  Text,
  Text3D,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  signOut,
} from '../LoginContentGate/GateMethods'
import { GateState } from '../LoginContentGate/GateState'
export function MetaverseMenu() {
  let gate = useSnapshot(GateState)
  let viewport = useThree((s) => s.viewport)
  return (
    <>
      <Hud renderPriority={2}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Image
          position={[
            viewport.getCurrentViewport().width * 0.5,
            viewport.getCurrentViewport().height * 0.5,
            0.0,
          ]}
          url={`/brand/metaverse-menu.png`}
          transparent={true}
          scale={[0.3, 0.3]}
          onClick={(ev) => {
            //
            GateState.menuOverlay = true
          }}
        ></Image>

        {gate.menuOverlay && (
          <group>
            {gate.session && (
              <>
                <Image
                  position={[0, 0.0, 0]}
                  scale={[2.39, 0.61]}
                  transparent={true}
                  url={`/hud/login-logout.png`}
                  onClick={() => {
                    //
                    signOut()
                    //
                  }}
                ></Image>
              </>
            )}
            {!gate.session && (
              <>
                {GateState.supportEth && (
                  <Image
                    position={[0, 0.61 * 1.1, 0]}
                    scale={[2.39, 0.61]}
                    transparent={true}
                    url={`/hud/login-google.png`}
                    onPointerDown={() => {
                      //
                      loginGoogle()
                      //
                    }}
                  ></Image>
                )}
                <Image
                  position={[0, 0.0, 0]}
                  scale={[2.39, 0.61]}
                  transparent={true}
                  url={`/hud/login-metamask.png`}
                  onPointerDown={() => {
                    //
                    loginEth()
                    //
                  }}
                ></Image>
                <Image
                  position={[0, -0.61 * 1.1, 0]}
                  scale={[2.39, 0.61]}
                  transparent={true}
                  url={`/hud/login-guest.png`}
                  onPointerDown={() => {
                    //
                    loginGuest()
                    //
                  }}
                ></Image>
              </>
            )}
          </group>
        )}
      </Hud>
    </>
  )
}
