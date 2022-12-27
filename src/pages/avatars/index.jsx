import RedirGateHTML from '@/lib/login/RedirGateHTML'

export default function Avatars() {
  return (
    <RedirGateHTML redirect='/avatars'>
      {/* <AvaLand></AvaLand> */}
      Avatar Avatar Avatar
    </RedirGateHTML>
  )
}

//

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape - Servants',
    },
  }
}
