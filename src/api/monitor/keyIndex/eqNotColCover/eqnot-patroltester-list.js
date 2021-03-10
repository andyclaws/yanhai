import axios from '@/libs/api.request'
import { addPre } from '../../util.js'

/**
 * 根据终端查询
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const selectTable = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('jkUnCoverData/eqnotPatroltesterList')
  })
}

export const queryList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
