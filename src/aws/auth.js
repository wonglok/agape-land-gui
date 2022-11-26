// let bcrypt = require("bcrypt");

const State = {
  nodeEnv: process.env.NODE_ENV,
  //
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}

export class Auth {
  //
  static async generateKeyPair() {
    let jose = await import('jose').then((e) => e)
    const { publicKey, privateKey } = await jose.generateKeyPair('ES512', {
      extractable: true,
    })
    const publicJwk = await jose.exportJWK(publicKey)
    const privateJwk = await jose.exportJWK(privateKey)

    const publicKeyB64 = Buffer.from(
      JSON.stringify(publicJwk),
      'utf8'
    ).toString('base64')

    const privateKeyB64 = Buffer.from(
      JSON.stringify(privateJwk),
      'utf8'
    ).toString('base64')

    // seed phrase to key pair

    // console.log('JWT_B64_PUBLIC')
    // console.log(JWT_B64_PUBLIC)

    // console.log('JWT_B64_PRIVATE')
    // console.log(JWT_B64_PRIVATE)

    return {
      publicKeyB64,
      privateKeyB64,
    }
  }

  static async signUserJWT({
    serverSideID = '',
    clientSideID = '',
    privateKeyB64,
  }) {
    //
    let jose = await import('jose').then((e) => e)

    const privateKeyObj = await jose.importJWK(
      JSON.parse(Buffer.from(privateKeyB64, 'base64')),
      'ES512'
    )

    const jwt = await new jose.SignJWT({
      clientSideID: `${clientSideID}`,
      serverSideID: `${serverSideID}`,
    })
      .setProtectedHeader({ alg: 'ES512' })
      .setIssuer('urn:metaverse:issuer')
      .setAudience('urn:metaverse:audience')
      .sign(privateKeyObj)

    return { jwt }
  }

  static async verifyUserJWT({ jwt, publicKeyB64 }) {
    let jose = await import('jose').then((e) => e)

    const publicKeyObj = await jose.importJWK(
      JSON.parse(Buffer.from(publicKeyB64, 'base64')),
      'ES512'
    )

    const { payload, protectedHeader } = await jose.jwtVerify(
      jwt,
      publicKeyObj,
      {
        issuer: 'urn:metaverse:issuer',
        audience: 'urn:metaverse:audience',
      }
    )

    return {
      payload,
      protectedHeader,
    }
  }
}

//
