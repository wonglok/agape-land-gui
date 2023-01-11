import { TMobile } from '@/content-t-mobile/TMobile'

export default TMobile

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Agape Town - Here we go!',
    }, // will be passed to the page component as props
  }
}
