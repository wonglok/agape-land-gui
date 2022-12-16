import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useMemo } from 'react'
import { useCore } from '../useCore'
import { Game } from './Game'
import { WalkerState } from './WalkerState'

export function Walker({
  onGameReady = () => {},
  startAt = [0, 3, 0],
  name,
  collider,
  xrPlayer,
}) {
  let core = useCore()
  let game = useMemo(() => {
    let game = new Game({ xrPlayer, startAt, name, core, collider })
    WalkerState[name] = game
    WalkerState.current = game
    onGameReady({ game })
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
      {/*  */}
      {/*  */}
    </group>
  )
}
