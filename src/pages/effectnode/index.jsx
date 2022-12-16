// import importShim from

// import { UserEndPoints } from '@/content-landing-page/LoginContentGate/GateConst'
import { importPackages } from '@/engine-effectnode/lib/importPackages'
import { useEffect } from 'react'
//
export default function EffectNode() {
  useEffect(() => {
    let run = async () => {
      importPackages([
        'react-dom',
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
