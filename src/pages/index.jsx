export default function LandingPage() {
  return <>YO</>
}

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Welcome to Agape Town!',
    }, // will be passed to the page component as props
  }
}

/*
///////////

///////////
*/
