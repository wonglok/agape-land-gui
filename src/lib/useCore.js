import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'

export let useCore = () => {
  let core = useMemo(() => {
    let loops = []
    let cleans = []
    let resources = {}
    return {
      loops,
      cleans,
      resources,
      now: resources,
      ready: new Proxy(resources, {
        get: (o, k) => {
          return new Promise((resolve) => {
            let tt = setInterval(() => {
              let res = resources[k]
              if (res) {
                clearInterval(tt)
                resolve(res)
              }
            })
          })
        },
      }),

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
    for (let key in st) {
      core.resources[key] = st[key]
    }
    core.work(st, dt)
  })

  useEffect(() => {
    return () => {
      core.clean()
    }
  }, [core])

  return core
}
