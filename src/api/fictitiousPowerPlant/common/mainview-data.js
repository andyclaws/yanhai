import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const getDropDownDatas = params => {
  return axios.request({
    url: 'ddlc/dropDownListQuery?type=' + params.type,
    method: 'get',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUserList = params => {
  return axios.request({
    url: 'armac/allOwnerArr',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getUnitNameList = params => {
  return axios.request({
    url: 'armac/allUnitNameArr',
    method: 'post',
    data: params
  })
}
