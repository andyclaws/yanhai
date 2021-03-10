import axios from '@/libs/api.request'
import { addPre } from '../../util'

/**
 *电能示值连续多天未采集明细查询
 * @param data
 * @returns {*}
 */
export const selectTableList = (data) => {
  return axios.request({
    url: addPre('/eleValNotColCover/getFailCollDetail'),
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
    url: addPre('common/queryList'),
    method: 'post',
    data: data
  })
}
export const queryCommModeList = (data) => {
  return axios.request({
    url: addPre('common/queryList'),
    method: 'post',
    data: data

  })
}
