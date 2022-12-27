import { PGAvatars } from '@/components/Pages/Home/PGAvatars'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/portal/places'>
      {/* <AvaLand></AvaLand> */}
      <PGAvatars></PGAvatars>
    </RedirGateHTML>
  )
}

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape - Servants',
    },
  }
}
