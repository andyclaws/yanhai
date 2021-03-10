import axios from '@/libs/api.request'
import { addPre } from '../../util'

/**
 * 初始化供电单位
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const initOrg = (data) => {
  return axios.request({
    method: 'post',
    url: addPre('common/initOrg'),
    data: data
  })
}

/**
 * 查询下级供电单位
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const childOrgs = (data) => {
  return axios.request({
    method: 'post',
    url: addPre('common/childOrgs'),
    data: data
  })
}
