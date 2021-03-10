import axios from '@/libs/api.request'
import { addPre } from '../../util'
/**
 * 根据终端查询
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
/***
 * 集中更换任务信息
 * @param data
 */
export const queryHplcTaskInfoList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'jkHplcTaskInfo/queryHplcTaskInfoList' */
    url: addPre('jkHplcTaskInfo/queryHplcTaskInfoList')
  })
}

/**
 * 集中更换明细(表记/模块)
 * @param data
 */
export const queryHplcTaskDetailList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'jkHplcTaskInfo/queryHplcTaskDetailList' */
    url: addPre('jkHplcTaskInfo/queryHplcTaskDetailList')
  })
}
/**
 * 集中更换明细(采集)
 * @param data
 */
export const queryHplcTaskCollDetailList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /*  url: 'jkHplcTaskInfo/queryHplcTaskCollDetailList' */
    url: addPre('jkHplcTaskInfo/queryHplcTaskCollDetailList')
  })
}
/**
 * 集中更换任务信息确认
 * @param data
 */
export const updateHplcTaskInfo = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    /* url: 'jkHplcTaskInfo/updateHplcTaskInfo' */
    url: addPre('jkHplcTaskInfo/updateHplcTaskInfo')
  })
}
