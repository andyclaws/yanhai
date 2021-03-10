/*
import axios from '@/libs/api.request'

export const getTable = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'collFaultAnalyse/queryMetExpTreeTab'
  })
}

export const getyclxList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'common/queryList'
  })
}

export const getyhlxList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'common/queryList'
  })
}
*/
import axios from '@/libs/api.request'
import { addPre } from '../../util'

/**
 * 监控分析数据查询
 * @param data
 * @returns {*}
 */
export const getTable = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('collFaultAnalyse/queryMetExpTreeTab')
  })
}

/**
 * 工单类型初始化
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
 * 用户类型初始化
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
