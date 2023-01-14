import { TMobile } from '@/content-t-mobile/TMobile'

export default TMobile

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Agape Town - Here we go!',
    },
  }
}
