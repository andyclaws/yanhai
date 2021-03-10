import axios from '@/libs/api.request'

/**
 * 初始化供电单位
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const initOrg = () => {
  return axios.request({
    method: 'post',
    url: 'sea-base/org/initOrg'
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
    url: 'sea-base/org/childOrgs',
    data: data
  })
}
