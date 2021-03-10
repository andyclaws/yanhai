import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 *电能示值连续多天未采集明细查询
 * @param data
 * @returns {*}
 */
export const selectTableList = (data) => {
  return axios.request({
    url: addPre('/totalColFail/getTotalColFailDetail'),
    method: 'POST',
    data: data
  })
}
export const selectFailInfo = (data) => {
  return axios.request({
    url: addPre('/totalColFail/getTotalColFailItemDetail'),
    method: 'POST',
    data: data
  })
}
/**
 * 查询接线方式
 * @param data
 * @returns {*}
 */
export const queryWiringModeList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
/**
 * 查询通讯方式
 * @param data
 * @returns {*}
 */
export const queryCommModeList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
