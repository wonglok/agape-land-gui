import { useEffect } from 'react'

export default function IndexAuth() {
  useEffect(() => {
    window.location.assign('/auth/login')
  }, [])
  return <div>Welcome to auth{/*  */}</div> //
}
