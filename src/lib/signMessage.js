const signMessage = async ({ provider, nonce }) => {
  await provider.send('eth_requestAccounts', [])

  const providerAddress = await provider.getSigner().getAddress()

  let json = {
    domain: window.location.host,
    address: providerAddress, //connetorData.account,
    statement: 'Sign in with Ethereum to the app.',
    uri: window.location.origin,
    version: '1',
    // chainId: connetorData.chain.id,
    nonce,
  }

  const signature = await signer.signMessage(JSON.stringify(json))

  return { signature, json }
}
