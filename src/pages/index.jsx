import { useEffect, useState } from 'react'

export default function Yo() {
  return (
    <div>
      <div>Welcome to our Site</div>
      <GoogleContent></GoogleContent>
      <div>
        <a className='text-blue-500 underline' href='/connect'>
          Login / Register
        </a>
      </div>
      <div>
        {/*  */}
        {/*  */}

        {/*  */}
        {/*  */}
      </div>
    </div>
  )
}

function GoogleContent() {
  let endPoints = {
    development: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
    production: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
    test: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
  }

  const myAPIEndPoint = endPoints[process.env.NODE_ENV]

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const getSession = async () => {
    const token = localStorage.getItem('session')
    if (token) {
      setLoading(true)
      const user = await getUserInfo(token)
      if (user) {
        setSession(user)
      } else {
        setSession(false)
      }
      setLoading(false)
    }
  }

  const getUserInfo = async (session) => {
    try {
      const response = await fetch(`${myAPIEndPoint}/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session}`,
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
    const token = params.get('token')
    if (token) {
      localStorage.setItem('session', token)
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
            <a href={`${myAPIEndPoint}/auth/google/authorize`} rel='noreferrer'>
              <button>Sign in with Google</button>
            </a>
          </div>
        )}
      </div>
    </>
  )
}
