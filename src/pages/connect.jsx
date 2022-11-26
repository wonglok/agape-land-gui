import { Auth } from '@/aws/auth'

export default function Connect() {
  return (
    <div>
      <div>Welcome dear Guest</div>
      <div>Client</div>
      <div>Client Random ID:</div>
      <div>Client Lcoal Access Wallet Pin:</div>

      <div>
        <div>Client Certifications:</div>
        <div className='ml-3'>Metaverse 1: Certificate</div>
        <div className='ml-3'>Metaverse 2: Certificate</div>
        <div className='ml-3'>Metaverse 3: Certificate</div>
        <div className='ml-3'>Metaverse 4: Certificate</div>
        <div className='ml-3'>Metaverse 5: Certificate</div>
      </div>

      <div>
        <button
          onClick={async () => {
            let yo = await Auth.generateKeyPair()
            console.log(yo)
          }}
        >
          Generate:
        </button>
        {/* Cert 1 -> issue jwt random ->  */}
        {/* Cert 1 -> issue jwt random ->  */}
      </div>

      <div>OneTime QR Code Transfer</div>

      {/* Claim a username */}
      {/*  */}
    </div>
  )
}

//

// s3

// hosting

///

//!SECTION

//!SECTION

//

//

//
