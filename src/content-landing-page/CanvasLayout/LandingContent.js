import { Environment } from '@react-three/drei'
import { BackgroundColor } from '../NYCJourney/BackgroundColor'
import { NYCJourney } from '../NYCJourney/NYCJourey'

export function LandingContent() {
  return (
    <>
      <Environment
        files={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}
      ></Environment>

      <BackgroundColor color='#F08BDC'></BackgroundColor>

      <NYCJourney></NYCJourney>
    </>
  )
}
