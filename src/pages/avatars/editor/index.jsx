import { ServantsCanvas } from '@/content-servants-bot/servants-canvas/ServantsCavnvas'

export default ServantsCanvas

export async function getServerSideProps(context) {
  //

  return {
    props: {
      title: 'Agape - Servants',
    },
  }
}
