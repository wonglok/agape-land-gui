import { ethers } from 'ethers'

export const getProviderSigner = () => {
  let provider
  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
  } else {
    provider = null
  }

  const signer = provider?.getSigner()

  return {
    signer,
    provider,
  }
}
