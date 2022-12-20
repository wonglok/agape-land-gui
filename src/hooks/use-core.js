import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

export let useCore = () => {
  let core = useMemo(() => {
    let loops = []
    let cleans = []
    return {
      loops,
      cleans,
      onLoop: (v) => {
        loops.push(v)
      },
      work: (st, dt) => {
        loops.forEach((it) => it(st, dt))
      },
      clean: () => {
        cleans.forEach((t) => t())
        while (cleans.length) {
          cleans.pop()
        }
        while (loops.length) {
          loops.pop()
        }
      },
      onClean: (cl) => {
        cleans.push(cl)
      },
    }
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
