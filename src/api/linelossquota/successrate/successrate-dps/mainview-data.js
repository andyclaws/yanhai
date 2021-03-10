import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getSummaryTable = params => {
  return axios.request({
    url: addPre('succrate/succrate-dps/getSummaryTable'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getFailReasonTable = params => {
  return axios.request({
    url: addPre('succrate/succrate-dps/getFailReasonTable'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getFailReasonCard = params => {
  return axios.request({
    url: addPre('succrate/succrate-dps/getFailReasonCard'),
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
    url: addPre('succrate/succrate-dps/getAnalyzeCard'),
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAnalyzeTable = params => {
  return axios.request({
    url: addPre('succrate/succrate-dps/getAnalyzeTable'),
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
    url: addPre('succrate/succrate-dps/getLineChart'),
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
    url: addPre('succrate/succrate-dps/getPieChart'),
    method: 'post',
    data: params
  })
}
