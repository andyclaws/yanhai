import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getOwnerList = params => {
  return axios.request({
    url: 'uac/ownerList',
    method: 'post',
    data: params
  })
}
