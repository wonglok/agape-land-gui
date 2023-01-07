import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { useCore } from '../useCore'
import { Game, gameKey } from './Game'
import { WalkerState } from './WalkerState'
import { Object3D } from 'three140'
import { WalkerCam } from './WalkerCam'

export function WalkerGame({
  onGameReady = () => {},
  startAt = [0, 3, 0],
  name,
  collider,
  xrPlayer = new Object3D(),
}) {
  let core = useCore()

  //
  let game = useMemo(() => {
    if (!collider) {
      return
    }

    let game = new Game({
      gameKey: gameKey,
      xrPlayer,
      startAt,
      name: collider.uuid,
      core,
      collider,
    })
    onGameReady({ game, core })

    return game
  }, [onGameReady, startAt, xrPlayer, core, collider])

  useFrame((st, dt) => {
    if (game) {
      if (dt >= 1 / 30) {
        dt = 1 / 30
      }

      game.updatePlayer(dt)
    }
  })
  return (
    <group>
      <group>
        {collider && <WalkerCam collider={collider}></WalkerCam>}
        <primitive visible={false} object={game.player}></primitive>
      </group>
    </group>
  )
}
