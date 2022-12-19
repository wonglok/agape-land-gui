import { proxy } from 'valtio'
import { Game } from './Game'

export const WalkerState = proxy<{
  current: Game | null
}>({
  current: null,
})
