import { CanvasPage } from '@/content-landing-page/CanvasLayout/CanvasLandingPage'

export default CanvasPage

export async function getStaticProps(context) {
  //

  return {
    props: {
      title: 'Agape Town - Here we go!',
    }, // will be passed to the page component as props
  }
}
