import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useCore } from '../useCore'
import { Game } from './Game'
import { WalkerState } from './WalkerState'

export function Walker({ startAt = [0, 3, 0], name, collider }) {
  let core = useCore()

  let game = useMemo(() => {
    let game = new Game({ startAt, name, core, collider })
    WalkerState[name] = game

    return game
  }, [name, startAt, core, collider])

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
