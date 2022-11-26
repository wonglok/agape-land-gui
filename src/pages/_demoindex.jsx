export default function Index() {
  return (
    <div>
      <ul className='pl-5 list-decimal'>
        <li>
          <div>Tilt Brush</div>
          <div>
            <ul className='pl-5 list-decimal'>
              {/*  */}
              <li>
                <a
                  href='/t-brush'
                  className='text-blue-500 underline'
                  target='_blank'
                >
                  Google tilt brush
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div>Instancing Editor</div>
          <div>
            <ul className='pl-5 list-decimal'>
              {/*  */}
              <li>
                <a
                  href='/i-editor'
                  className='text-blue-500 underline'
                  target='_blank'
                >
                  Instnacing editor
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  )
}
