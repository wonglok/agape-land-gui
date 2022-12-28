// import { CanvasPage } from '@/content-landing-page/CanvasLayout/CanvasLandingPage'

import { CanvasPage } from '@/content-landing-page/CanvasLayout/CanvasLandingPage'

export default function AutoDetect({ title, host, referer }) {
  console.log(title, host, referer)

  return <CanvasPage></CanvasPage>
}

// export async function getStaticProps(context) {
//   //
//   return {
//     props: {
//       title: 'Agape Town - Here we go!',
//     }, // will be passed to the page component as props
//   }
// }

export async function getServerSideProps(context) {
  //

  return {
    props: {
      host: context?.req?.headers?.host || '',
      referer: context?.req?.headers?.referer || '',
      title: 'Agape Town - Here we go!',
    }, // will be passed to the page component as props
  }
}

//
//
