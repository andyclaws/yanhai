import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getRecordErrorData = params => {
  return axios.request({
    url: 'getRecordErrorData',
    method: 'post',
    data: params
  })
}

export const getCardSummaryData = params => {
  return axios.request({
    url: 'getCardSummaryData',
    method: 'post',
    data: params
  })
}

export const getClosedLoopRateDetalTabelData = params => {
  return axios.request({
    url: 'getClosedLoopRateDetalTabelData',
    method: 'post',
    data: params
  })
}

export const getTgCardSummaryData = params => {
  return axios.request({
    url: 'mainview/getTgCardSummaryData',
    method: 'post',
    data: params
  })
}

export const indexSettingData = params => {
  return axios.request({
    url: 'indexSettingData',
    method: 'post',
    data: params
  })
}
export const rPScoreData = params => {
  return axios.request({
    url: 'getRPScore',
    method: 'post',
    data: params
  })
}
export const closedLoopRate = params => {
  return axios.request({
    url: 'closedLoopRate',
    method: 'post',
    data: params
  })
}
// 闭环工单处理及时率表单数据
export const closedLoopRateTable = params => {
  return axios.request({
    url: 'closedLoopRateTable ',
    method: 'post',
    data: params
  })
}
export const getClosedLoopRateTableData = params => {
  return axios.request({
    url: 'getClosedLoopRateTableData ',
    method: 'post',
    data: params
  })
}

export const closedLoopProcessingRateDetail = params => {
  return axios.request({
    url: 'closedLoopProcessingRateDetail',
    method: 'post',
    data: params
  })
}
export const getDeviceSuccessRate = params => {
  return axios.request({
    url: 'getDeviceSuccessRate',
    method: 'post',
    data: params
  })
}
export const getDeviceSuccessDetailRate = params => {
  return axios.request({
    url: 'getDeviceSuccessDetailRate',
    method: 'post',
    data: params
  })
}
export const getDeviceSuccessDetail = params => {
  return axios.request({
    url: 'getDeviceSuccessDetail',
    method: 'post',
    data: params
  })
}
export const thresholdSettings = params => {
  return axios.request({
    url: 'https://easy-mock.com/mock/5cd27ec35486ab65687f3433/thresholdSettings',
    method: 'post',
    data: params
  })
}
export const getSuccessrateSummaryData = params => {
  return axios.request({
    url: 'getSuccessrateSummaryData',
    method: 'post',
    data: params
  })
}
