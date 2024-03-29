import { TextureWebP } from '@gltf-transform/extensions'
import {
  getTextureChannelMask,
  listTextureSlots,
  SquooshOptions,
} from '@gltf-transform/functions'
import { Document, TextureChannel, Transform } from '@gltf-transform/core'
// import type { SquooshLib } from './types/squoosh-lib'
import { formatBytes } from './utils'
import { encode } from '../webp/webp'

enum Codec {
  OXIPNG = 'oxipng',
  MOZJPEG = 'mozjpeg',
  WEBP = 'webp',
}
const CODEC_TO_MIME_TYPE: Record<Codec, string> = {
  [Codec.OXIPNG]: 'image/png',
  [Codec.MOZJPEG]: 'image/jpeg',
  [Codec.WEBP]: 'image/webp',
}

interface SquooshInternalOptions extends SquooshOptions {
  codec: Codec
}

const SQUOOSH_DEFAULTS = {
  jobs: 4,
  formats: /.*/,
  slots: /.*/,
  auto: false,
}

const WEBP_DEFAULTS: Omit<SquooshInternalOptions, 'squoosh'> = {
  ...SQUOOSH_DEFAULTS,
  codec: Codec.WEBP,
}
const MOZJPEG_DEFAULTS: Omit<SquooshInternalOptions, 'squoosh'> = {
  ...SQUOOSH_DEFAULTS,
  codec: Codec.MOZJPEG,
  formats: /^image\/jpeg$/,
}
const OXIPNG_DEFAULTS: Omit<SquooshInternalOptions, 'squoosh'> = {
  ...SQUOOSH_DEFAULTS,
  codec: Codec.OXIPNG,
  formats: /^image\/png$/,
}

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

let pool = null
let poolUsers = 0

const requestImagePool = (squoosh: any, jobs: number) => {
  if (!pool) {
    pool = new squoosh.ImagePool(jobs)
  }
  poolUsers++
  return pool
}

const releaseImagePool = (): void => {
  poolUsers--
  if (pool && poolUsers <= 0) {
    pool.close() // Required for process to exit.
    pool = null
  }
}

export const webpTransform = function (options: SquooshOptions): Transform {
  const _options = { codec: Codec.WEBP, ...options }
  return async (document: Document): Promise<void> => {
    //
    await squoosh(_options)(document)

    // Attach EXT_texture_web if needed.

    //
    const textures = document.getRoot().listTextures()
    if (
      textures.some(
        (texture) => texture.getMimeType() === CODEC_TO_MIME_TYPE[Codec.WEBP]
      )
    ) {
      document.createExtension(TextureWebP).setRequired(true)
    }
  }
}

//

/** @internal Shared base for {@link webp()}, {@link mozjpeg()}, and {@link oxipng()}. */
export const squoosh = function (_options: SquooshInternalOptions): Transform {
  const options = {
    ...SQUOOSH_DEFAULTS,
    ..._options,
  } as Required<SquooshInternalOptions>
  // const squoosh = options.squoosh as typeof SquooshLib | null
  const codec = options.codec

  return async (document: Document): Promise<void> => {
    const logger = document.getLogger()
    const textures = document.getRoot().listTextures()
    // const pool = requestImagePool(squoosh, options.jobs)

    let total = textures.length
    let tick = 0
    // await Promise.all(
    //   textures.map(async (texture, textureIndex) => {

    //   })
    // )
    for (let kn = 0; kn < total; kn += 5) {
      await Promise.all(
        [
          //!SECTION
          textures[kn + 0],
          textures[kn + 1],
          textures[kn + 2],
          textures[kn + 3],
          textures[kn + 4],
          //!SECTION
        ]
          //
          .filter((e) => e)
          .map(async (texture, textureIndex) => {
            const slots = listTextureSlots(document, texture)
            const channels = getTextureChannelMask(document, texture)
            const textureLabel =
              texture.getURI() ||
              texture.getName() ||
              `${textureIndex + 1}/${document.getRoot().listTextures().length}`
            const prefix = `${codec}:texture(${textureLabel})`

            // FILTER: Exclude textures that don't match (a) 'slots' or (b) expected formats.
            if (!SUPPORTED_MIME_TYPES.includes(texture.getMimeType())) {
              logger.debug(
                `${prefix}: Skipping, unsupported texture type "${texture.getMimeType()}".`
              )
              return
            } else if (!options.formats.test(texture.getMimeType())) {
              logger.debug(
                `${prefix}: Skipping, "${texture.getMimeType()}" excluded by "formats" parameter.`
              )
              return
            } else if (
              slots.length &&
              !slots.some((slot) => options.slots.test(slot))
            ) {
              logger.debug(
                `${prefix}: Skipping, [${slots.join(
                  ', '
                )}] excluded by "slots" parameter.`
              )
              return
            } else if (
              options.codec === Codec.MOZJPEG &&
              channels & TextureChannel.A
            ) {
              logger.warn(
                `${prefix}: Skipping, [${slots.join(
                  ', '
                )}] requires alpha channel.`
              )
              return
            }

            logger.debug(`${prefix}: Slots → [${slots.join(', ')}]`)

            // COMPRESS: Run `squoosh/lib` library.

            console.log('begin encoding webp....')
            let url = URL.createObjectURL(
              new Blob([texture.getImage().buffer], {})
            )
            let result = await encode(url, 50)
            // .then((ev) => {
            //   console.log(ev)
            //   /**!SECTION
            //    *  blobURL,
            //       blob,
            //       arrayBuffer: await blob.arrayBuffer(),
            //       width: imageData.width,
            //       height: imageData.height,
            //    */

            //   console.log(ev)
            // })

            tick++
            console.log('done encoding webp....', (tick / total) * 100 + '%')

            // const image = pool.ingestImage(texture.getImage()!)
            const srcByteLength = texture.getImage()!.byteLength
            const dstByteLength = result.arrayBuffer!.byteLength

            // await image.encode({ [options.codec]: options.auto ? 'auto' : {} })

            // const encodedImage = await image.encodedWith[options.codec]

            // logger.debug(`${prefix}: ${JSON.stringify(encodedImage.optionsUsed)}`)

            texture
              .setImage(new Uint8Array(result.arrayBuffer))
              .setMimeType('image/webp')
            // const dstByteLength = encodedImage.binary.byteLength

            logger.debug(
              `${prefix}: ${formatBytes(srcByteLength)} → ${formatBytes(
                dstByteLength
              )}`
            )
          })
      )
    }

    // releaseImagePool()

    logger.debug(`${codec}: Complete.`)
  }
}
