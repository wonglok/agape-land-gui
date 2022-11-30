import { encode } from '@/lib/webp/webp'
import { set } from 'animejs'
import { useEffect, useState } from 'react'

export default function Page() {
  let [bb, set] = useState(false)
  useEffect(() => {
    //
    encode(`/env/stars4096-2048.jpeg`, 50).then((ev) => {
      console.log(ev)

      set(ev.blobURL)
    })
  }, [])
  return (
    <div>
      <button
        onClick={() => {
          //
          set('')
          encode(`/env/stars4096-2048.jpeg`, 50).then((ev) => {
            console.log(ev)

            set(ev.blobURL)
          })
        }}
      >
        WebP
      </button>
      {/*  */}
      {bb && <img width={500} height={500} src={bb}></img>}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}
