import axios from '@/libs/api.request'
import { addPre } from '../../util'

/**
 * 工单详情查询
 * @param params
 * @returns {*}
 */
export const getDetailData = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('meterexceptiondetail/qurtyDetailDatas')
  })
}
