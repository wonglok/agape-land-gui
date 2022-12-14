// import importShim from

import { useEffect } from 'react'
//
export default function EffectNode() {
  useEffect(() => {
    let run = async () => {
      // import('@jspm/generator').then(({ Generator }) => {
      //   console.log()
      // })

      let getImportMap = async (myPackages) => {
        return fetch(
          `https://lspr7w8538.execute-api.ap-southeast-1.amazonaws.com/import-map`,
          {
            method: 'POST',
            body: JSON.stringify({
              packages: myPackages,
            }),
            mode: 'cors',
          }
        ).then((r) => {
          if (r.ok) {
            return r.json()
          } else {
            return Promise.reject()
          }
        })
      }
      /*

      <script type="esms-options">
      {
        "shimMode": true
      }
      </script>

      */
      let installImportMap = async () => {
        let res = document.body.querySelector('#importmap')

        if (!res) {
          document.body.appendChild(
            Object.assign(document.createElement('script'), {
              id: 'esms-options',
              type: 'esms-options',
              innerHTML: JSON.stringify({
                shimMode: true,
              }),
            })
          )

          document.body.appendChild(
            Object.assign(document.createElement('script'), {
              id: 'importmap',
              type: 'importmap-shim',
              innerHTML: JSON.stringify({ imports: {} }),
            })
          )
          await import('es-module-shims')
        }
      }
      //
      let packageImport = async (myPackages = []) => {
        await installImportMap()

        return getImportMap(myPackages).then((v) => {
          window.importShim.addImportMap(v)

          return Promise.all(
            myPackages.map((pack) => {
              return window.importShim(pack)
            })
          ).then((result) => {
            // console.log(result)
            return result
          })
        })
      }

      packageImport(['react-dom']).then((result) => {
        console.log(result)
      })

      // importShim('react').
    }
    run()
    // importShim()
  }, [])
  return <div>123</div>
}
