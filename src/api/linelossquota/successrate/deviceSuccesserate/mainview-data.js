import axios from '@/libs/api.request'

/**
 * 已测试
 * @param {*} params
 */
export const getBarData = params => {
  return axios.request({
    url: 'sea-quota/succrate/deviceSuccessRate/getBarData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getLineData = params => {
  return axios.request({
    url: 'sea-quota/succrate/deviceSuccessRate/getLineData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getFactoryList = params => {
  return axios.request({
    url: 'sea-quota/succrate/deviceSuccessRate/getFactoryList',
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
    url: 'sea-quota/succrate/deviceSuccessRate/getReportData',
    method: 'post',
    data: params
  })
}
