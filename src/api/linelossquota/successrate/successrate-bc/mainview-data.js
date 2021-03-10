import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 * 已测试
 * @param {*} params
 */
export const getBcMonitorData = params => {
  return axios.request({
    url: addPre('successrate/successrate-bc/getBcMonitorData'),
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getReportData = params => {
  return axios.request({
    url: addPre('successrate/successrate-bc/getReportData'),
    method: 'post',
    data: params
  })
}
