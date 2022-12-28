import { PGSites } from '@/components/Pages/Home/Sites/PGSites'
import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/portal/places'>
      {/* <AvaLand></AvaLand> */}
      <PGSites></PGSites>
    </RedirGateHTML>
  )
}

//

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape Portal',
    },
  }
}
