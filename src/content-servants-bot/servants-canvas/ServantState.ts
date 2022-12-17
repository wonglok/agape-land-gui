import { proxy } from 'valtio'

export const ServantState = proxy<{
  hand: any
}>({
  hand: false,
})
