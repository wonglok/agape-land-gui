import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getID } from '@/lib/getID'

export function GoogleContent() {
  const myUserEndPoints = {
    development: `https://lspr7w8538.execute-api.ap-southeast-1.amazonaws.com`,
    production: `https://via39ii0sd.execute-api.ap-southeast-1.amazonaws.com`,
    test: `https://xulbvrr82m.execute-api.ap-southeast-1.amazonaws.com`,
  }

  const myAPIEndPoint = myUserEndPoints[process.env.NODE_ENV]

  const SESSION_ACCESS_KEY = `session-access-key`

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const getSession = async () => {
    const sToken = localStorage.getItem(SESSION_ACCESS_KEY)
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
    localStorage.clear(SESSION_ACCESS_KEY)
    setSession(null)
  }

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const sTokenInURL = params.get('token')
    if (sTokenInURL) {
      localStorage.setItem(SESSION_ACCESS_KEY, sTokenInURL)
      window.location.replace(window.location.origin)
    }
  }, [])

  useEffect(() => {
    getSession()
  }, [])

  let [display, setDisplayMetamask] = useState(true)

  useEffect(() => {
    setDisplayMetamask(typeof window !== 'undefined' && window.ethereum)
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
              {session.picture && (
                <img
                  src={session.picture}
                  style={{ borderRadius: '50%' }}
                  width={100}
                  height={100}
                  alt=''
                />
              )}
              {session.email && <p>{session.email}</p>}
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

            {/* <button
              onClick={() => {
                window.top.location.assign(
                  `${myAPIEndPoint}/auth/guest/authorize`
                )
              }}
              rel='noreferrer'
            >
              <>Sign in as Guest</>
            </button> */}

            {display && (
              <button
                onClick={async () => {
                  try {
                    let provider
                    if (typeof window !== 'undefined' && window.ethereum) {
                      provider = new ethers.providers.Web3Provider(
                        window.ethereum,
                        'any'
                      )
                    } else {
                      provider = null
                    }

                    if (provider) {
                      await provider.send('eth_requestAccounts', [])

                      const signer = await provider.getSigner()
                      const providerAddress = await signer.getAddress()

                      let json = {
                        domain: window.location.host,
                        address: providerAddress, //connetorData.account,
                        statement: 'Ethereum Sign In',
                        origin: window.location.origin,
                        version: '1',
                        // chainId: connetorData.chain.id,
                        nonce: getID() + getID() + getID() + getID(),
                      }
                      let message = `Welcome to Agape!
Let's sign you in...
domain : ${json.domain}
origin : ${json.origin}
addresss : ${json.address}
nonce : ${json.nonce}
`
                      const originalSignature = await signer.signMessage(
                        message
                      )

                      let signature = originalSignature
                      let raw = message

                      window.top.location.assign(
                        `${myAPIEndPoint}/auth/wallet/authorize?signature=${encodeURIComponent(
                          signature
                        )}&raw=${encodeURIComponent(raw)}`
                      )
                    }
                  } catch (e) {
                    console.log(e)
                  }
                }}
              >
                Sign in with Metamask
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default function LoginFrame() {
  return <GoogleContent></GoogleContent>
}
