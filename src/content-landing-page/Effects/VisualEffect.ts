import { proxy } from 'valtio'

export const VisualEffect = proxy<{
  drunk: Boolean
}>({ drunk: false })
