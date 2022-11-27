import { useEffect, useState } from 'react'

export function GoogleContent() {
  let myEndPoints = {
    development: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
    production: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
    test: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
  }

  const myAPIEndPoint = myEndPoints[process.env.NODE_ENV]

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const getSession = async () => {
    const sToken = localStorage.getItem('session-access-key')
    if (sToken) {
      setLoading(true)
      const user = await getUserInfo(sToken)
      if (user) {
        setSession(user)
      } else {
        setSession(false)
      }
      setLoading(false)
    }
  }

  const getUserInfo = async (sToken) => {
    if (!sToken) {
      return false
    }
    try {
      const response = await fetch(`${myAPIEndPoint}/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sToken}`,
        },
      })
      return response.json()
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = async () => {
    localStorage.clear('session')
    setSession(null)
  }

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const sTokenInURL = params.get('token')
    if (sTokenInURL) {
      localStorage.setItem('session-access-key', sTokenInURL)
      window.location.replace(window.location.origin)
    }
  }, [])

  useEffect(() => {
    getSession()
  }, [])

  if (loading) {
    return <div className='container'>Loading...</div>
  }

  return (
    <>
      <div>
        {session ? (
          <div>
            <div className='profile'>
              <p>Welcome {session.name}!</p>
              <img
                src={session.picture}
                style={{ borderRadius: '50%' }}
                width={100}
                height={100}
                alt=''
              />
              <p>{session.email}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                window.top.location.assign(
                  `${myAPIEndPoint}/auth/google/authorize`
                )
              }}
              rel='noreferrer'
            >
              <>Sign in with Google</>
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default function LoginFrame() {
  return <GoogleContent></GoogleContent>
}
