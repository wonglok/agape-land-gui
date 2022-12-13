import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { sceneToCollider } from './sceneToCollider'

export function Collider({ scene, onReady = () => null }) {
  let colldierProm = useMemo(
    (s) => {
      return sceneToCollider({ scene })
    },
    [scene]
  )

  let [st, setST] = useState(null)

  useEffect(() => {
    colldierProm.then((v) => {
      setST(v)

      return
    })
  }, [colldierProm, onReady])

  return (
    <group>
      {/*  */}
      {st && onReady(st)}

      {/*  */}

      {/*  */}
    </group>
  )
}
