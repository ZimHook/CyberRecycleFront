import axios from "axios"

const apiHost = 'https://cyber-recycle-backend.vercel.app'

export const getTokenReceiver = async() => {
  const res = await axios.get(apiHost + '/receiver')
  return res?.data
}

export const burnToken = async(chainId, txHash) => {
  const res = await axios.get(apiHost + `/burn?chain_id=${chainId}&tx_hash=${txHash}`)
  return res?.data
}