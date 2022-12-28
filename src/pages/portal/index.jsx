import { PGHome } from '@/components/Pages/Home/Dash/PGHome'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/portal'>
      {/* <AvaLand></AvaLand> */}
      <PGHome></PGHome>
    </RedirGateHTML>
  )
}

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape Portal',
    },
  }
}
