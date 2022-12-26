import { useFrame, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useMemo } from 'react'

export let useCallCore = (cb = () => {}) => {
  let core = useMemo(() => {
    let api = {
      loops: [],
      cleans: [],
      onLoop: (v) => {
        api.loops.push(v)
      },
      work: (st, dt) => {
        api.loops.forEach((it) => it(st, dt))
      },
      clean: () => {
        api.cleans.forEach((t) => t())

        api.loops = []
        api.cleans = []
      },
      onClean: (cl) => {
        api.cleans.push(cl)
      },
    }

    return api
  }, [])

  useFrame((st, dt) => {
    core.work(st, dt)
  })

  useEffect(() => {
    return () => {
      core.clean()
    }
  }, [])

  useEffect(() => {
    if (!core) {
      return
    }
    if (!cb) {
      return
    }

    cb(core)
  }, [cb, core])

  return core
}
