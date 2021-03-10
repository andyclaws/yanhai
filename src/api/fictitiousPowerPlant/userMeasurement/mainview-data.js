import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getSettleMentInfo = params => {
  return axios.request({
    url: 'uac/measurementSettlementInfo',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getSettlementDispute = params => {
  return axios.request({
    url: 'uac/settlementDispute',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitSettleInfo = params => {
  return axios.request({
    url: 'uac/unitSettleInfo',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getSettleInfoRevise = params => {
  return axios.request({
    url: 'uac/settleInfoRevise',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const setDisputeReply = params => {
  return axios.request({
    url: 'uac/disputeReply',
    method: 'post',
    data: params
  })
}
