import axios from '@/libs/api.request'

/**
 * 查询操作日志
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const list = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-log/error/list'
  })
}
