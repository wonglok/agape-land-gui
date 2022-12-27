import { useEffect } from 'react'

export function RedirectToPage({ redirect }) {
  useEffect(() => {
    if (redirect) {
      location.assign(`/connect?redirect=${encodeURIComponent(redirect)}`)
    }
  }, [redirect])
  return null
}
