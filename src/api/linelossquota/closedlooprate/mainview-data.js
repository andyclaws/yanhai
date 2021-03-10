import axios from '@/libs/api.request'

/**
 * 已测试
 * @param {*} params
 */
export const getBarData = params => {
  return axios.request({
    url: 'sea-quota/workRate/closedLoopRate/getBarData',
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
    url: 'sea-quota/workRate/closedLoopRate/getReportData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getTableData = params => {
  return axios.request({
    url: 'sea-quota/workRate/closedLoopRate/getTableData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getCardData = params => {
  return axios.request({
    url: 'sea-quota/workRate/closedLoopRate/getCardData',
    method: 'post',
    data: params
  })
}
