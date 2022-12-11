const { UIContent } = require('@/lib/UIContent')
const { BackgroundColor } = require('../NYCJourney/BackgroundColor')

export function LoadingHTML() {
  return (
    <group>
      <group>
        <UIContent>
          <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full z-100'>
            <img
              className='w-6/12 lg:w-64'
              src={`/brand/agape-2.png`}
              alt={'agape town - here we go!'}
            ></img>
          </div>
        </UIContent>
        <BackgroundColor color='#F08BDC'></BackgroundColor>
      </group>
    </group>
  )
}
