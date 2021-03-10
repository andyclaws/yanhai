import axios from '@/libs/api.request'

/**
 * 获取列表数据
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const queryOrgList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'common/queryOrgList'
  })
}
