import axios from '@/libs/api.request'

/**
 * @param {*} params
 */
export const getBarData = params => {
  return axios.request({
    url: 'sea-quota/ctrlrate/usermonitor/getBarData',
    method: 'post',
    data: params
  })
}

/**
 * @param {*} params
 */
export const getReportData_1 = params => {
  return axios.request({
    url: 'sea-quota/ctrlrate/usermonitor/getReportData_1',
    method: 'post',
    data: params
  })
}

/**
 * @param {*} params
 */
export const getReportData_2 = params => {
  return axios.request({
    url: 'sea-quota/ctrlrate/usermonitor/getReportData_2',
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

/**
 * 已测试
 * @param {*} params
 */
export const getPieData = params => {
  return axios.request({
    url: 'sea-quota/ctrlrate/usermonitor/getPieData',
    method: 'post',
    data: params
  })
}
