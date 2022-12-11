import { UIContent } from '@/lib/UIContent'
import { useSnapshot } from 'valtio'
import { GateState } from './GateState'

export function Gate({ loggedInContent, landingContent }) {
  //!SECTION

  let snap = useSnapshot(GateState)

  console.log(snap)

  if (snap.readyStatus === 'loggedin') {
    return loggedInContent
  } else if (snap.readyStatus === 'landing') {
    return landingContent
  } else if (snap.readyStatus === 'init' || snap.readyStatus === 'loading') {
    //
    return (
      <group>
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
      </group>
    )
  }
  return <group>{/*  */}</group>
}
