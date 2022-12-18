import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useCore } from '../useCore'
import { Game } from './Game'
import { WalkerState } from './WalkerState'
import { Object3D } from 'three140'

export function WalkerGame({
  onGameReady = () => {},
  startAt = [0, 3, 0],
  name,
  collider,
  xrPlayer = new Object3D(),
}) {
  let core = useCore()

  let game = useMemo(() => {
    let game = new Game({ xrPlayer, startAt, name, core, collider })
    WalkerState[name] = game
    WalkerState.current = game
    onGameReady({ game, core })

    return game
  }, [name, onGameReady, startAt, xrPlayer, core, collider])

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
      {/*  */}
      <group>
        <primitive visible={false} object={game.player}></primitive>
      </group>
      {/*  */}
      {/*  */}
    </group>
  )
}
