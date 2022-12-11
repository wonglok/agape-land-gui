import { UIContent } from '@/lib/UIContent'
import { Box, Center, Environment, Text, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Color, sRGBEncoding } from 'three'
import { useSnapshot } from 'valtio'
import { Core } from '../Core/Core'
import { Gate } from '../LoginContentGate/Gate'
import {
  loginEth,
  loginGoogle,
  loginGuest,
  signOut,
} from '../LoginContentGate/GateMethods'
import { GateState } from '../LoginContentGate/GateState'
import { NYCJourney } from '../NYCJourney/NYCJourey'
import { useLandingPageStore } from './LandingPageStore'

export function CanvasPage({}) {
  let gs = useSnapshot(GateState)
  return (
    <Canvas
      //
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#F08BDC',
      }}
      {...{
        gl: { antialias: false, logarithmicDepthBuffer: false },
        onCreated: (st) => {
          // st.events.connect(document.body)

          st.scene.background = new Color('#F08BDC').convertLinearToSRGB(
            '#F08BDC'
          )

          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
          st.gl.shadowMap.enabled = false

          Core.now.canvas = Core.makeAutoNode('canvas')
          for (let kn in st) {
            Core.now.canvas.now[kn] = st[kn]
          }
          st.gl.setAnimationLoop(Core.work)
        },
      }}
    >
      <Gate
        loggedInContent={
          <>
            <group>
              <Box></Box>
            </group>
          </>
        }
        landingContent={
          <>
            <Suspense
              fallback={
                <UIContent>
                  <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
                    <img
                      className='w-6/12 lg:w-64'
                      layout={'responsive'}
                      src={`/brand/agape-2.png`}
                      alt={'agape town - here we go!'}
                    ></img>
                  </div>
                </UIContent>
              }
            >
              <Environment
                files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
              ></Environment>

              <NYCJourney></NYCJourney>

              <EffectComposer
                resolutionScale={0.1}
                disableNormalPass
                multisampling={4}
              >
                <Bloom
                  mipmapBlur
                  radius={0.5}
                  intensity={2}
                  width={256}
                  height={256}
                  luminanceThreshold={0.3}
                ></Bloom>
              </EffectComposer>
            </Suspense>
          </>
        }
      ></Gate>
      <></>

      <UIContent>
        <div className='fixed top-0 right-0 z-20 mt-2 mr-2'>
          <img
            onClick={(ev) => {
              console.log(ev)
              GateState.menuOverlay = true
            }}
            className='h-8 lg:h-12'
            src={`/brand/agape-3.png`}
            alt={'agape town - here we go!'}
          ></img>
        </div>

        {gs.menuOverlay && (
          <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
            <div className='relative w-full max-w-sm p-2 px-4 bg-white lg:max-w-lg rounded-xl -translate-y-28'>
              <div className='m-3 text-2xl font-bold'>
                Welcome to AGAPE TOWN
              </div>
              {!gs.session ? (
                <div>
                  <button
                    className='p-2 px-5 mb-2 mr-2 bg-gray-200 rounded-xl'
                    onClick={() => {
                      loginGuest()
                    }}
                    rel='noreferrer'
                  >
                    <>Sign in as Guest</>
                  </button>

                  <button
                    className='p-2 px-5 mb-2 mr-2 text-white  bg-blue-500 rounded-xl'
                    onClick={() => {
                      loginGoogle()
                    }}
                    rel='noreferrer'
                  >
                    <>Sign in as Google</>
                  </button>

                  <button
                    className='p-2 px-5 mb-2 mr-2 bg-orange-400 rounded-xl'
                    onClick={() => {
                      loginEth()
                    }}
                    rel='noreferrer'
                  >
                    <>Sign in as Metamask</>
                  </button>
                </div>
              ) : (
                <>
                  {
                    <div>
                      <div className='profile'>
                        <p>Welcome {gs.session.name}!</p>
                        {gs.session.picture && (
                          <img
                            src={gs.session.picture}
                            style={{ borderRadius: '50%' }}
                            width={100}
                            height={100}
                            alt=''
                          />
                        )}
                        {gs.session.email && <p>{gs.session.email}</p>}
                        <button
                          onClick={() => {
                            signOut()
                          }}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  }
                </>
              )}

              <div
                onClick={() => {
                  //
                  GateState.menuOverlay = false
                }}
                className='absolute right-0 p-2 px-4 text-white bg-pink-500 cursor-pointer -top-12 rounded-xl'
              >
                Close
              </div>
            </div>
          </div>
        )}
      </UIContent>
      {/*  */}

      {/*  */}
    </Canvas>
  )
}
