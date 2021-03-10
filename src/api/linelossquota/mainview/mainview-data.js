import axios from '@/libs/api.request'

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getQutoScoreData = params => {
  return axios.request({
    url: '/sea-quota/mainview/getQutoScoreData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getQutoBarData = params => {
  return axios.request({
    url: '/sea-quota/mainview/getQutoBarData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getQutoReportData = params => {
  return axios.request({
    url: '/sea-quota/mainview/getQutoReportData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getQutoLineData = params => {
  return axios.request({
    url: '/sea-quota/mainview/getQutoLineData',
    method: 'post',
    data: params
  })
}

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getQutoTableData = params => {
  return axios.request({
    url: '/sea-quota/mainview/getQutoTableData',
    method: 'post',
    data: params
  })
}

// export const getCardSummaryData = params => {
//   return axios.request({
//     url: 'getCardSummaryData',
//     method: 'post',
//     data: params
//   })
// }

// export const getCoverrateData = params => {
//   return axios.request({
//     url: 'getCoverrateData',
//     method: 'post',
//     data: params
//   })
// }

// export const getHplcSuccessRateData = params => {
//   return axios.request({
//     url: 'getHplcSuccessRateData',
//     method: 'post',
//     data: params
//   })
// }

/**
 * 已测试 hjj
 * @param {*} params
 */
export const getTgDetail = params => {
  return axios.request({
    url: '/sea-quota/mainview/getTgDetail',
    method: 'post',
    data: params
  })
}
