import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 * 已测试
 * @param {*} params
 */
export const getSuccessRateData = params => {
  return axios.request({
    url: addPre('successrate/successrate-port/getSuccessRateData'),
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
    url: addPre('successrate/successrate-port/getSuccessReportData'),
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
    url: addPre('successrate/successrate-port/getFailReasonData'),
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
    url: addPre('successrate/successrate-port/getFailReportData'),
    method: 'post',
    data: params
  })
}
