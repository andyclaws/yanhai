import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 * 点击提交，查询后台数据
 * @param data
 * @returns {*}
 */
export const queryListData = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterExceptionList/QueryMeterExceptionList')
  })
}

/**
 * 初始化用户类型码值
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

/**
 * 初始化异常类型码值
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
 * 初始化工单状态码值
 * @param data
 * @returns {*}
 */
export const getgdztList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}

/**
 * 初始化是否选择框码值
 * @param data
 * @returns {*}
 */
export const gettfList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
/**
 * 初始化归档反馈方式选择框码值
 * @param data
 * @returns {*}
 */
export const getfkfsList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}

/**
 * 运维人员查询
 * @param data
 * @returns {*}
 */
export const queryDispatcheOper = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterExceptionList/queryDispatcheOper')
  })
}

/**
* 工单派工
* @param data
* @returns {*}
*/
export const dispatche = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterExceptionList/dispatche')
  })
}
