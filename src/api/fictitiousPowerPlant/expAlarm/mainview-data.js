import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getNewAlarms = params => {
  return axios.request({
    url: 'isc/alarmInfo',
    method: 'post',
    data: params
  })
}
