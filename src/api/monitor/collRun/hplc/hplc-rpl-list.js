import axios from '@/libs/api.request'
import { addPre } from '../../util'

/**
 * 根据终端查询
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const selectTable = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'jkHplcTaskInfo/queryHplcTaskInfoList' */
    url: addPre('jkHplcTaskInfo/queryHplcTaskInfoList')
  })
}
export const queryList1 = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'common/queryList' */
    url: addPre('common/queryList')
  })
}
export const queryList2 = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'common/queryList' */
    url: addPre('common/queryList')
  })
}
export const queryList3 = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'common/queryList' */
    url: addPre('common/queryList')
  })
}
