export default function Index() {
  return (
    <div>
      {`<OpenMetaverse your={glb.scene} />`}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      title: 'Agape Land',
    }, // will be passed to the page component as props
  }
}
