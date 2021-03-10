import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getMonitorData = params => {
  return axios.request({
    url: addPre('chargeCtrl/processMonitor/getMonitorData'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getMonitorReportData = params => {
  return axios.request({
    url: addPre('chargeCtrl/processMonitor/getMonitorReportData'),
    method: 'post',
    data: params
  })
}

/**
   *
   * @param {*} params
   */
export const getFailReasonData = params => {
  return axios.request({
    url: addPre('chargeCtrl/processMonitor/getFailReasonData'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getFailReportData = params => {
  return axios.request({
    url: addPre('chargeCtrl/processMonitor/getFailReportData'),
    method: 'post',
    data: params
  })
}
