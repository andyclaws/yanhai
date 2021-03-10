import axios from '@/libs/api.request'

/**
 *
 * @param {*} params
 */
export const addProtectUnit = params => {
  return axios.request({
    url: 'pmc/powerManagementAdd',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const addProtectDevice = params => {
  return axios.request({
    url: 'pmc/powerManagementAddSubdevice',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const modifyProtectUnit = params => {
  return axios.request({
    url: 'pmc/powerManagementModify',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const modifyProtectDevice = params => {
  return axios.request({
    url: 'pmc/powerManagementModifySubdevice',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const getModifyList = params => {
  return axios.request({
    url: 'pmc/powerManagementModify_unit_listEequs',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param {*} params
 */
export const deleteProtectData = params => {
  return axios.request({
    url: 'pmc/powerManagementDelete',
    method: 'post',
    data: params
  })
}
