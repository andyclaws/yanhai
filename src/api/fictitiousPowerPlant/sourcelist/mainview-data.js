import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getSourceList = params => {
  return axios.request({
    url: 'rlc/unitInformationList',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getAreaList = params => {
  return axios.request({
    url: 'rlc/areaList',
    method: 'post',
    data: params
  })
}
