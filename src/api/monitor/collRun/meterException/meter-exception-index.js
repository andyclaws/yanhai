import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 * Gard卡片数据
 * @param data
 * @returns {*}
 */
export const queryGard = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryGred')
  })
}

/**
 * 完成率tab数据
 * @param data
 * @returns {*}
 */
export const querywclTabs = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryWCLTabs')
  })
}

/**
 * 再超期率tab数据
 * @param data
 * @returns {*}
 */
export const queryzcqlTabs = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryZCQLTabs')
  })
}

/**
 * 复发率tab数据
 * @param data
 * @returns {*}
 */
export const queryfflTabs = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryZFFLTabs')
  })
}

/**
 * 周工单趋势  工单量趋势
 * @param data
 * @returns {*}
 */
export const queryGdlWeeklyTrend = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryGdlWeeklyTrend')
  })
}
/**
 *周平均用时趋势
 * @param data
 * @returns {*}
 */
export const queryPjysWeeklyTrend = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryPjysWeeklyTrend')
  })
}

/**
 *周复发率趋势
 * @param data
 * @returns {*}
 */
export const queryFflWeeklyTrend = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryFflWeeklyTrend')
  })
}

/**
 *周再超期率趋势
 * @param data
 * @returns {*}
 */
export const queryZcqlWeeklyTrend = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryZcqlWeeklyTrend')
  })
}

/**
 * 下级单位各工单类型数据统计堆积柱状图
 * @param data
 * @returns {*}
 */
export const queryWorkorder = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryWorkorder')
  })
}

/**
 * 下级单位平均用时趋势
 * @param data
 * @returns {*}
 */
export const queryAVGTime = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryAVGTime')
  })
}

/**
 * 下级单位复发率趋势
 * @param data
 * @returns {*}
 */
export const queryRelapse = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryRelapse')
  })
}

/**
 * 下级单位再超期率率趋势
 * @param data
 * @returns {*}
 */
export const queryReOverdue = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('meterexception/queryReOverdue')
  })
}
/**
 * 异常类型查询
 * @param data
 * @returns {*}
 */
export const queryexception = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
