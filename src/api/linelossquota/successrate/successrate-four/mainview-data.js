import axios from '@/libs/api.request'
import { addPre } from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getSummaryTable = params => {
  return axios.request({
    url: addPre('succrate/succrate-four/getSummaryTable'),
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
    url: addPre('succrate/succrate-four/getFailReasonTable'),
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
    url: addPre('succrate/succrate-four/getFailReasonCard'),
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
    url: addPre('succrate/succrate-four/getAnalyzeCard'),
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
    url: addPre('succrate/succrate-four/getAnalyzeTable'),
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
    url: addPre('succrate/succrate-four/getLineChart'),
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
    url: addPre('succrate/succrate-four/getPieChart'),
    method: 'post',
    data: params
  })
}
