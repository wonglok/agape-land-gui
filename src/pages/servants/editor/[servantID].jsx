import { ServantsCanvas } from '@/content-servants-bot/servants-canvas/ServantsCavnvas'

export default ServantsCanvas

export async function getStaticProps(context) {
  //

  return {
    props: {
      title: 'Agape - Servants',
    }, // will be passed to the page component as props
  }
}