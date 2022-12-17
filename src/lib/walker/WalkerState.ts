import { proxy } from 'valtio'
import { Game } from './Game'

export const WalkerState = proxy<{
  NYC: Game | null
}>({
  NYC: null,
})
