import { webpTransform } from '@/lib/gltf-transform/webp'
import { Document, Scene, VertexLayout, WebIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import {
  dedup,
  instance,
  prune,
  textureResize,
} from '@gltf-transform/functions'

export default function Page() {
  return (
    <div>
      <button
        onClick={() => {
          ///

          let input = document.createElement('input')
          input.type = 'file'
          input.onchange = async ({
            target: {
              files: [first],
            },
          }) => {
            let arrayBuffer = await first.arrayBuffer()

            const io = new WebIO({ credentials: 'include' })

            io.registerExtensions([...ALL_EXTENSIONS])
            io.setVertexLayout(VertexLayout.SEPARATE)

            // Read.
            let document

            document = await io.readBinary(new Uint8Array(arrayBuffer)) // Uint8Array → Document

            await document.transform(
              //
              // Remove duplicate vertex or texture data, if any.
              dedup(),

              //
              instance(),

              // Remove unused nodes, textures, or other data.
              //
              prune(),

              // Losslessly resample animation frames.
              // resample(),

              // Resize all textures to ≤1K.
              //
              textureResize({ size: [2048, 2048] }),

              //
              webpTransform({})
            )

            // Write.
            const glb = await io.writeBinary(document) // Document → Uint8Array

            const link = URL.createObjectURL(
              new Blob([glb.buffer], { type: 'application/octet-stream' })
            )

            console.log(link)

            console.log(
              'before',
              arrayBuffer.byteLength,
              'after',
              glb.buffer.byteLength
            )
          }
          input.click()
        }}
      >
        Squoosh
      </button>
      {/*  */}
    </div>
  )
}
