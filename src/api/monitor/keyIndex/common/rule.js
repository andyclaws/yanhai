import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 * 查询统计规则文本内容
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const getRuleContent = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/getRuleContent')
  })
}
