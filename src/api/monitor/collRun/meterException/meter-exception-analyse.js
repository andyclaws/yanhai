import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 * 监控指标查询
 * @param data
 * @returns {*}
 */
export const getTable = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterExceptionAnalyse/queryMetExpTreeTab')
  })
}
/**
 * 查询异常类型
 * @param data
 * @returns {*}
 */
export const getyclxList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
/**
 * 查询用户类型
 * @param data
 * @returns {*}
 */
export const getyhlxList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
