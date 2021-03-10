import axios from '@/libs/api.request'
// /**
//  *
//  * @param {*} params
//  */
// export const getAlarmQuery = params => {
//   return axios.request({
//     url: 'isc/alarmQuery',
//     method: 'post',
//     data: params
//   })
// }

/**
 *
 * @param {*} params
 */
export const getAlarmStatistics = params => {
  return axios.request({
    url: 'isc/alarmStatistics',
    method: 'post',
    data: params
  })
}
