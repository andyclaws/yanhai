import axios from '@/libs/api.request'
/**
 *
 * @param {*} params
 */
export const getBaseInfo = params => {
  return axios.request({
    url: 'acdc/showTop',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getRealLoad = params => {
  return axios.request({
    url: 'acdc/airContion24HourLoad',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAirList = params => {
  return axios.request({
    url: 'acdc/AirConditionInternalElectromechanicalMonitoringInformation',
    method: 'post',
    data: params
  })
}
