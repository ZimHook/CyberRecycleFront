import axios from "axios"

const apiHost = 'http://localhost:4000'

export const getTokenReceiver = async() => {
  const res = await axios.get(apiHost + '/receiver')
  return res?.data
}

export const burnToken = async(chainId, txHash) => {
  const res = await axios.get(apiHost + `/burn?chain_id=${chainId}&tx_hash=${txHash}`)
  return res?.data
}