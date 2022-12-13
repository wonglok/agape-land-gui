import { proxy, useSnapshot } from 'valtio'
import { Game } from './Game'

// type TaskStatus = 'pending' | 'completed'
// type Filter = TaskStatus | 'all'
// type Todo = {
//   description: string
//   status: Status
//   id: number
// }
// type Session = boolean | any

// type ReadyStatus = 'loggedin' | 'loading' | 'landing' | 'init'

export const WalkerState = proxy<{
  // filter: Filter
  NYC: Game | null
  // session: Session
  // readyStatus: ReadyStatus
  // supportEth: boolean
  // menuOverlay: boolean
  // supportVR: boolean
}>({
  NYC: null,
  // filter: 'all',
  // todos: [],
  // menuOverlay: false,
  // //
  // supportVR: false,
  // //
  // supportEth: false,
  // readyStatus: 'init',
  // session: false,
})
//
