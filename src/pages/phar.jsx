import { Phar } from '@/content-pharmecy/Phar'

export default Phar

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Agape Town - Here we go!',
    }, // will be passed to the page component as props
  }
}
