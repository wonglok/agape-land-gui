import { useGLBLoader } from '@/lib/glb-loader/useGLBLoader'

export function Querlo() {
  let querlo = useGLBLoader(`/xr/upsacel4x/querlo-4x-2kres.glb`)

  querlo.scene.traverse((it) => {
    //
    if (it.name === 'Plane') {
      it.visible = false
    }
  })
  return (
    <group>
      <primitive object={glb.scene}></primitive>
    </group>
  )
}
