import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getAnalyzeChartData = params => {
  return axios.request({
    url: addPre('chargeCtrl/quotaMonitor/getAnalyzeChartData'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAnalyzeCardData = params => {
  return axios.request({
    url: addPre('chargeCtrl/quotaMonitor/getAnalyzeCardData'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getFactoryChartData = params => {
  return axios.request({
    url: addPre('chargeCtrl/quotaMonitor/getFactoryChartData'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getFactoryCardData = params => {
  return axios.request({
    url: addPre('chargeCtrl/quotaMonitor/getFactoryCardData'),
    method: 'post',
    data: params
  })
}
