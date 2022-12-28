// import importShim from

// import { UserEndPoints } from '@/content-landing-page/LoginContentGate/GateConst'
import { importPackages } from '@/engine-effectnode/lib/importPackages'
import { useEffect } from 'react'

export default function EffectNode() {
  useEffect(() => {
    importPackages([
      'nipple',
      'react-dom',
      'three',
      'three/examples/jsm/utils/SkeletonUtils.js',
    ]).then((result) => {
      //
      console.log(result)
    })
    // importShim()
  }, [])
  return <div>123</div>
}
