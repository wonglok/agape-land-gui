import { getProject, types } from '@theatre/core'
import { useEffect, useState } from 'react'
import AgapeState from './AgapeState.json'

const state = {}

if (process.env.NODE_ENV !== 'development') {
  state.state = AgapeState
}

// our Theatre.js project sheet, we'll use this later
export const AgapeSheet = getProject('Agape Land Project', state).sheet(
  'Agape Sheet'
)

export const AgapeCache = new Map()

export function makeTheatureObject(name, object) {
  if (!AgapeCache.has(name)) {
    let oo = {}
    for (let kn in object) {
      oo[kn] = types[object[kn].type](object[kn].value, { ...object[kn] })
    }
    let obj = AgapeSheet.object(name, oo)
    AgapeCache.set(name, obj)

    return obj
  } else {
    return AgapeCache.get(name)
  }
}

export let useSetting = (setting) => {
  let [val, setVal] = useState({})

  useEffect(() => {
    return setting.onValuesChange((values) => {
      setVal(values)
    })
  }, [setting])

  return val
}

export const useTheatreProps = (name, object) => {
  return useSetting(makeTheatureObject(name, object))
}
