import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 * 已测试
 * @param {*} params
 */
export const getSuccessRateData = params => {
  return axios.request({
    url: addPre('succrate/succrate-hplc/getSuccessRateData'),
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getSuccessReportData = params => {
  return axios.request({
    url: addPre('succrate/succrate-hplc/getSuccessReportData'),
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getFailReasonData = params => {
  return axios.request({
    url: addPre('succrate/succrate-hplc/getFailReasonData'),
    method: 'post',
    data: params
  })
}

/**
 * 已测试
 * @param {*} params
 */
export const getFailReportData = params => {
  return axios.request({
    url: addPre('succrate/succrate-hplc/getFailReportData'),
    method: 'post',
    data: params
  })
}
