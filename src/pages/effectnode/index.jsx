// import importShim from

import { UserEndPoints } from '@/content-landing-page/LoginContentGate/GateConst'
import { useEffect } from 'react'
//
export default function EffectNode() {
  useEffect(() => {
    let run = async () => {
      // import('@jspm/generator').then(({ Generator }) => {
      //   console.log()
      // })
      let myEndPoint = UserEndPoints[process.env.NODE_ENV]
      //
      let getImportMap = async (myPackages) => {
        return fetch(`${myEndPoint}/import-map`, {
          method: 'POST',
          body: JSON.stringify({
            packages: myPackages,
          }),
          mode: 'cors',
        }).then((r) => {
          if (r.ok) {
            return r.json()
          } else {
            return Promise.reject()
          }
        })
      }

      //
      let installImportMapOnce = async () => {
        let res = document.body.querySelector('#importmap')

        if (!res) {
          document.body.appendChild(
            Object.assign(document.createElement('script'), {
              id: 'importmap',
              type: 'importmap-shim',
              innerHTML: JSON.stringify({ imports: {} }),
            })
          )

          document.body.appendChild(
            Object.assign(document.createElement('script'), {
              id: 'esms-options',
              type: 'esms-options',
              innerHTML: JSON.stringify({
                shimMode: true,
              }),
            })
          )

          await import('es-module-shims')
        }
      }

      //
      let importPackages = async (myPackages = []) => {
        //
        await installImportMapOnce()

        return getImportMap(myPackages)
          .then((v) => {
            window.importShim.addImportMap(v)

            return Promise.all(
              myPackages.map((it) => {
                return window.importShim(it)
              })
            ).then((result) => {
              //
              // console.log(result)
              //
              return result
            })
          })
          .catch((e) => {
            console.warn(e)
          })
      }

      importPackages([
        'three',
        'three/examples/jsm/utils/SkeletonUtils.js',
      ]).then((result) => {
        //
        console.log(result)
      })

      // importShim('react').
    }
    run()
    // importShim()
  }, [])
  return <div>123</div>
}
