import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

export let useCore = () => {
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
        api.cleans = []
        api.loops = []
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
  }, [core])

  return core
}
