import axios from '@/libs/api.request'

/**
 * 已测试
 * @param {*} params
 */
export const getLineData = params => {
  return axios.request({
    url: 'sea-quota/succrate/successrateSummary/getLineData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getBarData = params => {
  return axios.request({
    url: 'sea-quota/succrate/successrateSummary/getBarData',
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
    url: 'sea-quota/succrate/successrateSummary/getReportData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getOrgList = params => {
  return axios.request({
    url: 'sea-quota/succrate/common/getOrgList',
    method: 'post',
    data: params
  })
}
