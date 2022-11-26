import { utils } from 'ethers'

export function checkIsAddressCorrect(address) {
  try {
    return Boolean(utils.getAddress(address))
  } catch (e) {
    console.error(e)
    return false
  }
}
