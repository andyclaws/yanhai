import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getBaseInfo = params => {
  return axios.request({
    url: 'home/getBaseInfo',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitDistribute = params => {
  return axios.request({
    url: 'home/getUnitDistribute',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getStatisData = params => {
  return axios.request({
    url: 'home/rightDataTongJi',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getSubDeviceShow = params => {
  return axios.request({
    url: 'home/subdeviceAndTypePicShow',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitTypeNums = params => {
  return axios.request({
    url: 'home/getUnitTypeNums',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getMonthPower = params => {
  return axios.request({
    url: 'home/getMonthPower',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAramNum = params => {
  return axios.request({
    url: 'home/getAramNum',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitPowerTop = params => {
  return axios.request({
    url: 'home/getUnitPowerTop5?isCount=' + params.isCount,
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitSumAndOnline = params => {
  return axios.request({
    url: 'home/getUnitSumAndOnline',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getRealLoad = params => {
  return axios.request({
    url: 'home/getFuhe',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitRealTimeFuhe = params => {
  return axios.request({
    url: 'home/getUnitRealTimeFuhe?unitNo=' + params.unitNo,
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitInformationList = params => {
  return axios.request({
    url: 'home/unitInformationList',
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getTodayLoadCurve = params => {
  return axios.request({
    url: 'home/getTodayLoadCurve',
    method: 'get',
    data: params
  })
}
