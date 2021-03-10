import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getDataStatistics = params => {
  return axios.request({
    url: 'omc/dataStatistics',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getRealTimeGenerationEvents = params => {
  return axios.request({
    url: 'omc/realTimeGenerationEvents',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitOnlineNo = params => {
  return axios.request({
    url: 'omc/unitOnlineNo',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getRealTimeLoadCurve = params => {
  return axios.request({
    url: 'omc/realTimeLoadCurve',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getRealTimeUnitInfo = params => {
  return axios.request({
    url: 'omc/unitInfo',
    method: 'post',
    data: params
  })
}

/**
 *TODO  能力区间
TODO 实时负荷
 * @param {*} params
 */
export const getUnitPositionInfo = params => {
  return axios.request({
    url: 'omc/unitPositionInfo',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getCapabilityInterval = params => {
  return axios.request({
    url: 'omc/capabilityInterval',
    method: 'post',
    data: params
  })
}
