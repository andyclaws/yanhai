import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getSummaryTable = params => {
  return axios.request({
    url: addPre('succrate/succrate-low/getSummaryTable'),
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
    url: addPre('succrate/succrate-low/getFailReasonTable'),
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
    url: addPre('succrate/succrate-low/getFailReasonCard'),
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
    url: addPre('succrate/succrate-low/getAnalyzeCard'),
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
    url: addPre('succrate/succrate-low/getAnalyzeTable'),
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
    url: addPre('succrate/succrate-low/getLineChart'),
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
    url: addPre('succrate/succrate-low/getPieChart'),
    method: 'post',
    data: params
  })
}
