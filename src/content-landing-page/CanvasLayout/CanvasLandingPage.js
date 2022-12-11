/* eslint-disable @next/next/no-img-element */
import { UIContent } from '@/lib/UIContent'
import {
  Box,
  Center,
  Environment,
  Image,
  PerspectiveCamera,
  Text,
  Text3D,
} from '@react-three/drei'
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
import { LoadingHTML } from '../LoginContentGate/LoadingHTML'
import { MetaverseWelcome } from '../MetaverseWelcome/MetaverseWelcome'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { NYCJourney } from '../NYCJourney/NYCJourey'
import { LandingContent } from './LandingContent'
import { Hud as HUD } from '@react-three/drei'
import { MetaverseMenu } from '../MetaverseMenu/MetavrseMeu'

export function CanvasPage({}) {
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
        loadingContent={null}
        loggedInContent={
          <>
            <group>
              <MetaverseWelcome></MetaverseWelcome>
            </group>
          </>
        }
        landingContent={
          <>
            <LandingContent></LandingContent>
          </>
        }
      ></Gate>

      <MetaverseMenu></MetaverseMenu>
      {/* <UIContent>
        <div className='fixed top-0 right-0 z-20 mt-2 mr-2'>
          <img
            onClick={(ev) => {
              // console.log(ev)
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
      </UIContent> */}
      {/*  */}

      {/*  */}
    </Canvas>
  )
}
