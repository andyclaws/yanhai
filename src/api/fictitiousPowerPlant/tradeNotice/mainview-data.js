import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getNewTrades = params => {
  return axios.request({
    url: 'tpc/publicityInfo',
    method: 'post',
    data: params
  })
}
