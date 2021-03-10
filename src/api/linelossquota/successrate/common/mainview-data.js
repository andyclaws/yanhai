import axios from '@/libs/api.request'
import {
  addPre
} from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getOrgList = params => {
  return axios.request({
    url: addPre('succrate/common/getOrgList'),
    method: 'post',
    data: params
  })
}
