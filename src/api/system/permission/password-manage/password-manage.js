import axios from '@/libs/api.login'

/**
 * 修改密码
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const changePwd = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/changePwd'
  })
}
