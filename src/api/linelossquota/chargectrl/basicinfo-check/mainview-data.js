import axios from '@/libs/api.request'
import {
  addPre
} from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getReasonCard = params => {
  return axios.request({
    url: addPre('chargeCtrl/basicInfoCheck/getReasonCard'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAnalyzeCard = params => {
  return axios.request({
    url: addPre('chargeCtrl/basicInfoCheck/getAnalyzeCard'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getLineChart = params => {
  return axios.request({
    url: addPre('chargeCtrl/basicInfoCheck/getLineChart'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getPieChart = params => {
  return axios.request({
    url: addPre('chargeCtrl/basicInfoCheck/getPieChart'),
    method: 'post',
    data: params
  })
}
